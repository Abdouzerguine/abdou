import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
}

const translations = {
  'welcome': {
    en: 'Welcome to Tiny Treasure',
    ar: 'مرحباً بكم في الكنز الصغير',
    fr: 'Bienvenue chez Tiny Treasure'
  },
  'explore_stores': {
    en: 'Explore Our Stores',
    ar: 'استكشف متاجرنا',
    fr: 'Explorez nos Magasins'
  },
  'featured_products': {
    en: 'Featured Products',
    ar: 'المنتجات المميزة',
    fr: 'Produits en Vedette'
  },
  'all_products': {
    en: 'All Products',
    ar: 'جميع المنتجات',
    fr: 'Tous les Produits'
  },
  'search_placeholder': {
    en: 'Search products or stores...',
    ar: 'البحث عن المنتجات أو المتاجر...',
    fr: 'Rechercher des produits ou des magasins...'
  },
  'price': {
    en: 'Price',
    ar: 'السعر',
    fr: 'Prix'
  },
  'free_shipping': {
    en: 'Free Shipping',
    ar: 'شحن مجاني',
    fr: 'Livraison Gratuite'
  },
  'view_store': {
    en: 'View Store',
    ar: 'عرض المتجر',
    fr: 'Voir le Magasin'
  },
  'contact': {
    en: 'Contact',
    ar: 'اتصل بنا',
    fr: 'Contact'
  },
  'admin_panel': {
    en: 'Admin Panel',
    ar: 'لوحة الإدارة',
    fr: 'Panneau d\'Administration'
  },
  'shipping_zones': {
    en: 'Shipping Zones',
    ar: 'مناطق الشحن',
    fr: 'Zones de Livraison'
  },
  'inventory_management': {
    en: 'Inventory Management',
    ar: 'إدارة المخزون',
    fr: 'Gestion des Stocks'
  },
  'analytics': {
    en: 'Analytics',
    ar: 'التحليلات',
    fr: 'Analyses'
  },
  'bulk_upload': {
    en: 'Bulk Upload',
    ar: 'رفع مجمع',
    fr: 'Téléchargement en Lot'
  },
  'follow_us': {
    en: "Don't forget to follow us",
    ar: 'لا تنسى متابعتنا',
    fr: 'N\'oubliez pas de nous suivre'
  },
  'add_to_cart': {
    en: 'Add to Cart',
    ar: 'أضف إلى السلة',
    fr: 'Ajouter au Panier'
  },
  'shopping_cart': {
    en: 'Shopping Cart',
    ar: 'سلة التسوق',
    fr: 'Panier d\'Achat'
  },
  'checkout': {
    en: 'Checkout',
    ar: 'إتمام الطلب',
    fr: 'Finaliser la Commande'
  },
  'subtotal': {
    en: 'Subtotal',
    ar: 'المجموع الفرعي',
    fr: 'Sous-total'
  },
  'shipping': {
    en: 'Shipping',
    ar: 'الشحن',
    fr: 'Livraison'
  },
  'total': {
    en: 'Total',
    ar: 'المجموع',
    fr: 'Total'
  },
  'remove': {
    en: 'Remove',
    ar: 'إزالة',
    fr: 'Supprimer'
  },
  'clear_cart': {
    en: 'Clear Cart',
    ar: 'إفراغ السلة',
    fr: 'Vider le Panier'
  },
  'cart_empty': {
    en: 'Your cart is empty',
    ar: 'سلة التسوق فارغة',
    fr: 'Votre panier est vide'
  },
  'start_shopping': {
    en: 'Start shopping to add products',
    ar: 'ابدأ التسوق لإضافة المنتجات',
    fr: 'Commencez à magasiner pour ajouter des produits'
  },
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
  'platform_admin': {
    en: 'Platform Admin',
    ar: 'إدارة المنصة',
    fr: 'Admin Plateforme'
  },
  'store_admin': {
    en: 'Store Admin',
    ar: 'إدارة المتجر',
    fr: 'Admin Magasin'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = (key: string): string => {
  const { currentLanguage, translations } = useLanguage();
  return translations[key]?.[currentLanguage] || key;
};