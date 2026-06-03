import React from 'react';

const BrewingGuides = () => {
  return (
    <div className="animate-in fade-in duration-700 w-full overflow-x-hidden pt-24 bg-surface text-on-surface font-body">
      {/* Hero Section: The Art of the Pour */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover animate-subtle-zoom" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOAi23GhXCFs_gAeiaAQ8gWIaEaQRe4XBGX_lFjnFPHjEYIu9aSVjE3ZuJtH5w8-O2Pp2n770bvwLwnCwgfYHuKB7P2ZaLWVJ0YkRw0gBjLWJM3vDu49qjxUrgTTk33JC9quE0EXEcDJv0S73_TgoQj3-hvZxkejhgiu9Df9P3NUS5NSJqpsqGq38hA6GTf2c9Chs8fbtiqC2jRZDA_pzduSqtFcTaUgqUTYyYvF6U9soLf3qwwieajWlSlyFhSb_vpDj6VLbSWbw" 
            alt="Cinematic close-up of dark roasted coffee being poured"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <span className="font-label text-sm uppercase tracking-[0.3em] text-surface mb-4 block">The Ritual</span>
            <h1 className="font-headline text-5xl md:text-8xl text-surface leading-tight mb-8 tracking-tighter">
              The Art <br/>of the Pour
            </h1>
            <p className="font-body text-lg md:text-xl text-surface/80 max-w-xl leading-relaxed font-light">
              Mastering the extraction is a journey of sensory precision. From the initial bloom to the final draw down, every second shapes the soul of your cup.
            </p>
          </div>
        </div>
      </section>

      {/* Method Cards Grid */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/30 pb-12">
            <div className="max-w-xl">
              <h2 className="font-headline text-4xl text-primary mb-4 font-bold tracking-tight">Brewing Methods</h2>
              <p className="font-body text-secondary max-w-md italic font-light">Select your preferred vessel and discover the technical nuances that define its unique flavor profile.</p>
            </div>
            <span className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">Comprehensive Manual</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'm1', name: 'Hario V60', label: 'Clarity & Brightness', time: '3:00 min', ratio: '1:16', grind: 'Medium-Fine', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvrLywm88ULvRJ-8T6VZGDvAxJLXIwg2QImHPvBl8Am0beCXhK_i6m7tRaOFXo65g6kOMC4HL9TSLVicLJCGBNLZRkT8V65xZcnBIvqnpXJBqWlZzGLr2L6uszOnD8n8jXITBK5RxDxi6v6-BYpOz7yFuRdzZQUuSsb2Y2HWHAlzulsplsGKoQkcmiDpMOnYGZzn1TuAfUGRseojJmjLqLCxEo2GmI2fgyijYDWkJXgURt11-eT7cUfQYWBPrJMKTrifqHLAu2hXw' },
              { id: 'm2', name: 'Chemex', label: 'Clean & Elegant', time: '4:30 min', ratio: '1:15', grind: 'Medium-Coarse', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkF0b4rJtYY1bS5vGVqOC85h7RabXhlY1LSrRxWuJsiJJcITY10U288UscKqfarJX16hjSktbyD4McAukTnUTaqfBoctHabn7m1twCFLZXiOgU4DSGCeOgRptyak15IbvZ5HnRzX-ay3koI7243mep2gQP30uuqUtb-eFsmqVrYa7q_P0tK8wkEDIFnhF7JZpQyrhJ_o3AF6qykz9xEqrs6oxXneHmyALV9-UnhzMlptzn2GHqTspMk7pg7fXOS3xnhfBxrWxL21w' },
              { id: 'm3', name: 'French Press', label: 'Full Body & Rich', time: '4:00 min', ratio: '1:12', grind: 'Coarse', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVm1_7GEr5wYYyH6WTIg_mT1bjaoRwqSDqxAlC9WHkBVBrdZO5ESq-5p-haOPV5qMaQBu2pDw5jow6uX7IqbTRh9-NFBSY-_NUz8eLEXuTOU9kWwhnAHqQg0i5hA_7ju3cK8_NYmjJ3L11lYgl5hmi-vD-VVSc3rs-DAljXcr2z5OtGTXTafshn_GEOaMfqKC3vpdNtg0_-vSmFlMF1TotZnu2oXw2z7n2MXd90mQ5ilWjX-prFwGdDp30WRPNbKgXJ6nqbvTMBFo' },
              { id: 'm4', name: 'Aeropress', label: 'Versatile & Bold', time: '2:00 min', ratio: '1:13', grind: 'Fine-Medium', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCBM3hlD_9EC8W13y_blNPdNKVyoim0HbtGjwnbtBrC-9GxbFa8Mh1iRUwhUBKeBqZWn2_LJYxYIBHz94msmxLp_HhRqEGoBzHG9-W2w8RRyNGQ3C-PKZMkXSxqzSfY_YAMmsm37j66KVeYcymLWYFnlbo6unE8JHBPZdch3x5fEhPOwy0tkDhOhxz44CkG12Z-QINFpu7I26IAVl6MT2uE_FUa-_QIYoQHdfNht8e1PopjCmcOPofS3lrD08vzTsqzfZFFNcy-wI' },
            ].map((method) => (
              <div key={method.id} className="bg-surface-container overflow-hidden rounded-2xl group transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl border border-outline-variant/10">
                <div className="aspect-[4/5] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={method.image} alt={method.name} />
                </div>
                <div className="p-8">
                  <h3 className="font-headline text-2xl text-primary mb-2 font-bold tracking-tight uppercase">{method.name}</h3>
                  <p className="font-label text-[10px] text-secondary font-bold uppercase tracking-widest mb-6">{method.label}</p>
                  <div className="space-y-4 border-t border-outline-variant/30 pt-6">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-secondary">
                      <span>Time</span>
                      <span className="text-primary">{method.time}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-secondary">
                      <span>Ratio</span>
                      <span className="text-primary">{method.ratio}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-secondary">
                      <span>Grind</span>
                      <span className="text-primary">{method.grind}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guide: Perfect V60 */}
      <section className="py-32 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Sticky Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
            <div className="relative group">
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary opacity-10 rounded-full blur-[80px] -z-10 transition-transform group-hover:scale-125 duration-1000"></div>
              <img className="w-full h-[550px] object-cover rounded-2xl shadow-2xl relative z-10 border border-outline-variant/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbV8eJx0aCe-rtGcaT14xEUAaAeJCR_2808JIRRRW8Ll0HSFRY24q0byGPlERefovYGujxPRe2i6-lzm9v2pz3pNyGv0Qe-uvr_0aHsQIQ_ioNmvd7C7yxs1d8HD27iaD2iwJdhvHnDimj2EAGLEwY2CpQl-zSe9SkJs7xzUWg4ojxXHfQ1dtIQA98p6VeOqWJz1Xle2nRzvpd3HaubtWfnwn_kdivMi7ROzpMT9D2b9EiDtVy5JPt0GWjOKM-utvHVz2k9sO4qXM" alt="Perfect V60 Pour" />
            </div>
            <div className="bg-surface-container p-10 rounded-3xl border border-outline-variant/10 space-y-8">
              <h4 className="font-headline text-2xl text-primary font-bold tracking-tight">Equipment Required</h4>
              <ul className="space-y-4 font-body text-secondary font-light">
                <li className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Hario V60 02 Dripper
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Paper Filter (Oxygen Bleached)
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Gooseneck Kettle
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Digital Scale with Timer
                </li>
              </ul>
              <button className="w-full py-5 bg-primary text-on-primary font-label text-[10px] uppercase font-bold tracking-[0.2em] rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl">
                Shop Equipment
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Column: Steps */}
          <div className="lg:col-span-7 lg:pl-12">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">In-Depth Guide</span>
            <h2 className="font-headline text-5xl md:text-7xl text-primary mb-16 font-bold tracking-tighter leading-tight">The Perfect V60</h2>
            <div className="space-y-24 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-px before:bg-outline-variant/30">
              {[
                { step: 1, title: 'The Bloom', desc: 'Pour 40g of water (twice the weight of your grounds) and wait 30 seconds. This releases trapped CO2, allowing the water to fully penetrate the beans.', time: '0:00 - 0:30' },
                { step: 2, title: 'The First Pour', desc: 'Using a slow, spiral motion from the center outward, pour up to 160g. Avoid pouring directly onto the filter paper. Gentle motion is key.', time: '0:30 - 1:15' },
                { step: 3, title: 'The Final Stretch', desc: 'Pour the remaining water until you reach a total of 300g. Give the dripper a very gentle swirl to flatten the coffee bed.', time: '1:15 - 3:00' },
              ].map((item) => (
                <div key={item.step} className="relative pl-16 group">
                  <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline text-sm shadow-xl z-20 group-hover:scale-110 transition-transform">{item.step}</div>
                  <h3 className="font-headline text-3xl text-primary mb-4 font-bold tracking-tight italic">{item.title}</h3>
                  <p className="font-body text-lg text-secondary leading-relaxed mb-8 font-light">{item.desc}</p>
                  <div className="inline-flex items-center px-5 py-2.5 bg-surface-container-low rounded-full gap-3 border border-outline-variant/30">
                    <span className="material-symbols-outlined text-sm text-secondary">timer</span>
                    <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24 flex flex-col sm:flex-row gap-6">
              <button className="px-10 py-5 bg-primary text-on-primary font-label text-[10px] uppercase font-bold tracking-[0.2em] rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl">
                <span className="material-symbols-outlined text-sm">play_circle</span>
                Watch Masterclass
              </button>
              <button className="px-10 py-5 border border-outline-variant text-primary font-label text-[10px] uppercase font-bold tracking-[0.2em] rounded-xl hover:bg-surface-container-low transition-all flex items-center justify-center gap-3">
                Download PDF
                <span className="material-symbols-outlined text-sm">download</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sensory Accent Section */}
      <section className="py-32 bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: 'thermometer', title: 'Precise Heat', desc: 'We recommend 92°C - 96°C for light roasts to extract the complex acidity without bitterness.' },
            { icon: 'eco', title: 'Ethical Choice', desc: 'Every bean in our guides is sourced via direct trade, ensuring a sustainable future.', featured: true },
            { icon: 'science', title: 'Ideal Ratio', desc: "Finding your 'Sweet Spot' starts at 1:15 and adjusts based on origin and density." },
          ].map((item, idx) => (
            <div key={idx} className={`${item.featured ? 'bg-primary text-on-primary shadow-2xl scale-105' : 'bg-surface-container text-on-surface border border-outline-variant/10'} p-12 rounded-3xl text-center shadow-sm hover:shadow-xl transition-all duration-500`}>
              <span className={`material-symbols-outlined text-4xl mb-8 ${item.featured ? 'text-surface/50' : 'text-secondary/40'}`}>{item.icon}</span>
              <h4 className="font-headline text-2xl mb-4 font-bold tracking-tight">{item.title}</h4>
              <p className={`font-body font-light text-sm leading-relaxed ${item.featured ? 'text-surface/80' : 'text-secondary'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BrewingGuides;
