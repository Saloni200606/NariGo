import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, ExternalLink, ShieldCheck, FileText, X } from 'lucide-react';
import './JobCardGuidance.css';

export default function JobCardGuidance() {
  const navigate = useNavigate();
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [showDocsModal, setShowDocsModal] = useState(false);

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
        <h1 className="guidance-title">Job Card Required</h1>
      </header>

      <div className="guidance-content">
        <div className="guidance-hero">
          <Info size={36} color="#D31245" />
          <h2>VB-G RAM G Job Card Required</h2>
          <p>
            To apply for VB-G RAM G work, you need a valid Job Card first. You can apply for your Job Card through the official portal or your local e-Mitra / Gram Panchayat center.
          </p>
        </div>

        <div className="guidance-section">
          <h3>Required Documents for Job Card</h3>
          <ul className="doc-list">
            <li><ShieldCheck size={18} color="#059669" /> Aadhaar Card</li>
            <li><ShieldCheck size={18} color="#059669" /> Address Proof (Voter ID / Ration Card)</li>
            <li><ShieldCheck size={18} color="#059669" /> Bank Account Details</li>
            <li><ShieldCheck size={18} color="#059669" /> Passport Size Photograph</li>
          </ul>
        </div>

        <div className="guidance-actions">
          <button 
            className="btn-external primary"
            onClick={() => handleExternalRedirect('https://nrega.nic.in')}
          >
            Apply for Job Card <ExternalLink size={18} />
          </button>

          <button 
            className="btn-external secondary"
            onClick={() => handleExternalRedirect('https://emitra.rajasthan.gov.in')}
          >
            Apply via e-Mitra / CSC <ExternalLink size={18} />
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
