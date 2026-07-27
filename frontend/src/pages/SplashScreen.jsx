import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';
import './SplashScreen.css';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        navigate('/language');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  return (
    <div className="splash-container">
      
      {/* Decorative Solid Pink Circles (Matching Image 1) */}
      <div className="orb-1" />
      <div className="orb-2" />
      <div className="orb-3" />
      <div className="orb-4" />

      {/* Spacer to push content to middle */}
      <div className="splash-content">
        
        {/* White Square Card holding Logo */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="logo-card"
        >
          <img 
            src={logoImg} 
            alt="NariGo Logo" 
            className="logo-img"
          />
        </motion.div>

        {/* NariGo App Name (Heading font token: text-[42px]) */}
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="splash-title"
        >
          NariGo
        </motion.h1>

        {/* Tagline (Sub heading font token: text-[22px]) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="splash-tagline"
        >
          Work. Grow. Empower.
        </motion.p>

        {/* Loader Progress Bar */}
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text (Small text token: 16px) */}
        <span className="splash-loading-text">
          STARTING YOUR JOURNEY
        </span>

      </div>

      {/* Footer Text */}
      <footer className="splash-footer">
        <p className="splash-footer-text">
          Built for the ambitious women of rural India
        </p>
      </footer>

    </div>
  );
}
