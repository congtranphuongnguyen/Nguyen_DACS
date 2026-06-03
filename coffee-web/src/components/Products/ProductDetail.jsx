import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../../products';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Customization state
  const [sugar, setSugar] = useState('100%');
  const [ice, setIce] = useState('Đá bình thường');
  const [toppings, setToppings] = useState([]);

  const toppingOptions = [
    { id: 'kem-muoi', name: 'Kem muối', price: 15000 },
    { id: 'tran-chau', name: 'Trân châu', price: 10000 },
  ];

  const product = products.find(p => p.id === productId);

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    const basePrice = typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.-]+/g, "")) : product.price;
    const toppingsTotal = toppings.reduce((sum, tId) => {
      const option = toppingOptions.find(o => o.id === tId);
      return sum + (option ? option.price : 0);
    }, 0);
    return basePrice + toppingsTotal;
  }, [product, toppings]);

  if (!product) {
    return (
      <div className="py-32 text-center bg-surface">
        <h2 className="text-3xl font-headline text-[#3E2723] mb-6">Product not found</h2>
        <Link to="/" className="text-[#3E2723] underline underline-offset-4 font-bold">Back to Shop</Link>
      </div>
    );
  }

  const toggleTopping = (toppingId) => {
    setToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId) 
        : [...prev, toppingId]
    );
  };

  const handleAddToCart = () => {
    const selectedToppingsNames = toppings.map(tId => toppingOptions.find(o => o.id === tId).name);
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        price: totalPrice,
        customization: {
          sugar,
          ice,
          toppings: selectedToppingsNames
        }
      });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-full overflow-x-hidden bg-surface">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-start px-6 md:px-0">
        {/* Left: Images */}
        <div className="flex flex-col gap-6 w-full">
          <div className="relative overflow-hidden rounded-[3rem] shadow-2xl bg-surface-container-low border border-outline-variant/10">
            <img
              className="w-full aspect-square md:aspect-[4/5] object-cover"
              src={product.image}
              alt={product.name}
            />
          </div>
          {/* Gallery placeholders */}
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/10 group cursor-pointer">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 1" />
            </div>
            <div className="aspect-square bg-surface-container rounded-2xl flex items-center justify-center p-4 border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-3xl text-primary/40">eco</span>
            </div>
            <div className="aspect-square bg-surface-container rounded-2xl flex items-center justify-center p-4 border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-3xl text-primary/40">coffee</span>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col w-full py-8">
          <nav className="flex gap-2 text-[10px] uppercase font-bold tracking-widest text-[#5D4037]/50 mb-6">
            <Link to="/shop" className="hover:text-[#3E2723] transition-colors">Cửa hàng</Link>
            <span>/</span>
            <span className="text-[#5D4037]">{product.region}</span>
          </nav>

          <h1 className="font-headline text-5xl md:text-7xl font-bold text-[#3E2723] mb-4 tracking-tighter italic">
            {product.name}
          </h1>
          <p className="font-sans text-3xl font-bold text-[#5D4037] mb-10 tracking-tight">{new Intl.NumberFormat('vi-VN').format(totalPrice)}đ</p>

          {/* Customization Options */}
          <div className="mb-12 space-y-8 bg-surface-container-low/30 p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5D4037] opacity-70">Mức đường</label>
                <select 
                  value={sugar} 
                  onChange={(e) => setSugar(e.target.value)}
                  className="w-full bg-white border border-outline-variant/20 rounded-xl py-4 px-4 font-bold text-sm text-[#3E2723] focus:ring-2 focus:ring-[#4E342E] outline-none appearance-none cursor-pointer transition-all shadow-sm"
                >
                  <option value="0%">0%</option>
                  <option value="50%">50%</option>
                  <option value="100%">100% (Mặc định)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5D4037] opacity-70">Mức đá</label>
                <select 
                  value={ice} 
                  onChange={(e) => setIce(e.target.value)}
                  className="w-full bg-white border border-outline-variant/20 rounded-xl py-4 px-4 font-bold text-sm text-[#3E2723] focus:ring-2 focus:ring-[#4E342E] outline-none appearance-none cursor-pointer transition-all shadow-sm"
                >
                  <option value="Ít đá">Ít đá</option>
                  <option value="Đá bình thường">Đá bình thường</option>
                  <option value="Không đá">Không đá</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5D4037] opacity-70">Toppings</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {toppingOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => toggleTopping(opt.id)}
                    className={`flex justify-between items-center px-6 py-4 rounded-xl font-bold text-xs transition-all border-2 ${
                      toppings.includes(opt.id) 
                        ? 'bg-[#4E342E] text-white border-[#4E342E] shadow-md' 
                        : 'bg-white border-outline-variant/20 text-[#4E342E] hover:border-[#4E342E]/30'
                    }`}
                  >
                    <span>{opt.name}</span>
                    <span className={toppings.includes(opt.id) ? 'text-white/70' : 'text-[#4E342E]/60'}>+{new Intl.NumberFormat('vi-VN').format(opt.price)}đ</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12 space-y-8">
            <div className="flex flex-col gap-4">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#5D4037] opacity-70">Order Quantity</label>
              <div className="flex items-center w-40 h-16 bg-white rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="flex-1 h-full flex items-center justify-center hover:bg-surface-container-low text-[#3E2723] font-bold transition-colors">-</button>
                <input className="w-14 h-full bg-transparent border-none text-center font-bold text-[#3E2723] text-xl focus:ring-0" type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(q => q + 1)} className="flex-1 h-full flex items-center justify-center hover:bg-surface-container-low text-[#3E2723] font-bold transition-colors">+</button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-7 bg-[#4E342E] text-white font-bold rounded-[2rem] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 hover:shadow-primary/20 text-sm tracking-[0.3em] uppercase"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
              Add to Order • {new Intl.NumberFormat('vi-VN').format(totalPrice * quantity)}đ
            </button>
            {/* Product Meta */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="px-5 py-2.5 bg-stone-50 rounded-xl border border-stone-100 flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400 text-sm">public</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">{product.region}</span>
              </div>
              <div className="px-5 py-2.5 bg-stone-50 rounded-xl border border-stone-100 flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400 text-sm">coffee</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">{product.roast}</span>
              </div>
              {product.roastDate && (
                <div className="px-5 py-2.5 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3 group/timer">
                  <span className="material-symbols-outlined text-amber-500 text-sm group-hover/timer:rotate-180 transition-transform duration-700">nest_clock_farsight_analog</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Mới rang ngày: {new Date(product.roastDate).toLocaleDateString('vi-VN')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="border-t border-outline-variant/10 pt-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h2 className="font-headline text-5xl font-bold text-[#3E2723] italic tracking-tight">Origin Essence</h2>
            <p className="text-[#5D4037] leading-relaxed font-body text-lg font-light">
              {product.originStory || 'This exquisite coffee represents the pinnacle of sustainable farming practices and artisanal roasting.'}
            </p>
            <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 grid grid-cols-2 gap-8 shadow-sm">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5D4037] opacity-60 font-bold">Altitude</span>
                <p className="font-headline text-2xl text-[#3E2723] font-bold mt-1">{product.altitude || '1,200m'}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5D4037] opacity-60 font-bold">Processing</span>
                <p className="font-headline text-2xl text-[#3E2723] font-bold mt-1">{product.process || 'Washed'}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#4E342E] text-[#FAF9F6] p-12 lg:p-16 rounded-[3.5rem] shadow-3xl space-y-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-24 translate-x-24 blur-3xl group-hover:bg-white/10 transition-all duration-1000" />
            <h2 className="font-headline text-5xl font-bold italic tracking-tight">The Brewing Ritual</h2>
            <div className="space-y-10">
              <div className="flex gap-8">
                <span className="w-12 h-12 rounded-2xl bg-[#FAF9F6] text-[#4E342E] flex items-center justify-center font-bold text-xl shadow-xl shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-xl mb-3 tracking-tight">Preparation</h4>
                  <p className="text-[#FAF9F6]/70 leading-relaxed font-light text-sm">Precision is key. Ensure your tools are pre-heated to maintain the sanctuary of temperature.</p>
                </div>
              </div>
              <div className="flex gap-8">
                <span className="w-12 h-12 rounded-2xl bg-[#FAF9F6] text-[#4E342E] flex items-center justify-center font-bold text-xl shadow-xl shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-xl mb-3 tracking-tight">Alchemy</h4>
                  <p className="text-[#FAF9F6]/70 leading-relaxed font-light text-sm">A 1:16 ratio serves as the perfect alchemy for this specific roast profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-selling section: Perfect Pairing */}
      <section className="border-t border-outline-variant/10 pt-24 pb-32">
        <div className="mb-12 px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5D4037]/50 mb-3 block">Elevate Your Ritual</p>
          <h2 className="font-headline text-5xl font-bold text-[#3E2723] italic tracking-tight">Cặp đôi hoàn hảo</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {products.filter(p => (p.category === 'pastry' || p.category === 'beans') && p.id !== productId).slice(0, 4).map((suggested) => (
            <div key={suggested.id} className="group bg-white p-6 rounded-[2.5rem] border border-outline-variant/10 hover:border-[#4E342E]/20 transition-all hover:shadow-2xl flex flex-col h-full">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-surface-container-low shadow-inner">
                <img 
                  src={suggested.image} 
                  alt={suggested.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-[#3E2723] shadow-sm">
                    {suggested.label || 'Artisanal'}
                  </span>
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-[#3E2723] mb-1 group-hover:text-[#4E342E] transition-colors">{suggested.name}</h3>
                <p className="text-xs text-[#5D4037]/60 mb-4 font-light line-clamp-2 italic">{suggested.description}</p>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline-variant/5">
                <span className="font-bold text-[#3E2723]">
                  {new Intl.NumberFormat('vi-VN').format(typeof suggested.price === 'string' ? parseFloat(suggested.price.replace(/[^0-9.-]+/g, "")) : suggested.price)}đ
                </span>
                <button 
                  onClick={() => addToCart(suggested)}
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-[#4E342E] hover:bg-[#4E342E] hover:text-white transition-all active:scale-75 shadow-sm"
                  title="Thêm nhanh"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
