import React, { useState } from 'react';
import { Save, Package, Image, Plus, X, ArrowLeft, Upload, Eye, ExternalLink } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { categories, algerianStates } from '../../data/mockData';
import { Product } from '../../types';

const AddProduct: React.FC = () => {
  const { addProduct } = useApp();
  const [productImages, setProductImages] = useState<string[]>(['']);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdProductId, setCreatedProductId] = useState<string | null>(null);
  const [shippingRates, setShippingRates] = useState<{ [state: string]: number }>({});
  const [activeShippingTab, setActiveShippingTab] = useState<'free' | 'rates'>('free');
  
  const [productForm, setProductForm] = useState({
    storeId: 'tiny-treasure',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const product: Product = {
      id: productId,
      storeId: productForm.storeId,
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
      createdAt: new Date().toISOString(),
      seoTitle: productForm.seoTitle,
      seoDescription: productForm.seoDescription,
      tags: productForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    addProduct(product);
    
    setCreatedProductId(productId);
    // Reset form
    setProductForm({
      storeId: 'tiny-treasure',
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
    setShippingRates({});
    setActiveShippingTab('free');
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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

  const handleProductImageFileChange = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      updateImageField(index, result);
    };
    reader.readAsDataURL(file);
  };

  const updateShippingRate = (stateName: string, rate: number) => {
    setShippingRates(prev => ({
      ...prev,
      [stateName]: rate
    }));
  };

  const setZoneRates = (zone: string, rate: number) => {
    const statesInZone = algerianStates.filter(state => state.zone === zone);
    const newRates = { ...shippingRates };
    statesInZone.forEach(state => {
      newRates[state.name] = rate;
    });
    setShippingRates(newRates);
  };

  const copyProductLink = () => {
    if (createdProductId) {
      const productLink = `${window.location.origin}/product/${createdProductId}`;
      navigator.clipboard.writeText(productLink);
      alert('Product link copied to clipboard! You can now share it on social media.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Save className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-green-800 dark:text-green-400 font-medium">Product Added Successfully!</h3>
              <p className="text-green-700 dark:text-green-300 text-sm">Your product has been saved to the local database.</p>
            </div>
          </div>
          {createdProductId && (
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={`/product/${createdProductId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Eye className="h-4 w-4" />
                <span>View Product Page</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                onClick={copyProductLink}
                className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Copy Link for Social Media</span>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Product</h2>
            <p className="text-gray-600 dark:text-gray-400">Create a new product for your store</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              value={productForm.description}
              onChange={(e) => setProductForm({...productForm, description: e.target.value})}
              placeholder="Detailed product description"
              className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specifications</label>
            <textarea
              value={productForm.specifications}
              onChange={(e) => setProductForm({...productForm, specifications: e.target.value})}
              placeholder="Technical specifications and features"
              className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              rows={3}
              required
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Images</label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Upload from your device or enter image URLs</p>
            <div className="space-y-3">
              {productImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1 space-y-2">
                    {/* File Upload */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleProductImageFileChange(index, file);
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-teal-400 dark:hover:border-teal-500 transition-colors bg-white dark:bg-gray-700">
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                          <Upload className="h-4 w-4" />
                          <span className="text-sm">Upload from device</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* URL Input */}
                    <div className="relative">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value)}
                        placeholder="Or enter image URL"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                        required={index === 0}
                      />
                      <Image className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    
                    {/* Image Preview */}
                    {image && (
                      <div className="relative">
                        <img 
                          src={image} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">{getTranslatedText('quick_zone_setup')}</h4>
                      {getTranslatedText('east')}: 600 DA
                  {productImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 transform hover:scale-110"
                    >
                      {getTranslatedText('west')}: 700 DA
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                      {getTranslatedText('south')}: 1200 DA
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
                placeholder="0"
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
                placeholder="0"
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
                placeholder="5"
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
                placeholder="0.0"
                className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length (cm)</label>
              <input
                type="number"
                value={productForm.length}
                onChange={(e) => setProductForm({...productForm, length: parseInt(e.target.value) || 0})}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width (cm)</label>
              <input
                type="number"
                value={productForm.width}
                onChange={(e) => setProductForm({...productForm, width: parseInt(e.target.value) || 0})}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                value={productForm.height}
                onChange={(e) => setProductForm({...productForm, height: parseInt(e.target.value) || 0})}
                placeholder="0"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{getTranslatedText('seo_title')}</label>
              <input
                type="text"
                value={productForm.seoTitle}
                onChange={(e) => setProductForm({...productForm, seoTitle: e.target.value})}
                placeholder={getTranslatedText('seo_optimized_title')}
                className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{getTranslatedText('tags_comma')}</label>
              <input
                type="text"
                value={productForm.tags}
                onChange={(e) => setProductForm({...productForm, tags: e.target.value})}
                placeholder={getTranslatedText('tags_placeholder')}
                className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{getTranslatedText('seo_description')}</label>
            <textarea
              value={productForm.seoDescription}
              onChange={(e) => setProductForm({...productForm, seoDescription: e.target.value})}
              placeholder={getTranslatedText('seo_meta_description')}
              className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              rows={2}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg transform hover:scale-105 font-medium text-lg"
          >
            <Save className="h-6 w-6" />
            <span>Add Product to Database</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
