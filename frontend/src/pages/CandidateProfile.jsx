import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, User, Phone, MessageSquare, MapPin, 
  Briefcase, GraduationCap, CheckCircle, XCircle, FileText, IndianRupee, Clock, Map
} from 'lucide-react';
import './CandidateProfile.css';

export default function CandidateProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [candidate, setCandidate] = useState(location.state?.candidate || null);
  const lang = localStorage.getItem('nariGo_lang') || 'hi';

  useEffect(() => {
    if (!candidate) {
      navigate('/applications');
    }
  }, [candidate, navigate]);

  if (!candidate) return null;

  const updateStatus = (newStatus) => {
    const apps = JSON.parse(localStorage.getItem('nariGo_job_applications')) || [];
    const updated = apps.map(app => {
      if (app.applicationId === candidate.applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    localStorage.setItem('nariGo_job_applications', JSON.stringify(updated));
    setCandidate({ ...candidate, status: newStatus });
    window.dispatchEvent(new Event('storage'));
  };

  const handleCall = () => {
    window.location.href = `tel:${candidate.mobileNumber}`;
  };

  const handleMessage = () => {
    window.location.href = `sms:${candidate.mobileNumber}`;
  };

  return (
    <div className="candidate-profile-container">
      <div className="candidate-profile-main">
        <header className="candidate-header">
          <button className="secondary-btn" onClick={() => navigate(-1)} style={{ width: 'fit-content', padding: '0 16px', height: '44px' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="candidate-title">{lang === 'hi' ? 'उम्मीदवार प्रोफ़ाइल' : 'Candidate Profile'}</h1>
        </header>

        <div className="candidate-card">
          <div className="candidate-top-section">
            <div>
              <h2 className="candidate-name">{candidate.fullName}</h2>
              <p className="candidate-id">ID: {candidate.applicationId} • Job ID: {candidate.jobId}</p>
              <span className={`candidate-status-badge status-${candidate.status || 'Pending'}`}>
                {candidate.status || 'Pending'}
              </span>
            </div>
            
            <div className="candidate-actions">
              <button className="contact-btn btn-call" onClick={handleCall}>
                <Phone size={16} /> {lang === 'hi' ? 'कॉल करें' : 'Call'}
              </button>
              <button className="contact-btn btn-message" onClick={handleMessage}>
                <MessageSquare size={16} /> {lang === 'hi' ? 'संदेश भेजें' : 'Message'}
              </button>
            </div>
          </div>

          <div className="candidate-details-grid">
            <div className="detail-group">
              <span className="detail-label">{lang === 'hi' ? 'आयु' : 'Age'}</span>
              <span className="detail-value"><User size={18} className="app-detail-icon" /> {candidate.age} {lang === 'hi' ? 'वर्ष' : 'years'}</span>
            </div>
            
            <div className="detail-group">
              <span className="detail-label">{lang === 'hi' ? 'स्थान' : 'Location'}</span>
              <span className="detail-value"><MapPin size={18} className="app-detail-icon" /> {candidate.village}, {candidate.district}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">{lang === 'hi' ? 'शिक्षा' : 'Education'}</span>
              <span className="detail-value"><GraduationCap size={18} className="app-detail-icon" /> {candidate.education || 'N/A'}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">{lang === 'hi' ? 'अनुभव' : 'Experience'}</span>
              <span className="detail-value"><Briefcase size={18} className="app-detail-icon" /> {candidate.workExperience || 'N/A'}</span>
            </div>

            <div className="detail-group full-width">
              <span className="detail-label">{lang === 'hi' ? 'कौशल' : 'Skills'}</span>
              <span className="detail-value" style={{ flexWrap: 'wrap', gap: '8px' }}>
                {candidate.skills}
              </span>
            </div>

            <div className="detail-group">
              <span className="detail-label">{lang === 'hi' ? 'पसंदीदा कार्य प्रकार' : 'Preferred Work Type'}</span>
              <span className="detail-value"><Briefcase size={18} className="app-detail-icon" /> {candidate.preferredWorkType || 'N/A'}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">{lang === 'hi' ? 'उपलब्ध कार्य घंटे' : 'Available Hours'}</span>
              <span className="detail-value"><Clock size={18} className="app-detail-icon" /> {candidate.availableWorkingHours || 'N/A'}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">{lang === 'hi' ? 'यात्रा दूरी' : 'Travel Distance'}</span>
              <span className="detail-value"><Map size={18} className="app-detail-icon" /> {candidate.preferredTravelDistance || 'N/A'}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">{lang === 'hi' ? 'वेतन अपेक्षा' : 'Expected Salary'}</span>
              <span className="detail-value"><IndianRupee size={18} className="app-detail-icon" /> {candidate.salaryExpectation || 'N/A'}</span>
            </div>

            <div className="detail-group full-width">
              <span className="detail-label">{lang === 'hi' ? 'अपलोड किए गए दस्तावेज़' : 'Uploaded Documents'}</span>
              <span className="detail-value"><FileText size={18} className="app-detail-icon" /> {candidate.skillCertificate ? 'Skill Certificate Provided' : 'No documents uploaded'}</span>
            </div>
          </div>

          <div className="decision-actions">
            <button 
              className="decision-btn btn-shortlist" 
              onClick={() => updateStatus('Shortlisted')}
              disabled={candidate.status === 'Shortlisted'}
            >
              <CheckCircle size={20} /> {lang === 'hi' ? 'शॉर्टलिस्ट' : 'Shortlist'}
            </button>
            <button 
              className="decision-btn btn-hire" 
              onClick={() => updateStatus('Hired')}
              disabled={candidate.status === 'Hired'}
            >
              <Briefcase size={20} /> {lang === 'hi' ? 'नियुक्त करें' : 'Hire Candidate'}
            </button>
            <button 
              className="decision-btn btn-reject" 
              onClick={() => updateStatus('Rejected')}
              disabled={candidate.status === 'Rejected'}
            >
              <XCircle size={20} /> {lang === 'hi' ? 'अस्वीकार' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
