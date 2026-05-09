import React from 'react';
import { RefreshCcw, XCircle, CreditCard, Award, ShieldAlert } from 'lucide-react';
import './LegalPages.css';

const RefundPolicy: React.FC = () => {
  return (
    <div className="legal-container">
      <header className="legal-hero">
        <div className="contact-icon pulse-eco">
          <RefreshCcw size={32} />
        </div>
        <h1>Refund & Cancellation</h1>
        <p>Transparent policies for a sustainable relationship. Managed directly through your CHLOSE Console.</p>
      </header>

      <div className="glass-card legal-card">
        <section className="legal-section">
          <h2><Award size={24} /> Subscription Tiers</h2>
          <div className="contact-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginTop: '20px' }}>
            <div className="highlight-box">
              <h3 style={{ marginTop: 0 }}>Bronze</h3>
              <p>Free Tier</p>
              <p style={{ fontSize: '0.8rem' }}>Baseline ecosystem access and community features.</p>
            </div>
            <div className="highlight-box" style={{ borderColor: 'var(--accent-blue)' }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent-blue)' }}>Silver</h3>
              <p>Premium Individual</p>
              <p style={{ fontSize: '0.8rem' }}>Advanced AI mentorship and enhanced PLC multipliers.</p>
            </div>
            <div className="highlight-box" style={{ borderColor: 'gold' }}>
              <h3 style={{ marginTop: 0, color: 'gold' }}>Gold</h3>
              <p>Enterprise / Professional</p>
              <p style={{ fontSize: '0.8rem' }}>Full architecture access, priority support, and multi-node sync.</p>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2><XCircle size={24} /> Cancellation Policy</h2>
          <p>
            We believe in total flexibility. You can cancel your paid subscription (Silver or Gold) at any time 
            directly through the <strong>Subscription Management</strong> section of your Account page.
          </p>
          <ul>
            <li><strong>Immediate Effect:</strong> Your cancellation will take effect at the end of the current billing cycle.</li>
            <li><strong>Access Preservation:</strong> You will maintain full access to all tier-specific features until the expiry of your prepaid period.</li>
            <li><strong>No Cancellation Fees:</strong> We do not charge fees for downgrading or canceling your plan.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2><CreditCard size={24} /> Refund Eligibility</h2>
          <p>
            Refunds are handled on a case-by-case basis to ensure fairness and prevent platform abuse:
          </p>
          <ul>
            <li><strong>Payment Stage:</strong> Refund requests made within 24-48 hours of a recurring charge may be eligible for a full or partial credit depending on usage.</li>
            <li><strong>Fraud Prevention:</strong> Any accounts flagged for fraudulent activity or ecosystem abuse will void all refund eligibility.</li>
            <li><strong>Pro-rated Credits:</strong> In certain cases, we may offer pro-rated platform credits instead of direct refunds to your payment method.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2><ShieldAlert size={24} /> PLC & Wallet Balances</h2>
          <p>
            Please note the following regarding your ecosystem rewards:
          </p>
          <div className="highlight-box">
            <p><strong>Non-Refundable:</strong> PLC (PlastiNet Ledger Credits) balances are earned rewards and have no cash value. They are non-transferable and non-refundable upon account cancellation or deletion.</p>
          </div>
        </section>

        <div className="support-info">
          <p>Need assistance with a billing issue?</p>
          <a href="/contact" className="contact-link">Contact Billing Support</a>
          <p style={{ marginTop: '10px', fontSize: '0.8rem' }}>Powered by CHLOSE Ecosystem Infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
