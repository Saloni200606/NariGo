import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, CheckCircle, FileText, Award, Info, ShieldCheck, Building2 } from 'lucide-react';
import './WelfareSchemes.css';

const schemesData = [
  {
    id: 1,
    name: 'PM Vishwakarma',
    category: 'Skill Development',
    icon: '🛠️',
    benefits: 'Training, ₹15,000 grant for toolkit, collateral-free credit support up to ₹3 lakh.',
    eligibility: 'Artisans and craftspeople working with hands and tools.',
    documents: 'Aadhaar, Ration Card, Bank Account Details.'
  },
  {
    id: 2,
    name: 'Lakhpati Didi',
    category: 'Women Empowerment',
    icon: '👩‍🌾',
    benefits: 'Skill training to help SHG women earn at least ₹1 lakh annually.',
    eligibility: 'Women belonging to Self-Help Groups (SHGs).',
    documents: 'SHG Membership Proof, Aadhaar, Bank Passbook.'
  },
  {
    id: 3,
    name: 'PMEGP',
    category: 'Business Loan',
    icon: '🏢',
    benefits: 'Margin money subsidy for setting up new micro-enterprises. Subsidies up to 35% in rural areas.',
    eligibility: 'Individuals above 18 years, VIII pass for specific projects.',
    documents: 'Aadhaar, PAN, Project Report, Education Proof.'
  },
  {
    id: 4,
    name: 'Mudra Loan (PMMY)',
    category: 'Financial',
    icon: '💰',
    benefits: 'Loans up to ₹10 lakh for non-corporate, non-farm small/micro enterprises.',
    eligibility: 'Any Indian citizen with a business plan for income generation.',
    documents: 'Aadhaar, PAN, Business Proof, Bank Statement.'
  },
  {
    id: 5,
    name: 'Sukanya Samriddhi Yojana',
    category: 'Financial',
    icon: '👧',
    benefits: 'High interest rate, tax benefits, financial security for the girl child.',
    eligibility: 'Parents/guardians of a girl child below 10 years of age.',
    documents: 'Birth Certificate of Girl Child, Guardian ID Proof.'
  },
  {
    id: 6,
    name: 'Skill India',
    category: 'Skill Development',
    icon: '🎓',
    benefits: 'Free skill training, certification, and placement assistance.',
    eligibility: 'Youth seeking employment, school dropouts.',
    documents: 'Aadhaar, Education Certificates, Passport Photo.'
  },
  {
    id: 7,
    name: 'Rajeevika',
    category: 'Women Empowerment',
    icon: '🤝',
    benefits: 'Livelihood generation, financial inclusion through SHGs in Rajasthan.',
    eligibility: 'Rural women in Rajasthan belonging to poor households.',
    documents: 'Aadhaar, Residence Proof, BPL Card (if applicable).'
  },
  {
    id: 8,
    name: 'RSLDC',
    category: 'Skill Development',
    icon: '📈',
    benefits: 'Skill development programs specific to Rajasthan state for better employability.',
    eligibility: 'Youth of Rajasthan seeking skill training.',
    documents: 'Aadhaar, Domicile Certificate, Education Proof.'
  }
];

const categories = ['All', 'Financial', 'Skill Development', 'Business Loan', 'Women Empowerment'];

const WelfareSchemes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSchemes = schemesData.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.benefits.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || scheme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="schemes-page page-padding">
      <div className="schemes-header">
        <button 
          className="secondary-btn" 
          style={{ width: 'fit-content', padding: '0 20px', marginBottom: '20px', height: '44px' }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Back
        </button>
        <h1 className="text-heading">Welfare Schemes</h1>
        <p className="text-body" style={{ marginTop: '12px' }}>
          Discover and apply for government schemes designed for your empowerment and growth.
        </p>
      </div>

      <div className="schemes-controls">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input 
            type="text" 
            className="primary-input" 
            placeholder="Search schemes, benefits..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-chip ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="schemes-grid">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="clean-opp-card" style={{margin: '0 20px 16px 20px'}}>
            <div className="verified-badge-pill">
              <ShieldCheck size={14} color="#059669" />
              <span>Government Verified</span>
            </div>

            <h3 className="opp-card-title">{scheme.name}</h3>

            <div className="scheme-pill-badge">
              <Building2 size={15} color="#374151" />
              <span className="scheme-pill-text">{scheme.category}</span>
            </div>

            <div className="card-meta-row">
              <div className="meta-pill">
                <Award size={14} color="#D31245" />
                <span>{scheme.benefits}</span>
              </div>
            </div>

            <div className="card-dual-actions">
              <button 
                className="btn-card-secondary"
                onClick={() => navigate('/scheme-details', { state: { title: scheme.name, scheme: scheme.category, description: scheme.benefits, eligibility: scheme.eligibility, benefits: scheme.benefits, requiredDocs: [scheme.documents], location: 'Rajasthan', workType: 'Welfare Support' } })}
              >
                View Details
              </button>
              <button 
                className="btn-card-primary"
                onClick={() => navigate('/apply-guidance', { state: { scheme: { officialSource: 'rajasthan.gov.in', requiredDocs: [scheme.documents] } } })}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
        {filteredSchemes.length === 0 && (
          <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            <p className="text-subheading">No schemes found</p>
            <p className="text-body">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelfareSchemes;
