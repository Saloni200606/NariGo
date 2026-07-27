import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';
import './EmployerVerification.css';

const VERIFICATION_STEPS = [
  "Validating business information...",
  "Verifying uploaded documents...",
  "Checking employer authenticity...",
  "Finalizing verification..."
];

export default function VerificationPending() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Total duration: 8 seconds (8000ms)
    // Update progress every 100ms
    const totalDuration = 8000;
    const interval = 100;
    let elapsed = 0;
    
    const progressTimer = setInterval(() => {
      elapsed += interval;
      const currentProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(currentProgress);
      
      // Update messages based on progress
      if (currentProgress < 25) {
        setStepIndex(0);
      } else if (currentProgress < 50) {
        setStepIndex(1);
      } else if (currentProgress < 75) {
        setStepIndex(2);
      } else if (currentProgress < 100) {
        setStepIndex(3);
      }
      
      if (elapsed >= totalDuration) {
        clearInterval(progressTimer);
        handleVerificationSuccess();
      }
    }, interval);

    return () => clearInterval(progressTimer);
  }, []);

  const handleVerificationSuccess = () => {
    // 1. Update user session
    const userStr = localStorage.getItem('nariGo_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      user.verificationStatus = 'Verified';
      localStorage.setItem('nariGo_user', JSON.stringify(user));
      
      // 2. Update demo users database
      const existingUsers = JSON.parse(localStorage.getItem('nariGo_demo_users')) || [];
      const updatedUsers = existingUsers.map(u => {
        if (u.phoneNumber === user.phoneNumber || u.email === user.email) {
          return { ...u, verificationStatus: 'Verified' };
        }
        return u;
      });
      localStorage.setItem('nariGo_demo_users', JSON.stringify(updatedUsers));
    }
    
    setIsVerified(true);
    
    // Redirect after 2 seconds of showing the success screen
    setTimeout(() => {
      navigate('/employer-dashboard');
    }, 2000);
  };

  return (
    <div className="apply-container">
      <div className="apply-bg-orb-1" />
      <div className="apply-bg-orb-2" />
      <div className="apply-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '500px', width: '90%' }}>
          
          {!isVerified ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', color: '#F59E0B' }}>
                <Loader2 size={64} className="spin-animation" style={{ animation: 'spin 2s linear infinite' }} />
              </div>
              <h2 className="text-heading" style={{ marginBottom: '16px' }}>Verification in Progress</h2>
              <p className="text-body" style={{ marginBottom: '24px', fontWeight: 500 }}>
                {VERIFICATION_STEPS[stepIndex]}
              </p>
              
              {/* Progress Bar */}
              <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${progress}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #F59E0B, #10B981)',
                  transition: 'width 0.1s linear'
                }} />
              </div>
              <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-small)' }}>
                Your documents have been submitted successfully. Please wait while we process them...
              </p>
            </>
          ) : (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', color: '#10B981' }}>
                <CheckCircle size={64} />
              </div>
              <h2 className="text-heading" style={{ marginBottom: '16px', color: '#10B981' }}>
                Verified Employer ✓
              </h2>
              <p className="text-body" style={{ marginBottom: '16px' }}>
                Congratulations! Your employer account has been successfully verified.
              </p>
              <p className="text-body" style={{ fontSize: '14px', color: 'var(--color-text-small)' }}>
                Redirecting to dashboard...
              </p>
            </div>
          )}
          
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
