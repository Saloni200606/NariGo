import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Building, ChevronRight } from 'lucide-react';
import './rsldc-pages.css';

const PlacementAssistance = () => {
  const navigate = useNavigate();

  const jobs = [
    { title: 'Assistant Tailor', company: 'Jaipur Threads Pvt Ltd', salary: '₹12,000 - ₹15,000 / month', location: 'Jaipur' },
    { title: 'Data Entry Operator', company: 'TechSolutions Rural', salary: '₹10,000 / month', location: 'Tonk' },
    { title: 'Handicraft Artisan', company: 'Rajasthan Crafts', salary: 'Piece Rate Basis', location: 'Sanganer' },
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
        <h1 className="text-heading">Placement Assistance</h1>
        <p className="text-body" style={{ marginTop: '12px' }}>
          Find job opportunities matching your certified skills.
        </p>
      </div>

      <div className="rsldc-grid">
        {jobs.map((job, index) => (
          <div key={index} className="rsldc-item-card glass-card glass-card-hover">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div className="rsldc-icon-circle" style={{ width: '48px', height: '48px', marginBottom: '0' }}>
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="rsldc-title" style={{ fontSize: '18px' }}>{job.title}</h3>
                <span style={{ fontSize: '14px', color: 'var(--color-primary)' }}>{job.company}</span>
              </div>
            </div>
            <div className="rsldc-description" style={{ marginTop: '8px' }}>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Location:</strong> {job.location}</p>
            </div>
            <div className="rsldc-action-row">
              <button 
                className="secondary-btn" 
                style={{ width: '100%', height: '40px' }}
                onClick={() => alert(`Applying for ${job.title}...`)}
              >
                Apply Now <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementAssistance;
