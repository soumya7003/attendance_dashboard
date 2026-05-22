import { useState, useEffect, useCallback } from 'react';
import { studentService } from '../services/studentService';

export const useStudents = (filters = {}) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await studentService.getStudents(filters);
      setStudents(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const addStudent = async (studentData) => {
    setLoading(true);
    try {
      const response = await studentService.addStudent(studentData);
      await fetchStudents(); // refresh list
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, studentData) => {
    setLoading(true);
    try {
      const response = await studentService.updateStudent(id, studentData);
      await fetchStudents();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      await studentService.deleteStudent(id);
      await fetchStudents();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    students,
    loading,
    error,
    total,
    refetch: fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  };
};