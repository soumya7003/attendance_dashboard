import api from './api';

/**
 * courseService
 * Thin wrapper around the Axios instance for /api/courses.
 * Auth token is automatically injected by the Axios interceptor in api.js.
 */
const courseService = {
  /**
   * GET /api/courses
   * @param {Object} filters  - { department?, minEnrolled?, maxEnrolled? }
   * @param {Object} options  - Axios extras (e.g. { signal } for AbortController)
   * @returns {Promise<Array>}
   */
  getAll: async (filters = {}, options = {}) => {
    // Strip undefined / empty string values so they don't pollute query params.
    const params = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined && v !== null)
    );
    const res = await api.get('/courses', { params, ...options });
    return res.data;
  },

  /**
   * POST /api/courses
   * @param {{ code: string, name: string, department: string }} payload
   * @returns {Promise<Object>} newly created course
   */
  create: async (payload) => {
    const res = await api.post('/courses', payload);
    return res.data;
  },

  /**
   * PUT /api/courses/:id
   * @param {string} id
   * @param {Object} payload
   * @returns {Promise<Object>} updated course
   */
  update: async (id, payload) => {
    const res = await api.put(`/courses/${id}`, payload);
    return res.data;
  },

  /**
   * DELETE /api/courses/:id
   * @param {string} id
   * @returns {Promise<void>}
   */
  remove: async (id) => {
    await api.delete(`/courses/${id}`);
  },
};

export default courseService;