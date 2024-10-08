// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  Registers a new user and sets the current user.
  */
  const register = async (username, email, password) => {
    const data = await authService.register(username, email, password);
    setCurrentUser(data.user);
    localStorage.setItem('token', data.token);
  };

  /*
  Logs in the user and sets the current user.
  */
  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setCurrentUser(data.user);
    localStorage.setItem('token', data.token);
  };

  /*
  Logs out the current user and clears the token.
  */
  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  /*
  Initializes the user from the token stored in localStorage.
  */
  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await authService.getCurrentUser(token);
          setCurrentUser(data.user);
        } catch (err) {
          console.error('Failed to fetch user:', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    initializeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};