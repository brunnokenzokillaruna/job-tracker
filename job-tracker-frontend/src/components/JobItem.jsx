// src/components/JobItem.jsx
import { useContext } from 'react';
import { JobContext } from '../contexts/JobContext';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobItem = ({ job }) => {
  const { deleteJob } = useContext(JobContext);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      deleteJob(job.id);
    }
  };

  return (
    <tr>
      <td>{job.company}</td>
      <td>{job.position}</td>
      <td>{job.applicationDate}</td>
      <td>{job.status}</td>
      <td>
        <Button as={Link} to={`/jobs/edit/${job.id}`} variant="warning" size="sm" className="me-2">
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

JobItem.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    applicationDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobItem;