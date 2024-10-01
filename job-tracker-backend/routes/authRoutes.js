// job-tracker-backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Route
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;