import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, LayoutDashboard } from 'lucide-react';
import './ApplicationSubmitted.css';

export default function ApplicationSubmitted() {
  const navigate = useNavigate();
  const location = useLocation();
  const referenceId = location.state?.referenceId || "NG-102938";

  const lang = useMemo(() => {
    return localStorage.getItem('nariGo_lang') || 'hi';
  }, []);

  return (
    <div className="submitted-container">
      <div className="submitted-bg-orb-1" />
      <div className="submitted-bg-orb-2" />

      <div className="submitted-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="submitted-card glass-card"
        >
          <div className="icon-wrapper">
            <CheckCircle2 size={72} className="success-icon" />
          </div>
          
          <h1 className="submitted-title">
            {lang === 'hi' ? 'आवेदन सफलतापूर्वक जमा किया गया!' : 'Application Submitted Successfully!'}
          </h1>
          
          <p className="submitted-desc">
            {lang === 'hi' 
              ? 'आपका आवेदन प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।' 
              : 'Your application has been received. Our team will contact you shortly.'}
          </p>

          <div className="reference-box">
            <span className="reference-label">
              {lang === 'hi' ? 'संदर्भ संख्या (Reference ID):' : 'Reference ID:'}
            </span>
            <span className="reference-value">{referenceId}</span>
          </div>

          <div className="action-buttons">
            <button 
              className="primary-btn"
              onClick={() => {
                const userStr = localStorage.getItem('nariGo_user');
                if (userStr) {
                  const user = JSON.parse(userStr);
                  if (user.role === 'Employer' || user.role === 'employer') {
                    navigate('/employer-dashboard');
                    return;
                  }
                }
                navigate('/dashboard');
              }}
            >
              <LayoutDashboard size={18} />
              {lang === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard'}
            </button>
            
            <button 
              className="secondary-btn"
              onClick={() => navigate('/my-applications')}
            >
              <ArrowRight size={18} />
              {lang === 'hi' ? 'मेरे आवेदन देखें' : 'View My Applications'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
