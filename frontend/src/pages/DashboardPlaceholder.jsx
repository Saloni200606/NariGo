import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  Briefcase,
  Shield,
  GraduationCap,
  Heart,
  ChevronRight,
  LogOut
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import './DashboardPlaceholder.css';

// const navigate = useNavigate();

export default function DashboardPlaceholder() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '98XXX XXX54';

  const handleLogout = () => {
    localStorage.removeItem('nariGo_user');
    localStorage.removeItem('nariGo_token');
    navigate('/login');
  };


  // const handleCardClick = (portalName) => {
  //   alert(`Opening ${portalName} portal...`);
  // };

  const handleCardClick = (category) => {
    switch (category) {
      case "Stitching & Tailoring":
        navigate("/stitching-tailoring");
        break;

      case "Handicrafts":
        navigate("/handicrafts");
        break;

      case "Food Processing":
        navigate("/food-processing");
        break;

      case "Agriculture":
        navigate("/agriculture");
        break;

      case "Dairy & Livestock":
        navigate("/dairy-livestock");
        break;

      case "Beauty & Mehendi":
        navigate("/beauty-mehendi");
        break;

      case "Home Services":
        navigate("/home-services");
        break;

      case "Community Services":
        navigate("/community-services");
        break;

      case "Digital Jobs":
        navigate("/digital-jobs");
        break;

      case "Small Business":
        navigate("/small-business");
        break;

      case "Packaging":
        navigate("/packaging");
        break;

      case "Manufacturing":
        navigate("/manufacturing");
        break;

      default:
        navigate("/");
    }
  };

  return (
    <div className="dashboard-container">

      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="header-brand">
          <img src={logoImg} alt="Logo" className="header-logo" />
          <span className="header-title-text">NariGo Portal</span>
        </div>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          <LogOut className="logout-icon" />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="dashboard-main">

        {/* Banner Success Card (Matching Top Card in Image) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="success-banner-card"
          style={{ minHeight: '200px' }}
        >
          {/* Side background glowing soft spots */}
          <div className="glow-spot-left" />
          <div className="glow-spot-right" />

          {/* Green checkmark badge with decorative sparkles */}
          <div className="checkmark-wrapper">
            <div className="checkmark-badge">
              <Check className="checkmark-icon" strokeWidth={3} />
            </div>

            {/* Sparkling stars decorative markers */}
            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle sparkle-2">✦</span>
            <span className="sparkle sparkle-3">✦</span>
            <span className="sparkle sparkle-4">✦</span>
          </div>

          <h2 className="success-title">
            Verification Successful!
          </h2>

          <p className="success-body">
            Welcome to NariGo. Your phone number <span className="dashboard-phone-highlight">{phone}</span> is verified.
            <br />
            You are now ready to explore nearby opportunities, learn skills, and apply for government welfare schemes.
          </p>

          <button
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
            className="success-card-btn"
          >
            Enter Portal (पोर्टल में प्रवेश करें) &rarr;
          </button>
        </motion.div>

        {/* Explore Portals Section */}
        <div className="explore-portals-section">

          {/* Section Header */}
          <div className="section-header-wrapper">
            <h3 className="section-header-title">
              Explore Portals <span className="section-title-highlight">(सेवाएँ)</span>:
            </h3>
          </div>

          {/* Service Portals Grid (2x2) */}
          <div className="portals-grid">

            {/* 1. Find Jobs */}
            <motion.button
              onClick={() => handleCardClick('Jobs')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="portals-card"
              style={{ minHeight: '180px' }}
            >
              <div className="portal-card-left">
                {/* Pink 72px Icon Container */}
                <div className="portal-icon-container portal-icon-jobs">
                  <Briefcase className="portal-card-icon" fill="currentColor" fillOpacity={0.15} />
                </div>

                {/* Details */}
                <div className="portal-card-details">
                  <h4 className="portal-card-title">
                    Find Jobs <span className="portal-title-highlight-pink">(काम खोजें)</span>
                  </h4>
                  <p className="portal-card-desc">
                    Safe & verified local jobs near your village.
                  </p>
                </div>
              </div>

              {/* Small Pink Circle Arrow */}
              <div className="portal-arrow-badge">
                <ChevronRight className="portal-arrow-icon" strokeWidth={2.5} />
              </div>
            </motion.button>

            {/* 2. Welfare Schemes */}
            <motion.button
              onClick={() => handleCardClick('Schemes')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="portals-card"
              style={{ minHeight: '180px' }}
            >
              <div className="portal-card-left">
                {/* Green 72px Icon Container */}
                <div className="portal-icon-container portal-icon-schemes">
                  <Shield className="portal-card-icon" fill="currentColor" fillOpacity={0.15} />
                </div>

                {/* Details */}
                <div className="portal-card-details">
                  <h4 className="portal-card-title">
                    Welfare Schemes <span className="portal-title-highlight-green">(सरकारी योजनाएँ)</span>
                  </h4>
                  <p className="portal-card-desc">
                    Apply for central & state women empowerment plans.
                  </p>
                </div>
              </div>

              {/* Small Pink Circle Arrow */}
              <div className="portal-arrow-badge">
                <ChevronRight className="portal-arrow-icon" strokeWidth={2.5} />
              </div>
            </motion.button>

            {/* 3. Learn Skills */}
            <motion.button
              onClick={() => handleCardClick('Skills')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="portals-card"
              style={{ minHeight: '180px' }}
            >
              <div className="portal-card-left">
                {/* Blue 72px Icon Container */}
                <div className="portal-icon-container portal-icon-skills">
                  <GraduationCap className="portal-card-icon" fill="currentColor" fillOpacity={0.15} />
                </div>

                {/* Details */}
                <div className="portal-card-details">
                  <h4 className="portal-card-title">
                    Learn Skills <span className="portal-title-highlight-blue">(कुशल सीखें)</span>
                  </h4>
                  <p className="portal-card-desc">
                    Free training programs and certifications.
                  </p>
                </div>
              </div>

              {/* Small Pink Circle Arrow */}
              <div className="portal-arrow-badge">
                <ChevronRight className="portal-arrow-icon" strokeWidth={2.5} />
              </div>
            </motion.button>

            {/* 4. Earnings */}
            <motion.button
              onClick={() => handleCardClick('Earnings')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="portals-card"
              style={{ minHeight: '180px' }}
            >
              <div className="portal-card-left">
                {/* Gold 72px Icon Container */}
                <div className="portal-icon-container portal-icon-earnings">
                  ₹
                </div>

                {/* Details */}
                <div className="portal-card-details">
                  <h4 className="portal-card-title">
                    Earnings <span className="portal-title-highlight-gold">(कमाई बचतें)</span>
                  </h4>
                  <p className="portal-card-desc">
                    Manage bank accounts, digital payments, and microloans.
                  </p>
                </div>
              </div>

              {/* Small Pink Circle Arrow */}
              <div className="portal-arrow-badge">
                <ChevronRight className="portal-arrow-icon" strokeWidth={2.5} />
              </div>
            </motion.button>

          </div>
        </div>

        {/* Bottom Banner Card (Matching bottom banner in Image) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bottom-banner-card"
        >
          <div className="bottom-banner-left">
            {/* Heart Circular Icon (Pink Container) */}
            <div className="heart-badge">
              <Heart className="heart-icon" fill="currentColor" fillOpacity={0.2} />
            </div>

            <p className="bottom-banner-text">
              Together, let's build a stronger and empowered future.
              <br />
              <span className="banner-highlight">NariGo is with you at every step!</span>
            </p>
          </div>

          {/* Styled outline vector illustration of a woman profile in bottom-right */}
          <div className="woman-silhouette">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="woman-silhouette-svg">
              {/* Artistic line representation of a woman profile face with wind-swept hair */}
              <path d="M25 80 C 28 65, 35 60, 40 50 C 45 40, 48 30, 48 20 C 50 15, 60 12, 65 18 C 70 25, 68 35, 75 42 C 80 47, 85 45, 90 52 C 88 56, 85 58, 82 62 C 78 68, 80 75, 82 82 C 75 78, 70 79, 65 83 C 58 75, 52 76, 45 80" strokeLinecap="round" />
              <path d="M52 22 C 55 24, 58 20, 62 25 M65 30 C 68 32, 70 28, 75 32" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="lang-footer">
        <p className="splash-footer-text">
          &copy; {new Date().getFullYear()} NariGo Platform. Made for India's rural women.
        </p>
      </footer>

    </div>
  );
}
