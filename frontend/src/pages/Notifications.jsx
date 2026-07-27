import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Briefcase, GraduationCap } from 'lucide-react';
import '../rsldc/rsldc-pages.css';

const Notifications = () => {
  const navigate = useNavigate();

  const alerts = [
    { id: 1, title: 'Job Application Updated', desc: 'Your application for Tailoring Job has been viewed.', icon: Briefcase, time: '2 hours ago' },
    { id: 2, title: 'New Course Available', desc: 'A new Advanced Stitching course was added.', icon: GraduationCap, time: '1 day ago' },
    { id: 3, title: 'Scheme Alert', desc: 'Sukanya Samriddhi enrollment is closing soon.', icon: Bell, time: '3 days ago' },
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
        <h1 className="text-heading">Notifications</h1>
      </div>

      <div className="rsldc-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '600px', margin: '0 auto' }}>
        {alerts.map(alert => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className="rsldc-item-card glass-card glass-card-hover" style={{ flexDirection: 'row', alignItems: 'center' }}>
              <div className="rsldc-icon-circle" style={{ width: '48px', height: '48px', marginBottom: 0, flexShrink: 0 }}>
                <Icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="rsldc-title" style={{ fontSize: '16px' }}>{alert.title}</h3>
                <p className="text-body" style={{ fontSize: '14px', marginTop: '4px' }}>{alert.desc}</p>
                <p style={{ fontSize: '12px', color: 'var(--color-primary)', marginTop: '8px', fontWeight: 500 }}>{alert.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Notifications;
