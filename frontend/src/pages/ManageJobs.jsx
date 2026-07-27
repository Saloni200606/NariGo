import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Power, Briefcase, MapPin, IndianRupee, X } from 'lucide-react';
import './ManageJobs.css';

export default function ManageJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  
  const lang = localStorage.getItem('nariGo_lang') || 'hi';

  const user = JSON.parse(localStorage.getItem('nariGo_user')) || {};
  const employerId = user.phoneNumber || user.email || 'unknown';

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const allJobs = JSON.parse(localStorage.getItem('nariGo_posted_jobs')) || [];
    const employerJobs = allJobs.filter(job => job.employerId === employerId);
    setJobs(employerJobs);
  };

  const saveJobs = (newEmployerJobs) => {
    const allJobs = JSON.parse(localStorage.getItem('nariGo_posted_jobs')) || [];
    const otherJobs = allJobs.filter(job => job.employerId !== employerId);
    const updatedAllJobs = [...newEmployerJobs, ...otherJobs];
    localStorage.setItem('nariGo_posted_jobs', JSON.stringify(updatedAllJobs));
    setJobs(newEmployerJobs);
    window.dispatchEvent(new Event('storage'));
  };

  const handleDelete = (id) => {
    if (window.confirm(lang === 'hi' ? 'क्या आप वाकई इस नौकरी को हटाना चाहते हैं?' : 'Are you sure you want to delete this job?')) {
      const filtered = jobs.filter(job => job.id !== id);
      saveJobs(filtered);
    }
  };

  const handleToggleActive = (id) => {
    const updated = jobs.map(job => {
      if (job.id === id) {
        // if isActive is undefined, it means it's active. So toggling makes it false.
        const currentStatus = job.isActive !== false;
        return { ...job, isActive: !currentStatus };
      }
      return job;
    });
    saveJobs(updated);
  };

  const handleEditClick = (job) => {
    setEditingJob({ ...job });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingJob(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const updated = jobs.map(job => (job.id === editingJob.id ? editingJob : job));
    saveJobs(updated);
    setEditingJob(null);
  };

  return (
    <div className="managejobs-container">
      <div className="managejobs-main">
        <header className="managejobs-header">
          <button className="secondary-btn" onClick={() => navigate('/employer-dashboard')} style={{ width: 'fit-content', padding: '0 16px', height: '44px' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="managejobs-title">{lang === 'hi' ? 'नौकरियां प्रबंधित करें' : 'Manage Jobs'}</h1>
        </header>

        {jobs.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h2>{lang === 'hi' ? 'कोई नौकरी नहीं मिली' : 'No jobs posted yet'}</h2>
            <p>{lang === 'hi' ? 'अपनी पहली नौकरी बनाने के लिए "नई नौकरी पोस्ट करें" पर जाएं।' : 'Go to "Post New Job" to create your first listing.'}</p>
          </div>
        ) : (
          <div className="jobs-list">
            {jobs.map(job => {
              const isActive = job.isActive !== false;
              return (
                <div key={job.id} className="manage-job-card">
                  <div className="job-card-header">
                    <div>
                      <h3 className="job-card-title">{job.title}</h3>
                      <div className="job-card-meta">
                        <span className="meta-item"><Briefcase size={16} /> {job.category}</span>
                        <span className="meta-item"><MapPin size={16} /> {job.location}</span>
                        <span className="meta-item"><IndianRupee size={16} /> {job.salary}/mo</span>
                      </div>
                    </div>
                    <span className={`job-status ${isActive ? 'status-active' : 'status-inactive'}`}>
                      {isActive ? (lang === 'hi' ? 'सक्रिय' : 'Active') : (lang === 'hi' ? 'निष्क्रिय' : 'Inactive')}
                    </span>
                  </div>
                  
                  <div className="job-card-actions">
                    <button className="action-btn btn-edit" onClick={() => handleEditClick(job)}>
                      <Edit2 size={16} /> {lang === 'hi' ? 'संपादित करें' : 'Edit'}
                    </button>
                    <button className="action-btn btn-toggle" onClick={() => handleToggleActive(job.id)}>
                      <Power size={16} /> {isActive ? (lang === 'hi' ? 'निष्क्रिय करें' : 'Deactivate') : (lang === 'hi' ? 'सक्रिय करें' : 'Activate')}
                    </button>
                    <button className="action-btn btn-delete" onClick={() => handleDelete(job.id)}>
                      <Trash2 size={16} /> {lang === 'hi' ? 'हटाएं' : 'Delete'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Edit Modal */}
        {editingJob && (
          <div className="edit-modal-overlay">
            <div className="edit-modal-content">
              <div className="edit-modal-header">
                <h2>{lang === 'hi' ? 'नौकरी संपादित करें' : 'Edit Job'}</h2>
                <button onClick={() => setEditingJob(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={24} color="var(--color-text-dark)" />
                </button>
              </div>
              <form onSubmit={handleEditSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>{lang === 'hi' ? 'नौकरी का शीर्षक' : 'Job Title'}</label>
                  <input type="text" name="title" value={editingJob.title} onChange={handleEditChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>{lang === 'hi' ? 'वेतन' : 'Salary'}</label>
                  <input type="number" name="salary" value={editingJob.salary} onChange={handleEditChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>{lang === 'hi' ? 'स्थान' : 'Location'}</label>
                  <input type="text" name="location" value={editingJob.location} onChange={handleEditChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>{lang === 'hi' ? 'विवरण' : 'Description'}</label>
                  <textarea name="description" value={editingJob.description} onChange={handleEditChange} required rows="4" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}></textarea>
                </div>
                <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '16px' }}>
                  {lang === 'hi' ? 'परिवर्तन सहेजें' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
