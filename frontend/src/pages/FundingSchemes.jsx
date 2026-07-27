import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Landmark, ChevronLeft, Mic, SlidersHorizontal, ShieldCheck, Banknote, Building2, X } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import './FundingSchemes.css';

const GOVT_SCHEMES = [
  {
    id: 1,
    schemeName: 'PMEGP',
    fullName: "Prime Minister's Employment Generation Programme",
    schemeType: 'Business Loan & Subsidy Support',
    organization: 'Ministry of Micro, Small & Medium Enterprises (KVIC)',
    location: 'Available Across India',
    businessType: 'Small Business',
    category: 'Business Loan',
    purpose: 'Financial assistance for eligible individuals to establish new micro-enterprises in manufacturing and service sectors.',
    benefits: 'Capital Subsidy up to 35% in rural areas. Project loan up to ₹50 Lakhs for manufacturing and ₹20 Lakhs for service sector.',
    eligibility: 'Any individual above 18 years. Minimum 8th pass for projects above ₹10 Lakh in manufacturing.',
    requiredDocs: ['Aadhaar Card', 'PAN Card (if required)', 'Bank Account Details', 'Business Plan/Project Report (if required)'],
    officialSource: 'kviconline.gov.in'
  },
  {
    id: 2,
    schemeName: 'Pradhan Mantri MUDRA Yojana',
    fullName: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    schemeType: 'Business Loan Support',
    organization: 'Ministry of Finance / Micro Units Development & Refinance Agency',
    location: 'Available Across India',
    businessType: 'Services',
    category: 'Business Loan',
    purpose: 'Collateral-free institutional credit to micro and small business units for income-generating activities (Shishu, Kishore, Tarun categories).',
    benefits: 'Loans up to ₹10 Lakhs without collateral. Affordable interest rates with flexible repayment terms.',
    eligibility: 'Non-corporate, non-farm small/micro enterprises run by individuals, SHGs, or proprietary firms.',
    requiredDocs: ['Aadhaar Card', 'PAN Card (if required)', 'Bank Account Details', 'Business Plan/Project Report (if required)'],
    officialSource: 'mudra.org.in'
  },
  {
    id: 3,
    schemeName: 'Stand-Up India',
    fullName: 'Stand-Up India Scheme for Women & SC/ST Entrepreneurs',
    schemeType: 'Women Entrepreneurship Loan',
    organization: 'Department of Financial Services (DFS), Ministry of Finance',
    location: 'Available Across India',
    businessType: 'Small Business',
    category: 'Women Entrepreneurship',
    purpose: 'Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC/ST borrower and at least one woman borrower per bank branch.',
    benefits: 'Loans up to ₹1 Crore for setting up greenfield enterprises in manufacturing, services, or trading sector.',
    eligibility: 'Women entrepreneurs above 18 years setting up greenfield (first-time) ventures.',
    requiredDocs: ['Aadhaar Card', 'PAN Card (if required)', 'Bank Account Details', 'Business Plan/Project Report (if required)'],
    officialSource: 'standupmitra.in'
  },
  {
    id: 4,
    schemeName: 'Lakhpati Didi Initiative',
    fullName: 'Lakhpati Didi Rural Women Entrepreneurship Mission',
    schemeType: 'Entrepreneurship Assistance',
    organization: 'DAY-NRLM, Ministry of Rural Development',
    location: 'Rajasthan & Rural India',
    businessType: 'Handicrafts',
    category: 'Subsidy Support',
    purpose: 'Financial credit, technical training, and market linkages to empower rural SHG women to earn a sustainable income of at least ₹1 Lakh per year.',
    benefits: 'Interest-subvention loans up to ₹5 Lakhs + Skill training + Direct market linkages through Saras Fairs and e-commerce.',
    eligibility: 'Women members of Self Help Groups (SHGs) under DAY-NRLM.',
    requiredDocs: ['Aadhaar Card', 'Bank Account Details', 'SHG Membership Certificate'],
    officialSource: 'nrlm.gov.in'
  },
  {
    id: 5,
    schemeName: 'PMFME Scheme',
    fullName: 'PM Formalisation of Micro Food Processing Enterprises',
    schemeType: 'Subsidy & Credit Support',
    organization: 'Ministry of Food Processing Industries (MoFPI)',
    location: 'Available Across India',
    businessType: 'Food Processing',
    category: 'Subsidy Support',
    purpose: 'Provides financial, technical, and business support for micro food processing units under One District One Product (ODOP).',
    benefits: 'Credit-linked capital subsidy at 35% of eligible project cost with a maximum ceiling of ₹10 Lakh per unit.',
    eligibility: 'Existing or new micro food processing enterprises, SHGs, and cooperatives.',
    requiredDocs: ['Aadhaar Card', 'PAN Card (if required)', 'Bank Account Details', 'Business Plan/Project Report (if required)'],
    officialSource: 'pmfme.mofpi.gov.in'
  },
  {
    id: 6,
    schemeName: 'Mahila Samriddhi Yojana',
    fullName: 'Mahila Samriddhi Micro-Credit Financial Assistance',
    schemeType: 'Micro Finance Support',
    organization: 'National Scheduled Castes Finance & Development Corporation',
    location: 'Rajasthan',
    businessType: 'Agriculture',
    category: 'Women Entrepreneurship',
    purpose: 'Provides low-interest micro-loans directly to women entrepreneurs from backward classes and rural communities.',
    benefits: 'Micro-loans up to ₹1,40,000 at concessional interest rate of 4% per annum.',
    eligibility: 'Women entrepreneurs with annual family income within prescribed poverty line limits.',
    requiredDocs: ['Aadhaar Card', 'Bank Account Details', 'Income Certificate'],
    officialSource: 'nsfdc.nic.in'
  }
];

export default function FundingSchemes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState({
    category: '',
    location: '',
    businessType: ''
  });

  // Draft filter state (for modal)
  const [draftFilters, setDraftFilters] = useState({
    category: '',
    location: '',
    businessType: ''
  });

  const [filteredSchemes, setFilteredSchemes] = useState(GOVT_SCHEMES);

  useEffect(() => {
    let result = GOVT_SCHEMES;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      let aliasMatch = '';
      if (q.includes('लोन') || q.includes('loan') || q.includes('पैसे')) aliasMatch = 'loan';
      if (q.includes('बिजनेस') || q.includes('business')) aliasMatch = 'business';

      result = result.filter(s => 
        s.schemeName.toLowerCase().includes(q) ||
        s.fullName.toLowerCase().includes(q) ||
        s.organization.toLowerCase().includes(q) ||
        s.schemeType.toLowerCase().includes(q) ||
        (aliasMatch && (s.schemeType.toLowerCase().includes(aliasMatch) || s.category.toLowerCase().includes(aliasMatch)))
      );
    }

    // Modal filters
    if (appliedFilters.category) {
      result = result.filter(s => s.category === appliedFilters.category);
    }
    if (appliedFilters.location) {
      result = result.filter(s => s.location.toLowerCase().includes(appliedFilters.location.toLowerCase()));
    }
    if (appliedFilters.businessType) {
      result = result.filter(s => s.businessType === appliedFilters.businessType);
    }

    setFilteredSchemes(result);
  }, [searchQuery, appliedFilters]);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice search is not supported in your browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      setSearchQuery(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    const empty = { category: '', location: '', businessType: '' };
    setDraftFilters(empty);
    setAppliedFilters(empty);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="funding-list-container">
      {/* Header */}
      <header className="funding-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="header-title-main">Funding & Entrepreneurship Support</h1>
          <p className="header-subtitle">Explore government schemes to start or grow your business</p>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <div className="search-filter-row">
        <div className="search-box">
          <Search size={18} color="#888" />
          <input 
            type="text" 
            placeholder="Search funding schemes" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className={`mic-btn ${isListening ? 'listening' : ''}`} onClick={startListening} title="Voice Search">
            <Mic size={20} color={isListening ? '#D31245' : '#888'} />
          </button>
        </div>
        <button 
          className={`filter-btn ${Object.values(appliedFilters).some(Boolean) ? 'active' : ''}`}
          onClick={() => {
            setDraftFilters(appliedFilters);
            setIsFilterModalOpen(true);
          }}
        >
          <SlidersHorizontal size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Funding Schemes Feed Feed */}
      <main className="funding-feed">
        {filteredSchemes.length === 0 ? (
          <div className="no-results">
            <p>No funding schemes found matching your criteria.</p>
            <button className="btn-reset-filters" onClick={handleClearFilters}>Clear All Filters</button>
          </div>
        ) : (
          filteredSchemes.map(scheme => (
            <div key={scheme.id} className="clean-funding-card">
              {/* Verified Badge */}
              <div className="verified-badge-pill">
                <ShieldCheck size={14} color="#059669" />
                <span>Government Verified</span>
              </div>

              {/* Scheme Name Title */}
              <h3 className="scheme-name-title">{scheme.schemeName}</h3>

              {/* Government Scheme Pill/Tag Badge Style */}
              <div className="scheme-pill-badge">
                <Building2 size={15} color="#374151" />
                <span className="scheme-pill-text">{scheme.fullName}</span>
              </div>

              {/* Category / Scheme Type */}
              <div className="card-meta-row">
                <div className="meta-pill">
                  <Banknote size={14} color="#D31245" />
                  <span>{scheme.schemeType}</span>
                </div>
                <div className="meta-pill">
                  <MapPin size={14} color="#D31245" />
                  <span>{scheme.location}</span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="card-dual-actions">
                <button 
                  className="btn-card-secondary"
                  onClick={() => navigate(`/funding/${scheme.id}`, { state: { scheme } })}
                >
                  View Details
                </button>
                <button 
                  className="btn-card-primary"
                  onClick={() => navigate('/funding-apply-guidance', { state: { scheme } })}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Filter Bottom Sheet Modal */}
      {isFilterModalOpen && (
        <div className="modal-overlay" onClick={() => setIsFilterModalOpen(false)}>
          <div className="filter-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Filter Funding Schemes</h3>
              <button className="close-btn" onClick={() => setIsFilterModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-scroll">
              {/* Scheme Category Filter */}
              <div className="filter-group">
                <label>Scheme Category</label>
                <select 
                  value={draftFilters.category}
                  onChange={e => setDraftFilters({...draftFilters, category: e.target.value})}
                >
                  <option value="">All Categories</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Subsidy Support">Subsidy Support</option>
                  <option value="Entrepreneurship Training">Entrepreneurship Training</option>
                  <option value="Women Entrepreneurship">Women Entrepreneurship</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="filter-group">
                <label>Location</label>
                <select 
                  value={draftFilters.location}
                  onChange={e => setDraftFilters({...draftFilters, location: e.target.value})}
                >
                  <option value="">All Locations</option>
                  <option value="Across India">Available Across India</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>

              {/* Business Type Filter */}
              <div className="filter-group">
                <label>Business Type</label>
                <select 
                  value={draftFilters.businessType}
                  onChange={e => setDraftFilters({...draftFilters, businessType: e.target.value})}
                >
                  <option value="">All Business Types</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Handicrafts">Handicrafts</option>
                  <option value="Small Business">Small Business</option>
                  <option value="Services">Services</option>
                </select>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button className="btn-clear-modal" onClick={handleClearFilters}>
                Clear All
              </button>
              <button className="btn-apply-modal" onClick={handleApplyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
