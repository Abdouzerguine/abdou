import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Truck, Shield, Package, Plus, Minus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useApp();
  const { addToCart } = useCart();
  const { currentLanguage } = useLanguage();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product, undefined, quantity, selectedVariant);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  const getTranslatedText = (key: string) => {
    const translations = {
      'add_to_cart': {
        en: 'Add to Cart',
        ar: 'أضف إلى السلة',
        fr: 'Ajouter au Panier'
      },
      'specifications': {
        en: 'Specifications',
        ar: 'المواصفات',
        fr: 'Spécifications'
      },
      'shipping_info': {
        en: 'Shipping Information',
        ar: 'معلومات الشحن',
        fr: 'Informations de Livraison'
      },
      'free_shipping': {
        en: 'Free Shipping',
        ar: 'شحن مجاني',
        fr: 'Livraison Gratuite'
      },
      'quantity': {
        en: 'Quantity',
        ar: 'الكمية',
        fr: 'Quantité'
      },
      'in_stock': {
        en: 'In Stock',
        ar: 'متوفر',
        fr: 'En Stock'
      },
      'out_of_stock': {
        en: 'Out of Stock',
        ar: 'غير متوفر',
        fr: 'Rupture de Stock'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-teal-500' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                  {product.price.toLocaleString()} DA
                </span>
                {product.isFreeShipping && (
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    {getTranslatedText('free_shipping')}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stockLevel > 0 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-400'
                }`}>
                  {product.stockLevel > 0 ? getTranslatedText('in_stock') : getTranslatedText('out_of_stock')}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {product.stockLevel} available
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.specifications && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {getTranslatedText('specifications')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.specifications}
                </p>
              </div>
            )}

            {/* Variants */}
            {product.variants.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Options</h3>
                <div className="space-y-3">
                  {product.variants.map((variant) => (
                    <label key={variant.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="variant"
                        value={variant.id}
                        checked={selectedVariant === variant.id}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {variant.name}: {variant.value}
                        {variant.priceModifier !== 0 && (
                          <span className="text-teal-600 dark:text-teal-400 ml-2">
                            (+{variant.priceModifier} DA)
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getTranslatedText('quantity')}
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Minus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <span className="text-lg font-medium text-gray-900 dark:text-white px-4">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockLevel, quantity + 1))}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || product.stockLevel === 0}
                  className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-medium ${
                    product.stockLevel === 0
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : isAdding
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-teal-600 to-green-600 text-white hover:from-teal-700 hover:to-green-700 shadow-lg transform hover:scale-105'
                  }`}
                >
                  {isAdding ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      <span>{getTranslatedText('add_to_cart')}</span>
                    </>
                  )}
                </button>
                
                <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                
                <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                {getTranslatedText('shipping_info')}
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {product.isFreeShipping ? (
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Free shipping on this item</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-blue-500" />
                    <span>Shipping costs calculated at checkout</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-teal-500" />
                  <span>Delivery to all 58 wilayas in Algeria</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  <span>Cash on delivery available</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;