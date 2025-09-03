import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Globe, ShoppingCart, Moon, Sun, ChevronDown } from 'lucide-react';
import { useLanguage, useTranslation } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { Language } from '../../types';
import { categories } from '../../data/mockData';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isStoresMenuOpen, setIsStoresMenuOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { getTotalItems, setIsCartOpen } = useCart();
  const searchPlaceholder = useTranslation('search_placeholder');

  const totalItems = getTotalItems();

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇩🇿' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' }
  ];

  const getTranslatedText = (key: string) => {
    const translations = {
      'stores': {
        en: 'Stores',
        ar: 'المتاجر',
        fr: 'Magasins'
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
      'light_mode': {
        en: 'Light Mode',
        ar: 'الوضع الفاتح',
        fr: 'Mode Clair'
      },
      'dark_mode': {
        en: 'Dark Mode',
        ar: 'الوضع الداكن',
        fr: 'Mode Sombre'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 transition-all duration-500 border-b border-white/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with 3D effect */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <img 
                src="/1751431085937.png" 
                alt="Tiny Treasure Logo" 
                className="w-10 h-10 object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent group-hover:from-teal-500 group-hover:to-blue-500 transition-all duration-300">
              Tiny Treasure
            </span>
          </Link>

          {/* Search Bar - Desktop with water effect */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 focus:shadow-xl focus:shadow-teal-500/30"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-teal-500 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Navigation with 3D effects */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Categories Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsCategoriesMenuOpen(true)}
              onMouseLeave={() => setIsCategoriesMenuOpen(false)}
            >
              <Link 
                to="/categories" 
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-all duration-300 transform hover:scale-105 hover:drop-shadow-lg"
              >
                <span>{getTranslatedText('categories')}</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
              {isCategoriesMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/20 py-2 z-50 transform transition-all duration-300 animate-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b dark:border-gray-700/50">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Shop by Category</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {categories.slice(0, 8).map((category) => (
                      <Link
                        key={category.id}
                        to={`/categories?category=${category.name.toLowerCase()}`}
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-teal-50/50 dark:hover:bg-teal-900/20 rounded-lg transition-all duration-200 hover:scale-105 hover:translate-x-1"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t dark:border-gray-700/50 pt-2">
                    <Link to="/categories" className="block px-4 py-2 text-sm text-teal-600 dark:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-900/20 font-medium transition-all duration-200 hover:translate-x-1">
                      View All Categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-all duration-300 transform hover:scale-105 hover:drop-shadow-lg">
              {getTranslatedText('about_us')}
            </Link>
            <Link to="/help" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-all duration-300 transform hover:scale-105 hover:drop-shadow-lg">
              {getTranslatedText('help_center')}
            </Link>
            
            {/* Dark Mode Toggle with 3D effect */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:shadow-lg"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {/* Language Selector with water effect */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 transform hover:scale-105 hover:drop-shadow-lg"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl py-1 z-10 border border-white/20 dark:border-gray-700/20 transform transition-all duration-300 animate-in slide-in-from-top-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm w-full text-left hover:bg-teal-50/50 dark:hover:bg-teal-900/20 transition-all duration-200 hover:translate-x-1 ${
                        currentLanguage === lang.code ? 'bg-teal-50/70 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Cart with ripple effect */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 transform hover:scale-110 hover:drop-shadow-lg group"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse shadow-lg">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 pointer-events-none"></div>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-110"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative group">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-teal-500 transition-colors duration-300" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 transform transition-all duration-300 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
              <Link to="/categories" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-all duration-200 hover:translate-x-2">
                {getTranslatedText('categories')}
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-all duration-200 hover:translate-x-2">
                {getTranslatedText('about_us')}
              </Link>
              <Link to="/help" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-all duration-200 hover:translate-x-2">
                {getTranslatedText('help_center')}
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-all duration-200"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span>{isDarkMode ? getTranslatedText('light_mode') : getTranslatedText('dark_mode')}</span>
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;