import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './DairyJobs.css';

export default function DairyJobs() {
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
      titleEn: 'Dairy Helper',
      titleHi: 'डेयरी सहायक',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 8000,
      salaryText: '₹8,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Assist in daily dairy operations including feeding and basic farm upkeep.',
      descHi: 'पशुओं को चारा खिलाने और खेत के बुनियादी रखरखाव सहित दैनिक डेयरी कार्यों में सहायता करें।'
    },
    {
      id: 2,
      titleEn: 'Milk Collection',
      titleHi: 'दूध संग्रह',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 7500,
      salaryText: '₹7,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Collect milk from village households and transport it to the central dairy hub.',
      descHi: 'गांव के घरों से दूध इकट्ठा करें और उसे केंद्रीय डेयरी हब तक पहुंचाएं।'
    },
    {
      id: 3,
      titleEn: 'Cattle Care',
      titleHi: 'पशु देखभाल',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 9500,
      salaryText: '₹9,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Ensure the health and well-being of cows and buffaloes on the farm.',
      descHi: 'खेत में गायों और भैंसों के स्वास्थ्य और भलाई को सुनिश्चित करें।'
    },
    {
      id: 4,
      titleEn: 'Goat Farming',
      titleHi: 'बकरी पालन',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 8500,
      salaryText: '₹8,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Manage a small herd of goats, ensuring proper grazing and shelter.',
      descHi: 'बकरियों के एक छोटे झुंड का प्रबंधन करें, उचित चराई और आश्रय सुनिश्चित करें।'
    },
    {
      id: 5,
      titleEn: 'Poultry Farming',
      titleHi: 'मुर्गी पालन',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 10000,
      salaryText: '₹10,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Manage poultry sheds, feed the birds, and collect eggs daily.',
      descHi: 'मुर्गी फार्म का प्रबंधन करें, पक्षियों को दाना खिलाएं और प्रतिदिन अंडे एकत्र करें।'
    },
    {
      id: 6,
      titleEn: 'Fish Farming',
      titleHi: 'मछली पालन',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 11000,
      salaryText: '₹11,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Maintain local fish ponds, feed fish, and monitor water quality.',
      descHi: 'स्थानीय मछली तालाबों का रखरखाव करें, मछलियों को चारा खिलाएं और पानी की गुणवत्ता की निगरानी करें।'
    }
  ];

  const moreJobs = [
    {
      id: 7,
      titleEn: 'Animal Feed Preparation',
      titleHi: 'पशु चारा तैयार करना',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 7000,
      salaryText: '₹7,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Chop fodder and mix nutritious feed for various livestock.',
      descHi: 'विभिन्न पशुओं के लिए चारा काटें और पौष्टिक आहार तैयार करें।'
    },
    {
      id: 8,
      titleEn: 'Dairy Packaging',
      titleHi: 'डेयरी पैकेजिंग',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 9000,
      salaryText: '₹9,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Pack processed milk, ghee, and paneer safely into marked containers.',
      descHi: 'संसाधित दूध, घी और पनीर को सुरक्षित रूप से चिह्नित कंटेनरों में पैक करें।'
    },
    {
      id: 9,
      titleEn: 'Veterinary Assistant',
      titleHi: 'पशु चिकित्सा सहायक',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 12000,
      salaryText: '₹12,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Assist the village vet with checkups, vaccinations, and treating sick animals.',
      descHi: 'जांच, टीकाकरण और बीमार जानवरों के इलाज में गांव के पशु चिकित्सक की सहायता करें।'
    },
    {
      id: 10,
      titleEn: 'Milk Testing Assistant',
      titleHi: 'दूध परीक्षण सहायक',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 10500,
      salaryText: '₹10,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Test milk fat content and purity at the collection center lab.',
      descHi: 'संग्रह केंद्र की प्रयोगशाला में दूध में वसा की मात्रा और शुद्धता का परीक्षण करें।'
    },
    {
      id: 11,
      titleEn: 'Dairy Cleaning Staff',
      titleHi: 'डेयरी सफाई कर्मचारी',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 6500,
      salaryText: '₹6,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Ensure high hygiene standards by cleaning barns and milking equipment.',
      descHi: 'खलिहान और दूध दुहने के उपकरणों की सफाई करके उच्च स्वच्छता मानक सुनिश्चित करें।'
    },
    {
      id: 12,
      titleEn: 'Livestock Care Helper',
      titleHi: 'पशुधन देखभाल सहायक',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 8000,
      salaryText: '₹8,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Monitor general livestock behavior and ensure they have adequate water.',
      descHi: 'पशुधन के सामान्य व्यवहार की निगरानी करें और सुनिश्चित करें कि उनके पास पर्याप्त पानी है।'
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
            {lang === 'hi' ? 'डेयरी और पशुधन नौकरियाँ' : 'Dairy & Livestock Jobs'}
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
                  : 'Try adjustment of filters or search query to find matching dairy & livestock jobs.'}
              </p>
            </div>
          )}
        </div>

        <DynamicJobList category="Dairy" />

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
