import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, IndianRupee } from 'lucide-react';

const DynamicJobList = ({ category }) => {
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

    // Filter jobs by category
    const visibleJobs = postedJobs.filter(job => {
        if (job.isActive === false) return false;
        
        // Match category loosely (e.g. "Beauty" matches "Beauty & Wellness")
        if (category && job.category && !job.category.toLowerCase().includes(category.toLowerCase()) && !category.toLowerCase().includes(job.category.toLowerCase())) {
            return false;
        }

        const employer = employers[job.employerId];
        if (!employer || employer.verificationStatus !== 'Verified') return false;
        return true;
    });

    if (visibleJobs.length === 0) return null;

    return (
        <>
            <div style={{ gridColumn: '1 / -1', marginTop: '20px', marginBottom: '10px' }}>
                <h2 className="section-title" style={{ textAlign: 'left', margin: 0, paddingLeft: '8px' }}>
                    Employer Posted Jobs
                </h2>
                <p style={{ color: 'var(--color-text-small)', paddingLeft: '8px', fontSize: '14px', marginTop: '4px' }}>
                    Real-time opportunities directly from verified employers
                </p>
            </div>
            {visibleJobs.map((job) => {
                const employer = employers[job.employerId] || {};
                const companyName = employer.companyName || 'Verified Employer';
                
                return (
                <div
                    key={job.id}
                    className="job-card"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '24px', gap: '12px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '16px', position: 'relative' }}
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
        </>
    );
};

export default DynamicJobList;
