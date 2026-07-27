import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/verify-otp', { state: { identifier: mobileNumber } });
      }, 500);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        
        {/* Logo */}
        <div className="login-logo-container">
          <img src={logoImg} alt="NariGo Logo" className="login-logo" />
        </div>

        <h2 className="login-heading">Welcome Back</h2>
        <p className="login-subtitle">
          Sign in to access government schemes, training, employment services, and entrepreneurship opportunities.
        </p>

        <form onSubmit={handleSendOtp} className="login-form">
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <div className="mobile-input-container">
              <div className="country-code">
                <span className="country-in">IN</span>
                <span className="country-num">+91</span>
              </div>
              <input
                type="tel"
                placeholder="Enter 10 digit number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="mobile-input"
                maxLength={10}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading || mobileNumber.length < 10}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>

        <div className="divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">OR</span>
          <div className="divider-line"></div>
        </div>

        <button className="google-btn" type="button">
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="register-text">
          Don't have an account?{' '}
          <span onClick={handleRegisterRedirect} className="register-link">
            Create Account
          </span>
        </p>
      </div>

      <footer className="login-footer">
        <div className="lang-switcher">
          <span className="lang-active">English</span>
          <span className="lang-separator">|</span>
          <span className="lang-inactive">हिंदी</span>
        </div>
        <div className="footer-links">
          <span className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="help-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Help
          </span>
          <span className="footer-dot">•</span>
          <span className="footer-link">Privacy Policy</span>
          <span className="footer-dot">•</span>
          <span className="footer-link">Terms & Conditions</span>
        </div>
        <p className="footer-copyright">
          © 2024 NariGo. An Empowerment Initiative.
        </p>
      </footer>
    </div>
  );
}
