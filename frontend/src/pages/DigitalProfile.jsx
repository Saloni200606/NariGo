import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, CheckCircle, Shield, Camera, Award, 
  Briefcase, Target, Sliders, ChevronRight
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import BottomNav from '../components/BottomNav';
import './DigitalProfile.css';

export default function DigitalProfile() {
  const navigate = useNavigate();
  const aadhaarFrontRef = useRef(null);
  const aadhaarBackRef = useRef(null);
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);

  const locationData = {
    Jaipur: ['Amer', 'Phagi', 'Kukus', 'Achrol', 'Chomu'],
    Jodhpur: ['Luni', 'Osian', 'Phalodi', 'Bhopalgarh'],
    Udaipur: ['Girwa', 'Gogunda', 'Kotra', 'Mavli'],
    Ajmer: ['Kishangarh', 'Beawar', 'Pushkar', 'Nasirabad'],
    Bikaner: ['Nokha', 'Lunkaransar', 'Khajuwala', 'Kolayat'],
    Kota: ['Sangod', 'Digod', 'Pipalda', 'Ramganj Mandi']
  };
  const districts = Object.keys(locationData);
  
  const [profile, setProfile] = useState({
    fullName: '',
    age: '',
    mobile: '9876543210',
    state: '',
    district: '',
    village: '',
    pincode: '',
    aadhaarNumber: '',
    skills: [],
    experienceLevel: 'No Experience',
    yearsOfExperience: '',
    goals: [],
    workType: [],
    availability: []
  });

  useEffect(() => {
    // Load existing user data if any
    const existingUser = JSON.parse(localStorage.getItem('nariGo_user'));
    if (existingUser) {
      setProfile(prev => ({
        ...prev,
        fullName: existingUser.fullName || prev.fullName,
        district: existingUser.district || prev.district,
        village: existingUser.village || prev.village,
        skills: existingUser.workSkills || prev.skills,
        goals: existingUser.goals || prev.goals,
        workType: existingUser.workType || prev.workType,
        availability: existingUser.availability || prev.availability,
        experienceLevel: existingUser.experienceLevel || prev.experienceLevel,
        yearsOfExperience: existingUser.yearsOfExperience || prev.yearsOfExperience,
        age: existingUser.age || prev.age,
        pincode: existingUser.pincode || prev.pincode,
        aadhaarNumber: existingUser.aadhaarNumber || prev.aadhaarNumber,
        state: existingUser.state || 'Rajasthan'
      }));
    } else {
      setProfile(prev => ({ ...prev, state: 'Rajasthan' }));
    }
  }, []);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, value) => {
    setProfile(prev => {
      const array = prev[field];
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...array, value] };
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const existingUser = JSON.parse(localStorage.getItem('nariGo_user')) || {};
    const updatedUser = {
      ...existingUser,
      ...profile,
      workSkills: profile.skills
    };
    localStorage.setItem('nariGo_user', JSON.stringify(updatedUser));
    navigate('/home');
  };

  const skillsList = [
    { id: 'tailoring', name: 'Stitching & Tailoring', icon: '👕' },
    { id: 'handicrafts', name: 'Handicrafts & Embroidery', icon: '🎨' },
    { id: 'agriculture', name: 'Agriculture & Farming', icon: '🚜' },
    { id: 'dairy', name: 'Dairy & Livestock', icon: '🐄' },
    { id: 'food', name: 'Food Processing', icon: '🍲' },
    { id: 'beauty', name: 'Beauty & Mehendi', icon: '🖌️' },
    { id: 'cooking', name: 'Cooking & Bakery', icon: '🍳' },
    { id: 'digital', name: 'Digital Skills', icon: '💻' },
    { id: 'home', name: 'Home Services', icon: '🧹' },
    { id: 'packaging', name: 'Packaging & Manufacturing', icon: '📦' },
    { id: 'other', name: 'Other Skills', icon: '•••' }
  ];

  const experienceLevels = ['No Experience', 'Beginner', 'Intermediate', 'Experienced'];

  const goalsList = [
    { id: 'work', title: 'Work Opportunities', desc: 'Find jobs or projects based on your skills', icon: <Briefcase size={20}/> },
    { id: 'training', title: 'Skill Training Courses', desc: 'Learn new things and get certified', icon: <Award size={20}/> },
    { id: 'funding', title: 'Funding & Financial Support', desc: 'Access loans and government schemes', icon: <Shield size={20}/> },
    { id: 'business', title: 'Start or Grow Business', desc: 'Get help starting your own venture', icon: <Target size={20}/> },
    { id: 'shg', title: 'SHG / Community Opportunities', desc: 'Join local women groups and collectives', icon: <User size={20}/> }
  ];

  const workTypes = ['Home-based', 'Nearby', 'Group work', 'Self-employment'];
  const availabilities = ['Full-time', 'Part-time', 'Flexible'];

  return (
    <div className="digital-profile-container">
      <div className="profile-content-wrapper">
        <header className="profile-header">
          <div className="profile-logo-container">
            <img src={logoImg} alt="NariGo Logo" className="profile-logo" />
          </div>
          <h1>Create Your NariGo Profile</h1>
          <p>Complete your profile to discover the right opportunities for you</p>
        </header>

        <form className="profile-form" onSubmit={handleSave}>
        
        {/* Personal Information */}
        <div className="section-card">
          <div className="section-title">
            <User size={20} className="section-icon" />
            Personal Information
          </div>
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter your name"
              value={profile.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input 
              type="number" 
              className="form-input" 
              placeholder="Enter your age"
              value={profile.age}
              onChange={(e) => handleChange('age', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="10 digit Mobile Number"
              pattern="[0-9]{10}"
              maxLength={10}
              title="Please enter a valid 10-digit mobile number"
              value={profile.mobile}
              onChange={(e) => handleChange('mobile', e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">State</label>
            <input 
              type="text"
              className="form-input"
              value="Rajasthan"
              readOnly
              style={{ backgroundColor: '#F3F4F6' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">District</label>
            <select 
              className="form-input"
              value={profile.district}
              onChange={(e) => {
                handleChange('district', e.target.value);
                handleChange('village', ''); // Reset village when district changes
              }}
              required
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Village / City</label>
            <select 
              className="form-input"
              value={profile.village}
              onChange={(e) => handleChange('village', e.target.value)}
              required
              disabled={!profile.district}
            >
              <option value="">Select Village</option>
              {profile.district && locationData[profile.district]?.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Pincode</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="6-digit Pincode"
              maxLength={6}
              value={profile.pincode}
              onChange={(e) => handleChange('pincode', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Identity Details */}
        <div className="section-card">
          <div className="section-title">
            <Shield size={20} className="section-icon" />
            Identity Details
          </div>

          <div className="form-group">
            <label className="form-label">Aadhaar Number</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="12 digit Aadhaar Number"
              pattern="[0-9]{12}"
              maxLength={12}
              title="Please enter a valid 12-digit Aadhaar number"
              value={profile.aadhaarNumber}
              onChange={(e) => handleChange('aadhaarNumber', e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          <div className="upload-grid">
            <div>
              <label className="form-label">Aadhaar Front</label>
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                ref={aadhaarFrontRef}
                onChange={(e) => setFrontUploaded(!!e.target.files[0])}
                required
              />
              <div 
                className={`upload-box ${frontUploaded ? 'uploaded' : ''}`} 
                onClick={() => aadhaarFrontRef.current?.click()}
                style={frontUploaded ? { borderColor: '#059669', backgroundColor: '#ECFDF5' } : {}}
              >
                {frontUploaded ? (
                  <>
                    <CheckCircle size={24} color="#059669" />
                    <span className="upload-text" style={{color: '#059669'}}>Front Uploaded</span>
                  </>
                ) : (
                  <>
                    <Camera size={24} className="upload-icon" />
                    <span className="upload-text">Upload Front</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <label className="form-label">Aadhaar Back</label>
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                ref={aadhaarBackRef}
                onChange={(e) => setBackUploaded(!!e.target.files[0])}
                required
              />
              <div 
                className={`upload-box ${backUploaded ? 'uploaded' : ''}`} 
                onClick={() => aadhaarBackRef.current?.click()}
                style={backUploaded ? { borderColor: '#059669', backgroundColor: '#ECFDF5' } : {}}
              >
                {backUploaded ? (
                  <>
                    <CheckCircle size={24} color="#059669" />
                    <span className="upload-text" style={{color: '#059669'}}>Back Uploaded</span>
                  </>
                ) : (
                  <>
                    <Camera size={24} className="upload-icon" />
                    <span className="upload-text">Upload Back</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="secure-note">
            <Shield size={16} color="#D31245" style={{ flexShrink: 0 }} />
            <span>Your documents are securely stored and used only for verification purposes.</span>
          </div>
        </div>

        {/* Skills */}
        <div className="section-card">
          <div className="section-title">
            <Award size={20} className="section-icon" />
            What skills do you have?
          </div>
          
          <div className="skills-grid">
            {skillsList.map(skill => (
              <div 
                key={skill.id}
                className={`skill-card ${profile.skills.includes(skill.id) ? 'active' : ''}`}
                onClick={() => toggleArrayItem('skills', skill.id)}
              >
                <div className="skill-icon-wrapper">
                  <span style={{ fontSize: '24px' }}>{skill.icon}</span>
                </div>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div className="section-card">
          <div className="section-title">
            <Briefcase size={20} className="section-icon" />
            Work Experience
          </div>

          <div className="experience-grid">
            {experienceLevels.map(level => (
              <div 
                key={level}
                className={`radio-card ${profile.experienceLevel === level ? 'active' : ''}`}
                onClick={() => handleChange('experienceLevel', level)}
              >
                <span className="radio-label">{level}</span>
                <div className="radio-circle">
                  <div className="radio-inner"></div>
                </div>
              </div>
            ))}
          </div>

          {(profile.experienceLevel === 'Intermediate' || profile.experienceLevel === 'Experienced') && (
            <div className="form-group mt-4">
              <label className="form-label">Years of Experience</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="How many years?"
                value={profile.yearsOfExperience}
                onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                required
              />
            </div>
          )}
        </div>

        {/* Goals */}
        <div className="section-card">
          <div className="section-title">
            <Target size={20} className="section-icon" />
            Tell us your goal
          </div>

          {goalsList.map(goal => (
            <div 
              key={goal.id}
              className={`goal-card ${profile.goals.includes(goal.id) ? 'active' : ''}`}
              onClick={() => toggleArrayItem('goals', goal.id)}
            >
              <div className="goal-icon">{goal.icon}</div>
              <div className="goal-content">
                <div className="goal-title">{goal.title}</div>
                <div className="goal-desc">{goal.desc}</div>
              </div>
              <div className="checkbox-square">
                {profile.goals.includes(goal.id) && <CheckCircle size={14} color="white" />}
              </div>
            </div>
          ))}
        </div>



        <button type="submit" className="submit-btn">
          Save Profile <ChevronRight size={20} />
        </button>

      </form>
      </div>
      <BottomNav />
    </div>
  );
}
