import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, Store } from '../../types';
import { Truck, MapPin, Package, AlertTriangle, ShoppingCart, Plus } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  store?: Store;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, store }) => {
  const freeShippingText = useTranslation('free_shipping');
  // priceText removed, not used
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const isLowStock = product.stockLevel <= product.lowStockAlert;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addToCart(product, store, 1);
    
    // Brief animation delay
    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isFreeShipping && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <Truck className="h-3 w-3 inline mr-1" />
            {freeShippingText}
          </div>
        )}
        {isLowStock && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <AlertTriangle className="h-3 w-3 inline mr-1" />
            Low Stock
          </div>
        )}
        {product.variants.length > 0 && (
          <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <Package className="h-3 w-3 inline mr-1" />
            {product.variants.length} variants
          </div>
        )}
        
        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.stockLevel === 0}
          className={`absolute bottom-2 right-2 p-2 rounded-full transition-all duration-300 ${
            isAdding 
              ? 'bg-green-500 text-white scale-110' 
              : product.stockLevel === 0
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-white text-teal-600 hover:bg-teal-600 hover:text-white shadow-lg opacity-0 group-hover:opacity-100'
          }`}
        >
          {isAdding ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-teal-600 dark:text-teal-400 font-medium">
            {store?.name || 'Tiny Treasure'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{product.category}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {product.price.toLocaleString()} DA
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Stock: {product.stockLevel}
          </div>
        </div>

        {!product.isFreeShipping && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            <span>Shipping varies by location</span>
          </div>
        )}

        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center text-sm font-medium"
          >
            {useTranslation('view_details')}
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || product.stockLevel === 0}
            className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center space-x-1 ${
              product.stockLevel === 0
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : isAdding
                ? 'bg-green-600 text-white'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>{product.stockLevel === 0 ? useTranslation('out_of_stock') : useTranslation('add')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;