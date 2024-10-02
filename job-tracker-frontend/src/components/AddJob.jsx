// src/components/AddJob.jsx
import { useState, useContext } from 'react';
import { JobContext } from '../contexts/JobContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const { addJob } = useContext(JobContext);
  const navigate = useNavigate();

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /*
  Handles form submission for adding a job.
  Ensures all required fields are filled before calling addJob from JobContext.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company || !position || !applicationDate) {
      return setError('Please fill in all required fields.');
    }
    setError('');
    setLoading(true);
    try {
      await addJob({ company, position, applicationDate, status, notes });
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add job.');
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card bg="dark" text="white" style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Add New Job</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="company" className="mb-3">
              <Form.Label>Company *</Form.Label>
              <Form.Control
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter company name"
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Form.Group id="position" className="mb-3">
              <Form.Label>Position *</Form.Label>
              <Form.Control
                type="text"
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter position title"
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Form.Group id="applicationDate" className="mb-3">
              <Form.Label>Application Date *</Form.Label>
              <Form.Control
                type="date"
                required
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Form.Group id="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-dark text-white border-secondary">
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Offered</option>
                <option>Rejected</option>
              </Form.Select>
            </Form.Group>
            <Form.Group id="notes" className="mb-4">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes (optional)"
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" variant="primary" type="submit">
              {loading ? 'Adding...' : 'Add Job'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddJob;