import React from 'react';
import { Link } from 'react-router-dom';
import { products } from './products';

const Home = () => {
  // Get first 3 products for the featured section
  const featuredProducts = (products || []).filter(p => p.roast && !p.roast.includes('none')).slice(0, 3);

  return (
    <div className="animate-in fade-in duration-1000 w-full overflow-x-hidden bg-surface text-on-surface">
      {/* Hero Section - Full Width Background */}
      <section className="relative h-[60vh] md:h-[70vh] max-h-[600px] flex items-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Artisanal coffee brewing" 
            className="w-full h-full object-cover animate-subtle-zoom" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Amanp0HSyup6eQLAjlpv_hbZcsO3bs2CKrgV0MWkoIGY9nlcfDEgCGTRUOfov6w_G-nYpwJnysZ8TDoyUVEQWMTmj8unFH9ZmES-8HzC7fNtRZDZGloXf0rjyac0Khv1G2SWe3sDFl-fgMcyAjgbuM2w2m-0Ee3_q5ZiBwbE0oLX4Qg5Eu24h3i6wDFT1Q6m2dBeEieg_E-KBaI6NxcoiI0XAjfzxOyzEJes-Bbp5D9fjFwupdTslzRMpbrukMSxn6_y_jRgIHE" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/40 to-transparent"></div>
        </div>
        
        {/* Hero Content - Constrained to 1440px */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <span className="text-surface font-label uppercase tracking-[0.4em] text-[10px] mb-4 block">Est. 2024 — Small Batch Roastery</span>
            <h1 className="text-surface font-headline text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              The Ritual of the <span className="italic font-serif font-light">Perfect</span> Pour
            </h1>
            <p className="text-surface/80 text-base md:text-lg font-light mb-10 max-w-lg leading-relaxed">
              Sourced from high-altitude estates, roasted with clinical precision, and delivered for your morning sanctuary. Explore our curated single-origin series.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                to="/shop" 
                className="bg-surface text-primary px-10 py-4 rounded-lg font-label font-bold text-xs tracking-widest hover:bg-white transition-all flex items-center justify-center group shadow-lg"
              >
                EXPLORE THE BEANS
                <span className="material-symbols-outlined ml-3 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link 
                to="/sommelier" 
                className="bg-primary/20 backdrop-blur-md border border-surface/30 text-surface px-10 py-4 rounded-lg font-label font-bold text-xs tracking-widest hover:bg-primary transition-all flex items-center justify-center group"
              >
                FIND YOUR RITUAL (AI)
                <span className="material-symbols-outlined ml-3 text-sm animate-pulse">magic_button</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections - Constrained Container */}
      <section className="py-20 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight">Single-Origin Series</h2>
            <p className="text-secondary font-light text-base leading-relaxed">Every bean tells the story of its soil, climate, and the hands that nurtured it.</p>
          </div>
          <Link to="/shop" className="text-primary font-bold border-b-2 border-outline-variant pb-1 hover:border-primary transition-all text-[10px] tracking-widest uppercase">
            View All Origins
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-surface-container-low mb-6 relative shadow-sm group-hover:shadow-xl transition-all duration-500 border border-outline-variant/10">
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  src={product.image} 
                />
                <div className="absolute top-4 left-4 bg-primary/80 text-surface px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase backdrop-blur-sm">
                  {product.region}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-xl text-primary group-hover:text-secondary transition-colors uppercase tracking-tight">{product.name}</h3>
                  <span className="font-label font-bold text-primary">${product.price}</span>
                </div>
                <p className="text-secondary text-xs font-light leading-relaxed line-clamp-2">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brewing Equipment - Full Width Background Color */}
      <section className="bg-surface-container-low py-32 w-full border-y border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10"></div>
            <img 
              alt="Precision Coffee Scale" 
              className="rounded-3xl shadow-2xl z-10 relative object-cover max-h-[500px] w-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs5ezV3fGg9MBSDIIRhxLrX0fy3mtTDFdClOVK6Y28vQXu_Jm2fJHZir1d0xq5Pb89y4EEgK3OTAhUmKJbw65S-VplIBdVUE50w1Nn8KGebqnVC_JdU19pfuGEI9eXUesWGaic505CJbr_Ip4XgQciesU1n442h3PKHjN7noctrXfwZHsPm-RLH2NHwbK1g-7zKPcZElxwv8YCRKASnqZB8rHLja9bPsnmSvbJAmKygqVVqT-3nptK8XkEK5vqEYc3I2wOuL3_4DQ" 
            />
          </div>
          
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-[1.1] tracking-tight">Master the <span className="italic font-light">Craft</span></h2>
            <p className="text-secondary text-base leading-relaxed font-light max-w-lg">
              The finest beans require the finest instruments. We've curated a selection of tools used by our master roasters to ensure your ritual.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-surface-container rounded-2xl border border-outline-variant/10 shadow-sm">
                <span className="material-symbols-outlined text-secondary text-3xl mb-4">thermostat</span>
                <h4 className="font-bold text-primary mb-2 text-sm">Temperature</h4>
                <p className="text-[10px] text-secondary uppercase tracking-widest leading-relaxed">Precision kettles for consistency.</p>
              </div>
              <div className="p-6 bg-surface-container rounded-2xl border border-outline-variant/10 shadow-sm">
                <span className="material-symbols-outlined text-secondary text-3xl mb-4">scale</span>
                <h4 className="font-bold text-primary mb-2 text-sm">Precision</h4>
                <p className="text-[10px] text-secondary uppercase tracking-widest leading-relaxed">Accurate to 0.1g for the ritual.</p>
              </div>
            </div>
            <Link 
              to="/shop" 
              className="inline-block border-2 border-primary text-primary px-10 py-4 rounded-lg font-label font-bold text-[10px] tracking-widest hover:bg-primary hover:text-surface transition-all active:scale-95 uppercase"
            >
              SHOP EQUIPMENT
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter - Full Width Background */}
      <section className="bg-primary w-full py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-surface tracking-tight">Join the Circle</h2>
            <p className="text-surface/70 text-base font-light leading-relaxed">
              Exclusive access to micro-lot releases and brewing guides.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 mt-8 bg-surface/10 p-2 rounded-xl border border-surface/20">
              <input className="flex-grow bg-transparent border-none px-4 py-3 text-surface focus:ring-0 placeholder:text-surface/40 text-sm" placeholder="Your email address" type="email" />
              <button className="bg-surface text-primary font-label font-bold tracking-widest text-[10px] px-8 py-4 rounded-lg hover:bg-white transition-all shadow-md active:scale-95">SUBSCRIBE</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
