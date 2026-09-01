import React from 'react';
import Icon from './Icon';
import Button from './Button';

const MobileNavigation = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'company', name: 'Company', icon: 'Building2' },
    { id: 'chat', name: 'AI Hub', icon: 'Grid3x3' },
    { id: 'resume', name: 'Resume', icon: 'FileText' },
    { id: 'profile', name: 'Profile', icon: 'User' }
  ];

  return (
    <div className="mobile-nav md:hidden">
      <div className="mx-auto mb-2 mt-1 flex max-w-md items-center justify-between gap-1 rounded-3xl bg-slate-900/95 px-3 py-2 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-2xl border border-slate-700/80">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-2xl transition-all duration-200 touch-target ${
              activeTab === item.id
                ? 'text-emerald-300 bg-gradient-to-b from-emerald-500/20 to-teal-500/20 shadow-md scale-105'
                : 'text-slate-200/80 hover:text-emerald-300 hover:bg-slate-800/80'
            }`}
          >
            <Icon 
              name={item.icon} 
              size={22} 
              color={activeTab === item.id ? "#34d399" : "#e5e7eb"} 
            />
            <span className="text-[11px] font-semibold mt-1 truncate max-w-[72px]">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
