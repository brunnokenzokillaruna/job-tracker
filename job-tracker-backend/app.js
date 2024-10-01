// job-tracker-backend/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const sequelize = require('./config/database');
const User = require('./models/User');
const Job = require('./models/Job');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Job Tracker App Backend is running.');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'An unexpected error occurred.' });
});

// Sync Database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((error) => {
    console.error('Database synchronization error:', error);
  });

module.exports = app;