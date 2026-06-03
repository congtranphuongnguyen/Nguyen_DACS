import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import BundleModal from '../components/Products/BundleModal';

const BrewingGear = () => {
  const [activeTab, setActiveTab] = useState('All Gear');
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useUI();
  const limitedRef = useRef(null);

  const products = [
    {
      id: "gear-obsidian-grinder",
      name: "The Obsidian Grinder",
      price: "420.00",
      category: "Electric",
      label: "Limited Edition",
      description: "Hand-forged titanium burrs with 64 precise grind settings for the uncompromising home barista.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqXLR_iJshZvOWH0a1V05V68TmxNagVzlfUSgXPC372awhpy_hdFFp86LMsq2oKQ4Y6lTCXT4GcH3rdcq-LznH7BvyZJF5OJ4gulOBu9-0qdG15GpRNxFsRYazYY4ynIhw5QXxDzPgxNgnZd_1kDQZd5ArhsfCMfq0HJjvcnAgjTFAwTMvIeWMVe2OS7FpPpp_3K9AVibXn65jJJg-BbdkvcjNZ4xHmkQLwlS6bxXM0XppqXNhtieOfboFvwVTR4MHjtyY3YGypsUB"
    },
    {
      id: "gear-aureum-kettle",
      name: "Aureum Kettle",
      price: "185.00",
      category: "Manual",
      label: "Manual Pour",
      description: "Copper-layered precision gooseneck kettle for perfect temperature stability.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt9AtZwA5MNCusAQqpssJDo83SaZHWBS7fwnuanZMXFUhuCmC0fuoHyjBQqpLm-jvari6JyGe3iFB4r-RUzO2_pI05Vcmzd9qT0EuhlnOonRUn_CbzCHTZ5JfRxergbR_ercnM5-CCfADmOMztXz3a4nh5-IKYvjqR4KwB7MQ_1-Fd5yOHV0trBC8f3CTzWSuaT76i94-8vqfzOoFKa5P2pUHuN2-dlQqF0ghz3CXmuDkbYUSsDFxzkY5FGFRFd5z2G_4m_wavfRPh"
    },
    {
      id: "gear-prism-dripper",
      name: "Prism Dripper",
      price: "78.00",
      category: "Manual",
      label: "V60 Pattern",
      description: "Borosilicate glass dripper with multi-faceted interior for optimal bloom.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBulWnekBkYiYjN2JOWXZgCubhALkO-ktKmpLFz6WwOWwlDjyNDdtII-ze8QdJnVsT755H5_YdP0jfWAr2e-X4X_SipxBIAQbpA_t3NJtFW105pv9_2doqc2VDazYAaqeVvn-NF25NpQeHuqK7p0YdRWKtAEro01X5w8rAk06274MRvpgpDn-AHyXP0tLavsnWdHlG-O98h9rRnowfI8Ung0zZiRmovgHIS0PSYZKjpvxHErKpulqIcawz4asj96lZw-sH_sTOn48JZ"
    },
    {
      id: "gear-terra-cups",
      name: "Terra Cups (Set of 2)",
      price: "45.00",
      category: "Accessories",
      label: "Stone Clay",
      description: "Double-walled ceramic cups that capture the heat and aroma of your laboratory's best brews.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqZcApBxa3vH1NvCPbYg0_fyVsfZdNG5xn_c3aeTppuwW7KxiXJP9tTtum-b8o0SJmDRygu3bZoI9dsrE4M1ZeB4hh-2AsH4RFzGloQDvSJ3zn6priEIefUCmgileNsDDvG9vH__Dxp24bcQ_5Ko_QhVBcRJ84vp1tJ4TjxiSMBQ5cK6lumEZIxWe2R3FASn-yZ4m3XKXBGKfRiXpj_5u8EycvsNAeJLEZQ_3IG1JszqXW1q3k6ONZYPl58IGLLRMMaEXAlTIQG8rN"
    }
  ];

  const filteredProducts = activeTab === 'All Gear' 
    ? products 
    : products.filter(p => p.category === activeTab);

  const handleQuickAdd = (p) => {
    addToCart(p);
    showToast(`${p.name} added to your laboratory!`);
  };

  const handleAddFullSet = () => {
    // Adding the whole set logic
    addToCart({
        id: 'bundle-alchemist-set',
        name: 'The Complete Alchemist Set',
        price: '618.80',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
        description: 'Complete brewing laboratory bundle.'
    });
    showToast("The Alchemist laboratory is being shipped to you!");
  };

  const scrollToLimited = () => {
    limitedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs = ['All Gear', 'Manual', 'Electric', 'Accessories'];

  return (
    <div className="animate-in fade-in duration-700 w-full overflow-x-hidden pt-12 bg-surface text-on-surface font-body">
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Bundle Modal */}
        <BundleModal 
            isOpen={isBundleModalOpen} 
            onClose={() => setIsBundleModalOpen(false)} 
            onAddFullSet={handleAddFullSet}
        />

        {/* Hero Section */}
        <section className="mb-16 relative">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-8">
              <span className="text-secondary font-bold tracking-[0.2em] text-[10px] uppercase">The Alchemist Series</span>
              <h1 className="text-5xl md:text-6xl text-primary leading-tight font-headline italic">Precision in every <br />pour.</h1>
              <p className="text-on-surface-variant max-w-md leading-relaxed text-lg font-light italic">
                Elevate your morning ritual with tools designed for the modern purist. Explore our curated selection of artisanal gear.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={scrollToLimited}
                  className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-stone-800 transition-all shadow-lg active:scale-95 cursor-pointer uppercase tracking-widest text-xs"
                >
                  Shop Featured
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-surface-container shadow-2xl transform rotate-1 md:rotate-2">
                <img 
                  alt="Luxury pour over set" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwA4el-JtrRKbUXZJ2a0isnjeDVgwTm3UVmd93c7xmKsMqxjJpvOx1gTUGNHkbzeLuXr3SGVKFSQEFY3765lqQOwrHo8p52oKnlxxA1TTUkkIuISnK-S3l-KhbpH-t_T_4JKVT3Z7KS4GVGmqLkXiPxbWWmm-FTXj0eiascREJXpU5Pl0hbihFphV0RGVwWdktc9znUIuBs7MtQCY5IOSsJY8IsC6qaLIhQZLYrra-NqkRCbOL3xALcSg0uC59qRrKtEwM3XkbfDey" 
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white/40 backdrop-blur-xl p-8 rounded-[2rem] hidden lg:block max-w-[240px] shadow-2xl border border-white/20">
                <p className="text-sm font-medium italic text-primary leading-relaxed">"Extraction is an art form, mastered through the right vessel."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <nav className="flex gap-12 mb-16 border-b border-outline-variant/15 overflow-x-auto pb-0 scrollbar-hide relative">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-4 px-2 text-lg transition-all duration-300 font-bold whitespace-nowrap cursor-pointer ${activeTab === tab ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in fade-in slide-in-from-left-2 duration-300"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Product Grid - Bento Style */}
        <div ref={limitedRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 scroll-mt-24">
          {filteredProducts.map((p, idx) => {
            const isLarge = p.id === 'gear-obsidian-grinder';
            return (
              <div 
                key={p.id}
                className={`${isLarge ? 'md:col-span-8' : 'md:col-span-4'} rounded-[2.5rem] overflow-hidden group border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all duration-500 bg-surface-container-low`}
              >
                {isLarge ? (
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 p-12 flex flex-col justify-between">
                      <div>
                        <span className="text-secondary font-bold tracking-widest text-[10px] uppercase">{p.label}</span>
                        <h2 className="text-4xl text-primary mt-6 mb-4 font-headline italic">{p.name}</h2>
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-8 font-light italic">
                          {p.description}
                        </p>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-3xl font-headline text-primary tracking-tighter whitespace-nowrap">{new Intl.NumberFormat('vi-VN').format(p.price)}đ</span>
                        <button 
                          onClick={() => handleQuickAdd(p)}
                          className="bg-primary text-white p-5 rounded-2xl hover:bg-stone-800 transition-all shadow-xl active:scale-95 cursor-pointer"
                        >
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                        </button>
                      </div>
                    </div>
                    <div className="md:w-1/2 relative overflow-hidden h-80 md:h-full">
                      <img alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={p.image} />
                    </div>
                  </div>
                ) : (
                  <div className="p-8 h-full flex flex-col justify-between">
                    <div className="aspect-square rounded-[2rem] overflow-hidden mb-8 bg-white p-4 shadow-inner">
                      <img alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={p.image} />
                    </div>
                    <div>
                      <h3 className="text-2xl text-primary font-headline italic">{p.name}</h3>
                      <div className="flex justify-between items-center mt-6">
                        <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest opacity-60">{p.label}</span>
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-headline text-primary font-bold whitespace-nowrap">{new Intl.NumberFormat('vi-VN').format(p.price)}đ</span>
                            <button 
                                onClick={() => handleQuickAdd(p)}
                                className="text-primary hover:scale-125 transition-all p-2 bg-white rounded-full shadow-sm cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-2xl font-bold">add_circle</span>
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Custom Bundle Promo */}
          <div className="md:col-span-4 bg-primary text-on-primary rounded-[2.5rem] p-12 flex flex-col justify-center relative overflow-hidden group shadow-3xl">
             <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"></div>
             <div className="relative z-10 space-y-6">
               <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-bold">Bundle Pack</span>
               <h3 className="text-4xl font-headline italic leading-tight">The Complete <br />Alchemist Set</h3>
               <p className="text-white/70 text-sm leading-relaxed font-light italic">
                 Everything you need to transform your kitchen into a laboratory of flavor.
               </p>
               <button 
                onClick={() => setIsBundleModalOpen(true)}
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-[#F3EFE0] transition-all text-[10px] uppercase tracking-widest shadow-2xl active:scale-[0.98] cursor-pointer"
               >
                 View Essence Bundle
               </button>
             </div>
          </div>
        </div>

        {/* Section: Brewing Journal */}
        <section className="mt-32 mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-primary/10 pb-8 gap-8">
            <div>
              <span className="text-secondary font-bold tracking-[0.3em] text-[10px] uppercase">Master the Craft</span>
              <h2 className="text-5xl text-primary font-headline italic mt-4">The Brewing Journal</h2>
            </div>
            <Link to="/journal" className="text-primary font-bold flex items-center gap-3 group text-[10px] uppercase tracking-[0.3em] pb-2 cursor-pointer border-b border-transparent hover:border-primary transition-all">
              All Alchemy Guides 
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { title: "Unlocking the Golden Bloom", tag: "Manual Brew", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBesqxCwyyMAyC6WdAixaXr-uHBr47eOgHmHRZLtQGElAyYsml3TT8PKQkQDlyUQArYaEEffO2mHBto9FunnRqvKRwBrzhruAMgoVCOpCaPLlvbMhNKOetpsAhcLIdKyk_BMUhy7FvcJQLe5ahMK_NXp6RaLOTmi-SKTgCKGUSnLh2hRLhDl8_YTvEV7LScGSrD9ObzBXBJUHOQdDcyW2YvzP9XNoVuZHbSrOFI0HozV9sKFF6mzfxmdl66fn8R7lgbNmKwOgUs7PTt" },
                { title: "Microns Matter: Particle Size", tag: "Grind Theory", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA3a1p5G_rub9iv8ZuYehDXpul1gl-wTAhN4w2t-XCLrlwhNpg1jkjUQJwqoFh5Y76bXHNkwWvntthc9ZuTx0uPNRpcV-OebAk-RfpyPEcD9_HU8emQTDSPAgBCJUWnCqL250cyMEQiStn8OKXU44qIBS_fuoCe9ejlkdH-awy7Ite1SpkaP4i6iBMWzr1KdNLMvL8qCfbwY1zJtYGCQIlyQ0s0imQc1hiD5rKzMyoS05hQDipid_Wcu6gtlHoPj1TbSSK-77Ym7lL" },
                { title: "The Science of Ratio", tag: "Technique", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyTdQWwfazI0cpFjpk9BGmhSQ6BgEQUS8ikd1ov8Tpkjc5MrOu8xLvSoOXoLzqEILfF5CIRFsDwMbqEvyfdZa3GEW8M_EE-ekFqpVdA5ST8Nm361yUtgayvuQyQ8amlEYPSe3FNBp4jFY8i9OFkOIf5icyJYCH4v6vkr3xdGV9X6dAB8k86oniCxhJs6gdp8nTl0Pzb8iGwFovpbXvAox1cgwp0j0Y0sqkHgC72PZgHvsFvqS2AukjRIze4g3daBGeaHHwt1QQm3Ch" }
            ].map((post, i) => (
                <Link key={i} to="/journal" className="space-y-6 group cursor-pointer block">
                    <div className="aspect-[16/10] rounded-[2rem] overflow-hidden shadow-lg border border-outline-variant/10">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={post.img} alt={post.title} />
                    </div>
                    <div className="space-y-3">
                        <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">{post.tag}</span>
                        <h4 className="text-2xl text-primary font-headline italic leading-tight group-hover:text-primary active:scale-95 transition-all">{post.title}</h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed font-light italic opacity-80">A deep dive into the molecular interaction of time and temperature.</p>
                    </div>
                </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BrewingGear;
