// job-tracker-backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

/*
Sequelize Instance
Connects to the PostgreSQL database using credentials from environment variables.
*/
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;