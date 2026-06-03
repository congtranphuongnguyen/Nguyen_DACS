import React, { useState, useEffect } from 'react';

const DrinkCustomizationModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const basePrice = product.price || 0;
  const productName = product.productName || product.name || '';
  const productImage = product.imageURL || product.imageUrl || product.image;

  // Option states
  const [selectedSize, setSelectedSize] = useState('M'); // S, M, L
  const [selectedSugar, setSelectedSugar] = useState('100%'); // 0%, 50%, 100%
  const [selectedIce, setSelectedIce] = useState('100%'); // 0%, 50%, 100%
  const [selectedToppings, setSelectedToppings] = useState([]); // Array of topping objects

  // Topping list (hardcoded as requested)
  const toppingsList = [
    { id: 'tranchau', name: 'Trân châu trắng', price: 10000 },
    { id: 'macchiato', name: 'Kem Macchiato', price: 15000 },
    { id: 'thachphomai', name: 'Thạch phô mai', price: 15000 },
  ];

  // Reset state on modal open / product change
  useEffect(() => {
    if (isOpen) {
      setSelectedSize('M');
      setSelectedSugar('100%');
      setSelectedIce('100%');
      setSelectedToppings([]);
    }
  }, [product, isOpen]);

  // Calculate prices
  const sizePrice = selectedSize === 'L' ? 10000 : 0;
  const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const totalPrice = basePrice + sizePrice + toppingsPrice;

  const handleToppingToggle = (topping) => {
    if (selectedToppings.find(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddClick = () => {
    // Construct the customized item matching CartContext & Cart.jsx expectations
    const customizedItem = {
      ...product,
      id: product.productId || product.id,
      name: productName,
      imageURL: productImage,
      customization: {
        size: selectedSize,
        sugar: selectedSugar,
        ice: selectedIce,
        toppings: selectedToppings.map(t => t.name), // Array of strings for Cart.jsx rendering
      },
      price: totalPrice, // Custom total price for cart item
    };
    onAddToCart(customizedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative bg-stone-900 border border-stone-800 text-stone-100 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-stone-100 transition-colors z-10 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-stone-800 flex gap-5 items-center bg-stone-900/50">
          <div className="w-20 h-20 rounded-2xl bg-stone-800 overflow-hidden shadow-inner shrink-0 border border-stone-800">
            <img
              src={productImage}
              alt={productName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800";
              }}
            />
          </div>
          <div>
            <h3 className="text-xl font-headline font-bold text-stone-100 italic leading-tight">{productName}</h3>
            <p className="text-sm font-semibold text-stone-400 mt-1">
              Giá gốc: {new Intl.NumberFormat('vi-VN').format(basePrice)}đ
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 md:p-8 space-y-8 overflow-y-auto no-scrollbar flex-1">
          
          {/* Size Selection */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Chọn kích cỡ (Size)</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'S', label: 'Size S', desc: '+0đ' },
                { id: 'M', label: 'Size M', desc: '+0đ' },
                { id: 'L', label: 'Size L', desc: '+10.000đ' },
              ].map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedSize(size.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 font-bold cursor-pointer ${
                    selectedSize === size.id
                      ? 'bg-amber-700 text-white border-amber-700 shadow-[0_0_20px_rgba(180,83,9,0.3)]'
                      : 'bg-stone-800/40 border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-stone-100'
                  }`}
                >
                  <span className="text-sm">{size.label}</span>
                  <span className="text-[9px] opacity-60 font-medium mt-0.5">{size.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sugar Selection */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Lượng đường</h4>
            <div className="grid grid-cols-3 gap-3">
              {['0%', '50%', '100%'].map((sugar) => (
                <button
                  key={sugar}
                  type="button"
                  onClick={() => setSelectedSugar(sugar)}
                  className={`py-3 rounded-2xl border transition-all duration-300 text-xs font-bold cursor-pointer ${
                    selectedSugar === sugar
                      ? 'bg-amber-700 text-white border-amber-700 shadow-[0_0_20px_rgba(180,83,9,0.3)]'
                      : 'bg-stone-800/40 border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-stone-100'
                  }`}
                >
                  {sugar}
                </button>
              ))}
            </div>
          </div>

          {/* Ice Selection */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Lượng đá</h4>
            <div className="grid grid-cols-3 gap-3">
              {['0%', '50%', '100%'].map((ice) => (
                <button
                  key={ice}
                  type="button"
                  onClick={() => setSelectedIce(ice)}
                  className={`py-3 rounded-2xl border transition-all duration-300 text-xs font-bold cursor-pointer ${
                    selectedIce === ice
                      ? 'bg-amber-700 text-white border-amber-700 shadow-[0_0_20px_rgba(180,83,9,0.3)]'
                      : 'bg-stone-800/40 border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-stone-100'
                  }`}
                >
                  {ice}
                </button>
              ))}
            </div>
          </div>

          {/* Topping Selection */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Topping thêm</h4>
            <div className="space-y-2">
              {toppingsList.map((topping) => {
                const isSelected = !!selectedToppings.find(t => t.id === topping.id);
                return (
                  <button
                    key={topping.id}
                    type="button"
                    onClick={() => handleToppingToggle(topping)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                      isSelected
                        ? 'bg-amber-900/20 border-amber-700 text-stone-100 shadow-[0_0_15px_rgba(180,83,9,0.05)]'
                        : 'bg-stone-800/40 border-stone-800 text-stone-300 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        isSelected ? 'bg-amber-700 border-amber-700 text-white' : 'border-stone-600 bg-stone-900/50'
                      }`}>
                        {isSelected && <span className="material-symbols-outlined text-[14px] font-black">check</span>}
                      </div>
                      <span className="text-xs font-bold">{topping.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-amber-500">
                      +{new Intl.NumberFormat('vi-VN').format(topping.price)}đ
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 border-t border-stone-800 bg-stone-900/80 backdrop-blur-lg flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-0.5">Tạm tính</span>
            <span className="text-2xl font-headline font-bold text-stone-100">
              {new Intl.NumberFormat('vi-VN').format(totalPrice)}đ
            </span>
          </div>
          <button
            onClick={handleAddClick}
            className="flex-1 py-4 bg-amber-700 hover:bg-amber-800 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-amber-950/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">shopping_bag</span>
            Thêm vào giỏ
          </button>
        </div>

      </div>
    </div>
  );
};

export default DrinkCustomizationModal;
