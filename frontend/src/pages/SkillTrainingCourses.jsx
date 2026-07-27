import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, ChevronLeft, Mic, SlidersHorizontal, ShieldCheck, Building2, X } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import './SkillTrainingCourses.css';

const GOVT_COURSES = [
  {
    id: 1,
    courseName: 'Tailoring & Fashion Design',
    schemeName: 'PMKVY (RSLDC / Skill India)',
    provider: 'Pradhan Mantri Kaushal Vikas Yojana',
    duration: '3 Months',
    location: 'Jaipur, Rajasthan',
    category: 'Textile & Tailoring',
    trainingMode: 'Classroom & Practical Training',
    eligibility: 'Women interested in tailoring, 8th pass minimum',
    benefits: 'Government Certification + Skill India Recognition + Self-employment Support',
    requiredDocs: ['Aadhaar Card', 'Mobile Number', 'Educational Documents (8th Marksheet)'],
    about: 'Provides comprehensive training in cutting, stitching, garment fabrication, and boutique management. Sponsored under PMKVY and RSLDC to empower women with sustainable self-employment.'
  },
  {
    id: 2,
    courseName: 'Digital Literacy & Computer Basics',
    schemeName: 'RSLDC Skill Program',
    provider: 'Rajasthan Skill & Livelihoods Development Corporation',
    duration: '1 Month',
    location: 'Jodhpur, Rajasthan',
    category: 'Digital & IT',
    trainingMode: 'Computer Lab Practical',
    eligibility: 'No prior computer experience required, 8th pass',
    benefits: 'RSLDC Certificate + Basic Internet & e-Mitra operation skills',
    requiredDocs: ['Aadhaar Card', 'Mobile Number'],
    about: 'Covers fundamental computer operations, online banking, government portals, and digital payment methods for rural women entrepreneurs.'
  },
  {
    id: 3,
    courseName: 'Handicrafts & Handicraft Products',
    schemeName: 'Jan Shikshan Sansthan (JSS)',
    provider: 'Jan Shikshan Sansthan - Ministry of Skill Development',
    duration: '45 Days',
    location: 'Udaipur, Rajasthan',
    category: 'Handicrafts',
    trainingMode: 'Hands-on Workshop',
    eligibility: 'School dropouts, neo-literates, and rural women',
    benefits: 'Market linkage support + Free raw materials during training',
    requiredDocs: ['Aadhaar Card', 'Mobile Number'],
    about: 'Hands-on training in local handicraft manufacturing, clay art, block printing, and souvenir crafting for tourist markets.'
  },
  {
    id: 4,
    courseName: 'Traditional Craftsmanship Training',
    schemeName: 'PM Vishwakarma Yojana',
    provider: 'MSME Ministry & Skill India',
    duration: '15 Days (Basic)',
    location: 'Bikaner, Rajasthan',
    category: 'Artisan & Craft',
    trainingMode: 'Workshop & Toolkit Demonstration',
    eligibility: 'Traditional female artisans and craft families',
    benefits: 'Daily Stipend of ₹500 + Modern Toolkit worth ₹15,000',
    requiredDocs: ['Aadhaar Card', 'Bank Account Details', 'Mobile Number'],
    about: 'Skill modernization for traditional artisans, providing financial aid, modern toolkits, and direct market access through government emporiums.'
  },
  {
    id: 5,
    courseName: 'General Healthcare Assistant',
    schemeName: 'DDU-GKY Program',
    provider: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
    duration: '6 Months',
    location: 'Kota, Rajasthan',
    category: 'Healthcare',
    trainingMode: 'Hospital Practical & Classroom',
    eligibility: 'Rural women youth, 10th pass minimum',
    benefits: 'Free boarding & lodging + Guaranteed placement assistance',
    requiredDocs: ['Aadhaar Card', '10th Marksheet', 'BPL Card / Income Certificate'],
    about: 'Professional training in patient care, basic nursing, emergency assistance, and hospital administration.'
  },
  {
    id: 6,
    courseName: 'Apparel & Textile Assistant',
    schemeName: 'SAMARTH Scheme',
    provider: 'Ministry of Textiles, Govt. of India',
    duration: '2 Months',
    location: 'Bhilwara, Rajasthan',
    category: 'Textile & Tailoring',
    trainingMode: 'Factory Floor Practical',
    eligibility: 'Women seeking employment in textile industry',
    benefits: 'Textile Ministry Certification + Job placement support',
    requiredDocs: ['Aadhaar Card', 'Mobile Number'],
    about: 'Specialized textile skill development aimed at integrating rural women into industrial garment manufacturing hubs.'
  }
];

export default function SkillTrainingCourses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState({
    location: '',
    category: '',
    duration: '',
    scheme: ''
  });

  // Draft filter state (for modal)
  const [draftFilters, setDraftFilters] = useState({
    location: '',
    category: '',
    duration: '',
    scheme: ''
  });

  const [filteredCourses, setFilteredCourses] = useState(GOVT_COURSES);

  useEffect(() => {
    let result = GOVT_COURSES;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      let aliasMatch = '';
      if (q.includes('सिलाई') || q.includes('silai') || q.includes('tailor')) aliasMatch = 'tailor';
      if (q.includes('कंप्यूटर') || q.includes('computer') || q.includes('digital')) aliasMatch = 'digital';

      result = result.filter(c => 
        c.courseName.toLowerCase().includes(q) ||
        c.schemeName.toLowerCase().includes(q) ||
        c.provider.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        (aliasMatch && (c.courseName.toLowerCase().includes(aliasMatch) || c.category.toLowerCase().includes(aliasMatch)))
      );
    }

    // Modal filters
    if (appliedFilters.location) {
      result = result.filter(c => c.location.toLowerCase().includes(appliedFilters.location.toLowerCase()));
    }
    if (appliedFilters.category) {
      result = result.filter(c => c.category === appliedFilters.category);
    }
    if (appliedFilters.duration) {
      result = result.filter(c => c.duration === appliedFilters.duration);
    }
    if (appliedFilters.scheme) {
      result = result.filter(c => c.schemeName.includes(appliedFilters.scheme));
    }

    setFilteredCourses(result);
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
    const empty = { location: '', category: '', duration: '', scheme: '' };
    setDraftFilters(empty);
    setAppliedFilters(empty);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="courses-list-container">
      {/* Header */}
      <header className="courses-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="header-title-main">Skill Training Courses</h1>
          <p className="header-subtitle">Learn new skills through verified government training programs</p>
        </div>
      </header>

      {/* Search & Filter Row */}
      <div className="search-filter-row">
        <div className="search-box">
          <Search size={18} color="#888" />
          <input 
            type="text" 
            placeholder="Search training courses" 
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

      {/* Course Listing Feed */}
      <main className="courses-feed">
        {filteredCourses.length === 0 ? (
          <div className="no-results">
            <p>No training courses found matching your criteria.</p>
            <button className="btn-reset-filters" onClick={handleClearFilters}>Clear All Filters</button>
          </div>
        ) : (
          filteredCourses.map(course => (
            <div key={course.id} className="clean-course-card">
              {/* Verified Badge */}
              <div className="verified-badge-pill">
                <ShieldCheck size={14} color="#059669" />
                <span>Government Verified</span>
              </div>

              {/* Course Title */}
              <h3 className="course-name-title">{course.courseName}</h3>

              {/* Scheme Pill/Tag Badge Style */}
              <div className="scheme-pill-badge">
                <Building2 size={15} color="#374151" />
                <span className="scheme-pill-text">{course.schemeName}</span>
              </div>

              {/* Meta Info: Duration & Location */}
              <div className="course-meta-row">
                <div className="meta-pill">
                  <Clock size={14} color="#D31245" />
                  <span>{course.duration}</span>
                </div>
                <div className="meta-pill">
                  <MapPin size={14} color="#D31245" />
                  <span>{course.location}</span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="card-dual-actions">
                <button 
                  className="btn-card-secondary"
                  onClick={() => navigate(`/training/${course.id}`, { state: { course } })}
                >
                  View Details
                </button>
                <button 
                  className="btn-card-primary"
                  onClick={() => navigate('/training-enrollment-form', { state: { course } })}
                >
                  Enroll Now
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
              <h3>Filter Training Courses</h3>
              <button className="close-btn" onClick={() => setIsFilterModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-scroll">
              {/* Location Filter */}
              <div className="filter-group">
                <label>Location (District)</label>
                <select 
                  value={draftFilters.location}
                  onChange={e => setDraftFilters({...draftFilters, location: e.target.value})}
                >
                  <option value="">All Locations</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Jodhpur">Jodhpur</option>
                  <option value="Udaipur">Udaipur</option>
                  <option value="Bikaner">Bikaner</option>
                  <option value="Kota">Kota</option>
                  <option value="Bhilwara">Bhilwara</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <label>Training Category</label>
                <select 
                  value={draftFilters.category}
                  onChange={e => setDraftFilters({...draftFilters, category: e.target.value})}
                >
                  <option value="">All Categories</option>
                  <option value="Textile & Tailoring">Textile & Tailoring</option>
                  <option value="Digital & IT">Digital & IT</option>
                  <option value="Handicrafts">Handicrafts</option>
                  <option value="Artisan & Craft">Artisan & Craft</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div className="filter-group">
                <label>Duration</label>
                <select 
                  value={draftFilters.duration}
                  onChange={e => setDraftFilters({...draftFilters, duration: e.target.value})}
                >
                  <option value="">All Durations</option>
                  <option value="15 Days (Basic)">15 Days</option>
                  <option value="1 Month">1 Month</option>
                  <option value="45 Days">45 Days</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                </select>
              </div>

              {/* Government Scheme Filter */}
              <div className="filter-group">
                <label>Government Scheme</label>
                <select 
                  value={draftFilters.scheme}
                  onChange={e => setDraftFilters({...draftFilters, scheme: e.target.value})}
                >
                  <option value="">All Schemes</option>
                  <option value="PMKVY">PMKVY</option>
                  <option value="RSLDC">RSLDC</option>
                  <option value="JSS">Jan Shikshan Sansthan (JSS)</option>
                  <option value="PM Vishwakarma">PM Vishwakarma</option>
                  <option value="DDU-GKY">DDU-GKY</option>
                  <option value="SAMARTH">SAMARTH Scheme</option>
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
