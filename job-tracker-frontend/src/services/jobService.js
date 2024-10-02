// src/services/jobService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

/*
Fetches all jobs for the current user.
*/
const getAllJobs = async (token) => {
  const response = await axios.get(`${API_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/*
Creates a new job for the current user.
*/
const createJob = async (jobData, token) => {
  const response = await axios.post(`${API_URL}/`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/*
Fetches a job by its ID.
*/
const getJobById = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/*
Updates an existing job by its ID.
*/
const updateJob = async (id, updatedData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/*
Deletes a job by its ID.
*/
const deleteJob = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/*
Fetches the count of jobs for a specific month and year.
*/
const getJobCountByMonth = async (year, month, token) => {
  const response = await axios.get(`${API_URL}/count/${year}/${month}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.count;
};

export const jobService = {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  getJobCountByMonth,
};