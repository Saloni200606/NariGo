import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Info, ShieldCheck, MapPin, ExternalLink, X, GraduationCap, CheckCircle2 } from 'lucide-react';
import './TrainingEnrollmentConfirmation.css';

export default function TrainingEnrollmentConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  const course = state?.course || {
    id: courseId || 1,
    courseName: 'Tailoring & Fashion Design',
    schemeName: 'PMKVY (RSLDC / Skill India)',
    provider: 'Pradhan Mantri Kaushal Vikas Yojana',
    location: 'Jaipur, Rajasthan',
    requiredDocs: ['Aadhaar Card', 'Mobile Number', 'Educational Documents (if required)']
  };

  const handleProceed = () => {
    setShowRedirectModal(false);
    window.open('https://skillindia.gov.in', '_blank');
  };

  return (
    <div className="enrollment-container">
      {/* Header */}
      <header className="enrollment-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="enrollment-title">Course Enrollment</h1>
      </header>

      <div className="enrollment-content">
        {/* Course Summary Card */}
        <div className="course-summary-box">
          <div className="verified-badge-pill">
            <ShieldCheck size={14} color="#059669" />
            <span>Government Verified</span>
          </div>
          <h2 className="summary-course-name">{course.courseName}</h2>
          <div className="summary-scheme">
            <GraduationCap size={16} color="#D31245" />
            <span>{course.schemeName}</span>
          </div>
          <div className="summary-location">
            <MapPin size={14} color="#6B7280" />
            <span>{course.location}</span>
          </div>
        </div>

        {/* Required Documents Section */}
        <div className="enrollment-section">
          <h3>Required Documents</h3>
          <ul className="docs-checklist">
            {(course.requiredDocs || ['Aadhaar Card', 'Mobile Number', 'Educational Documents (if required)']).map(doc => (
              <li key={doc}>
                <CheckCircle2 size={18} color="#059669" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Official Guidance Banner */}
        <div className="guidance-banner-box">
          <Info size={24} color="#2563EB" />
          <p>You will be redirected to the official enrollment process on the government training portal or e-Mitra channel.</p>
        </div>

        {/* Proceed Button */}
        <div className="action-row">
          <button className="btn-proceed-enrollment" onClick={() => setShowRedirectModal(true)}>
            Proceed to Enrollment <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* External Redirect Confirmation Modal */}
      {showRedirectModal && (
        <div className="modal-overlay">
          <div className="redirect-modal">
            <div className="modal-header">
              <h3>Redirect Confirmation</h3>
              <button className="close-btn" onClick={() => setShowRedirectModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <ExternalLink size={44} color="#D31245" className="modal-icon" />
              <p>You will be redirected to the official enrollment platform.</p>
              <span className="url-preview">https://skillindia.gov.in</span>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowRedirectModal(false)}>Cancel</button>
              <button className="btn-proceed" onClick={handleProceed}>Proceed</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
