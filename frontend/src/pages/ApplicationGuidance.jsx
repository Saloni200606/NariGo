import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, CheckSquare, ExternalLink, ShieldCheck, X } from 'lucide-react';
import './ApplicationGuidance.css';

export default function ApplicationGuidance() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  // Handle generic schemes, job cards, and training courses
  const isJobCard = state?.type === 'job-card';
  const isTraining = state?.type === 'training';
  
  let title = 'Apply for Government Support';
  if (isJobCard) title = 'Apply for VB-G RAM G Job Card';
  if (isTraining) title = 'Enroll in Skill Training Program';

  const schemeSource = state?.scheme?.officialSource || 'Official Government Portal';

  let defaultDocs = ['Aadhaar Card', 'PAN Card (if required)', 'Bank Details', 'Business Plan (if required)'];
  if (isJobCard) {
    defaultDocs = ['Aadhaar Card', 'Address Proof', 'Bank Account Details', 'Passport Size Photo'];
  } else if (isTraining) {
    defaultDocs = ['Aadhaar Card', 'Mobile Number', 'Educational Documents (if required)'];
  }
    
  const docs = state?.scheme?.requiredDocs || defaultDocs;

  const handleExternalRedirect = (url) => {
    setRedirectUrl(url);
    setShowRedirectModal(true);
  };

  const confirmRedirect = () => {
    setShowRedirectModal(false);
    window.open(redirectUrl, '_blank');
  };

  return (
    <div className="guidance-container">
      <header className="guidance-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="guidance-title">Application Guidance</h1>
      </header>

      <div className="guidance-content">
        <div className="guidance-hero">
          <Info size={32} color="#2563EB" />
          <h2>{title}</h2>
          <p>
            {isJobCard && 'To apply for a Job Card, you need to submit your application through the official government channel.'}
            {isTraining && 'Your enrollment will be completed through the official government skill development portal.'}
            {!isJobCard && !isTraining && 'Your application will be completed through the official government portal.'}
          </p>
        </div>

        <div className="guidance-section">
          <h3>Before You Apply</h3>
          <ul className="checklist">
            <li><CheckSquare size={18} color="#059669" /> Keep required documents ready</li>
            <li><CheckSquare size={18} color="#059669" /> Check eligibility criteria</li>
            <li><CheckSquare size={18} color="#059669" /> Use your registered mobile number</li>
            <li><CheckSquare size={18} color="#059669" /> Complete application on official portal</li>
          </ul>
        </div>

        <div className="guidance-section">
          <h3>Required Documents</h3>
          <ul className="doc-list">
            {docs.map(doc => (
              <li key={doc}><ShieldCheck size={18} color="#D31245" /> {doc}</li>
            ))}
          </ul>
        </div>

        <div className="guidance-actions">
          <button 
            className="btn-external primary"
            onClick={() => handleExternalRedirect(`https://${schemeSource}`)}
          >
            Open Official Website <ExternalLink size={18} />
          </button>
          
          <button 
            className="btn-external secondary"
            onClick={() => handleExternalRedirect('https://emitra.rajasthan.gov.in')}
          >
            Open e-Mitra <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* Redirect Confirmation Modal */}
      {showRedirectModal && (
        <div className="modal-overlay">
          <div className="redirect-modal">
            <div className="modal-header">
              <h3>Leaving NariGo</h3>
              <button className="close-btn" onClick={() => setShowRedirectModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <ExternalLink size={40} color="#D31245" className="modal-icon" />
              <p>You are being redirected to the official government portal.</p>
              <span className="url-preview">{redirectUrl}</span>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowRedirectModal(false)}>Cancel</button>
              <button className="btn-proceed" onClick={confirmRedirect}>Proceed</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
