import React, { useState } from 'react';
import { validateLogin } from '../utils/validation';
import ConfirmModal from './ConfirmModal';
import './AuthForm.css';

const LoginForm = ({ onLogin, onSwitchToSignup, loading: parentLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const validationErrors = validateLogin(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const result = await onLogin(email, password);
    
    if (!result.success) {
      if (result.error === 'USER_NOT_FOUND') {
        setShowModal(true);
        setLoading(false);
        return;
      } else if (result.error === 'INVALID_CREDENTIALS') {
        setErrors({ general: '*Invalid email or password' });
      } else {
        setErrors({ general: result.error || 'An error occurred. Please try again.' });
      }
      setLoading(false);
      return;
    }

    // Login successful - component will unmount as user is authenticated
    setLoading(false);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    onSwitchToSignup();
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const isLoading = loading || parentLoading;

  return (
    <>
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="error-message general-error">{errors.general}</div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <div className="toggle-link">
            <span>Don't have an account? </span>
            <button type="button" onClick={onSwitchToSignup} className="link-button">
              Sign up
            </button>
          </div>
        </form>
      </div>
      <ConfirmModal
        isOpen={showModal}
        message="We don't have you in our systems, would you like to sign up?"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </>
  );
};

export default LoginForm;

