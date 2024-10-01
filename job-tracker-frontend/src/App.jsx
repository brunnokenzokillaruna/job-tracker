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

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <Navbar />
          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;