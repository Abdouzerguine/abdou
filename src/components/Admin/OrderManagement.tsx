import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, Phone, Mail, MapPin, Eye, Edit, Filter, Search } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Order } from '../../types';

interface OrderManagementProps {
  storeId?: string; // If provided, show only orders for this store
}

const OrderManagement: React.FC<OrderManagementProps> = ({ storeId }) => {
  const { orders, updateOrder, stores } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Filter orders based on store (if storeId provided) and other filters
  const filteredOrders = orders
    .filter(order => !storeId || order.storeId === storeId)
    .filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-400';
      case 'confirmed': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-400';
      case 'processing': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-400';
      case 'shipped': return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-400';
      case 'delivered': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrder(orderId, { status: newStatus as any });
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const getDeliveryCompanyInfo = (order: Order) => {
    // This would normally come from a delivery company selection
    // For now, we'll use a default based on the delivery type
    return {
      name: order.deliveryType === 'home' ? 'Yalidine' : 'Ecolog',
      phone: order.deliveryType === 'home' ? '+213 770 123 456' : '+213 770 234 567',
      trackingUrl: '#'
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {storeId ? 'Store Orders' : 'All Orders'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track customer orders
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order number, customer name, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders found</h3>
            <p className="text-gray-600 dark:text-gray-400">No orders match your current filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.orderNumber}
                        </div>
                        {!storeId && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {order.storeName}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.customerInfo.firstName} {order.customerInfo.lastName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {order.customerInfo.phone}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {order.customerInfo.wilaya}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.deliveryType === 'home' ? 'Home Delivery' : 'Office Pickup'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.finalTotal.toLocaleString()} DA
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        +{order.shippingCost.toLocaleString()} DA shipping
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-teal-600 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Details - {selectedOrder.orderNumber}
              </h3>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Customer Information</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedOrder.customerInfo.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedOrder.customerInfo.email}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="text-sm text-gray-900 dark:text-white">
                      {selectedOrder.customerInfo.address}<br />
                      {selectedOrder.customerInfo.commune}, {selectedOrder.customerInfo.wilaya}
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <h4 className="font-semibold text-gray-900 dark:text-white">Delivery Information</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Delivery Type:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedOrder.deliveryType === 'home' ? 'Home Delivery' : 'Office Pickup'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Delivery Company:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {getDeliveryCompanyInfo(selectedOrder).name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Company Phone:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {getDeliveryCompanyInfo(selectedOrder).phone}
                    </span>
                  </div>
                  {selectedOrder.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.productName}
                          </div>
                          {item.variantDetails && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {item.variantDetails}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity} × {item.unitPrice.toLocaleString()} DA
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.totalPrice.toLocaleString()} DA
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedOrder.totalAmount.toLocaleString()} DA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Shipping:</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedOrder.shippingCost.toLocaleString()} DA
                    </span>
                  </div>
                  <div className="flex justify-between border-t dark:border-gray-600 pt-2">
                    <span className="font-medium text-gray-900 dark:text-white">Total:</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      {selectedOrder.finalTotal.toLocaleString()} DA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowOrderDetails(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Generate delivery company program data
                  const deliveryData = {
                    orderNumber: selectedOrder.orderNumber,
                    customerName: `${selectedOrder.customerInfo.firstName} ${selectedOrder.customerInfo.lastName}`,
                    phone: selectedOrder.customerInfo.phone,
                    address: `${selectedOrder.customerInfo.address}, ${selectedOrder.customerInfo.commune}, ${selectedOrder.customerInfo.wilaya}`,
                    deliveryType: selectedOrder.deliveryType,
                    totalAmount: selectedOrder.finalTotal,
                    items: selectedOrder.items.length,
                    weight: selectedOrder.items.length * 0.5, // Estimated weight
                    notes: `Order from ${selectedOrder.storeName}`
                  };
                  
                  // Copy to clipboard for easy pasting into delivery company system
                  navigator.clipboard.writeText(JSON.stringify(deliveryData, null, 2));
                  alert('Order data copied to clipboard! You can now paste it into the delivery company system.');
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Copy for Delivery Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;