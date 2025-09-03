import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/UI/ProductCard';
import { categories } from '../data/mockData';

const Categories: React.FC = () => {
  const { stores, products } = useApp();
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchesPrice = (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseInt(priceRange.max));
      
      return matchesSearch && matchesCategory && matchesPrice && product.isActive;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const getTranslatedText = (key: string) => {
    const translations = {
      'product_catalog': {
        en: 'Product Catalog',
        ar: 'كتالوج المنتجات',
        fr: 'Catalogue de Produits'
      },
      'search_products': {
        en: 'Search products...',
        ar: 'البحث عن المنتجات...',
        fr: 'Rechercher des produits...'
      },
      'all_categories': {
        en: 'All Categories',
        ar: 'جميع الفئات',
        fr: 'Toutes les Catégories'
      },
      'filters': {
        en: 'Filters',
        ar: 'المرشحات',
        fr: 'Filtres'
      },
      'price_range': {
        en: 'Price Range',
        ar: 'نطاق السعر',
        fr: 'Gamme de Prix'
      },
      'sort_by': {
        en: 'Sort by',
        ar: 'ترتيب حسب',
        fr: 'Trier par'
      },
      'newest_first': {
        en: 'Newest First',
        ar: 'الأحدث أولاً',
        fr: 'Plus Récent'
      },
      'price_low_high': {
        en: 'Price: Low to High',
        ar: 'السعر: من الأقل للأعلى',
        fr: 'Prix: Croissant'
      },
      'price_high_low': {
        en: 'Price: High to Low',
        ar: 'السعر: من الأعلى للأقل',
        fr: 'Prix: Décroissant'
      },
      'name_az': {
        en: 'Name: A-Z',
        ar: 'الاسم: أ-ي',
        fr: 'Nom: A-Z'
      },
      'products_found': {
        en: 'products found',
        ar: 'منتج موجود',
        fr: 'produits trouvés'
      },
      'no_products': {
        en: 'No products found',
        ar: 'لم يتم العثور على منتجات',
        fr: 'Aucun produit trouvé'
      },
      'clear_filters': {
        en: 'Clear all filters',
        ar: 'مسح جميع المرشحات',
        fr: 'Effacer tous les filtres'
      },
      'try_adjusting_search': {
        en: 'Try adjusting your search criteria or browse our categories',
        ar: 'حاول تعديل معايير البحث أو تصفح فئاتنا',
        fr: 'Essayez d\'ajuster vos critères de recherche ou parcourez nos catégories'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {getTranslatedText('product_catalog')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {filteredProducts.length} {getTranslatedText('products_found')}
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={getTranslatedText('search_products')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {getTranslatedText('filters')}
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {getTranslatedText('all_categories')}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">{getTranslatedText('all_categories')}</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {getTranslatedText('price_range')} (DA)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {getTranslatedText('sort_by')}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="newest">{getTranslatedText('newest_first')}</option>
                    <option value="price-low">{getTranslatedText('price_low_high')}</option>
                    <option value="price-high">{getTranslatedText('price_high_low')}</option>
                    <option value="name">{getTranslatedText('name_az')}</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  {getTranslatedText('clear_filters')}
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400' 
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400' 
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {getTranslatedText('no_products')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search criteria or browse our categories
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  {getTranslatedText('clear_filters')}
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => {
                  const store = stores.find(s => s.id === product.storeId);
                  return store ? (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      store={store}
                    />
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;