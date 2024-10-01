// job-tracker-backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Sequelize Instance
 * Connects to the PostgreSQL database using credentials from environment variables.
 */
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  // Uncomment and configure the following if using SSL (e.g., with Heroku Postgres)
  /*
  dialectOptions: process.env.NODE_ENV === 'production' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {},
  */
  logging: false, // Disable logging; set to console.log to see SQL queries
});

module.exports = sequelize;