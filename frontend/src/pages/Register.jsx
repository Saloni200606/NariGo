import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1 State
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('female');

  // Step 2 State
  const [district, setDistrict] = useState('');
  const [block, setBlock] = useState('');
  const [village, setVillage] = useState('');

  // Step 3 State
  const [registrationMethod, setRegistrationMethod] = useState('self');

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleFinish = () => {
    // Save to local storage for demo purposes
    const newUser = {
      fullName, dob, gender, district, block, village, registrationMethod,
      role: 'woman', verificationStatus: 'pending' 
    };
    localStorage.setItem('nariGo_user', JSON.stringify(newUser));
    navigate('/digital-profile');
  };

  const handleSaveLater = () => {
    navigate('/login');
  };

  const renderStep1 = () => (
    <div className="step-content">
      <div className="form-group">
        <label className="input-label-floating">Full Name</label>
        <input 
          type="text" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
          className="profile-input" 
          placeholder="Full Name"
          required
        />
      </div>

      <div className="form-group">
        <label className="input-label-floating floating-date">Date of Birth</label>
        <div className="input-with-icon">
          <input 
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
            className="profile-input" 
            placeholder="dd-mm-yyyy"
            required
          />
        </div>
      </div>

      <div className="gender-section">
        <h3 className="section-label">Gender</h3>
        <div className="gender-options">
          <button 
            type="button"
            className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
            onClick={() => setGender('female')}
          >
            <span className="gender-icon">♀</span> Female
          </button>
          <button 
            type="button"
            className={`gender-btn ${gender === 'other' ? 'active' : ''}`}
            onClick={() => setGender('other')}
          >
            <span className="gender-icon">⚥</span> Other
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="step-content">
      <div className="form-group">
        <label className="profile-label">State</label>
        <div className="locked-input-container">
          <input type="text" value="Rajasthan" readOnly className="profile-input locked" />
          <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
        </div>
        <p className="input-hint">ⓘ Service currently available in Rajasthan only.</p>
      </div>

      <div className="form-group">
        <label className="profile-label">District</label>
        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="profile-input select-icon select-district" required>
          <option value="">Search or select district</option>
          <option value="jaipur">Jaipur</option>
          <option value="jodhpur">Jodhpur</option>
          <option value="udaipur">Udaipur</option>
        </select>
      </div>

      <div className="form-group">
        <label className="profile-label">Block / Tehsil</label>
        <select value={block} onChange={(e) => setBlock(e.target.value)} className="profile-input select-icon select-block" required>
          <option value="">Search or select block</option>
          <option value="amer">Amer</option>
          <option value="phagi">Phagi</option>
        </select>
      </div>

      <div className="form-group">
        <label className="profile-label">Village</label>
        <select value={village} onChange={(e) => setVillage(e.target.value)} className="profile-input select-icon select-village" required>
          <option value="">Search or select village</option>
          <option value="kukus">Kukus</option>
          <option value="achrol">Achrol</option>
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const methods = [
      { id: 'self', title: 'Self Registration', desc: 'I am registering on my own using my mobile device or computer.', icon: '👤' },
      { id: 'csc', title: 'CSC Centre', desc: 'I am at a Common Service Centre assisted by an operator.', icon: '🏪' },
      { id: 'gram', title: 'Gram Panchayat', desc: 'I am registering at the local Village Council office.', icon: '🏛️' },
      { id: 'anganwadi', title: 'Anganwadi Centre', desc: 'Assistance provided by an Anganwadi worker or helper.', icon: '👶' },
      { id: 'shg', title: 'SHG Representative', desc: 'Registering with help from my Self Help Group lead.', icon: '👥' },
    ];

    return (
      <div className="step-content methods-list">
        {methods.map(m => (
          <div 
            key={m.id} 
            className={`method-card ${registrationMethod === m.id ? 'active' : ''}`}
            onClick={() => setRegistrationMethod(m.id)}
          >
            <div className="method-icon-circle">{m.icon}</div>
            <div className="method-info">
              <h4 className="method-title">{m.title}</h4>
              <p className="method-desc">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getSubtitles = () => {
    if (step === 1) return "Let's set up your profile to provide personalized opportunities.";
    if (step === 2) return "We need your location details to connect you with nearby opportunities and government schemes.";
    if (step === 3) return "Select the option that best describes your current registration process. This helps us provide the right support for your journey.";
  };

  const getPercentage = () => {
    if (step === 1) return "33%";
    if (step === 2) return "66%";
    return "100%";
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-content">
        
        {/* Logo */}
        <div className="setup-logo-container">
          <img src={logoImg} alt="NariGo Logo" className="setup-logo" />
        </div>

        <h2 className="setup-heading">
          {step === 3 ? "How are you registering today?" : "Complete Your Profile"}
        </h2>
        <p className="setup-subtitle">
          {getSubtitles()}
        </p>

        {/* Progress Bar */}
        <div className="progress-header">
          <span className="step-indicator">Step {step} of 3</span>
          <span className="completion-text">{getPercentage()} Completed</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: getPercentage() }}></div>
        </div>

        {/* Form Content */}
        <form className="setup-form-container" onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) handleNext();
          else handleFinish();
        }}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        
          {/* Actions */}
          <div className="setup-actions" style={{ marginTop: '20px' }}>
            <button type="submit" className="btn-primary">
              {step < 3 ? "Continue ➔" : "Finish & Create Profile"}
            </button>
            <button type="button" className="btn-secondary" onClick={handleSaveLater}>
              Save & Complete Later
            </button>
          </div>
        </form>

      </div>

      <footer className="setup-footer">
        {step === 1 && (
          <p className="footer-secure">
            <span className="secure-shield">🛡️</span> Your data is stored securely and encrypted.
          </p>
        )}
        {step === 2 && (
          <p className="footer-secure">
            <span className="secure-shield">🛡️</span> Your information is secured with 256-bit encryption
          </p>
        )}
        <p className="footer-copyright">
          © 2024 NariGo. Powered by the Ministry of Women and Child Development.
        </p>
      </footer>
    </div>
  );
}
