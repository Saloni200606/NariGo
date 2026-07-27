import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Building2, BookOpen, Eye } from 'lucide-react';
import './MyEnrollments.css';

export default function MyEnrollments() {
  const navigate = useNavigate();

  const lang = useMemo(() => {
    return localStorage.getItem('nariGo_lang') || 'hi';
  }, []);

  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('nariGo_enrollments')) || [];
    setEnrollments(stored);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Enrolled': return 'status-selected';
      case 'Pending': return 'status-applied';
      default: return 'status-default';
    }
  };

  const getStatusText = (status) => {
    if (lang === 'en') return status;
    switch(status) {
      case 'Enrolled': return 'नामांकित';
      case 'Pending': return 'लंबित';
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
            {lang === 'hi' ? 'मेरे नामांकन' : 'My Enrollments'}
          </h1>
        </header>

        <div className="apps-list">
          {enrollments.length === 0 ? (
             <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                <p className="text-subheading">{lang === 'hi' ? 'कोई नामांकन नहीं मिला' : 'No enrollments found'}</p>
             </div>
          ) : (
            enrollments.map((enr, index) => (
              <motion.div
                key={enr.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="app-card glass-card"
              >
                <div className="app-card-header">
                  <div className="app-title-group">
                    <BookOpen size={20} className="app-icon-primary" />
                    <h3 className="app-job-title">
                      {enr.courseTitle}
                    </h3>
                  </div>
                  <span className={`status-badge ${getStatusColor(enr.status)}`}>
                    {getStatusText(enr.status)}
                  </span>
                </div>

                <div className="app-card-body">
                  <div className="app-detail">
                    <Building2 size={16} className="app-icon-secondary" />
                    <span className="app-detail-text">
                      {enr.centre}
                    </span>
                  </div>
                  
                  <div className="app-detail">
                    <Calendar size={16} className="app-icon-secondary" />
                    <span className="app-detail-text">
                      {lang === 'hi' ? 'नामांकन तिथि: ' : 'Enrolled on: '} 
                      <span className="font-medium">{enr.date}</span>
                    </span>
                  </div>
                  
                  <div className="app-ref">
                    <span className="ref-label">{lang === 'hi' ? 'संदर्भ ID:' : 'Ref ID:'}</span>
                    <span className="ref-value">{enr.id}</span>
                  </div>
                </div>

                <div className="app-card-footer">
                  <button className="view-details-btn">
                    <Eye size={16} />
                    <span>{lang === 'hi' ? 'विवरण देखें' : 'View Details'}</span>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <footer className="apps-footer">
        <p>&copy; {new Date().getFullYear()} NariGo Platform. Made for India's rural women.</p>
      </footer>
    </div>
  );
}
