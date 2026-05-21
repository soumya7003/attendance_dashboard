import { useState, useEffect, useCallback } from 'react';
import sessionService from '../services/sessionService';

export const useSessions = (filters = {}) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await sessionService.getSessions(filters);
      setSessions(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const createSession = async (sessionData) => {
    setLoading(true);
    try {
      const response = await sessionService.createSession(sessionData);
      await fetchSessions();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (id) => {
    setLoading(true);
    try {
      await sessionService.deleteSession(id);
      await fetchSessions();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sessions, loading, error, refetch: fetchSessions, createSession, deleteSession };
};