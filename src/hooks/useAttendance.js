import { useState, useEffect, useCallback } from 'react';
import attendanceService from '../services/attendanceService';

export const useAttendance = (filters = {}) => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await attendanceService.getAttendance(filters);
      setAttendance(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchStats = useCallback(async (courseId, dateRange = {}) => {
    try {
      const response = await attendanceService.getAttendanceStats(courseId, dateRange);
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return {
    attendance,
    loading,
    error,
    stats,
    fetchStats,
    refetch: fetchAttendance,
  };
};