import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './TailoringJobs.css';

export default function TailoringJobs() {
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
      titleEn: 'Tailor',
      titleHi: 'दर्जी',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 12000,
      salaryText: '₹12,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Stitch clothing according to customer requirements.',
      descHi: 'ग्राहकों की आवश्यकताओं के अनुसार कपड़ों की सिलाई करें।'
    },
    {
      id: 2,
      titleEn: 'Boutique Worker',
      titleHi: 'बुटीक सहायक',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 8000,
      salaryText: '₹8,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Assist in designing and stitching boutique dresses.',
      descHi: 'बुटीक डिज़ाइनों और कपड़ों की सिलाई में मदद करें।'
    },
    {
      id: 3,
      titleEn: 'Sewing Machine Operator',
      titleHi: 'सिलाई मशीन ऑपरेटर',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 15000,
      salaryText: '₹15,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Operate industrial sewing machines for bulk garments.',
      descHi: 'थोक कपड़ों के लिए औद्योगिक सिलाई मशीनें संचालित करें।'
    },
    {
      id: 4,
      titleEn: 'Ladies Suit Stitching Specialist',
      titleHi: 'सूट सिलाई विशेषज्ञ',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 10000,
      salaryText: '₹10,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Specialize in stitching premium ladies suits and salwar kameez.',
      descHi: 'प्रीमियम महिलाओं के सूट और सलवार कमीज सिलने में विशेषज्ञता।'
    },
    {
      id: 5,
      titleEn: 'Blouse Stitching Specialist',
      titleHi: 'ब्लाउज सिलाई विशेषज्ञ',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 7000,
      salaryText: '₹7,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Expertise in modern blouse patterns, hooks, and alterations.',
      descHi: 'आधुनिक ब्लाउज पैटर्न, हुक और फिटिंग में विशेषज्ञता।'
    },
    {
      id: 6,
      titleEn: 'School Uniform Stitching',
      titleHi: 'स्कूल यूनिफॉर्म सिलाई',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 11000,
      salaryText: '₹11,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Stitch standard uniforms for local government schools in bulk.',
      descHi: 'स्थानीय सरकारी स्कूलों के लिए मानक यूनिफॉर्म की थोक सिलाई।'
    }
  ];

  const moreJobs = [
    {
      id: 7,
      titleEn: 'Embroidery Worker',
      titleHi: 'कढ़ाई कार्यकर्ता',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 9000,
      salaryText: '₹9,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Add beautiful thread, zari and bead embroidery to traditional saris.',
      descHi: 'पारंपरिक साड़ियों में सुंदर धागे, ज़री और मनके की कढ़ाई जोड़ें।'
    },
    {
      id: 8,
      titleEn: 'Crochet Worker',
      titleHi: 'क्रोशिया विशेषज्ञ',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 6000,
      salaryText: '₹6,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Make woolen clothes, design patterns, and handicrafts using crochet.',
      descHi: 'क्रोशिया का उपयोग करके ऊनी कपड़े, डिज़ाइन पैटर्न और हस्तशिल्प बनाएं।'
    },
    {
      id: 9,
      titleEn: 'Knitting Worker',
      titleHi: 'बुनाई सहायक',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 10500,
      salaryText: '₹10,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Knit high-quality warm sweaters and cardigans for winter season.',
      descHi: 'सर्दियों के मौसम के लिए उच्च गुणवत्ता वाले गर्म स्वेटर और कार्डिगन बुनें।'
    },
    {
      id: 10,
      titleEn: 'Alteration Specialist',
      titleHi: 'अल्टरेशन विशेषज्ञ',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 7500,
      salaryText: '₹7,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Repair, refit, and resize ready-made garments for customers.',
      descHi: 'ग्राहकों के लिए रेडीमेड कपड़ों की मरम्मत, रीफ़िट और आकार ठीक करें।'
    },
    {
      id: 11,
      titleEn: 'Fashion Stitching Assistant',
      titleHi: 'फ़ैशन सिलाई सहायक',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 13000,
      salaryText: '₹13,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Support the head designer with stitching, measurements, and cutting.',
      descHi: 'सिलाई, माप और कटाई में मुख्य डिज़ाइनर का सहयोग करें।'
    },
    {
      id: 12,
      titleEn: 'Garment Finishing Worker',
      titleHi: 'गारमेंट फिनिशिंग कार्यकर्ता',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 9500,
      salaryText: '₹9,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Inspect stitched garments, trim excess threads, and perform final ironing.',
      descHi: 'सिले हुए कपड़ों का निरीक्षण करें, फालतू धागे काटें और अंतिम इस्त्री करें।'
    }
  ];

  // Combine initial and loaded jobs depending on state
  const allCurrentJobs = useMemo(() => {
    return showAll ? [...initialJobs, ...moreJobs] : initialJobs;
  }, [showAll]);

  // Apply filters
  const filteredJobs = useMemo(() => {
    return allCurrentJobs.filter((job) => {
      // 1. Search Query filter (matches English or Hindi text)
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
            {lang === 'hi' ? 'सिलाई और कढ़ाई की नौकरियाँ' : 'Stitching & Tailoring Jobs'}
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
                  : 'Try adjustment of filters or search query to find matching tailoring jobs.'}
              </p>
            </div>
          )}
        </div>

        <DynamicJobList category="Tailoring" />

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
