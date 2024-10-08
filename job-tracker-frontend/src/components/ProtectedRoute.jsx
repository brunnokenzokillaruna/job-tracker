// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/*
A wrapper component to protect routes that require authentication.
Redirects the user to the login page if not authenticated.
*/
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <span>Loading...</span>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;