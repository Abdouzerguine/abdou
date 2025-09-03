import React, { useState } from 'react';
import { 
  BarChart3, 
  Store, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Image,
  X,
  Save
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useCommission } from '../../contexts/CommissionContext';
import AnalyticsDashboard from '../../components/Admin/AnalyticsDashboard';
import OrderManagement from '../../components/Admin/OrderManagement';
import BulkProductUpload from '../../components/Admin/BulkProductUpload';
import ShippingConfiguration from '../../components/Admin/ShippingConfiguration';
import CommissionDashboard from '../../components/Commission/CommissionDashboard';
import CommissionSettings from '../../components/Commission/CommissionSettings';
import AddProduct from './AddProduct';
import { Store as StoreType, Product } from '../../types';
import { categories } from '../../data/mockData';

const PlatformAdmin: React.FC = () => {
  const { 
    stores, 
    products, 
    addStore, 
    updateStore, 
    deleteStore, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    generateStorePassword
  } = useApp();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingStore, setEditingStore] = useState<StoreType | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<string[]>(['']);

  const [storeForm, setStoreForm] = useState({
    name: '',
    category: '',
    description: '',
    logo: '',
    colorScheme: '#3B82F6',
    phone: '',
    email: '',
    address: ''
  });

  const [productForm, setProductForm] = useState({
    storeId: '',
    name: '',
    description: '',
    specifications: '',
    price: 0,
    category: '',
    stockLevel: 0,
    lowStockAlert: 5,
    isFreeShipping: false,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    seoTitle: '',
    seoDescription: '',
    tags: ''
  });

  const handleStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storeData: StoreType = {
      id: editingStore?.id || Date.now().toString(),
      name: storeForm.name,
      category: storeForm.category,
      description: storeForm.description,
      logo: storeForm.logo,
      adminEmail: storeForm.email,
      colorScheme: storeForm.colorScheme,
      contactInfo: {
        phone: storeForm.phone,
        email: storeForm.email,
        address: storeForm.address
      },
      isActive: true,
      createdAt: editingStore?.createdAt || new Date().toISOString(),
      currency: 'DZD',
      settings: {
        autoInventoryTracking: true,
        emailNotifications: true,
        seoOptimized: true
      }
    };

    if (editingStore) {
      updateStore(editingStore.id, storeData);
    } else {
      addStore(storeData);
    }

    setShowStoreModal(false);
    setEditingStore(null);
    setStoreForm({
      name: '',
      category: '',
      description: '',
      logo: '',
      colorScheme: '#3B82F6',
      phone: '',
      email: '',
      address: ''
    });
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
  storeId: productForm.storeId || 'tiny-treasure',
      name: productForm.name,
      description: productForm.description,
      specifications: productForm.specifications,
      images: productImages.filter(img => img.trim() !== ''),
      price: productForm.price,
      category: productForm.category,
      variants: [],
      stockLevel: productForm.stockLevel,
      lowStockAlert: productForm.lowStockAlert,
      isFreeShipping: productForm.isFreeShipping,
      shippingRates: {},
      weight: productForm.weight,
      dimensions: {
        length: productForm.length,
        width: productForm.width,
        height: productForm.height
      },
      isActive: true,
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      seoTitle: productForm.seoTitle,
      seoDescription: productForm.seoDescription,
      tags: productForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm({
      storeId: '',
      name: '',
      description: '',
      specifications: '',
      price: 0,
      category: '',
      stockLevel: 0,
      lowStockAlert: 5,
      isFreeShipping: false,
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      seoTitle: '',
      seoDescription: '',
      tags: ''
    });
    setProductImages(['']);
  };

  const handleEditStore = (store: StoreType) => {
    setEditingStore(store);
    setStoreForm({
      name: store.name,
      category: store.category,
      description: store.description,
      logo: store.logo,
      colorScheme: store.colorScheme,
      phone: store.contactInfo.phone,
      email: store.contactInfo.email,
      address: store.contactInfo.address
    });
    setShowStoreModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      storeId: product.storeId,
      name: product.name,
      description: product.description,
      specifications: product.specifications,
      price: product.price,
      category: product.category,
      stockLevel: product.stockLevel,
      lowStockAlert: product.lowStockAlert,
      isFreeShipping: product.isFreeShipping,
      weight: product.weight,
      length: product.dimensions.length,
      width: product.dimensions.width,
      height: product.dimensions.height,
      seoTitle: product.seoTitle || '',
      seoDescription: product.seoDescription || '',
      tags: product.tags.join(', ')
    });
    setProductImages(product.images.length > 0 ? product.images : ['']);
    setShowProductModal(true);
  };

  const addImageField = () => {
    setProductImages([...productImages, '']);
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...productImages];
    newImages[index] = value;
    setProductImages(newImages);
  };

  const removeImageField = (index: number) => {
    if (productImages.length > 1) {
      const newImages = productImages.filter((_, i) => i !== index);
      setProductImages(newImages);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'stores', label: 'Stores', icon: Store },
    { id: 'products', label: 'Products', icon: Package },
  { id: 'add-product', label: 'Add Product', icon: Plus },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'commission', label: 'Commission', icon: DollarSign },
    { id: 'bulk-upload', label: 'Bulk Upload', icon: Upload },
    { id: 'shipping', label: 'Shipping', icon: Settings }
  ];

  // Add-product tab for local DB
  const showAddProductTab = activeTab === 'add-product';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="flex">
        {/* Sidebar with 3D effects */}
        <div className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border-r border-white/20 dark:border-gray-700/20 min-h-screen">
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Platform Admin
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Manage everything</p>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/25'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-teal-600 dark:hover:text-teal-400'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'overview' && <AnalyticsDashboard />}
          
          {activeTab === 'stores' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Store Management</h2>
                <button
                  onClick={() => setShowStoreModal(true)}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg transform hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Store</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                  <div key={store.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={store.logo} alt={store.name} className="w-12 h-12 rounded-full object-cover shadow-lg" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{store.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{store.category}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{store.description}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditStore(store)}
                        className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center space-x-1 transform hover:scale-105"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deleteStore(store.id)}
                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center justify-center space-x-1 transform hover:scale-105"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Management</h2>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2 shadow-lg transform hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  const store = stores.find(s => s.id === product.storeId);
                  return (
                    <div key={product.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{store?.name}</p>
                        <p className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-3">{product.price.toLocaleString()} DA</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center space-x-1 transform hover:scale-105"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center justify-center space-x-1 transform hover:scale-105"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {showAddProductTab && (
            <div className="space-y-6">
              <AddProduct />
            </div>
          )}

          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'commission' && <CommissionDashboard />}
          {activeTab === 'bulk-upload' && <BulkProductUpload />}
          {activeTab === 'shipping' && <ShippingConfiguration />}
        </div>
      </div>

      {/* Store Modal */}
      {showStoreModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingStore ? 'Edit Store' : 'Add New Store'}
              </h3>
              <button
                onClick={() => {
                  setShowStoreModal(false);
                  setEditingStore(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 transform hover:scale-110"
              >
                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleStoreSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Name</label>
                  <input
                    type="text"
                    value={storeForm.name}
                    onChange={(e) => setStoreForm({...storeForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={storeForm.category}
                    onChange={(e) => setStoreForm({...storeForm, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={storeForm.description}
                  onChange={(e) => setStoreForm({...storeForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo URL</label>
                  <input
                    type="url"
                    value={storeForm.logo}
                    onChange={(e) => setStoreForm({...storeForm, logo: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color Scheme</label>
                  <input
                    type="color"
                    value={storeForm.colorScheme}
                    onChange={(e) => setStoreForm({...storeForm, colorScheme: e.target.value})}
                    className="w-full h-12 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={storeForm.phone}
                    onChange={(e) => setStoreForm({...storeForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={storeForm.email}
                    onChange={(e) => setStoreForm({...storeForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  value={storeForm.address}
                  onChange={(e) => setStoreForm({...storeForm, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowStoreModal(false);
                    setEditingStore(null);
                  }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105"
                >
                  <Save className="h-5 w-5" />
                  <span>{editingStore ? 'Update Store' : 'Create Store'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => {
                  setShowProductModal(false);
                  setEditingProduct(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 transform hover:scale-110"
              >
                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store</label>
                  <select
                    value={productForm.storeId}
                    onChange={(e) => setProductForm({...productForm, storeId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    required
                  >
                    <option value="">Select Store</option>
                    {stores.map(store => (
                      <option key={store.id} value={store.id}>{store.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specifications</label>
                <textarea
                  value={productForm.specifications}
                  onChange={(e) => setProductForm({...productForm, specifications: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  rows={2}
                  required
                />
              </div>

              {/* Product Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Images</label>
                <div className="space-y-3">
                  {productImages.map((image, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-1 relative">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => updateImageField(index, e.target.value)}
                          placeholder="Enter image URL"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                        />
                        <Image className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                      {productImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 transform hover:scale-110"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImageField}
                    className="flex items-center space-x-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Another Image</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (DA)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Level</label>
                  <input
                    type="number"
                    value={productForm.stockLevel}
                    onChange={(e) => setProductForm({...productForm, stockLevel: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Low Stock Alert</label>
                  <input
                    type="number"
                    value={productForm.lowStockAlert}
                    onChange={(e) => setProductForm({...productForm, lowStockAlert: parseInt(e.target.value) || 5})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={productForm.weight}
                    onChange={(e) => setProductForm({...productForm, weight: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length (cm)</label>
                  <input
                    type="number"
                    value={productForm.length}
                    onChange={(e) => setProductForm({...productForm, length: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width (cm)</label>
                  <input
                    type="number"
                    value={productForm.width}
                    onChange={(e) => setProductForm({...productForm, width: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={productForm.height}
                    onChange={(e) => setProductForm({...productForm, height: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={productForm.isFreeShipping}
                    onChange={(e) => setProductForm({...productForm, isFreeShipping: e.target.checked})}
                    className="w-5 h-5 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free Shipping</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Title</label>
                  <input
                    type="text"
                    value={productForm.seoTitle}
                    onChange={(e) => setProductForm({...productForm, seoTitle: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.tags}
                    onChange={(e) => setProductForm({...productForm, tags: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Description</label>
                <textarea
                  value={productForm.seoDescription}
                  onChange={(e) => setProductForm({...productForm, seoDescription: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  rows={2}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105"
                >
                  <Save className="h-5 w-5" />
                  <span>{editingProduct ? 'Update Product' : 'Create Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformAdmin;