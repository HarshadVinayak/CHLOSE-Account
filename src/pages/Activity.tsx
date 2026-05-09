import React from 'react';
import GlassCard from '../components/GlassCard';
import { LogIn, PlusCircle, LayoutDashboard, ShieldCheck, User } from 'lucide-react';
import './Activity.css';

const Activity: React.FC = () => {
  const activities = [
    { 
      type: 'login', 
      title: 'Google Login Successful', 
      time: '2 hours ago', 
      date: 'Today', 
      icon: <LogIn size={18} />,
      status: 'success'
    },
    { 
      type: 'reward', 
      title: 'PLC Reward Added', 
      time: '10:30 AM', 
      date: 'Today', 
      icon: <PlusCircle size={18} />,
      status: 'reward'
    },
    { 
      type: 'access', 
      title: 'PlastiNet Accessed', 
      time: 'Yesterday, 4:20 PM', 
      date: 'Yesterday', 
      icon: <LayoutDashboard size={18} />,
      status: 'access'
    },
    { 
      type: 'security', 
      title: 'Security Sync Completed', 
      time: 'Yesterday, 9:00 AM', 
      date: 'Yesterday', 
      icon: <ShieldCheck size={18} />,
      status: 'success'
    },
    { 
      type: 'account', 
      title: 'Profile Updated', 
      time: '3 days ago', 
      date: 'May 6, 2026', 
      icon: <User size={18} />,
      status: 'success'
    },
  ];

  const groupedActivities = activities.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {} as Record<string, typeof activities>);

  return (
    <div className="page-container activity-page">
      <header className="page-header">
        <h1 className="glow-text-eco">Activity Log</h1>
        <p>A comprehensive timeline of your ecosystem interactions.</p>
      </header>

      <div className="activity-timeline">
        {Object.entries(groupedActivities).map(([date, items]) => (
          <div key={date} className="timeline-group">
            <h3 className="timeline-date">{date}</h3>
            <div className="timeline-items">
              {items.map((item, i) => (
                <GlassCard key={i} className="activity-item-card">
                  <div className={`activity-icon-box ${item.status}`}>
                    {item.icon}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{item.title}</div>
                    <div className="activity-time">{item.time}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
