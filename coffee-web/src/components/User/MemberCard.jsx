import React, { useState, useEffect } from 'react';
import { useUI } from '../../context/UIContext';

const MemberCard = ({ userPoints = 750, totalOrders: propTotalOrders = 0 }) => {
  const { showToast } = useUI();
  const [points, setPoints] = useState(userPoints);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [totalOrders, setTotalOrders] = useState(() => {
    const ordersCountStr = localStorage.getItem('ordersCount');
    if (ordersCountStr !== null) return parseInt(ordersCountStr);
    const savedOrders = localStorage.getItem('ritual_orders');
    if (savedOrders) {
      try {
        return JSON.parse(savedOrders).length;
      } catch (e) {}
    }
    return propTotalOrders;
  });

  useEffect(() => {
    if (localStorage.getItem('hasSpun') === 'true') {
      setHasSpun(true);
    }
    
    // Sync points and orders from localStorage dynamically
    const syncData = () => {
      const savedPoints = localStorage.getItem('userPoints');
      if (savedPoints) {
        setPoints(parseInt(savedPoints));
      }

      // Check ordersCount first, fallback to ritual_orders count
      const ordersCountStr = localStorage.getItem('ordersCount');
      let count = 0;
      if (ordersCountStr !== null) {
        count = parseInt(ordersCountStr);
      } else {
        const savedOrders = localStorage.getItem('ritual_orders');
        if (savedOrders) {
          try {
            count = JSON.parse(savedOrders).length;
          } catch (e) {}
        }
      }
      
      // Notification logic for milestone
      if ((count >= 5 && localStorage.getItem('isCoffeeLover') !== 'true') || localStorage.getItem('showConfetti') === 'true') {
        // Trigger Confetti Effect
        triggerConfetti();
        localStorage.setItem('isCoffeeLover', 'true');
        localStorage.removeItem('showConfetti');
        showToast('Bạn đã mở khóa Secret Menu!');
      }
      
      setTotalOrders(count);
    };

    const triggerConfetti = () => {
      // Simple CSS/JS confetti trigger
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.inset = '0';
      container.style.zIndex = '9999';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);

      for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = ['#DAA520', '#FFD700', '#F0E68C'][Math.floor(Math.random() * 3)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '-10px';
        particle.style.borderRadius = '50%';
        particle.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;
        container.appendChild(particle);
      }

      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fall {
          to { transform: translateY(110vh) rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
      setTimeout(() => container.remove(), 5000);
    };

    const interval = setInterval(syncData, 1000); // Check every second
    window.addEventListener('storage', syncData);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', syncData);
    };
  }, [totalOrders]);

  const isCoffeeLover = totalOrders >= 5;
  const level = Math.floor(points / 1000) + 1;
  const pointsInLevel = points % 1000;
  const progress = (pointsInLevel / 1000) * 100;
  const pointsToNextLevel = 1000 - pointsInLevel;

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    setWonPrize(null);
    
    const newRotation = wheelRotation + 1440 + Math.floor(Math.random() * 360);
    setWheelRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const prizes = ['10% OFF', 'Free Topping', '50 Points', 'Double Points', 'Try Again', 'Free Cookie'];
      const prizeIndex = Math.floor(((newRotation % 360)) / 60);
      const reward = prizes[prizeIndex];
      
      setWonPrize(reward);
      
      // Save state as requested
      localStorage.setItem('hasSpun', 'true');
      if (reward === '10% OFF') {
        localStorage.setItem('discountRate', '0.1');
      }
      setHasSpun(true);
    }, 4000);
  };

  return (
    <div className={`max-w-md mx-auto p-1 animate-in fade-in zoom-in duration-700 relative ${isCoffeeLover ? 'group' : ''}`}>
      {/* Glow Effect for Coffee Lover */}
      {isCoffeeLover && (
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-[2.7rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      )}

      <div className={`bg-gradient-to-br from-stone-900 via-stone-800 to-black rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden border ${isCoffeeLover ? 'border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'border-white/5'}`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 blur-[40px] -ml-12 -mb-12"></div>

        {/* Card Header */}
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div className="flex gap-4 items-center">
            <div className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${isCoffeeLover ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)] scale-105' : 'border-white/10'}`}>
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${isCoffeeLover ? 'text-yellow-400' : 'text-primary'}`}>
                {isCoffeeLover ? 'Legendary Member' : 'Alchemist Club'}
              </span>
              <h3 className="text-xl font-headline font-bold text-white mt-1 italic">Master Brewer</h3>
              {isCoffeeLover && (
                <div className="mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-400 text-xs fill-1">workspace_premium</span>
                  <span className="text-[8px] uppercase tracking-widest text-yellow-500 font-black">Coffee Lover Status</span>
                </div>
              )}
            </div>
          </div>
          <div className={`bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border text-center transition-all ${isCoffeeLover ? 'border-yellow-400/40 shadow-inner' : 'border-white/10'}`}>
            <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-bold">Level</span>
            <span className={`text-xl font-headline font-bold italic ${isCoffeeLover ? 'text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' : 'text-primary'}`}>{level}</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-4 mb-10 relative z-10">
          <div className="flex justify-between items-end">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Experience</span>
            <span className="text-xs font-bold text-white">{pointsInLevel} / 1000 <span className="text-primary ml-1">XP</span></span>
          </div>
          <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[9px] text-stone-500 italic text-center">Chỉ còn {pointsToNextLevel} XP nữa để mở khóa đặc quyền mới!</p>
        </div>

        {/* Badges Section */}
        <div className="mb-10 relative z-10">
          <h4 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4">Achievements</h4>
          <div className="flex gap-4">
            <div className={`group relative transition-all duration-500 ${isCoffeeLover ? 'scale-110' : 'opacity-40'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 shadow-lg ${isCoffeeLover ? 'bg-yellow-400/20 border-yellow-400 shadow-yellow-400/20' : 'bg-stone-800 border-white/5'}`}>
                <span className={`material-symbols-outlined text-xl ${isCoffeeLover ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : 'text-stone-500'}`}>favorite</span>
              </div>
              <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-widest font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${isCoffeeLover ? 'text-yellow-400' : 'text-stone-500'}`}>
                {isCoffeeLover ? 'Unlocked: Coffee Lover' : 'Locked: Coffee Lover'}
              </span>
            </div>
            
            <div className="group relative opacity-40">
              <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center border border-white/5">
                <span className="material-symbols-outlined text-stone-500 text-xl">workspace_premium</span>
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-widest text-stone-500 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Early Bird</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setIsWheelOpen(true)}
          disabled={hasSpun}
          className={`w-full py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${hasSpun ? 'bg-stone-800 text-stone-500 cursor-not-allowed opacity-50' : 'bg-white text-stone-900 hover:bg-primary hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-sm">casino</span>
          {hasSpun ? 'Bạn đã dùng lượt quay hôm nay' : 'Lucky Spin'}
        </button>
      </div>

      {/* Lucky Wheel Modal */}
      {isWheelOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isSpinning && setIsWheelOpen(false)}></div>
          <div className="bg-stone-900 rounded-[3rem] p-10 max-w-sm w-full relative border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <button 
              onClick={() => setIsWheelOpen(false)}
              className="absolute top-6 right-6 text-stone-500 hover:text-white transition-colors"
              disabled={isSpinning}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-headline font-bold text-white italic">Thử Vận May</h3>
              <p className="text-stone-400 text-xs mt-2 font-body">Mỗi ngày một lần, xoay để nhận quà từ Alchemist.</p>
            </div>

            <div className="relative aspect-square mb-10">
              {/* Wheel Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 z-10 text-primary drop-shadow-lg">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_drop_down</span>
              </div>
              
              {/* The Wheel */}
              <div 
                className="w-full h-full rounded-full border-8 border-stone-800 relative overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1) shadow-2xl"
                style={{ 
                  transform: `rotate(${wheelRotation}deg)`,
                  background: 'conic-gradient(#4E342E 0deg 60deg, #3E2723 60deg 120deg, #4E342E 120deg 180deg, #3E2723 180deg 240deg, #4E342E 240deg 300deg, #3E2723 300deg 360deg)'
                }}
              >
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div 
                    key={deg}
                    className="absolute top-0 left-1/2 w-1 h-1/2 origin-bottom flex items-start justify-center pt-8"
                    style={{ transform: `translateX(-50%) rotate(${deg + 30}deg)` }}
                  >
                    <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap" style={{ transform: 'rotate(0deg)' }}>
                      {['10% OFF', 'TOPPING', '50 PTS', 'X2 PTS', 'RETRY', 'COOKIE'][i]}
                    </span>
                  </div>
                ))}
                {/* Center Hub */}
                <div className="absolute inset-0 m-auto w-8 h-8 bg-stone-900 rounded-full border-4 border-stone-800 shadow-inner z-10"></div>
              </div>
            </div>

            {wonPrize && (
              <div className="text-center mb-8 animate-in zoom-in slide-in-from-top-4 duration-500">
                <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Chúc mừng!</p>
                <h4 className="text-xl font-bold text-white">{wonPrize}</h4>
                <p className="text-[10px] text-stone-400 italic mt-2">Phần thưởng đã được lưu! Hãy kiểm tra giỏ hàng.</p>
              </div>
            )}

            <button 
              onClick={handleSpin}
              disabled={isSpinning || hasSpun}
              className={`w-full py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] transition-all shadow-xl active:scale-95 ${isSpinning || hasSpun ? 'bg-stone-800 text-stone-600 cursor-not-allowed' : 'bg-primary text-white hover:bg-white hover:text-stone-900'}`}
            >
              {isSpinning ? 'Đang xoay...' : hasSpun ? 'Bạn đã dùng lượt quay hôm nay' : 'Quay Ngay'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberCard;
