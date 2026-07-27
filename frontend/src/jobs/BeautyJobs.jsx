import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './BeautyJobs.css';

export default function BeautyJobs() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('all');
    const [selectedSalary, setSelectedSalary] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [showAll, setShowAll] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState([]);

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
            titleEn: "Beautician",
            titleHi: "ब्यूटीशियन",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 12000,
            salaryText: "₹12,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Provide basic beauty services including facials, threading, and skincare.",
            descHi: "फेशियल, थ्रेडिंग और त्वचा की देखभाल जैसी ब्यूटी सेवाएँ प्रदान करें।"
        },
        {
            id: 2,
            titleEn: "Mehendi Artist",
            titleHi: "मेहंदी कलाकार",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 9000,
            salaryText: "₹9,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Apply bridal and festive mehendi designs for clients.",
            descHi: "दुल्हन और त्योहारों के लिए सुंदर मेहंदी डिज़ाइन बनाएं।"
        },
        {
            id: 3,
            titleEn: "Hair Stylist",
            titleHi: "हेयर स्टाइलिस्ट",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 15000,
            salaryText: "₹15,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Provide hair cutting, styling, and basic hair treatments.",
            descHi: "बाल काटना, स्टाइलिंग और बेसिक हेयर ट्रीटमेंट प्रदान करें।"
        },
        {
            id: 4,
            titleEn: "Bridal Makeup Artist",
            titleHi: "ब्राइडल मेकअप आर्टिस्ट",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 18000,
            salaryText: "₹18,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Create bridal makeup looks for weddings and special occasions.",
            descHi: "शादी और विशेष अवसरों के लिए ब्राइडल मेकअप करें।"
        },
        {
            id: 5,
            titleEn: "Salon Assistant",
            titleHi: "सैलून सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 8000,
            salaryText: "₹8,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Assist beauticians with customer care and salon services.",
            descHi: "ग्राहक सेवा और सैलून कार्यों में ब्यूटीशियन की सहायता करें।"
        },
        {
            id: 6,
            titleEn: "Threading Specialist",
            titleHi: "थ्रेडिंग विशेषज्ञ",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 10000,
            salaryText: "₹10,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Perform professional eyebrow and facial threading services.",
            descHi: "भौंह और चेहरे की प्रोफेशनल थ्रेडिंग सेवाएँ प्रदान करें।"
        }
    ];

    const moreJobs = [
        {
            id: 7,
            titleEn: "Facial Specialist",
            titleHi: "फेशियल विशेषज्ञ",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 14000,
            salaryText: "₹14,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Provide advanced facial treatments and skin care services.",
            descHi: "उन्नत फेशियल और त्वचा की देखभाल सेवाएँ प्रदान करें।"
        },
        {
            id: 8,
            titleEn: "Nail Artist",
            titleHi: "नेल आर्टिस्ट",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 12000,
            salaryText: "₹12,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Create nail art designs and provide manicure and pedicure services.",
            descHi: "नेल आर्ट, मैनीक्योर और पेडीक्योर सेवाएँ प्रदान करें।"
        },
        {
            id: 9,
            titleEn: "Spa Assistant",
            titleHi: "स्पा सहायक",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 11000,
            salaryText: "₹11,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Assist therapists in spa and wellness treatments.",
            descHi: "स्पा और वेलनेस सेवाओं में थेरेपिस्ट की सहायता करें।"
        },
        {
            id: 10,
            titleEn: "Skin Care Consultant",
            titleHi: "स्किन केयर सलाहकार",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 13000,
            salaryText: "₹13,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Guide customers on skincare products and treatments.",
            descHi: "ग्राहकों को स्किन केयर उत्पादों और उपचारों के बारे में सलाह दें।"
        },
        {
            id: 11,
            titleEn: "Bridal Mehendi Specialist",
            titleHi: "ब्राइडल मेहंदी विशेषज्ञ",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 17000,
            salaryText: "₹17,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Design intricate bridal mehendi patterns for weddings.",
            descHi: "शादियों के लिए आकर्षक ब्राइडल मेहंदी डिज़ाइन बनाएं।"
        },
        {
            id: 12,
            titleEn: "Beauty Trainer",
            titleHi: "ब्यूटी ट्रेनर",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 16000,
            salaryText: "₹16,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Train women in beauty, makeup, skincare, and salon techniques.",
            descHi: "महिलाओं को ब्यूटी, मेकअप, स्किन केयर और सैलून तकनीकों का प्रशिक्षण दें।"
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
                        {lang === 'hi'
                            ? 'ब्यूटी और मेहंदी की नौकरियाँ'
                            : 'Beauty & Mehendi Jobs'}
                    </h1>
                </header>

                {/* Filters Section (Glass Card) */}
                <div className="filter-section">
                    {/* Search Input */}
                    <div className="search-wrapper">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder={
                                lang === 'hi'
                                    ? 'ब्यूटी या मेहंदी की नौकरी खोजें...'
                                    : 'Search beauty or mehendi jobs...'
                            }
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
                                    : 'Try adjustment of filters or search query to find matching jobs.'}
                            </p>
                        </div>
                    )}
                </div>

                <DynamicJobList category="Beauty" />

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