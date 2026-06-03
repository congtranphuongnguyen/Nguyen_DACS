import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { api } from '../api';

const SignatureBlends = () => {
  const { addToCart } = useCart();
  const { showToast } = useUI();
  const location = useLocation();
  const [highlightedId, setHighlightedId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const lastToastTime = useRef(0);

  // Fallback image URL
  const fallbackImg = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800";

  const handleImgError = (e) => {
    e.target.src = fallbackImg;
  };

  const handleAddProduct = useCallback((e, product) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isProcessing) return;
    
    const now = Date.now();
    if (now - lastToastTime.current < 500) return; 
    
    lastToastTime.current = now;
    setIsProcessing(true);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      label: product.label || "Signature Blend",
      image: product.image,
      description: product.description
    });
    
    showToast(`${product.name} added to cart!`);

    setTimeout(() => setIsProcessing(false), 500);
  }, [addToCart, showToast, isProcessing]);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedId(id);
          setTimeout(() => setHighlightedId(null), 2000);
        }, 100);
      }
    }
  }, [location.hash]);

  const [signatureProducts, setSignatureProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignatureBlends = async () => {
      try {
        const data = await api.getProducts();
        const sigMap = {};
        // Map products by their signature keys for the bento layout
        const morningMist = data.find(p => p.id === 'sig-morning-mist' || p.name === 'Morning Mist');
        const midnightVelvet = data.find(p => p.id === 'sig-midnight-velvet' || p.name === 'Midnight Velvet');
        const goldenHour = data.find(p => p.id === 'sig-golden-hour' || p.name === 'Golden Hour');
        const wildGeisha = data.find(p => p.id === 'sig-wild-geisha' || p.name === 'Wild Geisha');
        const obsidian = data.find(p => p.id === 'sig-the-obsidian' || p.name === 'The Obsidian');

        setSignatureProducts({
          morningMist: morningMist || { id: 'sig-morning-mist', name: 'Morning Mist', price: '120000', description: 'Loading...' },
          midnightVelvet: midnightVelvet || { id: 'sig-midnight-velvet', name: 'Midnight Velvet', price: '130000', description: 'Loading...' },
          goldenHour: goldenHour || { id: 'sig-golden-hour', name: 'Golden Hour', price: '140000', description: 'Loading...' },
          wildGeisha: wildGeisha || { id: 'sig-wild-geisha', name: 'Wild Geisha', price: '250000', description: 'Loading...' },
          obsidian: obsidian || { id: 'sig-the-obsidian', name: 'The Obsidian', price: '180000', description: 'Loading...' }
        });
      } catch (error) {
        console.error("Failed to fetch signature blends:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSignatureBlends();
  }, []);

  const products = signatureProducts || {
    morningMist: { id: 'sig-morning-mist', name: 'Morning Mist', price: '120000', label: 'Balanced & Ethereal', image: '', description: 'Loading...' },
    midnightVelvet: { id: 'sig-midnight-velvet', name: 'Midnight Velvet', price: '130000', label: 'Rich & Woody', image: '', description: 'Loading...' },
    goldenHour: { id: 'sig-golden-hour', name: 'Golden Hour', price: '140000', label: 'Bright & Vibrant', image: '', description: 'Loading...' },
    wildGeisha: { id: 'sig-wild-geisha', name: 'Wild Geisha', price: '250000', label: 'Rare Find', image: '', description: 'Loading...' },
    obsidian: { id: 'sig-the-obsidian', name: 'The Obsidian', price: '180000', label: 'Darkest Roast', image: '', description: 'Loading...' }
  };

  return (
    <div className="animate-in fade-in duration-700 w-full overflow-x-hidden pt-12 bg-surface text-on-surface font-body">
      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="relative rounded-[3rem] overflow-hidden h-[450px] flex items-end p-8 md:p-16 shadow-3xl">
            <img
              alt="Artisan coffee preparation"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
              src={fallbackImg}
              onError={handleImgError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-4 py-1 rounded-full bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-4">The Alchemist's Selection</span>
              <h2 className="text-5xl md:text-7xl text-surface font-headline italic mb-6 leading-tight">Signature Blends</h2>
              <p className="text-surface/90 font-body text-xl max-w-lg font-light italic leading-relaxed">Crafting the impossible balance between shadow and light. Discover our master-blended artisan roasts.</p>
            </div>
          </div>
        </section>

        {/* House Favorites */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-4xl font-headline text-primary italic">House Favorites</h3>
            <div className="h-px flex-grow mx-8 bg-outline-variant/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Morning Mist */}
            <div id="morning-mist" className={`md:col-span-7 group transition-all duration-700 rounded-[3rem] p-1 ${highlightedId === 'morning-mist' ? 'ring-4 ring-primary ring-offset-8 ring-offset-surface' : ''}`}>
              <div className="bg-surface-container rounded-[2.8rem] overflow-hidden flex flex-col h-full border border-outline-variant/10 shadow-xl transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative">
                <Link to={`/product/${products.morningMist.id}`} className="aspect-[16/10] md:aspect-[16/9] overflow-hidden relative block group">
                  <img
                    alt="Morning Mist Artisanal Beans"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src={products.morningMist.image}
                    onError={handleImgError}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-700">
                    <div className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="text-white font-bold tracking-[0.3em] uppercase text-[10px]">View Detail Essence</span>
                    </div>
                  </div>
                </Link>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <Link to={`/product/${products.morningMist.id}`} className="hover:opacity-60 transition-opacity">
                      <h4 className="text-3xl font-headline text-primary mb-2 italic">{products.morningMist.name}</h4>
                      <p className="text-secondary font-label text-[10px] font-bold uppercase tracking-[0.2em]">{products.morningMist.label}</p>
                    </Link>
                    <span className="text-2xl font-headline text-primary font-bold">{new Intl.NumberFormat('vi-VN').format(parseFloat(products.morningMist.price))}đ</span>
                  </div>
                  <p className="text-secondary font-body mb-8 flex-grow font-light leading-relaxed text-lg">{products.morningMist.description} Balanced for the slow rise.</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {['Jasmine', 'Citrus', 'White Honey'].map(tag => (
                        <span key={tag} className="px-4 py-1.5 rounded-full bg-white text-primary text-[10px] font-bold border border-outline-variant/10 uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                  {products.morningMist.roastDate && (
                    <div className="mb-10 flex items-center gap-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 w-fit">
                      <span className="material-symbols-outlined text-amber-600">nest_clock_farsight_analog</span>
                      <div>
                        <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest leading-none mb-1">Peak Flavor Tracker</p>
                        <p className="text-xs font-bold text-amber-800">Mới rang ngày: {new Date(products.morningMist.roastDate).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                  )}
                  <button 
                    disabled={isProcessing}
                    onClick={(e) => handleAddProduct(e, products.morningMist)}
                    className="w-full py-6 bg-primary text-on-primary rounded-2xl font-bold flex items-center justify-center gap-4 transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] shadow-lg uppercase tracking-[0.2em] text-xs cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">shopping_bag</span>
                    {isProcessing ? 'Sychronizing...' : 'Add To Brew'}
                  </button>
                </div>
              </div>
            </div>

            {/* Side Favorites */}
            <div className="md:col-span-5 flex flex-col gap-10">
              {/* Midnight Velvet */}
              <div id="midnight-velvet" className={`transition-all duration-700 rounded-[2.5rem] ${highlightedId === 'midnight-velvet' ? 'ring-4 ring-primary ring-offset-6 ring-offset-surface' : ''}`}>
                <div className="bg-surface-container rounded-[2.5rem] p-8 flex gap-8 items-center group border border-outline-variant/10 hover:shadow-2xl hover:scale-[1.02] transition-all shadow-lg overflow-hidden relative">
                  <Link to={`/product/${products.midnightVelvet.id}`} className="w-36 h-36 rounded-3xl overflow-hidden flex-shrink-0 relative group">
                    <img
                      alt="Midnight Velvet"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={products.midnightVelvet.image}
                      onError={handleImgError}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/40 flex items-center justify-center transition-all duration-500">
                        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 text-3xl">unfold_more</span>
                    </div>
                  </Link>
                  <div className="flex-grow">
                    <Link to={`/product/${products.midnightVelvet.id}`} className="hover:opacity-60 transition-opacity">
                        <h4 className="text-2xl font-headline text-primary mb-1 italic">{products.midnightVelvet.name}</h4>
                    </Link>
                    <p className="text-secondary text-sm mb-4 font-light leading-relaxed">{products.midnightVelvet.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-headline text-primary font-bold">{new Intl.NumberFormat('vi-VN').format(parseFloat(products.midnightVelvet.price))}đ</span>
                      <button 
                        disabled={isProcessing}
                        onClick={(e) => handleAddProduct(e, products.midnightVelvet)}
                        className="text-primary hover:text-secondary hover:rotate-180 transition-all duration-500 p-2 cursor-pointer disabled:opacity-40"
                      >
                        <span className="material-symbols-outlined font-bold text-4xl">add_circle</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Golden Hour */}
              <div id="golden-hour" className={`transition-all duration-700 rounded-[2.5rem] ${highlightedId === 'golden-hour' ? 'ring-4 ring-primary ring-offset-6 ring-offset-surface' : ''}`}>
                <div className="bg-surface-container rounded-[2.5rem] p-8 flex gap-8 items-center group border border-outline-variant/10 hover:shadow-2xl hover:scale-[1.02] transition-all shadow-lg overflow-hidden relative">
                  <Link to={`/product/${products.goldenHour.id}`} className="w-36 h-36 rounded-3xl overflow-hidden flex-shrink-0 relative group">
                    <img
                      alt="Golden Hour"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={products.goldenHour.image}
                      onError={handleImgError}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/40 flex items-center justify-center transition-all duration-500">
                        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 text-3xl">unfold_more</span>
                    </div>
                  </Link>
                  <div className="flex-grow">
                    <Link to={`/product/${products.goldenHour.id}`} className="hover:opacity-60 transition-opacity">
                        <h4 className="text-2xl font-headline text-primary mb-1 italic">{products.goldenHour.name}</h4>
                    </Link>
                    <p className="text-secondary text-sm mb-4 font-light leading-relaxed">{products.goldenHour.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-headline text-primary font-bold">{new Intl.NumberFormat('vi-VN').format(parseFloat(products.goldenHour.price))}đ</span>
                      <button 
                         disabled={isProcessing}
                         onClick={(e) => handleAddProduct(e, products.goldenHour)}
                        className="text-primary hover:text-secondary hover:rotate-180 transition-all duration-500 p-2 cursor-pointer disabled:opacity-40"
                      >
                        <span className="material-symbols-outlined font-bold text-4xl">add_circle</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Limited Releases (Bento Style) */}
        <section className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <span className="material-symbols-outlined text-secondary opacity-50 scale-150">auto_awesome</span>
            <h3 className="text-4xl font-headline text-primary italic">Limited Alchemy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wild Geisha */}
            <div id="wild-geisha" className={`bg-surface-container-low rounded-[3rem] p-10 border border-outline-variant/5 flex flex-col shadow-2xl transition-all duration-700 scroll-mt-24 ${highlightedId === 'wild-geisha' ? 'ring-4 ring-primary ring-offset-8 ring-offset-surface' : ''}`}>
              <div className="flex justify-between items-start mb-8">
                <span className="text-on-primary bg-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase">Collector's Issue</span>
                <span className="text-2xl font-headline text-primary font-bold">{new Intl.NumberFormat('vi-VN').format(parseFloat(products.wildGeisha.price))}đ</span>
              </div>
              <Link to={`/product/${products.wildGeisha.id}`} className="hover:opacity-60 transition-opacity group mb-4 block">
                <h4 className="text-3xl font-headline text-primary mb-2 italic">{products.wildGeisha.name}</h4>
                <div className="h-0.5 w-12 bg-primary/20 group-hover:w-full transition-all duration-700"></div>
              </Link>
              <p className="text-secondary font-body text-md mb-6 leading-relaxed font-light italic opacity-80">{products.wildGeisha.description}</p>
              {products.wildGeisha.roastDate && (
                <div className="mb-8 flex items-center gap-2 text-amber-600">
                  <span className="material-symbols-outlined text-sm">nest_clock_farsight_analog</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Mới rang: {new Date(products.wildGeisha.roastDate).toLocaleDateString('vi-VN')}</span>
                </div>
              )}
              <div className="mt-auto pt-8 border-t border-outline-variant/10 flex items-center justify-between">
                <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60">Batch #09 • Limited Availability</span>
                <div className="flex gap-4">
                    <Link to={`/product/${products.wildGeisha.id}`} className="material-symbols-outlined text-secondary cursor-pointer hover:scale-125 transition-all p-2 bg-surface rounded-full shadow-inner">visibility</Link>
                    <button 
                        disabled={isProcessing}
                        onClick={(e) => handleAddProduct(e, products.wildGeisha)}
                        className="material-symbols-outlined text-primary cursor-pointer hover:scale-125 transition-all p-2 bg-[#FAF9F6] rounded-full shadow-md disabled:opacity-40"
                    >
                        shopping_bag
                    </button>
                </div>
              </div>
            </div>

            {/* The Obsidian */}
            <div id="obsidian" className={`md:col-span-2 bg-primary text-on-primary rounded-[3.5rem] p-12 overflow-hidden relative group shadow-3xl transition-all duration-700 scroll-mt-24 ${highlightedId === 'obsidian' ? 'ring-4 ring-white ring-offset-8 ring-offset-primary shadow-2xl' : ''}`}>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-60 group-hover:opacity-90 transition-opacity cursor-pointer">
                <Link to={`/product/${products.obsidian.id}`}>
                    <img
                    alt="The Obsidian Blend"
                    className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110"
                    src={products.obsidian.image}
                    onError={handleImgError}
                    />
                </Link>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <Link to={`/product/${products.obsidian.id}`} className="hover:text-surface/70 transition-colors inline-block">
                    <h4 className="text-5xl font-headline italic mb-6 tracking-tighter">The Obsidian</h4>
                  </Link>
                  <p className="max-w-sm text-surface/80 text-lg leading-relaxed mb-10 font-light italic">Beyond the dark. A deep-fired alchemy of aged beans for an unmatched density of flavor.</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    disabled={isProcessing}
                    onClick={(e) => handleAddProduct(e, products.obsidian)}
                    className="px-10 py-5 bg-white text-primary rounded-2xl font-bold text-xs uppercase tracking-[0.3em] hover:bg-stone-100 transition-all shadow-2xl active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? 'SECURING...' : 'Acquire Batch'}
                  </button>
                  <Link to={`/product/${products.obsidian.id}`} className="px-8 py-5 border border-white/30 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-sm">
                    Review Essence
                  </Link>
                  <span className="text-3xl font-headline text-white font-bold ml-auto">{new Intl.NumberFormat('vi-VN').format(parseFloat(products.obsidian.price))}đ</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignatureBlends;
