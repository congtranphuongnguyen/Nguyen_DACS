import React from 'react';
import { Link } from 'react-router-dom';

const HandcraftedDrinks = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#fef8f3]/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-outline-variant/10">
        <button className="text-primary active:opacity-80 duration-300">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="font-headline italic font-bold tracking-widest text-primary text-xl">
          THE MODERN ALCHEMIST
        </div>
        <button className="text-primary active:opacity-80 duration-300">
          <span className="material-symbols-outlined">shopping_bag</span>
        </button>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[397px] w-full overflow-hidden">
          <img 
            alt="Barista pouring latte art" 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZL711q__PF0H3qMCam55zGEI5UNKjkPq8bVNLXlD79BQLic7supyJ3mdAcw3n0pB-oMa8VgX0Kyg87-j3Hz4J2KgJB06OXuyx8j5frqayMkkirlgE9ORtN9MixgtqFwgwwEDk86Xj4-ESgq8Ggrug1AK2E1VLeqiYYirR1igi97t4AEF07WXXrSqdCXhL47eDjWtdKDt9YKd-fEcw5_rW1xFuc-rZ-Wvjc1z0nYmVLu3IA-VAN1dyOkLRZFEzVAc5kgLBWvl6HF_I" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
          <div className="absolute bottom-12 left-0 px-8">
            <h1 className="text-4xl md:text-6xl text-surface font-bold tracking-tight italic">Handcrafted Drinks</h1>
            <p className="text-surface/80 mt-2 max-w-xs font-body text-sm uppercase tracking-widest">The Art of the Slow Pour</p>
          </div>
        </section>

        {/* Hot Classics Section */}
        <section className="mt-12 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-primary">Hot Classics</h2>
            <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Espresso */}
            <div className="flex gap-4 group">
              <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                <img className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-500" alt="Espresso" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq61VomDNjEL1VLncM2k-BKjMTSzubgDee1rRmee4uskm61GjNWyqQQM7Szr1QzljP0dfywzkw_TXFLigKAAWoFxpHzJf9x8fWmbj_SEMRkN4NGvRYE2GzXKMS5UH1h6CQ4qnK0L52Z-hR3QukV3cRmzowx2HiEsdalhuXdqYkSgUvCU239yN1L3y6Y2iGHnTm-XcKAeaB-uMRBam-dcW5EqsqIpdcD3sAII0jxMm_IU3cMGwtt9NP3mmNItLK9XGcdmWM5BG4wJg4"/>
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-primary">Espresso</h3>
                    <span className="text-sm font-label font-bold text-secondary">45.000đ</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 italic leading-relaxed">Pure, intense essence of our signature roast. A concentrated ritual.</p>
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1 mt-2 hover:opacity-70">
                  Add to Order <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
            {/* Macchiato */}
            <div className="flex gap-4 group">
              <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                <img className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-500" alt="Macchiato" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD25USFB3rDizWwfuFgHy2tRGM9tMTB4GXjvD_DdFaJ_-CH5TkCQso4Mi6LqyeWkRM3T7l3YqOrRqpFI8hAl9zBlXNunyUPqB82aYvm3QJViK24IVkfYlRLdVa4odcGXwLVwbTnImblIbo6EiicqOdczMhlXF-7oay3DCYDi4gAsa9Mvf90umaujg6EYWM3sPrETPrZRFLe9Bunyi23ps2GAGniotU0YVX_utb4LjrewUaDKIBhE3uh6a24cu0ePGjLkL0dkHWAhJln"/>
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-primary">Macchiato</h3>
                    <span className="text-sm font-label font-bold text-secondary">50.000đ</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 italic leading-relaxed">Espresso marked with a cloud of silken micro-foam.</p>
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1 mt-2 hover:opacity-70">
                  Add to Order <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
            {/* Flat White */}
            <div className="flex gap-4 group">
              <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                <img className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-500" alt="Flat White" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM9ec0AAAmo7I-UHnFoUxl8_HURXpGo0haKJFSnP7vYU9qSWxjG5b5WcWw7JnwrXeq7FZ-kqKJUGdonq1jSUjuZCKF8lcFvs6OEmLjDfHlvxX14ExE1fDCfjSZUHk4iPw6BFrzaClR3Over53R-s5fAYzqFn3C4UIg6nc0AlbB-64fcYvatqjKzR5fJr1xO9bJS9YU_fYiIjk8B2YVh0GJD0_6wvvbF43Ic15j4PQ8h_-6-oX17TUtVoTnPQqaSNvfAyq4u4h_fmDi"/>
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-primary">Flat White</h3>
                    <span className="text-sm font-label font-bold text-secondary">60.000đ</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 italic leading-relaxed">Velvety micro-foam over a double shot of our Midnight Velvet blend.</p>
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1 mt-2 hover:opacity-70">
                  Add to Order <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
            {/* Latte */}
            <div className="flex gap-4 group">
              <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                <img className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-500" alt="Latte" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUPT7Zw18Cat-vGNULaVCJ69pyxVPvBw13pVd5-q33Occx5EzzHK_r7wfgYxFcJ1VrsD6E_ocptBER1MEx-GQMFPuoVxsouGcC8P3D8-c4cIOF_8iTNUMtZ22-DfFTgajC8lL7VzciC5Kuh7Shm829_NFIWTg7O-OE_Njom3dBo-NFumLfzIDCvbN3aW1zJVAKwCHrJj_MI_FFhP7vgqvXUkA-pLlq-45lEBZJg7_ZUror-gqU7aKqoAUyCRggGbJEcbYeXShB2g2N"/>
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-primary">Latte</h3>
                    <span className="text-sm font-label font-bold text-secondary">65.000đ</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 italic leading-relaxed">Smooth, comforting steamed milk swirled with rich espresso gold.</p>
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1 mt-2 hover:opacity-70">
                  Add to Order <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cold Alchemy Section */}
        <section className="mt-16 bg-surface-container py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-bold text-primary">Cold Alchemy</h2>
              <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Nitro Cold Brew */}
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/10 group">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Nitro Cold Brew" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUYyu0Ncp69b-1VPQtr3drOwIJ1T_U1xdkbd8qh53N2-Y0b4MRVgc5UZqDQZ2fL83-7UnYyQG-wfiT1U43O0zbhpNRTNWfd6KkbM2qpvRs1Co7z86hOPl-bMt1Ar8OtxzRbEEkr-Sptzi3L4oH7dnEqqCAmB0RPo4bi9tSUIMcuLqo-oZmblPKHP80Q7pyHtLj02ax7Jaa04QGJTDBnkD2MoniLQXTV1UOPbDQVO3YrqqufX5c00Dnu83dAB_-ytmxmONGOLZEWrOn"/>
                </div>
                <h3 className="text-lg font-bold text-primary">Nitro Cold Brew</h3>
                <p className="text-xs text-on-surface-variant mt-2 mb-4 leading-relaxed italic">Infused with nitrogen for a creamy, stout-like texture and naturally sweet finish.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-secondary">70.000đ</span>
                  <button className="bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider active:scale-95 transition-transform">
                    Add
                  </button>
                </div>
              </div>
              {/* Iced Vanilla Latte */}
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/10 group">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Iced Vanilla Latte" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAMrbgdBplghqVU8lIG56NI_43bIoZ45dW2pEhfVZ1Kf381_W5nBTOoR9O43fzux-FZi2cmC7dfIae1XAceQVIbo56D7oc7m7HKg_t13e1oC8zIc97R0bcXoeNMem1bnm9znIl5NXtBOGOW51_xHlZGhoX8mH3AYegDpwkShcwUTnlKlQmMSMwCpZK60MG9jMFnEyYqmYmAuV1o3oQmdtDHSe2YlJa3nGRqBCg9AfmGPHbB_RWMrMpYKSk6xZWRTKAglcUL8V-82Cv"/>
                </div>
                <h3 className="text-lg font-bold text-primary">Iced Vanilla Latte</h3>
                <p className="text-xs text-on-surface-variant mt-2 mb-4 leading-relaxed italic">House-made Madagascar vanilla bean syrup over ice and cold-pressed milk.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-secondary">75.000đ</span>
                  <button className="bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider active:scale-95 transition-transform">
                    Add
                  </button>
                </div>
              </div>
              {/* Mazagran */}
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/10 group">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mazagran" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCuaH1p2fVyWnaNVH56rkudnIVxmjq7z7VRzoLCZ-06e-cg7y7yJ5xnehOja8xZ4NmXEbH2-VgiaI0qlTx-dh7gsH_5zL9Vvh5NgMq7rVyQjPXp5VDFekgte8dRcacldLmbki9pwX136GiAmyf_kjgBCoBJMZIfUg-syHQhnidr3GEHs6NtxkwaEjCt8EtWhjYQrS1y3U2tiUtq1OSQd2pPQ2ArMP4IH6s0OcNRP6KnKcKKDy4dLN1XvE4iokXlxcMha_qmGyqajMH"/>
                </div>
                <h3 className="text-lg font-bold text-primary">Mazagran</h3>
                <p className="text-xs text-on-surface-variant mt-2 mb-4 leading-relaxed italic">The original iced coffee. Strong brew over ice with lemon and a touch of sweetness.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-secondary">80.000đ</span>
                  <button className="bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider active:scale-95 transition-transform">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Specialties */}
        <section className="mt-16 px-6 mb-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-primary">Seasonal Specialties</h2>
            <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-stone-900 text-stone-50 p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="z-10 flex-1">
              <span className="inline-block px-3 py-1 bg-stone-800 text-stone-200 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Limited Release</span>
              <h3 className="text-3xl font-bold mb-3 italic">Smoked Honey & Sage Latte</h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">Wildflower honey smoked over cedarwood, balanced with fresh sage-infused milk. A mystical forest journey in a cup.</p>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold">95.000đ</span>
                <button className="bg-stone-50 text-primary px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-[0.2em] shadow-lg active:scale-95 transition-all">
                  Brew This
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/3 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img className="w-full h-full object-cover" alt="Sage Latte" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1hZCjP321t4lxXK7P66UdbYPWleZihW_9ILIspil9bZnCywAV3Em_0MMgN1CzLWJgdyyb8MM2YjZDgtjkOFzreZAIC5C3E69ybWPNfg3Ifm3eNknhpI13BEv7VLkTec5i2tnEcmizWLDyGQVLOdVSa4wzrUlvQO0_soAtKxuLc7yfpWjXPMQvcoD5NtT7VcrmPdl4kdZYsmlW3KCJa27M2CK9lZa-5k2NB_9sFDOvk6FAv-M0j3q9nmYgbspjvBDZSGnne5OZsKKh"/>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#fef8f3]/90 backdrop-blur-md rounded-t-[1.5rem] border-t border-[#d4c3bf]/15 shadow-xl">
        <Link to="/handcrafted-drinks" className="flex flex-col items-center justify-center bg-primary-container text-surface rounded-xl px-4 py-1.5 transition-all">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_cafe</span>
          <span className="font-sans uppercase tracking-[0.1em] text-[10px] font-bold mt-0.5">Menu</span>
        </Link>
        <Link to="/shop" className="flex flex-col items-center justify-center text-primary-container opacity-60 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[20px]">grain</span>
          <span className="font-sans uppercase tracking-[0.1em] text-[10px] font-bold mt-0.5">Beans</span>
        </Link>
        <Link to="/brewing-gear" className="flex flex-col items-center justify-center text-primary-container opacity-60 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[20px]">coffee_maker</span>
          <span className="font-sans uppercase tracking-[0.1em] text-[10px] font-bold mt-0.5">Gear</span>
        </Link>
        <Link to="/brewing-guides" className="flex flex-col items-center justify-center text-primary-container opacity-60 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[20px]">auto_stories</span>
          <span className="font-sans uppercase tracking-[0.1em] text-[10px] font-bold mt-0.5">Journal</span>
        </Link>
      </nav>
    </div>
  );
};

export default HandcraftedDrinks;
