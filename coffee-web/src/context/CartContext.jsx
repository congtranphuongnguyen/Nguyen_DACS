import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUI } from './UIContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedReward, setAppliedReward] = useState(null);
  const [isCoffeeLover, setIsCoffeeLover] = useState(() => localStorage.getItem('isCoffeeLover') === 'true');
  const { showToast } = useUI();

  useEffect(() => {
    const handleStorageSync = () => {
      const currentVal = localStorage.getItem('isCoffeeLover') === 'true';
      if (currentVal !== isCoffeeLover) {
        setIsCoffeeLover(currentVal);
      }
    };
    window.addEventListener('storage', handleStorageSync);
    const interval = setInterval(handleStorageSync, 500);
    return () => {
      window.removeEventListener('storage', handleStorageSync);
      clearInterval(interval);
    };
  }, [isCoffeeLover]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Load reward from localStorage
    const reward = localStorage.getItem('activeReward');
    if (reward) {
      setAppliedReward(reward);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      // Find if an item with identical ID AND customization already exists
      const existingItemIndex = prev.findIndex(item =>
        item.id === product.id &&
        JSON.stringify(item.customization || null) === JSON.stringify(product.customization || null)
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId, customization = null) => {
    setCart(prev => {
      const newCart = prev.filter(item => {
        const matchesId = item.id === productId;
        const matchesCustomization = JSON.stringify(item.customization || null) === JSON.stringify(customization || null);
        return !(matchesId && matchesCustomization);
      });
      return newCart;
    });
  };

  const updateQuantity = (productId, delta, customization = null) => {
    setCart(prev => {
      return prev.map(item => {
        const matchesId = item.id === productId;
        const matchesCustomization = JSON.stringify(item.customization || null) === JSON.stringify(customization || null);

        if (matchesId && matchesCustomization) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0); // Safety filter
    });
  };

  const clearCart = (wasCoffeeLoverUsed = false) => {
    setCart([]);
    localStorage.removeItem('activeReward');
    localStorage.removeItem('discountRate');
    localStorage.removeItem('hasSpun');
    if (wasCoffeeLoverUsed) {
      localStorage.removeItem('isCoffeeLover');
      localStorage.setItem('ordersCount', '0');
      localStorage.setItem('ritual_orders', '[]');
      setIsCoffeeLover(false);
    } else {
      const currentVal = localStorage.getItem('isCoffeeLover') === 'true';
      setIsCoffeeLover(currentVal);
    }
    setAppliedReward(null);
  };

  const toggleCart = (open) => {
    setIsCartOpen(open !== undefined ? open : !isCartOpen);
  };

  // Memoized values for performance and accuracy
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const priceStr = typeof item.price === 'string' ? item.price : item.price.toString();
    // Remove dots (Vietnamese thousand separator) and other non-numeric chars except minus/dot
    const cleanPrice = parseFloat(priceStr.replace(/\./g, "").replace(/[^0-9.-]+/g, ""));
    return sum + (cleanPrice * item.quantity);
  }, 0);

  // Rewards Logic
  const storedDiscountRate = parseFloat(localStorage.getItem('discountRate')) || 0;

  // Final Savings Calculation: Strict 10% for Coffee Lovers, NO double counting
  let discount = 0;
  if (isCoffeeLover) {
    discount = cartSubtotal * 0.1;
  } else if (storedDiscountRate > 0) {
    discount = cartSubtotal * storedDiscountRate;
  }
  // Đảm bảo chỉ giảm tối đa 10%, không cộng dồn

  // Round for clean display
  discount = Math.round(discount);
  const cartTotal = Math.max(0, cartSubtotal - discount);

  const cartWithGifts = isCoffeeLover && cart.length > 0
    ? [...cart, { id: 'gift-cookie', name: 'Bánh Quy Bơ (Quà tặng)', price: 0, quantity: 1, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800', label: 'Coffee Lover Perk' }]
    : cart;

  return (
    <CartContext.Provider value={{
      cart,
      cartWithGifts,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      toggleCart,
      cartCount: cartWithGifts.reduce((sum, item) => sum + item.quantity, 0),
      cartSubtotal,
      cartTotal,
      appliedReward: storedDiscountRate > 0 ? 'Giảm 10%' : appliedReward,
      isCoffeeLover,
      freeGift: isCoffeeLover ? 'Bánh Quy Bơ (Quà tặng)' : null,
      discount
    }}>
      {children}
    </CartContext.Provider>
  );
};
