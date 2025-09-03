import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';

// TikTok Icon Component
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
  </svg>
);

const Footer: React.FC = () => {
  const { platformSettings } = useApp();
  const { currentLanguage } = useLanguage();
  const { socialMedia } = platformSettings;

  const getTranslatedText = (key: string) => {
    const translations = {
      'about_description': {
        en: "Algeria's premier multi-vendor marketplace connecting local businesses with customers across all 58 states.",
        ar: 'السوق الرائد متعدد البائعين في الجزائر الذي يربط الشركات المحلية بالعملاء في جميع الولايات الـ 58.',
        fr: 'Le marché multi-vendeurs de premier plan en Algérie qui connecte les entreprises locales avec les clients dans les 58 wilayas.'
      },
      'quick_links': {
        en: 'Quick Links',
        ar: 'روابط سريعة',
        fr: 'Liens Rapides'
      },
      'all_stores': {
        en: 'All Stores',
        ar: 'جميع المتاجر',
        fr: 'Tous les Magasins'
      },
      'categories': {
        en: 'Categories',
        ar: 'الفئات',
        fr: 'Catégories'
      },
      'about_us': {
        en: 'About Us',
        ar: 'من نحن',
        fr: 'À Propos'
      },
      'help_center': {
        en: 'Help Center',
        ar: 'مركز المساعدة',
        fr: 'Centre d\'Aide'
      },
      'customer_support': {
        en: 'Customer Support',
        ar: 'دعم العملاء',
        fr: 'Support Client'
      },
      'faq': {
        en: 'FAQ',
        ar: 'الأسئلة الشائعة',
        fr: 'FAQ'
      },
      'contact_support': {
        en: 'Contact Support',
        ar: 'اتصل بالدعم',
        fr: 'Contacter le Support'
      },
      'policies': {
        en: 'Policies',
        ar: 'السياسات',
        fr: 'Politiques'
      },
      'contact_us': {
        en: 'Contact Us',
        ar: 'اتصل بنا',
        fr: 'Contactez-nous'
      },
      'privacy_policy': {
        en: 'Privacy Policy',
        ar: 'سياسة الخصوصية',
        fr: 'Politique de Confidentialité'
      },
      'terms_of_service': {
        en: 'Terms of Service',
        ar: 'شروط الخدمة',
        fr: 'Conditions de Service'
      },
      'all_rights_reserved': {
        en: 'All rights reserved.',
        ar: 'جميع الحقوق محفوظة.',
        fr: 'Tous droits réservés.'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white transition-all duration-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="relative">
                <img 
                  src="/1751431085937.png" 
                  alt="Tiny Treasure Logo" 
                  className="w-8 h-8 object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Tiny Treasure
              </span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-4 leading-relaxed">
              {getTranslatedText('about_description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href={socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-all duration-300 transform hover:scale-125 hover:rotate-12 hover:drop-shadow-lg"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={socialMedia.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 cursor-pointer transition-all duration-300 transform hover:scale-125 hover:rotate-12 hover:drop-shadow-lg"
              >
                <TikTokIcon />
              </a>
              <a 
                href={socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-500 hover:text-pink-400 dark:hover:text-pink-300 cursor-pointer transition-all duration-300 transform hover:scale-125 hover:rotate-12 hover:drop-shadow-lg"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="transform transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              {getTranslatedText('quick_links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/stores" 
                  className="text-gray-300 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 hover:translate-x-2 hover:drop-shadow-lg block"
                >
                  {getTranslatedText('all_stores')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className="text-gray-300 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 hover:translate-x-2 hover:drop-shadow-lg block"
                >
                  {getTranslatedText('categories')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 hover:translate-x-2 hover:drop-shadow-lg block"
                >
                  {getTranslatedText('about_us')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-300 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 hover:translate-x-2 hover:drop-shadow-lg block"
                >
                  {getTranslatedText('help_center')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="transform transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              {getTranslatedText('customer_support')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-300 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 hover:translate-x-2 hover:drop-shadow-lg block"
                >
                  {getTranslatedText('faq')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/help#contact" 
                  className="text-gray-300 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 hover:translate-x-2 hover:drop-shadow-lg block"
                >
                  {getTranslatedText('contact_support')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/policies" 
                  className="text-gray-300 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 hover:translate-x-2 hover:drop-shadow-lg block"
                >
                  {getTranslatedText('policies')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="transform transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              {getTranslatedText('contact_us')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-teal-400 group-hover:scale-125 transition-transform duration-300" />
                <a 
                  href={`mailto:${socialMedia.email}`}
                  className="text-gray-300 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 hover:translate-x-1"
                >
                  {socialMedia.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-teal-400 group-hover:scale-125 transition-transform duration-300" />
                <a 
                  href={`tel:${socialMedia.phone}`}
                  className="text-gray-300 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 hover:translate-x-1"
                >
                  {socialMedia.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <MapPin className="h-5 w-5 text-teal-400 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-gray-300 dark:text-gray-400">Algiers, Algeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 transition-all duration-300 hover:text-gray-300">
            © 2025 Tiny Treasure. {getTranslatedText('all_rights_reserved')} | 
            <Link 
              to="/privacy" 
              className="hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 ml-1 hover:underline"
            >
              {getTranslatedText('privacy_policy')}
            </Link> | 
            <Link 
              to="/terms" 
              className="hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 ml-1 hover:underline"
            >
              {getTranslatedText('terms_of_service')}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;