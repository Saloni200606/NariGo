import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './GoatFarmJobs.css';

export default function GoatFarmJobs() {
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
            titleEn: "Goat Farm Worker",
            titleHi: "बकरी फार्म कार्यकर्ता",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 12000,
            salaryText: "₹12,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Feed goats, clean sheds, and assist in daily farm operations.",
            descHi: "बकरियों को चारा खिलाएं, शेड साफ करें और दैनिक फार्म कार्यों में सहायता करें।"
        },
        {
            id: 2,
            titleEn: "Goat Care Assistant",
            titleHi: "बकरी देखभाल सहायक",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 10000,
            salaryText: "₹10,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Monitor goat health and provide basic care.",
            descHi: "बकरियों के स्वास्थ्य की निगरानी करें और उनकी देखभाल करें।"
        },
        {
            id: 3,
            titleEn: "Livestock Feeding Assistant",
            titleHi: "पशु चारा सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 11000,
            salaryText: "₹11,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Prepare and distribute nutritious feed for goats.",
            descHi: "बकरियों के लिए पौष्टिक चारा तैयार करें और वितरित करें।"
        },
        {
            id: 4,
            titleEn: "Goat Shed Maintenance Worker",
            titleHi: "बकरी शेड रखरखाव कार्यकर्ता",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 9500,
            salaryText: "₹9,500 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Maintain cleanliness and hygiene of goat shelters.",
            descHi: "बकरी शेड की सफाई और स्वच्छता बनाए रखें।"
        },
        {
            id: 5,
            titleEn: "Goat Breeding Assistant",
            titleHi: "बकरी प्रजनन सहायक",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 13000,
            salaryText: "₹13,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Assist in breeding management and record keeping.",
            descHi: "बकरी प्रजनन प्रबंधन और रिकॉर्ड रखने में सहायता करें।"
        },
        {
            id: 6,
            titleEn: "Farm Record Assistant",
            titleHi: "फार्म रिकॉर्ड सहायक",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 10500,
            salaryText: "₹10,500 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Maintain livestock records and daily farm reports.",
            descHi: "पशुधन रिकॉर्ड और दैनिक फार्म रिपोर्ट तैयार करें।"
        }
    ];

    const moreJobs = [
        {
            id: 7,
            titleEn: "Goat Milk Collection Assistant",
            titleHi: "बकरी दूध संग्रह सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 12000,
            salaryText: "₹12,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Collect, filter, and store goat milk safely.",
            descHi: "बकरी का दूध एकत्र करें, छानें और सुरक्षित रखें।"
        },
        {
            id: 8,
            titleEn: "Veterinary Support Assistant",
            titleHi: "पशु चिकित्सा सहायक",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 14000,
            salaryText: "₹14,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Assist veterinarians during goat health check-ups and vaccinations.",
            descHi: "बकरियों की जांच और टीकाकरण के दौरान पशु चिकित्सकों की सहायता करें।"
        },
        {
            id: 9,
            titleEn: "Goat Feed Preparation Worker",
            titleHi: "बकरी चारा तैयारी कार्यकर्ता",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 10000,
            salaryText: "₹10,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Prepare balanced feed mixtures for goats.",
            descHi: "बकरियों के लिए संतुलित चारा तैयार करें।"
        },
        {
            id: 10,
            titleEn: "Goat Farm Supervisor",
            titleHi: "बकरी फार्म सुपरवाइज़र",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 18000,
            salaryText: "₹18,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Supervise daily farm activities and farm workers.",
            descHi: "दैनिक फार्म कार्यों और कर्मचारियों की निगरानी करें।"
        },
        {
            id: 11,
            titleEn: "Kid Goat Care Assistant",
            titleHi: "बकरी के बच्चों की देखभाल सहायक",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 11500,
            salaryText: "₹11,500 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Provide special care and nutrition to young goats.",
            descHi: "बकरी के बच्चों की विशेष देखभाल और पोषण सुनिश्चित करें।"
        },
        {
            id: 12,
            titleEn: "Goat Farm Sales Assistant",
            titleHi: "बकरी फार्म बिक्री सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 13000,
            salaryText: "₹13,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Coordinate livestock sales and communicate with buyers.",
            descHi: "बकरियों की बिक्री का समन्वय करें और खरीदारों से संपर्क बनाए रखें।"
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
                        {lang === 'hi'
                            ? 'बकरी पालन की नौकरियाँ'
                            : 'Goat Farming Jobs'}
                    </h1>
                </header>

                {/* Filters Panel (Glass Card) */}
                <div className="filter-section">
                    {/* Search Input */}
                    <div className="search-wrapper">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder={lang === 'hi'
                                ? 'बकरी पालन की नौकरी खोजें...'
                                : 'Search goat farming jobs...'}
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

                <DynamicJobList category="Goat Farming" />

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
