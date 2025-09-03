import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Store } from '../types';

interface CartItem {
  id: string;
  product: Product;
  store?: Store;
  quantity: number;
  selectedVariant?: {
    id: string;
    type: string;
    name: string;
    value: string;
    priceModifier: number;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, store?: Store, quantity?: number, variantId?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getShippingCost: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, store?: Store, quantity = 1, variantId?: string) => {
    const selectedVariant = variantId ? product.variants.find(v => v.id === variantId) : undefined;
    const itemId = `${product.id}-${variantId || 'default'}`;
    
    setItems(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, {
        id: itemId,
        product,
        store,
        quantity,
        selectedVariant
      }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const basePrice = item.product.price;
      const variantPrice = item.selectedVariant?.priceModifier || 0;
      return total + (basePrice + variantPrice) * item.quantity;
    }, 0);
  };

  const getShippingCost = () => {
    // Calculate shipping based on items and stores
    const storeGroups = items.reduce((groups, item) => {
      const key = item.store?.id || 'tiny-treasure';
      if (!groups[key]) {
        groups[key] = { store: item.store, items: [] } as { store?: Store; items: CartItem[] };
      }
      groups[key].items.push(item);
      return groups;
    }, {} as Record<string, { store?: Store; items: CartItem[] }>);

    return Object.values(storeGroups).reduce((total, group) => {
      const hasFreeShipping = group.items.some(item => item.product.isFreeShipping);
      if (hasFreeShipping) return total;
      // Default shipping cost for Algiers
      return total + 400;
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      getShippingCost,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};