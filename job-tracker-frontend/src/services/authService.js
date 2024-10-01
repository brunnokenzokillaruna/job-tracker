// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const logout = () => {
  // If your backend has a logout endpoint, call it here.
  // Otherwise, handle logout on the frontend by removing the token.
  return Promise.resolve();
};

export const authService = {
  register,
  login,
  getCurrentUser,
  logout,
};