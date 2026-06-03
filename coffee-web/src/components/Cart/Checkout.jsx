import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';

import { useCart } from '../../context/CartContext';

const Checkout = ({ items, onClearCart }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addOrder, resetOrders } = useOrders();
  const { cartSubtotal, cartTotal, appliedReward, isCoffeeLover, cartWithGifts, freeGift, discount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const shipping = items.length > 0 ? 30000 : 0;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  const handleCompletePurchase = (e) => {
    e.preventDefault();
    
    const wasCoffeeLover = isCoffeeLover;
    const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
    
    let orderItemsString = items.map(item => {
      let details = `(${item.quantity})`;
      if (item.customization) {
        const { sugar, ice, toppings } = item.customization;
        const toppingsStr = toppings && toppings.length > 0 ? ` + ${toppings.join(', ')}` : '';
        details = `(${item.quantity} | Đường: ${sugar}, Đá: ${ice}${toppingsStr})`;
      }
      return `${item.name} ${details}`;
    }).join(', ');
    
    // Add free gift to order record if member
    if (wasCoffeeLover) {
      orderItemsString += `, Bánh quy bơ (Quà tặng) (1)`;
    }
    
    const currentPoints = parseInt(localStorage.getItem('userPoints') || '750');
    const newPoints = currentPoints + (totalUnits * 10);
    localStorage.setItem('userPoints', newPoints.toString());

    addOrder({
      user: currentUser ? currentUser.email : 'guest@example.com',
      items: orderItemsString,
      itemList: items, // keep the full list for detailed view if needed
      total: `${new Intl.NumberFormat('vi-VN').format(finalTotal)}đ`,
    });

    if (wasCoffeeLover) {
      localStorage.setItem('isCoffeeLover', 'false');
      localStorage.setItem('ordersCount', '0');
      resetOrders();
    } else {
      const currentOrdersCount = parseInt(localStorage.getItem('ordersCount') || '0');
      const newOrdersCount = currentOrdersCount + totalUnits;
      localStorage.setItem('ordersCount', newOrdersCount.toString());

      if (newOrdersCount >= 5) {
        localStorage.setItem('isCoffeeLover', 'true');
        localStorage.setItem('showConfetti', 'true');
      }
    }

    alert(`Thank you for your purchase! You earned ${totalUnits * 10} points. Your ritual is being prepared.`);
    onClearCart(wasCoffeeLover);
    navigate('/my-orders'); // Redirect to my orders to track ritual
  };

  if (items.length === 0) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-headline text-primary mb-6">Your cart is empty</h2>
        <Link to="/shop" className="text-stone-800 underline underline-offset-4 font-bold">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="font-headline text-4xl font-bold text-stone-800 mb-2">Checkout</h1>
        <p className="text-stone-500 font-body">Review your selection and complete your ritual.</p>
        
        {isCoffeeLover && (
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-1000">
            <span className="material-symbols-outlined text-yellow-600 fill-1">workspace_premium</span>
            <p className="text-sm font-bold text-yellow-700 italic">Bạn đang tận hưởng đặc quyền của Nhà giả kim Coffee Lover!</p>
          </div>
        )}
      </div>

      <form onSubmit={handleCompletePurchase} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-12">
          {/* Section: Shipping Information */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center font-bold text-sm">1</span>
              <h2 className="font-headline text-2xl text-stone-800">Shipping Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold">First Name</label>
                <input required className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all" placeholder="Elias" type="text"/>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold">Last Name</label>
                <input required className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all" placeholder="Thorne" type="text"/>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold">Address</label>
                <input required className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all" placeholder="1242 Artisan Way, Suite 4" type="text"/>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold">City</label>
                <input required className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all" placeholder="Portland" type="text"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold">State</label>
                  <input required className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all" placeholder="OR" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold">ZIP Code</label>
                  <input required className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all" placeholder="97201" type="text"/>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Payment Method */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="font-headline text-2xl text-stone-800">Payment Method</h2>
            </div>
            <div className="space-y-4">
              <div 
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'card' ? 'border-stone-800 bg-stone-50' : 'border-transparent bg-white'}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-stone-800">credit_card</span>
                    <span className="font-bold text-stone-800">Credit or Debit Card</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-4 ${paymentMethod === 'card' ? 'border-stone-800 bg-white' : 'border-stone-200 bg-stone-100'}`}></div>
                </div>
                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold">Card Number</label>
                      <input className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all" placeholder="0000 0000 0000 0000" type="text"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold">Expiry Date</label>
                        <input className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all" placeholder="MM/YY" type="text"/>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold">CVV</label>
                        <input className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all" placeholder="•••" type="password"/>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'wallet' ? 'border-stone-800 bg-stone-50' : 'border-transparent bg-white'}`}
                onClick={() => setPaymentMethod('wallet')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-stone-400">account_balance_wallet</span>
                    <span className="font-medium text-stone-800">Digital Wallet</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-4 ${paymentMethod === 'wallet' ? 'border-stone-800 bg-white' : 'border-stone-200 bg-stone-100'}`}></div>
                </div>
              </div>
            </div>
          </section>

          <button type="submit" className="w-full md:w-auto px-16 py-5 bg-stone-800 text-white font-bold rounded-lg shadow-xl hover:bg-stone-700 transition-all uppercase tracking-widest text-xs">
            Complete Purchase
          </button>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-stone-50 rounded-2xl p-8 sticky top-32 border border-stone-100">
            <h2 className="font-headline text-2xl text-stone-800 mb-8 font-bold">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {cartWithGifts.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 rounded-lg bg-white overflow-hidden flex-shrink-0 shadow-sm border border-stone-100">
                    <img className="w-full h-full object-cover" src={item.ImageURL || item.imageURL || item.imageUrl || item.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800'} alt={item.name} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-stone-800 mb-1 text-sm">{item.name}</h3>
                    <p className="text-[10px] text-stone-400 mb-2 italic uppercase tracking-wider">{item.label}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-500 font-bold">Qty: {item.quantity}</span>
                      <span className="font-bold text-stone-800">{new Intl.NumberFormat('vi-VN').format(parseFloat(item.price) * item.quantity)}đ</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isCoffeeLover && (
                <div className="flex gap-4 p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/10 animate-in zoom-in duration-500">
                  <div className="w-16 h-20 rounded-lg bg-white overflow-hidden flex-shrink-0 shadow-sm border border-stone-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-yellow-600 text-3xl">cookie</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-stone-800 mb-0.5 text-xs">Bánh quy bơ (Quà tặng)</h3>
                    <p className="text-[8px] text-yellow-600 font-bold uppercase tracking-widest">Coffee Lover Perk</p>
                    <div className="flex justify-between items-center text-[10px] mt-2">
                      <span className="text-stone-500">Qty: 1</span>
                      <span className="font-black text-yellow-600">FREE</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-stone-200 pt-8 space-y-4">
              <div className="flex justify-between text-stone-500">
                <span className="uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                <span className="font-bold text-stone-800">{new Intl.NumberFormat('vi-VN').format(cartSubtotal)}đ</span>
              </div>
              
              {appliedReward && (
                <div className="bg-primary/5 px-3 py-2 rounded-lg space-y-1">
                  <div className="flex justify-between text-primary">
                    <span className="uppercase tracking-widest text-[10px] font-bold">Reward: {appliedReward}</span>
                    <span className="font-bold">-{new Intl.NumberFormat('vi-VN').format(discount)}đ</span>
                  </div>
                  <p className="text-[8px] text-primary/60 font-bold uppercase tracking-tighter">
                    Đã áp dụng mã giảm giá từ Vòng quay may mắn!
                  </p>
                </div>
              )}

              <div className="flex justify-between text-stone-500">
                <span className="uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                <span className="font-bold text-stone-800">{new Intl.NumberFormat('vi-VN').format(shipping)}đ</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span className="uppercase tracking-widest text-[10px] font-bold">Estimated Tax</span>
                <span className="font-bold text-stone-800">{new Intl.NumberFormat('vi-VN').format(tax)}đ</span>
              </div>
              <div className="flex justify-between items-end pt-6">
                <span className="font-headline text-2xl font-bold text-stone-800">Total</span>
                <span className="font-headline text-4xl font-bold text-stone-800">{new Intl.NumberFormat('vi-VN').format(finalTotal)}đ</span>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex gap-2">
                <input className="flex-grow bg-white border border-stone-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-stone-800 outline-none transition-all text-xs" placeholder="PROMO CODE" type="text"/>
                <button type="button" className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg text-[10px] uppercase tracking-widest transition-colors">Apply</button>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-stone-900 text-white flex gap-4">
              <span className="material-symbols-outlined text-stone-400" data-icon="eco">eco</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Ritual Commitment</p>
                <p className="text-[10px] text-stone-400 leading-relaxed font-light">Roast-to-ship in 48 hours. Sustainable packaging used for all deliveries.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
