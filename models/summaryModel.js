const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
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

module.exports = { Summary };
