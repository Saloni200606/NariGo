import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, GraduationCap, UserCheck } from 'lucide-react';
import DocumentUploader from '../components/DocumentUploader';
import ReviewApplicationModal from '../components/ReviewApplicationModal';
import './GovtForms.css';

export default function TrainingEnrollmentForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [profileAutoFilled, setProfileAutoFilled] = useState(false);

  const course = state?.course || {
    courseName: 'Tailoring & Fashion Design',
    schemeName: 'PMKVY (RSLDC / Skill India)',
    provider: 'Pradhan Mantri Kaushal Vikas Yojana',
    location: 'Jaipur, Rajasthan'
  };

  const [uploadedDocs, setUploadedDocs] = useState({
    aadhaar: null,
    education: null,
    photo: null
  });

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'Female',
    mobile: '',
    aadhaar: '',
    state: 'Rajasthan',
    district: '',
    village: '',
    pincode: '',
    qualification: '10th Pass',
    trainingMode: 'Offline'
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
    const newId = 'TRN-' + Math.floor(100000 + Math.random() * 900000);
    setAppId(newId);

    // Save application to history in localStorage
    const newApp = {
      id: newId,
      schemeName: course.courseName,
      category: 'Skill Training',
      appliedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Pending Verification',
      details: {
        provider: course.provider,
        location: course.location,
        mode: formData.trainingMode
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
          <h2 className="success-title">Enrollment Submitted Successfully</h2>
          <p>Your enrollment application for <strong>{course.courseName}</strong> has been received by the training center.</p>
          <div className="app-id-box">{appId}</div>
          <p style={{fontSize: '14px', color: '#059669', fontWeight: '700'}}>Status: Pending Verification</p>
          <button className="btn-return-home" onClick={() => navigate('/training')}>
            Return to Training Courses
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
        <h1 className="govt-form-title">Training Enrollment Form</h1>
      </header>

      <form className="govt-form-content" onSubmit={handleFormSubmit}>
        {/* Selected Training Program Banner */}
        <div className="form-section" style={{background: '#EFF6FF', borderColor: '#BFDBFE'}}>
          <h3 className="form-section-title" style={{color: '#1E40AF', borderColor: '#DBEAFE'}}>
            <GraduationCap size={18} /> Selected Training Program
          </h3>
          <p style={{margin: '0 0 6px 0', fontSize: '16px', fontWeight: '800', color: '#1E3A8A'}}>{course.courseName}</p>
          <p style={{margin: '0 0 4px 0', fontSize: '13px', color: '#1E40AF'}}><strong>Scheme:</strong> {course.schemeName}</p>
          <p style={{margin: 0, fontSize: '13px', color: '#475569'}}><strong>Provider:</strong> {course.provider} ({course.location})</p>
        </div>

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

        {/* Address */}
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
            <label>Village / City <span className="required">*</span></label>
            <input 
              type="text" 
              name="village"
              className="form-input" 
              required 
              value={formData.village}
              onChange={handleChange}
              placeholder="Enter Village or City"
            />
          </div>

          <div className="form-group">
            <label>Pincode <span className="required">*</span></label>
            <input 
              type="text" 
              name="pincode"
              className="form-input" 
              required 
              maxLength="6"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit Pincode"
            />
          </div>
        </div>

        {/* Education & Mode */}
        <div className="form-section">
          <h3 className="form-section-title">Education & Preferences</h3>
          <div className="form-group">
            <label>Highest Educational Qualification <span className="required">*</span></label>
            <select name="qualification" className="form-select" value={formData.qualification} onChange={handleChange} required>
              <option value="Below 8th">Below 8th Pass</option>
              <option value="8th Pass">8th Pass</option>
              <option value="10th Pass">10th Pass</option>
              <option value="12th Pass">12th Pass</option>
              <option value="Graduate">Graduate or above</option>
            </select>
          </div>

          <div className="form-group">
            <label>Preferred Training Mode <span className="required">*</span></label>
            <select name="trainingMode" className="form-select" value={formData.trainingMode} onChange={handleChange} required>
              <option value="Offline">Offline (Classroom / Practical at Training Center)</option>
              <option value="Online">Online / Hybrid</option>
            </select>
          </div>
        </div>

        {/* Documents Upload */}
        <div className="form-section">
          <h3 className="form-section-title">Document Upload</h3>
          
          <DocumentUploader 
            label="Aadhaar Card"
            required={true}
            onFileChange={(file) => setUploadedDocs(prev => ({...prev, aadhaar: file}))}
          />

          <DocumentUploader 
            label="Educational Certificate (if required)"
            required={false}
            onFileChange={(file) => setUploadedDocs(prev => ({...prev, education: file}))}
          />

          <DocumentUploader 
            label="Passport Size Photograph"
            required={true}
            onFileChange={(file) => setUploadedDocs(prev => ({...prev, photo: file}))}
          />
        </div>

        <button type="submit" className="btn-submit-govt">
          Submit Enrollment
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
          schemeName: course.courseName
        }}
      />
    </div>
  );
}
