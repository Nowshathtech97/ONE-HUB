import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import Button from './Button';

const Sidebar = ({ isCollapsed, activeTab, setActiveTab, userProfile, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    // Check if we're on a mobile device
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    if (!isMobile) {
      alert('This app is designed for mobile devices. Please open this page on your mobile device to install the app.');
      return;
    }

    if (deferredPrompt) {
      try {
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
          // Show success message
          alert('🎉 App installation started! Check your device for installation progress.');
        } else {
          console.log('User dismissed the install prompt');
          // Show manual installation instructions
          showManualInstallInstructions();
        }
        
        setDeferredPrompt(null);
      } catch (error) {
        console.error('Error during installation:', error);
        showManualInstallInstructions();
      }
    } else {
      // Manual installation instructions for devices that don't support beforeinstallprompt
      showManualInstallInstructions();
    }
  };

  const showManualInstallInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    if (isAndroid) {
      alert('📱 To install this app on Android:\n\n1. Tap the menu button (⋮) in your browser\n2. Select "Add to Home screen" or "Install app"\n3. Follow the prompts to install\n\n💡 The app will work offline after installation!');
    } else if (isIOS) {
      alert('📱 To install this app on iOS:\n\n1. Tap the Share button (⬆️) in Safari\n2. Scroll down and select "Add to Home Screen"\n3. Tap "Add" to install\n\n💡 The app will work offline after installation!');
    } else {
      alert('📱 To install this app:\n\nAndroid: Tap the menu (⋮) and select "Add to Home screen"\n\niOS: Tap the Share button and select "Add to Home Screen"\n\n💡 The app will work offline after installation!');
    }
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard', active: activeTab === 'dashboard' },
    { id: 'company', name: 'Company', icon: 'Building2', active: activeTab === 'company' },
    { id: 'courses', name: 'Courses', icon: 'BookOpen', active: activeTab === 'courses' },
    { id: 'internships', name: 'Internships', icon: 'Briefcase', active: activeTab === 'internships' },
    { id: 'chat', name: 'AI Hub', icon: 'Grid3x3', active: activeTab === 'chat', accent: 'aiHub' },
    { id: 'resume', name: 'Resume Analysis', icon: 'FileText', active: activeTab === 'resume' },
    { id: 'progress', name: 'Progress', icon: 'TrendingUp', active: activeTab === 'progress' },
    { id: 'profile', name: 'Profile', icon: 'User', active: activeTab === 'profile' },
    { id: 'settings', name: 'Settings', icon: 'Settings', active: activeTab === 'settings' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="mobile-sidebar-overlay md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed left-3 top-4 bottom-4 w-[250px] md:w-[270px] bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_18px_40px_rgba(15,23,42,0.16)] rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] z-50 sidebar-container overflow-y-auto flex flex-col ${
          isCollapsed ? '-translate-x-full opacity-0 scale-95' : 'translate-x-0 opacity-100 scale-100'
        }`}
      >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm"
        >
          <Icon name="X" size={16} color="#6B7280" />
        </button>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-white/10 animate-slide-in-left">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg animate-float-slow hover:animate-pulse-glow group">
            <span className="text-white text-xl font-bold group-hover:animate-wiggle">
              {userProfile?.name?.charAt(0) || 'A'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 animate-slide-in-right">
              <h3 className="font-bold text-gray-900 truncate text-lg font-['Poppins']">{userProfile?.name || 'Alex Johnson'}</h3>
              <p className="text-sm text-gray-600 truncate font-['Inter']">{userProfile?.currentRole || 'Computer Science Student'}</p>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse animate-heartbeat"></div>
                <span className="text-xs text-gray-600 font-medium">Online</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 pb-6 pt-3 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              // Close sidebar on mobile after selection
              if (window.innerWidth < 768) {
                onClose();
              }
            }}
            className={`w-full flex items-center space-x-4 px-3.5 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 touch-target animate-slide-in-left group ${
              item.active
                ? item.accent === 'aiHub'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-[1.04]'
                  : 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg transform scale-[1.04]'
                : 'text-slate-700/90 bg-white/5 hover:bg-slate-900/5 hover:text-slate-900 hover:shadow-md hover:scale-[1.02] hover:-translate-y-[2px] border border-transparent hover:border-slate-200/80'
            }`}
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <Icon
              name={item.icon}
              size={20}
              color={item.active ? 'white' : item.accent === 'aiHub' ? '#059669' : '#6B7280'}
              className="group-hover:animate-wiggle"
            />
            {!isCollapsed && <span className="font-['Inter']">{item.name}</span>}
          </button>
        ))}
      </nav>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="mt-6 mx-4 p-6 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 rounded-2xl border border-slate-700/70 text-slate-50 animate-slide-in-left">
          <h4 className="text-lg font-bold mb-4 font-['Poppins'] flex items-center">
            <span className="w-2 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full mr-3 animate-pulse-glow"></span>
            Your Progress
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200 font-medium">Courses Completed</span>
              <span className="font-bold text-emerald-300 animate-heartbeat">12/20</span>
            </div>
            <div className="w-full bg-slate-900/70 rounded-full h-3 shadow-inner">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full shadow-lg animate-gradient-shift" style={{ width: '60%' }}></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200 font-medium">Skills Learned</span>
              <span className="font-bold text-sky-300 animate-heartbeat">18</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200 font-medium">Certificates</span>
              <span className="font-bold text-amber-300 animate-heartbeat">5</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Section - Fixed at bottom */}
      <div className="mt-auto p-4 space-y-4">
        {/* Install Button */}
        {!isCollapsed && !isInstalled && (
          <div className="animate-slide-up-bounce">
            <button 
              onClick={handleInstallClick}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center space-x-2 touch-target animate-pulse-glow group"
            >
              <Icon name="Download" size={18} color="white" className="group-hover:animate-wiggle" />
              <span className="font-medium">📱 Install Mobile App</span>
            </button>
          </div>
        )}

        {/* Installed Status */}
        {!isCollapsed && isInstalled && (
          <div className="animate-slide-up-bounce">
            <div className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-2xl font-semibold shadow-lg flex items-center justify-center space-x-2 animate-pulse-glow">
              <Icon name="CheckCircle" size={18} color="white" className="animate-heartbeat" />
              <span className="font-medium">App Installed ✓</span>
            </div>
          </div>
        )}

        {/* Footer */}
        {!isCollapsed && (
          <div className="animate-slide-up-bounce" style={{animationDelay: '0.2s'}}>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center space-x-3 text-sm text-purple-700">
                <Icon name="HelpCircle" size={18} color="#7c3aed" className="group-hover:animate-wiggle" />
                <span className="font-medium">Need help? Contact support</span>
              </div>
            </div>
          </div>
        )}
      </div>


    </aside>
    </>
  );
};

export default Sidebar;
