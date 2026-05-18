import { useState, useEffect, useCallback } from 'react';
import courseService from '../services/courseService';

/**
 * useCourses
 * Fetches and manages the course list.
 * @returns {{ courses: Array, loading: boolean, error: Error|null, refetch: Function }}
 */
export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // Keep a ref to the latest AbortController so we can cancel stale requests.
  const controllerRef = { current: null };

  const fetchCourses = useCallback(async (filters = {}) => {
    // Cancel any in-flight request before starting a new one.
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const data = await courseService.getAll(filters, { signal: controller.signal });
      setCourses(data);
    } catch (err) {
      // Ignore abort errors — they're intentional.
      if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
}