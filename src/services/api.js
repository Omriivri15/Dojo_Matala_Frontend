import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
          refreshToken
        });

        const newToken = response.data.token;
        localStorage.setItem('authToken', newToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  login: (email, password) => 
    api.post('/api/auth/login', { email, password }),

  signup: (fullName, email, password) => 
    api.post('/api/auth/start-signup', { fullName, email, password }),

  verifyOTP: (email, otp) => 
    api.post('/api/auth/verify-otp', { email, otp }),

  refreshToken: (refreshToken) => 
    axios.post(`${API_BASE_URL}/api/auth/refresh`, { refreshToken }),

  getMe: () => 
    api.get('/api/auth/me'),

  logout: () => 
    api.post('/api/auth/logout')
};

export default api;

