import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, UserCheck } from 'lucide-react';
import DocumentUploader from '../components/DocumentUploader';
import ReviewApplicationModal from '../components/ReviewApplicationModal';
import './GovtForms.css';

export default function GeneralWorkSchemeApplicationForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [profileAutoFilled, setProfileAutoFilled] = useState(false);

  const opp = state?.opp || state;
  const schemeTitle = opp?.title || 'Government Work Scheme';

  const [uploadedDocs, setUploadedDocs] = useState({
    aadhaar: null,
    passbook: null,
    shgId: null
  });

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'Female',
    mobile: '',
    aadhaar: '',
    state: 'Rajasthan',
    district: '',
    village: '',
    panchayat: '',
    skillCategory: 'Stitching',
    isShgMember: 'No',
    shgName: '',
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
          district: u.district || 'Jodhpur',
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
    const newId = 'WRK-' + Math.floor(100000 + Math.random() * 900000);
    setAppId(newId);

    // Save application to history in localStorage
    const newApp = {
      id: newId,
      schemeName: schemeTitle,
      category: 'Work Opportunity',
      appliedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Under Verification',
      details: {
        district: formData.district || 'Rajasthan',
        skills: formData.skillCategory,
        shgMember: formData.isShgMember
      }
    };

    try {
      const existing = JSON.parse(localStorage.getItem('nariGo_my_applications') || '[]');
      localStorage.setItem('nariGo_my_applications', JSON.stringify([newApp, ...existing]));
    } catch (err) {
      console.error(err);
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
          <p>Your application for <strong>{schemeTitle}</strong> has been received for verification.</p>
          <div className="app-id-box">{appId}</div>
          <p style={{fontSize: '14px', color: '#059669', fontWeight: '700'}}>Status: Under Verification</p>
          <button className="btn-return-home" onClick={() => navigate('/opportunities')}>
            Return to Work Opportunities
          </button>
        </div>
      </div>
    );
  }

  const docsCountText = `${Object.values(uploadedDocs).filter(Boolean).length} Required Documents Attached`;

  return (
    <div className="govt-form-container">
      <header className="govt-form-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="govt-form-title">Work Application Form</h1>
      </header>

      <form className="govt-form-content" onSubmit={handleFormSubmit}>
        {/* Personal Information */}
        <div className="form-section">
          <div className="form-section-title">
            <span>Personal Information</span>
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

          <div style={{display: 'flex', gap: '12px'}}>
            <div className="form-group" style={{flex: 1}}>
              <label>Age <span className="required">*</span></label>
              <input 
                type="number" 
                name="age"
                className="form-input" 
                required 
                value={formData.age}
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
              placeholder="e.g. Jodhpur"
            />
          </div>

          <div className="form-group">
            <label>Gram Panchayat <span className="required">*</span></label>
            <input 
              type="text" 
              name="panchayat"
              className="form-input" 
              required 
              value={formData.panchayat}
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

        {/* Skills & SHG */}
        <div className="form-section">
          <h3 className="form-section-title">Skills & SHG Details</h3>
          <div className="form-group">
            <label>Select Primary Skill <span className="required">*</span></label>
            <select name="skillCategory" className="form-select" value={formData.skillCategory} onChange={handleChange} required>
              <option value="Stitching">Stitching / Tailoring</option>
              <option value="Handicraft">Handicraft & Local Art</option>
              <option value="Agriculture">Agriculture & Farming</option>
              <option value="Dairy">Dairy & Livestock</option>
              <option value="Food Processing">Food Processing</option>
              <option value="Other">Other Skills</option>
            </select>
          </div>

          <div className="form-group">
            <label>Are you an SHG (Self Help Group) Member? <span className="required">*</span></label>
            <select name="isShgMember" className="form-select" value={formData.isShgMember} onChange={handleChange} required>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {formData.isShgMember === 'Yes' && (
            <div className="form-group">
              <label>SHG Name <span className="required">*</span></label>
              <input 
                type="text" 
                name="shgName"
                className="form-input" 
                required 
                value={formData.shgName}
                onChange={handleChange}
                placeholder="Enter SHG Group Name"
              />
            </div>
          )}
        </div>

        {/* Bank Details */}
        <div className="form-section">
          <h3 className="form-section-title">Bank Details</h3>
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
            label="Aadhaar Card Copy"
            required={true}
            onFileChange={(file) => setUploadedDocs(prev => ({...prev, aadhaar: file}))}
          />

          <DocumentUploader 
            label="Bank Passbook First Page"
            required={true}
            onFileChange={(file) => setUploadedDocs(prev => ({...prev, passbook: file}))}
          />

          {formData.isShgMember === 'Yes' && (
            <DocumentUploader 
              label="SHG ID Card / Certificate"
              required={false}
              onFileChange={(file) => setUploadedDocs(prev => ({...prev, shgId: file}))}
            />
          )}
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
          schemeName: schemeTitle
        }}
      />
    </div>
  );
}
