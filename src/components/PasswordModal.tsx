import React, { useState } from 'react';
import { Lock, ShieldCheck, X, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './PasswordModal.css';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Supabase updateUser only needs the new password if the user is already authenticated.
      // However, to be extra secure, we can re-authenticate or just perform the update.
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card password-modal">
        <div className="modal-header">
          <div className="header-title">
            <Lock size={20} className="eco" />
            <h3>Update Password</h3>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {success ? (
          <div className="success-state">
            <ShieldCheck size={48} className="eco" />
            <p>Password updated successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="modal-desc">Ensure your account stays secure with a strong password.</p>
            
            {error && (
              <div className="modal-error">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <div className="input-field">
              <label>Current Password</label>
              <input 
                type="password" 
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="input-field">
              <label>New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="input-field">
              <label>Confirm New Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="update-submit-btn" disabled={loading}>
              {loading ? <Loader2 className="spin" size={18} /> : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordModal;
