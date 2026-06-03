import React from 'react';

const Shipping = () => {
  return (
    <div className="animate-in fade-in duration-700 w-full overflow-x-hidden pt-12 bg-surface text-on-surface font-body">
      <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Crafting the Journey</span>
          <h1 className="text-5xl md:text-7xl text-primary font-headline font-bold leading-tight mb-8">Shipping & <br /><span className="italic">Logistics</span></h1>
          <div className="relative w-full h-80 md:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <img 
              alt="Freshly roasted coffee packing" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCviW_bgxQbAImriyUVSqgH9VDgrNr2dNQzi3-8v_MDQRZk3mfdh-SBXjctJFaqHLVkxMp-a95EPF0f_GpAwASaDRqqnPOtodyC-_yCr12xMqey-Vb0pbMhvewOpgF0i8PMtYjhaTtfKEKzlNONduCyIkkspBxSNBoEabvXKOlo9xWCuzZOSLyTI0yyUKY4AYZJ8Jr9hX4p_H9LuxH6TSfUldo6-VTqZybnbS0o8dXtJdfjGqqtBtRaWxg1mncFAkZU3S2z6ycip1iq" 
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
        </section>

        {/* Bento Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* Domestic Rates */}
          <div className="md:col-span-8 bg-surface-container-low p-10 rounded-3xl border border-stone-100 shadow-sm transition-all hover:shadow-md">
            <h2 className="text-3xl text-primary font-headline mb-8 italic">Domestic Shipping</h2>
            <div className="space-y-10">
              <div className="flex justify-between items-end border-b border-outline-variant/10 pb-6">
                <div>
                  <h3 className="font-bold text-xl text-primary">Standard Alchemy</h3>
                  <p className="text-on-surface-variant text-sm font-light">3–5 Business Days</p>
                </div>
                <span className="text-primary font-bold font-headline text-2xl tracking-tighter">30.000đ</span>
              </div>
              <div className="flex justify-between items-end border-b border-outline-variant/10 pb-6">
                <div>
                  <h3 className="font-bold text-xl text-primary">Express Roast</h3>
                  <p className="text-on-surface-variant text-sm font-light">1–2 Business Days</p>
                </div>
                <span className="text-primary font-bold font-headline text-2xl tracking-tighter">50.000đ</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-xl text-primary">Artisan Prime</h3>
                  <p className="text-on-surface-variant text-sm font-light">Orders over 1.000.000đ</p>
                </div>
                <span className="text-secondary font-bold font-headline uppercase tracking-[0.2em] text-[10px] bg-secondary-container px-4 py-1.5 rounded-full">Complimentary</span>
              </div>
            </div>
          </div>

          {/* Global Column */}
          <div className="md:col-span-4 bg-primary text-on-primary p-10 rounded-3xl flex flex-col justify-between shadow-xl">
            <div>
              <span className="material-symbols-outlined text-5xl mb-8 opacity-40">public</span>
              <h2 className="text-3xl font-headline mb-6 italic">International Delivery</h2>
              <p className="text-on-primary/70 text-sm leading-relaxed mb-8 font-light">
                We bring the aroma of Terra Brew to over 45 countries. International orders are handled with specialized care to preserve freshness across borders.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mb-3">Estimated Window</p>
              <p className="text-3xl font-headline italic">7–14 Days</p>
              <p className="text-[10px] mt-4 italic opacity-50 font-light leading-relaxed">*Rates calculated at checkout based on weight & region</p>
            </div>
          </div>

          {/* Eco Section */}
          <div className="md:col-span-12 bg-secondary-container p-12 rounded-3xl relative overflow-hidden group border border-stone-200 shadow-sm transition-all hover:shadow-md">
            <div className="relative z-10 lg:w-3/5 space-y-6">
              <h2 className="text-4xl text-on-secondary-container font-headline italic">Eco-friendly Packaging</h2>
              <p className="text-on-secondary-container/80 leading-relaxed text-lg font-light">
                Our commitment to the Earth extends beyond the bean. Every Terra Brew shipment is housed in 100% compostable mailers and FSC-certified recycled cardboard. We use soy-based inks for all printing, ensuring your ritual leaves no trace.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
                <li className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>energy_savings_leaf</span>
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest text-on-secondary-container">Zero Plastic</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>recycling</span>
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest text-on-secondary-container">Compostable</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>co2</span>
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest text-on-secondary-container">Carbon Neutral</span>
                </li>
              </ul>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block opacity-20 group-hover:opacity-40 transition-all duration-1000">
              <img 
                alt="Recycled paper texture" 
                className="w-full h-full object-cover grayscale" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Nmdw76xzjoh99nZPjSOuIGV9ucRiFW_Wuv2S2tuM75vMA_d1BgrlUoC9vf6LGhpSBtqhfmB23qUITqlaZS-lqzK2ylW4CjtzsVrBuWuCTxW5hy5kGo7X5ruP0ifXNEDXsWZBPMRxFZo9oO9SnFXd8X48kT8r6Hw_9L-ZHvJi6kc6EJb7UAIYItvkExrlRaj8b8lTfIYOyGChS_FawweFm06ItQSEYL9vIRPm7AHZuXpifFKZalNGKPt_ZwLxYhY3VRAy9SrK_i4_" 
              />
            </div>
          </div>

          {/* Tracking Card */}
          <div className="md:col-span-6 bg-surface-container p-10 rounded-3xl border border-stone-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
              </div>
              <h2 className="text-3xl text-primary font-headline italic">Order Tracking</h2>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8 font-light">
              As soon as your beans leave the roastery, you'll receive an email with a unique tracking link. Our portal provides real-time updates from "Roasted" to "At Your Door."
            </p>
            <div className="flex gap-3">
              <input 
                className="flex-grow bg-white/80 border border-stone-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-container outline-none font-body text-sm shadow-inner" 
                placeholder="TB-Order-0000" 
                type="text" 
              />
              <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-all shadow-lg active:scale-95">Track</button>
            </div>
          </div>

          {/* Support Card */}
          <div className="md:col-span-6 border border-outline-variant/20 p-10 rounded-3xl flex flex-col justify-center text-center space-y-6">
            <h2 className="text-3xl text-primary font-headline italic">Lost in Transit?</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm mx-auto font-light">
              If your shipment hasn't arrived within the expected window, our Alchemy Support team is ready to assist.
            </p>
            <div className="flex justify-center pt-4">
              <button className="text-primary font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 group border-b border-primary/20 pb-2 hover:border-primary transition-all">
                Contact Support
                <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shipping;
