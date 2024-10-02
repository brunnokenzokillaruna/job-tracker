// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import JobList from './components/JobList';
import AddJob from './components/AddJob';
import EditJob from './components/EditJob';
import MonthlyTracker from './components/MonthlyTracker';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import { Container } from 'react-bootstrap';

/*
Main application component that includes routing, authentication, and job context providers.
*/
function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          {/* Navbar component displayed on every page */}
          <Navbar />
          <Container className="mt-4">
            <Routes>
              {/* Redirects to login by default */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes require authentication */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <JobList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/add"
                element={
                  <ProtectedRoute>
                    <AddJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/monthly-tracker"
                element={
                  <ProtectedRoute>
                    <MonthlyTracker />
                  </ProtectedRoute>
                }
              />
              
              {/* Fallback route for 404 not found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;