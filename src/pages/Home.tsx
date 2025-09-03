import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Truck, Shield, Users } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation, useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/UI/ProductCard';
// import StoreCard from '../components/UI/StoreCard';
import FloatingSocialMedia from '../components/UI/FloatingSocialMedia';
import { categories } from '../data/mockData';

const Home: React.FC = () => {
  const { products } = useApp();
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  const welcomeText = useTranslation('welcome');
  // exploreStoresText removed, not used
  const featuredProductsText = useTranslation('featured_products');
  const searchPlaceholder = useTranslation('search_placeholder');

  const getTranslatedText = (key: string) => {
    const translations = {
      'discover_treasures': {
        en: 'Discover treasures from local Algerian businesses',
        ar: 'اكتشف الكنوز من الشركات الجزائرية المحلية',
        fr: 'Découvrez les trésors des entreprises algériennes locales'
      },
      'active_stores': {
        en: 'Active Stores',
        ar: 'المتاجر النشطة',
        fr: 'Magasins Actifs'
      },
      'products_available': {
        en: 'Products Available',
        ar: 'المنتجات المتاحة',
        fr: 'Produits Disponibles'
      },
      'wilayas_covered': {
        en: 'Wilayas Covered',
        ar: 'الولايات المغطاة',
        fr: 'Wilayas Couvertes'
      },
      'why_choose': {
        en: 'Why Choose Tiny Treasure?',
        ar: 'لماذا تختار الكنز الصغير؟',
        fr: 'Pourquoi Choisir Tiny Treasure?'
      },
      'connecting_algeria': {
        en: "Connecting Algeria's finest businesses with customers nationwide",
        ar: 'ربط أفضل الشركات الجزائرية بالعملاء في جميع أنحاء البلاد',
        fr: 'Connecter les meilleures entreprises algériennes avec les clients à travers le pays'
      },
      'local_businesses': {
        en: 'Local Businesses',
        ar: 'الشركات المحلية',
        fr: 'Entreprises Locales'
      },
      'supporting_entrepreneurs': {
        en: 'Supporting Algerian entrepreneurs and local communities',
        ar: 'دعم رجال الأعمال الجزائريين والمجتمعات المحلية',
        fr: 'Soutenir les entrepreneurs algériens et les communautés locales'
      },
      'nationwide_delivery': {
        en: 'Nationwide Delivery',
        ar: 'التوصيل على مستوى البلاد',
        fr: 'Livraison Nationale'
      },
      'shipping_all_wilayas': {
        en: 'Shipping to all 58 Algerian wilayas with transparent pricing',
        ar: 'الشحن إلى جميع الولايات الجزائرية الـ 58 بأسعار شفافة',
        fr: 'Expédition vers les 58 wilayas algériennes avec des prix transparents'
      },
      'secure_shopping': {
        en: 'Secure Shopping',
        ar: 'التسوق الآمن',
        fr: 'Achat Sécurisé'
      },
      'protected_transactions': {
        en: 'Protected transactions and verified seller network',
        ar: 'المعاملات المحمية وشبكة البائعين المتحققة',
        fr: 'Transactions protégées et réseau de vendeurs vérifiés'
      },
      'quality_products': {
        en: 'Quality Products',
        ar: 'منتجات عالية الجودة',
        fr: 'Produits de Qualité'
      },
      'curated_selection': {
        en: 'Curated selection from trusted local vendors',
        ar: 'مجموعة مختارة من البائعين المحليين الموثوقين',
        fr: 'Sélection organisée de vendeurs locaux de confiance'
      },
      'shop_by_category': {
        en: 'Shop by Category',
        ar: 'تسوق حسب الفئة',
        fr: 'Acheter par Catégorie'
      },
      'find_exactly': {
        en: "Find exactly what you're looking for",
        ar: 'اعثر على ما تبحث عنه بالضبط',
        fr: 'Trouvez exactement ce que vous cherchez'
      },
      'view_all_products': {
        en: 'View All Products →',
        ar: 'عرض جميع المنتجات ←',
        fr: 'Voir Tous les Produits →'
      },
      'view_all_stores': {
        en: 'View All Stores →',
        ar: 'عرض جميع المتاجر ←',
        fr: 'Voir Tous les Magasins →'
      }
    };
  return (translations as any)[key]?.[currentLanguage] || key;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 6);

  // featuredStores removed for single store setup

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <FloatingSocialMedia />
      
      {/* Hero Section with Enhanced 3D Effects */}
      <section className="relative h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-blue-600 to-purple-700 dark:from-teal-800 dark:via-blue-800 dark:to-purple-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-white/30 rounded-full animate-ping delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/25 rounded-full animate-ping delay-1000"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto">
                <img 
                  src="/1751431085937.png" 
                  alt="Tiny Treasure Logo" 
                  className="w-full h-full object-contain drop-shadow-2xl rounded-full bg-white/30 p-2"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
              Tiny Treasure — Online store for Algeria
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Shop quality local products organized by category — fast delivery across all 58 wilayas.
            </p>
            
            {/* Hero Search with Water Effect */}
            <div className="max-w-2xl mx-auto relative mb-16 group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="relative w-full pl-12 pr-4 py-6 text-gray-900 dark:text-white bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl text-lg focus:ring-4 focus:ring-teal-300/50 dark:focus:ring-teal-600/50 focus:outline-none border-0 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
              />
              <Search className="absolute left-4 top-6 h-6 w-6 text-gray-400 dark:text-gray-500 group-hover:text-teal-500 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            {/* Stats with 3D Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 transform transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-2xl border border-white/20">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{products.length}+</div>
                <div className="text-gray-100">{getTranslatedText('products_available')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 transform transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-2xl border border-white/20">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">58</div>
                <div className="text-gray-100">{getTranslatedText('wilayas_covered')}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-8 h-12 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
              <div className="w-2 h-4 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced 3D */}
      <section className="py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 transform transition-all duration-500 hover:scale-105">
              {getTranslatedText('why_choose')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 transform transition-all duration-500 hover:scale-105">
              {getTranslatedText('connecting_algeria')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 group hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900 dark:to-teal-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Users className="h-10 w-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{getTranslatedText('local_businesses')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{getTranslatedText('supporting_entrepreneurs')}</p>
            </div>
            
            <div className="text-center p-8 group hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Truck className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{getTranslatedText('nationwide_delivery')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{getTranslatedText('shipping_all_wilayas')}</p>
            </div>
            
            <div className="text-center p-8 group hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Shield className="h-10 w-10 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{getTranslatedText('secure_shopping')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{getTranslatedText('protected_transactions')}</p>
            </div>
            
            <div className="text-center p-8 group hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Star className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{getTranslatedText('quality_products')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{getTranslatedText('curated_selection')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section with Enhanced Effects */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 transform transition-all duration-500 hover:scale-105">
              {getTranslatedText('shop_by_category')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 transform transition-all duration-500 hover:scale-105">
              {getTranslatedText('find_exactly')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.name.toLowerCase()}`}
                className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl hover:bg-teal-50/80 dark:hover:bg-teal-900/30 transition-all duration-500 text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-4 hover:scale-110 hover:rotate-1 border border-white/20 dark:border-gray-700/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-teal-200 group-hover:to-teal-300 dark:group-hover:from-teal-700 dark:group-hover:to-teal-600 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 shadow-lg">
                  <span className="text-teal-600 dark:text-teal-400 text-3xl transform transition-all duration-300 group-hover:scale-110">{category.icon}</span>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-300 transform group-hover:scale-105">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with Enhanced Cards */}
      <section className="py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white transform transition-all duration-500 hover:scale-105">
              {featuredProductsText}
            </h2>
            <Link 
              to="/categories" 
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transform transition-all duration-300 hover:scale-110 hover:translate-x-2"
            >
              {getTranslatedText('view_all_products')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* Featured Stores section removed for single store setup */}
    </div>
  );
};

export default Home;