import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Truck, CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

const ShoppingCart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getShippingCost, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();
  
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const totalPrice = getTotalPrice();
  const shippingCost = getShippingCost();
  const finalTotal = totalPrice + shippingCost;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentLanguage === 'ar' ? 'سلة التسوق' : currentLanguage === 'fr' ? 'Panier' : 'Shopping Cart'}
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {currentLanguage === 'ar' ? 'سلة التسوق فارغة' : 
                 currentLanguage === 'fr' ? 'Votre panier est vide' : 
                 'Your cart is empty'}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                {currentLanguage === 'ar' ? 'ابدأ التسوق لإضافة المنتجات' : 
                 currentLanguage === 'fr' ? 'Commencez à magasiner pour ajouter des produits' : 
                 'Start shopping to add products'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.store.name}
                      </p>
                      {item.selectedVariant && (
                        <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
                          {item.selectedVariant.name}: {item.selectedVariant.value}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          >
                            <Minus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          </button>
                          <span className="text-sm font-medium text-gray-900 dark:text-white px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          >
                            <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {((item.product.price + (item.selectedVariant?.priceModifier || 0)) * item.quantity).toLocaleString()} DA
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 mt-1"
                          >
                            {currentLanguage === 'ar' ? 'إزالة' : currentLanguage === 'fr' ? 'Supprimer' : 'Remove'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t dark:border-gray-700 p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'ar' ? 'المجموع الفرعي' : 
                   currentLanguage === 'fr' ? 'Sous-total' : 
                   'Subtotal'}
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {totalPrice.toLocaleString()} DA
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  {currentLanguage === 'ar' ? 'الشحن' : 
                   currentLanguage === 'fr' ? 'Livraison' : 
                   'Shipping'}
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {shippingCost === 0 ? 
                    (currentLanguage === 'ar' ? 'مجاني' : 
                     currentLanguage === 'fr' ? 'Gratuit' : 
                     'Free') : 
                    `${shippingCost.toLocaleString()} DA`}
                </span>
              </div>
              <div className="border-t dark:border-gray-600 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentLanguage === 'ar' ? 'المجموع' : 
                     currentLanguage === 'fr' ? 'Total' : 
                     'Total'}
                  </span>
                  <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                    {finalTotal.toLocaleString()} DA
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white py-3 px-4 rounded-lg hover:from-teal-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-lg"
              >
                <CreditCard className="h-5 w-5" />
                <span>
                  {currentLanguage === 'ar' ? 'إتمام الطلب' : 
                   currentLanguage === 'fr' ? 'Passer la commande' : 
                   'Proceed to Checkout'}
                </span>
              </button>
              <button
                onClick={clearCart}
                className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                {currentLanguage === 'ar' ? 'إفراغ السلة' : 
                 currentLanguage === 'fr' ? 'Vider le panier' : 
                 'Clear Cart'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;