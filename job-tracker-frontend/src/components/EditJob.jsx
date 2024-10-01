// src/components/EditJob.jsx
import { useState, useContext, useEffect } from 'react';
import { JobContext } from '../contexts/JobContext';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditJob = () => {
  const { getJobById, updateJob } = useContext(JobContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const fetchedJob = await getJobById(id);
        setJob(fetchedJob);
        setCompany(fetchedJob.company);
        setPosition(fetchedJob.position);
        setApplicationDate(fetchedJob.applicationDate); // Already in YYYY-MM-DD format
        setStatus(fetchedJob.status);
        setNotes(fetchedJob.notes || '');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch job details.');
      }
      setLoading(false);
    };
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company || !position || !applicationDate) {
      return setError('Please fill in all required fields.');
    }
    setError('');
    setUpdating(true);
    try {
      await updateJob(id, { company, position, applicationDate, status, notes });
      navigate('/jobs');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update job.');
      }
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card bg="dark" text="white" style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Edit Job</Card.Title>
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
            <Button disabled={updating} className="w-100" variant="primary" type="submit">
              {updating ? 'Updating...' : 'Update Job'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditJob;