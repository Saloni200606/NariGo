import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, LogOut } from 'lucide-react';
import './EmployerVerification.css';

export default function VerificationRejected() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('nariGo_user');
    localStorage.removeItem('nariGo_token');
    navigate('/');
  };

  return (
    <div className="apply-container">
      <div className="apply-bg-orb-1" />
      <div className="apply-bg-orb-2" />
      <div className="apply-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '500px' }}>
          <XCircle size={64} color="#EF4444" style={{ margin: '0 auto 20px' }} />
          <h2 className="text-heading" style={{ marginBottom: '16px' }}>Verification Rejected</h2>
          <p className="text-body" style={{ marginBottom: '32px' }}>
            Unfortunately, your employer verification was rejected. This may be due to missing documents or invalid business details. 
            Please contact NariGo support at support@narigo.in for assistance.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="primary-btn" onClick={() => navigate('/')}>
              Return Home
            </button>
            <button className="secondary-btn" onClick={handleLogout}>
              <LogOut size={16} style={{ marginRight: '8px' }} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
