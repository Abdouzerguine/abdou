import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Store, Product, User, PlatformSettings, ShippingZone, Analytics, Order } from '../types';
import { stores as initialStores, products as initialProducts, platformSettings as initialSettings, shippingZones as initialZones } from '../data/mockData';
import { loadProducts, saveProducts, loadStores, saveStores } from '../utils/productDb';
import { useCommission } from './CommissionContext';

interface AppContextType {
  stores: Store[];
  products: Product[];
  orders: Order[];
  currentUser: User | null;
  platformSettings: PlatformSettings;
  shippingZones: ShippingZone[];
  analytics: Analytics;
  // addStore and updateStore removed for single store setup
  addStore: (store: Store) => void;
  updateStore: (id: string, updates: Partial<Store>) => void;
  deleteStore: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkUpdateProducts: (updates: { id: string; updates: Partial<Product> }[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  updatePlatformSettings: (updates: Partial<PlatformSettings>) => void;
  updateShippingZone: (id: string, updates: Partial<ShippingZone>) => void;
  login: (user: User) => void;
  logout: () => void;
  generateStorePassword: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const persistedStores = loadStores();
  const [stores, setStores] = useState<Store[]>(persistedStores || initialStores);
  const persisted = loadProducts();
  const [products, setProducts] = useState<Product[]>(persisted || initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(initialSettings);
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>(initialZones);

  // Mock analytics data
  const analytics: Analytics = {
    totalSales: 125000,
    totalOrders: 89,
    topProducts: products.slice(0, 3),
    salesByMonth: [
      { month: 'Jan', sales: 25000 },
      { month: 'Feb', sales: 35000 },
      { month: 'Mar', sales: 45000 },
      { month: 'Apr', sales: 20000 }
    ],
    storePerformance: [{
      storeId: 'tiny-treasure',
      sales: 125000,
      orders: 89
    }]
  };

  // Removed addStore and updateStore, single store only
  const addStore = (store: Store) => {
    setStores(prev => {
      const next = [...prev, store];
      saveStores(next);
      return next;
    });
  };

  const updateStore = (id: string, updates: Partial<Store>) => {
    setStores(prev => {
      const next = prev.map(store => 
        store.id === id ? { ...store, ...updates } : store
      );
      saveStores(next);
      return next;
    });
  };

  const deleteStore = (id: string) => {
    setStores(prev => {
      const next = prev.filter(store => store.id !== id);
      saveStores(next);
      return next;
    });
    setProducts(prev => prev.filter(product => product.storeId !== id));
  };

  const addProduct = (product: Product) => {
    setProducts(prev => {
      const next = [...prev, product];
      saveProducts(next);
      return next;
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => {
      const next = prev.map(product => product.id === id ? { ...product, ...updates } : product);
      saveProducts(next);
      return next;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const next = prev.filter(product => product.id !== id);
      saveProducts(next);
      return next;
    });
  };

  const bulkUpdateProducts = (updates: { id: string; updates: Partial<Product> }[]) => {
    setProducts(prev => {
      const next = prev.map(product => {
        const update = updates.find(u => u.id === product.id);
        return update ? { ...product, ...update.updates } : product;
      });
      saveProducts(next);
      return next;
    });
  };

  const addOrder = (order: Order) => {
    setOrders(prev => {
      const newOrders = [...prev, order];
      
      // Auto-process commission when order is delivered
      if (order.status === 'delivered') {
        // This would trigger commission processing
        // The commission context will handle this via the automation hook
      }
      
      return newOrders;
    });
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        const updatedOrder = { ...order, ...updates };
        
        // Auto-process commission when order status changes to delivered
        if (updates.status === 'delivered' && order.status !== 'delivered') {
          // This would trigger commission processing
          // The commission context will handle this via the automation hook
        }
        
        return updatedOrder;
      }
      return order;
    }));
  };

  const updatePlatformSettings = (updates: Partial<PlatformSettings>) => {
    setPlatformSettings(prev => ({ ...prev, ...updates }));
  };

  const updateShippingZone = (id: string, updates: Partial<ShippingZone>) => {
    setShippingZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, ...updates } : zone
    ));
  };

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const generateStorePassword = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  return (
    <AppContext.Provider value={{
      stores,
      products,
      orders,
      currentUser,
      platformSettings,
      shippingZones,
      analytics,
      addStore,
      updateStore,
      deleteStore,
      addProduct,
      updateProduct,
      deleteProduct,
      bulkUpdateProducts,
      addOrder,
      updateOrder,
      updatePlatformSettings,
      updateShippingZone,
      login,
      logout,
      generateStorePassword
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};