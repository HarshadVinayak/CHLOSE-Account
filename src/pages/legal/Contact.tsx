import React from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, HelpCircle, Briefcase, Code } from 'lucide-react';
import './LegalPages.css';

const Contact: React.FC = () => {
  return (
    <div className="legal-container">
      <header className="legal-hero">
        <div className="contact-icon pulse-eco">
          <MessageSquare size={32} />
        </div>
        <h1>Contact Support</h1>
        <p>Expert assistance for the CHLOSE Ecosystem. We're here to help you navigate the future of environmental intelligence.</p>
      </header>

      <div className="contact-grid">
        <div className="glass-card contact-card">
          <div className="contact-icon">
            <Mail size={24} />
          </div>
          <h3>Email Support</h3>
          <p>For general inquiries and ecosystem assistance.</p>
          <a href="mailto:support@chlose.ai" className="contact-link">support@chlose.ai</a>
          <div style={{ marginTop: '10px' }}>
            <a href="mailto:kavitha.harish86@gmail.com" className="contact-link" style={{ fontSize: '0.9rem', opacity: 0.8 }}>kavitha.harish86@gmail.com</a>
          </div>
        </div>

        <div className="glass-card contact-card">
          <div className="contact-icon">
            <Phone size={24} />
          </div>
          <h3>Direct Contact</h3>
          <p>Available for urgent technical support and WhatsApp.</p>
          <a href="tel:+919600092456" className="contact-link">+91 96000 92456</a>
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>WhatsApp & Voice Support Available</p>
        </div>

        <div className="glass-card contact-card">
          <div className="contact-icon">
            <Briefcase size={24} />
          </div>
          <h3>Business Inquiries</h3>
          <p>Partnerships, competitions, and enterprise solutions.</p>
          <a href="mailto:business@plastinet.eco" className="contact-link">business@plastinet.eco</a>
        </div>
      </div>

      <div className="glass-card legal-card" style={{ marginTop: '40px' }}>
        <section className="legal-section">
          <h2><HelpCircle size={24} /> Inquiry Categories</h2>
          <div className="contact-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: '20px' }}>
            <div className="legal-section">
              <h3>Technical Support</h3>
              <p>Platform errors, authentication issues, or API integration help.</p>
            </div>
            <div className="legal-section">
              <h3>Eco-Consultancy</h3>
              <p>Deep dives into PlastiNet workflows and Chloe AI mentorship.</p>
            </div>
            <div className="legal-section">
              <h3>Collaboration</h3>
              <p>Join our mission as an environmental partner or research contributor.</p>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2><Send size={24} /> Response Expectations</h2>
          <p>
            Our global support team monitors inquiries 24/7. 
            <strong> Standard response time:</strong> Within 12-24 hours for technical inquiries. 
            Enterprise partners receive priority routing through their dedicated console channels.
          </p>
        </section>

        <div className="support-info">
          <p>Powered by CHLOSE Ecosystem Infrastructure</p>
          <div className="promo-item" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <Code size={16} />
            <span>Infrastructure built for scale and security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
