import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './AgricultureJobs.css';

export default function AgricultureJobs() {
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
    // navigate('/dashboard');
    navigate('/find-jobs');
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
      titleEn: 'Farm Worker',
      titleHi: 'खेत मजदूर',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 8000,
      salaryText: '₹8,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Perform physical labor on farms including tilling, planting, and maintaining crops.',
      descHi: 'खेतों में जुताई, रोपण और फसलों के रखरखाव सहित शारीरिक श्रम करें।'
    },
    {
      id: 2,
      titleEn: 'Seed Sowing',
      titleHi: 'बीज बोना',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 6500,
      salaryText: '₹6,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Assist in evenly distributing and sowing seeds during the planting season.',
      descHi: 'बुवाई के मौसम में बीजों को समान रूप से वितरित करने और बोने में सहायता करें।'
    },
    {
      id: 3,
      titleEn: 'Vegetable Farming',
      titleHi: 'सब्जी की खेती',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 9000,
      salaryText: '₹9,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Manage daily vegetable crop cycles from planting to plucking.',
      descHi: 'रोपण से लेकर तुड़ाई तक दैनिक सब्जी फसल चक्र का प्रबंधन करें।'
    },
    {
      id: 4,
      titleEn: 'Fruit Picking',
      titleHi: 'फल तोड़ना',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 7500,
      salaryText: '₹7,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Carefully handpick ripe fruits from orchards without damaging them.',
      descHi: 'बिना नुकसान पहुंचाए बागों से पके फलों को सावधानी से तोड़ें।'
    },
    {
      id: 5,
      titleEn: 'Nursery Plantation',
      titleHi: 'नर्सरी रोपण',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 8500,
      salaryText: '₹8,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Prepare soil beds and plant saplings in the local plant nursery.',
      descHi: 'स्थानीय पौध नर्सरी में मिट्टी की क्यारियाँ तैयार करें और पौधे लगाएँ।'
    },
    {
      id: 6,
      titleEn: 'Organic Farming',
      titleHi: 'जैविक खेती',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 10500,
      salaryText: '₹10,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Cultivate crops using natural fertilizers and pest control methods.',
      descHi: 'प्राकृतिक उर्वरकों और कीट नियंत्रण विधियों का उपयोग करके फसलों की खेती करें।'
    }
  ];

  const moreJobs = [
    {
      id: 7,
      titleEn: 'Irrigation Helper',
      titleHi: 'सिंचाई सहायक',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 7000,
      salaryText: '₹7,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Manage water supply and irrigation channels for expansive farmlands.',
      descHi: 'विस्तृत खेतों के लिए जल आपूर्ति और सिंचाई चैनलों का प्रबंधन करें।'
    },
    {
      id: 8,
      titleEn: 'Flower Farming',
      titleHi: 'फूलों की खेती',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 9500,
      salaryText: '₹9,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Grow, harvest, and package marigold and rose flowers for markets.',
      descHi: 'बाज़ारों के लिए गेंदा और गुलाब के फूल उगाएँ, काटें और पैक करें।'
    },
    {
      id: 9,
      titleEn: 'Cotton Harvesting',
      titleHi: 'कपास की कटाई',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 8500,
      salaryText: '₹8,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Manually pick cotton bolls during the harvesting season.',
      descHi: 'कटाई के मौसम में कपास के गोलों को मैन्युअल रूप से चुनें।'
    },
    {
      id: 10,
      titleEn: 'Tea Plantation Worker',
      titleHi: 'चाय बागान मजदूर',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 11000,
      salaryText: '₹11,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Carefully pluck two leaves and a bud on local tea estates.',
      descHi: 'स्थानीय चाय बागानों में सावधानी से दो पत्तियां और एक कली तोड़ें।'
    },
    {
      id: 11,
      titleEn: 'Greenhouse Assistant',
      titleHi: 'ग्रीनहाउस सहायक',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 9000,
      salaryText: '₹9,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Monitor temperature, humidity, and plant health inside greenhouses.',
      descHi: 'ग्रीनहाउस के अंदर तापमान, आर्द्रता और पौधों के स्वास्थ्य की निगरानी करें।'
    },
    {
      id: 12,
      titleEn: 'Crop Monitoring Helper',
      titleHi: 'फसल निगरानी सहायक',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 7500,
      salaryText: '₹7,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Walk the fields to check for pests, diseases, and crop growth rates.',
      descHi: 'कीटों, बीमारियों और फसल वृद्धि दर की जांच करने के लिए खेतों में घूमें।'
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
            {lang === 'hi' ? 'कृषि नौकरियाँ' : 'Agriculture Jobs'}
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
                  : 'Try adjustment of filters or search query to find matching agriculture jobs.'}
              </p>
            </div>
          )}
        </div>

        <DynamicJobList category="Agriculture" />

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
