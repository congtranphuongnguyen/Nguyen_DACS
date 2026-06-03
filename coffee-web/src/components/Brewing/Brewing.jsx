import React from 'react';
import { Link } from 'react-router-dom';

const brewingMethods = [
  {
    id: "hario-v60",
    name: "Hario V60",
    description: "Bright, clean, and complex. Highlighting delicate floral and citrus notes.",
    time: "3:00 MIN",
    roast: "LIGHT ROAST",
    tag: "PRECISION",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgYaJ2CU2AvKvIsRkFuIsivt35P9ruenr2CpXU_VpCk9P5LeDZJVZO3FreTFkznCxzI9mcF36I0b4v97rfB81GYm5PQbXsg3MjRFgPtX9w81ex6yCY8O-CI1uFM8bhksuLJ4UCDJ7qbNL78UMEVFEHb_M8dDqI8PBA8zFuabPoV-aTW-iNcxSBHunuKJXFEEm6l9qQnQR81DBWxvq86heKQADq2Ud2iiXwNbIVn0odgyQmY7UhTTLP5j5wKbcA4livN1sYO6ARtI0"
  },
  {
    id: "chemex",
    name: "Chemex",
    description: "A laboratory-grade brew that offers unparalleled clarity and sweetness.",
    time: "4:30 MIN",
    roast: "LIGHT ROAST",
    tag: "CLARITY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDTTyGEPDOMYTu21EScx1cXHk5HdFm3eKwZAzK7Z3WM7__caPCZaR9raw7eglzj2yQ6Ftq-YeqjMBCOjDe9azm89_jYoqOXRLkQZ8D0Pj0cfWyW01ZQtwZp--GCi6KwmsS5_-fOGlHfm8pCC8u7LH0CZkkNQqNdqSXDdrfTwnwiJ1aW0d1-tpR8mKV2_dFh62R6Kq1fcquorqMnka8DoJjez8ySRMdlDA60U9w230eRIla4kOk5zQ5uMxfIwZ7l0kGXn87gJMHAng"
  },
  {
    id: "french-press",
    name: "French Press",
    description: "Rich, full-bodied, and immersive. The ultimate comfort brew.",
    time: "4:00 MIN",
    roast: "DARK ROAST",
    tag: "BODY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL5_I6wODLxA7wQCl538KU8e1729H-uaB2CB4avDc-LWPxaMu1pnQvX7YFHhqOElVPHEcbeKGJIu5ESqIIsBZHDdc56JAXtwlC7Cyb1xsmH0kt2SYjy6L11DtymmtBCJGjmcckcVo7cZjgSdywcq97oSfUBY5z5knuUQyPNQAp5UO4GLFCnfxi5nuc2V3dKOJk7amfJyiTiRi_Ag-gmR600Lo8R3mQmbf8zCNk3p1ujrr3jVd6Gawa_BvV7_OjtbwxSVoyWEbuPW0"
  },
  {
    id: "aeropress",
    name: "Aeropress",
    description: "The explorer's choice. Versatile, portable, and remarkably clean.",
    time: "1:30 MIN",
    roast: "MEDIUM ROAST",
    tag: "VERSATILITY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3rmiPX57X5Bxe-i5yEdsFBjls-KsXou7LrvctVAvL1aIBubzkqcPN4e_SrZKUbKytwRQYYzAiy8Fqig7d6hF0d_f_nnPmkgEeocvUFrQzuahYu0TSyxwNdH1lAeTvFWS7xTa9atztLY0kNuo2oSFogvM4Fx2ZScO7KcK7fbQLoTF3pl2XYsk91a3luKFgjS5w32kSj7N8RZ6gAvTi0i0nwTt933u-WVBeTEoQfmq0xgumCfSF8lSNK1tw9dudmkm8he4KiRhWiBY"
  }
];

const Brewing = () => {
  return (
    <div className="animate-in fade-in duration-700 max-w-[1440px] mx-auto px-6 md:px-12 py-12">
      {/* Hero Header */}
      <header className="mb-20 text-center">
        <span className="font-label text-sm uppercase tracking-[0.4em] text-secondary/60 mb-4 block">Experimental Rituals</span>
        <h1 className="font-headline text-6xl md:text-8xl text-primary font-bold tracking-tighter leading-tight mb-8">
          The Brewing <span className="italic font-light">Laboratory</span>
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </header>

      {/* Masterclass Section - Now at the top */}
      <section className="bg-primary text-on-primary rounded-[48px] p-12 md:p-20 relative overflow-hidden shadow-2xl mb-32">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2 z-0"></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.3em] text-surface/60 mb-6 block">Technique Masterclass</span>
            <h2 className="font-headline text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter">
              The Science of <br /><span className="italic font-light text-secondary">Extraction</span>
            </h2>
            <p className="font-body text-surface/80 text-lg leading-relaxed mb-12 font-light max-w-xl">
              Great coffee isn't an accident. It's the intersection of water chemistry, thermodynamics, and cellular diffusion. Master the variables to unlock the soul of the bean.
            </p>
            
            {/* Professional Stats - Kept as requested */}
            <div className="flex flex-wrap gap-6">
              <div className="bg-surface/10 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/10 flex-1 min-w-[200px] group/tooltip relative cursor-help">
                <span className="block font-label text-[10px] uppercase tracking-widest text-surface/50 mb-2">Brew Temperature</span>
                <span className="font-headline text-3xl font-bold">92° - 96°C</span>
                <p className="text-[10px] mt-2 text-surface/40 uppercase tracking-widest font-bold">Optimal Acidity</p>
                
                {/* Tooltip Temperature */}
                <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-56 p-4 bg-stone-900/95 backdrop-blur-md border border-white/10 text-[11px] text-white/90 rounded-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none z-50 text-center leading-relaxed shadow-2xl">
                  Nhiệt độ lý tưởng để chiết xuất trọn vẹn hương thơm mà không làm cháy cà phê gây đắng.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-900/95"></div>
                </div>
              </div>
              <div className="bg-surface/10 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/10 flex-1 min-w-[200px] group/tooltip relative cursor-help">
                <span className="block font-label text-[10px] uppercase tracking-widest text-surface/50 mb-2">Water Hardness</span>
                <span className="font-headline text-3xl font-bold">150 PPM</span>
                <p className="text-[10px] mt-2 text-surface/40 uppercase tracking-widest font-bold">Magnesium Rich</p>

                {/* Tooltip PPM */}
                <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-56 p-4 bg-stone-900/95 backdrop-blur-md border border-white/10 text-[11px] text-white/90 rounded-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none z-50 text-center leading-relaxed shadow-2xl">
                  Độ cứng của nước tối ưu để cân bằng giữa vị chua và độ ngọt tự nhiên của hạt.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-900/95"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Replaced broken image with a high-quality cinematic coffee GIF */}
            <div className="aspect-[4/5] md:aspect-square rounded-[32px] overflow-hidden shadow-2xl relative border-4 border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                alt="Artisanal pour-over coffee brewing"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <span className="font-label text-[10px] uppercase tracking-widest text-white font-bold block mb-1">Live Capture</span>
                  <span className="text-white/60 text-[9px] uppercase tracking-widest italic">Phase: Artisanal Pour-Over Complete</span>
                </div>
              </div>
            </div>
            
            {/* Visual accent */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>

            {/* Scroll Indicator */}
            <button 
              onClick={() => document.getElementById('methods-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group/scroll cursor-pointer z-20"
            >
              <span className="font-label text-[8px] uppercase tracking-[0.3em] text-white/30 group-hover/scroll:text-white/60 transition-colors">Explore Methods</span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center animate-bounce bg-white/5 backdrop-blur-sm group-hover/scroll:bg-white/10 transition-all">
                <span className="material-symbols-outlined text-white/50 text-xl">expand_more</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Essential Methods Section - Now below Masterclass */}
      <section id="methods-section" className="mb-32 scroll-mt-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold tracking-tighter mb-4">Essential Methods</h2>
            <p className="font-body text-secondary italic font-light">Select your preferred vessel and discover the technical nuances that define its unique flavor profile.</p>
          </div>
          <div className="flex items-center gap-4 border-b border-outline-variant pb-2">
            <span className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">Total Guides</span>
            <span className="font-headline text-2xl font-bold text-primary">{brewingMethods.length}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {brewingMethods.map((method) => (
            <Link 
              to={`/brewing/${method.id}`} 
              key={method.id} 
              className="group"
            >
              <div className="bg-surface-container overflow-hidden rounded-[32px] transition-all duration-500 transform group-hover:-translate-y-4 group-hover:scale-[1.05] group-hover:shadow-[0_32px_64px_-16px_rgba(78,52,46,0.2)] border border-outline-variant/10 relative">
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    src={method.image} 
                    alt={method.name} 
                  />
                  {/* Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-surface/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-outline-variant/30">
                      <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{method.tag}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="p-10 relative z-10">
                  <h3 className="font-headline text-2xl mb-4 font-bold text-primary group-hover:text-secondary transition-colors uppercase tracking-tight italic">
                    {method.name}
                  </h3>
                  <p className="font-body text-sm text-secondary/70 mb-10 leading-relaxed font-light line-clamp-2">
                    {method.description}
                  </p>
                  
                  <div className="pt-8 border-t border-outline-variant/30 flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-base text-secondary/60">timer</span>
                        <span className="font-label text-[10px] font-bold uppercase tracking-widest text-primary">{method.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-base text-secondary/60">coffee</span>
                        <span className="font-label text-[10px] font-bold uppercase tracking-widest text-primary">{method.roast}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all group-hover:translate-x-1">
                      <span className="material-symbols-outlined text-secondary group-hover:text-on-primary transition-colors">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Origin Influence Section */}
      <section className="py-24">
        <div className="bg-stone-50/50 rounded-[48px] p-12 md:p-20 grid md:grid-cols-2 gap-16 items-center border border-stone-100 shadow-sm">
          <div className="order-2 md:order-1">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary/60 mb-6 block">The Terroir Influence</span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold mb-8 tracking-tighter leading-tight italic">Why Origin Matters</h2>
            <p className="font-body text-secondary leading-relaxed mb-12 text-lg font-light">
              The same V60 technique will yield vastly different results based on where the bean was nurtured. Matching your method to the origin is the final step in the ritual.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-4 font-label text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:opacity-70 transition-all">
              Discover Origins 
              <span className="material-symbols-outlined">explore</span>
            </Link>
          </div>
          <div className="order-1 md:order-2 aspect-video rounded-3xl overflow-hidden shadow-xl">
             <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3zVbK-o8_3uMO4JKus3OE_Uw3M-Dlzy3jm4DlceuCEW6i_9M712SS2LUmAgtCaq5ZKgwEH-asKEgMKfE-2Aez7XizKJxsAR9hJHh1q7rd4LQN2RtBIiaJ-BKTRr3P0ctMtmBZAtkEZRFBXrNobyU8wgKn9z15ejnLYX1spFUvsaEF5rl6BmMToJB7G8xr4YRo08sa3QiG-ozIDgaq6f6vwVyPZD_wNznEUw_sgmXDWhahCbFSmevGpMTXoueNAI_BONpNv4yskcA" 
              alt="Coffee Plantation"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-stone-900 rounded-[48px] px-8 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="font-headline text-5xl md:text-7xl mb-8 italic font-light text-white tracking-tighter">Stay Curious.</h2>
          <p className="font-body text-lg text-white/60 mb-12 font-light leading-relaxed">
            Receive monthly brew recipes, roaster notes, and exclusive first-looks at limited seasonal harvests.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              className="bg-white/10 border border-white/10 focus:ring-1 focus:ring-white text-white placeholder:text-white/30 px-8 py-5 rounded-2xl w-full font-body outline-none transition-all backdrop-blur-md" 
              placeholder="Your email address" 
              type="email"
            />
            <button className="bg-white text-primary px-12 py-5 rounded-2xl font-label uppercase tracking-widest text-[10px] font-bold hover:bg-surface transition-all shadow-xl active:scale-95">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Brewing;
