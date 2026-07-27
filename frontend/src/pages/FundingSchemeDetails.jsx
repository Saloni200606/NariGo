import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Landmark, MapPin, FileText, CheckCircle2, ShieldCheck, Star, Info, Building2, HelpCircle } from 'lucide-react';
import './FundingSchemeDetails.css';

export default function FundingSchemeDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { schemeId } = useParams();

  // Fallback data if accessed without state
  const scheme = state?.scheme || {
    id: schemeId || 1,
    schemeName: 'PMEGP',
    fullName: "Prime Minister's Employment Generation Programme",
    schemeType: 'Business Loan Support',
    organization: 'Ministry of Micro, Small & Medium Enterprises (KVIC)',
    location: 'Available Across India',
    businessType: 'Small Business',
    category: 'Business Loan',
    purpose: 'Financial assistance for eligible individuals to establish new micro-enterprises in manufacturing and service sectors.',
    benefits: 'Subsidy up to 35% in rural areas. Loan support up to ₹50 Lakh for manufacturing and ₹20 Lakh for service units.',
    eligibility: 'Any individual above 18 years. Minimum 8th pass for manufacturing projects above ₹10 Lakh.',
    requiredDocs: ['Aadhaar Card', 'PAN Card (if required)', 'Bank Account Details', 'Business Plan/Project Report (if required)'],
    officialSource: 'kviconline.gov.in'
  };

  const handleApplyNow = () => {
    navigate('/funding-apply-guidance', { state: { scheme } });
  };

  return (
    <div className="funding-details-container">
      {/* Header */}
      <header className="scheme-header-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="scheme-header-title">{scheme.schemeName}</h1>
          <p className="scheme-header-sub">{scheme.fullName}</p>
        </div>
      </header>

      <div className="funding-main-content">
        {/* Hero Card */}
        <div className="funding-hero-card">
          <div className="verified-badge-row">
            <ShieldCheck size={18} color="#059669" />
            <span className="verified-text">✓ Government Verified</span>
          </div>
          <h2 className="hero-scheme-title">{scheme.schemeName}</h2>
          <p className="hero-full-name">{scheme.fullName}</p>
        </div>

        {/* Section 1: About Scheme */}
        <div className="scheme-section">
          <div className="section-title-row">
            <Info size={18} color="#D31245" />
            <h3>About Scheme</h3>
          </div>
          <div className="section-card">
            <p className="section-text">{scheme.purpose}</p>
          </div>
        </div>

        {/* Section 2: Scheme Information */}
        <div className="scheme-section">
          <div className="section-title-row">
            <Landmark size={18} color="#D31245" />
            <h3>Scheme Information</h3>
          </div>
          <div className="section-card">
            <div className="info-list-grid">
              <div className="info-item">
                <Building2 size={16} color="#D31245" />
                <div>
                  <span className="info-label">Provided By</span>
                  <strong className="info-val">{scheme.organization}</strong>
                </div>
              </div>

              <div className="info-item">
                <Landmark size={16} color="#D31245" />
                <div>
                  <span className="info-label">Scheme Category</span>
                  <strong className="info-val">{scheme.category || 'Business Funding'}</strong>
                </div>
              </div>

              <div className="info-item">
                <HelpCircle size={16} color="#D31245" />
                <div>
                  <span className="info-label">Eligible Applicants</span>
                  <strong className="info-val">Women Entrepreneurs, SHGs, Rural Youth</strong>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={16} color="#D31245" />
                <div>
                  <span className="info-label">Location Availability</span>
                  <strong className="info-val">{scheme.location}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Benefits */}
        <div className="scheme-section">
          <div className="section-title-row">
            <Star size={18} color="#D31245" />
            <h3>Benefits</h3>
          </div>
          <div className="section-card">
            <ul className="bullet-list">
              <li>{scheme.benefits}</li>
              <li>Government credit support and capital subsidy.</li>
              <li>Entrepreneurship assistance and capacity building.</li>
              <li>Business development & market linkage support.</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Eligibility Criteria */}
        <div className="scheme-section">
          <div className="section-title-row">
            <CheckCircle2 size={18} color="#D31245" />
            <h3>Eligibility Criteria</h3>
          </div>
          <div className="section-card">
            <ul className="bullet-list">
              <li>{scheme.eligibility}</li>
              <li>Applicant must be an Indian citizen.</li>
              <li>New micro-enterprise project or expansion meeting scheme norms.</li>
            </ul>
          </div>
        </div>

        {/* Section 5: Required Documents */}
        <div className="scheme-section">
          <div className="section-title-row">
            <FileText size={18} color="#D31245" />
            <h3>Required Documents</h3>
          </div>
          <div className="section-card">
            <ul className="docs-list">
              <li><CheckCircle2 size={16} color="#059669" /> Aadhaar Card</li>
              <li><CheckCircle2 size={16} color="#059669" /> PAN Card (if required)</li>
              <li><CheckCircle2 size={16} color="#059669" /> Bank Account Details</li>
              <li><CheckCircle2 size={16} color="#059669" /> Business Plan / Project Report (if required)</li>
            </ul>
          </div>
        </div>

        {/* Section 6: Application Process */}
        <div className="scheme-section">
          <div className="section-title-row">
            <Building2 size={18} color="#D31245" />
            <h3>Application Process</h3>
          </div>
          <div className="section-card timeline-card">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-text">Check eligibility criteria</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-text">Prepare required documents</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-text">Apply through official portal or e-Mitra</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-text">Verification process by bank/authority</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">5</div>
              <div className="timeline-text">Sanction & loan approval</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Button */}
      <div className="apply-bottom-bar">
        <button className="btn-apply-massive" onClick={handleApplyNow}>
          Apply Now
        </button>
      </div>
    </div>
  );
}
