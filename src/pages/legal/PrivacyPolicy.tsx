import React from 'react';
import { Shield, Lock, Eye, Database, Globe, UserCheck } from 'lucide-react';
import './LegalPages.css';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "May 9, 2026";

  return (
    <div className="legal-container">
      <header className="legal-hero">
        <div className="contact-icon pulse-eco">
          <Shield size={32} />
        </div>
        <h1>Privacy Policy</h1>
        <p>Your trust is our foundation. Learn how CHLOSE Ecosystem handles your data with enterprise-grade security.</p>
        <div className="user-status" style={{ marginTop: '20px' }}>Last Updated: {lastUpdated}</div>
      </header>

      <div className="glass-card legal-card">
        <section className="legal-section">
          <h2><Eye size={24} /> Overview</h2>
          <p>
            At <strong>CHLOSE</strong>, we are committed to protecting your privacy across our entire ecosystem, including 
            <strong> CHLOSE Console</strong>, <strong>PlastiNet</strong>, and <strong>Chloe AI</strong>. This policy outlines 
            how we collect, use, and safeguard your information.
          </p>
          <div className="highlight-box">
            <p><strong>Commitment:</strong> We never sell your personal data to third parties. Your information is used solely to provide and improve our environmental intelligence services.</p>
          </div>
        </section>

        <section className="legal-section">
          <h2><Database size={24} /> Information Collection</h2>
          <p>We collect information necessary to provide a unified identity and environmental tracking experience:</p>
          <ul>
            <li><strong>Authentication Data:</strong> Email address, unique user ID, and profile metadata.</li>
            <li><strong>Ecosystem Session Handling:</strong> Real-time device footprints to synchronize state across mobile, tablet, and desktop environments.</li>
            <li><strong>Wallet & PLC Data:</strong> Transaction history, PLC balances, and reward allocations within the PlastiNet economy.</li>
            <li><strong>Activity Tracking:</strong> Environmental impact logs, recycling contributions, and platform engagement metrics.</li>
            <li><strong>AI Personalization:</strong> Interaction history with Chloe AI to refine environmental mentorship and instructional workflows.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2><Globe size={24} /> Google OAuth & Authentication</h2>
          <p>
            We use Google OAuth for secure, passwordless authentication. When you sign in with Google, we access your basic 
            profile information (email and name) to create your CHLOSE Account. 
          </p>
          <p>
            Our infrastructure is powered by <strong>Supabase</strong>, ensuring your authentication data is handled 
            with industry-standard encryption and security protocols.
          </p>
        </section>

        <section className="legal-section">
          <h2><Lock size={24} /> Security Measures</h2>
          <p>
            We implement multiple layers of security to protect the CHLOSE Ecosystem:
          </p>
          <ul>
            <li><strong>End-to-End Encryption:</strong> Data in transit and at rest is encrypted using advanced cryptographic standards.</li>
            <li><strong>Secure Session Management:</strong> Real-time monitoring of device sessions to detect and prevent unauthorized access.</li>
            <li><strong>Infrastructure Isolation:</strong> Sensitive wallet and identity data are stored in isolated, high-security environments.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2><UserCheck size={24} /> User Rights & Control</h2>
          <p>You maintain full control over your data within the CHLOSE Console:</p>
          <ul>
            <li><strong>Access & Export:</strong> View and export your activity and wallet data at any time.</li>
            <li><strong>Account Deletion:</strong> Request full account deletion, which will permanently remove your data from our active ecosystem servers.</li>
            <li><strong>Local Storage:</strong> We use local storage and cookies solely for session persistence and performance optimization.</li>
          </ul>
        </section>

        <div className="support-info">
          <p>Questions about our privacy practices?</p>
          <a href="/contact" className="contact-link">Contact our Data Protection Team</a>
          <p style={{ marginTop: '10px', fontSize: '0.8rem' }}>Powered by CHLOSE Ecosystem Infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
