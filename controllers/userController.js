const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { User } = require('../models/associations');
const dotenv = require('dotenv').config({ path: '../.env' });

// Desc: Authenticate user
// Route: POST /api/users/login
// Access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validate email and password
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter an email address and a password.');
  }

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password.');
  }
});

// Desc: Register user
// Route: POST /api/users
// Access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter a name, an email address, and a password.');
  }

  // Check if user exists
  const userExists = await User.findOne({
    where: {
      email: email,
    },
  });

  if (userExists) {
    res.status(400);
    throw new Error('A user with this email already exists.');
  }

  // Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

// Desc: Get user data
// Route: POST /api/users/me
// Access: Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found.');
  }

  res.status(200).json(user);
});

// Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
