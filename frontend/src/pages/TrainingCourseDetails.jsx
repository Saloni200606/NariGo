import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, GraduationCap, MapPin, Clock, FileText, CheckCircle2, ShieldCheck, Star, Info } from 'lucide-react';
import './TrainingCourseDetails.css';

export default function TrainingCourseDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();

  // Fallback course data if direct route accessed without state
  const course = state?.course || {
    id: courseId || 1,
    courseName: 'Tailoring & Fashion Design',
    schemeName: 'PMKVY - Skill India',
    provider: 'Pradhan Mantri Kaushal Vikas Yojana (RSLDC / Skill India)',
    duration: '3 Months',
    location: 'Jaipur, Rajasthan',
    category: 'Textile & Tailoring',
    trainingMode: 'Classroom & Practical Training',
    eligibility: 'Women interested in tailoring, minimum 8th pass.',
    benefits: 'Government Skill Certification, Improved employment opportunities, Support for self-employment.',
    requiredDocs: ['Aadhaar Card', 'Mobile Number', 'Educational Documents (if required)'],
    about: 'Detailed skill development program providing end-to-end training in garment fabrication, cutting, sewing, and enterprise management for rural women empowerment.'
  };

  const handleEnrollNow = () => {
    navigate('/training-enrollment-form', { state: { course } });
  };

  return (
    <div className="training-details-container">
      {/* Header */}
      <header className="scheme-header-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="scheme-header-title">{course.courseName}</h1>
          <p className="scheme-header-sub">{course.schemeName}</p>
        </div>
      </header>

      <div className="training-main-content">
        {/* Hero Card */}
        <div className="training-hero-card">
          <div className="verified-badge-row">
            <ShieldCheck size={18} color="#059669" />
            <span className="verified-text">✓ Government Verified</span>
          </div>
          <h2 className="hero-course-title">{course.courseName}</h2>
          <p className="hero-provider-tag">{course.provider}</p>
        </div>

        {/* Section 1: About Training */}
        <div className="scheme-section">
          <div className="section-title-row">
            <Info size={18} color="#D31245" />
            <h3>About Training</h3>
          </div>
          <div className="section-card">
            <p className="section-text">{course.about || 'Verified government skill development course for rural women empowerment.'}</p>
          </div>
        </div>

        {/* Section 2: Course Information */}
        <div className="scheme-section">
          <div className="section-title-row">
            <GraduationCap size={18} color="#D31245" />
            <h3>Course Information</h3>
          </div>
          <div className="section-card">
            <div className="info-list-grid">
              <div className="info-item">
                <Clock size={16} color="#D31245" />
                <div>
                  <span className="info-label">Duration</span>
                  <strong className="info-val">{course.duration}</strong>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={16} color="#D31245" />
                <div>
                  <span className="info-label">Location</span>
                  <strong className="info-val">{course.location}</strong>
                </div>
              </div>

              <div className="info-item">
                <GraduationCap size={16} color="#D31245" />
                <div>
                  <span className="info-label">Training Mode</span>
                  <strong className="info-val">{course.trainingMode || 'Classroom & Practical'}</strong>
                </div>
              </div>

              <div className="info-item">
                <ShieldCheck size={16} color="#D31245" />
                <div>
                  <span className="info-label">Certification</span>
                  <strong className="info-val">Government Certified (NSDC/RSLDC)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Eligibility */}
        <div className="scheme-section">
          <div className="section-title-row">
            <CheckCircle2 size={18} color="#D31245" />
            <h3>Eligibility</h3>
          </div>
          <div className="section-card">
            <ul className="bullet-list">
              <li>{course.eligibility}</li>
              <li>Rural women applicants prioritized.</li>
              <li>Valid mobile number and Aadhaar required.</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Required Documents */}
        <div className="scheme-section">
          <div className="section-title-row">
            <FileText size={18} color="#D31245" />
            <h3>Required Documents</h3>
          </div>
          <div className="section-card">
            <ul className="docs-list">
              <li><CheckCircle2 size={16} color="#059669" /> Aadhaar Card</li>
              <li><CheckCircle2 size={16} color="#059669" /> Mobile Number</li>
              <li><CheckCircle2 size={16} color="#059669" /> Educational documents (if required)</li>
            </ul>
          </div>
        </div>

        {/* Section 5: Benefits */}
        <div className="scheme-section">
          <div className="section-title-row">
            <Star size={18} color="#D31245" />
            <h3>Benefits</h3>
          </div>
          <div className="section-card">
            <ul className="bullet-list">
              <li>Government certification (Skill India / RSLDC).</li>
              <li>Skill improvement and practical hands-on training.</li>
              <li>Better livelihood and self-employment support.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Action Button */}
      <div className="apply-bottom-bar">
        <button className="btn-apply-massive" onClick={handleEnrollNow}>
          Enroll Now
        </button>
      </div>
    </div>
  );
}
