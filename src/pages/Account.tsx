import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { User, Mail, MapPin, Globe, Save, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import './Account.css';

const Account: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    region: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        full_name: profile.full_name || '',
        region: profile.region || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="loading-state">
        <Loader2 className="spin" />
        <p>Syncing Profile...</p>
      </div>
    );
  }

  return (
    <div className="page-container account-page">
      <header className="page-header">
        <h1 className="glow-text-eco">Account Center</h1>
        <p>Manage your premium CHLOSE Identity and ecosystem preferences.</p>
      </header>

      <div className="account-grid">
        <GlassCard className="profile-section">
          <div className="profile-header">
            <div className="avatar-large">
              {formData.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="profile-title">
              <h2>{formData.full_name || user?.email?.split('@')[0]}</h2>
              <div className="sync-badge">
                <Globe size={14} />
                <span>Synced Across Ecosystem</span>
              </div>
            </div>
          </div>

          <div className="profile-fields">
            <div className="field-group">
              <label><User size={16} /> Username</label>
              {isEditing ? (
                <input 
                  className="field-input"
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                />
              ) : (
                <div className="field-value">{formData.username || 'Not set'}</div>
              )}
            </div>
            <div className="field-group">
              <label><Mail size={16} /> Email Address</label>
              <div className="field-value disabled">{user?.email}</div>
            </div>
            <div className="field-group">
              <label><User size={16} /> Full Name</label>
              {isEditing ? (
                <input 
                  className="field-input"
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                />
              ) : (
                <div className="field-value">{formData.full_name || 'Not set'}</div>
              )}
            </div>
            <div className="field-group">
              <label><MapPin size={16} /> Region</label>
              {isEditing ? (
                <input 
                  className="field-input"
                  value={formData.region}
                  onChange={e => setFormData({...formData, region: e.target.value})}
                  placeholder="e.g. Bangalore, India"
                />
              ) : (
                <div className="field-value">{formData.region || 'Not set'}</div>
              )}
            </div>
          </div>

          {isEditing ? (
            <button className="save-btn" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
              Save Changes
            </button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </GlassCard>

        <div className="side-column">
          <GlassCard title="Connected Providers" className="providers-card">
            <div className="provider-list">
              <div className="provider-item active">
                <img src="https://www.google.com/favicon.ico" alt="Google" width={20} />
                <div className="provider-info">
                  <span className="provider-name">Google</span>
                  <span className="provider-status">Connected</span>
                </div>
              </div>
              {/* Other providers */}
              <div className="provider-item disabled">
                <span className="apple-icon"></span>
                <div className="provider-info">
                  <span className="provider-name">Apple</span>
                  <span className="provider-status">Coming Soon</span>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Account Preferences" className="prefs-card">
            <div className="prefs-list">
              <div className="pref-item">
                <span>Ecosystem Notifications</span>
                <div className="toggle active"></div>
              </div>
              <div className="pref-item">
                <span>Data Sync Sharing</span>
                <div className="toggle active"></div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Account;
