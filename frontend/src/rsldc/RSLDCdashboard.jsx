import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Bell,
    Globe,
    Search,
    Mic,
    GraduationCap,
    MapPin,
    Award,
    Briefcase,
    ChevronRight,
    Building2,
    BookOpen,
    Users,
    Sparkles,
    Megaphone,
    ArrowRight,
    ListChecks,
} from "lucide-react";

import logoImg from "../assets/logo.png";
import apparelImg from "./Apparel and textile.jpg";
import beautyImg from "./beauty and wellness.jpeg";
import handicraftImg from "./handicraft.jpg";
import foodImg from "./food.webp";
import agricultureImg from "./agriculture.jpg";
import animalImg from "./animal.jpg";
import homeImg from "./home enterprise.webp";

import "./RSLDCDashboard.css";

export default function RSLDCDashboard() {
    const navigate = useNavigate();

    const [lang, setLang] = useState(
        localStorage.getItem("nariGo_lang") || "hi"
    );

    const [search, setSearch] = useState("");

    const userName = React.useMemo(() => {
        const stored = localStorage.getItem("nariGo_user");

        if (stored) {
            try {
                return JSON.parse(stored).fullName;
            } catch {
                return "";
            }
        }

        return "";
    }, []);

    const handleLanguageToggle = () => {
        const next = lang === "hi" ? "en" : "hi";
        localStorage.setItem("nariGo_lang", next);
        setLang(next);
    };

    const quickServices = [
        {
            titleEn: "Skill Assessment",
            titleHi: "कौशल मूल्यांकन",
            descEn: "Check your skills",
            descHi: "अपनी योग्यता जानें",
            icon: GraduationCap,
            color: "#EEF4FF",
            iconColor: "#2563EB",
            path: "/skill-assessment",
        },
        {
            titleEn: "Training Courses",
            titleHi: "प्रशिक्षण पाठ्यक्रम",
            descEn: "Explore skill training courses",
            descHi: "कौशल प्रशिक्षण पाठ्यक्रम देखें",
            icon: BookOpen,
            color: "#FFF3F7",
            iconColor: "#F43F75",
            path: "/rsldc-courses",
        },
        {
            titleEn: "Training Centres",
            titleHi: "प्रशिक्षण केन्द्र",
            descEn: "Nearby centres",
            descHi: "नजदीकी केन्द्र",
            icon: MapPin,
            color: "#F0FDF4",
            iconColor: "#16A34A",
            path: "/training-centres",
        },
        {
            titleEn: "Certificates",
            titleHi: "प्रमाण पत्र",
            descEn: "Verified certificates",
            descHi: "सत्यापित प्रमाण पत्र",
            icon: Award,
            color: "#FFF8E8",
            iconColor: "#F59E0B",
            path: "/certificates",
        },
        {
            titleEn: "Placement",
            titleHi: "रोजगार सहायता",
            descEn: "Jobs after training",
            descHi: "प्रशिक्षण के बाद नौकरी",
            icon: Briefcase,
            color: "#F3F4F6",
            iconColor: "#374151",
            path: "/placements",
        },
        {
            titleEn: "Support",
            titleHi: "सहायता",
            descEn: "Government help",
            descHi: "सरकारी सहायता",
            icon: Building2,
            color: "#EEFDF8",
            iconColor: "#059669",
            path: "/support",
        },
        {
            titleEn: "My Enrollments",
            titleHi: "मेरे नामांकन",
            descEn: "View enrolled courses",
            descHi: "नामांकित कोर्स देखें",
            icon: ListChecks,
            color: "#F5F3FF",
            iconColor: "#8B5CF6",
            path: "/my-enrollments",
        }
    ];

    const courses = [

        {
            title: "Apparel & Textile",
            image: apparelImg,
            totalCourses: 12,
            path: "/courses/apparel"
        },

        {
            title: "Beauty & Wellness",
            image: beautyImg,
            totalCourses: 18,
            path: "/courses/beauty"
        },

        {
            title: "Handicrafts",
            image: handicraftImg,
            totalCourses: 20,
            path: "/courses/handicrafts"
        },

        {
            title: "Food Processing",
            image: foodImg,
            totalCourses: 15,
            path: "/courses/food"
        },

        {
            title: "Agriculture",
            image: agricultureImg,
            totalCourses: 16,
            path: "/courses/agriculture"
        },

        {
            title: "Animal Husbandry",
            image: animalImg,
            totalCourses: 14,
            path: "/courses/animal"
        },


        {
            title: "Home Enterprises",
            image: homeImg,
            totalCourses: 11,
            path: "/courses/home-enterprises"
        }

    ];

    return (
        <div className="rsldc-container">

            <div className="home-bg-orb-1" />
            <div className="home-bg-orb-2" />


            <div className="rsldc-main">

                {/* HEADER */}

                <header className="home-header">

                    <div className="header-brand">

                        <img
                            src={logoImg}
                            alt="NariGo"
                            className="home-logo"
                        />

                        <h1 className="header-title">
                            NariGo
                        </h1>

                    </div>


                    <div className="header-actions">

                        ...

                    </div>

                </header>
                {/* GREETING */}

                <div className="greeting-section">

                    <h1 className="greeting-title">

                        {lang === "hi"

                            ? `🎓 स्वागत है ${userName}`

                            : `🎓 Welcome ${userName}`}

                    </h1>

                    <p className="greeting-desc">

                        {lang === "hi"

                            ? "नारीगो के माध्यम से कौशल प्रशिक्षण प्राप्त करें, प्रमाणित कोर्स सीखें और रोजगार के नए अवसर खोजें।"

                            : "Explore certified skill training, learn new skills, and discover employment opportunities through NariGo."}

                    </p>

                </div>

                {/* SEARCH */}

                <div className="search-container">

                    <div className="search-wrapper">

                        <div className="search-inner">

                            <Search className="search-icon" />

                            <input

                                className="inner-input"

                                value={search}

                                onChange={(e) => setSearch(e.target.value)}

                                placeholder={
                                    lang === "hi"

                                        ? "कोर्स खोजें..."

                                        : "Search Courses..."
                                }

                            />

                        </div>

                        <button className="voice-btn">

                            <Mic className="voice-icon" />

                        </button>

                    </div>

                </div>

                {/* HERO */}

                <motion.div

                    className="hero-banner-card"

                    initial={{ opacity: 0, y: 20 }}

                    animate={{ opacity: 1, y: 0 }}

                >

                    <div className="hero-content">

                        <div className="hero-badge-row">

                            <Sparkles className="hero-sparkle-icon" />

                            <span className="hero-badge-text">

                                GOVERNMENT OF RAJASTHAN

                            </span>

                        </div>

                        <h2 className="hero-title">

                            NariGo Skill Empowerment Hub
                        </h2>

                        <p className="hero-tagline">

                            {lang === "hi"

                                ? "महिलाओं के लिए निःशुल्क कौशल प्रशिक्षण, प्रमाणन और रोजगार सहायता"

                                : "Free Skill Training • Government Certification • Placement Support"}

                        </p>

                        <div className="hero-buttons">

                            <button
                                className="primary-btn"
                                onClick={() => navigate("/rsldc-courses")}
                            >
                                {lang === "hi"

                                    ? "कोर्स देखें"

                                    : "Browse Courses"}

                            </button>

                            <button
                                className="secondary-btn"
                                onClick={() => navigate("/skill-assessment")}
                            >

                                {lang === "hi"

                                    ? "कौशल जाँच"

                                    : "Skill Assessment"}

                            </button>

                        </div>

                    </div>

                </motion.div>

                {/* NEXT PART STARTS FROM QUICK SERVICES */}

                {/* ================= QUICK SERVICES ================= */}

                <section className="quick-services-section">

                    <div className="section-heading">

                        <h2>
                            {lang === "hi"
                                ? "सरकारी कौशल सेवाएँ"
                                : "Government Skill Services"}
                        </h2>

                        <button
                            className="view-all-btn"
                            onClick={() => navigate("/rsldc-services")}
                        >
                            {lang === "hi" ? "सभी देखें" : "View All"}

                            <ArrowRight size={18} />
                        </button>

                    </div>

                    <div className="quick-services-grid">

                        {quickServices.map((service, index) => {

                            const Icon = service.icon;

                            return (

                                <motion.div

                                    key={index}

                                    className="service-card"

                                    initial={{ opacity: 0, y: 40 }}

                                    whileInView={{ opacity: 1, y: 0 }}

                                    viewport={{ once: true }}

                                    transition={{ delay: index * 0.1 }}

                                    whileHover={{
                                        y: -8,
                                        scale: 1.02,
                                    }}

                                    onClick={() => navigate(service.path)}

                                >

                                    <div
                                        className="service-icon-wrapper"
                                        style={{
                                            background: service.color,
                                        }}
                                    >

                                        <Icon
                                            size={30}
                                            color={service.iconColor}
                                        />

                                    </div>

                                    <h3>

                                        {lang === "hi"

                                            ? service.titleHi

                                            : service.titleEn}

                                    </h3>

                                    <p>

                                        {lang === "hi"

                                            ? service.descHi

                                            : service.descEn}

                                    </p>

                                    <div className="service-arrow">

                                        <ChevronRight size={22} />

                                    </div>

                                </motion.div>

                            );

                        })}

                    </div>

                </section>



                {/* ================= POPULAR COURSES ================= */}

                <section className="popular-courses-section">

                    <div className="section-heading">

                        <h2>
                            {lang === "hi"
                                ? "नारीगो कौशल पाठ्यक्रम"
                                : "NariGo Skill Courses"}
                        </h2>

                        <button
                            className="view-all-btn"
                            onClick={() => navigate("/rsldc-courses")}
                        >

                            {lang === "hi"

                                ? "सभी कोर्स"

                                : "All Courses"}

                            <ArrowRight size={18} />

                        </button>

                    </div>

                    <div className="courses-grid">

                        {courses.map((course, index) => (

                            <motion.div

                                key={index}

                                className="course-card"

                                initial={{ opacity: 0, y: 40 }}

                                whileInView={{ opacity: 1, y: 0 }}

                                viewport={{ once: true }}

                                transition={{ delay: index * 0.12 }}

                                whileHover={{
                                    y: -8,
                                }}

                            >

                                <img
                                    src={course.image || "https://placehold.co/600x350"}
                                    alt={course.title}
                                    className="course-image"
                                />

                                <div className="course-body">

                                    <span className="govt-badge">
                                        Government Certified
                                    </span>

                                    <h3>{course.title}</h3>

                                    <p className="course-count">
                                        {course.totalCourses} Courses Available
                                    </p>

                                    <button className="view-course-btn" onClick={() => navigate(course.path)}>

                                        {lang === "hi"

                                            ? "कोर्स देखें"

                                            : "View Courses"}

                                    </button>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                </section>

                {/* ================= Statistics ================= */}

                <section className="statistics-section">

                    <div className="section-heading">
                        <h2>
                            {lang === "hi"
                                ? "नारीगो प्रभाव आँकड़े"
                                : "NariGo Impact Statistics"}
                        </h2>
                    </div>

                    <div className="stats-grid">

                        {[
                            {
                                icon: <Users />,
                                value: "2.5L+",
                                label: lang === "hi"
                                    ? "महिलाएँ प्रशिक्षित"
                                    : "Women Trained",
                            },
                            {
                                icon: <BookOpen />,
                                value: "120+",
                                label: lang === "hi"
                                    ? "कोर्स"
                                    : "Courses",
                            },
                            {
                                icon: <Building2 />,
                                value: "350+",
                                label: lang === "hi"
                                    ? "प्रशिक्षण केन्द्र"
                                    : "Training Centres",
                            },
                            {
                                icon: <Briefcase />,
                                value: "82%",
                                label: lang === "hi"
                                    ? "रोजगार दर"
                                    : "Placement Rate",
                            },
                        ].map((item, index) => (

                            <motion.div
                                key={index}
                                className="stat-card"
                                whileHover={{ scale: 1.05 }}
                            >

                                <div className="stat-icon">
                                    {item.icon}
                                </div>

                                <h3>{item.value}</h3>

                                <p>{item.label}</p>

                            </motion.div>

                        ))}

                    </div>

                </section>


                {/* ================= Government Announcements ================= */}

                <section className="announcement-section">

                    <div className="section-heading">

                        <h2>
                            {lang === "hi"
                                ? "सरकारी घोषणाएँ"
                                : "Government Announcements"}
                        </h2>

                    </div>

                    <div className="announcement-list">

                        {[
                            {
                                titleHi: "नई सिलाई बैच शुरू",
                                titleEn: "New Tailoring Batch",
                                descHi: "15 अगस्त से नया बैच प्रारम्भ।",
                                descEn: "New batch starts from 15 August.",
                            },
                            {
                                titleHi: "कंप्यूटर प्रशिक्षण",
                                titleEn: "Computer Training",
                                descHi: "निःशुल्क पंजीकरण प्रारम्भ।",
                                descEn: "Free registration is now open.",
                            },
                            {
                                titleHi: "महिला उद्यमिता",
                                titleEn: "Women Entrepreneurship",
                                descHi: "सरकारी कार्यशाला आयोजित।",
                                descEn: "Government workshop announced.",
                            },
                        ].map((item, index) => (

                            <motion.div
                                key={index}
                                className="announcement-card"
                                whileHover={{ x: 5 }}
                            >

                                <Megaphone className="announcement-icon" />

                                <div>

                                    <h4>
                                        {lang === "hi"
                                            ? item.titleHi
                                            : item.titleEn}
                                    </h4>

                                    <p>
                                        {lang === "hi"
                                            ? item.descHi
                                            : item.descEn}
                                    </p>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                </section>


                {/* ================= Career Banner ================= */}

                <motion.div
                    className="career-banner"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >

                    <div>

                        <h2>
                            {lang === "hi"
                                ? "अपना कौशल बढ़ाएँ"
                                : "Upgrade Your Skills"}
                        </h2>

                        <p>
                            {lang === "hi"
                                ? "सरकारी प्रमाणित प्रशिक्षण लेकर रोजगार के अवसर प्राप्त करें।"
                                : "Join government-certified training and improve your career."}
                        </p>

                    </div>

                    <button
                        className="career-btn"
                        onClick={() => navigate("/skill-assessment")}
                    >
                        {lang === "hi"
                            ? "शुरू करें"
                            : "Start Now"}
                    </button>

                </motion.div>


                {/* ================= Footer ================= */}

                <footer className="rsldc-footer">

                    <div className="footer-left">

                        <img
                            src={logoImg}
                            alt="NariGo"
                            className="footer-logo"
                        />

                        <div>

                            <h3>NariGo</h3>

                            <p>
                                Empowering Rural Women Through Skills & Opportunities
                            </p>

                        </div>

                    </div>

                    <div className="footer-right">

                        <p>© 2026 Government of Rajasthan</p>

                        <p>NariGo</p>

                    </div>

                </footer>

            </div>

        </div>

    );

}


