const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const dotenv = require('dotenv').config({ path: '../.env' });

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A name is required.',
      },
    },
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: {
        msg: 'An email address is required.',
      },
    },
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A password is required.',
      },
    },
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = { User };
