// src/components/Dashboard.jsx
import { useContext, useEffect } from 'react';
import { JobContext } from '../contexts/JobContext';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MonthlyTracker from './MonthlyTracker';

const Dashboard = () => {
  const { fetchMonthlyCount, currentMonthCount, jobs } = useContext(JobContext);

  /*
  Fetches the count of job applications for the current month when the component mounts.
  */
  useEffect(() => {
    fetchMonthlyCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const totalApplications = jobs.length;

  return (
    <div>
      <h2 className="mb-4 text-center">Dashboard</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Card bg="dark" text="white" className="text-center">
            <Card.Body>
              <Card.Title>{`${monthName} ${year} Applications`}</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{currentMonthCount}</Card.Text>
              <Card.Footer>
                <strong>Total Applications: {totalApplications}</strong>
              </Card.Footer>
              <Button as={Link} to="/jobs" variant="primary" className="mt-3">
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