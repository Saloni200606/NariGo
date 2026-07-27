import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Building2 } from 'lucide-react';
import './rsldc-pages.css';

const NearbyTrainingCentres = () => {
  const navigate = useNavigate();

  const centres = [
    { name: 'Jaipur Skill Centre', address: 'Malviya Nagar, Jaipur, Rajasthan', phone: '+91 98765 43210', dist: '2.5 km' },
    { name: 'Women Empowerment Institute', address: 'Tonk Road, Jaipur, Rajasthan', phone: '+91 98765 43211', dist: '5.0 km' },
    { name: 'Rural Livelihood Centre', address: 'Sanganer, Jaipur, Rajasthan', phone: '+91 98765 43212', dist: '8.2 km' },
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
        <h1 className="text-heading">Nearby Training Centres</h1>
        <p className="text-body" style={{ marginTop: '12px' }}>
          Find government approved skill training centres near your location.
        </p>
      </div>

      <div className="rsldc-grid">
        {centres.map((centre, index) => (
          <div key={index} className="rsldc-item-card glass-card glass-card-hover">
            <h3 className="rsldc-title">{centre.name}</h3>
            <div className="rsldc-description" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={18} color="var(--color-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{centre.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={18} color="var(--color-primary)" />
                <span>{centre.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={18} color="var(--color-primary)" />
                <span style={{ fontWeight: '500', color: 'var(--color-dark-rose)' }}>{centre.dist} away</span>
              </div>
            </div>
            <div className="rsldc-action-row">
              <button 
                className="secondary-btn" 
                style={{ width: '100%', height: '40px' }}
                onClick={() => alert(`Getting directions to ${centre.name}...`)}
              >
                Get Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyTrainingCentres;
