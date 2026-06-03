import React, { useEffect, useState } from 'react';
import { useOrders } from '../../context/OrderContext';

const OrderNotificationPopup = () => {
  const { notification, clearNotification } = useOrders();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      // Auto hide after 10 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(clearNotification, 500); // Wait for transition
  };

  if (!notification && !isVisible) return null;

  return (
    <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-md px-6 transition-all duration-500 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
    }`}>
      <div className="bg-stone-900 text-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 p-6 flex items-start gap-5 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16 rounded-full"></div>
        
        <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center flex-shrink-0 animate-bounce">
          <span className="material-symbols-outlined text-3xl">notifications_active</span>
        </div>
        
        <div className="flex-grow space-y-1 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">Alchemist AI Message</p>
          <h4 className="text-xl font-headline font-bold">{notification?.title || 'Order Ready!'}</h4>
          <p className="text-sm text-stone-300 leading-relaxed font-light italic">"{notification?.message}"</p>
        </div>
        
        <button 
          onClick={handleClose}
          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};

export default OrderNotificationPopup;
