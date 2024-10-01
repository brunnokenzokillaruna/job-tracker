// src/contexts/JobContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { jobService } from '../services/jobService';
import { AuthContext } from './AuthContext';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const { currentUser, loading: authLoading } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [currentMonthCount, setCurrentMonthCount] = useState(0);
  const [selectedMonthCount, setSelectedMonthCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [error, setError] = useState('');
  const [errorCount, setErrorCount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await jobService.getAllJobs(token);
      setJobs(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs.');
    }
    setLoading(false);
  };

  const addJob = async (jobData) => {
    try {
      const newJob = await jobService.createJob(jobData, token);
      setJobs((prevJobs) => [...prevJobs, newJob]);
      setCurrentMonthCount((prevCount) => prevCount + 1);
    } catch (err) {
      throw err;
    }
  };

  const updateJob = async (id, updatedData) => {
    try {
      const updatedJob = await jobService.updateJob(id, updatedData, token);
      setJobs((prevJobs) => prevJobs.map((job) => (job.id === id ? updatedJob : job)));
    } catch (err) {
      throw err;
    }
  };

  const deleteJob = async (id) => {
    try {
      await jobService.deleteJob(id, token);
      const deletedJob = jobs.find((job) => job.id === id);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      const appDate = new Date(deletedJob.applicationDate);
      const currentDate = new Date();
      if (
        appDate.getMonth() === currentDate.getMonth() &&
        appDate.getFullYear() === currentDate.getFullYear()
      ) {
        setCurrentMonthCount((prevCount) => prevCount - 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete job.');
    }
  };

  const getJobById = async (id) => {
    try {
      const job = await jobService.getJobById(id, token);
      return job;
    } catch (err) {
      throw err;
    }
  };

  const fetchMonthlyCount = async () => {
    const currentDate = new Date();
    await fetchJobCountByMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
  };

  const fetchJobCountByMonth = async (year, month) => {
    setLoadingCount(true);
    setErrorCount('');
    try {
      const count = await jobService.getJobCountByMonth(year, month, token);
      setSelectedMonthCount(count);
    } catch (err) {
      setErrorCount(err.response?.data?.message || 'Failed to fetch job count.');
    }
    setLoadingCount(false);
  };

  useEffect(() => {
    if (token) {
      fetchJobs();
      fetchMonthlyCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        fetchJobs,
        addJob,
        updateJob,
        deleteJob,
        getJobById,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        currentMonthCount,
        fetchMonthlyCount,
        selectedMonthCount,
        fetchJobCountByMonth,
        loadingCount,
        errorCount,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

JobProvider.propTypes = {
  children: PropTypes.node.isRequired,
};