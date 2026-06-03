import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('ritual_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('ritual_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = async (orderData) => {
    const toppings = orderData.itemList?.reduce((acc, item) => {
      if (item.customization?.toppings) acc.push(...item.customization.toppings);
      return acc;
    }, []) || [];

    const newOrder = {
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userEmail: orderData.user,
      items: orderData.items,
      customDetails: JSON.stringify(toppings),
      total: typeof orderData.total === 'string' 
        ? parseFloat(orderData.total.replace(/[^0-9.-]+/g, "")) 
        : orderData.total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    let resultOrder;
    try {
      const savedOrder = await api.createOrder(newOrder);
      // Sync local state with saved database ID
      const orderForState = {
        ...orderData,
        id: savedOrder.id.toString(),
        status: 'pending',
        createdAt: savedOrder.createdAt,
        date: new Date(savedOrder.createdAt).toLocaleDateString()
      };
      setOrders(prev => [orderForState, ...prev]);
      resultOrder = orderForState;
    } catch (error) {
      console.error("Failed to save order to database:", error);
      // Fallback to local state if API fails (for resilience)
      const localOrder = { ...orderData, id: newOrder.orderNumber, status: 'pending', createdAt: newOrder.createdAt };
      setOrders(prev => [localOrder, ...prev]);
      resultOrder = localOrder;
    }
    return resultOrder;
  };

  const updateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));

    // Handle real-time notification simulation for User
    if (newStatus === 'ready') {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        const userName = order.user.split('@')[0];
        setNotification({
          title: "Order Ready!",
          message: `${userName} ơi, cafe của bạn đã pha xong rồi, mời bạn tới quầy nhận nhé!`,
          type: 'ai'
        });
      }
    }
  };

  const updateOrder = (orderId, updates) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, ...updates } : order
    ));
  };

  const deleteOrderByUser = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, isDeletedByUser: true } : order
    ));
  };

  const clearNotification = () => setNotification(null);

  const resetOrders = () => {
    setOrders([]);
    localStorage.setItem('ritual_orders', '[]');
    localStorage.setItem('ordersCount', '0');
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      updateStatus, 
      updateOrder,
      deleteOrderByUser,
      resetOrders,
      notification, 
      clearNotification 
    }}>
      {children}
    </OrderContext.Provider>
  );
};
