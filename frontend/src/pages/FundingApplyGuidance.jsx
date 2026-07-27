import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Info, CheckSquare, ExternalLink, ShieldCheck, X, Landmark } from 'lucide-react';
import './FundingApplyGuidance.css';

export default function FundingApplyGuidance() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { schemeId } = useParams();
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const scheme = state?.scheme || {
    id: schemeId || 1,
    schemeName: 'PMEGP',
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
      {/* Header */}
      <header className="funding-guidance-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="funding-guidance-title">Funding Application Guidance</h1>
      </header>

      <div className="funding-guidance-content">
        {/* Hero Card */}
        <div className="funding-guidance-hero">
          <Landmark size={32} color="#D31245" />
          <h2>Apply for Government Funding Support</h2>
          <p className="hero-scheme-tag">{scheme.schemeName}</p>
          <p className="hero-desc">
            Your application will be completed through the official government platform.
          </p>
        </div>

        {/* Before Applying Section */}
        <div className="guidance-section">
          <h3>Before Applying</h3>
          <ul className="checklist">
            <li><CheckSquare size={18} color="#059669" /> Keep required documents ready</li>
            <li><CheckSquare size={18} color="#059669" /> Check eligibility criteria</li>
            <li><CheckSquare size={18} color="#059669" /> Prepare business details / project report</li>
          </ul>
        </div>

        {/* Required Documents Section */}
        <div className="guidance-section">
          <h3>Required Documents</h3>
          <ul className="doc-list">
            <li><ShieldCheck size={18} color="#D31245" /> Aadhaar Card</li>
            <li><ShieldCheck size={18} color="#D31245" /> PAN Card (if required)</li>
            <li><ShieldCheck size={18} color="#D31245" /> Bank Account Details</li>
            <li><ShieldCheck size={18} color="#D31245" /> Business Plan / Project Report (if required)</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="guidance-actions">
          <button 
            className="btn-external primary"
            onClick={() => handleExternalRedirect(`https://${scheme.officialSource || 'kviconline.gov.in'}`)}
          >
            Apply on Official Website <ExternalLink size={18} />
          </button>
          
          <button 
            className="btn-external secondary"
            onClick={() => handleExternalRedirect('https://emitra.rajasthan.gov.in')}
          >
            Apply through e-Mitra / CSC <ExternalLink size={18} />
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
