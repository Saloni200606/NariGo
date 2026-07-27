import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, MapPin, Mail, CheckCircle } from 'lucide-react';
import '../rsldc/rsldc-pages.css';

const Profile = () => {
  const navigate = useNavigate();
  
  const userStr = localStorage.getItem('nariGo_user');
  const user = userStr ? JSON.parse(userStr) : {};
  
  const userName = user.companyName || user.fullName || 'Saloni Sharma'; 
  const phone = user.phoneNumber || '+91 98765 43210';
  const location = user.district ? `${user.village ? user.village + ', ' : ''}${user.district}` : 'Jaipur, Rajasthan';
  const email = user.email || 'saloni@example.com';
  
  const role = user.role?.toLowerCase() === 'employer' ? 'employer' : 'user';
  const verificationStatus = user.verificationStatus || 'pending'; // Default to pending if not set
  
  let badgeDisplay;
  if (role === 'employer') {
    if (verificationStatus === 'Verified') {
      badgeDisplay = (
        <p className="text-body" style={{ color: '#007BFF', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle size={16} /> Verified Employer
        </p>
      );
    } else if (verificationStatus === 'pending' || verificationStatus === 'Pending') {
      badgeDisplay = <p className="text-body" style={{ color: '#F59E0B' }}>Verification Pending</p>;
    } else {
      badgeDisplay = <p className="text-body" style={{ color: '#DC2626' }}>Verification Rejected</p>;
    }
  } else {
    badgeDisplay = <p className="text-body" style={{ color: 'var(--color-primary)' }}>Verified User</p>;
  }

  return (
    <div className="rsldc-page-container page-padding">
      <div className="rsldc-page-header">
        <button 
          className="secondary-btn" 
          style={{ width: 'fit-content', padding: '0 20px', marginBottom: '20px', height: '44px' }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Back
        </button>
        <h1 className="text-heading">My Profile</h1>
      </div>

      <div className="rsldc-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '500px', margin: '0 auto' }}>
        <div className="rsldc-item-card glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div className="rsldc-icon-circle" style={{ width: '80px', height: '80px', background: 'var(--color-primary)', color: 'white', marginBottom: 0 }}>
              <User size={40} />
            </div>
            <div>
              <h2 className="text-subheading" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {userName}
                {role === 'employer' && verificationStatus === 'Verified' && <CheckCircle size={20} color="#007BFF" />}
              </h2>
              {badgeDisplay}
            </div>
          </div>
          
          <div className="rsldc-description" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone color="var(--color-text-small)" size={20} />
              <span className="text-body">{phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail color="var(--color-text-small)" size={20} />
              <span className="text-body">{email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin color="var(--color-text-small)" size={20} />
              <span className="text-body">{location}</span>
            </div>
          </div>
          
          <div className="rsldc-action-row" style={{ marginTop: '24px' }}>
            <button className="primary-btn" style={{ width: '100%' }} onClick={() => navigate('/digital-profile')}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
