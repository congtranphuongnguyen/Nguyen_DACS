import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { products as currentProducts } from '../products';
import { api } from '../api';

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const { orders, deleteOrderByUser, updateOrder } = useOrders();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [noteModalOrder, setNoteModalOrder] = useState(null);
  const [flavorNote, setFlavorNote] = useState({ rating: 5, comment: '' });

  // Filter orders for the current user and not deleted
  const userOrders = orders.filter(order => 
    order.user === currentUser?.email && !order.isDeletedByUser
  );

  const handleDelete = (orderId) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn hàng này khỏi lịch sử không?")) {
      deleteOrderByUser(orderId);
    }
  };

  const handleBuyAgain = async (order) => {
    if (!order.itemList || order.itemList.length === 0) {
      alert("Không tìm thấy dữ liệu sản phẩm cho đơn hàng này.");
      return;
    }

    // NEW: Query SQL for previous flavor notes to provide a personalized reminder
    try {
      const firstProduct = order.itemList[0];
      const previousEntry = await api.getPreviousNote(firstProduct.id, currentUser.email);
      
      if (previousEntry) {
        const proceed = window.confirm(
          `Sổ tay Hương vị nhắc nhở:\nBạn từng ghi chú: "${previousEntry.note}" (${previousEntry.rating} sao).\n\nBạn có muốn tiếp tục đặt lại đơn hàng này không?`
        );
        if (!proceed) return;
      }
    } catch (error) {
      console.error("Failed to fetch historical notes:", error);
    }

    order.itemList.forEach(item => {
      // Find current product to get latest base price
      const currentProduct = currentProducts.find(p => p.id === item.id);
      let currentPrice = currentProduct ? parseFloat(currentProduct.price) : parseFloat(item.price);

      // Recalculate price if there's customization (especially toppings)
      if (item.customization && item.customization.toppings) {
        let toppingPrice = 0;
        if (item.customization.toppings.includes('Kem muối')) toppingPrice += 15000;
        if (item.customization.toppings.includes('Trân châu')) toppingPrice += 10000;
        
        if (currentProduct) {
          currentPrice += toppingPrice;
        }
      }

      const productToAdd = {
        ...item,
        price: currentPrice
      };

      // Add to cart multiple times based on original quantity
      for (let i = 0; i < item.quantity; i++) {
        const { quantity, ...productData } = productToAdd;
        addToCart(productData);
      }
    });

    alert("Đã thêm các món quen thuộc vào giỏ hàng của bạn!");
    navigate('/cart');
  };

  const handleOpenNoteModal = (order) => {
    setNoteModalOrder(order);
    setFlavorNote(order.flavorNote || { rating: 5, comment: '' });
  };

  const handleSaveFlavorNote = () => {
    updateOrder(noteModalOrder.id, { flavorNote });
    setNoteModalOrder(null);
    alert("Đã lưu ghi chú vào Sổ tay Hương vị!");
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending': 
        return { text: 'Chờ tiếp nhận', color: 'bg-amber-500 text-white', icon: 'schedule' };
      case 'processing': 
        return { text: 'Đang pha chế', color: 'bg-blue-500 text-white', icon: 'coffee_maker' };
      case 'ready': 
        return { text: 'Mời tới lấy / Ready', color: 'bg-emerald-500 text-white', icon: 'notifications_active' };
      case 'completed': 
        return { text: 'Đã hoàn thành', color: 'bg-stone-100 text-stone-400', icon: 'check_circle' };
      default: 
        return { text: status, color: 'bg-stone-100 text-stone-400', icon: 'help' };
    }
  };

  const TimelineStepper = ({ status }) => {
    const steps = [
      { id: 'confirmed', label: 'Đã xác nhận', icon: 'verified' },
      { id: 'brewing', label: 'Đang pha chế', icon: 'coffee_maker' },
      { id: 'ready', label: 'Sẵn sàng nhận', icon: 'auto_awesome' },
    ];

    const getStepState = (stepId, index) => {
      if (status === 'completed') return 'completed';
      if (status === 'cancelled') return 'cancelled';

      const statusMap = {
        'pending': 0,
        'processing': 1,
        'ready': 2,
      };

      const currentIdx = statusMap[status] ?? 0;
      if (index < currentIdx) return 'completed';
      if (index === currentIdx) return 'active';
      return 'pending';
    };

    return (
      <div className="w-full py-8">
        <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4">
          {/* Background Line */}
          <div className="absolute left-8 right-8 top-5 h-[2px] bg-stone-100 z-0"></div>
          
          {steps.map((step, idx) => {
            const state = getStepState(step.id, idx);
            const isCompleted = state === 'completed';
            const isActive = state === 'active';

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 group">
                {/* Connector Line (Progress) */}
                {idx > 0 && (
                  <div 
                    className={`absolute right-full top-5 w-full h-[2px] -mr-8 transition-all duration-1000 ${
                      getStepState(steps[idx-1].id, idx-1) === 'completed' ? 'bg-emerald-500' : 'bg-transparent'
                    }`}
                  ></div>
                )}

                {/* Circle Icon */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm border-4 border-white ring-1 ${
                    isCompleted 
                      ? 'bg-emerald-500 text-white ring-emerald-100 scale-110' 
                      : isActive 
                        ? 'bg-primary text-white ring-primary/20 animate-pulse scale-125 shadow-lg' 
                        : 'bg-stone-50 text-stone-300 ring-stone-100'
                  }`}
                >
                  <span className={`material-symbols-outlined text-lg ${isActive && step.id === 'brewing' ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                    {isCompleted ? 'check' : step.icon}
                  </span>
                </div>

                {/* Label */}
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 whitespace-nowrap ${
                  isCompleted ? 'text-emerald-600' : isActive ? 'text-primary' : 'text-stone-300'
                }`}>
                  {step.label}
                </span>
                
                {/* Active Glow */}
                {isActive && (
                  <div className="absolute -inset-2 bg-primary/5 rounded-full -z-10 animate-ping"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 animate-in fade-in duration-700 bg-surface min-h-screen relative">
      <header className="mb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4 block">Real-time Tracker</p>
        <h1 className="text-6xl font-headline font-bold tracking-tight text-stone-800">
          My <span className="italic font-light text-primary">Orders</span>.
        </h1>
        <p className="text-stone-500 mt-4 max-w-2xl font-light leading-relaxed">
          Theo dõi trạng thái pha chế của bạn từ hạt cà phê đến khi tách cà phê sẵn sàng trên quầy. 
          Hệ thống sẽ cập nhật ngay khi Alchemist hoàn tất từng công đoạn.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {userOrders.length > 0 ? userOrders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          const isReady = order.status === 'ready';
          const isCompleted = order.status === 'completed';

          return (
            <div key={order.id} className="group flex flex-col gap-6">
              {/* Ready Notification Banner */}
              {isReady && (
                <div className="animate-in slide-in-from-top-4 duration-500 bg-emerald-500 text-white p-4 rounded-2xl flex items-center justify-center gap-4 shadow-[0_10px_30px_rgba(16,185,129,0.2)] border border-emerald-400">
                  <span className="material-symbols-outlined animate-bounce">notifications_active</span>
                  <p className="font-bold text-sm tracking-wide">Món nước của bạn đã xong, mời bạn đến quầy nhận nhé!</p>
                </div>
              )}

              <div 
                className={`bg-white rounded-[2.5rem] border transition-all duration-500 p-8 flex flex-col lg:flex-row gap-10 items-start lg:items-center ${
                  isReady 
                    ? 'border-emerald-500 shadow-[0_30px_60px_rgba(16,185,129,0.1)] ring-1 ring-emerald-500/10' 
                    : 'border-stone-100 shadow-sm hover:shadow-2xl hover:border-stone-200'
                }`}
              >
                {/* Status Visualizer Sidebar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-28 h-28 rounded-3xl flex items-center justify-center transition-all duration-700 ${
                    isReady ? 'bg-emerald-500 text-white rotate-6' : 'bg-stone-50 text-stone-200'
                  }`}>
                    <span className={`material-symbols-outlined text-4xl ${isReady ? 'animate-bounce' : ''}`}>
                      {statusInfo.icon}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col lg:flex-row gap-8 lg:items-center">
                  <div className="flex-grow space-y-6">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Order #{order.id}</span>
                      {isCompleted && (
                        <div className="px-3 py-1 bg-stone-100 text-stone-400 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          Đã hoàn thành
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-3xl font-headline font-bold text-stone-800 leading-tight">
                        {order.items}
                      </h3>
                      <p className="text-stone-400 text-xs font-light italic">
                        {new Date(order.createdAt).toLocaleTimeString()} • {order.date}
                      </p>
                    </div>

                    {/* Compact Total Info */}
                    {/* Compact Total Info */}
                    <div className="flex items-center gap-6 pt-2">
                      <div className="px-4 py-2 bg-stone-50 rounded-xl border border-stone-100">
                        <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">Total Investment</p>
                        <p className="text-xl font-bold text-stone-800">{order.total?.toString().includes('đ') ? order.total : new Intl.NumberFormat('vi-VN').format(parseFloat(order.total?.toString().replace(/[^0-9.-]+/g,"") || 0)) + 'đ'}</p>
                      </div>
                      
                      {/* Flavor Note Badge if exists */}
                      {order.flavorNote && (
                        <div className="px-4 py-2 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-2">
                          <span className="material-symbols-outlined text-amber-500 text-sm">book_5</span>
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">{order.flavorNote.rating} ★</span>
                        </div>
                      )}
                    </div>

                    {/* Peak Flavor Timer for Beans */}
                    {order.itemList && order.itemList.some(item => item.category === 'beans') && (
                      <div className="pt-4 space-y-3">
                        {order.itemList.filter(item => item.category === 'beans').map(bean => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          
                          // Fallback logic for Demo: if bean doesn't have roastDate, use order's creation date
                          const rawRoastDate = bean.roastDate || order.createdAt;
                          const roastDate = new Date(rawRoastDate);
                          roastDate.setHours(0, 0, 0, 0);
                          
                          const diffTime = today - roastDate;
                          const daysSinceRoast = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                          
                          let statusText = "";
                          let statusColor = "";
                          let icon = "";
                          let progress = 0;

                          if (daysSinceRoast < 3) {
                            const daysToPeak = 3 - daysSinceRoast;
                            statusText = `Hương vị đang phát triển... Đỉnh cao nhất sau ${daysToPeak} ngày nữa`;
                            statusColor = "text-amber-600";
                            icon = "hourglass_empty";
                            progress = (daysSinceRoast / 3) * 100;
                          } else if (daysSinceRoast >= 3 && daysSinceRoast <= 7) {
                            statusText = "✨ ĐANG TRONG GIAI ĐOẠN ĐỈNH CAO HƯƠNG VỊ! ✨";
                            statusColor = "text-emerald-600 font-black animate-pulse";
                            icon = "auto_awesome";
                            progress = 100;
                          } else {
                            statusText = "Hạt cafe đã sẵn sàng, hãy dùng ngay để giữ trọn hương vị";
                            statusColor = "text-stone-500";
                            icon = "coffee";
                            progress = 100;
                          }

                          return (
                            <div key={bean.id} className="bg-stone-50/50 rounded-2xl p-5 border border-stone-100/50">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className={`material-symbols-outlined text-sm ${statusColor}`}>{icon}</span>
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{bean.name} • Peak Flavor Tracker</span>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${statusColor}`}>{statusText}</span>
                              </div>
                              <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-1000 ${daysSinceRoast >= 3 && daysSinceRoast <= 7 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                                ></div>
                              </div>
                              <div className="mt-2 flex justify-between items-center">
                                <span className="text-[8px] text-stone-300 uppercase tracking-tighter">Ngày rang: {roastDate.toLocaleDateString('vi-VN')}</span>
                                <span className="text-[8px] text-stone-300 uppercase tracking-tighter">Ngày hiện tại: {today.toLocaleDateString('vi-VN')}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Stepper Integration */}
                  {order.status !== 'completed' && order.status !== 'cancelled' && (
                    <div className="lg:w-96 flex-shrink-0">
                      <TimelineStepper status={order.status} />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="w-full lg:w-auto flex flex-col gap-3">
                    <div className="flex justify-end gap-2">
                      {isCompleted && (
                        <button 
                          onClick={() => handleOpenNoteModal(order)}
                          className="p-2 text-stone-300 hover:text-amber-500 transition-colors"
                          title="Lưu ghi chú hương vị"
                        >
                          <span className="material-symbols-outlined text-lg">book_5</span>
                        </button>
                      )}
                      {(isCompleted || order.status === 'cancelled') && (
                        <button 
                          onClick={() => handleDelete(order.id)}
                          className="p-2 text-stone-300 hover:text-red-400 transition-colors"
                          title="Xóa lịch sử"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      )}
                    </div>
                    
                    {isCompleted ? (
                      <button 
                        onClick={() => handleBuyAgain(order)}
                        className="px-10 py-4 bg-stone-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center hover:bg-stone-800 transition-all shadow-xl"
                      >
                        Buy Again
                      </button>
                    ) : (
                      <div className="px-10 py-4 bg-stone-50 border border-stone-100 text-stone-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center cursor-default">
                        Processing...
                      </div>
                    )}
                    <button className="px-10 py-4 border border-stone-100 text-stone-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-50 transition-all whitespace-nowrap">
                      Order Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="py-32 flex flex-col items-center justify-center text-center bg-white rounded-[4rem] shadow-sm border border-stone-100 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop" 
              alt="Empty orders" 
              className="w-56 h-56 object-cover rounded-full mb-10 shadow-2xl ring-8 ring-stone-50 relative z-10 group-hover:scale-105 transition-all duration-700"
            />
            <h2 className="text-4xl font-headline font-bold text-stone-800 mb-4 relative z-10">Bạn chưa có đơn hàng nào</h2>
            <p className="text-stone-400 max-w-sm font-light mb-12 italic relative z-10">"Trải nghiệm nghệ thuật cà phê thủ công ngay hôm nay."</p>
            <Link to="/menu" className="relative z-10 px-16 py-6 bg-stone-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-2xl hover:bg-stone-800 hover:-translate-y-1 transition-all">
              Go to Menu
            </Link>
          </div>
        )}
      </div>

      {/* Flavor Journal Modal */}
      {noteModalOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-stone-900/20 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden p-10 space-y-8 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <span className="material-symbols-outlined text-amber-500 text-5xl">book_5</span>
              <h3 className="text-2xl font-headline font-bold text-stone-800">Sổ tay Hương vị</h3>
              <p className="text-stone-400 text-xs uppercase tracking-widest">Ghi lại cảm nhận về {noteModalOrder.items}</p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Đánh giá độ ngon</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      onClick={() => setFlavorNote(prev => ({ ...prev, rating: star }))}
                      className={`text-3xl transition-all ${flavorNote.rating >= star ? 'text-amber-500 scale-110' : 'text-stone-200 hover:text-amber-200'}`}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: flavorNote.rating >= star ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Cảm nhận của bạn</label>
                <textarea 
                  className="w-full bg-stone-50 border-none rounded-2xl p-5 text-sm font-light text-stone-600 focus:ring-2 focus:ring-primary outline-none transition-all h-32 resize-none"
                  placeholder="Ví dụ: Lần sau nên bớt đường một chút sẽ hoàn hảo hơn..."
                  value={flavorNote.comment}
                  onChange={(e) => setFlavorNote(prev => ({ ...prev, comment: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setNoteModalOrder(null)}
                className="flex-1 py-4 rounded-xl border border-stone-100 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:bg-stone-50 transition-all"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={handleSaveFlavorNote}
                className="flex-[2] py-4 bg-stone-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg active:scale-95"
              >
                Lưu vào sổ tay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
