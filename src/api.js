import axios from 'axios';

// Build API base URL reliably so frontend file URLs can use the raw backend origin
// and API calls still go to the /api prefix.
// Expected VITE_API_URL: either "https://your-backend" or "https://your-backend/api"
const rawBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// ensure no trailing slash on rawBase
const backendBase = rawBase.replace(/\/+$/, '');
const apiBase = backendBase.endsWith('/api') ? backendBase : `${backendBase}/api`;

const api = axios.create({
  baseURL: apiBase,
  timeout: 30000,
});

// Interceptor token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
