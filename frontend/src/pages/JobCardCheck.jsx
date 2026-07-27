import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, HelpCircle, CheckCircle, PlusCircle } from 'lucide-react';
import './JobCardCheck.css';

export default function JobCardCheck() {
  const navigate = useNavigate();

  return (
    <div className="job-card-check-container">
      <header className="scheme-header-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="scheme-header-title">VB-G RAM G Application</h1>
      </header>

      <div className="job-card-content">
        <div className="question-hero">
          <div className="icon-circle-large">
            <HelpCircle size={40} color="#D31245" />
          </div>
          <h2>Do you have a VB-G RAM G Job Card?</h2>
          <p>A Job Card is required to apply for work under this scheme.</p>
        </div>

        <div className="decision-buttons">
          <button 
            className="decision-btn yes-btn"
            onClick={() => navigate('/vbg-work-apply')}
          >
            <CheckCircle size={24} />
            <div className="btn-text">
              <strong>YES</strong>
              <span>I have a Job Card</span>
            </div>
          </button>

          <button 
            className="decision-btn no-btn"
            onClick={() => navigate('/vbg-job-card-guidance')}
          >
            <PlusCircle size={24} />
            <div className="btn-text">
              <strong>NO</strong>
              <span>I don't have a Job Card</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
