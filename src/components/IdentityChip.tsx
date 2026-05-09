import React from 'react';
import { CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';
import './IdentityChip.css';

interface IdentityChipProps {
  label: string;
  status: 'active' | 'syncing' | 'warning';
}

const IdentityChip: React.FC<IdentityChipProps> = ({ label, status }) => {
  const getIcon = () => {
    switch (status) {
      case 'active': return <CheckCircle2 size={14} />;
      case 'syncing': return <RefreshCcw size={14} className="spin" />;
      case 'warning': return <AlertCircle size={14} />;
    }
  };

  return (
    <div className={`identity-chip ${status}`}>
      <span className="chip-icon">{getIcon()}</span>
      <span className="chip-label">{label}</span>
      {status === 'active' && <div className="chip-pulse"></div>}
    </div>
  );
};

export default IdentityChip;
