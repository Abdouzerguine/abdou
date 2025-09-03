import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Image,
  X,
  Save,
  LogOut
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import AnalyticsDashboard from '../../components/Admin/AnalyticsDashboard';
import OrderManagement from '../../components/Admin/OrderManagement';
import BulkProductUpload from '../../components/Admin/BulkProductUpload';
import ShippingConfiguration from '../../components/Admin/ShippingConfiguration';
import AddProduct from './AddProduct';
import { Product } from '../../types';
import { categories } from '../../data/mockData';

const PlatformAdmin: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct
  } = useApp();
  const { logout, userEmail } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<string[]>(['']);


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


  const getTranslatedText = (key: string) => {
    const translations = {
      'product_management': {
        en: 'Product Management',
        ar: 'إدارة المنتجات',
        fr: 'Gestion des Produits'
      },
      'manage_store_products': {
        en: 'Manage your store products',
        ar: 'إدارة منتجات متجرك',
        fr: 'Gérer les produits de votre magasin'
      },
      'add_product': {
        en: 'Add Product',
        ar: 'إضافة منتج',
        fr: 'Ajouter Produit'
      },
      'edit': {
        en: 'Edit',
        ar: 'تعديل',
        fr: 'Modifier'
      },
      'delete': {
        en: 'Delete',
        ar: 'حذف',
        fr: 'Supprimer'
      },
      'view_page': {
        en: 'View Page',
        ar: 'عرض الصفحة',
        fr: 'Voir la Page'
      },
      'product_link_copied': {
        en: 'Product link copied! Share it on social media.',
        ar: 'تم نسخ رابط المنتج! شاركه على وسائل التواصل الاجتماعي.',
        fr: 'Lien du produit copié! Partagez-le sur les réseaux sociaux.'
      },
      'no_products_yet': {
        en: 'No products yet',
        ar: 'لا توجد منتجات بعد',
        fr: 'Aucun produit pour le moment'
      },
      'add_first_product': {
        en: 'Start by adding your first product to the store',
        ar: 'ابدأ بإضافة منتجك الأول إلى المتجر',
        fr: 'Commencez par ajouter votre premier produit au magasin'
      },
      'add_first_product_button': {
        en: 'Add Your First Product',
        ar: 'أضف منتجك الأول',
        fr: 'Ajouter Votre Premier Produit'
      }
    };
    return translations[key]?.[currentLanguage] || key;
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
      storeId: 'tiny-treasure', // Default store ID
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
    { id: 'products', label: 'Products', icon: Package },
  { id: 'add-product', label: 'Add Product', icon: Plus },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
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
            <div className="flex items-center space-x-3 mb-2">
              <img 
                src="/1751431085937.png" 
                alt="Tiny Treasure Logo" 
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Tiny Treasure Admin
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Welcome, {userEmail}</p>
            <button
              onClick={logout}
              className="mt-2 flex items-center space-x-1 text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              <LogOut className="h-3 w-3" />
              <span>Logout</span>
            </button>
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
          

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Management</h2>
                  <p className="text-gray-600 dark:text-gray-400">Manage your store products</p>
                </div>
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
                  return (
                    <div key={product.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tiny Treasure</p>
                        <p className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-3">{product.price.toLocaleString()} DA</p>
                        <div className="flex space-x-2 mb-3">
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
                        <div className="flex space-x-2">
                          <a
                            href={`/product/${product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-1 transform hover:scale-105 text-xs"
                          >
                            <Eye className="h-3 w-3" />
                            <span>View Page</span>
                          </a>
                          <button
                            onClick={() => {
                              const productLink = `${window.location.origin}/product/${product.id}`;
                              navigator.clipboard.writeText(productLink);
                              alert('Product link copied! Share it on social media.');
                            }}
                            className="flex-1 bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-all duration-200 flex items-center justify-center space-x-1 transform hover:scale-105 text-xs"
                          >
                            <Share2 className="h-3 w-3" />
                            <span>Copy Link</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {products.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Start by adding your first product to the store</p>
                  <button
                    onClick={() => setShowProductModal(true)}
                    className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2 shadow-lg mx-auto"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Your First Product</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {showAddProductTab && (
            <div className="space-y-6">
              <AddProduct />
            </div>
          )}

          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'bulk-upload' && <BulkProductUpload />}
          {activeTab === 'shipping' && <ShippingConfiguration />}
        </div>
      </div>


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
                    <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  placeholder="Detailed product description"
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
                  placeholder="Technical specifications and features"
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
                          placeholder="Enter image URL (e.g., from Pexels)"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                          required={index === 0}
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
                    placeholder="0"
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
                    placeholder="0"
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
                    placeholder="5"
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
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length (cm)</label>
                  <input
                    type="number"
                    value={productForm.length}
                    onChange={(e) => setProductForm({...productForm, length: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width (cm)</label>
                  <input
                    type="number"
                    value={productForm.width}
                    onChange={(e) => setProductForm({...productForm, width: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={productForm.height}
                    onChange={(e) => setProductForm({...productForm, height: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="0"
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
                    placeholder="SEO optimized title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.tags}
                    onChange={(e) => setProductForm({...productForm, tags: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Description</label>
                <textarea
                  value={productForm.seoDescription}
                  onChange={(e) => setProductForm({...productForm, seoDescription: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                  placeholder="SEO meta description"
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