// src/components/NotFound.jsx
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Button as={Link} to="/dashboard" variant="primary">
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default NotFound;