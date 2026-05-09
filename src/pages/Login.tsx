import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { Shield, Globe, Mail, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const location = useLocation();
  
  // Get redirection path from state or query params
  const from = (location.state as any)?.from?.pathname || '/';
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirectTo') || from;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + redirectTo
      }
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + redirectTo,
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="glow-orb eco"></div>
        <div className="glow-orb blue"></div>
      </div>

      <div className="login-card-wrapper">
        <div className="login-logo">
          <div className="logo-glow"></div>
          <span className="logo-text">CHLOSE</span>
          <span className="logo-subtext">IDENTITY</span>
        </div>

        <GlassCard className="login-form-card">
          {sent ? (
            <div className="sent-state">
              <CheckCircle2 size={48} className="eco" />
              <h2 className="login-title">Identity Link Sent</h2>
              <p className="login-subtitle">
                We've sent a secure authentication setup link to <strong>{email}</strong>. 
                Please check your inbox to provision your CHLOSE Account.
              </p>
              <button className="secondary-btn" onClick={() => setSent(false)}>
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              <h2 className="login-title">Identity Setup</h2>
              <p className="login-subtitle">One Account for PlastiNet, Chloe AI, and the Ecosystem.</p>

              {error && (
                <div className="auth-error">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button 
                className="google-login-btn" 
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" width={18} />
                {loading ? 'Processing...' : 'Continue with Google'}
              </button>

              <div className="divider">
                <span>OR</span>
              </div>

              <form onSubmit={handleMagicLinkLogin}>
                <div className="input-group">
                  <Mail size={18} />
                  <input 
                    type="email" 
                    placeholder="Enter your Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    disabled={loading}
                  />
                </div>

                <p className="auth-note">
                  No password required. We'll send a secure link to your email to set up or access your account.
                </p>

                <button 
                  type="submit" 
                  className="login-submit-btn"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="spin" size={18} /> : 'Send Identity Link'}
                </button>
              </form>
            </>
          )}

          <div className="login-footer">
            <span className="trust-indicator">
              <Shield size={14} />
              Secured by CHLOSE Trust Layer
            </span>
          </div>
        </GlassCard>

        <div className="login-promo">
          <div className="promo-item">
            <Globe size={16} />
            <span>Unified Ecosystem Account</span>
          </div>
          <div className="promo-item">
            <Shield size={16} />
            <span>Secure Passwordless Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
