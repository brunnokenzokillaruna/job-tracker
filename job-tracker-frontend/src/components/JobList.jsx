// src/components/JobList.jsx
import { useContext, useEffect } from 'react';
import { JobContext } from '../contexts/JobContext';
import { Table, Button, Spinner, Alert, Form, Row, Col } from 'react-bootstrap';
import JobItem from './JobItem';
import { Link } from 'react-router-dom';

const JobList = () => {
  const { jobs, fetchJobs, loading, error, searchTerm, setSearchTerm, filterStatus, setFilterStatus } =
    useContext(JobContext);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 className="mb-4 text-center">My Job Applications</h2>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by company or position"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={filterStatus} onChange={handleFilter}>
            <option>All</option>
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offered</option>
            <option>Rejected</option>
          </Form.Select>
        </Col>
        <Col md={2} className="text-end">
          <Button as={Link} to="/jobs/add" variant="success">
            Add Job
          </Button>
        </Col>
      </Row>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : filteredJobs.length === 0 ? (
        <Alert variant="info">No job applications found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default JobList;