// job-tracker-backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  getCurrentMonthJobCount,
  getJobCountByMonth,
} = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Monthly Tracker Routes (Should be defined before dynamic ':id' routes to avoid conflicts)
router.get('/count/current-month', getCurrentMonthJobCount);
router.get('/count/:year/:month', getJobCountByMonth);

// Job Management Routes
router.get('/', getAllJobs);
router.post('/', createJob);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;