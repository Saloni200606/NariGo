import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, UploadCloud, ShieldCheck, Building, Info } from 'lucide-react';
import './EmployerVerification.css';

export default function EmployerVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;

  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    businessRegNumber: '',
    gstNumber: '',
    aadhaarNumber: '',
    businessAddress: '',
    district: '',
    contactNumber: phoneNumber || '',
    companyEmail: '',
    
    // File inputs (simulated)
    aadhaarFile: null,
    businessRegFile: null,
    gstFile: null,
    companyLogoFile: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const lang = useMemo(() => {
    return localStorage.getItem('nariGo_lang') || 'hi';
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = lang === 'hi' ? 'कंपनी का नाम आवश्यक है' : 'Company Name is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = lang === 'hi' ? 'मालिक का नाम आवश्यक है' : 'Owner Name is required';
    if (!formData.aadhaarNumber.trim() || formData.aadhaarNumber.length !== 12) newErrors.aadhaarNumber = lang === 'hi' ? '12 अंकों का आधार नंबर आवश्यक है' : '12-digit Aadhaar is required';
    if (!formData.businessAddress.trim()) newErrors.businessAddress = lang === 'hi' ? 'व्यापार का पता आवश्यक है' : 'Business Address is required';
    if (!formData.district.trim()) newErrors.district = lang === 'hi' ? 'जिला आवश्यक है' : 'District is required';
    if (!formData.contactNumber.trim() || formData.contactNumber.length !== 10) newErrors.contactNumber = lang === 'hi' ? '10 अंकों का संपर्क नंबर आवश्यक है' : '10-digit Contact Number is required';
    if (!formData.companyEmail.trim()) newErrors.companyEmail = lang === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    
    if (!formData.aadhaarFile) newErrors.aadhaarFile = lang === 'hi' ? 'आधार अपलोड आवश्यक है' : 'Aadhaar Upload is required';
    if (!formData.businessRegFile) newErrors.businessRegFile = lang === 'hi' ? 'पंजीकरण प्रमाण पत्र आवश्यक है' : 'Registration Certificate is required';
    if (!formData.companyLogoFile) newErrors.companyLogoFile = lang === 'hi' ? 'कंपनी लोगो आवश्यक है' : 'Company Logo is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const existingUsers = JSON.parse(localStorage.getItem('nariGo_demo_users')) || [];
      let updatedUser = null;
      const updatedUsers = existingUsers.map(u => {
        if (u.phoneNumber === phoneNumber) {
          updatedUser = {
            ...u,
            ...formData,
            verificationStatus: 'Pending'
          };
          return updatedUser;
        }
        return u;
      });
      
      localStorage.setItem('nariGo_demo_users', JSON.stringify(updatedUsers));
      
      if (updatedUser) {
        // Auto-login the updated user
        localStorage.setItem('nariGo_user', JSON.stringify(updatedUser));
        localStorage.setItem('nariGo_token', 'demo_token_123');
      }

      // Navigate immediately to pending dashboard
      navigate('/verification-pending');
    }
  };

  return (
    <div className="apply-container">
      <div className="apply-bg-orb-1" />
      <div className="apply-bg-orb-2" />

      <div className="apply-main">
        <header className="apply-header">
          <h1 className="apply-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={24} />
            {lang === 'hi' ? 'नियोक्ता सत्यापन' : 'Employer Verification'}
          </h1>
        </header>

        {/* Progress Indicator */}
        <div className="glass-card" style={{ marginBottom: '24px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.7)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
             <CheckCircle color="#10B981" size={24} />
             <span style={{ fontSize: '12px', marginTop: '4px', fontWeight: 'bold' }}>Registration</span>
          </div>
          <div style={{ height: '2px', background: 'var(--color-primary)', flex: 1, margin: '0 10px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
             <ShieldCheck color="var(--color-primary)" size={24} />
             <span style={{ fontSize: '12px', marginTop: '4px', fontWeight: 'bold' }}>Verification</span>
          </div>
          <div style={{ height: '2px', background: '#ccc', flex: 1, margin: '0 10px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, opacity: 0.5 }}>
             <CheckCircle color="#ccc" size={24} />
             <span style={{ fontSize: '12px', marginTop: '4px', fontWeight: 'bold' }}>Approval</span>
          </div>
        </div>
        
        <div className="glass-card" style={{ marginBottom: '24px', padding: '16px', display: 'flex', gap: '12px', background: 'rgba(244, 63, 117, 0.1)', color: 'var(--color-text-dark)', borderRadius: '8px' }}>
          <Info size={24} color="var(--color-primary)" />
          <p style={{ fontSize: '14px' }}>
             {lang === 'hi' ? 'नौकरियां पोस्ट करने से पहले, हमें आपकी कंपनी का सत्यापन करना होगा। कृपया नीचे दिए गए विवरण और दस्तावेज़ अपलोड करें।' : 'Before you can post jobs, we need to verify your company. Please provide the details and documents below.'}
          </p>
        </div>

        <form className="apply-form glass-card" onSubmit={handleSubmit} autoComplete="off">
            <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Business Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Company Name <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={errors.companyName ? 'error-input' : 'primary-input'} />
                {errors.companyName && <span className="error-text">{errors.companyName}</span>}
              </div>

              <div className="form-group">
                <label>Owner Name <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className={errors.ownerName ? 'error-input' : 'primary-input'} />
                {errors.ownerName && <span className="error-text">{errors.ownerName}</span>}
              </div>

              <div className="form-group">
                <label>Business Registration Number (Optional)</label>
                <input type="text" name="businessRegNumber" value={formData.businessRegNumber} onChange={handleChange} className="primary-input" />
              </div>

              <div className="form-group">
                <label>GST Number (Optional)</label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="primary-input" />
              </div>

              <div className="form-group">
                <label>Aadhaar Number of Owner <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="aadhaarNumber" maxLength="12" value={formData.aadhaarNumber} onChange={handleChange} className={errors.aadhaarNumber ? 'error-input' : 'primary-input'} />
                {errors.aadhaarNumber && <span className="error-text">{errors.aadhaarNumber}</span>}
              </div>

              <div className="form-group">
                <label>Business Address <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="businessAddress" value={formData.businessAddress} onChange={handleChange} className={errors.businessAddress ? 'error-input' : 'primary-input'} />
                {errors.businessAddress && <span className="error-text">{errors.businessAddress}</span>}
              </div>

              <div className="form-group">
                <label>District <span style={{color: 'red'}}>*</span></label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} className={errors.district ? 'error-input' : 'primary-input'} />
                {errors.district && <span className="error-text">{errors.district}</span>}
              </div>

              <div className="form-group">
                <label>Contact Number <span style={{color: 'red'}}>*</span></label>
                <input type="tel" name="contactNumber" maxLength="10" value={formData.contactNumber} onChange={handleChange} className={errors.contactNumber ? 'error-input' : 'primary-input'} />
                {errors.contactNumber && <span className="error-text">{errors.contactNumber}</span>}
              </div>

              <div className="form-group">
                <label>Company Email <span style={{color: 'red'}}>*</span></label>
                <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} className={errors.companyEmail ? 'error-input' : 'primary-input'} />
                {errors.companyEmail && <span className="error-text">{errors.companyEmail}</span>}
              </div>
            </div>

            <h3 style={{ marginTop: '24px', marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Document Uploads</h3>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Aadhaar Card (PDF/Image) <span style={{color: 'red'}}>*</span></label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="file" name="aadhaarFile" onChange={handleChange} className="primary-input" accept=".pdf,image/*" />
                  <UploadCloud size={20} color="var(--color-primary)" />
                </div>
                {errors.aadhaarFile && <span className="error-text">{errors.aadhaarFile}</span>}
              </div>

              <div className="form-group full-width">
                <label>Business Registration Certificate <span style={{color: 'red'}}>*</span></label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="file" name="businessRegFile" onChange={handleChange} className="primary-input" accept=".pdf,image/*" />
                  <UploadCloud size={20} color="var(--color-primary)" />
                </div>
                {errors.businessRegFile && <span className="error-text">{errors.businessRegFile}</span>}
              </div>

              <div className="form-group full-width">
                <label>GST Certificate (Optional)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="file" name="gstFile" onChange={handleChange} className="primary-input" accept=".pdf,image/*" />
                  <UploadCloud size={20} color="var(--color-primary)" />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Company Logo <span style={{color: 'red'}}>*</span></label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="file" name="companyLogoFile" onChange={handleChange} className="primary-input" accept="image/*" />
                  <UploadCloud size={20} color="var(--color-primary)" />
                </div>
                {errors.companyLogoFile && <span className="error-text">{errors.companyLogoFile}</span>}
              </div>
            </div>

            <button type="submit" className="submit-btn" style={{marginTop: '24px'}}>
              Submit Verification
            </button>
          </form>
      </div>

      <footer className="apply-footer">
        <p>&copy; {new Date().getFullYear()} NariGo Platform. Made for India's rural women.</p>
      </footer>
    </div>
  );
}
