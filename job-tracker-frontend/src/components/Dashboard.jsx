// src/components/Dashboard.jsx
import { useContext, useEffect } from 'react';
import { JobContext } from '../contexts/JobContext';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MonthlyTracker from './MonthlyTracker';

const Dashboard = () => {
  const { fetchMonthlyCount, currentMonthCount } = useContext(JobContext);

  useEffect(() => {
    fetchMonthlyCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-center">Dashboard</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Card bg="dark" text="white" className="text-center">
            <Card.Body>
              <Card.Title>Current Month Applications</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{currentMonthCount}</Card.Text>
              <Button as={Link} to="/jobs" variant="primary">
                View All Jobs
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <MonthlyTracker />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button as={Link} to="/jobs/add" variant="success">
            Add New Job
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;