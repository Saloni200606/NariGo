import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './HandicraftsJobs.css';

export default function HandicraftsJobs() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [selectedSalary, setSelectedSalary] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Persisted language state
  const lang = useMemo(() => {
    return localStorage.getItem('nariGo_lang') || 'hi';
  }, []);

  const handleBack = () => {
    navigate('/find-jobs')
  };

  const handleApply = (id) => {

    navigate("/apply-job", {
      state: {
        jobId: id
      }
    });

  };

  const initialJobs = [
    {
      id: 1,
      titleEn: 'Hand Embroidery',
      titleHi: 'हाथ की कढ़ाई',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 9000,
      salaryText: '₹9,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Perform intricate hand embroidery on garments and textiles.',
      descHi: 'कपड़ों और वस्त्रों पर जटिल हाथ की कढ़ाई करें।'
    },
    {
      id: 2,
      titleEn: 'Bamboo Craft',
      titleHi: 'बांस शिल्प',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 11000,
      salaryText: '₹11,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Create furniture, baskets, and decorative items using bamboo.',
      descHi: 'बांस का उपयोग करके फर्नीचर, टोकरियाँ और सजावटी सामान बनाएँ।'
    },
    {
      id: 3,
      titleEn: 'Basket Making',
      titleHi: 'टोकरी बनाना',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 7000,
      salaryText: '₹7,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Weave traditional and modern baskets for daily use and decoration.',
      descHi: 'दैनिक उपयोग और सजावट के लिए पारंपरिक और आधुनिक टोकरियाँ बुनें।'
    },
    {
      id: 4,
      titleEn: 'Jute Bag Making',
      titleHi: 'जूट बैग बनाना',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 10500,
      salaryText: '₹10,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Stitch and design eco-friendly jute bags for shopping and packaging.',
      descHi: 'खरीदारी और पैकेजिंग के लिए इको-फ्रेंडली जूट बैग डिज़ाइन करें और सिलें।'
    },
    {
      id: 5,
      titleEn: 'Rope Making',
      titleHi: 'रस्सी बनाना',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 8000,
      salaryText: '₹8,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Twist and plait natural fibers into strong ropes and twines.',
      descHi: 'मजबूत रस्सियाँ और सुतली बनाने के लिए प्राकृतिक रेशों को मोड़ें और गूंथें।'
    },
    {
      id: 6,
      titleEn: 'Pottery',
      titleHi: 'मिट्टी के बर्तन बनाना',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 14000,
      salaryText: '₹14,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Shape, decorate, and fire clay to create pots, vases, and utensils.',
      descHi: 'बर्तन, फूलदान और बर्तन बनाने के लिए मिट्टी को आकार दें, सजाएँ और पकाएँ।'
    }
  ];

  const moreJobs = [
    {
      id: 7,
      titleEn: 'Terracotta Art',
      titleHi: 'टेराकोटा कला',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 12000,
      salaryText: '₹12,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Design and sculpt terracotta tiles, figures, and ornaments.',
      descHi: 'टेराकोटा टाइल्स, मूर्तियां और आभूषण डिज़ाइन करें और तराशें।'
    },
    {
      id: 8,
      titleEn: 'Handmade Toys',
      titleHi: 'हस्तनिर्मित खिलौने',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 8500,
      salaryText: '₹8,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Craft wooden and cloth toys for children using safe materials.',
      descHi: 'सुरक्षित सामग्री का उपयोग करके बच्चों के लिए लकड़ी और कपड़े के खिलौने बनाएँ।'
    },
    {
      id: 9,
      titleEn: 'Handmade Jewellery',
      titleHi: 'हस्तनिर्मित आभूषण',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 15000,
      salaryText: '₹15,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Create exquisite jewelry pieces using beads, threads, and metals.',
      descHi: 'मोतियों, धागों और धातुओं का उपयोग करके अति सुंदर आभूषण बनाएँ।'
    },
    {
      id: 10,
      titleEn: 'Wall Hanging Making',
      titleHi: 'वॉल हैंगिंग बनाना',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 6500,
      salaryText: '₹6,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Assemble decorative wall hangings using macramé, mirrors, and fabric.',
      descHi: 'मैक्रेम, दर्पण और कपड़े का उपयोग करके सजावटी वॉल हैंगिंग तैयार करें।'
    },
    {
      id: 11,
      titleEn: 'Rakhi Making',
      titleHi: 'राखी बनाना',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 9500,
      salaryText: '₹9,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Design and create colorful Rakhis for the festival season.',
      descHi: 'त्योहारी सीज़न के लिए रंगीन राखियाँ डिज़ाइन करें और बनाएँ।'
    },
    {
      id: 12,
      titleEn: 'Decorative Item Making',
      titleHi: 'सजावटी वस्तुएं बनाना',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 10000,
      salaryText: '₹10,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Craft various home decor items for local markets and exhibitions.',
      descHi: 'स्थानीय बाज़ारों और प्रदर्शनियों के लिए विभिन्न घरेलू सजावट की वस्तुएँ बनाएँ।'
    }
  ];

  // Combine initial and loaded jobs depending on state
  const allCurrentJobs = useMemo(() => {
    return showAll ? [...initialJobs, ...moreJobs] : initialJobs;
  }, [showAll]);

  // Apply filters
  const filteredJobs = useMemo(() => {
    return allCurrentJobs.filter((job) => {
      // 1. Search Query filter
      const searchLower = searchQuery.toLowerCase();
      const titleMatch =
        job.titleEn.toLowerCase().includes(searchLower) ||
        job.titleHi.includes(searchLower);
      const descMatch =
        job.descEn.toLowerCase().includes(searchLower) ||
        job.descHi.includes(searchLower);
      if (searchQuery && !titleMatch && !descMatch) return false;

      // 2. Village filter
      if (selectedVillage !== 'all' && job.villageEn.toLowerCase() !== selectedVillage) return false;

      // 3. Salary filter
      if (selectedSalary !== 'all') {
        if (selectedSalary === 'above' && job.salaryNum <= 10000) return false;
        if (selectedSalary === 'below' && job.salaryNum > 10000) return false;
      }

      // 4. Type filter
      if (selectedType !== 'all') {
        const typeKey = selectedType === 'full' ? 'full-time' : 'part-time';
        if (job.typeEn.toLowerCase() !== typeKey) return false;
      }

      return true;
    });
  }, [allCurrentJobs, searchQuery, selectedVillage, selectedSalary, selectedType]);

  return (
    <div className="jobs-container">

      {/* Decorative background orbs */}
      <div className="jobs-bg-orb-1" />
      <div className="jobs-bg-orb-2" />

      {/* Main Container */}
      <div className="jobs-main">

        {/* Header Bar */}
        <header className="jobs-header">
          <button
            onClick={handleBack}
            className="back-btn"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="back-btn-icon" />
          </button>
          <h1 className="jobs-title">
            {lang === 'hi' ? 'हस्तशिल्प की नौकरियाँ' : 'Handicrafts Jobs'}
          </h1>
        </header>

        {/* Filters Panel (Glass Card) */}
        <div className="filter-section">
          {/* Search Input */}
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder={lang === 'hi' ? 'नौकरी का नाम या विवरण खोजें...' : 'Search jobs or description...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Selector Fields Row */}
          <div className="filters-row">
            {/* Village Selector */}
            <div className="filter-group">
              <label className="filter-label">{lang === 'hi' ? 'गांव चुनें' : 'Village'}</label>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="filter-select"
              >
                <option value="all">{lang === 'hi' ? 'सभी गांव' : 'All Villages'}</option>
                <option value="rampur">{lang === 'hi' ? 'रामपुर (Rampur)' : 'Rampur'}</option>
                <option value="sanganer">{lang === 'hi' ? 'सांगानेर (Sanganer)' : 'Sanganer'}</option>
                <option value="chomu">{lang === 'hi' ? 'चोमू (Chomu)' : 'Chomu'}</option>
                <option value="bagru">{lang === 'hi' ? 'बगरू (Bagru)' : 'Bagru'}</option>
              </select>
            </div>

            {/* Salary Selector */}
            <div className="filter-group">
              <label className="filter-label">{lang === 'hi' ? 'मासिक वेतन' : 'Salary'}</label>
              <select
                value={selectedSalary}
                onChange={(e) => setSelectedSalary(e.target.value)}
                className="filter-select"
              >
                <option value="all">{lang === 'hi' ? 'सभी वेतन' : 'All Salaries'}</option>
                <option value="above">{lang === 'hi' ? '₹10,000 से अधिक' : 'Above ₹10,000'}</option>
                <option value="below">{lang === 'hi' ? '₹10,000 या कम' : '₹10,000 or below'}</option>
              </select>
            </div>

            {/* Job Type Selector */}
            <div className="filter-group">
              <label className="filter-label">{lang === 'hi' ? 'काम का प्रकार' : 'Job Type'}</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="filter-select"
              >
                <option value="all">{lang === 'hi' ? 'सभी प्रकार' : 'All Types'}</option>
                <option value="full">{lang === 'hi' ? 'पूर्णकालिक (Full-time)' : 'Full-time'}</option>
                <option value="part">{lang === 'hi' ? 'अंशकालिक (Part-time)' : 'Part-time'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List Grid */}
        <div className="jobs-grid">
          {filteredJobs.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            return (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="job-card"
              >
                <div className="job-card-top">
                  <div className="job-title-row">
                    <h3 className="job-card-title">
                      {lang === 'hi' ? job.titleHi : job.titleEn}
                    </h3>
                    <span className={`job-type-badge ${job.typeEn === 'Full-time' ? 'job-type-full' : 'job-type-part'
                      }`}>
                      {lang === 'hi' ? job.typeHi : job.typeEn}
                    </span>
                  </div>

                  <div className="job-meta-row">
                    <div className="job-meta-item">
                      <MapPin className="job-meta-icon" />
                      <span>{lang === 'hi' ? job.villageHi : job.villageEn}</span>
                    </div>
                    <div className="job-meta-item">
                      <IndianRupee className="job-meta-icon job-meta-icon-rupee" />
                      <span>{job.salaryText}</span>
                    </div>
                  </div>

                  <p className="job-description">
                    {lang === 'hi' ? job.descHi : job.descEn}
                  </p>
                </div>

                <button
                  onClick={() => handleApply(job.id)}
                  disabled={isApplied}
                  className={`apply-btn ${isApplied ? 'apply-btn-success' : ''}`}
                >
                  {isApplied
                    ? (lang === 'hi' ? 'आवेदन किया गया ✓' : 'Applied ✓')
                    : (lang === 'hi' ? 'अभी आवेदन करें' : 'Apply Now')}
                </button>
              </motion.div>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="no-results-card">
              <h3 className="no-results-title">
                {lang === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No Jobs Found'}
              </h3>
              <p className="no-results-desc">
                {lang === 'hi'
                  ? 'कृपया अधिक परिणाम प्राप्त करने के लिए अपनी फ़िल्टर सेटिंग्स बदलें।'
                  : 'Try adjustment of filters or search query to find matching handicrafts jobs.'}
              </p>
            </div>
          )}
        </div>

        <DynamicJobList category="Handicrafts" />

        {/* View More Button Container */}
        {!showAll && filteredJobs.length > 0 && (
          <div className="view-more-container">
            <button
              onClick={() => setShowAll(true)}
              className="view-more-btn"
            >
              <span>{lang === 'hi' ? 'अधिक नौकरियां देखें' : 'View More Jobs'}</span>
            </button>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="jobs-footer">
        <p className="jobs-footer-text">
          &copy; {new Date().getFullYear()} NariGo Platform. Made for India's rural women.
        </p>
      </footer>

    </div>
  );
}
