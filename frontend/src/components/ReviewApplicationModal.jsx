import React from 'react';
import { CheckCircle2, X, ShieldCheck } from 'lucide-react';
import './ReviewApplicationModal.css';

export default function ReviewApplicationModal({ isOpen, onClose, onConfirm, summaryData }) {
  if (!isOpen) return null;

  return (
    <div className="review-modal-overlay">
      <div className="review-modal-card">
        <div className="review-modal-header">
          <h3>Check Your Application</h3>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="review-modal-body">
          <p className="review-subtitle">Please verify your application details before submitting.</p>

          <div className="review-checklist">
            {/* Personal Details */}
            <div className="review-check-item">
              <CheckCircle2 size={20} color="#059669" />
              <div>
                <strong>Personal Details</strong>
                <p>{summaryData?.fullName || 'Applicant Name'} ({summaryData?.mobile || 'Mobile'})</p>
              </div>
            </div>

            {/* Address Details */}
            <div className="review-check-item">
              <CheckCircle2 size={20} color="#059669" />
              <div>
                <strong>Address & Location</strong>
                <p>{summaryData?.village || 'Village'}, {summaryData?.district || 'District'}, Rajasthan</p>
              </div>
            </div>

            {/* Documents */}
            <div className="review-check-item">
              <CheckCircle2 size={20} color="#059669" />
              <div>
                <strong>Documents Attached</strong>
                <p>{summaryData?.documentsCount || 'Required Documents Attached'}</p>
              </div>
            </div>

            {/* Scheme / Course Details */}
            <div className="review-check-item">
              <CheckCircle2 size={20} color="#059669" />
              <div>
                <strong>Program Details</strong>
                <p>{summaryData?.schemeName || 'Government Program'}</p>
              </div>
            </div>
          </div>

          <div className="official-platform-note">
            <ShieldCheck size={16} color="#059669" />
            <span>NariGo Verified Government Application Service</span>
          </div>
        </div>

        <div className="review-modal-footer">
          <button type="button" className="btn-review-cancel" onClick={onClose}>
            Edit Details
          </button>
          <button type="button" className="btn-review-confirm" onClick={onConfirm}>
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
}
