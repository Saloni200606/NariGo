import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, Briefcase, GraduationCap, Shield, MapPin, ChevronRight } from 'lucide-react';
import '../rsldc/rsldc-pages.css';

const mockData = [
  // Jobs
  { id: 'j1', type: 'job', title: 'Assistant Tailor', category: 'Jobs', provider: 'Jaipur Threads', path: '/tailoring-jobs', icon: Briefcase },
  { id: 'j2', type: 'job', title: 'Data Entry Operator', category: 'Jobs', provider: 'Tech Rural', path: '/find-jobs', icon: Briefcase },
  
  // Courses
  { id: 'c1', type: 'course', title: 'Advanced Tailoring', category: 'Courses', provider: 'RSLDC', path: '/rsldc-courses', icon: GraduationCap },
  { id: 'c2', type: 'course', title: 'Beauty Parlour Basics', category: 'Courses', provider: 'Skill India', path: '/rsldc-courses', icon: GraduationCap },

  // Schemes
  { id: 's1', type: 'scheme', title: 'PM Vishwakarma', category: 'Schemes', provider: 'Govt of India', path: '/schemes', icon: Shield },
  { id: 's2', type: 'scheme', title: 'Sukanya Samriddhi', category: 'Schemes', provider: 'Govt of India', path: '/schemes', icon: Shield },

  // Centres
  { id: 't1', type: 'centre', title: 'Jaipur Skill Centre', category: 'Centres', provider: 'Rajasthan Govt', path: '/training-centres', icon: MapPin },
];

const GlobalSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const filteredResults = query.trim() === '' ? [] : mockData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchParams({ q: newQuery });
  };

  return (
    <div className="rsldc-page-container page-padding">
      <div className="rsldc-page-header" style={{ textAlign: 'left' }}>
        <button 
          className="secondary-btn" 
          style={{ width: 'fit-content', padding: '0 20px', marginBottom: '20px', height: '44px' }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Back
        </button>
        <h1 className="text-heading">Global Search</h1>
        <p className="text-body" style={{ marginTop: '8px' }}>Search across all jobs, courses, and schemes.</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-small)' }} />
          <input 
            type="text" 
            className="primary-input" 
            style={{ paddingLeft: '48px', height: '56px', fontSize: '16px' }}
            placeholder="Type your search here..." 
            value={query}
            onChange={handleSearchChange}
            autoFocus
          />
        </div>
      </div>

      <div className="rsldc-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '600px', margin: '0 auto' }}>
        {query.trim() !== '' && filteredResults.length === 0 && (
          <div className="empty-state">
            <Search className="empty-icon" size={48} />
            <h3 className="text-subheading">No results found</h3>
            <p className="text-body" style={{ marginTop: '8px' }}>We couldn't find anything matching "{query}". Try different keywords.</p>
          </div>
        )}

        {filteredResults.map(item => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className="rsldc-item-card glass-card glass-card-hover" 
              style={{ flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => navigate(item.path)}
            >
              <div className="rsldc-icon-circle" style={{ width: '48px', height: '48px', marginBottom: 0, flexShrink: 0 }}>
                <Icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="rsldc-title" style={{ fontSize: '16px' }}>{item.title}</h3>
                <p className="text-body" style={{ fontSize: '14px', marginTop: '4px' }}>{item.category} • {item.provider}</p>
              </div>
              <ChevronRight color="var(--color-primary)" />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default GlobalSearch;
