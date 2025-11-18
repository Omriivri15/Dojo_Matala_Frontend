import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import OTPForm from './components/OTPForm';
import Welcome from './components/Welcome';
import './App.css';

function App() {
  // Set page title
  useEffect(() => {
    document.title = 'DOJO IS GREAT';
  }, []);
  const { user, loading: authLoading, isAuthenticated, login, signup, verifyOTP, logout } = useAuth();
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'signupOtp'
  const [signupEmail, setSignupEmail] = useState('');

  // Handle login
  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      return result;
    }
    // Return error for LoginForm to handle
    return result;
  };

  // Handle signup
  const handleSignup = async (fullName, email, password) => {
    setSignupEmail(email);
    const result = await signup(fullName, email, password);
    if (result.success && result.needsOTP) {
      // Switch to OTP screen after successful signup
      setCurrentView('signupOtp');
      return result;
    }
    return result;
  };

  // Handle OTP verification
  const handleVerifyOTP = async (email, otp) => {
    const result = await verifyOTP(email, otp);
    return result;
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setCurrentView('login');
    setSignupEmail('');
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="app-container">
        <div className="auth-card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show welcome screen if authenticated
  if (isAuthenticated && user) {
    return (
      <div className="app-container">
        <Welcome user={user} onLogout={handleLogout} />
      </div>
    );
  }

  // Show OTP form if in signup OTP flow
  if (currentView === 'signupOtp') {
    return (
      <div className="app-container">
        <OTPForm 
          email={signupEmail} 
          onVerifyOTP={async (email, otp) => {
            const result = await handleVerifyOTP(email, otp);
            return result;
          }}
          loading={false}
          isSignup={true}
        />
      </div>
    );
  }

  // Show signup form
  if (currentView === 'signup') {
    return (
      <div className="app-container">
        <SignupForm 
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentView('login')}
          loading={false}
        />
      </div>
    );
  }

  // Show login form (default)
  return (
    <div className="app-container">
      <LoginForm 
        onLogin={handleLogin}
        onSwitchToSignup={() => setCurrentView('signup')}
        loading={false}
      />
    </div>
  );
}

export default App;
