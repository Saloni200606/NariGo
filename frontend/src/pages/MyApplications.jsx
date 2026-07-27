import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Building2, Briefcase, Eye } from 'lucide-react';
import './MyApplications.css';

export default function MyApplications() {
  const navigate = useNavigate();

  const lang = useMemo(() => {
    return localStorage.getItem('nariGo_lang') || 'hi';
  }, []);

  const [applications] = useState([
    {
      id: 'NG-458921',
      titleEn: 'Farm Worker',
      titleHi: 'खेत मजदूर',
      employerEn: 'Green Fields Ltd',
      employerHi: 'ग्रीन फील्ड्स लिमिटेड',
      date: '16 Jul 2026',
      status: 'Applied', // Applied, Shortlisted, Interview, Selected, Rejected
    },
    {
      id: 'NG-392810',
      titleEn: 'Senior Tailor',
      titleHi: 'वरिष्ठ दर्जी',
      employerEn: 'Jaipur Textiles',
      employerHi: 'जयपुर टेक्सटाइल्स',
      date: '12 Jul 2026',
      status: 'Interview',
    },
    {
      id: 'NG-192833',
      titleEn: 'Dairy Assistant',
      titleHi: 'डेयरी सहायक',
      employerEn: 'NariGo Dairy Coop',
      employerHi: 'नारीगो डेयरी को-ऑप',
      date: '05 Jul 2026',
      status: 'Selected',
    },
    {
      id: 'NG-092112',
      titleEn: 'Packing Helper',
      titleHi: 'पैकिंग सहायक',
      employerEn: 'Fresh Foods Inc',
      employerHi: 'फ्रेश फूड्स इंक',
      date: '01 Jul 2026',
      status: 'Rejected',
    },
    {
      id: 'NG-552912',
      titleEn: 'Anganwadi Worker',
      titleHi: 'आंगनवाड़ी कार्यकर्ता',
      employerEn: 'Govt. Scheme',
      employerHi: 'सरकारी योजना',
      date: '14 Jul 2026',
      status: 'Shortlisted',
    }
  ]);

  const handleBack = () => {
    const userStr = localStorage.getItem('nariGo_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === 'Employer' || user.role === 'employer') {
        navigate('/employer-dashboard');
        return;
      }
    }
    navigate('/dashboard');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return 'status-applied';
      case 'Shortlisted': return 'status-shortlisted';
      case 'Interview': return 'status-interview';
      case 'Selected': return 'status-selected';
      case 'Rejected': return 'status-rejected';
      default: return 'status-default';
    }
  };

  const getStatusText = (status) => {
    if (lang === 'en') return status;
    switch(status) {
      case 'Applied': return 'आवेदन किया';
      case 'Shortlisted': return 'शॉर्टलिस्ट किया गया';
      case 'Interview': return 'साक्षात्कार';
      case 'Selected': return 'चयनित';
      case 'Rejected': return 'अस्वीकृत';
      default: return status;
    }
  };

  return (
    <div className="apps-container">
      <div className="apps-bg-orb-1" />
      <div className="apps-bg-orb-2" />

      <div className="apps-main">
        <header className="apps-header">
          <button onClick={handleBack} className="back-btn" aria-label="Go back">
            <ArrowLeft className="back-btn-icon" />
          </button>
          <h1 className="apps-title">
            {lang === 'hi' ? 'मेरे आवेदन' : 'My Applications'}
          </h1>
        </header>

        <div className="apps-list">
          {applications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="app-card glass-card"
            >
              <div className="app-card-header">
                <div className="app-title-group">
                  <Briefcase size={20} className="app-icon-primary" />
                  <h3 className="app-job-title">
                    {lang === 'hi' ? app.titleHi : app.titleEn}
                  </h3>
                </div>
                <span className={`status-badge ${getStatusColor(app.status)}`}>
                  {getStatusText(app.status)}
                </span>
              </div>

              <div className="app-card-body">
                <div className="app-detail">
                  <Building2 size={16} className="app-icon-secondary" />
                  <span className="app-detail-text">
                    {lang === 'hi' ? app.employerHi : app.employerEn}
                  </span>
                </div>
                
                <div className="app-detail">
                  <Calendar size={16} className="app-icon-secondary" />
                  <span className="app-detail-text">
                    {lang === 'hi' ? 'आवेदन तिथि: ' : 'Applied on: '} 
                    <span className="font-medium">{app.date}</span>
                  </span>
                </div>
                
                <div className="app-ref">
                  <span className="ref-label">{lang === 'hi' ? 'संदर्भ ID:' : 'Ref ID:'}</span>
                  <span className="ref-value">{app.id}</span>
                </div>
              </div>

              <div className="app-card-footer">
                <button className="view-details-btn">
                  <Eye size={16} />
                  <span>{lang === 'hi' ? 'विवरण देखें' : 'View Details'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="apps-footer">
        <p>&copy; {new Date().getFullYear()} NariGo Platform. Made for India's rural women.</p>
      </footer>
    </div>
  );
}
