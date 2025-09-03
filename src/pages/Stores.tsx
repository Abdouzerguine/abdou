import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Package } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
// import StoreCard from '../components/UI/StoreCard';
import { categories } from '../data/mockData';

const Stores: React.FC = () => {
  const { stores, products } = useApp();
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || store.category === selectedCategory;
    return matchesSearch && matchesCategory && store.isActive;
  });

  const getTranslatedText = (key: string) => {
    const translations = {
      'our_stores': {
        en: 'Our Stores',
        ar: 'متاجرنا',
        fr: 'Nos Magasins'
      },
      'discover_stores': {
        en: 'Discover amazing local businesses across Algeria',
        ar: 'اكتشف الأعمال المحلية المذهلة في جميع أنحاء الجزائر',
        fr: 'Découvrez d\'incroyables entreprises locales à travers l\'Algérie'
      },
      'search_stores': {
        en: 'Search stores...',
        ar: 'البحث في المتاجر...',
        fr: 'Rechercher des magasins...'
      },
      'all_categories': {
        en: 'All Categories',
        ar: 'جميع الفئات',
        fr: 'Toutes les Catégories'
      },
      'stores_found': {
        en: 'stores found',
        ar: 'متجر موجود',
        fr: 'magasins trouvés'
      },
      'no_stores': {
        en: 'No stores found',
        ar: 'لم يتم العثور على متاجر',
        fr: 'Aucun magasin trouvé'
      },
      'featured_stores': {
        en: 'Featured Stores',
        ar: 'المتاجر المميزة',
        fr: 'Magasins en Vedette'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {getTranslatedText('our_stores')}
          </h1>
          <p className="text-xl text-teal-100 dark:text-teal-200 mb-8">
            {getTranslatedText('discover_stores')}
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={getTranslatedText('search_stores')}
                className="w-full pl-10 pr-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-600 focus:outline-none border-0"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-600 focus:outline-none border-0"
            >
              <option value="all">{getTranslatedText('all_categories')}</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-12 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                {stores.filter(s => s.isActive).length}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Active Stores</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">58</div>
              <div className="text-gray-600 dark:text-gray-400">Wilayas Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getTranslatedText('featured_stores')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredStores.length} {getTranslatedText('stores_found')}
            </p>
          </div>
        </div>

        {filteredStores.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {getTranslatedText('no_stores')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or browse all categories
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => {
              const productCount = products.filter(p => p.storeId === store.id && p.isActive).length;
              return (
                {/* StoreCard removed: now single store setup */}
              );
            })}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find stores specializing in what you need
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => {
              const categoryStores = stores.filter(s => s.category === category.name && s.isActive).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className="group p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900 transition-colors text-center"
                >
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-200 dark:group-hover:bg-teal-700 transition-colors">
                    <span className="text-teal-600 dark:text-teal-400 text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {categoryStores} stores
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;