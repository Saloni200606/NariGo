import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, GraduationCap, Briefcase, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import './Support.css';

export default function HelpSupport() {
  const navigate = useNavigate();

  return (
    <div className="support-container">
      <header className="support-header">
        <h1>Support & Guidance</h1>
        <p>Explore government schemes and training programs</p>
      </header>

      <div className="support-content">
        
        {/* Category 1: Government Schemes for Work */}
        <div className="support-category">
          <div className="category-header">
            <div className="category-icon" style={{ background: '#FFE4E6', color: '#D31245' }}>
              <Briefcase size={22} />
            </div>
            <h2>Government Schemes for Work</h2>
          </div>
          <div className="scheme-list">
            <div className="scheme-card" onClick={() => navigate('/schemes')}>
              <div className="scheme-info">
                <h3>VB-G RAM G</h3>
                <p>Village Business Guidance & Rural Assistance</p>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
            <div className="scheme-card" onClick={() => navigate('/schemes')}>
              <div className="scheme-info">
                <h3>DAY-NRLM / Rajeevika</h3>
                <p>National Rural Livelihood Mission</p>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
          </div>
        </div>

        {/* Category 2: Skill Training Courses */}
        <div className="support-category">
          <div className="category-header">
            <div className="category-icon" style={{ background: '#DCFCE7', color: '#059669' }}>
              <GraduationCap size={22} />
            </div>
            <h2>Skill Training Courses</h2>
          </div>
          <div className="scheme-list">
            <div className="scheme-card" onClick={() => navigate('/rsldc-courses')}>
              <div className="scheme-info">
                <h3>PMKVY</h3>
                <p>Pradhan Mantri Kaushal Vikas Yojana</p>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
            <div className="scheme-card" onClick={() => navigate('/rsldc-courses')}>
              <div className="scheme-info">
                <h3>RSLDC</h3>
                <p>Rajasthan Skill & Livelihoods Development Corporation</p>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
            <div className="scheme-card" onClick={() => navigate('/rsldc-courses')}>
              <div className="scheme-info">
                <h3>Skill India Programs</h3>
                <p>National Skill Development Corporation</p>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
          </div>
        </div>

        {/* Category 3: Funding for Entrepreneurship */}
        <div className="support-category">
          <div className="category-header">
            <div className="category-icon" style={{ background: '#DBEAFE', color: '#2563EB' }}>
              <Landmark size={22} />
            </div>
            <h2>Funding for Entrepreneurship</h2>
          </div>
          <div className="scheme-list">
            <div className="scheme-card" onClick={() => navigate('/schemes')}>
              <div className="scheme-info">
                <h3>PMEGP</h3>
                <p>Prime Minister's Employment Generation Programme</p>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
            <div className="scheme-card" onClick={() => navigate('/schemes')}>
              <div className="scheme-info">
                <h3>MUDRA</h3>
                <p>Micro Units Development and Refinance Agency Bank</p>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
            <div className="scheme-card" onClick={() => navigate('/schemes')}>
              <div className="scheme-info">
                <h3>Entrepreneurship Support</h3>
                <p>State specific funding and support schemes</p>
              </div>
              <ChevronRight size={18} className="chevron-icon" />
            </div>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
