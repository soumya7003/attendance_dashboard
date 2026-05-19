import axios from 'axios';

// Base URL from environment variable (fallback for local dev)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor: attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('attendify-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 (unauthorized) – trigger logout
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem('attendify-refresh-token'); // if stored separately
        if (refreshToken) {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          localStorage.setItem('attendify-token', data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed – clear storage and redirect to login
        localStorage.removeItem('attendify-token');
        localStorage.removeItem('attendify-refresh-token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;