import React from 'react';
import GlassCard from '../components/GlassCard';
import { ShieldCheck, ArrowUpRight, Bot, Globe } from 'lucide-react';
import './ConnectedApps.css';

const ConnectedApps: React.FC = () => {
  const ecosystemApps = [
    {
      name: 'PlastiNet',
      desc: 'Unified plastic waste tracking and environmental contribution network.',
      status: 'Authorized',
      icon: <Globe className="blue" size={32} />,
      lastActive: 'Active Now'
    },
    {
      name: 'Chloe ChatBot',
      desc: 'AI-driven environmental intelligence and ecosystem orchestration.',
      status: 'Authorized',
      icon: <Bot className="eco" size={32} />,
      lastActive: 'Active Now'
    }
  ];

  return (
    <div className="page-container apps-page">
      <header className="page-header">
        <h1 className="glow-text-eco">Connected Systems</h1>
        <p>Authorized infrastructure layers integrated with your CHLOSE Identity.</p>
      </header>

      <div className="apps-grid">
        {ecosystemApps.map((app, i) => (
          <GlassCard key={i} className="app-card">
            <div className="app-card-header">
              <div className="app-icon-box">
                {app.icon}
              </div>
              <div className="app-status-badge active">{app.status}</div>
            </div>
            <div className="app-content">
              <h3 className="app-name">{app.name}</h3>
              <p className="app-desc">{app.desc}</p>
              <div className="app-meta">
                <ShieldCheck size={14} className="eco" />
                <span>Ecosystem Security Active • {app.lastActive}</span>
              </div>
            </div>
            <div className="app-footer">
              <button className="manage-btn">Access Security</button>
              <button className="launch-btn">
                Launch System <ArrowUpRight size={16} />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="apps-footer-note">
        <ShieldCheck size={18} className="eco" />
        <span>Your CHLOSE Identity is synchronized across all {ecosystemApps.length} ecosystem layers.</span>
      </div>
    </div>
  );
};

export default ConnectedApps;
