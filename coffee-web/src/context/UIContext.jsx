import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const UIContext = createContext();

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export const UIProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: null, data: null });
  const [journal, setJournal] = useState(() => {
    const saved = localStorage.getItem('journal');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('journal', JSON.stringify(journal));
  }, [journal]);

  const addToJournal = useCallback((item, rating = 5) => {
    setJournal(prev => {
      const exists = prev.find(j => j.id === item.id);
      if (exists) return prev;
      return [...prev, { ...item, rating, date: new Date().toISOString() }];
    });
    showToast(`Saved to Journal!`);
  }, []);

  // Singleton Toast Logic: Clears previous toast before showing new one
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    // Replaces the array with only the newest toast to prevent stacking
    setToasts([{ id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2000); // Reduced duration as requested
  }, []);

  const openModal = useCallback((type, data = null) => {
    setModal({ isOpen: true, type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, type: null, data: null });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newVal = !prev;
      localStorage.setItem('darkMode', newVal);
      if (newVal) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newVal;
    });
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <UIContext.Provider value={{ 
      toasts, 
      showToast, 
      modal, 
      openModal, 
      closeModal, 
      isDarkMode, 
      toggleDarkMode,
      journal,
      addToJournal
    }}>
      {children}
    </UIContext.Provider>
  );
};
