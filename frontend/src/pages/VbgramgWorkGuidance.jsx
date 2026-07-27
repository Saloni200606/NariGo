import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Briefcase, MapPin, ExternalLink, X } from 'lucide-react';
import './ApplicationGuidance.css'; // Reusing modal CSS

export default function VbgramgWorkGuidance() {
  const navigate = useNavigate();
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  const confirmRedirect = () => {
    setShowRedirectModal(false);
    window.open('https://nrega.nic.in', '_blank');
  };

  return (
    <div className="guidance-container" style={{paddingBottom: '90px'}}>
      <header className="guidance-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="guidance-title">Find VB-G RAM G Work</h1>
      </header>

      <div className="guidance-content">
        <div className="guidance-hero" style={{padding: '20px'}}>
          <Briefcase size={32} color="#059669" />
          <h2>Work Opportunities Available</h2>
          <p>You can apply for the following verified work categories using your Job Card.</p>
        </div>

        <div className="guidance-section" style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          
          <div style={{borderBottom: '1px solid #F3F4F6', paddingBottom: '12px'}}>
            <h4 style={{margin: '0 0 4px 0', fontSize: '15px', color: '#111827'}}>Agriculture-related work</h4>
            <div style={{display: 'flex', gap: '4px', alignItems: 'center', fontSize: '13px', color: '#6B7280'}}>
              <MapPin size={14} /> Available in your Gram Panchayat
            </div>
          </div>

          <div style={{borderBottom: '1px solid #F3F4F6', paddingBottom: '12px'}}>
            <h4 style={{margin: '0 0 4px 0', fontSize: '15px', color: '#111827'}}>Water conservation work</h4>
            <div style={{display: 'flex', gap: '4px', alignItems: 'center', fontSize: '13px', color: '#6B7280'}}>
              <MapPin size={14} /> Available in nearby villages
            </div>
          </div>

          <div style={{borderBottom: '1px solid #F3F4F6', paddingBottom: '12px'}}>
            <h4 style={{margin: '0 0 4px 0', fontSize: '15px', color: '#111827'}}>Rural infrastructure work</h4>
            <div style={{display: 'flex', gap: '4px', alignItems: 'center', fontSize: '13px', color: '#6B7280'}}>
              <MapPin size={14} /> High Demand
            </div>
          </div>

          <div>
            <h4 style={{margin: '0 0 4px 0', fontSize: '15px', color: '#111827'}}>Plantation work</h4>
            <div style={{display: 'flex', gap: '4px', alignItems: 'center', fontSize: '13px', color: '#6B7280'}}>
              <MapPin size={14} /> Available in your Block
            </div>
          </div>

        </div>
      </div>

      <div style={{position: 'fixed', bottom: 0, width: '100%', maxWidth: '600px', background: 'white', padding: '16px 20px', borderTop: '1px solid #E5E7EB', zIndex: 20}}>
        <button 
          className="btn-external primary"
          onClick={() => setShowRedirectModal(true)}
        >
          Continue to Apply <ExternalLink size={18} />
        </button>
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
              <ExternalLink size={40} color="#059669" className="modal-icon" style={{background: '#ECFDF5'}} />
              <p>You are being redirected to the official government portal.</p>
              <span className="url-preview">https://nrega.nic.in</span>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowRedirectModal(false)}>Cancel</button>
              <button className="btn-proceed" onClick={confirmRedirect} style={{background: '#059669'}}>Proceed</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
