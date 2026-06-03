import React from 'react';

const Contact = () => {
  return (
    <div className="animate-in fade-in duration-700 w-full overflow-x-hidden pt-12 bg-surface text-on-surface font-body">
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="font-label text-sm uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">Connect With Us</span>
              <h2 className="font-headline text-5xl md:text-7xl text-primary leading-tight mb-8 font-bold italic">Let's start a <br /><span className="italic text-primary-container">conversation.</span></h2>
              <p className="text-on-surface-variant max-w-md text-lg leading-relaxed font-light">Whether you're a curious enthusiast or a fellow roaster, our doors—and our ears—are always open. Visit our sanctuary or drop us a line below.</p>
            </div>
            <div className="hidden lg:block relative group h-[300px] overflow-hidden rounded-3xl shadow-2xl">
              <img 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmwkt2bsWSipxVTFbcoOYDmI4WR4ExrqP7N-NNbHEcNGVNy8i6mEJpraIfaP8YjfUM_0JJsmnLIzgWfZPkGbME5SSp9BK-r8MepIuhPBLJg7jy_T3rEttFeQiJCHoiS2PqOyQRlpcoETlSzQD7JOCB96LTEQVk_5s6lPFRX8vnW4neh2EDTNm3zwVT-_0bkqq-hIdNEwGGYBylRMbcLMqV-Q1OjPB7totVtRPAgTayl1TCZnj4CSqFWosqQgj8zvd4B05tDOkCM4MS" 
                alt="Coffee cup"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Bento Grid Contact Methods */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Form Card (Takes up 2 columns on medium+) */}
          <div className="md:col-span-2 bg-surface-container rounded-[2.5rem] p-8 lg:p-14 border border-stone-100 shadow-sm">
            <h3 className="font-headline text-3xl text-primary mb-10 italic">Send a Message</h3>
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-label text-[10px] uppercase tracking-widest text-stone-500 ml-4 font-bold">Full Name</label>
                  <input 
                    className="w-full bg-white border border-stone-100 focus:ring-2 focus:ring-primary-container rounded-2xl p-4 text-on-surface placeholder:text-outline-variant font-medium shadow-inner outline-none transition-all" 
                    placeholder="Elias Thorne" 
                    type="text" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-label text-[10px] uppercase tracking-widest text-stone-500 ml-4 font-bold">Email Address</label>
                  <input 
                    className="w-full bg-white border border-stone-100 focus:ring-2 focus:ring-primary-container rounded-2xl p-4 text-on-surface placeholder:text-outline-variant font-medium shadow-inner outline-none transition-all" 
                    placeholder="elias@example.com" 
                    type="email" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="font-label text-[10px] uppercase tracking-widest text-stone-500 ml-4 font-bold">Message</label>
                <textarea 
                  className="w-full bg-white border border-stone-100 focus:ring-2 focus:ring-primary-container rounded-2xl p-4 text-on-surface placeholder:text-outline-variant font-medium resize-none shadow-inner outline-none transition-all" 
                  placeholder="How can we help you brew today?" 
                  rows="5"
                ></textarea>
              </div>
              <button 
                type="button"
                className="bg-primary hover:bg-stone-800 text-on-primary w-full md:w-auto px-12 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl active:scale-95"
              >
                <span className="uppercase text-xs tracking-widest">Send Message</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">send</span>
              </button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="flex flex-col gap-8">
            {/* Location */}
            <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-sm flex flex-col justify-between h-full group transition-all hover:shadow-xl hover:scale-[1.02]">
              <div>
                <div className="w-14 h-14 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container mb-8 group-hover:rotate-6 transition-transform shadow-lg">
                  <span className="material-symbols-outlined text-2xl">location_on</span>
                </div>
                <h4 className="font-headline text-2xl text-primary mb-4 italic">The Roastery</h4>
                <p className="text-on-surface-variant font-medium leading-relaxed">128 Artisan Way<br />Portland, OR 97201</p>
              </div>
              <button className="text-secondary font-bold text-[10px] uppercase tracking-[0.2em] mt-10 flex items-center gap-3 hover:gap-5 transition-all text-left group">
                Get Directions 
                <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </button>
            </div>

            {/* Digital Reach */}
            <div className="bg-primary text-on-primary rounded-[2.5rem] p-10 flex flex-col justify-between h-full group shadow-2xl transition-all hover:scale-[1.02]">
              <div>
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                  <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>contact_support</span>
                </div>
                <h4 className="font-headline text-2xl mb-6 italic text-white">Direct Reach</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group/item cursor-pointer">
                    <span className="material-symbols-outlined text-stone-400 group-hover/item:text-white transition-colors">mail</span>
                    <span className="font-body text-sm font-semibold tracking-tight">hello@terrabrew.com</span>
                  </div>
                  <div className="flex items-center gap-4 group/item cursor-pointer">
                    <span className="material-symbols-outlined text-stone-400 group-hover/item:text-white transition-colors">call</span>
                    <span className="font-body text-sm font-semibold tracking-tight">+1 (503) 555-0128</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer border border-white/5">
                  <span className="material-symbols-outlined text-base">nest_audio</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer border border-white/5">
                  <span className="material-symbols-outlined text-base">camera</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full h-[500px] relative rounded-[3rem] overflow-hidden mb-20 shadow-2xl border border-stone-100">
          <div className="absolute inset-0 bg-[#f2ede8] flex items-center justify-center">
            {/* Placeholder for actual map */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply transition-all duration-700 hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQoOucZT39AuqT5TBteM8EpmDpwsEjNO9t6MCp39miSr_BRovVPs3cUn6B4D4oQc56l4SIDmFJW9EQyjb54BCx69MZrAplVDM5tUrbEEtjeIf72uZy6cL_si0KD1OjjMLtIK6NnvqFK9rAxZrXHL7IEhD4xMRQJzVKO__MOme6mYg-E3wwxJ3mb1e4iwlabUimY__YakWwvZNizFfDeS0-fCTZDC4luhAWGAg8m9W5YaYSIJh4W-54fhnfRVfV2U_L-uoApnvPkxxr')" }}
            ></div>
            {/* Map Marker Overlay */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(54,31,26,0.3)] animate-bounce border-4 border-white">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
              <div className="mt-6 bg-white px-8 py-3 rounded-2xl shadow-2xl border border-outline-variant/20 transform -translate-y-2">
                <span className="font-headline text-primary font-bold italic text-lg tracking-tight">Terra Brew HQ</span>
              </div>
            </div>
          </div>
          {/* Glassmorphic Hours Card */}
          <div className="absolute bottom-10 left-10 md:w-96 backdrop-blur-xl bg-white/70 p-10 rounded-[2.5rem] border border-white/30 shadow-2xl hidden md:block">
            <h4 className="font-headline text-2xl text-primary mb-8 italic">Slow Brew Hours</h4>
            <div className="space-y-4 font-body text-sm font-medium text-on-surface-variant">
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="opacity-60 underline decoration-secondary/30 decoration-2 underline-offset-4">Mon — Fri</span>
                <span className="text-primary font-bold">07:00 - 18:00</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="opacity-60 underline decoration-secondary/30 decoration-2 underline-offset-4">Saturday</span>
                <span className="text-primary font-bold">08:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60 underline decoration-secondary/30 decoration-2 underline-offset-4">Sunday</span>
                <span className="text-primary font-bold">09:00 - 16:00</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
