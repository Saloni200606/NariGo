import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import './LanguageSelection.css';

export default function LanguageSelection() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('hi');

  const languages = [
    {
      id: 'hi',
      name: 'हिन्दी',
      nativeName: 'Hindi',
      badgeText: 'IN',
    },
    {
      id: 'en',
      name: 'English',
      nativeName: 'UK English',
      badgeText: 'GB',
    }
  ];

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="lang-container">
      <div className="lang-content">
        
        {/* Logo at the top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lang-logo-container"
        >
          <img src={logo} alt="NariGo Logo" className="lang-logo" />
        </motion.div>

        {/* Heading */}
        <h2 className="lang-heading">
          Choose Your Language
        </h2>

        {/* Subtitle */}
        <p className="lang-subtitle">
          Select your preferred language to continue.
        </p>

        {/* Languages grid: Vertical list of cards */}
        <div className="lang-list">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`lang-card ${
                  isSelected ? 'active' : 'lang-card-inactive'
                }`}
              >
                {/* Badge on left */}
                <div className="lang-badge">
                  {lang.badgeText}
                </div>
                
                {/* Language Name (Column layout) */}
                <div className="lang-name-container">
                  <span className="lang-name-main">
                    {lang.name}
                  </span>
                  <span className="lang-name-native">
                    {lang.nativeName}
                  </span>
                </div>

                {/* Check icon on the right if selected */}
                <div className="lang-check-icon">
                  {isSelected && (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="check-svg">
                      <circle cx="12" cy="12" r="10" fill="#ec407a" />
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#fff"/>
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Primary button */}
        <button
          onClick={handleContinue}
          className="lang-btn"
        >
          <span>Continue</span>
        </button>

        {/* Footer Text */}
        <footer className="lang-footer">
          <p className="lang-footer-text">
            You can change the language anytime from Settings.
          </p>
        </footer>

      </div>
    </div>
  );
}
