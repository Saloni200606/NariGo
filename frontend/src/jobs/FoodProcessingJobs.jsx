import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './FoodProcessingJobs.css';

export default function FoodProcessingJobs() {
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
      titleEn: 'Papad Making',
      titleHi: 'पापड़ बनाना',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 6000,
      salaryText: '₹6,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Prepare fresh dough and roll papads for daily local supply.',
      descHi: 'दैनिक स्थानीय आपूर्ति के लिए ताज़ा आटा तैयार करें और पापड़ बेलें।'
    },
    {
      id: 2,
      titleEn: 'Pickle Making',
      titleHi: 'अचार बनाना',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 8000,
      salaryText: '₹8,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Prepare, mix, and store traditional village-style mango and lemon pickles.',
      descHi: 'पारंपरिक गाँव-शैली के आम और नींबू के अचार तैयार करें, मिलाएँ और स्टोर करें।'
    },
    {
      id: 3,
      titleEn: 'Spice Grinding',
      titleHi: 'मसाले पीसना',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 7500,
      salaryText: '₹7,500 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Operate small-scale grinding machines to process whole spices into powder.',
      descHi: 'साबुत मसालों को पीसकर पाउडर बनाने के लिए छोटी मशीनें चलाएँ।'
    },
    {
      id: 4,
      titleEn: 'Spice Packing',
      titleHi: 'मसाले पैक करना',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 9000,
      salaryText: '₹9,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Weigh, seal, and correctly label packets of assorted grounded spices.',
      descHi: 'पिसे हुए मसालों के पैकेटों का वजन करें, सील करें और सही लेबल लगाएँ।'
    },
    {
      id: 5,
      titleEn: 'Bakery Helper',
      titleHi: 'बेकरी सहायक',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 11000,
      salaryText: '₹11,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Assist the head baker in mixing ingredients, baking cookies, and managing ovens.',
      descHi: 'सामग्री मिलाने, कुकीज़ बेक करने और ओवन का प्रबंधन करने में मुख्य बेकर की सहायता करें।'
    },
    {
      id: 6,
      titleEn: 'Snack Making',
      titleHi: 'नमकीन बनाना',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 10000,
      salaryText: '₹10,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Fry and prepare local snacks like namkeen, bhujia, and sev.',
      descHi: 'नमकीन, भुजिया और सेव जैसे स्थानीय स्नैक्स तलें और तैयार करें।'
    }
  ];

  const moreJobs = [
    {
      id: 7,
      titleEn: 'Sweet Making',
      titleHi: 'मिठाई बनाना',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 12000,
      salaryText: '₹12,000 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Prepare traditional sweets like laddoo, barfi, and peda for local shops.',
      descHi: 'स्थानीय दुकानों के लिए लड्डू, बर्फी और पेड़ा जैसी पारंपरिक मिठाइयाँ तैयार करें।'
    },
    {
      id: 8,
      titleEn: 'Jam Making',
      titleHi: 'जैम बनाना',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 7000,
      salaryText: '₹7,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Process fresh seasonal fruits into homemade jams and jellies.',
      descHi: 'ताजे मौसमी फलों को प्रोसेस करके घर का बना जैम और जेली बनाएँ।'
    },
    {
      id: 9,
      titleEn: 'Sauce Making',
      titleHi: 'सॉस बनाना',
      villageEn: 'Bagru',
      villageHi: 'बगरू',
      salaryNum: 8500,
      salaryText: '₹8,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Cook and bottle fresh tomato and chilli sauces for commercial sale.',
      descHi: 'व्यावसायिक बिक्री के लिए ताज़ा टमाटर और चिली सॉस पकाएँ और बोतल में भरें।'
    },
    {
      id: 10,
      titleEn: 'Flour Processing',
      titleHi: 'आटा प्रसंस्करण',
      villageEn: 'Chomu',
      villageHi: 'चोमू',
      salaryNum: 9500,
      salaryText: '₹9,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Clean, sort, and process wheat and other grains at the local flour mill.',
      descHi: 'स्थानीय आटा चक्की में गेहूं और अन्य अनाजों को साफ करें, छांटें और प्रोसेस करें।'
    },
    {
      id: 11,
      titleEn: 'Dry Fruit Packing',
      titleHi: 'सूखे मेवे पैक करना',
      villageEn: 'Sanganer',
      villageHi: 'सांगानेर',
      salaryNum: 8000,
      salaryText: '₹8,000 / month',
      typeEn: 'Part-time',
      typeHi: 'अंशकालिक',
      descEn: 'Sort premium quality dry fruits and pack them in decorative gift boxes.',
      descHi: 'प्रीमियम गुणवत्ता वाले सूखे मेवों को छांटें और उन्हें सजावटी उपहार बक्से में पैक करें।'
    },
    {
      id: 12,
      titleEn: 'Food Packaging',
      titleHi: 'भोजन पैकेजिंग',
      villageEn: 'Rampur',
      villageHi: 'रामपुर',
      salaryNum: 10500,
      salaryText: '₹10,500 / month',
      typeEn: 'Full-time',
      typeHi: 'पूर्णकालिक',
      descEn: 'Seal and label ready-to-eat food packets ensuring high hygiene standards.',
      descHi: 'उच्च स्वच्छता मानकों को सुनिश्चित करते हुए रेडी-टू-ईट फूड पैकेटों को सील करें और लेबल लगाएँ।'
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
            {lang === 'hi' ? 'खाद्य प्रसंस्करण की नौकरियाँ' : 'Food Processing Jobs'}
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
                  : 'Try adjustment of filters or search query to find matching food processing jobs.'}
              </p>
            </div>
          )}
        </div>

        <DynamicJobList category="Food Processing" />

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
