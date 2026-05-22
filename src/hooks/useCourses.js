import { useState, useEffect, useCallback } from 'react';
import courseService from '../services/courseService';

export const useCourses = (filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Serialize to a stable string — prevents new {} reference on every render
  // from re-triggering useCallback → useEffect → infinite fetch loop
  const filtersKey = JSON.stringify(filters);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await courseService.getCourses(JSON.parse(filtersKey));
      setCourses(response.data ?? []);
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Removed setLoading(true) from mutations — fetchCourses already handles it.
  // Double-setting loading was causing an extra blink after add/update/delete.
  const addCourse = async (courseData) => {
    try {
      const response = await courseService.addCourse(courseData);
      await fetchCourses();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      const response = await courseService.updateCourse(id, courseData);
      await fetchCourses();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCourse = async (id) => {
    try {
      await courseService.deleteCourse(id);
      await fetchCourses();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { courses, loading, error, refetch: fetchCourses, addCourse, updateCourse, deleteCourse };
};