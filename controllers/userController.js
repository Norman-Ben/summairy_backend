const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { User } = require('../models/associations');

// Desc: Authenticate user
// Route: POST /api/users/login
// Access: Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'Log in user',
  });
});

// Desc: Register user
// Route: POST /api/users
// Access: Public
const registerUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'User registered',
  });
});

// Desc: Get user data
// Route: POST /api/users/me
// Access: Public
const getMe = asyncHandler(async (req, res) => {
  res.json({
    message: 'User data displayed',
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
