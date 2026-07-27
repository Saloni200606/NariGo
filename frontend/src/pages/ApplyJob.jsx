import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './ApplyJob.css';

export default function ApplyJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId;

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    mobileNumber: '',
    aadhaarNumber: '',
    village: '',
    district: '',
    preferredLanguage: '',
    education: '',
    skills: '',
    workExperience: '',
    preferredWorkType: '',
    availableWorkingHours: '',
    preferredTravelDistance: '',
    salaryExpectation: '',
    skillCertificate: null,
  });

  const [errors, setErrors] = useState({});

  const lang = useMemo(() => {
    return localStorage.getItem('nariGo_lang') || 'hi';
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'skillCertificate') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error for field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = lang === 'hi' ? 'पूरा नाम आवश्यक है' : 'Full Name is required';
    if (!formData.age || isNaN(formData.age) || parseInt(formData.age) < 18) newErrors.age = lang === 'hi' ? 'वैध आयु आवश्यक है (18+)' : 'Valid Age is required (18+)';
    if (!formData.mobileNumber.trim() || formData.mobileNumber.length !== 10) newErrors.mobileNumber = lang === 'hi' ? '10 अंकों का मोबाइल नंबर आवश्यक है' : '10-digit Mobile Number is required';
    if (!formData.aadhaarNumber.trim() || formData.aadhaarNumber.length !== 12) newErrors.aadhaarNumber = lang === 'hi' ? '12 अंकों का आधार नंबर आवश्यक है' : '12-digit Aadhaar Number is required';
    if (!formData.village.trim()) newErrors.village = lang === 'hi' ? 'गांव आवश्यक है' : 'Village is required';
    if (!formData.district.trim()) newErrors.district = lang === 'hi' ? 'जिला आवश्यक है' : 'District is required';
    if (!formData.preferredLanguage) newErrors.preferredLanguage = lang === 'hi' ? 'प्राथमिक भाषा आवश्यक है' : 'Preferred Language is required';
    if (!formData.education) newErrors.education = lang === 'hi' ? 'शिक्षा आवश्यक है' : 'Education is required';
    if (!formData.skills.trim()) newErrors.skills = lang === 'hi' ? 'कौशल आवश्यक हैं' : 'Skills are required';
    if (!formData.workExperience.trim()) newErrors.workExperience = lang === 'hi' ? 'कार्य अनुभव आवश्यक है' : 'Work Experience is required';
    if (!formData.preferredWorkType) newErrors.preferredWorkType = lang === 'hi' ? 'पसंदीदा कार्य प्रकार आवश्यक है' : 'Preferred Work Type is required';
    if (!formData.availableWorkingHours) newErrors.availableWorkingHours = lang === 'hi' ? 'उपलब्ध कार्य घंटे आवश्यक हैं' : 'Available Working Hours are required';
    if (!formData.preferredTravelDistance) newErrors.preferredTravelDistance = lang === 'hi' ? 'पसंदीदा यात्रा दूरी आवश्यक है' : 'Preferred Travel Distance is required';
    if (!formData.salaryExpectation.trim()) newErrors.salaryExpectation = lang === 'hi' ? 'वेतन अपेक्षा आवश्यक है' : 'Salary Expectation is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // API call to submit form data
      const referenceId = "NG-" + Math.floor(100000 + Math.random() * 900000);
      
      const newApplication = {
        ...formData,
        jobId: jobId || 'Unknown Job', // Should ideally come from job listing
        applicationId: referenceId,
        applyDate: new Date().toISOString(),
        status: 'Pending'
      };
      
      const existingApps = JSON.parse(localStorage.getItem('nariGo_job_applications')) || [];
      existingApps.unshift(newApplication);
      localStorage.setItem('nariGo_job_applications', JSON.stringify(existingApps));
      window.dispatchEvent(new Event('storage'));

      navigate('/application-submitted', { state: { referenceId } });
    }
  };

  return (
    <div className="apply-container">
      <div className="apply-bg-orb-1" />
      <div className="apply-bg-orb-2" />

      <div className="apply-main">
        <header className="apply-header">
          <button onClick={handleBack} className="back-btn" aria-label="Go back">
            <ArrowLeft className="back-btn-icon" />
          </button>
          <h1 className="apply-title">
            {lang === 'hi' ? 'नौकरी के लिए आवेदन करें' : 'Apply for Job'}
          </h1>
        </header>

        <form className="apply-form glass-card" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>{lang === 'hi' ? 'पूरा नाम' : 'Full Name'}</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={errors.fullName ? 'error-input' : ''} />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'आयु' : 'Age'}</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className={errors.age ? 'error-input' : ''} />
                {errors.age && <span className="error-text">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}</label>
                <input type="tel" name="mobileNumber" maxLength="10" value={formData.mobileNumber} onChange={handleChange} className={errors.mobileNumber ? 'error-input' : ''} />
                {errors.mobileNumber && <span className="error-text">{errors.mobileNumber}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'आधार नंबर' : 'Aadhaar Number'}</label>
                <input type="text" name="aadhaarNumber" maxLength="12" value={formData.aadhaarNumber} onChange={handleChange} className={errors.aadhaarNumber ? 'error-input' : ''} />
                {errors.aadhaarNumber && <span className="error-text">{errors.aadhaarNumber}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'गांव' : 'Village'}</label>
                <input type="text" name="village" value={formData.village} onChange={handleChange} className={errors.village ? 'error-input' : ''} />
                {errors.village && <span className="error-text">{errors.village}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'जिला' : 'District'}</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} className={errors.district ? 'error-input' : ''} />
                {errors.district && <span className="error-text">{errors.district}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'पसंदीदा भाषा' : 'Preferred Language'}</label>
                <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} className={errors.preferredLanguage ? 'error-input' : ''}>
                  <option value="">{lang === 'hi' ? 'चुनें' : 'Select'}</option>
                  <option value="hindi">Hindi</option>
                  <option value="english">English</option>
                  <option value="regional">Regional</option>
                </select>
                {errors.preferredLanguage && <span className="error-text">{errors.preferredLanguage}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'शिक्षा' : 'Education'}</label>
                <select name="education" value={formData.education} onChange={handleChange} className={errors.education ? 'error-input' : ''}>
                  <option value="">{lang === 'hi' ? 'चुनें' : 'Select'}</option>
                  <option value="none">{lang === 'hi' ? 'कोई नहीं' : 'None'}</option>
                  <option value="primary">{lang === 'hi' ? 'प्राथमिक' : 'Primary'}</option>
                  <option value="secondary">{lang === 'hi' ? 'माध्यमिक' : 'Secondary'}</option>
                  <option value="higher_secondary">{lang === 'hi' ? 'उच्च माध्यमिक' : 'Higher Secondary'}</option>
                  <option value="graduate">{lang === 'hi' ? 'स्नातक' : 'Graduate'}</option>
                </select>
                {errors.education && <span className="error-text">{errors.education}</span>}
              </div>

              <div className="form-group full-width">
                <label>{lang === 'hi' ? 'कौशल' : 'Skills'}</label>
                <input type="text" name="skills" placeholder={lang === 'hi' ? 'उदा. सिलाई, खेती' : 'e.g. Tailoring, Farming'} value={formData.skills} onChange={handleChange} className={errors.skills ? 'error-input' : ''} />
                {errors.skills && <span className="error-text">{errors.skills}</span>}
              </div>

              <div className="form-group full-width">
                <label>{lang === 'hi' ? 'कार्य अनुभव' : 'Work Experience'}</label>
                <input type="text" name="workExperience" placeholder={lang === 'hi' ? 'उदा. 2 वर्ष' : 'e.g. 2 years'} value={formData.workExperience} onChange={handleChange} className={errors.workExperience ? 'error-input' : ''} />
                {errors.workExperience && <span className="error-text">{errors.workExperience}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'पसंदीदा कार्य प्रकार' : 'Preferred Work Type'}</label>
                <select name="preferredWorkType" value={formData.preferredWorkType} onChange={handleChange} className={errors.preferredWorkType ? 'error-input' : ''}>
                  <option value="">{lang === 'hi' ? 'चुनें' : 'Select'}</option>
                  <option value="full-time">{lang === 'hi' ? 'पूर्णकालिक' : 'Full-time'}</option>
                  <option value="part-time">{lang === 'hi' ? 'अंशकालिक' : 'Part-time'}</option>
                  <option value="wfh">{lang === 'hi' ? 'घर से काम' : 'Work from Home'}</option>
                  <option value="seasonal">{lang === 'hi' ? 'मौसमी' : 'Seasonal'}</option>
                </select>
                {errors.preferredWorkType && <span className="error-text">{errors.preferredWorkType}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'उपलब्ध कार्य घंटे' : 'Available Working Hours'}</label>
                <input type="text" name="availableWorkingHours" placeholder="e.g. 9 AM - 5 PM" value={formData.availableWorkingHours} onChange={handleChange} className={errors.availableWorkingHours ? 'error-input' : ''} />
                {errors.availableWorkingHours && <span className="error-text">{errors.availableWorkingHours}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'पसंदीदा यात्रा दूरी' : 'Preferred Travel Distance'}</label>
                <select name="preferredTravelDistance" value={formData.preferredTravelDistance} onChange={handleChange} className={errors.preferredTravelDistance ? 'error-input' : ''}>
                  <option value="">{lang === 'hi' ? 'चुनें' : 'Select'}</option>
                  <option value="0-5">0-5 km</option>
                  <option value="5-10">5-10 km</option>
                  <option value="10-20">10-20 km</option>
                  <option value="20+">20+ km</option>
                </select>
                {errors.preferredTravelDistance && <span className="error-text">{errors.preferredTravelDistance}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'वेतन अपेक्षा (₹/माह)' : 'Salary Expectation (₹/month)'}</label>
                <input type="text" name="salaryExpectation" value={formData.salaryExpectation} onChange={handleChange} className={errors.salaryExpectation ? 'error-input' : ''} />
                {errors.salaryExpectation && <span className="error-text">{errors.salaryExpectation}</span>}
              </div>

              <div className="form-group full-width">
                <label>{lang === 'hi' ? 'कौशल प्रमाणपत्र (वैकल्पिक)' : 'Skill Certificate (Optional)'}</label>
                <input type="file" name="skillCertificate" onChange={handleChange} className="file-input" />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              {lang === 'hi' ? 'आवेदन जमा करें' : 'Submit Application'}
            </button>
          </form>
      </div>

      <footer className="apply-footer">
        <p>&copy; {new Date().getFullYear()} NariGo Platform. Made for India's rural women.</p>
      </footer>
    </div>
  );
}
