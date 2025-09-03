import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, AlertCircle, Info, Eye, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { categories, deliveryCompanies, algerianStates } from '../../data/mockData';

interface UploadError {
  row: number;
  field: string;
  message: string;
}

interface UploadResult {
  success: number;
  errors: number;
  warnings: number;
  errorDetails: UploadError[];
}

const BulkProductUpload: React.FC = () => {
  const { bulkUpdateProducts } = useApp();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadResults, setUploadResults] = useState<UploadResult>({ 
    success: 0, 
    errors: 0, 
    warnings: 0, 
    errorDetails: [] 
  });
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus('uploading');
    
    // Simulate file processing with validation
    setTimeout(() => {
      const mockResults: UploadResult = { 
        success: 42, 
        errors: 3,
        warnings: 2,
        errorDetails: [
          { row: 5, field: 'Price', message: 'Invalid price format. Must be numeric.' },
          { row: 12, field: 'SKU', message: 'SKU already exists in system.' },
          { row: 18, field: 'Images', message: 'Primary image URL is not accessible.' }
        ]
      };
      setUploadResults(mockResults);
      setUploadStatus(mockResults.errors > 0 ? 'error' : 'success');
    }, 3000);
  };

  const downloadTemplate = () => {
    // Enhanced CSV template with all required fields
    const csvContent = `Product Name*,Category*,Description*,Specifications*,Price (DZD)*,SKU*,Stock Quantity*,Primary Image URL*,Gallery Image URLs,Free Shipping,Delivery Partner,Weight (kg),Dimensions (L×W×H cm),Tags,SEO Title,SEO Description,Variant Type 1,Variant Values 1,Variant Type 2,Variant Values 2,Low Stock Alert,${algerianStates.map(state => `${state.name} Shipping Rate`).join(',')}
"Premium Leather Crossbody Bag - Brown","Accessories > Bags > Crossbody","Elegant handcrafted leather crossbody bag perfect for daily use. Made from genuine cowhide leather with antique brass hardware. Features adjustable strap (28-52 inches), main compartment with zip closure, front pocket for phone, and interior card slots. Dimensions: 25×18×8 cm. Care: Clean with leather conditioner.","Material: Genuine Cowhide Leather; Hardware: Antique Brass; Strap: Adjustable 28-52 inches; Closure: Zip; Interior: Card slots and phone pocket; Care: Leather conditioner recommended",12500,"ACC-BAG-CROSS-BRN-001",25,"https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg","https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg|https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",FALSE,"Yalidine",0.4,"25×18×8","leather bag crossbody brown accessories","Premium Leather Crossbody Bag - Handcrafted Brown Leather","Elegant handcrafted leather crossbody bag with adjustable strap and multiple compartments. Perfect for daily use.","Color","Brown|Black|Tan","Size","Small|Medium","5",${algerianStates.map(state => {
      const basePrice = state.zone === 'north' ? 400 : 
                      state.zone === 'south' ? 1200 : 
                      state.zone === 'east' ? 600 : 700;
      return basePrice;
    }).join(',')}
"Wireless Bluetooth Headphones","Electronics > Audio > Headphones","High-quality wireless Bluetooth headphones with active noise cancellation. 30-hour battery life, premium sound quality with deep bass. Comfortable over-ear design with memory foam padding. Quick charge: 15 minutes for 3 hours playback. Compatible with all Bluetooth devices.","Connectivity: Bluetooth 5.0; Battery: 30 hours playback; Charging: USB-C fast charge; Drivers: 40mm dynamic; Frequency: 20Hz-20kHz; Noise Cancellation: Active ANC; Weight: 250g",8500,"ELEC-AUDIO-HEAD-BLK-001",50,"https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg","https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",TRUE,"",0.3,"20×18×8","headphones bluetooth wireless audio electronics","Wireless Bluetooth Headphones - 30H Battery ANC","Premium wireless Bluetooth headphones with 30-hour battery and active noise cancellation.","Color","Black|White|Blue","","","10",${algerianStates.map(() => 0).join(',')}
"Organic Argan Oil Skincare Set","Beauty > Skincare > Sets","Complete organic skincare routine featuring pure Moroccan argan oil. Set includes: facial cleanser (100ml), toner (150ml), serum (30ml), and moisturizer (50ml). Suitable for all skin types, anti-aging properties, deeply hydrating. Dermatologist tested, cruelty-free.","Contents: Cleanser 100ml + Toner 150ml + Serum 30ml + Moisturizer 50ml; Origin: Morocco; Certification: Organic; Skin Type: All types; Benefits: Anti-aging hydrating; Testing: Dermatologist approved",6500,"BEAUTY-SKIN-SET-ARG-001",30,"https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg","https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg|https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg",FALSE,"Ecolog",0.5,"15×12×6","skincare argan oil organic beauty set","Organic Argan Oil Skincare Set - Complete 4-Step Routine","Complete organic skincare set with pure Moroccan argan oil. Anti-aging and deeply hydrating for all skin types.","Skin Type","Dry|Oily|Combination|Sensitive","","","8",${algerianStates.map(state => {
      const basePrice = state.zone === 'north' ? 300 : 
                      state.zone === 'south' ? 800 : 
                      state.zone === 'east' ? 500 : 600;
      return basePrice;
    }).join(',')}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tiny_treasure_product_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadInstructions = () => {
    const instructions = `TINY TREASURE - BULK PRODUCT UPLOAD INSTRUCTIONS

REQUIRED FIELDS (marked with *):
• Product Name*: Max 100 characters, be specific and descriptive
• Category*: Use format "Main > Sub > Specific" (e.g., "Electronics > Audio > Headphones")
• Description*: Minimum 100 characters, include features, materials, dimensions, care instructions
• Specifications*: Format as "Property: Value" pairs separated by semicolons
• Price (DZD)*: Numbers only, no currency symbols
• SKU*: Unique code format: CATEGORY-ITEM-COLOR-SIZE (e.g., "ELEC-PHONE-BLK-128GB")
• Stock Quantity*: Current inventory count
• Primary Image URL*: High-resolution front view image

OPTIONAL FIELDS:
• Gallery Image URLs: Multiple URLs separated by "|" symbol
• Free Shipping: TRUE/FALSE (if FALSE, must specify shipping rates)
• Delivery Partner: Choose from ${deliveryCompanies.map(c => c.name).join(', ')}
• Weight: In kilograms (for shipping calculation)
• Dimensions: Format as "Length×Width×Height cm"
• Tags: Comma-separated keywords for search
• SEO Title/Description: For search engine optimization
• Variants: Up to 2 variant types (Color, Size, Style) with values separated by "|"

SHIPPING RATES:
• If Free Shipping = FALSE, you must specify rates for all 58 Algerian wilayas
• Rates should be in DZD (Algerian Dinars)
• Consider zone-based pricing: North (300-500), South (800-1200), East (500-700), West (600-800)

IMAGE REQUIREMENTS:
• Use high-quality images (minimum 800×800 pixels)
• Supported formats: JPG, PNG
• Maximum file size: 5MB per image
• Include multiple angles and detail shots

VALIDATION RULES:
• SKUs must be unique across the platform
• Prices must be positive numbers
• Stock quantities must be non-negative integers
• Image URLs must be accessible and valid
• Category must exist in our system
• Delivery partner must be from approved list

TIPS FOR SUCCESS:
• Test with a small batch first (5-10 products)
• Ensure all image URLs are publicly accessible
• Use consistent naming conventions for variants
• Include detailed, customer-friendly descriptions
• Set appropriate low stock alerts (typically 5-10 units)

For support, contact: tiny05treasure@gmail.com`;

    const blob = new Blob([instructions], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_upload_instructions.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Template Preview Modal */}
      {showTemplatePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Template Preview</h3>
              <button
                onClick={() => setShowTemplatePreview(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Required Fields</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Product Name*</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Category*</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Description*</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Price (DZD)*</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">SKU*</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Stock Quantity*</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-400 mb-2">Available Categories</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                {categories.map(cat => (
                  <div key={cat.id} className="text-blue-800 dark:text-blue-300">
                    {cat.icon} {cat.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-medium text-green-900 dark:text-green-400 mb-2">Approved Delivery Partners</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {deliveryCompanies.map(company => (
                  <div key={company.id} className="text-green-800 dark:text-green-300">
                    📦 {company.name} - Coverage: {company.coverage.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Details Modal */}
      {showErrorDetails && uploadResults.errorDetails.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Error Details</h3>
              <button
                onClick={() => setShowErrorDetails(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              {uploadResults.errorDetails.map((error, index) => (
                <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-red-900 dark:text-red-400">
                        Row {error.row} - {error.field}
                      </div>
                      <div className="text-sm text-red-700 dark:text-red-300">
                        {error.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Bulk Product Upload</h3>
        
        {/* Enhanced Template Download Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">
                📋 Enhanced CSV Template & Instructions
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                Download our comprehensive template with sample products and detailed instructions for all 58 Algerian wilayas.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={downloadTemplate}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CSV Template</span>
                </button>
                <button
                  onClick={downloadInstructions}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download Instructions</span>
                </button>
                <button
                  onClick={() => setShowTemplatePreview(true)}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-900 dark:text-amber-400 mb-2">Important Upload Guidelines</h4>
              <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
                <li>• All required fields marked with (*) must be completed</li>
                <li>• SKUs must be unique across the entire platform</li>
                <li>• Image URLs must be publicly accessible and high-quality</li>
                <li>• If Free Shipping = FALSE, specify rates for all 58 wilayas</li>
                <li>• Test with a small batch (5-10 products) before bulk upload</li>
                <li>• Maximum file size: 10MB | Supported formats: CSV, Excel (.xlsx, .xls)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-teal-400 dark:hover:border-teal-500 transition-colors">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="bulk-upload"
          />
          <label htmlFor="bulk-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload Product File</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Drag and drop your CSV or Excel file here, or click to browse
            </p>
            <div className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors inline-block">
              Choose File
            </div>
          </label>
        </div>

        {/* Upload Status */}
        {uploadStatus !== 'idle' && (
          <div className="mt-6">
            {uploadStatus === 'uploading' && (
              <div className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
                <div>
                  <span className="text-yellow-800 dark:text-yellow-400 font-medium">Processing your file...</span>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Validating products, checking SKUs, and verifying image URLs
                  </div>
                </div>
              </div>
            )}

            {(uploadStatus === 'success' || uploadStatus === 'error') && (
              <div className={`p-4 border rounded-lg ${
                uploadStatus === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  {uploadStatus === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                  <span className={`font-medium ${
                    uploadStatus === 'success' 
                      ? 'text-green-800 dark:text-green-400' 
                      : 'text-red-800 dark:text-red-400'
                  }`}>
                    {uploadStatus === 'success' ? 'Upload completed!' : 'Upload completed with errors'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border">
                    <span className="text-gray-600 dark:text-gray-400">Successfully processed:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{uploadResults.success} products</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border">
                    <span className="text-gray-600 dark:text-gray-400">Errors:</span>
                    <span className="font-bold text-red-600 dark:text-red-400">{uploadResults.errors} products</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border">
                    <span className="text-gray-600 dark:text-gray-400">Warnings:</span>
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">{uploadResults.warnings} products</span>
                  </div>
                </div>

                {uploadResults.errors > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowErrorDetails(true)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      View Error Details
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Validation Rules */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Validation Rules & Best Practices:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h5 className="font-medium mb-2">Required Field Validation:</h5>
              <ul className="space-y-1">
                <li>• Product names must be 10-100 characters</li>
                <li>• Prices must be positive numbers (DZD)</li>
                <li>• SKUs must be unique and follow format</li>
                <li>• Stock quantities must be non-negative</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Content Quality Checks:</h5>
              <ul className="space-y-1">
                <li>• Descriptions minimum 100 characters</li>
                <li>• Image URLs must be accessible</li>
                <li>• Categories must exist in system</li>
                <li>• Shipping rates required if not free</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Upload History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">electronics_batch_march.csv</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Uploaded 2 hours ago • 156 products</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-2 py-1 rounded-full font-medium">142 Success</span>
              <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-400 px-2 py-1 rounded-full font-medium">14 Errors</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">fashion_spring_collection.xlsx</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Uploaded yesterday • 89 products</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-2 py-1 rounded-full font-medium">89 Success</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 px-2 py-1 rounded-full font-medium">0 Errors</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">beauty_products_update.csv</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Uploaded 3 days ago • 67 products</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-2 py-1 rounded-full font-medium">62 Success</span>
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-400 px-2 py-1 rounded-full font-medium">5 Warnings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkProductUpload;