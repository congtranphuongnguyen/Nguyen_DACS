import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

const imageMap = {
  'Espresso Alchemist': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
  'Espresso': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
  'Macchiato': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
  'Flat White': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
  'Latte Nghệ Thuật': 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop',
  'Latte': 'https://vinbarista.com/vnt_upload/news/08_2022/latte_la_gi.jpg',
  'Cold Brew': 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop',
  'Iced Vanilla Latte': 'https://vinbarista.com/vnt_upload/news/08_2022/latte_la_gi.jpg',
  'Butter Croissant': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
  'Chocolate Muffin': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
  'Trà Đào Đá Xay': 'https://dayphache.edu.vn/wp-content/uploads/2020/02/tra-dao-da-xay-thom-ngon.jpg'
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800";

const Cart = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const { cartSubtotal, cartTotal, appliedReward, freeGift, isCoffeeLover, cartWithGifts, discount, addToCart, cartCount } = useCart();
  const navigate = useNavigate();
  const [removingId, setRemovingId] = useState(null);

  // Recommendations
  const recItems = [
    {
      id: 'p9',
      name: 'Butter Croissant',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
      label: 'Bakery'
    },
    {
      id: 'p10',
      name: 'Chocolate Muffin',
      price: 40000,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
      label: 'Bakery'
    }
  ];

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800';
  };

  const handleRemove = (id, customization, idx) => {
    setRemovingId(`${id}-${idx}`);
    setTimeout(() => {
      onRemove(id, customization);
      setRemovingId(null);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end transition-opacity duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-[-20px_0_60px_rgba(0,0,0,0.3)] flex flex-col transform transition-transform duration-500 ease-out translate-x-0 border-l border-outline-variant/10 animate-in slide-in-from-right">

        {/* Header */}
        <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/50 backdrop-blur-sm shrink-0">
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary tracking-tight">Your Ritual</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mt-1">
              {cartCount} {cartCount === 1 ? 'UNIT' : 'UNITS'} IN BASKET
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95 group"
          >
            <span className="material-symbols-outlined font-bold group-hover:rotate-90 transition-transform duration-300">close</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Items List */}
          <div className="p-8 space-y-10">
            {cartWithGifts.length > 0 ? (
              cartWithGifts.map((item, idx) => {
                // Robust Fallback Logic for Names and Images
                const itemName = item.name || item.productName || 'Unnamed Ritual';
                const mappedImageKey = Object.keys(imageMap).find(key => key.toLowerCase() === itemName.toLowerCase());
                const finalImage = item.imageUrl || item.imageURL || item.ImageURL || item.image || (mappedImageKey ? imageMap[mappedImageKey] : DEFAULT_IMAGE);

                return (
                  <div
                    key={`${item.id}-${idx}`}
                    className={`flex gap-6 items-center transition-all duration-300 ease-out ${removingId === `${item.id}-${idx}` ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100 scale-100'
                      }`}
                  >
                    <div className="w-24 h-24 bg-surface-container rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-outline-variant/10 group">
                      <img
                        src={finalImage}
                        alt={itemName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-primary truncate pr-4 text-xs uppercase tracking-widest">{itemName}</h3>
                        <p className="font-bold text-primary text-sm">{new Intl.NumberFormat('vi-VN').format(parseFloat(item.price || 0))}đ</p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.customization ? (
                          <>
                            <span className="text-[8px] font-bold text-secondary/60 uppercase tracking-tighter">Đường: {item.customization.sugar}</span>
                            <span className="text-[8px] font-bold text-secondary/60 uppercase tracking-tighter ml-1">• Đá: {item.customization.ice}</span>
                            {item.customization.toppings?.length > 0 && (
                              <span className="text-[8px] font-bold text-primary uppercase tracking-tighter ml-1 block">
                                • {item.customization.toppings.join(', ')}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[10px] text-secondary/60 font-bold uppercase tracking-widest italic">
                            {itemName.toLowerCase().includes('trà đào') ? 'Seasonal Special' : (item.label || 'Standard Series')}
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden shadow-sm">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1, item.customization)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all text-primary font-bold active:scale-75"
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="w-10 text-center font-bold text-xs text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1, item.customization)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all text-primary font-bold active:scale-75"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id, item.customization, idx)}
                          className="ml-6 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary hover:text-error transition-all flex items-center gap-2 group p-2 hover:bg-error/5 rounded-lg pl-6"
                        >
                          <span className="material-symbols-outlined text-base group-hover:animate-bounce">delete_sweep</span>
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-outline-variant">shopping_basket</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline text-2xl text-primary italic font-bold">Giỏ hàng của bạn đang trống</h3>
                  <p className="text-secondary text-sm font-light leading-relaxed max-w-[200px] mx-auto">
                    Hãy lựa chọn những hạt cafe tuyệt vời nhất cho ritual của bạn.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/menu');
                  }}
                  className="px-10 py-4 rounded-2xl bg-primary text-on-primary font-bold text-[10px] uppercase tracking-[0.3em] hover:shadow-2xl active:scale-95 transition-all shadow-xl hover:-translate-y-1"
                >
                  Khám phá Menu
                </button>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {cartWithGifts.length > 0 && (
            <div className="px-8 py-8 bg-surface-container-low/30 border-t border-outline-variant/10">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">Frequently Paired With</h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {recItems.map((rec) => (
                  <div key={rec.id} className="min-w-[150px] group cursor-pointer" onClick={() => addToCart(rec)}>
                    <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-white shadow-sm mb-3 border border-outline-variant/10">
                      <img
                        src={rec.image || (imageMap[rec.name] || DEFAULT_IMAGE)}
                        alt={rec.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-3xl">add_circle</span>
                      </div>
                    </div>
                    <h4 className="text-[11px] font-bold text-primary truncate uppercase tracking-tight">{rec.name}</h4>
                    <p className="text-[10px] text-secondary/60 font-bold">{new Intl.NumberFormat('vi-VN').format(parseFloat(rec.price))}đ</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer & Subtotal */}
        {cartWithGifts.length > 0 && (
          <div className="p-8 bg-surface border-t border-outline-variant/10 space-y-6 shrink-0">
            <div className="space-y-3">
              {appliedReward && (
                <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Ưu đãi: {appliedReward}</p>
                    <p className="text-[8px] text-primary/60 font-bold uppercase tracking-tighter">
                      Đã áp dụng mã giảm giá từ Vòng quay may mắn!
                    </p>
                  </div>
                </div>
              )}

              {freeGift && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 shadow-sm">
                  <span className="material-symbols-outlined text-yellow-600 text-sm fill-1">celebration</span>
                  <div>
                    <p className="text-[10px] font-bold text-yellow-700 uppercase tracking-widest">Đặc quyền Coffee Lover</p>
                    <p className="text-[8px] text-yellow-600 font-bold uppercase tracking-tighter">
                      Đã tặng kèm 1 Bánh Quy Bơ!
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-secondary/60 font-bold uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('vi-VN').format(cartSubtotal)}đ</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-xs text-primary font-bold uppercase tracking-widest">
                  <span>Savings</span>
                  <span>-{new Intl.NumberFormat('vi-VN').format(discount)}đ</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-serif font-bold text-primary">Total</span>
                <span className="text-2xl font-serif font-bold text-primary">{new Intl.NumberFormat('vi-VN').format(cartTotal)}đ</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              className="w-full py-5 rounded-[1.5rem] bg-primary text-on-primary font-bold text-[10px] uppercase tracking-[0.4em] hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl group"
            >
              Checkout Now
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
