import React, { useState, useMemo } from 'react';
import { useUI } from '../../context/UIContext';

const CustomizationModal = ({ product, onAddToCart }) => {
  const { closeModal } = useUI();
  const [size, setSize] = useState('Medium');
  const [sugar, setSugar] = useState('100%');
  const [ice, setIce] = useState('Đá bình thường');
  const [toppings, setToppings] = useState([]);

  const toppingOptions = [
    { id: 'kem-muoi', name: 'Kem muối', price: 15000 },
    { id: 'tran-chau', name: 'Trân châu', price: 10000 },
  ];

  const totalPrice = useMemo(() => {
    const basePrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    const toppingsTotal = toppings.reduce((sum, tId) => {
      const option = toppingOptions.find(o => o.id === tId);
      return sum + (option ? option.price : 0);
    }, 0);
    return basePrice + toppingsTotal;
  }, [product.price, toppings]);

  const toggleTopping = (toppingId) => {
    setToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId) 
        : [...prev, toppingId]
    );
  };

  const handleAdd = () => {
    const selectedToppingsNames = toppings.map(tId => toppingOptions.find(o => o.id === tId).name);
    onAddToCart({
      ...product,
      price: totalPrice,
      customization: { 
        size, 
        sugar, 
        ice, 
        toppings: selectedToppingsNames 
      },
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-primary/30 backdrop-blur-md" 
        onClick={closeModal}
      />
      <div className="relative bg-surface w-full max-w-lg rounded-[2.5rem] shadow-3xl overflow-hidden animate-in zoom-in duration-300 border border-outline-variant/10">
        {/* Header Image & Close Button */}
        <div className="relative h-56 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white shadow-xl text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all z-20 group active:scale-90"
          >
            <span className="material-symbols-outlined font-bold">close</span>
          </button>

          <div className="absolute bottom-6 left-8">
            <h2 className="text-white text-4xl font-headline font-bold italic tracking-tight">{product.name}</h2>
            <p className="text-white/90 font-bold text-lg mt-1 tracking-wider whitespace-nowrap">{new Intl.NumberFormat('vi-VN').format(totalPrice)}đ</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-10 overflow-y-auto max-h-[60vh] no-scrollbar">
          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Choose your size</h3>
              <span className="text-[10px] font-bold text-primary italic capitalize opacity-80">{size}</span>
            </div>
            <div className="flex gap-3">
              {['Small', 'Medium', 'Large'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex-1 py-5 rounded-2xl font-bold text-xs transition-all border-2 uppercase tracking-widest ${
                    size === s 
                      ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]' 
                      : 'bg-white border-outline-variant/30 text-[#4E342E] hover:border-primary/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Adjustments: Sugar & Ice */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Sugar Level</h3>
              <select 
                value={sugar} 
                onChange={(e) => setSugar(e.target.value)}
                className="w-full bg-white border-2 border-outline-variant/30 rounded-2xl py-5 px-5 font-bold text-sm text-[#4E342E] focus:border-primary outline-none appearance-none cursor-pointer transition-colors"
              >
                <option value="0%">0%</option>
                <option value="50%">50%</option>
                <option value="100%">100% (Mặc định)</option>
              </select>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Ice Level</h3>
              <select 
                value={ice} 
                onChange={(e) => setIce(e.target.value)}
                className="w-full bg-white border-2 border-outline-variant/30 rounded-2xl py-5 px-5 font-bold text-sm text-[#4E342E] focus:border-primary outline-none appearance-none cursor-pointer transition-colors"
              >
                <option value="Ít đá">Ít đá</option>
                <option value="Đá bình thường">Đá bình thường</option>
                <option value="Không đá">Không đá</option>
              </select>
            </div>
          </div>

          {/* Toppings Selection */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Toppings</h3>
            <div className="grid grid-cols-1 gap-3">
              {toppingOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleTopping(opt.id)}
                  className={`flex justify-between items-center px-6 py-5 rounded-2xl font-bold text-sm transition-all border-2 ${
                    toppings.includes(opt.id) 
                      ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                      : 'bg-white border-outline-variant/30 text-[#4E342E] hover:border-primary/40'
                  }`}
                >
                  <span>{opt.name}</span>
                  <span className="opacity-70">+{new Intl.NumberFormat('vi-VN').format(opt.price)}đ</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-8 bg-surface-container-low border-t border-outline-variant/10">
          <button 
            onClick={handleAdd}
            className="w-full bg-primary text-white py-6 rounded-3xl font-bold text-sm hover:shadow-2xl active:scale-[0.98] transition-all uppercase tracking-[0.3em] shadow-xl"
          >
            Add to Order • {new Intl.NumberFormat('vi-VN').format(totalPrice)}đ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;

