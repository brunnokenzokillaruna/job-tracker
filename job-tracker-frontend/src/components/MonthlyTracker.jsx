// src/components/MonthlyTracker.jsx
import { useContext, useState } from 'react';
import { JobContext } from '../contexts/JobContext';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const MonthlyTracker = () => {
  const { currentMonthCount, fetchJobCountByMonth, selectedMonthCount, loadingCount, errorCount } =
    useContext(JobContext);

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!year || !month) {
      setError('Please select both year and month.');
      return;
    }
    setError('');
    await fetchJobCountByMonth(year, month);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(10), (val, index) => currentYear - index);
  const months = [
    { value: '1', name: 'January' },
    { value: '2', name: 'February' },
    { value: '3', name: 'March' },
    { value: '4', name: 'April' },
    { value: '5', name: 'May' },
    { value: '6', name: 'June' },
    { value: '7', name: 'July' },
    { value: '8', name: 'August' },
    { value: '9', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ];

  return (
    <Card className="text-center h-100">
      <Card.Body>
        <Card.Title>Monthly Job Application Tracker</Card.Title>
        <Card.Text className="mb-4">
          Current Month Applications: <strong>{currentMonthCount}</strong>
        </Card.Text>
        <Form onSubmit={handleFetch}>
          <Form.Group className="mb-3" controlId="formYear">
            <Form.Label>Select Year</Form.Label>
            <Form.Select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Year</option>
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMonth">
            <Form.Label>Select Month</Form.Label>
            <Form.Select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Month</option>
              {months.map((mn) => (
                <option key={mn.value} value={mn.value}>
                  {mn.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="submit" variant="primary" disabled={loadingCount}>
            {loadingCount ? <Spinner animation="border" size="sm" /> : 'Get Count'}
          </Button>
        </Form>
        {errorCount && <Alert variant="danger" className="mt-3">{errorCount}</Alert>}
        {selectedMonthCount !== null && !loadingCount && (
          <Alert variant="success" className="mt-3">
            Number of jobs applied in {month && months.find((mn) => mn.value === month).name} {year}:{' '}
            <strong>{selectedMonthCount}</strong>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default MonthlyTracker;