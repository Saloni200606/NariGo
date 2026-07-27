import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, Briefcase, FileText, Users, CheckCircle, 
  BarChart2, MessageSquare, Settings, PlusCircle, ArrowLeft,
  Search, Bell, User, Globe, LogOut as LogOutIcon, Menu, X
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import './EmployerDashboard.css';
import './HomeDashboard.css'; // For shared header styles

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('hi');
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    totalHires: 0
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('nariGo_lang') || 'hi';
    setLang(savedLang);
    
    const userStr = localStorage.getItem('nariGo_user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userStr);
    setUser(parsedUser);

    const loadStats = () => {
      // Calculate Stats
      const employerId = parsedUser.phoneNumber || parsedUser.email || 'unknown';
      const allJobs = JSON.parse(localStorage.getItem('nariGo_posted_jobs')) || [];
      const employerJobs = allJobs.filter(job => job.employerId === employerId);
      
      const activeJobs = employerJobs.filter(job => job.isActive !== false);
      
      // Map job IDs to easily filter applications
      const employerJobIds = employerJobs.map(job => job.id);
      
      const allApps = JSON.parse(localStorage.getItem('nariGo_job_applications')) || [];
      const employerApps = allApps.filter(app => employerJobIds.includes(app.jobId));
      
      const hiredApps = employerApps.filter(app => app.status === 'Hired');
      
      setStats({
        totalJobs: employerJobs.length,
        activeJobs: activeJobs.length,
        totalApplications: employerApps.length,
        totalHires: hiredApps.length
      });
    };

    loadStats(); // Load initially

    // Listen for cross-tab or direct local storage changes
    const handleStorageChange = () => {
      loadStats();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen to a custom event for same-tab updates if needed
    window.addEventListener('nariGo_data_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('nariGo_data_updated', handleStorageChange);
    };
  }, [navigate]);

  const handleLanguageToggle = () => {
    const newLang = lang === 'hi' ? 'en' : 'hi';
    setLang(newLang);
    localStorage.setItem('nariGo_lang', newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('nariGo_user');
    localStorage.removeItem('nariGo_token');
    navigate('/login');
  };

  const verificationStatus = user.verificationStatus || 'pending';
  const companyName = user.companyName || user.fullName || 'Company Name';

  return (
    <div className="home-dashboard-container">
      {/* Shared Background Orbs */}
      <div className="home-bg-orb-1" />
      <div className="home-bg-orb-2" />
      <div className="home-bg-orb-3" />

      <div className="home-main employer-main">
        {/* Header (Reused from HomeDashboard) */}
        <header className="home-header">
          <div className="header-brand" onClick={() => navigate("/employer-dashboard")} style={{ cursor: 'pointer' }}>
            <img src={logoImg} alt="NariGo Logo" className="home-logo" />
            <span className="header-title">NariGo</span>
          </div>

          <div className={`nav-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className={`nav-container ${isMobileMenuOpen ? 'open' : ''}`}>
            <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={28} color="var(--color-dark-rose)" />
            </button>
            <nav className="navbar">
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Employer Portal</span>
              <span className="mobile-only-link" onClick={() => { setIsMobileMenuOpen(false); navigate('/profile'); }}>Profile</span>
              <button className="mobile-only-link logout-btn" onClick={handleLogout}>Logout</button>
            </nav>
          </div>

          <div className="header-actions">
            <button onClick={handleLanguageToggle} className="lang-toggle-btn">
              <Globe className="header-action-icon" />
              <span className="lang-text desktop-only">{lang === 'hi' ? 'EN' : 'HI'}</span>
            </button>
            <button className="bell-btn" onClick={() => { setIsMobileMenuOpen(false); navigate('/notifications'); }}>
              <Bell className="bell-icon" />
              <span className="bell-ping" />
            </button>
            <div className="profile-badge desktop-only" onClick={() => { setIsMobileMenuOpen(false); navigate('/profile'); }} style={{ cursor: 'pointer' }}>
              <User size={24} className="profile-svg" />
            </div>
            <button className="desktop-only logout-icon-btn" onClick={handleLogout} title="Logout">
              <LogOutIcon size={24} />
            </button>
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} color="var(--color-dark-rose)" />
            </button>
          </div>
        </header>

        {/* Employer Greeting */}
        <div className="employer-header">
          <h1 className="employer-title">
            {lang === 'hi' ? `नमस्ते, ${companyName}!` : `Welcome, ${companyName}!`}
            {verificationStatus === 'approved' && <CheckCircle size={28} color="#007BFF" />}
          </h1>
          <p className="employer-subtitle">
            {lang === 'hi' ? 'अपने रोज़गार पोर्टल को प्रबंधित करें।' : 'Manage your recruitment portal.'}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper"><Briefcase size={20} /></div>
              <span>{lang === 'hi' ? 'कुल नौकरियाँ' : 'Total Jobs Posted'}</span>
            </div>
            <div className="stat-value">{stats.totalJobs}</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper"><CheckCircle size={20} /></div>
              <span>{lang === 'hi' ? 'सक्रिय नौकरियाँ' : 'Active Jobs'}</span>
            </div>
            <div className="stat-value">{stats.activeJobs}</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper"><FileText size={20} /></div>
              <span>{lang === 'hi' ? 'कुल आवेदन' : 'Applications'}</span>
            </div>
            <div className="stat-value">{stats.totalApplications}</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper"><Users size={20} /></div>
              <span>{lang === 'hi' ? 'कुल नियुक्तियाँ' : 'Total Hires'}</span>
            </div>
            <div className="stat-value">{stats.totalHires}</div>
          </div>
        </div>

        {/* Action Cards Grid */}
        <h2 className="section-title">{lang === 'hi' ? 'त्वरित कार्रवाई' : 'Quick Actions'}</h2>
        <div className="actions-grid">
          {/* Post Job */}
          <div className="action-card glass-card" onClick={() => navigate('/post-job')}>
            <div className="action-icon-wrapper">
              <PlusCircle size={28} />
            </div>
            <h3 className="action-title">{lang === 'hi' ? 'नई नौकरी पोस्ट करें' : 'Post New Job'}</h3>
            <p className="action-desc">{lang === 'hi' ? 'महिलाओं के लिए नया रोजगार अवसर बनाएं।' : 'Create a new job opportunity for women.'}</p>
          </div>

          {/* Manage Jobs */}
          <div className="action-card glass-card" onClick={() => navigate('/manage-jobs')}>
            <div className="action-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
              <Briefcase size={28} />
            </div>
            <h3 className="action-title">{lang === 'hi' ? 'नौकरियां प्रबंधित करें' : 'Manage Jobs'}</h3>
            <p className="action-desc">{lang === 'hi' ? 'अपनी सक्रिय और बंद नौकरियों को देखें।' : 'View and edit your active and closed jobs.'}</p>
          </div>

          {/* Applications Received */}
          <div className="action-card glass-card" onClick={() => navigate('/applications')}>
            <div className="action-icon-wrapper" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
              <FileText size={28} />
            </div>
            <h3 className="action-title">{lang === 'hi' ? 'प्राप्त आवेदन' : 'Applications Received'}</h3>
            <p className="action-desc">{lang === 'hi' ? 'उम्मीदवारों के आवेदनों की समीक्षा करें।' : 'Review and process incoming applications.'}</p>
          </div>

          {/* Shortlisted Candidates */}
          <div className="action-card glass-card" onClick={() => navigate('/employer-dashboard')}>
            <div className="action-icon-wrapper" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' }}>
              <Users size={28} />
            </div>
            <h3 className="action-title">{lang === 'hi' ? 'चयनित उम्मीदवार' : 'Shortlisted Candidates'}</h3>
            <p className="action-desc">{lang === 'hi' ? 'साक्षात्कार के लिए चुने गए उम्मीदवारों को देखें।' : 'View candidates selected for interview.'}</p>
          </div>

          {/* Company Profile */}
          <div className="action-card glass-card" onClick={() => navigate('/employer-profile')}>
            <div className="action-icon-wrapper" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}>
              <Building size={28} />
            </div>
            <h3 className="action-title">{lang === 'hi' ? 'कंपनी प्रोफ़ाइल' : 'Company Profile'}</h3>
            <p className="action-desc">{lang === 'hi' ? 'अपनी कंपनी का विवरण अपडेट करें।' : 'Update your company details and description.'}</p>
          </div>

          {/* Verification Status */}
          <div className="action-card glass-card" onClick={() => navigate('/employer-verification')}>
            <div className="action-icon-wrapper" style={{ background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)' }}>
              <CheckCircle size={28} />
            </div>
            <h3 className="action-title">{lang === 'hi' ? 'सत्यापन स्थिति' : 'Verification Status'}</h3>
            <p className="action-desc">{lang === 'hi' ? 'अपने केवाईसी दस्तावेज़ जांचें।' : 'Check your KYC documents and status.'}</p>
            <span className={`status-badge ${verificationStatus === 'Verified' ? 'approved' : verificationStatus}`}>
              {verificationStatus === 'Verified' ? (lang === 'hi' ? '✔ सत्यापित नियोक्ता' : '✔ Verified Employer') :
               verificationStatus === 'pending' ? (lang === 'hi' ? 'सत्यापन लंबित' : 'Verification Pending') : 
               (lang === 'hi' ? 'सत्यापन अस्वीकृत' : 'Verification Rejected')}
            </span>
          </div>

          {/* Analytics */}
          <div className="action-card glass-card" onClick={() => navigate('/employer-dashboard')}>
            <div className="action-icon-wrapper" style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' }}>
              <BarChart2 size={28} />
            </div>
            <h3 className="action-title">{lang === 'hi' ? 'विश्लेषण' : 'Analytics'}</h3>
            <p className="action-desc">{lang === 'hi' ? 'नौकरी के प्रदर्शन की जानकारी।' : 'Insights into job performance and views.'}</p>
          </div>

          {/* Messages */}
          <div className="action-card glass-card" onClick={() => navigate('/employer-dashboard')}>
            <div className="action-icon-wrapper" style={{ background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)' }}>
              <MessageSquare size={28} />
            </div>
            <h3 className="action-title">{lang === 'hi' ? 'संदेश' : 'Messages'}</h3>
            <p className="action-desc">{lang === 'hi' ? 'उम्मीदवारों के साथ संवाद करें।' : 'Communicate directly with candidates.'}</p>
          </div>

          {/* Settings */}
          <div className="action-card glass-card" onClick={() => navigate('/employer-dashboard')}>
            <div className="action-icon-wrapper" style={{ background: 'linear-gradient(135deg, #64748B 0%, #475569 100%)' }}>
              <Settings size={28} />
            </div>
            <h3 className="action-title">{lang === 'hi' ? 'सेटिंग्स' : 'Settings'}</h3>
            <p className="action-desc">{lang === 'hi' ? 'अधिसूचना और खाता प्राथमिकताएँ।' : 'Account and notification preferences.'}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
