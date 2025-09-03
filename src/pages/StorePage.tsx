import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Star, Package, Truck, Shield, Filter, Grid, List, Search, X, Facebook, Instagram } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/UI/ProductCard';

// TikTok Icon Component
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
  </svg>
);

const StorePage: React.FC = () => {
  const { storeName, category } = useParams();
  const { stores, products, platformSettings } = useApp();
  const { currentLanguage } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Find the store by name and category
  const store = stores.find(s => 
    s.name.toLowerCase().replace(/\s+/g, '-') === storeName &&
    s.category.toLowerCase() === category
  );

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <button
            onClick={() => window.history.back()}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Store Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The store you're looking for doesn't exist.</p>
          <Link to="/stores" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
            Browse All Stores
          </Link>
        </div>
      </div>
    );
  }

  // Get store products
  const storeProducts = products.filter(p => p.storeId === store.id && p.isActive);
  
  // Filter and sort products
  const filteredProducts = storeProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
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
      'back_to_stores': {
        en: 'Back to Stores',
        ar: 'العودة إلى المتاجر',
        fr: 'Retour aux Magasins'
      },
      'contact_store': {
        en: 'Contact Store',
        ar: 'اتصل بالمتجر',
        fr: 'Contacter le Magasin'
      },
      'store_info': {
        en: 'Store Information',
        ar: 'معلومات المتجر',
        fr: 'Informations du Magasin'
      },
      'products': {
        en: 'Products',
        ar: 'المنتجات',
        fr: 'Produits'
      },
      'search_products': {
        en: 'Search products...',
        ar: 'البحث عن المنتجات...',
        fr: 'Rechercher des produits...'
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
      'no_products': {
        en: 'No products found',
        ar: 'لم يتم العثور على منتجات',
        fr: 'Aucun produit trouvé'
      },
      'follow_us': {
        en: "Don't forget to follow us!",
        ar: 'لا تنسى متابعتنا!',
        fr: 'N\'oubliez pas de nous suivre!'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Exit Button */}
      <button
        onClick={() => window.history.back()}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-lg transition-colors"
      >
        <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </button>

      {/* Store Header */}
      <div className="relative">
        {/* Store Cover with Color Scheme */}
        <div 
          className="h-64 w-full relative"
          style={{ 
            background: `linear-gradient(135deg, ${store.colorScheme}, ${store.colorScheme}dd)` 
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute top-4 left-4">
            <Link 
              to="/stores"
              className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors bg-black bg-opacity-30 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{getTranslatedText('back_to_stores')}</span>
            </Link>
          </div>
        </div>

        {/* Store Info Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Store Logo */}
              <div className="flex-shrink-0">
                <img
                  src={store.logo}
                  alt={`${store.name} logo`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
              </div>

              {/* Store Details */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{store.name}</h1>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                        {store.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Currency: {store.currency}
                      </span>
                      {store.settings.seoOptimized && (
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          SEO Optimized
                        </span>
                      )}
                    </div>
                    
                    {/* Store Description with Social Media */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-4 lg:mb-0">{store.description}</p>
                      
                      {/* Social Media Icons */}
                      <div className="flex items-center space-x-3">
                        <a 
                          href={platformSettings.socialMedia.tiktok}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-black hover:bg-gray-800 rounded-full transition-colors"
                        >
                          <TikTokIcon className="h-5 w-5 text-white" />
                        </a>
                        <a 
                          href={platformSettings.socialMedia.facebook}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                        >
                          <Facebook className="h-5 w-5 text-white" />
                        </a>
                        <a 
                          href={platformSettings.socialMedia.instagram}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 shadow-lg">
                      <Mail className="h-4 w-4" />
                      <span>{getTranslatedText('contact_store')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 pt-8 border-t dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{storeProducts.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(storeProducts.map(p => p.category)).size}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {storeProducts.filter(p => p.isFreeShipping).length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Free Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {store.isActive ? 'Active' : 'Inactive'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-xl p-6 text-center text-white shadow-lg">
          <h3 className="text-xl font-bold mb-4">{getTranslatedText('follow_us')}</h3>
          <div className="flex justify-center items-center space-x-4">
            <a 
              href={platformSettings.socialMedia.tiktok}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-black bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <TikTokIcon className="h-6 w-6 text-white" />
            </a>
            <a 
              href={platformSettings.socialMedia.facebook}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 bg-opacity-80 hover:bg-opacity-100 rounded-full transition-colors"
            >
              <Facebook className="h-6 w-6 text-white" />
            </a>
            <a 
              href={platformSettings.socialMedia.instagram}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-80 hover:bg-opacity-100 rounded-full transition-colors"
            >
              <Instagram className="h-6 w-6 text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Store Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quick shipping across Algeria</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Shopping</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Safe and secure transactions</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Products</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Carefully curated selection</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {getTranslatedText('store_info')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Email</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{store.contactInfo.email}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Phone</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{store.contactInfo.phone}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Address</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{store.contactInfo.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-0">
              {getTranslatedText('products')} ({filteredProducts.length})
            </h3>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={getTranslatedText('search_products')}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="newest">{getTranslatedText('newest_first')}</option>
                <option value="price-low">{getTranslatedText('price_low_high')}</option>
                <option value="price-high">{getTranslatedText('price_high_low')}</option>
                <option value="name">{getTranslatedText('name_az')}</option>
              </select>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {getTranslatedText('no_products')}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                This store doesn't have any products matching your search.
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} store={store} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;