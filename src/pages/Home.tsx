import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock, Package, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage, useTranslation } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/UI/ProductCard';
import FloatingSocialMedia from '../components/UI/FloatingSocialMedia';
import { categories } from '../data/mockData';

const Home: React.FC = () => {
  const { products, platformSettings } = useApp();
  const { currentLanguage } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const welcomeText = useTranslation('welcome');
  const featuredProductsText = useTranslation('featured_products');

  // Featured products (first 6 products)
  const featuredProducts = products.filter(p => p.isActive).slice(0, 6);

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

  const toggleMute = () => {
    if (videoRef) {
      videoRef.muted = !videoRef.muted;
      setIsMuted(videoRef.muted);
    }
  };

  const getTranslatedText = (key: string) => {
    const translations = {
      'hero_title': {
        en: 'Welcome to Tiny Treasure',
        ar: 'مرحباً بكم في الكنز الصغير',
        fr: 'Bienvenue chez Tiny Treasure'
      },
      'hero_subtitle': {
        en: 'Your trusted online store since May 2025',
        ar: 'متجرك الإلكتروني الموثوق منذ مايو 2025',
        fr: 'Votre boutique en ligne de confiance depuis mai 2025'
      },
      'hero_description': {
        en: 'Discover amazing products with fast delivery across Algeria',
        ar: 'اكتشف منتجات رائعة مع توصيل سريع في جميع أنحاء الجزائر',
        fr: 'Découvrez des produits incroyables avec livraison rapide en Algérie'
      },
      'shop_now': {
        en: 'Shop Now',
        ar: 'تسوق الآن',
        fr: 'Acheter Maintenant'
      },
      'why_choose_us': {
        en: 'Why Shop With Us?',
        ar: 'لماذا تتسوق معنا؟',
        fr: 'Pourquoi Acheter Chez Nous?'
      },
      'quality_products': {
        en: 'Quality Products',
        ar: 'منتجات عالية الجودة',
        fr: 'Produits de Qualité'
      },
      'quality_products_desc': {
        en: 'Carefully selected products with quality assurance and satisfaction guarantee',
        ar: 'منتجات مختارة بعناية مع ضمان الجودة وضمان الرضا',
        fr: 'Produits soigneusement sélectionnés avec assurance qualité et garantie de satisfaction'
      },
      'fast_delivery': {
        en: 'Fast Delivery',
        ar: 'توصيل سريع',
        fr: 'Livraison Rapide'
      },
      'fast_delivery_desc': {
        en: 'Quick and reliable shipping to all 58 wilayas across Algeria',
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
      'customer_support': {
        en: '24/7 Support',
        ar: 'دعم 24/7',
        fr: 'Support 24/7'
      },
      'customer_support_desc': {
        en: 'Round-the-clock customer service to help with any questions',
        ar: 'خدمة عملاء على مدار الساعة للمساعدة في أي استفسارات',
        fr: 'Service client 24h/24 pour vous aider avec toutes vos questions'
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
      'newsletter_title': {
        en: 'Stay Updated with Latest Offers',
        ar: 'ابق على اطلاع بأحدث العروض',
        fr: 'Restez informé des dernières offres'
      },
      'newsletter_desc': {
        en: 'Subscribe to our newsletter for exclusive deals and updates',
        ar: 'اشترك في نشرتنا الإخبارية للحصول على عروض حصرية',
        fr: 'Abonnez-vous à notre newsletter pour des offres exclusives'
      },
      'subscribe': {
        en: 'Subscribe',
        ar: 'اشتراك',
        fr: 'S\'abonner'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <div className="min-h-screen">
      <FloatingSocialMedia />
      
      {/* Hero Video Section */}
      <section className="relative h-screen overflow-hidden">
        <video
          ref={setVideoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        >
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className="flex justify-center mb-6">
              <img 
                src="/1751431085937.png" 
                alt="Tiny Treasure Logo" 
                className="w-24 h-24 object-contain drop-shadow-2xl animate-pulse"
              />
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              {getTranslatedText('hero_title')}
            </h1>
            <p className="text-xl md:text-3xl mb-4 text-gray-200 animate-fade-in-up animation-delay-200">
              {getTranslatedText('hero_subtitle')}
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-300 animate-fade-in-up animation-delay-300">
              {getTranslatedText('hero_description')}
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-600 to-green-600 text-white px-8 py-4 rounded-xl hover:from-teal-700 hover:to-green-700 transition-all duration-300 text-lg font-medium shadow-2xl transform hover:scale-105 animate-fade-in-up animation-delay-400"
            >
              <span>{getTranslatedText('shop_now')}</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Video Controls */}
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {getTranslatedText('why_choose_us')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLanguage === 'ar' ? 'نحن نقدم تجربة تسوق استثنائية مع التركيز على الجودة والخدمة منذ مايو 2025' : 
               currentLanguage === 'fr' ? 'Nous offrons une expérience d\'achat exceptionnelle axée sur la qualité et le service depuis mai 2025' : 
               'We provide an exceptional shopping experience focused on quality and service since May 2025'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl">
                <Package className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {getTranslatedText('quality_products')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {getTranslatedText('quality_products_desc')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {getTranslatedText('fast_delivery')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {getTranslatedText('fast_delivery_desc')}
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
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {getTranslatedText('customer_support')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {getTranslatedText('customer_support_desc')}
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
                to={`/categories/${category.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {category.name[currentLanguage]}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {products.filter(p => p.categoryId === category.id && p.isActive).length} products
                  </p>
                </div>
              </Link>
            ))}
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
                {currentLanguage === 'ar' ? 'اكتشف أفضل منتجاتنا المختارة بعناية' : 
                 currentLanguage === 'fr' ? 'Découvrez nos meilleurs produits soigneusement sélectionnés' : 
                 'Discover our best handpicked products'}
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
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-700 dark:to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="transform transition-all duration-300 hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">{products.filter(p => p.isActive).length}+</div>
              <div className="text-teal-100 dark:text-teal-200">
                {currentLanguage === 'ar' ? 'منتج متاح' : 
                 currentLanguage === 'fr' ? 'Produits Disponibles' : 
                 'Products Available'}
              </div>
            </div>
            <div className="transform transition-all duration-300 hover:scale-110">
              <div className="text-4xl md:text-5xl font-bold mb-2">{categories.length}</div>
              <div className="text-teal-100 dark:text-teal-200">
                {currentLanguage === 'ar' ? 'فئة منتج' : 
                 currentLanguage === 'fr' ? 'Catégories' : 
                 'Categories'}
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
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {getTranslatedText('newsletter_title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {getTranslatedText('newsletter_desc')}
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
              {getTranslatedText('subscribe')}
            </button>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'ar' ? 'رحلتي في التجارة الإلكترونية' : 
               currentLanguage === 'fr' ? 'Mon Parcours E-commerce' : 
               'My E-commerce Journey'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {currentLanguage === 'ar' ? 
                'بدأت Tiny Treasure في مايو 2025 كمتجر إلكتروني شخصي لتقديم منتجات عالية الجودة للعملاء في جميع أنحاء الجزائر. هدفي هو بناء علاقات طويلة الأمد مع العملاء من خلال الخدمة الممتازة والمنتجات الموثوقة.' : 
               currentLanguage === 'fr' ? 
                'Tiny Treasure a commencé en mai 2025 comme ma boutique en ligne personnelle pour offrir des produits de qualité aux clients à travers l\'Algérie. Mon objectif est de construire des relations durables avec les clients grâce à un excellent service et des produits fiables.' : 
                'Tiny Treasure started in May 2025 as my personal online store to provide quality products to customers across Algeria. My goal is to build lasting relationships with customers through excellent service and reliable products.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">May 2025</div>
                <div className="text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'ar' ? 'تاريخ التأسيس' : 
                   currentLanguage === 'fr' ? 'Date de Fondation' : 
                   'Founded'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">100%</div>
                <div className="text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'ar' ? 'رضا العملاء' : 
                   currentLanguage === 'fr' ? 'Satisfaction Client' : 
                   'Customer Satisfaction'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'ar' ? 'دعم العملاء' : 
                   currentLanguage === 'fr' ? 'Support Client' : 
                   'Customer Support'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;