import axios from 'axios';

// Buat instance utama
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // sesuaikan dengan backend kamu
  timeout: 20000,
});

// Tambahkan interceptor untuk otomatis menyertakan token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;  
}, error => {
  return Promise.reject(error);
});

export default api;
