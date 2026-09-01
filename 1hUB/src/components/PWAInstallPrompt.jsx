import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import Button from './Button';

const PWAInstallPrompt = ({ isSidebarCollapsed, className = "" }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detect Android device
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroidDevice = /android/.test(userAgent);
    setIsAndroid(isAndroidDevice);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Show install prompt after a delay for mobile devices
    const timer = setTimeout(() => {
      if (!deferredPrompt && !isInstalled) {
        // Show for Android or mobile devices
        const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        if (isMobile) {
          setShowInstallPrompt(true);
        }
      }
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled, isAndroid]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } else {
      // Manual installation instructions
      alert('To install this app:\n\nAndroid: Tap the menu (⋮) and select "Add to Home screen"\n\niOS: Tap the Share button and select "Add to Home Screen"');
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store dismissal in localStorage to avoid showing again for a while
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show if already installed
  if (isInstalled) return null;

  // Check if user recently dismissed
  const lastDismissed = localStorage.getItem('pwa-install-dismissed');
  if (lastDismissed && Date.now() - parseInt(lastDismissed) < 24 * 60 * 60 * 1000) {
    return null; // Don't show for 24 hours after dismissal
  }

  // Show prompt if it should be shown
  if (!showInstallPrompt) return null;

  return (
    <div className={`fixed z-50 transition-all duration-300 ${className}`}>
      {/* Desktop sidebar install button */}
      <div className="hidden md:block">
        <div className={`bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-3 transition-all duration-300 ${
          isSidebarCollapsed ? 'w-12 h-12' : 'w-full'
        }`}>
          <button
            onClick={handleInstallClick}
            className={`desktop-install-button ${
              isSidebarCollapsed 
                ? 'w-full h-full rounded-xl p-0' 
                : 'w-full px-4 py-3 rounded-xl'
            }`}
          >
            <Icon name="Download" size={isSidebarCollapsed ? 20 : 18} color="white" />
            {!isSidebarCollapsed && (
              <span className="text-sm font-medium font-['Inter']">Install App</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile install button */}
      <div className="md:hidden">
        <button
          onClick={handleInstallClick}
          className="mobile-install-button animate-bounce-in"
        >
          <Icon name="Download" size={18} color="white" />
          <span className="font-medium">Install App</span>
        </button>
      </div>

      {/* Mobile install prompt (alternative) */}
      <div className="md:hidden fixed bottom-20 left-4 right-4 animate-slide-up">
        <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="Download" size={24} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">
                Install Career Mentor
              </h3>
              <p className="text-sm text-gray-600 mt-1 font-['Inter']">
                Get quick access and work offline with our mobile app
              </p>
              <div className="flex space-x-2 mt-3">
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl px-4 py-2 text-sm font-medium"
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  Install
                </Button>
                <Button
                  onClick={handleDismiss}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl px-4 py-2 text-sm font-medium"
                >
                  Later
                </Button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
