import { useState, useEffect, useCallback } from 'react';
import deviceService from '../services/deviceService';

export const useDevices = (filters = {}) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDevices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await deviceService.getDevices(filters);
      setDevices(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const updateDeviceStatus = async (id, status) => {
    try {
      const response = await deviceService.updateDeviceStatus(id, status);
      await fetchDevices();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { devices, loading, error, refetch: fetchDevices, updateDeviceStatus };
};