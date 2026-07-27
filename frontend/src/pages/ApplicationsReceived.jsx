import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Phone, Briefcase, Calendar, CheckCircle, XCircle, FileText } from 'lucide-react';
import './ApplicationsReceived.css';

export default function ApplicationsReceived() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  
  const lang = localStorage.getItem('nariGo_lang') || 'hi';

  const user = JSON.parse(localStorage.getItem('nariGo_user')) || {};
  const employerId = user.phoneNumber || user.email || 'unknown';

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const allJobs = JSON.parse(localStorage.getItem('nariGo_posted_jobs')) || [];
    const employerJobIds = allJobs.filter(job => job.employerId === employerId).map(j => j.id);

    const allApps = JSON.parse(localStorage.getItem('nariGo_job_applications')) || [];
    const employerApps = allApps.filter(app => employerJobIds.includes(app.jobId));
    setApplications(employerApps);
  };

  const updateStatus = (appId, newStatus) => {
    const allApps = JSON.parse(localStorage.getItem('nariGo_job_applications')) || [];
    const updatedAllApps = allApps.map(app => {
      if (app.applicationId === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    localStorage.setItem('nariGo_job_applications', JSON.stringify(updatedAllApps));
    
    // Update local state by re-filtering
    const allJobs = JSON.parse(localStorage.getItem('nariGo_posted_jobs')) || [];
    const employerJobIds = allJobs.filter(job => job.employerId === employerId).map(j => j.id);
    const updatedEmployerApps = updatedAllApps.filter(app => employerJobIds.includes(app.jobId));
    
    setApplications(updatedEmployerApps);
    window.dispatchEvent(new Event('storage'));
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  return (
    <div className="applications-container">
      <div className="applications-main">
        <header className="applications-header">
          <button className="secondary-btn" onClick={() => navigate('/employer-dashboard')} style={{ width: 'fit-content', padding: '0 16px', height: '44px' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="applications-title">{lang === 'hi' ? 'प्राप्त आवेदन' : 'Applications Received'}</h1>
        </header>

        {applications.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h2>{lang === 'hi' ? 'कोई आवेदन नहीं मिला' : 'No applications received yet'}</h2>
            <p>{lang === 'hi' ? 'उम्मीदवारों के आवेदन यहाँ दिखाई देंगे।' : 'Applications from candidates will appear here.'}</p>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map(app => (
              <div 
                key={app.applicationId} 
                className="application-card" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/candidate-profile', { state: { candidate: app } })}
              >
                <div className="app-card-header">
                  <div>
                    <h3 className="applicant-name">{app.fullName}</h3>
                    <p className="applicant-id">ID: {app.applicationId}</p>
                  </div>
                  <span className={`app-status status-${app.status || 'Pending'}`}>
                    {app.status || 'Pending'}
                  </span>
                </div>
                
                <div className="app-card-body">
                  <div className="app-detail">
                    <User className="app-detail-icon" size={16} />
                    <span><strong>{lang === 'hi' ? 'कौशल:' : 'Skills:'}</strong> {app.skills}</span>
                  </div>
                  <div className="app-detail">
                    <MapPin className="app-detail-icon" size={16} />
                    <span><strong>{lang === 'hi' ? 'स्थान:' : 'Location:'}</strong> {app.village}, {app.district}</span>
                  </div>
                  <div className="app-detail">
                    <Phone className="app-detail-icon" size={16} />
                    <span><strong>{lang === 'hi' ? 'फ़ोन:' : 'Mobile:'}</strong> {app.mobileNumber}</span>
                  </div>
                  <div className="app-detail">
                    <Briefcase className="app-detail-icon" size={16} />
                    <span><strong>{lang === 'hi' ? 'कार्य प्रकार:' : 'Work Type:'}</strong> {app.preferredWorkType}</span>
                  </div>
                  <div className="app-detail">
                    <Calendar className="app-detail-icon" size={16} />
                    <span><strong>{lang === 'hi' ? 'आवेदन तिथि:' : 'Applied:'}</strong> {formatDate(app.applyDate)}</span>
                  </div>
                </div>

                <div className="app-card-actions">
                  <button 
                    className="action-btn btn-shortlist" 
                    onClick={(e) => { e.stopPropagation(); updateStatus(app.applicationId, 'Shortlisted'); }}
                    disabled={app.status === 'Shortlisted'}
                  >
                    <CheckCircle size={16} /> {lang === 'hi' ? 'शॉर्टलिस्ट' : 'Shortlist'}
                  </button>
                  <button 
                    className="action-btn btn-hire" 
                    onClick={(e) => { e.stopPropagation(); updateStatus(app.applicationId, 'Hired'); }}
                    disabled={app.status === 'Hired'}
                  >
                    <Briefcase size={16} /> {lang === 'hi' ? 'नियुक्त करें' : 'Hire'}
                  </button>
                  <button 
                    className="action-btn btn-reject" 
                    onClick={(e) => { e.stopPropagation(); updateStatus(app.applicationId, 'Rejected'); }}
                    disabled={app.status === 'Rejected'}
                  >
                    <XCircle size={16} /> {lang === 'hi' ? 'अस्वीकार' : 'Reject'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
