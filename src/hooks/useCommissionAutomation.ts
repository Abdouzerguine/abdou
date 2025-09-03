import { useEffect } from 'react';
import { useCommission } from '../contexts/CommissionContext';
import { useApp } from '../contexts/AppContext';

export const useCommissionAutomation = () => {
  const { processCommission, settings } = useCommission();
  const { orders } = useApp();

  useEffect(() => {
    // Listen for new completed orders and process commissions
    const processNewOrders = () => {
      orders
        .filter(order => order.status === 'delivered')
        .forEach(order => {
          // Check if commission has already been processed for this order
          const products = order.items.map(item => ({
            id: item.productId,
            name: item.productName,
            storeId: order.storeId,
            storeName: order.storeName,
            saleAmount: item.totalPrice
          }));

          // Process commission for each product in the order
          if (settings.autoDistribute) {
            processCommission(order.id, products);
          }
        });
    };

    // Process commissions when orders change
    processNewOrders();
  }, [orders, processCommission, settings.autoDistribute]);

  return {
    // Utility functions for manual commission processing
    processOrderCommission: (orderId: string) => {
      const order = orders.find(o => o.id === orderId);
      if (order && order.status === 'delivered') {
        const products = order.items.map(item => ({
          id: item.productId,
          name: item.productName,
          storeId: order.storeId,
          storeName: order.storeName,
          saleAmount: item.totalPrice
        }));
        processCommission(order.id, products);
      }
    }
  };
};