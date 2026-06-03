import React from 'react';

const Header = () => {
  return (
    <header className="mb-20 flex flex-col md:flex-row justify-between items-start gap-12 border-b border-stone-100 pb-16">
      <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
        <div>
          <h1 className="text-6xl md:text-7xl font-headline font-bold text-stone-800 mb-4 tracking-tighter">
            Curated <span className="italic font-light text-stone-400">Provisions</span>
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl leading-relaxed font-light">
            From the volcanic soils of Ethiopia to the mist-covered peaks of Sumatra.
            Discover beans roasted for the slow, intentional ritual of brewing.
          </p>
        </div>
        
        {/* Quick Stats Row */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-stone-50">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-stone-300 text-sm">coffee</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">50+ Specialty Beans</span>
          </div>
          <span className="w-1.5 h-1.5 bg-stone-100 rounded-full hidden sm:block"></span>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-stone-300 text-sm">schedule</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">48h Freshness Guarantee</span>
          </div>
          <span className="w-1.5 h-1.5 bg-stone-100 rounded-full hidden sm:block"></span>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-stone-300 text-sm">public</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Global Shipping</span>
          </div>
        </div>
      </div>

      {/* Premium Badge / Illustration */}
      <div className="flex-shrink-0 animate-in fade-in zoom-in duration-1000 delay-300 mt-4 md:mt-0">
        <div className="relative w-40 h-40 bg-stone-50 rounded-full flex items-center justify-center border border-stone-100 shadow-inner group">
          <div className="absolute inset-2 border border-dashed border-stone-200 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="text-center space-y-1 relative z-10 transition-transform group-hover:scale-110 duration-500">
            <span className="material-symbols-outlined text-stone-800 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-800">Premium<br/>Quality</p>
            <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">Est. 2026</p>
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-stone-400/5 blur-2xl rounded-full -z-10 group-hover:bg-stone-400/10 transition-colors"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;