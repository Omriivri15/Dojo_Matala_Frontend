import React, { useState } from 'react';
import './AuthForm.css';

const OTPForm = ({ email, onVerifyOTP, loading: parentLoading, isSignup = false }) => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!otp) {
      setErrors({ otp: '* Required Field' });
      setLoading(false);
      return;
    }

    const result = await onVerifyOTP(email, otp);
    
    if (!result.success) {
      if (result.error === 'INVALID_OTP') {
        setErrors({ otp: '*Invalid or expired OTP' });
      } else {
        setErrors({ otp: '*Invalid or expired OTP' });
      }
      setLoading(false);
      return;
    }

    // OTP verified successfully - user will be logged in automatically
    setLoading(false);
  };

  const isLoading = loading || parentLoading;

  return (
    <div className="auth-card">
      <h2>{isSignup ? 'Verify Your Email' : 'Enter OTP'}</h2>
      <p className="info-text">
        {isSignup 
          ? 'We sent a verification code to your email. Please enter it below to complete your signup.'
          : 'Please enter the OTP sent to your email.'}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            disabled={isLoading}
          />
          {errors.otp && <span className="error-message">{errors.otp}</span>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Submit OTP'}
        </button>
      </form>
    </div>
  );
};

export default OTPForm;

