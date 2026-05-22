import { useState, useEffect, useCallback } from 'react';
import courseService from '../services/courseService';

export const useCourses = (filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await courseService.getCourses(filters);
      setCourses(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const addCourse = async (courseData) => {
    setLoading(true);
    try {
      const response = await courseService.addCourse(courseData);
      await fetchCourses();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id, courseData) => {
    setLoading(true);
    try {
      const response = await courseService.updateCourse(id, courseData);
      await fetchCourses();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    setLoading(true);
    try {
      await courseService.deleteCourse(id);
      await fetchCourses();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, error, refetch: fetchCourses, addCourse, updateCourse, deleteCourse };
};