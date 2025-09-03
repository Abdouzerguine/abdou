export const PRODUCT_DB_KEY = 'tiny_treasure_products_v1';

export const loadProducts = () => {
  try {
    const raw = localStorage.getItem(PRODUCT_DB_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load products', e);
    return null;
  }
};

export const saveProducts = (products: any[]) => {
  try {
    localStorage.setItem(PRODUCT_DB_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products', e);
  }
};
