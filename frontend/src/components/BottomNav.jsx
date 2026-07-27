import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Landmark, User } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home size={22} className="nav-icon" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/opportunities" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Briefcase size={22} className="nav-icon" />
        <span>Opportunities</span>
      </NavLink>
      <NavLink to="/support" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Landmark size={22} className="nav-icon" />
        <span>Support</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <User size={22} className="nav-icon" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
