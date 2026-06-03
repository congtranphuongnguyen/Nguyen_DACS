import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services';

const SingleOrigins = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Failed to fetch origins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter single origins from the fetched products
  const singleOrigins = allProducts.filter(p => p.isSingleOrigin || p.category === 'beans');

  // Apply region and search filters
  const filteredOrigins = singleOrigins.filter(product => {
    const regionMatch = selectedRegion === 'All Regions' || product.region === selectedRegion;
    const name = product.name || '';
    const region = product.region || '';
    const searchLower = searchQuery.toLowerCase();
    const searchMatch = searchQuery === '' || 
      name.toLowerCase().includes(searchLower) || 
      region.toLowerCase().includes(searchLower);
    
    return regionMatch && searchMatch;
  });

  const regions = ['All Regions', 'Africa', 'Americas', 'Asia & Pacific'];

  return (
    <div className="animate-in fade-in duration-700 w-full overflow-x-hidden pt-12 bg-surface text-on-surface font-body">
      <main className="max-w-7xl mx-auto px-6">
        {/* Editorial Header Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-3 block">The Curator's Choice</span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-primary leading-tight">Single Origins</h2>
              <p className="mt-6 text-primary leading-relaxed max-w-lg font-light">
                Tracing the unique soul of coffee back to its roots. Each harvest tells a story of volcanic soil, high altitudes, and meticulous hands.
              </p>
            </div>
            {/* Search Bar */}
            <div className="w-full md:w-80 group">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-secondary/40">search</span>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 ring-primary/10 font-body text-sm placeholder:text-secondary/40 transition-all shadow-inner" 
                  placeholder="Find your origin..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Pills */}
        <nav className="flex gap-4 overflow-x-auto pb-10 no-scrollbar">
          {regions.map(region => (
            <button 
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-8 py-3 rounded-full font-label text-sm whitespace-nowrap transition-all duration-300 ${
                selectedRegion === region 
                  ? 'bg-primary text-on-primary shadow-lg scale-105' 
                  : 'bg-surface-container-high text-secondary hover:bg-surface-container-high/80'
              }`}
            >
              {region}
            </button>
          ))}
        </nav>

        {/* Product Grid */}
        {filteredOrigins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {filteredOrigins.map((product, index) => {
              if (index === 0 && selectedRegion === 'All Regions' && searchQuery === '') {
                return (
                  <div key={product.id} className="md:col-span-8 group relative overflow-hidden bg-surface-container rounded-3xl p-8 transition-all hover:shadow-2xl border border-outline-variant/10 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                        <img 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                          src={product.image} 
                        />
                      </div>
                      <div className="flex flex-col justify-between py-4">
                        <div className="space-y-6">
                          <div className="flex justify-between items-start">
                            <span className="bg-secondary text-on-secondary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">Featured Harvest</span>
                            <span className="text-2xl font-serif text-primary tracking-tighter">{new Intl.NumberFormat('vi-VN').format(parseFloat(product.price))}đ</span>
                          </div>
                          <h3 className="text-5xl font-serif italic text-primary leading-none">{product.name}</h3>
                          <p className="text-secondary font-bold text-xs tracking-widest uppercase">{product.region} · {product.roast}</p>
                          
                          <div className="space-y-6 pt-4">
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Palate Profile</span>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {product.flavorProfile?.map(flavor => (
                                  <span key={flavor} className="px-3 py-1 bg-surface-container-high rounded-lg text-xs font-medium text-primary">{flavor}</span>
                                ))}
                              </div>
                            </div>
                            {product.roastDate && (
                              <div className="pt-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-600 text-sm">nest_clock_farsight_analog</span>
                                <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border border-amber-100">Mới rang ngày: {new Date(product.roastDate).toLocaleDateString('vi-VN')}</span>
                              </div>
                            )}
                            <p className="text-secondary text-sm leading-relaxed font-light line-clamp-4">
                              {product.originStory || product.description}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => addToCart(product)}
                          className="mt-10 w-full bg-primary text-on-primary py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl active:scale-95"
                        >
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                          <span className="uppercase text-xs tracking-widest">Reserve Batch</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={product.id} className="md:col-span-4 bg-surface-container rounded-3xl p-8 transition-all hover:bg-white border border-outline-variant/10 group shadow-sm hover:shadow-xl">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-8 shadow-md">
                    <img 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      src={product.image}
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-serif italic text-primary tracking-tight">{product.name}</h3>
                    <span className="text-xl font-serif text-primary">{new Intl.NumberFormat('vi-VN').format(parseFloat(product.price))}đ</span>
                  </div>
                  <p className="text-secondary font-bold text-[10px] tracking-widest mt-2 uppercase">{product.region} · {product.roast}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.flavorProfile?.map(flavor => (
                      <span key={flavor} className="px-2 py-1 bg-surface-container-high rounded-md text-[11px] font-medium text-primary">{flavor}</span>
                    ))}
                  </div>
                  {product.roastDate && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-600 text-[16px]">nest_clock_farsight_analog</span>
                      <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest">Mới rang: {new Date(product.roastDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  )}
                  <button 
                    onClick={() => addToCart(product)}
                    className="mt-8 w-full py-4 border border-primary text-primary rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 bg-surface-container-low rounded-[3rem] border border-outline-variant/10">
            <span className="material-symbols-outlined text-7xl text-secondary opacity-30 mb-6">explore_off</span>
            <h3 className="text-2xl font-headline italic text-primary">No origins found in this region</h3>
            <p className="mt-4 text-secondary font-light">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => { setSelectedRegion('All Regions'); setSearchQuery(''); }}
              className="mt-8 px-10 py-3 bg-primary text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:opacity-90 transition-all font-sans"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Educational Section */}
        <section className="mt-20 p-16 rounded-[3rem] bg-primary text-surface relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              alt="Coffee farm" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1200" 
            />
          </div>
          <div className="relative z-10 lg:w-3/5 space-y-8">
            <h4 className="text-5xl font-serif italic leading-tight">Why Single Origin?</h4>
            <p className="text-surface font-body leading-relaxed text-lg font-light opacity-80">
              Unlike blends, single origin coffees offer a pure snapshot of a specific place and time. You taste the terroir—the unique environmental factors that affect a crop's phenotype. Identity is absolute.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SingleOrigins;
