import axios from 'axios';

/**
 * LearnPath AI Shared Axios Instance
 * Base URL is loaded from environment variable VITE_API_URL
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT token if stored
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('learnpath_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Standardize error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized handling
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('learnpath_token');
    }
    return Promise.reject(error);
  }
);

// Resume Feature API Methods
export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post('/profile/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const parseResume = () => api.post('/profile/resume/parse');

export const saveResumeData = (data) => api.put('/profile/resume-data', data);

export const deleteResume = () => api.delete('/profile/resume');

export default api;
