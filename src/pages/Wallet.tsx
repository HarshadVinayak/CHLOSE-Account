import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { TrendingUp, ArrowDownLeft, ArrowUpRight, Leaf, ShieldCheck, Loader2, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { useActivity } from '../hooks/useActivity';
import { supabase } from '../lib/supabase';
import { useRazorpay } from 'react-razorpay';
import './Wallet.css';

const Wallet: React.FC = () => {
  const { user } = useAuth();
  const { wallet, loading, refresh } = useProfile();
  const { logActivity } = useActivity();
  const [transactions, setTransactions] = useState<any[]>([]);
  const { Razorpay } = useRazorpay();

  const fetchTransactions = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error) setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const handleRazorpayPayment = async () => {
    const amount = 500; // ₹500 top-up
    
    const options: any = {
      key: "rzp_test_placeholder", 
      amount: amount * 100,
      currency: "INR",
      name: "CHLOSE Ecosystem",
      description: "PLC Eco Top-up",
      handler: async (response: any) => {
        if (response.razorpay_payment_id) {
          const plcGain = amount * 1000;
          
          await supabase.from('transactions').insert({
            user_id: user?.id,
            type: 'in',
            amount: `+${plcGain} PLC`,
            description: `RazorPay Top-up (${response.razorpay_payment_id})`,
            status: 'Completed'
          });

          if (wallet) {
            await supabase.from('wallets')
              .update({ plc_balance: wallet.plc_balance + plcGain })
              .eq('id', user?.id);
          }

          await logActivity(`Wallet Credited: ${plcGain} PLC`, 'verified');
          refresh();
          fetchTransactions();
        }
      },
      prefill: {
        name: user?.user_metadata.full_name || "CHLOSE User",
        email: user?.email,
      },
      theme: {
        color: "#00ff9d",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  if (loading && !wallet) {
    return (
      <div className="loading-state">
        <Loader2 className="spin" />
        <p>Syncing Financial Layer...</p>
      </div>
    );
  }

  return (
    <div className="page-container wallet-page">
      <header className="page-header">
        <h1 className="glow-text-eco">PLC Wallet</h1>
        <p>Environmental contribution wallet for the CHLOSE ecosystem.</p>
      </header>

      <div className="wallet-grid">
        <GlassCard className="balance-hero">
          <div className="balance-content">
            <div className="balance-label">Total PLC Balance</div>
            <div className="balance-value-main">
              <span className="amount">{wallet?.plc_balance.toLocaleString() || '0'}</span>
              <span className="unit">PLC</span>
            </div>
            <div className="balance-fiat">
              ≈ <IndianRupee size={16} /> {(wallet?.plc_balance ? wallet.plc_balance / 1000 : 0).toFixed(2)} INR
            </div>
            
            <div className="action-buttons">
              <button className="primary-btn" onClick={handleRazorpayPayment}>
                Top Up PLC
              </button>
              <button className="secondary-btn" onClick={() => logActivity('Transfer Initiated')}>Transfer PLC</button>
            </div>
          </div>
          <div className="hero-glow"></div>
        </GlassCard>

        <div className="metrics-grid">
          <GlassCard className="metric-card">
            <Leaf className="eco" size={24} />
            <div className="metric-info">
              <span className="metric-label">Environmental Impact</span>
              <span className="metric-value">{wallet?.environmental_impact || 0} KG Plastic</span>
              <span className="metric-sub">Verified Reprocessing</span>
            </div>
          </GlassCard>
          
          <GlassCard className="metric-card">
            <TrendingUp className="blue" size={24} />
            <div className="metric-info">
              <span className="metric-label">Real-Time Earnings</span>
              <span className="metric-value">
                {transactions.filter(t => t.type === 'in').length > 0 ? 
                  `+${transactions.filter(t => t.type === 'in').reduce((acc, t) => acc + parseInt(t.amount.replace(/\D/g,'')), 0).toLocaleString()} PLC` : 
                  '0 PLC'}
              </span>
              <span className="metric-sub">Total Ecosystem Gains</span>
            </div>
          </GlassCard>
        </div>

        <GlassCard title="Real-Time Transaction Ledger" className="transactions-card">
          <div className="transaction-list">
            {transactions.length > 0 ? transactions.map((tx, i) => (
              <div key={i} className="transaction-item">
                <div className={`tx-icon ${tx.type}`}>
                  {tx.type === 'in' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div className="tx-details">
                  <div className="tx-desc">{tx.description}</div>
                  <div className="tx-time">{new Date(tx.created_at).toLocaleString()}</div>
                </div>
                <div className={`tx-amount ${tx.type}`}>{tx.amount}</div>
                <div className="tx-status">{tx.status}</div>
              </div>
            )) : (
              <p className="no-transactions">No ledger activity found for this identity.</p>
            )}
          </div>
        </GlassCard>

        <div className="wallet-security glass-card">
          <ShieldCheck size={20} className="eco" />
          <span>Secured by CHLOSE End-to-End Infrastructure</span>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
