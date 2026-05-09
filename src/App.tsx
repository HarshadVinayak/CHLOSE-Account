import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Account from './pages/Account';
import Security from './pages/Security';
import Wallet from './pages/Wallet';
import ConnectedApps from './pages/ConnectedApps';
import Activity from './pages/Activity';
import Login from './pages/Login';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsConditions from './pages/legal/TermsConditions';
import Contact from './pages/legal/Contact';
import RefundPolicy from './pages/legal/RefundPolicy';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Ecosystem Routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="layout-container">
                <Sidebar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/apps" element={<ConnectedApps />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsConditions />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/refund" element={<RefundPolicy />} />
                  </Routes>
                </main>
                
                {/* Floating Background Particles */}
                <div className="particles-container">
                  <div className="particle p1"></div>
                  <div className="particle p2"></div>
                  <div className="particle p3"></div>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
