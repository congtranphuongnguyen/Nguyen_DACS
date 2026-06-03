import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ items, onRemove, onUpdateQuantity }) => {
  const subtotal = items.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : item.price;
    return sum + price * item.quantity;
  }, 0);
  const shipping = items.length > 0 ? 30000 : 0;
  const tax = subtotal * 0.08; // 8% tax estimation
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="py-32 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="material-symbols-outlined text-8xl text-stone-200 mb-8 block">shopping_basket</span>
        <h1 className="font-headline text-5xl font-bold text-stone-800 mb-6 tracking-tight">Your basket is empty</h1>
        <p className="text-stone-500 mb-12 max-w-md mx-auto leading-relaxed italic">"The true magic of coffee starts with the first bean. Your ritual is waiting to begin."</p>
        <Link
          to="/shop"
          className="bg-stone-800 text-white px-12 py-5 rounded-lg font-label font-bold text-sm tracking-[0.2em] hover:bg-stone-700 transition-all shadow-xl active:scale-95 inline-block"
        >
          START YOUR CEREMONY
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <header className="mb-20">
        <h1 className="font-headline text-6xl font-bold tracking-tight text-stone-800 mb-6">Your Ritual</h1>
        <p className="font-body text-stone-500 max-w-2xl leading-relaxed text-lg">
          Review the selections for your next brewing ceremony. Each bean is roasted to order to ensure the peak of sensory expression.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="flex flex-col space-y-16">
            {items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-12 pb-16 border-b border-stone-100 last:border-0">
                <div className="w-40 h-48 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                  <img className="w-full h-full object-cover" src={item.ImageURL || item.imageURL || item.imageUrl || item.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800'} alt={item.name} />
                </div>

                <div className="flex-grow space-y-4">
                  <div>
                    <span className="text-stone-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-2 block">
                      {item.region || 'Artisanal Selection'}
                    </span>
                    <h3 className="font-headline text-3xl text-stone-800 mb-2 font-bold">{item.name}</h3>
                    
                    {/* Customization Details */}
                    {item.customization ? (
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-stone-100 text-[10px] font-bold text-stone-600 rounded-full uppercase tracking-widest">Đường: {item.customization.sugar}</span>
                        <span className="px-3 py-1 bg-stone-100 text-[10px] font-bold text-stone-600 rounded-full uppercase tracking-widest">Đá: {item.customization.ice}</span>
                        {item.customization.toppings?.map(topping => (
                          <span key={topping} className="px-3 py-1 bg-primary/10 text-[10px] font-bold text-primary rounded-full uppercase tracking-widest">+{topping}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="font-body text-sm text-stone-500 max-w-md leading-relaxed mb-3">{item.description}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="flex items-center bg-stone-100 rounded-xl p-1 gap-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1, item.customization)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all text-stone-800 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="w-12 text-center font-bold text-sm text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1, item.customization)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all text-stone-800 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.id, item.customization)}
                      className="text-[10px] font-bold text-red-400 uppercase tracking-[0.2em] hover:text-red-600 transition-colors py-2"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 self-start md:self-center">
                  <span className="font-headline text-2xl text-stone-800 font-bold">{new Intl.NumberFormat('vi-VN').format(parseFloat(item.price) * item.quantity)}đ</span>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Add-on */}
          <div className="mt-24 p-12 bg-stone-50 rounded-3xl border border-stone-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-200/20 rounded-full blur-3xl -z-10 group-hover:bg-stone-300/30 transition-colors"></div>
            <h4 className="font-headline text-2xl text-stone-800 mb-10 font-bold">Complete the Ritual</h4>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-stone-400 text-4xl">filter_vintage</span>
                </div>
                <div>
                  <h5 className="font-headline text-xl text-stone-800 font-bold mb-1">Unbleached Paper Filters</h5>
                  <p className="text-sm text-stone-500 font-light">Pack of 100. Oxygen-cleansed for purest clarity.</p>
                </div>
              </div>
              <button
                className="bg-stone-800 hover:bg-stone-700 text-white px-10 py-4 rounded-xl text-xs font-bold tracking-[0.2em] transition-all whitespace-nowrap shadow-lg active:scale-95"
              >
                ADD TO CART — 50.000đ
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="lg:col-span-4 sticky top-40">
          <div className="bg-stone-900 rounded-[32px] p-12 text-stone-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <h2 className="font-headline text-2xl mb-10 font-bold">Order Summary</h2>

            <div className="space-y-6 mb-10 font-light">
              <div className="flex justify-between items-center text-stone-400">
                <span className="text-sm uppercase tracking-widest font-bold">Subtotal</span>
                <span className="font-headline text-lg text-white">{new Intl.NumberFormat('vi-VN').format(subtotal)}đ</span>
              </div>
              <div className="flex justify-between items-center text-stone-400">
                <span className="text-sm uppercase tracking-widest font-bold">Shipping</span>
                <span className="font-headline text-lg text-white">{new Intl.NumberFormat('vi-VN').format(shipping)}đ</span>
              </div>
              <div className="flex justify-between items-center text-stone-400">
                <span className="text-sm uppercase tracking-widest font-bold">Estimated Tax</span>
                <span className="font-headline text-lg text-white">{new Intl.NumberFormat('vi-VN').format(tax)}đ</span>
              </div>
            </div>

            <div className="pt-10 border-t border-white/10 mb-12">
              <div className="flex justify-between items-center">
                <span className="font-headline text-xl font-bold">Total</span>
                <span className="font-headline text-4xl font-bold text-white">{new Intl.NumberFormat('vi-VN').format(total)}đ</span>
              </div>
            </div>

            <Link to="/checkout" className="block w-full">
              <button className="w-full bg-stone-50 text-stone-900 py-6 rounded-2xl font-bold tracking-[0.2em] text-xs shadow-xl hover:bg-white transition-all active:scale-[0.98] uppercase">
                Proceed to Checkout
              </button>
            </Link>

            <div className="mt-10 flex items-center justify-center space-x-3 text-stone-500">
              <span className="material-symbols-outlined text-sm">eco</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Carbon Neutral Shipping Included</span>
            </div>
          </div>

          <div className="mt-10 px-6">
            <p className="text-xs text-stone-400 text-center italic leading-relaxed font-serif">
              "The true magic of coffee is in the patience of the pour. Your ritual deserves the finest."
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;

