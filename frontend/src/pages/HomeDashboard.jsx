import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, Briefcase, GraduationCap, 
  Landmark, ChevronRight, CheckCircle2 
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import './HomeDashboard.css';

export default function HomeDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('nariGo_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.fullName) {
          setUserName(parsed.fullName.split(' ')[0]);
        }
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  return (
    <div className="home-dashboard-container">
      {/* Header */}
      <header className="home-header">
        <div className="welcome-text">
          <h1>Welcome, {userName || 'User'} 🌸</h1>
          <p>Find your next big opportunity today</p>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => navigate('/notifications')}>
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="home-content">
        
        {/* Work Opportunities Card */}
        <div className="main-card opportunities" onClick={() => navigate('/opportunities')}>
          <div className="card-icon-wrapper">
            <Briefcase size={24} />
          </div>
          <div className="card-content">
            <h2>Work Opportunities</h2>
            <p>Find livelihood opportunities tailored to your skills and location.</p>
            <div className="card-features">
              <div className="feature-item">
                <CheckCircle2 size={14} color="#D31245" /> Skill-based matches
              </div>
              <div className="feature-item">
                <CheckCircle2 size={14} color="#D31245" /> Local & home-based work
              </div>
            </div>
          </div>
          <ChevronRight size={20} className="chevron-icon" />
        </div>

        {/* Skill Training Courses Card */}
        <div className="main-card skills" onClick={() => navigate('/training')}>
          <div className="card-icon-wrapper">
            <GraduationCap size={24} />
          </div>
          <div className="card-content">
            <h2>Skill Training Courses</h2>
            <p>Learn new skills and get certified through government programs.</p>
            <div className="card-features">
              <div className="feature-item">
                <CheckCircle2 size={14} color="#059669" /> Free training programs
              </div>
              <div className="feature-item">
                <CheckCircle2 size={14} color="#059669" /> Official certifications
              </div>
            </div>
          </div>
          <ChevronRight size={20} className="chevron-icon" />
        </div>

        {/* Funding & Entrepreneurship Card */}
        <div className="main-card funding" onClick={() => navigate('/funding')}>
          <div className="card-icon-wrapper">
            <Landmark size={24} />
          </div>
          <div className="card-content">
            <h2>Funding & Entrepreneurship</h2>
            <p>Access financial support and guidance to start or grow your business.</p>
            <div className="card-features">
              <div className="feature-item">
                <CheckCircle2 size={14} color="#2563EB" /> Government loan schemes
              </div>
              <div className="feature-item">
                <CheckCircle2 size={14} color="#2563EB" /> Business guidance
              </div>
            </div>
          </div>
          <ChevronRight size={20} className="chevron-icon" />
        </div>

      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
