// src/components/Auth/Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in');
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card bg="dark" text="white" style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Login</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" variant="primary" type="submit">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            Need an account? <Link to="/register">Register</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;