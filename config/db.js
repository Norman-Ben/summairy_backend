const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config({ path: '../.env' });

const sequelize = new Sequelize(
  'Summairy',
  process.env.GCP_POSTGRESDB_USER,
  process.env.GCP_POSTGRESDB_PASSWORD,
  {
    host: process.env.GCP_POSTGRESDB_HOST,
    dialect: 'postgres',
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection has been established successfully with postgres DB.'
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
