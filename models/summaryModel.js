const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const dotenv = require('dotenv').config({ path: '../.env' });

const Summary = sequelize.define('Summary', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  summary: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(1000),
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
