import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import './PostNewJob.css';

export default function PostNewJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    salary: '',
    employmentType: 'Full-time',
    skills: '',
    workingHours: '',
    vacancies: '',
    description: '',
    lastDate: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);

  const lang = localStorage.getItem('nariGo_lang') || 'hi';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing posted jobs
    const existingJobs = JSON.parse(localStorage.getItem('nariGo_posted_jobs')) || [];
    
    // Get logged in employer
    const user = JSON.parse(localStorage.getItem('nariGo_user')) || {};
    const employerId = user.phoneNumber || user.email || 'unknown';

    // Create new job with ID, current date, and employerId
    const newJob = {
      ...formData,
      id: Date.now().toString(),
      employerId,
      postedDate: new Date().toISOString()
    };
    
    existingJobs.unshift(newJob);
    localStorage.setItem('nariGo_posted_jobs', JSON.stringify(existingJobs));
    window.dispatchEvent(new Event('storage'));
    
    setShowSuccess(true);
  };

  const handleBackToDashboard = () => {
    navigate('/employer-dashboard');
  };

  return (
    <div className="postjob-container">
      <div className="postjob-main">
        <header className="postjob-header">
          <button className="secondary-btn" onClick={handleBackToDashboard} style={{ width: 'fit-content', padding: '0 16px', height: '44px' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="postjob-title">{lang === 'hi' ? 'नई नौकरी पोस्ट करें' : 'Post New Job'}</h1>
        </header>

        <form className="postjob-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">{lang === 'hi' ? 'नौकरी का शीर्षक' : 'Job Title'}</label>
              <input type="text" name="title" className="form-input" required value={formData.title} onChange={handleChange} placeholder="e.g. Data Entry Operator" />
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'hi' ? 'श्रेणी' : 'Category'}</label>
              <select name="category" className="form-select" required value={formData.category} onChange={handleChange}>
                <option value="">{lang === 'hi' ? 'श्रेणी चुनें' : 'Select Category'}</option>
                <option value="Anganwadi">Anganwadi</option>
                <option value="Handicrafts">Handicrafts</option>
                <option value="Food Processing">Food Processing</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Beauty">Beauty & Wellness</option>
                <option value="Domestic">Domestic Help</option>
                <option value="Tailoring">Tailoring</option>
                <option value="Dairy">Dairy</option>
                <option value="Mushroom">Mushroom</option>
                <option value="Goat Farming">Goat Farming</option>
                <option value="IT/Office">IT / Office Work</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'hi' ? 'स्थान' : 'Location'}</label>
              <input type="text" name="location" className="form-input" required value={formData.location} onChange={handleChange} placeholder="e.g. Jaipur" />
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'hi' ? 'मासिक वेतन (₹)' : 'Salary (₹ per month)'}</label>
              <input type="number" name="salary" className="form-input" required value={formData.salary} onChange={handleChange} placeholder="e.g. 15000" />
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'hi' ? 'रोजगार का प्रकार' : 'Employment Type'}</label>
              <select name="employmentType" className="form-select" required value={formData.employmentType} onChange={handleChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Work from Home">Work from Home</option>
                <option value="Seasonal">Seasonal</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'hi' ? 'कार्य के घंटे' : 'Working Hours'}</label>
              <input type="text" name="workingHours" className="form-input" required value={formData.workingHours} onChange={handleChange} placeholder="e.g. 9 AM - 5 PM" />
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'hi' ? 'रिक्तियों की संख्या' : 'Number of Vacancies'}</label>
              <input type="number" name="vacancies" className="form-input" required value={formData.vacancies} onChange={handleChange} min="1" />
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'hi' ? 'आवेदन की अंतिम तिथि' : 'Last Date to Apply'}</label>
              <input type="date" name="lastDate" className="form-input" required value={formData.lastDate} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label className="form-label">{lang === 'hi' ? 'आवश्यक कौशल' : 'Required Skills'}</label>
              <input type="text" name="skills" className="form-input" required value={formData.skills} onChange={handleChange} placeholder="e.g. Basic Computer, Hindi Typing (comma separated)" />
            </div>

            <div className="form-group full-width">
              <label className="form-label">{lang === 'hi' ? 'नौकरी का विवरण' : 'Job Description'}</label>
              <textarea name="description" className="form-textarea" required value={formData.description} onChange={handleChange} placeholder="Describe the responsibilities and requirements..."></textarea>
            </div>

            <div className="form-group full-width">
              <button type="submit" className="submit-btn">{lang === 'hi' ? 'नौकरी पोस्ट करें' : 'Post Job'}</button>
            </div>
          </div>
        </form>

        {showSuccess && (
          <div className="success-modal">
            <div className="modal-content">
              <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--color-text-dark)' }}>
                {lang === 'hi' ? 'नौकरी सफलतापूर्वक पोस्ट की गई!' : 'Job Posted Successfully!'}
              </h2>
              <p style={{ color: 'var(--color-text-small)', marginBottom: '24px' }}>
                {lang === 'hi' ? 'आपकी नौकरी अब उम्मीदवारों के लिए खोज में उपलब्ध है।' : 'Your job is now live and visible to candidates in Find Jobs.'}
              </p>
              <button className="submit-btn" style={{ marginTop: 0 }} onClick={handleBackToDashboard}>
                {lang === 'hi' ? 'डैशबोर्ड पर लौटें' : 'Return to Dashboard'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
