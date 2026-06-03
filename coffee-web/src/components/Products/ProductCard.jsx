import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

const ProductCard = ({ id, name, price, label, image, description, isSoldOut, calories, ingredients }) => {
  const { addToCart } = useCart();
  const { openModal } = useUI();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut) return;
    
    const product = { id, name, price, label, image, description };
    addToCart(product);
  };

  return (
    <div className={`group cursor-pointer ${isSoldOut ? 'opacity-60' : ''}`}>
      <Link to={`/product/${id}`}>
        <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-[2rem] bg-surface-container-low shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-outline-variant/10">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Hover Info Overlay */}
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-6 text-center transition-all duration-500">
            <p className="text-surface text-xs font-bold uppercase tracking-wider mb-2">Details</p>
            <div className="h-[1px] w-8 bg-surface/40 mb-4" />
            <p className="text-surface/90 text-sm italic mb-1">{calories || '250 kcal'}</p>
            <p className="text-surface/80 text-[10px] leading-relaxed max-w-[150px]">
              {ingredients || 'Sourced from high-altitude estates, processed with precision.'}
            </p>
          </div>

          <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              disabled={isSoldOut}
              className={`
                font-bold text-xs py-4 px-8 rounded-2xl flex items-center gap-2 shadow-2xl transition-all active:scale-95
                ${isSoldOut 
                  ? 'bg-outline text-surface cursor-not-allowed' 
                  : 'bg-surface text-primary hover:bg-primary hover:text-surface'}
              `}
            >
              {isSoldOut ? 'Notify Me' : 'Quick Add'}
              {!isSoldOut && <span className="material-symbols-outlined text-sm">add</span>}
            </button>
          </div>

          {isSoldOut && (
            <div className="absolute top-6 left-6 bg-error text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Sold Out
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-2 block px-2">
        <div className="flex justify-between items-start">
          <Link to={`/product/${id}`}>
            <h3 className="font-headline font-bold text-lg text-primary group-hover:text-secondary transition-colors">{name}</h3>
          </Link>
          <span className="font-sans font-bold text-primary whitespace-nowrap">{new Intl.NumberFormat('vi-VN').format(price)}đ</span>
        </div>
        <p className="text-secondary font-sans text-sm italic">{label} • {description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
