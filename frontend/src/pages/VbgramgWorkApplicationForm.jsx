import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, UserCheck } from 'lucide-react';
import DocumentUploader from '../components/DocumentUploader';
import ReviewApplicationModal from '../components/ReviewApplicationModal';
import './GovtForms.css';

export default function VbgramgWorkApplicationForm() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [profileAutoFilled, setProfileAutoFilled] = useState(false);

  // Documents state
  const [uploadedDocs, setUploadedDocs] = useState({
    aadhaar: null,
    jobCard: null,
    passbook: null
  });

  // Form State pre-filled from user profile
  const [formData, setFormData] = useState({
    fullName: '',
    guardianName: '',
    dob: '',
    gender: 'Female',
    aadhaar: '',
    mobile: '',
    jobCardNumber: '',
    householdId: '',
    state: 'Rajasthan',
    district: '',
    block: '',
    gramPanchayat: '',
    village: '',
    workType: 'Rural Infrastructure Work',
    locationPref: 'village',
    availability: 'full',
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('nariGo_user');
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setFormData(prev => ({
          ...prev,
          fullName: u.fullName || u.name || 'Saloni Jaiswal',
          mobile: u.phone || u.mobile || '9876543210',
          aadhaar: u.aadhaar || '123456789012',
          district: u.district || 'Jaipur',
          village: u.village || 'Gram Panchayat Village'
        }));
        setProfileAutoFilled(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsReviewOpen(true);
  };

  const handleConfirmSubmission = () => {
    setIsReviewOpen(false);
    const newId = 'VBG-' + Math.floor(100000 + Math.random() * 900000);
    setAppId(newId);

    // Save application to history in localStorage
    const newApp = {
      id: newId,
      schemeName: 'VB-G RAM G Rural Livelihood Work',
      category: 'Work Opportunity',
      appliedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Under Verification',
      details: {
        workType: formData.workType || 'Infrastructure Work',
        district: formData.district || 'Rajasthan',
        jobCardNumber: formData.jobCardNumber || 'JC-10293'
      }
    };

    try {
      const existing = JSON.parse(localStorage.getItem('nariGo_my_applications') || '[]');
      localStorage.setItem('nariGo_my_applications', JSON.stringify([newApp, ...existing]));
    } catch (err) {
      console.error("Error saving application history", err);
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="govt-form-container">
        <div className="success-screen">
          <div className="success-icon-circle">
            <CheckCircle size={44} />
          </div>
          <h2 className="success-title">Application Submitted Successfully</h2>
          <p>Your work application under VB-G RAM G has been submitted successfully to the Gram Panchayat.</p>
          <div className="app-id-box">{appId}</div>
          <p style={{fontSize: '14px', color: '#059669', fontWeight: '700'}}>Status: Under Verification</p>
          <p style={{fontSize: '13px', color: '#6B7280'}}>You can track this application anytime under My Applications in your profile.</p>
          <button className="btn-return-home" onClick={() => navigate('/opportunities')}>
            Return to Work Opportunities
          </button>
        </div>
      </div>
    );
  }

  const docsCountText = `${Object.values(uploadedDocs).filter(Boolean).length} / 3 Required Documents Attached`;

  return (
    <div className="govt-form-container">
      <header className="govt-form-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="govt-form-title">VB-G RAM G Work Application</h1>
      </header>

      <form className="govt-form-content" onSubmit={handleFormSubmit}>
        {/* Personal Details */}
        <div className="form-section">
          <div className="form-section-title">
            <span>Personal Details</span>
            {profileAutoFilled && (
              <span className="profile-autofill-badge">
                <UserCheck size={12} /> Saved from Profile
              </span>
            )}
          </div>

          <div className="form-group">
            <label>
              <span>Full Name <span className="required">*</span></span>
              {profileAutoFilled && <span className="field-profile-tag">Auto-filled</span>}
            </label>
            <input 
              type="text" 
              name="fullName"
              className="form-input" 
              required 
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label>Father's / Husband's Name <span className="required">*</span></label>
            <input 
              type="text" 
              name="guardianName"
              className="form-input" 
              required 
              value={formData.guardianName}
              onChange={handleChange}
              placeholder="Enter father's or husband's name"
            />
          </div>

          <div style={{display: 'flex', gap: '12px'}}>
            <div className="form-group" style={{flex: 1}}>
              <label>Date of Birth <span className="required">*</span></label>
              <input 
                type="date" 
                name="dob"
                className="form-input" 
                required 
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{flex: 1}}>
              <label>Gender <span className="required">*</span></label>
              <select name="gender" className="form-select" value={formData.gender} onChange={handleChange} required>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>
              <span>Aadhaar Number <span className="required">*</span></span>
              {profileAutoFilled && <span className="field-profile-tag">Auto-filled</span>}
            </label>
            <input 
              type="text" 
              name="aadhaar"
              className="form-input" 
              required 
              maxLength="12" 
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="12-digit Aadhaar number" 
            />
          </div>

          <div className="form-group">
            <label>
              <span>Mobile Number <span className="required">*</span></span>
              {profileAutoFilled && <span className="field-profile-tag">Auto-filled</span>}
            </label>
            <input 
              type="tel" 
              name="mobile"
              className="form-input" 
              required 
              maxLength="10" 
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit Mobile number" 
            />
          </div>
        </div>

        {/* Job Card Details */}
        <div className="form-section">
          <h3 className="form-section-title">Job Card Details</h3>
          <div className="form-group">
            <label>Job Card Number <span className="required">*</span></label>
            <input 
              type="text" 
              name="jobCardNumber"
              className="form-input" 
              required 
              value={formData.jobCardNumber}
              onChange={handleChange}
              placeholder="e.g. RJ-01-002-004-001/102"
            />
          </div>
          <div className="form-group">
            <label>Household ID <span className="required">*</span></label>
            <input 
              type="text" 
              name="householdId"
              className="form-input" 
              required 
              value={formData.householdId}
              onChange={handleChange}
              placeholder="Enter household ID"
            />
          </div>
        </div>

        {/* Address Details */}
        <div className="form-section">
          <div className="form-section-title">
            <span>Address Details</span>
            {profileAutoFilled && (
              <span className="profile-autofill-badge">
                <UserCheck size={12} /> Saved from Profile
              </span>
            )}
          </div>

          <div className="form-group">
            <label>State <span className="required">*</span></label>
            <input type="text" className="form-input" value={formData.state} readOnly />
          </div>

          <div className="form-group">
            <label>District <span className="required">*</span></label>
            <input 
              type="text" 
              name="district"
              className="form-input" 
              required 
              value={formData.district}
              onChange={handleChange}
              placeholder="e.g. Jaipur"
            />
          </div>

          <div className="form-group">
            <label>Block / Tehsil <span className="required">*</span></label>
            <input 
              type="text" 
              name="block"
              className="form-input" 
              required 
              value={formData.block}
              onChange={handleChange}
              placeholder="Enter Block"
            />
          </div>

          <div className="form-group">
            <label>Gram Panchayat <span className="required">*</span></label>
            <input 
              type="text" 
              name="gramPanchayat"
              className="form-input" 
              required 
              value={formData.gramPanchayat}
              onChange={handleChange}
              placeholder="Enter Gram Panchayat"
            />
          </div>

          <div className="form-group">
            <label>Village <span className="required">*</span></label>
            <input 
              type="text" 
              name="village"
              className="form-input" 
              required 
              value={formData.village}
              onChange={handleChange}
              placeholder="Enter Village"
            />
          </div>
        </div>

        {/* Work Preference */}
        <div className="form-section">
          <h3 className="form-section-title">Work Preference</h3>
          <div className="form-group">
            <label>Type of Work <span className="required">*</span></label>
            <select name="workType" className="form-select" value={formData.workType} onChange={handleChange} required>
              <option value="Agriculture-related work">Agriculture-related work</option>
              <option value="Water conservation work">Water conservation work</option>
              <option value="Plantation work">Plantation work</option>
              <option value="Rural infrastructure work">Rural infrastructure work</option>
              <option value="Other available work">Other available work</option>
            </select>
          </div>

          <div className="form-group">
            <label>Preferred Work Location <span className="required">*</span></label>
            <select name="locationPref" className="form-select" value={formData.locationPref} onChange={handleChange} required>
              <option value="village">Own Village</option>
              <option value="nearby">Nearby Village / Panchayat</option>
            </select>
          </div>

          <div className="form-group">
            <label>Availability <span className="required">*</span></label>
            <select name="availability" className="form-select" value={formData.availability} onChange={handleChange} required>
              <option value="full">Full Day</option>
              <option value="part">Part Time</option>
            </select>
          </div>
        </div>

        {/* Bank Details */}
        <div className="form-section">
          <h3 className="form-section-title">Bank Details</h3>
          <div className="form-group">
            <label>Bank Name <span className="required">*</span></label>
            <input 
              type="text" 
              name="bankName"
              className="form-input" 
              required 
              value={formData.bankName}
              onChange={handleChange}
              placeholder="e.g. State Bank of India"
            />
          </div>
          <div className="form-group">
            <label>Account Number <span className="required">*</span></label>
            <input 
              type="text" 
              name="accountNumber"
              className="form-input" 
              required 
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter Account Number"
            />
          </div>
          <div className="form-group">
            <label>IFSC Code <span className="required">*</span></label>
            <input 
              type="text" 
              name="ifscCode"
              className="form-input" 
              required 
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="e.g. SBIN0001234"
            />
          </div>
        </div>

        {/* Document Upload */}
        <div className="form-section">
          <h3 className="form-section-title">Document Upload</h3>
          
          <DocumentUploader 
            label="Aadhaar Card"
            required={true}
            onFileChange={(file) => setUploadedDocs(prev => ({...prev, aadhaar: file}))}
          />

          <DocumentUploader 
            label="Job Card Copy"
            required={true}
            onFileChange={(file) => setUploadedDocs(prev => ({...prev, jobCard: file}))}
          />

          <DocumentUploader 
            label="Bank Passbook First Page"
            required={true}
            onFileChange={(file) => setUploadedDocs(prev => ({...prev, passbook: file}))}
          />
        </div>

        <button type="submit" className="btn-submit-govt">
          Submit Application
        </button>
      </form>

      {/* Review Step Modal */}
      <ReviewApplicationModal 
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onConfirm={handleConfirmSubmission}
        summaryData={{
          fullName: formData.fullName,
          mobile: formData.mobile,
          village: formData.village,
          district: formData.district,
          documentsCount: docsCountText,
          schemeName: 'VB-G RAM G Rural Livelihood Work'
        }}
      />
    </div>
  );
}
