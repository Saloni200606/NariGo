import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Landmark, CheckSquare, ExternalLink, ShieldCheck, X } from 'lucide-react';
import './FundingApplyGuidance.css'; // Reusing guidance CSS

export default function FundingRedirectFlow() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const scheme = state?.scheme || {
    schemeName: 'PMEGP',
    fullName: "Prime Minister's Employment Generation Programme",
    officialSource: 'kviconline.gov.in'
  };

  const handleExternalRedirect = (url) => {
    setRedirectUrl(url);
    setShowRedirectModal(true);
  };

  const confirmRedirect = () => {
    setShowRedirectModal(false);
    window.open(redirectUrl, '_blank');
  };

  return (
    <div className="funding-guidance-container">
      <header className="funding-guidance-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="funding-guidance-title">Official Application Required</h1>
      </header>

      <div className="funding-guidance-content">
        <div className="funding-guidance-hero">
          <Landmark size={36} color="#D31245" />
          <h2>Official Application Required</h2>
          <p className="hero-scheme-tag">{scheme.schemeName}</p>
          <p className="hero-desc">
            Your application for <strong>{scheme.fullName || scheme.schemeName}</strong> will be processed through the official government portal.
          </p>
        </div>

        <div className="guidance-section">
          <h3>Before Applying</h3>
          <ul className="checklist">
            <li><CheckSquare size={18} color="#059669" /> Keep required documents ready</li>
            <li><CheckSquare size={18} color="#059669" /> Check scheme eligibility criteria</li>
            <li><CheckSquare size={18} color="#059669" /> Prepare business details / project report</li>
          </ul>
        </div>

        <div className="guidance-section">
          <h3>Required Documents</h3>
          <ul className="doc-list">
            <li><ShieldCheck size={18} color="#D31245" /> Aadhaar Card</li>
            <li><ShieldCheck size={18} color="#D31245" /> PAN Card (if required)</li>
            <li><ShieldCheck size={18} color="#D31245" /> Bank Account Details</li>
            <li><ShieldCheck size={18} color="#D31245" /> Business Plan / Project Report</li>
          </ul>
        </div>

        <div className="guidance-actions">
          <button 
            className="btn-external primary"
            onClick={() => handleExternalRedirect(`https://${scheme.officialSource || 'kviconline.gov.in'}`)}
          >
            Apply on Official Portal <ExternalLink size={18} />
          </button>
          
          <button 
            className="btn-external secondary"
            onClick={() => handleExternalRedirect('https://emitra.rajasthan.gov.in')}
          >
            Apply through e-Mitra / CSC <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* External Redirect Confirmation Modal */}
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
              <p>You are being redirected to the official government application portal.</p>
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
