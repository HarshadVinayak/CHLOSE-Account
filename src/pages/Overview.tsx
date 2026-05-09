import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import IdentityChip from '../components/IdentityChip';
import { Shield, Smartphone, Globe, Cloud, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import './Overview.css';

const Overview: React.FC = () => {
  const { user } = useAuth();
  const { wallet, loading } = useProfile();
  const navigate = useNavigate();

  if (loading && !wallet) {
    return (
      <div className="loading-state">
        <Loader2 className="spin" />
        <p>Syncing Ecosystem...</p>
      </div>
    );
  }

  return (
    <div className="page-container overview-page">
      <header className="page-header">
        <h1 className="glow-text-eco">Console Overview</h1>
        <p>Your unified identity and ecosystem command center.</p>
      </header>

      <div className="status-grid">
        <GlassCard className="status-card">
          <div className="status-header">
            <Shield className="status-icon eco" size={24} />
            <div className="status-info">
              <h3>Security Status</h3>
              <IdentityChip label="Protected Ecosystem Session" status="active" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="status-card">
          <div className="status-header">
            <Globe className="status-icon blue" size={24} />
            <div className="status-info">
              <h3>Ecosystem Sync</h3>
              <IdentityChip label="Chloe Sync Online" status="active" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="status-card">
          <div className="status-header">
            <Smartphone className="status-icon" size={24} />
            <div className="status-info">
              <h3>Connected Devices</h3>
              <IdentityChip label="1 Active System" status="active" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="status-card">
          <div className="status-header">
            <Cloud className="status-icon" size={24} />
            <div className="status-info">
              <h3>CHLOSE Identity</h3>
              <IdentityChip label="Identity Active" status="active" />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="main-grid">
        <GlassCard title="PLC Wallet Preview" className="span-2">
          <div className="balance-preview">
            <div className="balance-main">
              <span className="balance-amount">{wallet?.plc_balance.toLocaleString() || '0'}</span>
              <span className="unit">PLC</span>
            </div>
            <div className="balance-sub">
              ≈ ₹{(wallet?.plc_balance ? wallet.plc_balance / 1000 : 0).toFixed(2)} INR
            </div>
            <div className="balance-glow"></div>
          </div>
          <div className="wallet-footer">
            <span className="footer-text">Wallet Protected by CHLOSE Security</span>
            <button className="text-btn" onClick={() => navigate('/wallet')}>View Full Wallet →</button>
          </div>
        </GlassCard>

        <GlassCard title="Session Context" className="login-card">
          <div className="login-details">
            <div className="login-item">
              <span className="label">Identity</span>
              <span className="value">{user?.email}</span>
            </div>
            <div className="login-item">
              <span className="label">Last Activity</span>
              <span className="value">Active Now</span>
            </div>
            <div className="login-item">
              <span className="label">Ecosystem Status</span>
              <span className="value glow-text-eco">Authorized</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Overview;
