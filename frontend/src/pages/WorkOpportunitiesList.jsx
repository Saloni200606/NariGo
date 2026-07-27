import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter, ShieldCheck, ChevronLeft, Mic, Clock, Building2, X } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import './WorkOpportunitiesList.css';

const OPPORTUNITIES_DATA = [
  {
    id: 1,
    title: "VB-G RAM G Rural Livelihood Work",
    scheme: "VB-G RAM G",
    district: "Jaipur",
    location: "Gram Panchayat, Jaipur",
    workType: "Rural Infrastructure & Plantation",
    distance: "5 km away",
    participants: 120,
    requiredSkills: ["Manual Labor", "Basic Farming"],
    requiredDocs: ["Job Card", "Aadhaar Card", "Bank Account Details"],
    description: "Government-supported guaranteed wage employment for rural households focused on village infrastructure and water conservation."
  },
  {
    id: 2,
    title: "Rajeevika Women SHG Stitching & Craft Work",
    scheme: "DAY-NRLM / Rajeevika",
    district: "Jodhpur",
    location: "Block Center, Jodhpur",
    workType: "Self Help Group (SHG) Enterprise",
    distance: "8 km away",
    participants: 85,
    requiredSkills: ["Basic Tailoring", "Handicrafts"],
    requiredDocs: ["Aadhaar Card", "SHG Membership"],
    description: "Deendayal Antyodaya Yojana supported livelihood initiative for women's self-help groups in textile fabrication and local handicrafts."
  },
  {
    id: 3,
    title: "RSLDC Skill-Based Employment Assistance",
    scheme: "RSLDC Livelihood Mission",
    district: "Udaipur",
    location: "Skill Center, Udaipur",
    workType: "Skill Development & Livelihood",
    distance: "12 km away",
    participants: 95,
    requiredSkills: ["Basic Computer", "Data Entry"],
    requiredDocs: ["Aadhaar Card", "Educational Certificate"],
    description: "State skill development corporation sponsored employment placement for trained rural youth and women."
  },
  {
    id: 4,
    title: "PMEGP Rural Micro-Enterprise Assistance",
    scheme: "PMEGP Livelihood Support",
    district: "Bikaner",
    location: "DIC Center, Bikaner",
    workType: "Micro-Enterprise Development",
    distance: "15 km away",
    participants: 60,
    requiredSkills: ["Small Business Operation"],
    requiredDocs: ["Aadhaar Card", "Project Proposal"],
    description: "Ministry of MSME sponsored opportunity for setting up small village-level production units with government subsidy."
  },
  {
    id: 5,
    scheme: "PMKVY Training & Work Placement",
    title: "PMKVY Certified Tailoring & Garment Unit",
    district: "Kota",
    location: "Industrial Area, Kota",
    workType: "Garment Manufacturing",
    distance: "10 km away",
    participants: 110,
    requiredSkills: ["Tailoring", "Machine Operation"],
    requiredDocs: ["Aadhaar Card", "PMKVY Certificate"],
    description: "Government recognized garment production center offering employment to certified women tailors."
  },
  {
    id: 6,
    scheme: "DAY-NRLM Dairy & Agriculture Cooperative",
    title: "Rural Dairy Cooperative & Livestock Work",
    district: "Bhilwara",
    location: "Village Cooperative, Bhilwara",
    workType: "Dairy & Livestock",
    distance: "6 km away",
    participants: 75,
    requiredSkills: ["Dairy Farming", "Cattle Care"],
    requiredDocs: ["Aadhaar Card", "Bank Account Details"],
    description: "National Rural Livelihood Mission backed community dairy management and milk collection program for rural women."
  },
  {
    id: 7,
    scheme: "Jan Shikshan Sansthan (JSS)",
    title: "JSS Artisan & Handicrafts Production Unit",
    district: "Ajmer",
    location: "Artisan Hub, Ajmer",
    workType: "Handicrafts & Local Art",
    distance: "4 km away",
    participants: 90,
    requiredSkills: ["Block Printing", "Handicrafts"],
    requiredDocs: ["Aadhaar Card"],
    description: "Ministry of Skill Development supported artisan workshop enabling rural women to create and market authentic local handicrafts."
  }
];

export default function WorkOpportunitiesList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States
  const [appliedDistrict, setAppliedDistrict] = useState('All');
  const [appliedWorkType, setAppliedWorkType] = useState('All');
  const [appliedDistance, setAppliedDistance] = useState('Any distance');
  const [appliedSkill, setAppliedSkill] = useState('All');

  // Temporary Draft States inside Modal
  const [draftDistrict, setDraftDistrict] = useState('All');
  const [draftWorkType, setDraftWorkType] = useState('All');
  const [draftDistance, setDraftDistance] = useState('Any distance');
  const [draftSkill, setDraftSkill] = useState('All');

  const [opportunities, setOpportunities] = useState(OPPORTUNITIES_DATA);

  // Handle Filtering strictly based on applied state + search query
  useEffect(() => {
    let result = OPPORTUNITIES_DATA;

    // Search Query Filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      let aliasMatch = '';
      if (q.includes('सिलाई') || q.includes('silai') || q.includes('tailor')) aliasMatch = 'tailoring';
      if (q.includes('डेयरी') || q.includes('dairy')) aliasMatch = 'dairy';
      if (q.includes('काम') || q.includes('rozgar')) aliasMatch = 'livelihood';

      result = result.filter(opp => {
        return (
          opp.title.toLowerCase().includes(q) ||
          opp.scheme.toLowerCase().includes(q) ||
          opp.workType.toLowerCase().includes(q) ||
          opp.location.toLowerCase().includes(q) ||
          (aliasMatch && (opp.workType.toLowerCase().includes(aliasMatch) || opp.title.toLowerCase().includes(aliasMatch)))
        );
      });
    }

    // Applied Filters
    if (appliedDistrict !== 'All') {
      result = result.filter(opp => opp.district === appliedDistrict);
    }

    if (appliedWorkType !== 'All') {
      result = result.filter(opp => {
        if (appliedWorkType === 'Agriculture') return opp.workType.includes('Infrastructure') || opp.workType.includes('Plantation') || opp.workType.includes('Dairy');
        if (appliedWorkType === 'Tailoring') return opp.workType.includes('Tailoring') || opp.workType.includes('Garment') || opp.workType.includes('Enterprise');
        if (appliedWorkType === 'Handicrafts') return opp.workType.includes('Handicrafts') || opp.workType.includes('Enterprise');
        if (appliedWorkType === 'Dairy') return opp.workType.includes('Dairy');
        return opp.workType.includes(appliedWorkType);
      });
    }

    if (appliedSkill !== 'All') {
      result = result.filter(opp => 
        opp.requiredSkills.some(skill => skill.toLowerCase().includes(appliedSkill.toLowerCase()))
      );
    }

    setOpportunities(result);
  }, [searchQuery, appliedDistrict, appliedWorkType, appliedDistance, appliedSkill]);

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

  const openFilterModal = () => {
    setDraftDistrict(appliedDistrict);
    setDraftWorkType(appliedWorkType);
    setDraftDistance(appliedDistance);
    setDraftSkill(appliedSkill);
    setIsFilterOpen(true);
  };

  const applyFilters = () => {
    setAppliedDistrict(draftDistrict);
    setAppliedWorkType(draftWorkType);
    setAppliedDistance(draftDistance);
    setAppliedSkill(draftSkill);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setDraftDistrict('All');
    setDraftWorkType('All');
    setDraftDistance('Any distance');
    setDraftSkill('All');
    setAppliedDistrict('All');
    setAppliedWorkType('All');
    setAppliedDistance('Any distance');
    setAppliedSkill('All');
    setIsFilterOpen(false);
  };

  return (
    <div className={`opportunities-list-container ${isFilterOpen ? 'modal-open' : ''}`}>
      {/* Header */}
      <header className="opportunities-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="header-title-main">Government Work Opportunities</h1>
          <p className="header-subtitle">Verified livelihood opportunities near you</p>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <div className="search-filter-row">
        <div className="search-box voice-enabled">
          <Search size={18} color="#888" />
          <input 
            type="text" 
            placeholder="Search work opportunities" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={`mic-btn ${isListening ? 'listening' : ''}`} onClick={startListening} title="Voice Search">
            <Mic size={20} color={isListening ? '#D31245' : '#888'} />
          </button>
        </div>
        <button 
          className={`filter-btn ${appliedDistrict !== 'All' || appliedWorkType !== 'All' || appliedSkill !== 'All' ? 'active' : ''}`}
          onClick={openFilterModal}
        >
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Opportunities Listing Feed */}
      <main className="opportunities-feed">
        {opportunities.length === 0 ? (
          <div className="no-results">
            <p>No opportunities found matching your criteria.</p>
            <button className="btn-reset-filters" onClick={clearFilters}>Clear All Filters</button>
          </div>
        ) : (
          opportunities.map(opp => (
            <div key={opp.id} className="clean-opp-card">
              {/* Top Verified Badge */}
              <div className="verified-badge-pill">
                <ShieldCheck size={14} color="#059669" />
                <span>Government Verified</span>
              </div>

              {/* Title (Largest, Bold, Dark) */}
              <h3 className="opp-card-title">{opp.title}</h3>

              {/* Scheme Name Pill Badge */}
              <div className="scheme-pill-badge">
                <Building2 size={15} color="#374151" />
                <span className="scheme-pill-text">{opp.scheme}</span>
              </div>

              {/* Metadata Rows: Work Type & Location */}
              <div className="card-meta-row">
                <div className="meta-pill">
                  <Clock size={14} color="#D31245" />
                  <span>{opp.workType}</span>
                </div>
                <div className="meta-pill">
                  <MapPin size={14} color="#D31245" />
                  <span>{opp.location}</span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="card-dual-actions">
                <button 
                  className="btn-card-secondary"
                  onClick={() => navigate('/scheme-details', { state: opp })}
                >
                  View Details
                </button>
                <button 
                  className="btn-card-primary"
                  onClick={() => {
                    if (opp.scheme.includes('VB-G RAM G')) {
                      navigate('/vbg-job-card-check');
                    } else {
                      navigate('/work-scheme-apply', { state: { opp } });
                    }
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      <BottomNav />

      {/* Filter Bottom Sheet Modal */}
      {isFilterOpen && (
        <div className="modal-overlay" onClick={() => setIsFilterOpen(false)}>
          <div className="filter-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Filter Opportunities</h3>
              <button className="close-btn" onClick={() => setIsFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body-scroll">
              <div className="filter-group">
                <label>District</label>
                <select value={draftDistrict} onChange={e => setDraftDistrict(e.target.value)}>
                  <option value="All">All Districts</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Jodhpur">Jodhpur</option>
                  <option value="Udaipur">Udaipur</option>
                  <option value="Bikaner">Bikaner</option>
                  <option value="Kota">Kota</option>
                  <option value="Bhilwara">Bhilwara</option>
                  <option value="Ajmer">Ajmer</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Work Type / Sector</label>
                <select value={draftWorkType} onChange={e => setDraftWorkType(e.target.value)}>
                  <option value="All">All Work Types</option>
                  <option value="Agriculture">Agriculture & Plantation</option>
                  <option value="Tailoring">Stitching & Tailoring</option>
                  <option value="Handicrafts">Handicrafts & Art</option>
                  <option value="Dairy">Dairy & Livestock</option>
                  <option value="Micro-Enterprise">Micro-Enterprise</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Skill Category</label>
                <select value={draftSkill} onChange={e => setDraftSkill(e.target.value)}>
                  <option value="All">All Skills</option>
                  <option value="Labor">Manual Labor</option>
                  <option value="Tailoring">Tailoring</option>
                  <option value="Handicrafts">Handicrafts</option>
                  <option value="Computer">Basic Computer</option>
                  <option value="Dairy">Dairy Farming</option>
                </select>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button className="btn-clear-modal" onClick={clearFilters}>
                Clear All
              </button>
              <button className="btn-apply-modal" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
