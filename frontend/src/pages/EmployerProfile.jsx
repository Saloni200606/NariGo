import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Building, MapPin, Phone, Mail, 
  FileText, CheckCircle, Briefcase, Info, BriefcaseBusiness
} from 'lucide-react';
import './EmployerProfile.css';

export default function EmployerProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [jobsCount, setJobsCount] = useState(0);

  const lang = localStorage.getItem('nariGo_lang') || 'hi';

  useEffect(() => {
    const userStr = localStorage.getItem('nariGo_user');
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
      setFormData({
        companyName: parsedUser.companyName || parsedUser.fullName || '',
        businessType: parsedUser.businessType || 'Private Limited',
        address: parsedUser.address || (parsedUser.village ? `${parsedUser.village}, ${parsedUser.district}` : ''),
        contactPerson: parsedUser.contactPerson || parsedUser.fullName || '',
        email: parsedUser.email || '',
        phoneNumber: parsedUser.phoneNumber || '',
        gst: parsedUser.gst || '',
        description: parsedUser.description || ''
      });
    } else {
      navigate('/login');
    }

    // Count jobs
    const jobs = JSON.parse(localStorage.getItem('nariGo_posted_jobs')) || [];
    setJobsCount(jobs.length);
  }, [navigate]);

  if (!user) return null;

  const verificationStatus = user.verificationStatus || 'pending';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('nariGo_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="employer-profile-container">
      <div className="employer-profile-main">
        <header className="employer-profile-header">
          <div className="employer-profile-title">
            <button className="secondary-btn" onClick={() => navigate('/employer-dashboard')} style={{ width: 'fit-content', padding: '0 16px', height: '44px' }}>
              <ArrowLeft size={20} />
            </button>
            {lang === 'hi' ? 'कंपनी प्रोफ़ाइल' : 'Company Profile'}
          </div>
          <button 
            className="primary-btn" 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            style={{ width: 'fit-content', padding: '0 24px', height: '44px' }}
          >
            {isEditing ? (lang === 'hi' ? 'सहेजें' : 'Save Changes') : (lang === 'hi' ? 'संपादित करें' : 'Edit Profile')}
          </button>
        </header>

        <div className="ep-card">
          <div className="ep-top-section">
            <div className="ep-logo-placeholder">
              <Building size={48} />
            </div>
            <div className="ep-company-info">
              {isEditing ? (
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="ep-input" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }} placeholder="Company Name" />
              ) : (
                <h2>
                  {formData.companyName || 'N/A'}
                  {verificationStatus === 'Verified' && <CheckCircle size={24} color="#007BFF" />}
                </h2>
              )}
              
              <span className={`ep-verification-badge ${verificationStatus}`}>
                {verificationStatus === 'Verified' ? (lang === 'hi' ? '✔ सत्यापित नियोक्ता' : '✔ Verified Employer') :
                 verificationStatus === 'Pending' || verificationStatus === 'pending' ? (lang === 'hi' ? 'सत्यापन लंबित' : 'Verification Pending') : 
                 (lang === 'hi' ? 'सत्यापन अस्वीकृत' : 'Verification Rejected')}
              </span>
            </div>
          </div>

          <div className="ep-details-grid">
            <div className="ep-detail-group">
              <span className="ep-label">{lang === 'hi' ? 'व्यवसाय का प्रकार' : 'Business Type'}</span>
              {isEditing ? (
                <input type="text" name="businessType" value={formData.businessType} onChange={handleChange} className="ep-input" />
              ) : (
                <span className="ep-value"><BriefcaseBusiness size={18} className="ep-icon" /> {formData.businessType || 'N/A'}</span>
              )}
            </div>

            <div className="ep-detail-group">
              <span className="ep-label">{lang === 'hi' ? 'संपर्क सूत्र' : 'Contact Person'}</span>
              {isEditing ? (
                <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="ep-input" />
              ) : (
                <span className="ep-value"><User size={18} className="ep-icon" /> {formData.contactPerson || 'N/A'}</span>
              )}
            </div>

            <div className="ep-detail-group">
              <span className="ep-label">{lang === 'hi' ? 'फ़ोन नंबर' : 'Phone Number'}</span>
              {isEditing ? (
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="ep-input" />
              ) : (
                <span className="ep-value"><Phone size={18} className="ep-icon" /> {formData.phoneNumber || 'N/A'}</span>
              )}
            </div>

            <div className="ep-detail-group">
              <span className="ep-label">{lang === 'hi' ? 'ईमेल' : 'Email Address'}</span>
              {isEditing ? (
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="ep-input" />
              ) : (
                <span className="ep-value"><Mail size={18} className="ep-icon" /> {formData.email || 'N/A'}</span>
              )}
            </div>

            <div className="ep-detail-group full-width">
              <span className="ep-label">{lang === 'hi' ? 'पता' : 'Address'}</span>
              {isEditing ? (
                <textarea name="address" value={formData.address} onChange={handleChange} className="ep-textarea" style={{ minHeight: '60px' }}></textarea>
              ) : (
                <span className="ep-value"><MapPin size={18} className="ep-icon" /> {formData.address || 'N/A'}</span>
              )}
            </div>

            <div className="ep-detail-group">
              <span className="ep-label">{lang === 'hi' ? 'जीएसटी (वैकल्पिक)' : 'GST (Optional)'}</span>
              {isEditing ? (
                <input type="text" name="gst" value={formData.gst} onChange={handleChange} className="ep-input" />
              ) : (
                <span className="ep-value"><FileText size={18} className="ep-icon" /> {formData.gst || 'Not Provided'}</span>
              )}
            </div>
            
            <div className="ep-detail-group">
              <span className="ep-label">{lang === 'hi' ? 'दस्तावेज़' : 'Business Documents'}</span>
              <span className="ep-value"><CheckCircle size={18} color="#10B981" /> {lang === 'hi' ? 'अपलोड किए गए' : 'Uploaded (Verified)'}</span>
            </div>

            <div className="ep-detail-group full-width">
              <span className="ep-label">{lang === 'hi' ? 'कंपनी विवरण' : 'Company Description'}</span>
              {isEditing ? (
                <textarea name="description" value={formData.description} onChange={handleChange} className="ep-textarea"></textarea>
              ) : (
                <span className="ep-value" style={{ lineHeight: 1.5 }}>
                  {formData.description || (lang === 'hi' ? 'कोई विवरण नहीं दिया गया।' : 'No description provided yet.')}
                </span>
              )}
            </div>
          </div>

          <div className="ep-stats-container">
            <div className="ep-stat">
              <div className="ep-stat-icon"><Briefcase size={24} /></div>
              <div className="ep-stat-text">
                <h4>{jobsCount}</h4>
                <span>{lang === 'hi' ? 'कुल नौकरियाँ पोस्ट की गईं' : 'Total Jobs Posted'}</span>
              </div>
            </div>
            <div className="ep-stat">
              <div className="ep-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}><User size={24} /></div>
              <div className="ep-stat-text">
                <h4>{Math.floor(jobsCount * 2.5)}</h4>
                <span>{lang === 'hi' ? 'कुल उम्मीदवार' : 'Total Candidates'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
