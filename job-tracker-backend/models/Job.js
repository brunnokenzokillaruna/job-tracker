// job-tracker-backend/models/Job.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

/**
 * Job Model
 * Represents a job application in the Job Tracker App.
 */
const Job = sequelize.define('Job', {
  company: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  applicationDate: {
    type: DataTypes.DATEONLY, // Stores only the date part
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Applied', 'Interviewing', 'Offered', 'Rejected'),
    defaultValue: 'Applied',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 500],
    },
  },
}, {
  timestamps: true,
});

// Define associations
User.hasMany(Job, { foreignKey: 'userId', onDelete: 'CASCADE' });
Job.belongsTo(User, { foreignKey: 'userId' });

module.exports = Job;