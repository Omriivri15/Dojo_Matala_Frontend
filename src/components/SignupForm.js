import React, { useState } from 'react';
import { validateSignup } from '../utils/validation';
import './AuthForm.css';

const SignupForm = ({ onSignup, onSwitchToLogin, loading: parentLoading }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const validationErrors = validateSignup(fullName, email, password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const result = await onSignup(fullName, email, password);
    
    if (!result.success) {
      setErrors({ general: result.error || 'Failed to sign up. Please try again.' });
    }

    setLoading(false);
  };

  const isLoading = loading || parentLoading;

  return (
    <div className="auth-card">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}
        <div className="form-group">
          <label htmlFor="signup-fullName">Full Name</label>
          <input
            type="text"
            id="signup-fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            disabled={isLoading}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@domain.com"
            disabled={isLoading}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={isLoading}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="signup-confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="signup-confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            disabled={isLoading}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
        <div className="toggle-link">
          <span>Already have an account? </span>
          <button type="button" onClick={onSwitchToLogin} className="link-button">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

