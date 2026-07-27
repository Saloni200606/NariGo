import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Award } from 'lucide-react';
import './rsldc-pages.css';

const SkillAssessment = () => {
  const navigate = useNavigate();

  const assessments = [
    { title: 'Tailoring & Stitching', questions: 30, duration: '45 mins', level: 'Beginner' },
    { title: 'Computer Basics', questions: 25, duration: '30 mins', level: 'Beginner' },
    { title: 'Beauty & Wellness', questions: 40, duration: '60 mins', level: 'Intermediate' },
  ];

  return (
    <div className="rsldc-page-container page-padding">
      <div className="rsldc-page-header">
        <button 
          className="secondary-btn" 
          style={{ width: 'fit-content', padding: '0 20px', marginBottom: '20px', height: '44px' }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Back
        </button>
        <h1 className="text-heading">Skill Assessment</h1>
        <p className="text-body" style={{ marginTop: '12px' }}>
          Evaluate your skills to find the perfect training course and job opportunities.
        </p>
      </div>

      <div className="rsldc-grid">
        {assessments.map((test, index) => (
          <div key={index} className="rsldc-item-card glass-card glass-card-hover">
            <h3 className="rsldc-title">{test.title}</h3>
            <div className="rsldc-description" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} color="var(--color-primary)" />
                <span>{test.questions} Questions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="var(--color-primary)" />
                <span>{test.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={16} color="var(--color-primary)" />
                <span>{test.level} Level</span>
              </div>
            </div>
            <div className="rsldc-action-row">
              <button 
                className="primary-btn" 
                style={{ width: '100%' }}
                onClick={() => alert(`Starting ${test.title} assessment...`)}
              >
                Start Assessment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillAssessment;
