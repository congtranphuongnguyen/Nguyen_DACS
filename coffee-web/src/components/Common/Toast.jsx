import React from 'react';
import { useUI } from '../../context/UIContext';

const Toast = () => {
  const { toasts } = useUI();

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            min-w-[300px] px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4
            animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto
            ${toast.type === 'success' ? 'bg-primary text-white' : 'bg-error text-white'}
          `}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span className="font-sans font-bold text-sm tracking-wide">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
