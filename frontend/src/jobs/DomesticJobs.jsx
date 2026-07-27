import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicJobList from '../components/DynamicJobList';
import { ArrowLeft, Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import './DomesticJobs.css';

export default function DomesticJobs() {
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
            titleEn: "House Helper",
            titleHi: "घरेलू सहायक",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 12000,
            salaryText: "₹12,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Assist with daily household cleaning, dusting, and organizing.",
            descHi: "घर की सफाई, धूल साफ करने और सामान व्यवस्थित रखने में सहायता करें।"
        },
        {
            id: 2,
            titleEn: "Cook",
            titleHi: "रसोइया",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 15000,
            salaryText: "₹15,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Prepare breakfast, lunch, and dinner for a family.",
            descHi: "परिवार के लिए नाश्ता, दोपहर और रात का भोजन तैयार करें।"
        },
        {
            id: 3,
            titleEn: "Babysitter",
            titleHi: "बच्चों की देखभाल करने वाली",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 10000,
            salaryText: "₹10,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Take care of children and help with their daily routine.",
            descHi: "बच्चों की देखभाल करें और उनकी दैनिक गतिविधियों में सहायता करें।"
        },
        {
            id: 4,
            titleEn: "Elder Care Assistant",
            titleHi: "बुजुर्ग देखभाल सहायक",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 14000,
            salaryText: "₹14,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Assist elderly people with daily activities and medication reminders.",
            descHi: "बुजुर्गों की दैनिक कार्यों और दवा की याद दिलाने में सहायता करें।"
        },
        {
            id: 5,
            titleEn: "House Cleaner",
            titleHi: "घर की सफाई कर्मचारी",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 9000,
            salaryText: "₹9,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Perform cleaning and maintenance of residential homes.",
            descHi: "घरों की सफाई और रखरखाव का कार्य करें।"
        },
        {
            id: 6,
            titleEn: "Laundry Assistant",
            titleHi: "कपड़े धोने की सहायक",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 8500,
            salaryText: "₹8,500 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Wash, dry, fold, and iron household clothes.",
            descHi: "घर के कपड़े धोना, सुखाना, तह करना और इस्त्री करना।"
        }
    ];

    const moreJobs = [
        {
            id: 7,
            titleEn: "Kitchen Helper",
            titleHi: "रसोई सहायक",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 9500,
            salaryText: "₹9,500 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Help with cooking, cutting vegetables, and cleaning utensils.",
            descHi: "खाना बनाने, सब्ज़ी काटने और बर्तन साफ करने में सहायता करें।"
        },
        {
            id: 8,
            titleEn: "Home Care Worker",
            titleHi: "होम केयर कार्यकर्ता",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 13000,
            salaryText: "₹13,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Provide household support and personal care services.",
            descHi: "घरेलू सहायता और व्यक्तिगत देखभाल सेवाएँ प्रदान करें।"
        },
        {
            id: 9,
            titleEn: "Housekeeping Staff",
            titleHi: "हाउसकीपिंग कर्मचारी",
            villageEn: "Chomu",
            villageHi: "चोमू",
            salaryNum: 11000,
            salaryText: "₹11,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Maintain cleanliness and hygiene in residential homes.",
            descHi: "घरों में साफ-सफाई और स्वच्छता बनाए रखें।"
        },
        {
            id: 10,
            titleEn: "Maid",
            titleHi: "घरेलू कामगार",
            villageEn: "Sanganer",
            villageHi: "सांगानेर",
            salaryNum: 10000,
            salaryText: "₹10,000 / month",
            typeEn: "Part-time",
            typeHi: "अंशकालिक",
            descEn: "Carry out daily household chores including cleaning and washing.",
            descHi: "दैनिक घरेलू कार्य जैसे सफाई और धुलाई करें।"
        },
        {
            id: 11,
            titleEn: "Live-in House Helper",
            titleHi: "रहने वाली घरेलू सहायक",
            villageEn: "Jaipur",
            villageHi: "जयपुर",
            salaryNum: 18000,
            salaryText: "₹18,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Provide full-time household assistance while staying with the family.",
            descHi: "परिवार के साथ रहकर पूर्णकालिक घरेलू सहायता प्रदान करें।"
        },
        {
            id: 12,
            titleEn: "Caregiver",
            titleHi: "देखभाल सहायक",
            villageEn: "Bagru",
            villageHi: "बगरू",
            salaryNum: 16000,
            salaryText: "₹16,000 / month",
            typeEn: "Full-time",
            typeHi: "पूर्णकालिक",
            descEn: "Support children, elderly, or patients with daily care needs.",
            descHi: "बच्चों, बुजुर्गों या मरीजों की दैनिक देखभाल में सहायता करें।"
        }
    ];

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

    console.log("showAll:", showAll);
    console.log("filteredJobs:", filteredJobs.length);
    console.log("allCurrentJobs:", allCurrentJobs.length);

    return (
        <div className="jobs-container">

            {/* Decorative background orbs */}
            <div className="jobs-bg-orb-1" />
            <div className="jobs-bg-orb-2" />

            {/* Main Container */}
            <div className="jobs-main">
                {/* Header Bar */}
                <header className="jobs-header">
                    <button onClick={handleBack} className="back-btn" aria-label="Back">
                        <ArrowLeft className="back-btn-icon" />
                    </button>
                    <h1 className="jobs-title">
                        {lang === 'hi' ? 'घरेलू नौकरियाँ' : 'Domestic Jobs'}
                    </h1>
                </header>

                {/* Filter Section */}
                <section className="filter-section">
                    {/* Search Bar */}
                    <div className="search-wrapper">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={lang === 'hi' ? 'नौकरी या विवरण खोजें...' : 'Search job or description...'}
                        />
                    </div>

                    {/* Filter Selectors */}
                    <div className="filters-row">
                        {/* Village Filter */}
                        <div className="filter-group">
                            <label htmlFor="village-filter" className="filter-label">
                                {lang === 'hi' ? 'स्थान' : 'LOCATION'}
                            </label>
                            <select
                                id="village-filter"
                                className="filter-select"
                                value={selectedVillage}
                                onChange={(e) => setSelectedVillage(e.target.value)}
                            >
                                <option value="all">{lang === 'hi' ? 'सभी स्थान' : 'All Locations'}</option>
                                <option value="jaipur">{lang === 'hi' ? 'जयपुर' : 'Jaipur'}</option>
                                <option value="sanganer">{lang === 'hi' ? 'सांगानेर' : 'Sanganer'}</option>
                                <option value="bagru">{lang === 'hi' ? 'बगरू' : 'Bagru'}</option>
                                <option value="chomu">{lang === 'hi' ? 'चोमू' : 'Chomu'}</option>
                            </select>
                        </div>

                        {/* Salary Filter */}
                        <div className="filter-group">
                            <label htmlFor="salary-filter" className="filter-label">
                                {lang === 'hi' ? 'वेतन सीमा' : 'SALARY RANGE'}
                            </label>
                            <select
                                id="salary-filter"
                                className="filter-select"
                                value={selectedSalary}
                                onChange={(e) => setSelectedSalary(e.target.value)}
                            >
                                <option value="all">{lang === 'hi' ? 'सभी वेतन' : 'All Salary'}</option>
                                <option value="above">{lang === 'hi' ? '₹10,000 से अधिक' : 'Above ₹10,000'}</option>
                                <option value="below">{lang === 'hi' ? '₹10,000 से कम' : 'Below ₹10,000'}</option>
                            </select>
                        </div>

                        {/* Job Type Filter */}
                        <div className="filter-group">
                            <label htmlFor="type-filter" className="filter-label">
                                {lang === 'hi' ? 'नौकरी का प्रकार' : 'JOB TYPE'}
                            </label>
                            <select
                                id="type-filter"
                                className="filter-select"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="all">{lang === 'hi' ? 'सभी प्रकार' : 'All Types'}</option>
                                <option value="full">{lang === 'hi' ? 'पूर्णकालिक' : 'Full-time'}</option>
                                <option value="part">{lang === 'hi' ? 'अंशकालिक' : 'Part-time'}</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Jobs Grid */}
                <section className="jobs-grid">
                    {filteredJobs.length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-text">
                                {lang === 'hi'
                                    ? 'कोई नौकरी नहीं मिली जो आपकी खोज से मेल खाती हो।'
                                    : 'No jobs found matching your search.'}
                            </p>
                        </div>
                    ) : (
                        filteredJobs.map((job) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <article className="job-card">
                                    <div className="job-card-top">
                                        <div className="job-title-row">
                                            <h2 className="job-card-title">
                                                {lang === 'hi' ? job.titleHi : job.titleEn}
                                            </h2>
                                            <span
                                                className={`job-type-badge ${job.typeEn === 'Full-time'
                                                    ? 'job-type-full'
                                                    : 'job-type-part'
                                                    }`}
                                            >
                                                {lang === 'hi' ? job.typeHi : job.typeEn}
                                            </span>
                                        </div>

                                        {/* Meta row: location, salary, experience */}
                                        <div className="job-meta-row">
                                            {/* Location */}
                                            <div className="job-meta-item">
                                                <MapPin className="job-meta-icon" />
                                                <span>
                                                    {lang === 'hi' ? job.villageHi : job.villageEn}
                                                </span>
                                            </div>

                                            {/* Salary */}
                                            <div className="job-meta-item">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <IndianRupee className="job-meta-icon job-meta-icon-rupee" />
                                                    <span>{job.salaryText}</span>
                                                </div>
                                            </div>

                                            {/* Experience (default for domestic) */}
                                            <div className="job-meta-item">
                                                <Briefcase className="job-meta-icon" />
                                                <span>
                                                    {lang === 'hi' ? 'शुरुआती स्तर' : 'Entry Level'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="job-description">
                                            {lang === 'hi' ? job.descHi : job.descEn}
                                        </p>
                                    </div>

                                    {/* Apply Button */}
                                    <button
                                        className={`apply-btn ${appliedJobs.includes(job.id) ? 'applied' : ''}`}
                                        onClick={() => handleApply(job.id)}
                                        disabled={appliedJobs.includes(job.id)}
                                    >
                                        {appliedJobs.includes(job.id)
                                            ? (lang === 'hi' ? 'लागू किया गया' : 'Applied')
                                            : (lang === 'hi' ? 'अभी आवेदन करें' : 'Apply Now')}
                                    </button>
                                </article>
                            </motion.div>
                        ))
                    )}
                </section>

                {/* Load More */}
                {!showAll && filteredJobs.length >= initialJobs.length && (
                    <div className="load-more-container">
                        <button
                            className="load-more-btn"
                            onClick={() => setShowAll(true)}
                        >
                            {lang === 'hi' ? 'और नौकरियाँ देखें' : 'View More Jobs'}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}