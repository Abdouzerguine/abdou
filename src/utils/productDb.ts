import { Product } from '../types';

export const PRODUCT_DB_KEY = 'tiny_treasure_products_v1';
export const STORE_DB_KEY = 'tiny_treasure_stores_v1';

export const loadProducts = (): Product[] | null => {
  try {
    const raw = localStorage.getItem(PRODUCT_DB_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load products', e);
    return null;
  }
};

export const saveProducts = (products: Product[]) => {
  try {
    localStorage.setItem(PRODUCT_DB_KEY, JSON.stringify(products));
    console.log('Products saved to local database:', products.length);
  } catch (e) {
    console.error('Failed to save products', e);
  }
};

export const loadStores = () => {
  try {
    const raw = localStorage.getItem(STORE_DB_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load stores', e);
    return null;
  }
};

export const saveStores = (stores: any[]) => {
  try {
    localStorage.setItem(STORE_DB_KEY, JSON.stringify(stores));
    console.log('Stores saved to local database:', stores.length);
  } catch (e) {
    console.error('Failed to save stores', e);
  }
};

export const clearDatabase = () => {
  try {
    localStorage.removeItem(PRODUCT_DB_KEY);
    localStorage.removeItem(STORE_DB_KEY);
    console.log('Database cleared');
  } catch (e) {
    console.error('Failed to clear database', e);
  }
};