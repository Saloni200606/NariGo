import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, MapPin, IndianRupee } from 'lucide-react';
import "./FindJobs.css";

const FindJobs = () => {
    const navigate = useNavigate();
    const [postedJobs, setPostedJobs] = useState([]);
    const [employers, setEmployers] = useState({});

    const loadJobsAndEmployers = () => {
        const jobs = JSON.parse(localStorage.getItem('nariGo_posted_jobs')) || [];
        const users = JSON.parse(localStorage.getItem('nariGo_demo_users')) || [];
        
        const employerMap = {};
        users.forEach(u => {
            if (u.role === 'Employer' || u.role === 'employer') {
                const id = u.phoneNumber || u.email;
                employerMap[id] = u;
            }
        });
        
        setEmployers(employerMap);
        setPostedJobs(jobs);
    };

    useEffect(() => {
        loadJobsAndEmployers();
        
        const handleStorageChange = () => {
            loadJobsAndEmployers();
        };
        
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('nariGo_data_updated', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('nariGo_data_updated', handleStorageChange);
        };
    }, []);

    const jobs = [
        {
            title: "Anganwadi Jobs",
            hindi: "आंगनवाड़ी नौकरियाँ",
            icon: "👩‍🏫",
            path: "/anganwadi-jobs",
        },
        {
            title: "Goat Farming",
            hindi: "बकरी पालन",
            icon: "🐐",
            path: "/goatfarm-jobs",
        },
        {
            title: "Mushroom Farming",
            hindi: "मशरूम खेती",
            icon: "🍄",
            path: "/mushroom-jobs",
        },
        {
            title: "Stitching & Tailoring",
            hindi: "सिलाई एवं टेलरिंग",
            icon: "🧵",
            path: "/tailoring-jobs",
        },
        {
            title: "Dairy Jobs",
            hindi: "डेयरी कार्य",
            icon: "🥛",
            path: "/dairy-jobs",
        },
        {
            title: "Beauty & Mehendi",
            hindi: "ब्यूटी एवं मेहंदी",
            icon: "💄",
            path: "/beauty-jobs",
        },
        {
            title: "Handicrafts",
            hindi: "हस्तशिल्प",
            icon: "🎨",
            path: "/handicrafts-jobs",
        },
        {
            title: "Food Processing",
            hindi: "खाद्य प्रसंस्करण",
            icon: "🍲",
            path: "/food-processing-jobs",
        },
    ];

    return (
        <div className="findjobs-container">

            <header className="findjobs-navbar">

                <button
                    className="back-btn"
                    onClick={() => {
                        const userStr = localStorage.getItem('nariGo_user');
                        if (userStr) {
                            const user = JSON.parse(userStr);
                            if (user.role === 'Employer' || user.role === 'employer') {
                                navigate('/employer-dashboard');
                                return;
                            }
                        }
                        navigate('/dashboard');
                    }}
                >
                    ←
                </button>

                <h1 className="findjobs-logo">
                    NariGo
                </h1>

                <div></div>

            </header>

            {/* Hero */}

            <section className="hero-section">


                <h1>Find Jobs</h1>

                <p>
                    Discover safe and flexible work opportunities for rural women.
                </p>

                <input
                    type="text"
                    placeholder="🔍 Search jobs..."
                    className="job-search"
                />

            </section>

            <h2 className="section-title">
                Popular Job Categories
            </h2>

            <div className="jobs-grid">

                {jobs.map((job, index) => (

                    <div
                        key={index}
                        className="job-card"
                        onClick={() => navigate(job.path)}
                    >

                        <div className="job-left">

                            <div className="job-icon">
                                {job.icon}
                            </div>

                            <div>

                                <h3>{job.title}</h3>

                                <p>{job.hindi}</p>

                            </div>

                        </div>

                        <button
                            className="explore-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(job.path);
                            }}
                        >
                            Explore →
                        </button>

                    </div>

                ))}

            </div>

            {(() => {
                const visibleJobs = postedJobs.filter(job => {
                    if (job.isActive === false) return false;
                    const employer = employers[job.employerId];
                    if (!employer || employer.verificationStatus !== 'Verified') return false;
                    return true;
                });

                if (visibleJobs.length === 0) return null;

                return (
                    <>
                        <h2 className="section-title" style={{ marginTop: '40px' }}>
                            Newly Posted Jobs
                        </h2>
                        <div className="jobs-grid">
                            {visibleJobs.map((job) => {
                                const employer = employers[job.employerId] || {};
                                const companyName = employer.companyName || 'Verified Employer';
                                
                                return (
                                <div
                                    key={job.id}
                                    className="job-card"
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '24px', gap: '12px' }}
                                    onClick={() => navigate('/apply-job', { state: { jobId: job.id, customJob: job } })}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text-dark)', marginBottom: '4px' }}>{job.title}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#007BFF', fontSize: '14px', fontWeight: '500' }}>
                                                {companyName} <span style={{ display: 'flex', alignItems: 'center' }}>✔ Verified Employer</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', color: 'var(--color-text-small)', fontSize: '14px', width: '100%', marginTop: '8px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Briefcase size={16} /> {job.category} ({job.employmentType})
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <MapPin size={16} /> {job.location}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <IndianRupee size={16} /> {job.salary}/mo
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            ⏱ {job.workingHours || 'N/A'}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            👥 {job.vacancies || 'N/A'} Vacancies
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#DC2626' }}>
                                            📅 Apply by {job.lastDate || 'N/A'}
                                        </span>
                                    </div>
                                    
                                    <p style={{ color: 'var(--color-text-small)', fontSize: '14px', marginTop: '8px' }}>
                                        {job.description?.length > 100 ? job.description.substring(0, 100) + '...' : job.description}
                                    </p>
                                    
                                    <button
                                        className="explore-btn"
                                        style={{ marginTop: 'auto', alignSelf: 'flex-end', width: '100%', justifyContent: 'center' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('/apply-job', { state: { jobId: job.id, customJob: job } });
                                        }}
                                    >
                                        Apply Now →
                                    </button>
                                </div>
                                );
                            })}
                        </div>
                    </>
                );
            })()}

        </div>
    );
};

export default FindJobs;