import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './AnganwadiJobs.css';

export default function AnganwadiJobs() {
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
            titleEn: "Anganwadi Helper",
            titleHi: "आंगनवाड़ी सहायिका",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 9000,
            salaryText: "₹9,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Assist the Anganwadi Worker in preparing meals and maintaining the center.",
            descHi: "आंगनवाड़ी कार्यकर्ता की भोजन तैयार करने और केंद्र के रखरखाव में सहायता करें।"
        },
        {
            id: 2,
            titleEn: "Anganwadi Worker",
            titleHi: "आंगनवाड़ी कार्यकर्ता",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 12000,
            salaryText: "₹12,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Manage daily activities, maintain records, and provide nutrition services.",
            descHi: "दैनिक गतिविधियों का संचालन करें, रिकॉर्ड बनाए रखें और पोषण सेवाएँ प्रदान करें।"
        },
        {
            id: 3,
            titleEn: "Child Care Assistant",
            titleHi: "बाल देखभाल सहायक",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 10000,
            salaryText: "₹10,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Support preschool children with learning and daily care activities.",
            descHi: "प्री-स्कूल बच्चों की शिक्षा और दैनिक देखभाल में सहायता करें।"
        },
        {
            id: 4,
            titleEn: "Nutrition Assistant",
            titleHi: "पोषण सहायक",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 11000,
            salaryText: "₹11,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Monitor child nutrition and distribute supplementary food.",
            descHi: "बच्चों के पोषण की निगरानी करें और पूरक आहार वितरित करें।"
        },
        {
            id: 5,
            titleEn: "Health Awareness Volunteer",
            titleHi: "स्वास्थ्य जागरूकता स्वयंसेवक",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 8500,
            salaryText: "₹8,500 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Conduct awareness sessions on maternal and child health.",
            descHi: "मातृ एवं शिशु स्वास्थ्य पर जागरूकता सत्र आयोजित करें।"
        },
        {
            id: 6,
            titleEn: "Preschool Activity Assistant",
            titleHi: "प्री-स्कूल गतिविधि सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 9500,
            salaryText: "₹9,500 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Help organize educational games and activities for children.",
            descHi: "बच्चों के लिए शैक्षणिक खेल और गतिविधियाँ आयोजित करने में सहायता करें।"
        }
    ];

    const moreJobs = [
        {
            id: 7,
            titleEn: "Community Nutrition Worker",
            titleHi: "सामुदायिक पोषण कार्यकर्ता",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 11000,
            salaryText: "₹11,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Provide nutrition counseling to mothers and children.",
            descHi: "माताओं और बच्चों को पोषण संबंधी परामर्श प्रदान करें।"
        },
        {
            id: 8,
            titleEn: "Immunization Support Assistant",
            titleHi: "टीकाकरण सहायता सहायक",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 10000,
            salaryText: "₹10,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Assist health staff during immunization drives.",
            descHi: "टीकाकरण अभियान के दौरान स्वास्थ्य कर्मचारियों की सहायता करें।"
        },
        {
            id: 9,
            titleEn: "Women's Welfare Coordinator",
            titleHi: "महिला कल्याण समन्वयक",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 13000,
            salaryText: "₹13,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Coordinate women welfare programs and awareness activities.",
            descHi: "महिला कल्याण कार्यक्रमों और जागरूकता गतिविधियों का समन्वय करें।"
        },
        {
            id: 10,
            titleEn: "Growth Monitoring Assistant",
            titleHi: "विकास निगरानी सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 9500,
            salaryText: "₹9,500 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Record children's height, weight, and growth progress.",
            descHi: "बच्चों की लंबाई, वजन और विकास की प्रगति दर्ज करें।"
        },
        {
            id: 11,
            titleEn: "Family Health Educator",
            titleHi: "पारिवारिक स्वास्थ्य शिक्षिका",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 12500,
            salaryText: "₹12,500 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Educate families about hygiene, nutrition, and child care.",
            descHi: "परिवारों को स्वच्छता, पोषण और बाल देखभाल के बारे में शिक्षित करें।"
        },
        {
            id: 12,
            titleEn: "Early Childhood Education Assistant",
            titleHi: "प्रारंभिक बाल शिक्षा सहायक",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 11500,
            salaryText: "₹11,500 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Support learning activities for children aged 3–6 years.",
            descHi: "3–6 वर्ष के बच्चों की सीखने की गतिविधियों में सहायता करें।"
        }
    ];

    const allCurrentJobs = useMemo(() => {
        return showAll ? [...initialJobs, ...moreJobs] : initialJobs;
    }, [showAll]);

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
                            ? 'आंगनवाड़ी नौकरियाँ'
                            : 'Anganwadi Jobs'}
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
                                    ? 'आंगनवाड़ी नौकरी खोजें...'
                                    : 'Search Anganwadi jobs...'
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

                <DynamicJobList category="Anganwadi" />

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
