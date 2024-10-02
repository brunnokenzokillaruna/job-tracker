// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

/*
Registers a new user by sending a POST request to the server.
*/
const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};

/*
Logs in the user by sending a POST request with the credentials.
*/
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

/*
Fetches the current authenticated user's data using the token.
*/
const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/*
Logs out the user. (Can also include backend calls if necessary.)
*/
const logout = () => {
  return Promise.resolve();
};

export const authService = {
  register,
  login,
  getCurrentUser,
  logout,
};