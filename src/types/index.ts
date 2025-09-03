export interface Store {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  adminEmail: string;
  colorScheme: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  isActive: boolean;
  createdAt: string;
  currency: string;
  settings: {
    autoInventoryTracking: boolean;
    emailNotifications: boolean;
    seoOptimized: boolean;
  };
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  specifications: string;
  images: string[];
  price: number;
  category: string;
  variants: ProductVariant[];
  stockLevel: number;
  lowStockAlert: number;
  isFreeShipping: boolean;
  deliveryCompany?: string;
  shippingRates: { [state: string]: number };
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  isActive: boolean;
  createdAt: string;
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
}

export interface ProductVariant {
  id: string;
  type: 'size' | 'color' | 'style';
  name: string;
  value: string;
  priceModifier: number;
  stockLevel: number;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  icon: string;
  isActive: boolean;
  parentId?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface DeliveryCompany {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  logo: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  coverage: ('north' | 'south' | 'east' | 'west')[];
  baseRates: {
    [zone: string]: number;
  };
  weightMultipliers: {
    [zone: string]: number;
  };
  estimatedDeliveryDays: {
    [zone: string]: number;
  };
  trackingEnabled: boolean;
  cashOnDelivery: boolean;
  isActive: boolean;
}

export interface AlgerianState {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  zone: 'north' | 'south' | 'east' | 'west';
}

export interface ShippingZone {
  id: string;
  name: string;
  states: string[];
  baseRate: number;
  weightMultiplier: number;
  freeShippingThreshold?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  storeId: string;
  storeName: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    wilaya: string;
    commune: string;
  };
  items: OrderItem[];
  totalAmount: number;
  shippingCost: number;
  finalTotal: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryType: 'home' | 'office';
  deliveryCompany?: string;
  trackingNumber?: string;
  createdAt: string;
  estimatedDelivery?: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantId?: string;
  variantDetails?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type Language = 'en' | 'ar' | 'fr';
export type Currency = 'DZD';

export interface User {
  id: string;
  email: string;
  role: 'platform_admin' | 'store_admin' | 'customer';
  storeId?: string;
  name: string;
  permissions: string[];
  lastLogin?: string;
  isActive: boolean;
}

export interface PlatformSettings {
  currencies: Currency[];
  defaultCurrency: Currency;
  emailTemplates: EmailTemplate[];
  backupSchedule: string;
  analyticsEnabled: boolean;
  maintenanceMode: boolean;
  heroVideo?: string;
  socialMedia: {
    instagram: string;
    tiktok: string;
    facebook: string;
    email: string;
    phone: string;
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  isActive: boolean;
}

export interface Analytics {
  totalSales: number;
  totalOrders: number;
  topProducts: Product[];
  salesByMonth: { month: string; sales: number }[];
  storePerformance: { storeId: string; sales: number; orders: number }[];
}