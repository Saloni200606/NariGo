import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './EnrollCourse.css';

export default function EnrollCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const courseTitle = location.state?.courseTitle || 'Training Course';

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    village: '',
    district: '',
    education: '',
    preferredBatch: '',
  });

  const [errors, setErrors] = useState({});

  const lang = useMemo(() => {
    return localStorage.getItem('nariGo_lang') || 'hi';
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = lang === 'hi' ? 'पूरा नाम आवश्यक है' : 'Full Name is required';
    if (!formData.mobileNumber.trim() || formData.mobileNumber.length !== 10) newErrors.mobileNumber = lang === 'hi' ? '10 अंकों का मोबाइल नंबर आवश्यक है' : '10-digit Mobile Number is required';
    if (!formData.village.trim()) newErrors.village = lang === 'hi' ? 'गांव आवश्यक है' : 'Village is required';
    if (!formData.district.trim()) newErrors.district = lang === 'hi' ? 'जिला आवश्यक है' : 'District is required';
    if (!formData.education) newErrors.education = lang === 'hi' ? 'शिक्षा आवश्यक है' : 'Education is required';
    if (!formData.preferredBatch) newErrors.preferredBatch = lang === 'hi' ? 'बैच चुनें' : 'Preferred Batch is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const existingEnrollments = JSON.parse(localStorage.getItem('nariGo_enrollments')) || [];
      const newEnrollment = {
        id: "ENR-" + Math.floor(100000 + Math.random() * 900000),
        courseTitle: courseTitle,
        centre: 'RSLDC ' + formData.district,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Enrolled'
      };
      
      existingEnrollments.push(newEnrollment);
      localStorage.setItem('nariGo_enrollments', JSON.stringify(existingEnrollments));
      
      alert(lang === 'hi' ? 'सफलतापूर्वक नामांकित!' : 'Successfully Enrolled!');
      navigate('/my-enrollments');
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
            {lang === 'hi' ? 'कोर्स में नामांकन करें' : 'Course Enrollment'}
          </h1>
        </header>

        <form className="apply-form glass-card" onSubmit={handleSubmit} autoComplete="off">
            <div style={{marginBottom: '20px', padding: '15px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)'}}>
              <strong>{lang === 'hi' ? 'कोर्स:' : 'Course:'} </strong> {courseTitle}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>{lang === 'hi' ? 'पूरा नाम' : 'Full Name'}</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={errors.fullName ? 'error-input' : 'primary-input'} />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}</label>
                <input type="tel" name="mobileNumber" maxLength="10" value={formData.mobileNumber} onChange={handleChange} className={errors.mobileNumber ? 'error-input' : 'primary-input'} />
                {errors.mobileNumber && <span className="error-text">{errors.mobileNumber}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'गांव' : 'Village'}</label>
                <input type="text" name="village" value={formData.village} onChange={handleChange} className={errors.village ? 'error-input' : 'primary-input'} />
                {errors.village && <span className="error-text">{errors.village}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'जिला' : 'District'}</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} className={errors.district ? 'error-input' : 'primary-input'} />
                {errors.district && <span className="error-text">{errors.district}</span>}
              </div>

              <div className="form-group">
                <label>{lang === 'hi' ? 'शिक्षा' : 'Education'}</label>
                <select name="education" value={formData.education} onChange={handleChange} className={errors.education ? 'error-input' : 'primary-input'}>
                  <option value="">{lang === 'hi' ? 'चुनें' : 'Select'}</option>
                  <option value="none">{lang === 'hi' ? 'कोई नहीं' : 'None'}</option>
                  <option value="primary">{lang === 'hi' ? 'प्राथमिक' : 'Primary'}</option>
                  <option value="secondary">{lang === 'hi' ? 'माध्यमिक' : 'Secondary'}</option>
                  <option value="higher_secondary">{lang === 'hi' ? 'उच्च माध्यमिक' : 'Higher Secondary'}</option>
                  <option value="graduate">{lang === 'hi' ? 'स्नातक' : 'Graduate'}</option>
                </select>
                {errors.education && <span className="error-text">{errors.education}</span>}
              </div>
              
              <div className="form-group">
                <label>{lang === 'hi' ? 'पसंदीदा बैच' : 'Preferred Batch'}</label>
                <select name="preferredBatch" value={formData.preferredBatch} onChange={handleChange} className={errors.preferredBatch ? 'error-input' : 'primary-input'}>
                  <option value="">{lang === 'hi' ? 'चुनें' : 'Select'}</option>
                  <option value="morning">{lang === 'hi' ? 'सुबह (9 AM - 1 PM)' : 'Morning (9 AM - 1 PM)'}</option>
                  <option value="afternoon">{lang === 'hi' ? 'दोपहर (2 PM - 6 PM)' : 'Afternoon (2 PM - 6 PM)'}</option>
                </select>
                {errors.preferredBatch && <span className="error-text">{errors.preferredBatch}</span>}
              </div>
            </div>

            <button type="submit" className="submit-btn" style={{marginTop: '24px'}}>
              {lang === 'hi' ? 'नामांकन जमा करें' : 'Submit Enrollment'}
            </button>
          </form>
      </div>

      <footer className="apply-footer">
        <p>&copy; {new Date().getFullYear()} NariGo Platform. Made for India's rural women.</p>
      </footer>
    </div>
  );
}
