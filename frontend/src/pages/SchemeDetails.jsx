import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, FileText, CheckCircle2, MapPin, Building, Info, Star } from 'lucide-react';
import './SchemeDetails.css';

export default function SchemeDetails() {
  const { state: scheme } = useLocation();
  const navigate = useNavigate();

  if (!scheme) {
    return <div className="p-4">No scheme data found. Please go back.</div>;
  }

  const handleApply = () => {
    if (scheme.scheme && scheme.scheme.includes('VB-G RAM G')) {
      navigate('/vbg-job-card-check');
    } else {
      navigate('/work-scheme-apply', { state: { opp: scheme } });
    }
  };

  return (
    <div className="scheme-details-container">
      <header className="scheme-header-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="scheme-header-title">Scheme Details</h1>
      </header>

      <div className="scheme-main-content">
        <div className="scheme-hero">
          <h2 className="scheme-hero-title">{scheme.title}</h2>
          <p className="scheme-hero-subtitle">{scheme.scheme}</p>
          <div className="verified-badge-row">
            <ShieldCheck size={16} color="#059669" />
            <span className="verified-text">Verified Government Scheme</span>
          </div>
        </div>

        <div className="scheme-section">
          <div className="section-title-row">
            <Info size={18} color="#D31245" />
            <h3>About the Scheme</h3>
          </div>
          <div className="section-card">
            <p className="section-text">{scheme.description}</p>
          </div>
        </div>

        <div className="scheme-section">
          <div className="section-title-row">
            <CheckCircle2 size={18} color="#D31245" />
            <h3>Eligibility Criteria</h3>
          </div>
          <div className="section-card">
            <ul className="bullet-list">
              <li>{scheme.eligibility}</li>
              <li>Adult female applicant.</li>
              <li>Valid identity documents available.</li>
              <li>Must reside in the specified district/village.</li>
            </ul>
          </div>
        </div>

        <div className="scheme-section">
          <div className="section-title-row">
            <Star size={18} color="#D31245" />
            <h3>Benefits</h3>
          </div>
          <div className="section-card">
            <ul className="bullet-list">
              <li>{scheme.benefits}</li>
              <li>Secure government-linked employment.</li>
              <li>Financial independence and livelihood assistance.</li>
            </ul>
          </div>
        </div>

        <div className="scheme-section">
          <div className="section-title-row">
            <FileText size={18} color="#D31245" />
            <h3>Required Documents</h3>
          </div>
          <div className="section-card">
            <ul className="docs-list">
              {scheme.requiredDocs.map(doc => (
                <li key={doc}>
                  <CheckCircle2 size={16} color="#059669" /> {doc}
                </li>
              ))}
              <li><CheckCircle2 size={16} color="#059669" /> Address Proof</li>
            </ul>
          </div>
        </div>

        <div className="scheme-section">
          <div className="section-title-row">
            <Building size={18} color="#D31245" />
            <h3>How It Works</h3>
          </div>
          <div className="section-card timeline-card">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-text">Check eligibility criteria</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-text">Apply using below button</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-text">Verification process by authorities</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-text">Work allocation / Benefits disbursed</div>
            </div>
          </div>
        </div>

        <div className="scheme-section">
          <div className="section-title-row">
            <MapPin size={18} color="#D31245" />
            <h3>Location Availability</h3>
          </div>
          <div className="section-card location-details">
            <p><strong>Location:</strong> {scheme.location}</p>
            <p><strong>Work Type:</strong> {scheme.workType}</p>
          </div>
        </div>
      </div>

      <div className="apply-bottom-bar">
        <button className="btn-apply-massive" onClick={handleApply}>
          Apply Now
        </button>
      </div>
    </div>
  );
}
