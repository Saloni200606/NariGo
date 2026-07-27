import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Download, CheckCircle } from 'lucide-react';
import './rsldc-pages.css';

const MyCertificates = () => {
  const navigate = useNavigate();

  const certificates = [
    { title: 'Basic Tailoring Certified', date: '15 Aug 2025', id: 'RSLDC-2025-0815', org: 'RSLDC' },
  ];

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
        <h1 className="text-heading">My Certificates</h1>
        <p className="text-body" style={{ marginTop: '12px' }}>
          View and download your official government skill certificates.
        </p>
      </div>

      <div className="rsldc-grid">
        {certificates.map((cert, index) => (
          <div key={index} className="rsldc-item-card glass-card glass-card-hover" style={{ borderColor: 'var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="rsldc-icon-circle" style={{ background: 'var(--color-primary)', color: 'white' }}>
                <Award size={28} />
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-accent-green)', fontWeight: '600' }}>
                <CheckCircle size={14} /> Verified
              </span>
            </div>
            <h3 className="rsldc-title" style={{ marginTop: '12px' }}>{cert.title}</h3>
            <div className="rsldc-description" style={{ marginTop: '4px' }}>
              <p><strong>Issued by:</strong> {cert.org}</p>
              <p><strong>Date:</strong> {cert.date}</p>
              <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-text-small)' }}>Cert ID: {cert.id}</p>
            </div>
            <div className="rsldc-action-row">
              <button 
                className="primary-btn" 
                style={{ width: '100%', height: '40px', gap: '8px' }}
                onClick={() => alert(`Downloading certificate ${cert.id}...`)}
              >
                <Download size={18} /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCertificates;
