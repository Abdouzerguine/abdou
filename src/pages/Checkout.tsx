import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, MapPin, Phone, Mail, User, CheckCircle, ArrowLeft, Package, Clock, X, Facebook, Instagram } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { algerianStates } from '../data/mockData';
import { Order, OrderItem } from '../types';

// TikTok Icon Component
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
  </svg>
);

const Checkout: React.FC = () => {
  const { items, getTotalPrice, getShippingCost, clearCart } = useCart();
  const { currentLanguage } = useLanguage();
  const { platformSettings, addOrder, stores } = useApp();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    wilaya: '',
    commune: '',
    address: '',
    postalCode: ''
  });
  
  const [shippingMethod, setShippingMethod] = useState({
    type: 'home', // 'home' or 'office'
    estimatedDays: 0,
    cost: 0
  });

  const totalPrice = getTotalPrice();
  const shippingCost = getShippingCost();
  const finalTotal = totalPrice + shippingCost;

  const getTranslatedText = (key: string) => {
    const translations = {
      'checkout': {
        en: 'Checkout',
        ar: 'إتمام الطلب',
        fr: 'Finaliser la Commande'
      },
      'customer_info': {
        en: 'Customer Information',
        ar: 'معلومات العميل',
        fr: 'Informations Client'
      },
      'shipping_method': {
        en: 'Shipping Method',
        ar: 'طريقة الشحن',
        fr: 'Méthode de Livraison'
      },
      'order_review': {
        en: 'Order Review',
        ar: 'مراجعة الطلب',
        fr: 'Révision de Commande'
      },
      'continue': {
        en: 'Continue',
        ar: 'متابعة',
        fr: 'Continuer'
      },
      'place_order': {
        en: 'Place Order',
        ar: 'تأكيد الطلب',
        fr: 'Passer Commande'
      },
      'back': {
        en: 'Back',
        ar: 'رجوع',
        fr: 'Retour'
      },
      'order_success': {
        en: 'Order Placed Successfully!',
        ar: 'تم تأكيد الطلب بنجاح!',
        fr: 'Commande Passée avec Succès!'
      },
      'follow_us': {
        en: "Don't forget to follow us!",
        ar: 'لا تنسى متابعتنا!',
        fr: 'N\'oubliez pas de nous suivre!'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  const handleCustomerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePlaceOrder = () => {
    // Create order items
    const orderItems: OrderItem[] = items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      variantId: item.selectedVariant?.id,
      variantDetails: item.selectedVariant ? `${item.selectedVariant.name}: ${item.selectedVariant.value}` : undefined,
      quantity: item.quantity,
      unitPrice: item.product.price + (item.selectedVariant?.priceModifier || 0),
      totalPrice: (item.product.price + (item.selectedVariant?.priceModifier || 0)) * item.quantity
    }));

    // Group items by store
    const storeGroups = items.reduce((groups, item) => {
      if (!groups[item.store.id]) {
        groups[item.store.id] = { store: item.store, items: [] };
      }
      groups[item.store.id].items.push(item);
      return groups;
    }, {} as Record<string, { store: any; items: any[] }>);

    // Create separate orders for each store
    Object.values(storeGroups).forEach(group => {
      const storeOrderItems = group.items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        variantId: item.selectedVariant?.id,
        variantDetails: item.selectedVariant ? `${item.selectedVariant.name}: ${item.selectedVariant.value}` : undefined,
        quantity: item.quantity,
        unitPrice: item.product.price + (item.selectedVariant?.priceModifier || 0),
        totalPrice: (item.product.price + (item.selectedVariant?.priceModifier || 0)) * item.quantity
      }));

      const storeTotal = storeOrderItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const storeShipping = calculateShippingCost(shippingMethod.type);
      
      const order: Order = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        orderNumber: `TT${Date.now().toString().slice(-6)}`,
        storeId: group.store.id,
        storeName: group.store.name,
        customerInfo: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address,
          wilaya: customerInfo.wilaya,
          commune: customerInfo.commune
        },
        items: storeOrderItems,
        totalAmount: storeTotal,
        shippingCost: storeShipping,
        finalTotal: storeTotal + storeShipping,
        status: 'pending',
        deliveryType: shippingMethod.type as 'home' | 'office',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + (shippingMethod.estimatedDays * 24 * 60 * 60 * 1000)).toISOString()
      };

      addOrder(order);
    });

    setOrderPlaced(true);
    clearCart();
  };

  const getSelectedWilaya = () => {
    return algerianStates.find(state => state.name === customerInfo.wilaya);
  };

  const calculateShippingCost = (type: string) => {
    const selectedWilaya = getSelectedWilaya();
    if (!selectedWilaya) return 0;
    
    const baseRate = selectedWilaya.zone === 'north' ? 400 : 
                    selectedWilaya.zone === 'south' ? 1200 : 
                    selectedWilaya.zone === 'east' ? 600 : 700;
    
    return type === 'office' ? Math.round(baseRate * 0.8) : baseRate;
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-lg transition-colors"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some products to your cart before checkout</p>
          <button
            onClick={() => navigate('/')}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-lg transition-colors"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {getTranslatedText('order_success')}
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-800 dark:text-blue-400">
              <Phone className="h-4 w-4" />
              <span>You will receive a confirmation call within 24 hours</span>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Estimated delivery: 2-5 business days</span>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-lg p-4 mb-6 text-white">
            <h3 className="font-bold mb-3">{getTranslatedText('follow_us')}</h3>
            <div className="flex justify-center items-center space-x-3">
              <a 
                href={platformSettings.socialMedia.tiktok}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-black bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
              >
                <TikTokIcon className="h-5 w-5 text-white" />
              </a>
              <a 
                href={platformSettings.socialMedia.facebook}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 bg-opacity-80 hover:bg-opacity-100 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a 
                href={platformSettings.socialMedia.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-80 hover:bg-opacity-100 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white py-3 px-6 rounded-lg hover:from-teal-700 hover:to-green-700 transition-all duration-300 font-medium shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Exit Button */}
      <button
        onClick={() => window.history.back()}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-lg transition-colors"
      >
        <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{getTranslatedText('back')}</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{getTranslatedText('checkout')}</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    currentStep > step ? 'bg-teal-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{getTranslatedText('customer_info')}</span>
            <span>{getTranslatedText('shipping_method')}</span>
            <span>{getTranslatedText('order_review')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {getTranslatedText('customer_info')}
                </h2>
                <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Wilaya *
                      </label>
                      <select
                        value={customerInfo.wilaya}
                        onChange={(e) => setCustomerInfo({...customerInfo, wilaya: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="">Select Wilaya</option>
                        {algerianStates.map(state => (
                          <option key={state.id} value={state.name}>{state.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Commune *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.commune}
                        onChange={(e) => setCustomerInfo({...customerInfo, commune: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Address *
                    </label>
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={3}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    {getTranslatedText('continue')}
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {currentStep === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  {getTranslatedText('shipping_method')}
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Delivery Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="home"
                          checked={shippingMethod.type === 'home'}
                          onChange={(e) => {
                            const cost = calculateShippingCost(e.target.value);
                            setShippingMethod({...shippingMethod, type: e.target.value, cost, estimatedDays: 3});
                          }}
                          className="sr-only"
                        />
                        <div className={`flex items-center space-x-3 ${shippingMethod.type === 'home' ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'}`}>
                          <MapPin className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Home Delivery</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Delivered to your address</div>
                            {customerInfo.wilaya && (
                              <div className="text-sm font-medium text-teal-600 dark:text-teal-400">
                                {calculateShippingCost('home').toLocaleString()} DA
                              </div>
                            )}
                          </div>
                        </div>
                      </label>
                      
                      <label className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="office"
                          checked={shippingMethod.type === 'office'}
                          onChange={(e) => {
                            const cost = calculateShippingCost(e.target.value);
                            setShippingMethod({...shippingMethod, type: e.target.value, cost, estimatedDays: 2});
                          }}
                          className="sr-only"
                        />
                        <div className={`flex items-center space-x-3 ${shippingMethod.type === 'office' ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'}`}>
                          <Package className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Office Pickup</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Pick up from office (20% discount)</div>
                            {customerInfo.wilaya && (
                              <div className="text-sm font-medium text-teal-600 dark:text-teal-400">
                                {calculateShippingCost('office').toLocaleString()} DA
                              </div>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-400">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm font-medium">Payment Method: Cash on Delivery</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      You will receive a confirmation call within 24 hours to confirm your order and arrange delivery.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {getTranslatedText('back')}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                      disabled={!customerInfo.wilaya}
                    >
                      {getTranslatedText('continue')}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {getTranslatedText('order_review')}
                </h2>
                
                <div className="space-y-6">
                  {/* Customer Info Summary */}
                  <div className="border-b dark:border-gray-700 pb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Delivery Information</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {customerInfo.firstName} {customerInfo.lastName}<br />
                      {customerInfo.address}<br />
                      {customerInfo.commune}, {customerInfo.wilaya}<br />
                      {customerInfo.phone}
                    </p>
                  </div>

                  {/* Shipping Summary */}
                  <div className="border-b dark:border-gray-700 pb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Shipping Method</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {shippingMethod.type === 'home' ? 'Home Delivery' : 'Office Pickup'}<br />
                      Estimated delivery: {shippingMethod.estimatedDays} business days<br />
                      Cost: {calculateShippingCost(shippingMethod.type).toLocaleString()} DA
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div className="border-b dark:border-gray-700 pb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Payment Method</h3>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4" />
                      <span>Cash on Delivery - You will receive a confirmation call</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {getTranslatedText('back')}
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-gradient-to-r from-teal-600 to-green-600 text-white py-3 rounded-lg hover:from-teal-700 hover:to-green-700 transition-all duration-300 font-medium shadow-lg"
                    >
                      {getTranslatedText('place_order')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {((item.product.price + (item.selectedVariant?.priceModifier || 0)) * item.quantity).toLocaleString()} DA
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t dark:border-gray-700 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">{totalPrice.toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-900 dark:text-white">
                    {currentStep >= 2 && customerInfo.wilaya 
                      ? `${calculateShippingCost(shippingMethod.type).toLocaleString()} DA` 
                      : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t dark:border-gray-700 pt-2">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-teal-600 dark:text-teal-400">
                    {currentStep >= 2 && customerInfo.wilaya 
                      ? (totalPrice + calculateShippingCost(shippingMethod.type)).toLocaleString()
                      : totalPrice.toLocaleString()} DA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;