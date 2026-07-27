import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, KeyRound, Eye, EyeOff } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Login.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (identifier) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier })
        });
        const data = await response.json();
        
        if (response.ok) {
          setMessage('OTP sent! Please check your messages.');
          setStep(2);
        } else {
          setError(data.message || 'Failed to send OTP');
        }
      } catch (err) {
        setError('Server error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    
    if (otp && newPassword) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, otp, newPassword })
        });
        const data = await response.json();
        
        if (response.ok) {
          navigate('/login', { state: { message: 'Password reset successfully! Please login.' } });
        } else {
          setError(data.message || 'Failed to reset password');
        }
      } catch (err) {
        setError('Server error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg-orb-1" />
      <div className="login-bg-orb-2" />

      <header className="login-header">
        <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back">
          <ArrowLeft className="back-btn-icon" />
        </button>
        <span className="header-title">NariGo</span>
        <div className="header-spacer" />
      </header>

      <main className="login-main">
        <div className="login-logo-card">
          <KeyRound size={48} color="var(--color-primary)" />
        </div>

        <h2 className="login-heading">Reset Password</h2>
        <p className="login-subtitle">
          {step === 1 ? 'Enter your registered mobile or email.' : 'Enter the OTP and your new password.'}
        </p>

        {message && <div style={{ color: 'green', textAlign: 'center', marginBottom: '16px', background: 'rgba(0,255,0,0.1)', padding: '10px', borderRadius: '8px' }}>{message}</div>}
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '16px', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="login-form">
            <div className="form-group">
              <label className="form-label">Mobile Number or Email</label>
              <input
                type="text"
                placeholder="Enter mobile or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="primary-input"
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="login-form">
            <div className="form-group">
              <label className="form-label">6-Digit OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="primary-input"
                required
                maxLength={6}
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="inner-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                >
                  {showPassword ? <EyeOff className="password-toggle-icon" /> : <Eye className="password-toggle-icon" />}
                </button>
              </div>
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
