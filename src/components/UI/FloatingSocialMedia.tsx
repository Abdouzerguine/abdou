import React, { useState, useEffect } from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

// TikTok Icon Component
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
  </svg>
);

const FloatingSocialMedia: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { currentLanguage } = useLanguage();
  const { platformSettings } = useApp();
  const { socialMedia } = platformSettings;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const followText = currentLanguage === 'ar' ? 'لا تنسى متابعتنا' : "Don't forget to follow us";

  if (!isVisible) return null;

  return (
    <div 
      className="fixed right-6 z-40 transition-all duration-500 ease-in-out"
      style={{ 
        top: `${Math.min(300 + scrollY * 0.1, window.innerHeight - 200)}px`,
        transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)`
      }}
    >
      {/* Follow Text */}
      <div className="mb-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
        <p className={`text-sm font-medium whitespace-nowrap ${currentLanguage === 'ar' ? 'text-right' : 'text-left'}`}>
          {followText}
        </p>
      </div>

      {/* Social Media Icons */}
      <div className="flex flex-col space-y-3">
        {/* Instagram */}
        <a
          href={socialMedia.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 animate-bounce"
            style={{ animationDelay: '0s', animationDuration: '3s' }}
          >
            <Instagram className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        </a>

        {/* TikTok */}
        <a
          href={socialMedia.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 animate-bounce"
            style={{ animationDelay: '0.5s', animationDuration: '3s' }}
          >
            <TikTokIcon className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -left-2 -top-2 w-4 h-4 bg-pink-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </a>

        {/* Facebook */}
        <a
          href={socialMedia.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 animate-bounce"
            style={{ animationDelay: '1s', animationDuration: '3s' }}
          >
            <Facebook className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -left-2 -top-2 w-4 h-4 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </a>
      </div>

      {/* Floating Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingSocialMedia;