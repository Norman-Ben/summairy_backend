const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { User } = require('./userModel');
const dotenv = require('dotenv').config({ path: '../.env' });

const Summary = sequelize.define('Summary', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
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

Summary.belongsTo(User, {
  foreignKey: 'user',
  onDelete: 'CASCADE',
});

module.exports = { Summary };
