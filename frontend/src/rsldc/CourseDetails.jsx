import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Users, CheckCircle } from 'lucide-react';
import './rsldc-pages.css';

const CourseDetails = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('nariGo_enrollments')) || [];
    setEnrollments(stored);
  }, []);

  // Basic title formatting: replace hyphens with spaces and capitalize
  const formatTitle = (str) => {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const categoryName = category ? formatTitle(category) : 'Courses';

  // Placeholder courses for the selected category
  const courses = [
    { title: `Basic ${categoryName} Training`, duration: '1 Month', seats: 30 },
    { title: `Advanced ${categoryName} Certification`, duration: '3 Months', seats: 20 },
    { title: `${categoryName} Masterclass`, duration: '6 Months', seats: 15 },
  ];

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
        <h1 className="text-heading">{categoryName} Courses</h1>
        <p className="text-body" style={{ marginTop: '12px' }}>
          Explore all training programs available under the {categoryName} sector.
        </p>
      </div>

      <div className="rsldc-grid">
        {courses.map((course, index) => {
          const isEnrolled = enrollments.some(e => e.courseTitle === course.title);
          
          return (
            <div key={index} className="rsldc-item-card glass-card glass-card-hover">
              <h3 className="rsldc-title">{course.title}</h3>
              <div className="rsldc-description" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="var(--color-primary)" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} color="var(--color-primary)" />
                  <span>Seats Available: {course.seats}</span>
                </div>
              </div>
              <div className="rsldc-action-row">
                <button 
                  className={isEnrolled ? "secondary-btn" : "primary-btn"} 
                  style={{ width: '100%' }}
                  disabled={isEnrolled}
                  onClick={() => handleEnrollClick(course.title)}
                >
                  {isEnrolled ? (
                    <><CheckCircle size={18} style={{ marginRight: '8px' }} /> Already Enrolled ✓</>
                  ) : (
                    <><BookOpen size={18} style={{ marginRight: '8px' }} /> Enroll Now</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetails;
