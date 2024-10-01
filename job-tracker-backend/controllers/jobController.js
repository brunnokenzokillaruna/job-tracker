// job-tracker-backend/controllers/jobController.js
const Job = require('../models/Job');
const { Op } = require('sequelize');

/**
 * Retrieves all jobs for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { userId: req.user.id },
      order: [['applicationDate', 'DESC']],
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Get All Jobs Error:', error);
    res.status(500).json({ message: 'Server error while fetching jobs.' });
  }
};

/**
 * Creates a new job application for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createJob = async (req, res) => {
  const { company, position, applicationDate, status, notes } = req.body;
  try {
    const newJob = await Job.create({
      company,
      position,
      applicationDate,
      status,
      notes,
      userId: req.user.id,
    });
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Create Job Error:', error);
    res.status(500).json({ message: 'Server error while creating job.' });
  }
};

/**
 * Retrieves a specific job by ID for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findOne({
      where: { id, userId: req.user.id },
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error('Get Job By ID Error:', error);
    res.status(500).json({ message: 'Server error while fetching job.' });
  }
};

/**
 * Updates a specific job by ID for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position, applicationDate, status, notes } = req.body;
  try {
    const job = await Job.findOne({
      where: { id, userId: req.user.id },
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    // Update fields if provided
    job.company = company || job.company;
    job.position = position || job.position;
    job.applicationDate = applicationDate || job.applicationDate;
    job.status = status || job.status;
    job.notes = notes !== undefined ? notes : job.notes;

    await job.save();
    res.status(200).json(job);
  } catch (error) {
    console.error('Update Job Error:', error);
    res.status(500).json({ message: 'Server error while updating job.' });
  }
};

/**
 * Deletes a specific job by ID for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findOne({
      where: { id, userId: req.user.id },
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    await job.destroy();
    res.status(200).json({ message: 'Job deleted successfully.' });
  } catch (error) {
    console.error('Delete Job Error:', error);
    res.status(500).json({ message: 'Server error while deleting job.' });
  }
};

/**
 * Retrieves the count of jobs applied to in the current month for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getCurrentMonthJobCount = async (req, res) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  try {
    const count = await Job.count({
      where: {
        userId: req.user.id,
        applicationDate: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Get Current Month Job Count Error:', error);
    res.status(500).json({ message: 'Server error while fetching job count.' });
  }
};

/**
 * Retrieves the count of jobs applied to in a specific month and year for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getJobCountByMonth = async (req, res) => {
  const { year, month } = req.params;
  const parsedYear = parseInt(year, 10);
  const parsedMonth = parseInt(month, 10);

  // Validate year and month
  if (isNaN(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
    return res.status(400).json({ message: 'Invalid year or month.' });
  }

  const startOfMonth = new Date(parsedYear, parsedMonth - 1, 1);
  const endOfMonth = new Date(parsedYear, parsedMonth, 0);

  try {
    const count = await Job.count({
      where: {
        userId: req.user.id,
        applicationDate: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Get Job Count By Month Error:', error);
    res.status(500).json({ message: 'Server error while fetching job count.' });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  getCurrentMonthJobCount,
  getJobCountByMonth,
};