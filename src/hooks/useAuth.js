import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.getMe();
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        // Token invalid or expired
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, refreshToken, user } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      const errorCode = error.response?.status;
      const errorMessage = error.response?.data?.error;
      
      // Return specific error codes for handling
      if (errorCode === 404 && errorMessage === 'USER_NOT_FOUND') {
        return { success: false, error: 'USER_NOT_FOUND' };
      }
      if (errorCode === 401 && errorMessage === 'INVALID_CREDENTIALS') {
        return { success: false, error: 'INVALID_CREDENTIALS' };
      }
      
      return { 
        success: false, 
        error: errorMessage || 'Login failed' 
      };
    }
  };

  const signup = async (fullName, email, password) => {
    try {
      const response = await authAPI.signup(fullName, email, password);
      // OTP sent successfully - return success but don't log in yet
      return { success: true, needsOTP: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Signup failed' 
      };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await authAPI.verifyOTP(email, otp);
      const { token, refreshToken, user } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      if (errorMessage === 'INVALID_OTP') {
        return { 
          success: false, 
          error: 'INVALID_OTP' 
        };
      }
      return { 
        success: false, 
        error: errorMessage || 'OTP verification failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    verifyOTP,
    logout
  };
};

