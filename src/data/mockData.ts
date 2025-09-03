import { Store, Product, Category, AlgerianState, ShippingZone, PlatformSettings, EmailTemplate, DeliveryCompany } from '../types';

export const platformSettings: PlatformSettings = {
  currencies: ['DZD'],
  defaultCurrency: 'DZD',
  emailTemplates: [
    {
      id: '1',
      name: 'Order Confirmation',
      subject: 'Order Confirmed - {{orderNumber}}',
      content: 'Thank you for your order {{customerName}}. Your order {{orderNumber}} has been confirmed.',
      variables: ['orderNumber', 'customerName', 'orderTotal'],
      isActive: true
    },
    {
      id: '2',
      name: 'Shipping Notification',
      subject: 'Your order is on the way!',
      content: 'Your order {{orderNumber}} has been shipped. Tracking: {{trackingNumber}}',
      variables: ['orderNumber', 'trackingNumber', 'estimatedDelivery'],
      isActive: true
    }
  ],
  backupSchedule: 'daily',
  analyticsEnabled: true,
  maintenanceMode: false,
  socialMedia: {
    instagram: 'https://www.instagram.com/tiny05treasure',
    tiktok: 'https://www.tiktok.com/@tinytreasures05',
    facebook: 'https://www.facebook.com/tiny05treasures',
    email: 'tiny05treasure@gmail.com',
    phone: '0781604556'
  }
};

export const deliveryCompanies: DeliveryCompany[] = [
  {
    id: '1',
    name: 'Yalidine',
    nameAr: 'يليدين',
    nameFr: 'Yalidine',
    logo: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg',
    contactInfo: {
      phone: '+213 770 123 456',
      email: 'contact@yalidine.dz',
      website: 'https://yalidine.com'
    },
    coverage: ['north', 'south', 'east', 'west'],
    baseRates: {
      north: 400,
      south: 800,
      east: 600,
      west: 700
    },
    weightMultipliers: {
      north: 50,
      south: 100,
      east: 75,
      west: 80
    },
    estimatedDeliveryDays: {
      north: 2,
      south: 5,
      east: 3,
      west: 4
    },
    trackingEnabled: true,
    cashOnDelivery: true,
    isActive: true
  },
  {
    id: '2',
    name: 'Ecolog',
    nameAr: 'إيكولوج',
    nameFr: 'Ecolog',
    logo: 'https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg',
    contactInfo: {
      phone: '+213 770 234 567',
      email: 'info@ecolog.dz',
      website: 'https://ecolog.dz'
    },
    coverage: ['north', 'east', 'west'],
    baseRates: {
      north: 350,
      east: 550,
      west: 650
    },
    weightMultipliers: {
      north: 45,
      east: 70,
      west: 75
    },
    estimatedDeliveryDays: {
      north: 1,
      east: 2,
      west: 3
    },
    trackingEnabled: true,
    cashOnDelivery: true,
    isActive: true
  },
  {
    id: '3',
    name: 'ZR Express',
    nameAr: 'زد آر إكسبريس',
    nameFr: 'ZR Express',
    logo: 'https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg',
    contactInfo: {
      phone: '+213 770 345 678',
      email: 'support@zrexpress.dz',
      website: 'https://zrexpress.dz'
    },
    coverage: ['north', 'south', 'east', 'west'],
    baseRates: {
      north: 450,
      south: 900,
      east: 650,
      west: 750
    },
    weightMultipliers: {
      north: 55,
      south: 110,
      east: 80,
      west: 85
    },
    estimatedDeliveryDays: {
      north: 2,
      south: 6,
      east: 3,
      west: 4
    },
    trackingEnabled: true,
    cashOnDelivery: true,
    isActive: true
  },
  {
    id: '4',
    name: 'Khadamat',
    nameAr: 'خدمات',
    nameFr: 'Khadamat',
    logo: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg',
    contactInfo: {
      phone: '+213 770 456 789',
      email: 'contact@khadamat.dz',
      website: 'https://khadamat.dz'
    },
    coverage: ['north', 'east'],
    baseRates: {
      north: 300,
      east: 500
    },
    weightMultipliers: {
      north: 40,
      east: 65
    },
    estimatedDeliveryDays: {
      north: 1,
      east: 2
    },
    trackingEnabled: false,
    cashOnDelivery: true,
    isActive: true
  }
];

export const categories: Category[] = [
  { 
    id: '1', 
    name: 'Electronics', 
    nameAr: 'إلكترونيات', 
    nameFr: 'Électronique', 
    icon: '⚡', 
    isActive: true,
    seoTitle: 'Electronics - Latest Gadgets and Devices',
    seoDescription: 'Discover the latest electronics, smartphones, laptops, and gadgets from top brands.'
  },
  { 
    id: '2', 
    name: 'Clothing', 
    nameAr: 'ملابس', 
    nameFr: 'Vêtements', 
    icon: '👗', 
    isActive: true,
    seoTitle: 'Fashion & Clothing - Trendy Apparel',
    seoDescription: 'Shop the latest fashion trends, clothing, and accessories for men and women.'
  },
  { 
    id: '3', 
    name: 'Cosmetics', 
    nameAr: 'مستحضرات تجميل', 
    nameFr: 'Cosmétiques', 
    icon: '💄', 
    isActive: true,
    seoTitle: 'Beauty & Cosmetics - Premium Products',
    seoDescription: 'Explore premium cosmetics, skincare, and beauty products from trusted brands.'
  },
  { 
    id: '4', 
    name: 'Home & Garden', 
    nameAr: 'المنزل والحديقة', 
    nameFr: 'Maison et Jardin', 
    icon: '🏠', 
    isActive: true,
    seoTitle: 'Home & Garden - Decor and Essentials',
    seoDescription: 'Transform your home and garden with our collection of decor, furniture, and essentials.'
  },
  { 
    id: '5', 
    name: 'Sports', 
    nameAr: 'رياضة', 
    nameFr: 'Sports', 
    icon: '⚽', 
    isActive: true,
    seoTitle: 'Sports & Fitness - Equipment and Apparel',
    seoDescription: 'Get fit with our sports equipment, fitness gear, and athletic apparel.'
  },
  { 
    id: '6', 
    name: 'Books', 
    nameAr: 'كتب', 
    nameFr: 'Livres', 
    icon: '📚', 
    isActive: true,
    seoTitle: 'Books & Literature - Educational and Entertainment',
    seoDescription: 'Discover a wide collection of books, novels, educational materials, and more.'
  },
  { 
    id: '7', 
    name: 'Jewelry', 
    nameAr: 'مجوهرات', 
    nameFr: 'Bijoux', 
    icon: '💎', 
    isActive: true,
    seoTitle: 'Jewelry & Accessories - Elegant Pieces',
    seoDescription: 'Find beautiful jewelry, watches, and accessories for every occasion.'
  },
  { 
    id: '8', 
    name: 'Food & Beverages', 
    nameAr: 'طعام ومشروبات', 
    nameFr: 'Alimentation', 
    icon: '🍽️', 
    isActive: true,
    seoTitle: 'Food & Beverages - Local Specialties',
    seoDescription: 'Taste authentic Algerian food products, spices, and traditional beverages.'
  },
];

export const algerianStates: AlgerianState[] = [
  { id: '01', name: 'Adrar', nameAr: 'أدرار', nameFr: 'Adrar', zone: 'south' },
  { id: '02', name: 'Chlef', nameAr: 'الشلف', nameFr: 'Chlef', zone: 'north' },
  { id: '03', name: 'Laghouat', nameAr: 'الأغواط', nameFr: 'Laghouat', zone: 'south' },
  { id: '04', name: 'Oum El Bouaghi', nameAr: 'أم البواقي', nameFr: 'Oum El Bouaghi', zone: 'east' },
  { id: '05', name: 'Batna', nameAr: 'باتنة', nameFr: 'Batna', zone: 'east' },
  { id: '06', name: 'Béjaïa', nameAr: 'بجاية', nameFr: 'Béjaïa', zone: 'north' },
  { id: '07', name: 'Biskra', nameAr: 'بسكرة', nameFr: 'Biskra', zone: 'south' },
  { id: '08', name: 'Béchar', nameAr: 'بشار', nameFr: 'Béchar', zone: 'west' },
  { id: '09', name: 'Blida', nameAr: 'البليدة', nameFr: 'Blida', zone: 'north' },
  { id: '10', name: 'Bouira', nameAr: 'البويرة', nameFr: 'Bouira', zone: 'north' },
  { id: '11', name: 'Tamanrasset', nameAr: 'تمنراست', nameFr: 'Tamanrasset', zone: 'south' },
  { id: '12', name: 'Tébessa', nameAr: 'تبسة', nameFr: 'Tébessa', zone: 'east' },
  { id: '13', name: 'Tlemcen', nameAr: 'تلمسان', nameFr: 'Tlemcen', zone: 'west' },
  { id: '14', name: 'Tiaret', nameAr: 'تيارت', nameFr: 'Tiaret', zone: 'west' },
  { id: '15', name: 'Tizi Ouzou', nameAr: 'تيزي وزو', nameFr: 'Tizi Ouzou', zone: 'north' },
  { id: '16', name: 'Algiers', nameAr: 'الجزائر', nameFr: 'Alger', zone: 'north' },
  { id: '17', name: 'Djelfa', nameAr: 'الجلفة', nameFr: 'Djelfa', zone: 'south' },
  { id: '18', name: 'Jijel', nameAr: 'جيجل', nameFr: 'Jijel', zone: 'north' },
  { id: '19', name: 'Sétif', nameAr: 'سطيف', nameFr: 'Sétif', zone: 'east' },
  { id: '20', name: 'Saïda', nameAr: 'سعيدة', nameFr: 'Saïda', zone: 'west' },
  { id: '21', name: 'Skikda', nameAr: 'سكيكدة', nameFr: 'Skikda', zone: 'north' },
  { id: '22', name: 'Sidi Bel Abbès', nameAr: 'سيدي بلعباس', nameFr: 'Sidi Bel Abbès', zone: 'west' },
  { id: '23', name: 'Annaba', nameAr: 'عنابة', nameFr: 'Annaba', zone: 'east' },
  { id: '24', name: 'Guelma', nameAr: 'قالمة', nameFr: 'Guelma', zone: 'east' },
  { id: '25', name: 'Constantine', nameAr: 'قسنطينة', nameFr: 'Constantine', zone: 'east' },
  { id: '26', name: 'Médéa', nameAr: 'المدية', nameFr: 'Médéa', zone: 'north' },
  { id: '27', name: 'Mostaganem', nameAr: 'مستغانم', nameFr: 'Mostaganem', zone: 'west' },
  { id: '28', name: 'M\'Sila', nameAr: 'المسيلة', nameFr: 'M\'Sila', zone: 'south' },
  { id: '29', name: 'Mascara', nameAr: 'معسكر', nameFr: 'Mascara', zone: 'west' },
  { id: '30', name: 'Ouargla', nameAr: 'ورقلة', nameFr: 'Ouargla', zone: 'south' },
  { id: '31', name: 'Oran', nameAr: 'وهران', nameFr: 'Oran', zone: 'west' },
  { id: '32', name: 'El Bayadh', nameAr: 'البيض', nameFr: 'El Bayadh', zone: 'west' },
  { id: '33', name: 'Illizi', nameAr: 'إليزي', nameFr: 'Illizi', zone: 'south' },
  { id: '34', name: 'Bordj Bou Arréridj', nameAr: 'برج بوعريريج', nameFr: 'Bordj Bou Arréridj', zone: 'east' },
  { id: '35', name: 'Boumerdès', nameAr: 'بومرداس', nameFr: 'Boumerdès', zone: 'north' },
  { id: '36', name: 'El Tarf', nameAr: 'الطارف', nameFr: 'El Tarf', zone: 'east' },
  { id: '37', name: 'Tindouf', nameAr: 'تندوف', nameFr: 'Tindouf', zone: 'west' },
  { id: '38', name: 'Tissemsilt', nameAr: 'تيسمسيلت', nameFr: 'Tissemsilt', zone: 'west' },
  { id: '39', name: 'El Oued', nameAr: 'الوادي', nameFr: 'El Oued', zone: 'south' },
  { id: '40', name: 'Khenchela', nameAr: 'خنشلة', nameFr: 'Khenchela', zone: 'east' },
  { id: '41', name: 'Souk Ahras', nameAr: 'سوق أهراس', nameFr: 'Souk Ahras', zone: 'east' },
  { id: '42', name: 'Tipaza', nameAr: 'تيبازة', nameFr: 'Tipaza', zone: 'north' },
  { id: '43', name: 'Mila', nameAr: 'ميلة', nameFr: 'Mila', zone: 'east' },
  { id: '44', name: 'Aïn Defla', nameAr: 'عين الدفلى', nameFr: 'Aïn Defla', zone: 'north' },
  { id: '45', name: 'Naâma', nameAr: 'النعامة', nameFr: 'Naâma', zone: 'west' },
  { id: '46', name: 'Aïn Témouchent', nameAr: 'عين تموشنت', nameFr: 'Aïn Témouchent', zone: 'west' },
  { id: '47', name: 'Ghardaïa', nameAr: 'غرداية', nameFr: 'Ghardaïa', zone: 'south' },
  { id: '48', name: 'Relizane', nameAr: 'غليزان', nameFr: 'Relizane', zone: 'west' },
  { id: '49', name: 'Timimoun', nameAr: 'تيميمون', nameFr: 'Timimoun', zone: 'south' },
  { id: '50', name: 'Bordj Badji Mokhtar', nameAr: 'برج باجي مختار', nameFr: 'Bordj Badji Mokhtar', zone: 'south' },
  { id: '51', name: 'Ouled Djellal', nameAr: 'أولاد جلال', nameFr: 'Ouled Djellal', zone: 'south' },
  { id: '52', name: 'Béni Abbès', nameAr: 'بني عباس', nameFr: 'Béni Abbès', zone: 'west' },
  { id: '53', name: 'In Salah', nameAr: 'عين صالح', nameFr: 'In Salah', zone: 'south' },
  { id: '54', name: 'In Guezzam', nameAr: 'عين قزام', nameFr: 'In Guezzam', zone: 'south' },
  { id: '55', name: 'Touggourt', nameAr: 'تقرت', nameFr: 'Touggourt', zone: 'south' },
  { id: '56', name: 'Djanet', nameAr: 'جانت', nameFr: 'Djanet', zone: 'south' },
  { id: '57', name: 'El M\'Ghair', nameAr: 'المغير', nameFr: 'El M\'Ghair', zone: 'south' },
  { id: '58', name: 'El Meniaa', nameAr: 'المنيعة', nameFr: 'El Meniaa', zone: 'south' }
];

export const shippingZones: ShippingZone[] = [
  {
    id: '1',
    name: 'North Zone',
    states: ['Algiers', 'Blida', 'Bouira', 'Béjaïa', 'Chlef', 'Jijel', 'Tizi Ouzou', 'Skikda', 'Médéa', 'Boumerdès', 'Tipaza', 'Aïn Defla'],
    baseRate: 300,
    weightMultiplier: 50,
    freeShippingThreshold: 5000
  },
  {
    id: '2',
    name: 'South Zone',
    states: ['Adrar', 'Laghouat', 'Biskra', 'Tamanrasset', 'Djelfa', 'Ouargla', 'El Bayadh', 'Illizi', 'El Oued', 'Ghardaïa', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Meniaa', 'M\'Sila'],
    baseRate: 800,
    weightMultiplier: 100,
    freeShippingThreshold: 8000
  },
  {
    id: '3',
    name: 'East Zone',
    states: ['Constantine', 'Batna', 'Oum El Bouaghi', 'Tébessa', 'Sétif', 'Annaba', 'Guelma', 'Bordj Bou Arréridj', 'El Tarf', 'Khenchela', 'Souk Ahras', 'Mila'],
    baseRate: 500,
    weightMultiplier: 75,
    freeShippingThreshold: 6000
  },
  {
    id: '4',
    name: 'West Zone',
    states: ['Oran', 'Béchar', 'Tlemcen', 'Tiaret', 'Saïda', 'Sidi Bel Abbès', 'Mostaganem', 'Mascara', 'Tissemsilt', 'Tindouf', 'Naâma', 'Aïn Témouchent', 'Relizane'],
    baseRate: 600,
    weightMultiplier: 80,
    freeShippingThreshold: 7000
  }
];

export const stores: Store[] = [
  {
    id: '1',
    name: 'TechnoHub',
    category: 'Electronics',
    description: 'Your one-stop shop for the latest electronics and gadgets. We specialize in smartphones, laptops, gaming equipment, and smart home devices.',
    logo: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    adminEmail: 'admin@technohub.dz',
    colorScheme: '#3B82F6',
    contactInfo: {
      phone: '+213 555 123 456',
      email: 'contact@technohub.dz',
      address: 'Algiers, Algeria'
    },
    isActive: true,
    createdAt: '2024-01-15',
    currency: 'DZD',
    settings: {
      autoInventoryTracking: true,
      emailNotifications: true,
      seoOptimized: true
    }
  },
  {
    id: '2',
    name: 'StyleMart',
    category: 'Clothing',
    description: 'Trendy fashion for every occasion. From casual wear to formal attire, we offer the latest styles for men, women, and children.',
    logo: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    adminEmail: 'admin@stylemart.dz',
    colorScheme: '#EC4899',
    contactInfo: {
      phone: '+213 555 234 567',
      email: 'contact@stylemart.dz',
      address: 'Oran, Algeria'
    },
    isActive: true,
    createdAt: '2024-02-01',
    currency: 'DZD',
    settings: {
      autoInventoryTracking: true,
      emailNotifications: true,
      seoOptimized: false
    }
  },
  {
    id: '3',
    name: 'BeautyPalace',
    category: 'Cosmetics',
    description: 'Premium cosmetics and beauty products. Discover skincare, makeup, fragrances, and beauty tools from international and local brands.',
    logo: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg',
    adminEmail: 'admin@beautypalace.dz',
    colorScheme: '#F59E0B',
    contactInfo: {
      phone: '+213 555 345 678',
      email: 'contact@beautypalace.dz',
      address: 'Constantine, Algeria'
    },
    isActive: true,
    createdAt: '2024-02-10',
    currency: 'DZD',
    settings: {
      autoInventoryTracking: false,
      emailNotifications: true,
      seoOptimized: true
    }
  },
  {
    id: '4',
    name: 'HomeComfort',
    category: 'Home & Garden',
    description: 'Transform your living space with our collection of furniture, home decor, kitchen appliances, and garden essentials.',
    logo: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    adminEmail: 'admin@homecomfort.dz',
    colorScheme: '#10B981',
    contactInfo: {
      phone: '+213 555 456 789',
      email: 'contact@homecomfort.dz',
      address: 'Annaba, Algeria'
    },
    isActive: true,
    createdAt: '2024-02-15',
    currency: 'DZD',
    settings: {
      autoInventoryTracking: true,
      emailNotifications: false,
      seoOptimized: true
    }
  },
  {
    id: '5',
    name: 'SportZone',
    category: 'Sports',
    description: 'Everything for sports enthusiasts! Athletic wear, equipment, supplements, and gear for football, basketball, fitness, and outdoor activities.',
    logo: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    adminEmail: 'admin@sportzone.dz',
    colorScheme: '#EF4444',
    contactInfo: {
      phone: '+213 555 567 890',
      email: 'contact@sportzone.dz',
      address: 'Sétif, Algeria'
    },
    isActive: true,
    createdAt: '2024-02-20',
    currency: 'DZD',
    settings: {
      autoInventoryTracking: true,
      emailNotifications: true,
      seoOptimized: false
    }
  },
  {
    id: '6',
    name: 'BookHaven',
    category: 'Books',
    description: 'A paradise for book lovers. Academic books, novels, children\'s books, and educational materials in Arabic, French, and English.',
    logo: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    adminEmail: 'admin@bookhaven.dz',
    colorScheme: '#8B5CF6',
    contactInfo: {
      phone: '+213 555 678 901',
      email: 'contact@bookhaven.dz',
      address: 'Tlemcen, Algeria'
    },
    isActive: true,
    createdAt: '2024-02-25',
    currency: 'DZD',
    settings: {
      autoInventoryTracking: false,
      emailNotifications: true,
      seoOptimized: true
    }
  },
  {
    id: '7',
    name: 'GoldenGems',
    category: 'Jewelry',
    description: 'Exquisite jewelry and accessories. Traditional Algerian jewelry, modern designs, watches, and precious stones for special occasions.',
    logo: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    adminEmail: 'admin@goldengems.dz',
    colorScheme: '#F59E0B',
    contactInfo: {
      phone: '+213 555 789 012',
      email: 'contact@goldengems.dz',
      address: 'Béjaïa, Algeria'
    },
    isActive: true,
    createdAt: '2024-03-01',
    currency: 'DZD',
    settings: {
      autoInventoryTracking: true,
      emailNotifications: true,
      seoOptimized: true
    }
  },
  {
    id: '8',
    name: 'TasteOfAlgeria',
    category: 'Food & Beverages',
    description: 'Authentic Algerian food products, spices, traditional sweets, olive oil, dates, and specialty beverages from across the country.',
    logo: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
    adminEmail: 'admin@tasteofalgerai.dz',
    colorScheme: '#059669',
    contactInfo: {
      phone: '+213 555 890 123',
      email: 'contact@tasteofalgerai.dz',
      address: 'Ghardaïa, Algeria'
    },
    isActive: true,
    createdAt: '2024-03-05',
    currency: 'DZD',
    settings: {
      autoInventoryTracking: false,
      emailNotifications: true,
      seoOptimized: false
    }
  }
];

export const products: Product[] = [];