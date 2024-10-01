// src/services/jobService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

const getAllJobs = async (token) => {
  const response = await axios.get(`${API_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createJob = async (jobData, token) => {
  const response = await axios.post(`${API_URL}/`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getJobById = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateJob = async (id, updatedData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteJob = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getJobCountByMonth = async (year, month, token) => {
  const response = await axios.get(`${API_URL}/count/${year}/${month}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.count;
};

const getCurrentMonthJobCount = async (token) => {
  const response = await axios.get(`${API_URL}/count/current-month`, {
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
  getCurrentMonthJobCount,
};