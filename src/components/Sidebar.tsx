import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User as UserIcon,
  ShieldCheck,
  Wallet,
  AppWindow,
  Activity,
  LogOut,
  ChevronRight,
  HelpCircle,
  FileText,
  Shield,
  RefreshCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Account', path: '/account', icon: <UserIcon size={20} /> },
    { name: 'Security', path: '/security', icon: <ShieldCheck size={20} /> },
    { name: 'Wallet', path: '/wallet', icon: <Wallet size={20} /> },
    { name: 'Connected Apps', path: '/apps', icon: <AppWindow size={20} /> },
    { name: 'Activity', path: '/activity', icon: <Activity size={20} /> },
  ];

  const supportItems = [
    { name: 'Contact Support', path: '/contact', icon: <HelpCircle size={20} /> },
    { name: 'Privacy Policy', path: '/privacy', icon: <Shield size={20} /> },
    { name: 'Terms of Service', path: '/terms', icon: <FileText size={20} /> },
    { name: 'Refund Policy', path: '/refund', icon: <RefreshCcw size={20} /> },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside className="glass-sidebar sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/logo.png" alt="CHLOSE Logo" className="logo-img" />
          <div className="logo-text-group">
            <span className="logo-text">CHLOSE</span>
            <span className="logo-subtext">CONSOLE</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-name">{item.name}</span>
            <ChevronRight className="nav-chevron" size={16} />
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-divider"></div>

      <nav className="sidebar-nav support-nav">
        <div className="nav-section-title">Support & Legal</div>
        {supportItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item support-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-name">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile-mini">
          <div className="avatar-placeholder">
            {user?.email?.[0].toUpperCase() || 'U'}
          </div>
          <div className="user-info">
            <span className="username">{user?.email?.split('@')[0] || 'User'}</span>
            <span className="user-status">Identity Active</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleSignOut}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
