import React from 'react';
import { NavLink } from 'react-router-dom';

import { 
  HiOutlineSquares2X2, 
  HiOutlineUsers, 
  HiOutlineWrenchScrewdriver, 
  HiOutlineUserGroup,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCog6Tooth
} from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Tableau de bord', path: '/dashboard', icon: <HiOutlineSquares2X2 /> },
    { name: 'Clients', path: '/clients', icon: <HiOutlineUsers /> },
    { name: 'Interventions', path: '/interventions', icon: <HiOutlineWrenchScrewdriver /> },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Techniciens', path: '/techniciens', icon: <HiOutlineUserGroup /> });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo-icon">MJ</div>
        <span className="logo-text">MJ Informatique</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{user?.name?.charAt(0)}</div>
          <div className="user-details">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role === 'admin' ? 'Administrateur' : 'Technicien'}</p>
          </div>
        </div>
        <button onClick={logout} className="logout-btn" title="Déconnexion">
          <HiOutlineArrowLeftOnRectangle />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
