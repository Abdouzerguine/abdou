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
    icon: '📱', 
    isActive: true,
    seoTitle: 'Electronics - Latest Gadgets and Devices',
    seoDescription: 'Discover the latest electronics, smartphones, laptops, and gadgets from top brands.'
  },
  { 
    id: '2', 
    name: 'Clothing', 
    nameAr: 'ملابس', 
    nameFr: 'Vêtements', 
    icon: '👔', 
    isActive: true,
    seoTitle: 'Fashion & Clothing - Trendy Apparel',
    seoDescription: 'Shop the latest fashion trends, clothing, and accessories for men and women.'
  },
  { 
    id: '3', 
    name: 'Cosmetics', 
    nameAr: 'مستحضرات تجميل', 
    nameFr: 'Cosmétiques', 
    icon: '✨', 
    isActive: true,
    seoTitle: 'Beauty & Cosmetics - Premium Products',
    seoDescription: 'Explore premium cosmetics, skincare, and beauty products from trusted brands.'
  },
  { 
    id: '4', 
    name: 'Home & Garden', 
    nameAr: 'المنزل والحديقة', 
    nameFr: 'Maison et Jardin', 
    icon: '🏡', 
    isActive: true,
    seoTitle: 'Home & Garden - Decor and Essentials',
    seoDescription: 'Transform your home and garden with our collection of decor, furniture, and essentials.'
  },
  { 
    id: '5', 
    name: 'Sports', 
    nameAr: 'رياضة', 
    nameFr: 'Sports', 
    icon: '🏃', 
    isActive: true,
    seoTitle: 'Sports & Fitness - Equipment and Apparel',
    seoDescription: 'Get fit with our sports equipment, fitness gear, and athletic apparel.'
  },
  { 
    id: '6', 
    name: 'Books', 
    nameAr: 'كتب', 
    nameFr: 'Livres', 
    icon: '📖', 
    isActive: true,
    seoTitle: 'Books & Literature - Educational and Entertainment',
    seoDescription: 'Discover a wide collection of books, novels, educational materials, and more.'
  },
  { 
    id: '7', 
    name: 'Jewelry', 
    nameAr: 'مجوهرات', 
    nameFr: 'Bijoux', 
    icon: '💍', 
    isActive: true,
    seoTitle: 'Jewelry & Accessories - Elegant Pieces',
    seoDescription: 'Find beautiful jewelry, watches, and accessories for every occasion.'
  },
  { 
    id: '8', 
    name: 'Food & Beverages', 
    nameAr: 'طعام ومشروبات', 
    nameFr: 'Alimentation', 
    icon: '🍯', 
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

export const products: Product[] = [
  {
    id: '1',
    storeId: '1',
    name: 'Smartphone Pro Max',
    description: 'Latest flagship smartphone with advanced features, 5G connectivity, and professional camera system',
    specifications: '6.7" Display, 256GB Storage, 48MP Camera, 5G Ready, Face ID, Wireless Charging',
    images: [
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'
    ],
    price: 85000,
    category: 'Electronics',
    variants: [
      { id: '1', type: 'color', name: 'Color', value: 'Black', priceModifier: 0, stockLevel: 10 },
      { id: '2', type: 'color', name: 'Color', value: 'White', priceModifier: 0, stockLevel: 8 },
      { id: '3', type: 'size', name: 'Storage', value: '128GB', priceModifier: -10000, stockLevel: 15 },
      { id: '4', type: 'size', name: 'Storage', value: '256GB', priceModifier: 0, stockLevel: 12 }
    ],
    stockLevel: 45,
    lowStockAlert: 10,
    isFreeShipping: false,
    shippingRates: {
      'Algiers': 500,
      'Oran': 800,
      'Constantine': 700,
      'Adrar': 1500,
      'Chlef': 850
    },
    weight: 0.2,
    dimensions: { length: 15, width: 7, height: 1 },
    isActive: true,
    createdAt: '2024-01-20',
    seoTitle: 'Smartphone Pro Max - Latest 5G Technology',
    seoDescription: 'Get the latest smartphone with 5G, 48MP camera, and 256GB storage. Free shipping available.',
    tags: ['smartphone', '5g', 'camera', 'technology']
  },
  {
    id: '2',
    storeId: '2',
    name: 'Designer Leather Jacket',
    description: 'Premium genuine leather jacket with modern design, perfect for casual and semi-formal occasions',
    specifications: 'Genuine Leather, Multiple Sizes Available, Water Resistant, YKK Zippers, Cotton Lining',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg'
    ],
    price: 12500,
    category: 'Clothing',
    variants: [
      { id: '5', type: 'size', name: 'Size', value: 'S', priceModifier: 0, stockLevel: 5 },
      { id: '6', type: 'size', name: 'Size', value: 'M', priceModifier: 0, stockLevel: 8 },
      { id: '7', type: 'size', name: 'Size', value: 'L', priceModifier: 0, stockLevel: 6 },
      { id: '8', type: 'color', name: 'Color', value: 'Black', priceModifier: 0, stockLevel: 10 },
      { id: '9', type: 'color', name: 'Color', value: 'Brown', priceModifier: 500, stockLevel: 9 }
    ],
    stockLevel: 38,
    lowStockAlert: 5,
    isFreeShipping: true,
    shippingRates: {},
    weight: 1.2,
    dimensions: { length: 60, width: 50, height: 5 },
    isActive: true,
    createdAt: '2024-02-05',
    seoTitle: 'Premium Leather Designer Jacket - Water Resistant',
    seoDescription: 'Stylish genuine leather jacket with water resistance. Available in multiple sizes and colors.',
    tags: ['jacket', 'leather', 'fashion', 'designer']
  },
  {
    id: '3',
    storeId: '3',
    name: 'Luxury Skincare Set',
    description: 'Complete skincare routine with premium ingredients, anti-aging formula, and natural extracts',
    specifications: 'Anti-aging Formula, Natural Ingredients, Dermatologist Tested, Paraben-free, Cruelty-free',
    images: [
      'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg',
      'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg'
    ],
    price: 8500,
    category: 'Cosmetics',
    variants: [
      { id: '10', type: 'style', name: 'Skin Type', value: 'Dry Skin', priceModifier: 0, stockLevel: 12 },
      { id: '11', type: 'style', name: 'Skin Type', value: 'Oily Skin', priceModifier: 0, stockLevel: 15 },
      { id: '12', type: 'style', name: 'Skin Type', value: 'Sensitive Skin', priceModifier: 500, stockLevel: 8 }
    ],
    stockLevel: 35,
    lowStockAlert: 8,
    isFreeShipping: false,
    shippingRates: {
      'Algiers': 300,
      'Oran': 450,
      'Constantine': 400,
      'Adrar': 800,
      'Chlef': 500
    },
    weight: 0.5,
    dimensions: { length: 20, width: 15, height: 8 },
    isActive: true,
    createdAt: '2024-02-15',
    seoTitle: 'Luxury Anti-Aging Skincare Set - Natural Ingredients',
    seoDescription: 'Premium skincare set with anti-aging formula and natural ingredients. Dermatologist tested.',
    tags: ['skincare', 'anti-aging', 'natural', 'luxury']
  },
  {
    id: '4',
    storeId: '4',
    name: 'Modern Coffee Table',
    description: 'Elegant wooden coffee table with storage compartments, perfect for modern living rooms',
    specifications: 'Solid Wood Construction, Hidden Storage, Scratch Resistant, Easy Assembly, 120x60x45cm',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'
    ],
    price: 25000,
    category: 'Home & Garden',
    variants: [
      { id: '13', type: 'color', name: 'Wood Finish', value: 'Oak', priceModifier: 0, stockLevel: 6 },
      { id: '14', type: 'color', name: 'Wood Finish', value: 'Walnut', priceModifier: 2000, stockLevel: 4 },
      { id: '15', type: 'color', name: 'Wood Finish', value: 'Cherry', priceModifier: 1500, stockLevel: 5 }
    ],
    stockLevel: 15,
    lowStockAlert: 3,
    isFreeShipping: false,
    shippingRates: {
      'Algiers': 1200,
      'Oran': 1500,
      'Constantine': 1400,
      'Adrar': 2500,
      'Chlef': 1600
    },
    weight: 25.0,
    dimensions: { length: 120, width: 60, height: 45 },
    isActive: true,
    createdAt: '2024-02-18',
    seoTitle: 'Modern Coffee Table with Storage - Solid Wood',
    seoDescription: 'Elegant wooden coffee table with hidden storage compartments. Perfect for modern homes.',
    tags: ['furniture', 'coffee table', 'storage', 'wood']
  },
  {
    id: '5',
    storeId: '5',
    name: 'Professional Football Boots',
    description: 'High-performance football boots designed for professional players and serious enthusiasts',
    specifications: 'Synthetic Leather Upper, FG Studs, Lightweight Design, Enhanced Ball Control, Sizes 39-46',
    images: [
      'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg'
    ],
    price: 15000,
    category: 'Sports',
    variants: [
      { id: '16', type: 'size', name: 'Size', value: '40', priceModifier: 0, stockLevel: 8 },
      { id: '17', type: 'size', name: 'Size', value: '42', priceModifier: 0, stockLevel: 12 },
      { id: '18', type: 'size', name: 'Size', value: '44', priceModifier: 0, stockLevel: 10 },
      { id: '19', type: 'color', name: 'Color', value: 'Black/White', priceModifier: 0, stockLevel: 15 },
      { id: '20', type: 'color', name: 'Color', value: 'Blue/Silver', priceModifier: 500, stockLevel: 12 }
    ],
    stockLevel: 57,
    lowStockAlert: 10,
    isFreeShipping: true,
    shippingRates: {},
    weight: 0.8,
    dimensions: { length: 32, width: 12, height: 10 },
    isActive: true,
    createdAt: '2024-02-22',
    seoTitle: 'Professional Football Boots - High Performance',
    seoDescription: 'Professional-grade football boots with enhanced ball control and lightweight design.',
    tags: ['football', 'boots', 'sports', 'professional']
  },
  {
    id: '6',
    storeId: '6',
    name: 'Arabic Literature Collection',
    description: 'Classic Arabic literature collection featuring renowned authors and timeless stories',
    specifications: 'Hardcover Edition, 500+ Pages Each, Arabic Text, Premium Paper, Set of 5 Books',
    images: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg'
    ],
    price: 6500,
    category: 'Books',
    variants: [
      { id: '21', type: 'style', name: 'Edition', value: 'Standard', priceModifier: 0, stockLevel: 20 },
      { id: '22', type: 'style', name: 'Edition', value: 'Deluxe', priceModifier: 2000, stockLevel: 8 }
    ],
    stockLevel: 28,
    lowStockAlert: 5,
    isFreeShipping: false,
    shippingRates: {
      'Algiers': 400,
      'Oran': 600,
      'Constantine': 550,
      'Adrar': 1000,
      'Chlef': 650
    },
    weight: 2.5,
    dimensions: { length: 25, width: 18, height: 15 },
    isActive: true,
    createdAt: '2024-02-28',
    seoTitle: 'Arabic Literature Collection - Classic Authors',
    seoDescription: 'Premium collection of classic Arabic literature from renowned authors. Hardcover edition.',
    tags: ['books', 'arabic', 'literature', 'classic']
  },
  {
    id: '7',
    storeId: '7',
    name: 'Traditional Silver Bracelet',
    description: 'Handcrafted traditional Algerian silver bracelet with intricate geometric patterns',
    specifications: '925 Sterling Silver, Handcrafted, Traditional Design, Adjustable Size, Gift Box Included',
    images: [
      'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'
    ],
    price: 18000,
    category: 'Jewelry',
    variants: [
      { id: '23', type: 'style', name: 'Pattern', value: 'Geometric', priceModifier: 0, stockLevel: 12 },
      { id: '24', type: 'style', name: 'Pattern', value: 'Floral', priceModifier: 1000, stockLevel: 8 },
      { id: '25', type: 'size', name: 'Size', value: 'Small', priceModifier: 0, stockLevel: 10 },
      { id: '26', type: 'size', name: 'Size', value: 'Medium', priceModifier: 0, stockLevel: 15 }
    ],
    stockLevel: 45,
    lowStockAlert: 8,
    isFreeShipping: false,
    shippingRates: {
      'Algiers': 300,
      'Oran': 450,
      'Constantine': 400,
      'Adrar': 800,
      'Chlef': 500
    },
    weight: 0.1,
    dimensions: { length: 20, width: 2, height: 1 },
    isActive: true,
    createdAt: '2024-03-02',
    seoTitle: 'Traditional Silver Bracelet - Handcrafted Algerian Design',
    seoDescription: 'Authentic handcrafted silver bracelet with traditional Algerian patterns. 925 sterling silver.',
    tags: ['jewelry', 'silver', 'traditional', 'handcrafted']
  },
  {
    id: '8',
    storeId: '8',
    name: 'Premium Algerian Dates',
    description: 'Premium quality Deglet Nour dates from the Sahara region, naturally sweet and nutritious',
    specifications: 'Deglet Nour Variety, Organic, 1kg Package, Sahara Origin, No Preservatives, Premium Grade',
    images: [
      'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
      'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg'
    ],
    price: 3500,
    category: 'Food & Beverages',
    variants: [
      { id: '27', type: 'size', name: 'Package Size', value: '500g', priceModifier: -1000, stockLevel: 25 },
      { id: '28', type: 'size', name: 'Package Size', value: '1kg', priceModifier: 0, stockLevel: 30 },
      { id: '29', type: 'size', name: 'Package Size', value: '2kg', priceModifier: 3000, stockLevel: 15 }
    ],
    stockLevel: 70,
    lowStockAlert: 15,
    isFreeShipping: false,
    shippingRates: {
      'Algiers': 350,
      'Oran': 500,
      'Constantine': 450,
      'Adrar': 200,
      'Chlef': 550
    },
    weight: 1.0,
    dimensions: { length: 25, width: 15, height: 8 },
    isActive: true,
    createdAt: '2024-03-06',
    seoTitle: 'Premium Algerian Dates - Deglet Nour Organic',
    seoDescription: 'Premium quality Deglet Nour dates from the Sahara. Organic, naturally sweet, and nutritious.',
    tags: ['dates', 'organic', 'sahara', 'deglet nour']
  }
];