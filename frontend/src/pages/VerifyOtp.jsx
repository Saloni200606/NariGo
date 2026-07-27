import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import './VerifyOtp.css';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const rawPhone = location.state?.identifier || '9876543210';
  const displayPhone = `+91 ${rawPhone.slice(0, 2)}XXXXXX${rawPhone.slice(-2)}`;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Navigate based on user role or default to dashboard
        navigate('/dashboard');
      }, 800);
    }
  };

  const handleEdit = () => {
    navigate('/login');
  };

  const handleResend = () => {
    // resend logic
  };

  return (
    <div className="otp-container">
      <div className="otp-content">
        
        {/* Logo */}
        <div className="otp-logo-container">
          <img src={logoImg} alt="NariGo Logo" className="otp-logo" />
        </div>

        {/* Heading & Subtitle */}
        <h2 className="otp-heading">Verify Your Mobile Number</h2>
        <p className="otp-subtitle">
          Enter the 6-digit OTP sent to your registered mobile number.
        </p>

        {/* Number Badge */}
        <div className="number-badge">
          <div className="number-info">
            <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="phone-icon">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            <span className="display-phone">{displayPhone}</span>
          </div>
          <button type="button" onClick={handleEdit} className="edit-btn">
            Edit Number
          </button>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleVerify} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input"
                required
              />
            ))}
          </div>

          <div className="resend-text">
            Didn't receive the OTP? <span onClick={handleResend} className="resend-link">Resend OTP</span>
          </div>

          <button
            type="submit"
            className="otp-submit-btn"
            disabled={loading || otp.join('').length < 6}
          >
            {loading ? 'VERIFYING...' : 'VERIFY & CONTINUE'}
          </button>
        </form>

        {/* Secure Alert */}
        <div className="secure-alert">
          <div className="alert-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="#f04878" className="lock-icon">
              <rect x="5" y="11" width="14" height="10" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
          </div>
          <p className="alert-text">
            Your mobile number is securely verified to protect your account and access government services.
          </p>
        </div>

      </div>

      <footer className="otp-footer">
        <p className="otp-footer-text">
          Need Help? <span className="support-link">Contact Support</span>
        </p>
      </footer>
    </div>
  );
}
