import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock, Package, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage, useTranslation } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/UI/ProductCard';
import FloatingSocialMedia from '../components/UI/FloatingSocialMedia';
import { categories } from '../data/mockData';

const Home: React.FC = () => {
  const { stores, products, platformSettings } = useApp();
  const { currentLanguage } = useLanguage();
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const welcomeText = useTranslation('welcome');
  const exploreStoresText = useTranslation('explore_stores');
  const featuredProductsText = useTranslation('featured_products');

  // Featured products (first 6 products)
  const featuredProducts = products.filter(p => p.isActive).slice(0, 6);
  
  // Hero slides
  const heroSlides = [
    {
      title: currentLanguage === 'ar' ? 'مرحباً بكم في الكنز الصغير' : 
             currentLanguage === 'fr' ? 'Bienvenue chez Tiny Treasure' : 
             'Welcome to Tiny Treasure',
      subtitle: currentLanguage === 'ar' ? 'السوق الرائد متعدد البائعين في الجزائر' : 
                currentLanguage === 'fr' ? 'Le marché multi-vendeurs de premier plan en Algérie' : 
                "Algeria's Premier Multi-Vendor Marketplace",
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      cta: currentLanguage === 'ar' ? 'ابدأ التسوق' : 
           currentLanguage === 'fr' ? 'Commencer les Achats' : 
           'Start Shopping'
    },
    {
      title: currentLanguage === 'ar' ? 'اكتشف المنتجات المحلية' : 
             currentLanguage === 'fr' ? 'Découvrez les Produits Locaux' : 
             'Discover Local Products',
      subtitle: currentLanguage === 'ar' ? 'من جميع الولايات الـ 58' : 
                currentLanguage === 'fr' ? 'De toutes les 58 wilayas' : 
                'From All 58 Wilayas',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      cta: currentLanguage === 'ar' ? 'تصفح المتاجر' : 
           currentLanguage === 'fr' ? 'Parcourir les Magasins' : 
           'Browse Stores'
    },
    {
      title: currentLanguage === 'ar' ? 'شحن مجاني' : 
             currentLanguage === 'fr' ? 'Livraison Gratuite' : 
             'Free Shipping',
      subtitle: currentLanguage === 'ar' ? 'على العديد من المنتجات' : 
                currentLanguage === 'fr' ? 'Sur de nombreux produits' : 
                'On Many Products',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      cta: currentLanguage === 'ar' ? 'تسوق الآن' : 
           currentLanguage === 'fr' ? 'Acheter Maintenant' : 
           'Shop Now'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const toggleVideo = () => {
    if (videoRef) {
      if (isVideoPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const getTranslatedText = (key: string) => {
    const translations = {
      'why_choose_us': {
        en: 'Why Choose Tiny Treasure?',
        ar: 'لماذا تختار الكنز الصغير؟',
        fr: 'Pourquoi Choisir Tiny Treasure?'
      },
      'local_businesses': {
        en: 'Support Local Businesses',
        ar: 'ادعم الأعمال المحلية',
        fr: 'Soutenez les Entreprises Locales'
      },
      'local_businesses_desc': {
        en: 'Every purchase supports Algerian entrepreneurs and local communities',
        ar: 'كل عملية شراء تدعم رجال الأعمال الجزائريين والمجتمعات المحلية',
        fr: 'Chaque achat soutient les entrepreneurs algériens et les communautés locales'
      },
      'nationwide_delivery': {
        en: 'Nationwide Delivery',
        ar: 'توصيل على مستوى البلاد',
        fr: 'Livraison Nationale'
      },
      'nationwide_delivery_desc': {
        en: 'Fast and reliable shipping to all 58 wilayas across Algeria',
        ar: 'شحن سريع وموثوق إلى جميع الولايات الـ 58 في الجزائر',
        fr: 'Expédition rapide et fiable vers les 58 wilayas d\'Algérie'
      },
      'secure_shopping': {
        en: 'Secure Shopping',
        ar: 'تسوق آمن',
        fr: 'Achat Sécurisé'
      },
      'secure_shopping_desc': {
        en: 'Safe transactions with cash on delivery and buyer protection',
        ar: 'معاملات آمنة مع الدفع عند التسليم وحماية المشتري',
        fr: 'Transactions sécurisées avec paiement à la livraison et protection de l\'acheteur'
      },
      'quality_guarantee': {
        en: 'Quality Guarantee',
        ar: 'ضمان الجودة',
        fr: 'Garantie de Qualité'
      },
      'quality_guarantee_desc': {
        en: 'Carefully curated products with quality assurance and return policy',
        ar: 'منتجات منتقاة بعناية مع ضمان الجودة وسياسة الإرجاع',
        fr: 'Produits soigneusement sélectionnés avec assurance qualité et politique de retour'
      },
      'browse_categories': {
        en: 'Browse Categories',
        ar: 'تصفح الفئات',
        fr: 'Parcourir les Catégories'
      },
      'view_all': {
        en: 'View All',
        ar: 'عرض الكل',
        fr: 'Voir Tout'
      },
      'featured_stores': {
        en: 'Featured Stores',
        ar: 'المتاجر المميزة',
        fr: 'Magasins en Vedette'
      },
      'products': {
        en: 'products',
        ar: 'منتج',
        fr: 'produits'
      },
      'visit_store': {
        en: 'Visit Store',
        ar: 'زيارة المتجر',
        fr: 'Visiter le Magasin'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <div className="min-h-screen">
      <FloatingSocialMedia />
      
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-3xl mb-8 text-gray-200 animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                <Link
                  to="/categories"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-600 to-green-600 text-white px-8 py-4 rounded-xl hover:from-teal-700 hover:to-green-700 transition-all duration-300 text-lg font-medium shadow-2xl transform hover:scale-105 animate-fade-in-up animation-delay-400"
                >
                  <span>{slide.cta}</span>
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Hero Video Section */}
      {platformSettings.heroVideo && (
        <section className="relative h-screen overflow-hidden">
          <video
            ref={setVideoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
          >
            <source src={platformSettings.heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Experience Tiny Treasure
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Discover the future of e-commerce in Algeria
              </p>
              <button
                onClick={toggleVideo}
                className="inline-flex items-center space-x-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                {isVideoPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                <span>{isVideoPlaying ? 'Pause' : 'Play'} Video</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {getTranslatedText('why_choose_us')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLanguage === 'ar' ? 'نحن نقدم تجربة تسوق استثنائية مع التركيز على الجودة والخدمة' : 
               currentLanguage === 'fr' ? 'Nous offrons une expérience d\'achat exceptionnelle axée sur la qualité et le service' : 
               'We provide an exceptional shopping experience focused on quality and service'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl">
                <Package className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {getTranslatedText('local_businesses')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {getTranslatedText('local_businesses_desc')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {getTranslatedText('nationwide_delivery')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {getTranslatedText('nationwide_delivery_desc')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {getTranslatedText('secure_shopping')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {getTranslatedText('secure_shopping_desc')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {getTranslatedText('quality_guarantee')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {getTranslatedText('quality_guarantee_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {getTranslatedText('browse_categories')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {currentLanguage === 'ar' ? 'اكتشف مجموعة واسعة من المنتجات' : 
                 currentLanguage === 'fr' ? 'Découvrez une large gamme de produits' : 
                 'Discover a wide range of products'}
              </p>
            </div>
            <Link
              to="/categories"
              className="hidden md:flex items-center space-x-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
            >
              <span>{getTranslatedText('view_all')}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                to={`/categories?category=${category.name.toLowerCase()}`}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-teal-200 group-hover:to-blue-200 dark:group-hover:from-teal-800 dark:group-hover:to-blue-800 transition-all duration-300">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/categories"
              className="inline-flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <span>{getTranslatedText('view_all')}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {featuredProductsText}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {currentLanguage === 'ar' ? 'اكتشف أفضل المنتجات من متاجرنا المحلية' : 
                 currentLanguage === 'fr' ? 'Découvrez les meilleurs produits de nos magasins locaux' : 
                 'Discover the best products from our local stores'}
              </p>
            </div>
            <Link
              to="/categories"
              className="hidden md:flex items-center space-x-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
            >
              <span>{getTranslatedText('view_all')}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const store = stores.find(s => s.id === product.storeId);
              return store ? (
                <ProductCard key={product.id} product={product} store={store} />
              ) : null;
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/categories"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg transform hover:scale-105"
            >
              <span>{getTranslatedText('view_all')}</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {getTranslatedText('featured_stores')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {currentLanguage === 'ar' ? 'تسوق من أفضل المتاجر المحلية' : 
                 currentLanguage === 'fr' ? 'Achetez dans les meilleurs magasins locaux' : 
                 'Shop from the best local stores'}
              </p>
            </div>
            <Link
              to="/stores"
              className="hidden md:flex items-center space-x-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
            >
              <span>{getTranslatedText('view_all')}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.filter(s => s.isActive).slice(0, 6).map((store) => {
              const storeProducts = products.filter(p => p.storeId === store.id && p.isActive);
              return (
                <div key={store.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{store.name}</h3>
                      <p className="text-sm text-gray-200">{store.category}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {store.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {storeProducts.length} {getTranslatedText('products')}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">4.8</span>
                      </div>
                    </div>

                    <Link
                      to={`/store/${store.name.toLowerCase().replace(/\s+/g, '-')}/${store.category.toLowerCase()}`}
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-lg transform hover:scale-105"
                    >
                      <span>{getTranslatedText('visit_store')}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/stores"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg transform hover:scale-105"
            >
              <span>{exploreStoresText}</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-700 dark:to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="transform transition-all duration-300 hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stores.filter(s => s.isActive).length}+</div>
              <div className="text-teal-100 dark:text-teal-200">
                {currentLanguage === 'ar' ? 'متجر نشط' : 
                 currentLanguage === 'fr' ? 'Magasins Actifs' : 
                 'Active Stores'}
              </div>
            </div>
            <div className="transform transition-all duration-300 hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">{products.filter(p => p.isActive).length}+</div>
              <div className="text-teal-100 dark:text-teal-200">
                {currentLanguage === 'ar' ? 'منتج متاح' : 
                 currentLanguage === 'fr' ? 'Produits Disponibles' : 
                 'Products Available'}
              </div>
            </div>
            <div className="transform transition-all duration-300 hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">58</div>
              <div className="text-teal-100 dark:text-teal-200">
                {currentLanguage === 'ar' ? 'ولاية مغطاة' : 
                 currentLanguage === 'fr' ? 'Wilayas Couvertes' : 
                 'Wilayas Covered'}
              </div>
            </div>
            <div className="transform transition-all duration-300 hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-teal-100 dark:text-teal-200">
                {currentLanguage === 'ar' ? 'دعم العملاء' : 
                 currentLanguage === 'fr' ? 'Support Client' : 
                 'Customer Support'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {currentLanguage === 'ar' ? 'ابق على اطلاع بأحدث العروض' : 
             currentLanguage === 'fr' ? 'Restez informé des dernières offres' : 
             'Stay Updated with Latest Offers'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {currentLanguage === 'ar' ? 'اشترك في نشرتنا الإخبارية للحصول على عروض حصرية' : 
             currentLanguage === 'fr' ? 'Abonnez-vous à notre newsletter pour des offres exclusives' : 
             'Subscribe to our newsletter for exclusive deals and updates'}
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder={currentLanguage === 'ar' ? 'أدخل بريدك الإلكتروني' : 
                          currentLanguage === 'fr' ? 'Entrez votre email' : 
                          'Enter your email'}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg transform hover:scale-105">
              {currentLanguage === 'ar' ? 'اشتراك' : 
               currentLanguage === 'fr' ? 'S\'abonner' : 
               'Subscribe'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;