import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './MushroomJobs.css';

export default function MushroomJobs() {
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
            titleEn: "Mushroom Farm Worker",
            titleHi: "मशरूम फार्म कार्यकर्ता",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 12000,
            salaryText: "₹12,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Assist in mushroom cultivation, watering, and harvesting.",
            descHi: "मशरूम की खेती, सिंचाई और कटाई में सहायता करें।"
        },
        {
            id: 2,
            titleEn: "Compost Preparation Assistant",
            titleHi: "कम्पोस्ट तैयारी सहायक",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 9500,
            salaryText: "₹9,500 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Prepare organic compost for mushroom cultivation.",
            descHi: "मशरूम उत्पादन के लिए जैविक कम्पोस्ट तैयार करें।"
        },
        {
            id: 3,
            titleEn: "Spawn Production Helper",
            titleHi: "स्पॉन उत्पादन सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 13000,
            salaryText: "₹13,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Assist in mushroom spawn preparation and quality checking.",
            descHi: "मशरूम स्पॉन तैयार करने और गुणवत्ता जांच में सहायता करें।"
        },
        {
            id: 4,
            titleEn: "Harvesting Assistant",
            titleHi: "कटाई सहायक",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 11000,
            salaryText: "₹11,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Harvest fresh mushrooms and prepare them for packing.",
            descHi: "ताज़े मशरूम की कटाई करें और पैकिंग के लिए तैयार करें।"
        },
        {
            id: 5,
            titleEn: "Mushroom Packing Worker",
            titleHi: "मशरूम पैकिंग कार्यकर्ता",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 10000,
            salaryText: "₹10,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Sort, pack, and label mushrooms for market distribution.",
            descHi: "मशरूम को छांटें, पैक करें और बाज़ार के लिए लेबल लगाएँ।"
        },
        {
            id: 6,
            titleEn: "Quality Inspection Assistant",
            titleHi: "गुणवत्ता निरीक्षण सहायक",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 12500,
            salaryText: "₹12,500 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Inspect mushroom quality before packaging and sale.",
            descHi: "पैकिंग और बिक्री से पहले मशरूम की गुणवत्ता की जांच करें।"
        }
    ];

    const moreJobs = [
        {
            id: 7,
            titleEn: "Mushroom Nursery Assistant",
            titleHi: "मशरूम नर्सरी सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 11500,
            salaryText: "₹11,500 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Maintain mushroom growing rooms and nursery conditions.",
            descHi: "मशरूम उगाने वाले कमरों और नर्सरी की देखभाल करें।"
        },
        {
            id: 8,
            titleEn: "Mushroom Processing Worker",
            titleHi: "मशरूम प्रसंस्करण कार्यकर्ता",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 14000,
            salaryText: "₹14,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Clean, slice, dry, and process mushrooms for sale.",
            descHi: "मशरूम को साफ करें, काटें, सुखाएँ और बिक्री के लिए तैयार करें।"
        },
        {
            id: 9,
            titleEn: "Organic Farming Assistant",
            titleHi: "जैविक खेती सहायक",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 10500,
            salaryText: "₹10,500 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Support organic mushroom cultivation practices.",
            descHi: "जैविक मशरूम खेती में सहायता करें।"
        },
        {
            id: 10,
            titleEn: "Cold Storage Assistant",
            titleHi: "कोल्ड स्टोरेज सहायक",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 12000,
            salaryText: "₹12,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Store harvested mushrooms under proper temperature conditions.",
            descHi: "कटे हुए मशरूम को उचित तापमान पर सुरक्षित रखें।"
        },
        {
            id: 11,
            titleEn: "Farm Supervisor",
            titleHi: "फार्म सुपरवाइज़र",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 18000,
            salaryText: "₹18,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Supervise daily mushroom farm operations and workers.",
            descHi: "दैनिक मशरूम फार्म संचालन और कर्मचारियों की निगरानी करें।"
        },
        {
            id: 12,
            titleEn: "Mushroom Sales Assistant",
            titleHi: "मशरूम बिक्री सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 13000,
            salaryText: "₹13,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Coordinate with buyers and manage mushroom sales.",
            descHi: "खरीदारों से समन्वय करें और मशरूम की बिक्री का प्रबंधन करें।"
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
                            ? 'मशरूम खेती की नौकरियाँ'
                            : 'Mushroom Farming Jobs'}
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
                                ? 'मशरूम खेती की नौकरी खोजें...'
                                : 'Search mushroom farming jobs...'}
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

                <DynamicJobList category="Mushroom" />

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
