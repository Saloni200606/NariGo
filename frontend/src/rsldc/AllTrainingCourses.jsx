import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, GraduationCap, Clock } from 'lucide-react';
import './rsldc-pages.css';

const AllTrainingCourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [enrollments, setEnrollments] = useState([]);

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('nariGo_enrollments')) || [];
    setEnrollments(stored);
  }, []);

  const courses = [
    { id: 1, title: 'Advanced Tailoring', category: 'Apparel', duration: '3 Months', provider: 'RSLDC' },
    { id: 2, title: 'Beauty Parlour Management', category: 'Beauty', duration: '6 Months', provider: 'Skill India' },
    { id: 3, title: 'Handicraft Design', category: 'Handicrafts', duration: '2 Months', provider: 'Rajeevika' },
    { id: 4, title: 'Food Preservation & Packaging', category: 'Food Processing', duration: '1 Month', provider: 'RSLDC' },
    { id: 5, title: 'Dairy Farming Basics', category: 'Agriculture', duration: '3 Weeks', provider: 'PMKVY' },
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnrollClick = (courseTitle) => {
    navigate('/enroll-course', { state: { courseTitle } });
  };

  return (
    <div className="rsldc-page-container page-padding">
      <div className="rsldc-page-header">
        <button 
          className="secondary-btn" 
          style={{ width: 'fit-content', padding: '0 20px', marginBottom: '20px', height: '44px' }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Back
        </button>
        <h1 className="text-heading">All Training Courses</h1>
        <p className="text-body" style={{ marginTop: '12px' }}>
          Browse all available skill training programs.
        </p>
      </div>

      <div style={{ maxWidth: '500px', margin: '0 auto 32px' }}>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-small)' }} />
          <input 
            type="text" 
            className="primary-input" 
            style={{ paddingLeft: '48px' }}
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rsldc-grid">
        {filteredCourses.map((course) => {
          const isEnrolled = enrollments.some(e => e.courseTitle === course.title);
          
          return (
            <div key={course.id} className="rsldc-item-card glass-card glass-card-hover">
              <span style={{ fontSize: '12px', background: 'rgba(244, 63, 117, 0.1)', color: 'var(--color-primary)', padding: '4px 8px', borderRadius: '4px', width: 'fit-content', fontWeight: '500' }}>
                {course.category}
              </span>
              <h3 className="rsldc-title" style={{ marginTop: '4px' }}>{course.title}</h3>
              <div className="rsldc-description" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="var(--color-primary)" />
                  <span>{course.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={16} color="var(--color-primary)" />
                  <span>By {course.provider}</span>
                </div>
              </div>
              <div className="rsldc-action-row">
                <button 
                  className={isEnrolled ? "secondary-btn" : "primary-btn"} 
                  style={{ width: '100%' }}
                  disabled={isEnrolled}
                  onClick={() => handleEnrollClick(course.title)}
                >
                  {isEnrolled ? "Already Enrolled ✓" : "Enroll Now"}
                </button>
              </div>
            </div>
          );
        })}
        {filteredCourses.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <p className="text-subheading">No courses found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTrainingCourses;
