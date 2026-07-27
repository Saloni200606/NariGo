import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Building, Calendar, CheckCircle2, FileText, IndianRupee } from 'lucide-react';
import './WorkOpportunityDetails.css';

export default function WorkOpportunityDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const opportunity = location.state?.opportunity;

  if (!opportunity) {
    return (
      <div className="opp-details-container p-24">
        <p>Opportunity not found. Please go back.</p>
        <button className="btn-primary mt-16" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="opp-details-container pb-100">
      <header className="details-header">
        <button className="back-btn-overlay" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <img src={opportunity.image} alt={opportunity.title} className="header-image" />
        <div className="header-gradient-overlay"></div>
      </header>

      <main className="details-main">
        <div className="category-tag mb-12">{opportunity.category}</div>
        <h1 className="details-title">{opportunity.title}</h1>
        
        <div className="provider-info mb-24">
          <Building size={16} color="#888" />
          <span>{opportunity.provider}</span>
        </div>

        <div className="stats-row mb-24">
          <div className="stat-card">
            <div className="stat-icon-wrapper"><MapPin size={18} color="#b30047" /></div>
            <span className="stat-label">Location</span>
            <span className="stat-value">{opportunity.location.split(',')[0]}</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper"><Building size={18} color="#b30047" /></div>
            <span className="stat-label">Type</span>
            <span className="stat-value">{opportunity.workType}</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper"><Calendar size={18} color="#b30047" /></div>
            <span className="stat-label">Duration</span>
            <span className="stat-value">Flexible</span>
          </div>
        </div>

        <section className="detail-section">
          <h2 className="section-title">Description</h2>
          <p className="section-text">{opportunity.description}</p>
        </section>

        <section className="detail-section">
          <h2 className="section-title">Eligibility & Requirements</h2>
          <ul className="requirements-list">
            <li><CheckCircle2 size={16} className="text-green" /> Rural women aged 18-45</li>
            <li><CheckCircle2 size={16} className="text-green" /> Basic knowledge of {opportunity.category}</li>
            <li><CheckCircle2 size={16} className="text-green" /> Willing to work minimum 4 hours/day</li>
          </ul>
        </section>

        <section className="detail-section">
          <h2 className="section-title">Benefits</h2>
          <ul className="requirements-list">
            <li><IndianRupee size={16} className="text-pink" /> Expected income: ₹5000 - ₹8000 / month</li>
            <li><CheckCircle2 size={16} className="text-pink" /> Free raw materials provided</li>
            <li><CheckCircle2 size={16} className="text-pink" /> Skill upgrade training included</li>
          </ul>
        </section>

        <section className="detail-section">
          <h2 className="section-title">Documents Required</h2>
          <ul className="requirements-list">
            <li><FileText size={16} color="#555" /> Aadhar Card</li>
            <li><FileText size={16} color="#555" /> Bank Passbook copy</li>
            <li><FileText size={16} color="#555" /> Passport size photo</li>
          </ul>
        </section>

      </main>

      <div className="apply-footer">
        <button 
          className="btn-apply-full" 
          onClick={() => {
            if (opportunity?.scheme?.includes('VB-G RAM G') || opportunity?.title?.includes('VB-G RAM G')) {
              navigate('/vbg-job-card-check');
            } else {
              navigate('/work-scheme-apply', { state: { opp: opportunity } });
            }
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
