import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import './rsldc-pages.css';

const AllGovernmentServices = () => {
  const navigate = useNavigate();

  const services = [
    { title: 'Skill Assessment', desc: 'Check your current skill level for free.', icon: CheckCircle },
    { title: 'Government Certification', desc: 'Get official certificates for your skills.', icon: ShieldCheck },
    { title: 'Scheme Enrollment', desc: 'Enroll in various women welfare schemes.', icon: FileText },
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
        <h1 className="text-heading">All Government Services</h1>
        <p className="text-body" style={{ marginTop: '12px' }}>
          Explore official services provided by the government to support rural women.
        </p>
      </div>

      <div className="rsldc-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="rsldc-item-card glass-card glass-card-hover">
              <div className="rsldc-icon-circle">
                <Icon size={28} />
              </div>
              <h3 className="rsldc-title">{service.title}</h3>
              <p className="rsldc-description">{service.desc}</p>
              <div className="rsldc-action-row">
                <button className="secondary-btn" style={{ height: '40px', fontSize: '14px' }}>
                  Learn More
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AllGovernmentServices;
