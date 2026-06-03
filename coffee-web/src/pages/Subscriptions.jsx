import React from 'react';
import { useCart } from '../context/CartContext';

const Subscriptions = () => {
  const { addToCart } = useCart();

  const handleSubscribe = (name, price, tagline) => {
    addToCart({
      id: `sub-${name.toLowerCase().replace(/\s+/g, '-')}`,
      name: name,
      price: price.toString(),
      label: "Subscription Plan",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFtYgbuZ-gu-wUMMVnr8QQoScWLZGisbf4p82YDQYdBD0tlBCu5CzKsbkExeiJkIcxhwFDLrwqK93oTc1EykODZI6-QVM-HSaudDvHnjQPG5sVMFimaBD9EyfIJdotWcuMy8Jx1b57038ywCu0NMmlvRYBscVAjXJoHhKYmtb3JHy3-6jEi3-q83WkiGUTC0jKtQ1VP9GBx__hLqniOyUrO1tmUeuWD6gF-9Qjx5wEbvZxkrYEmQUqkSgza7z9DhuIhslXQlVGGx6b",
      description: tagline
    });
  };

  return (
    <div className="animate-in fade-in duration-700 w-full overflow-x-hidden pt-12 bg-surface text-on-surface font-body">
      <main className="pb-32">
        {/* Hero Section */}
        <section className="relative px-6 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Added darker overlay for better contrast */}
            <div className="absolute inset-0 bg-stone-900/30 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10"></div>
            <img 
              alt="Coffee Steam" 
              className="w-full h-full object-cover opacity-40 filter grayscale" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFtYgbuZ-gu-wUMMVnr8QQoScWLZGisbf4p82YDQYdBD0tlBCu5CzKsbkExeiJkIcxhwFDLrwqK93oTc1EykODZI6-QVM-HSaudDvHnjQPG5sVMFimaBD9EyfIJdotWcuMy8Jx1b57038ywCu0NMmlvRYBscVAjXJoHhKYmtb3JHy3-6jEi3-q83WkiGUTC0jKtQ1VP9GBx__hLqniOyUrO1tmUeuWD6gF-9Qjx5wEbvZxkrYEmQUqkSgza7z9DhuIhslXQlVGGx6b" 
            />
          </div>
          <div className="relative z-20 max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-secondary-container text-on-secondary-container rounded-full">The Art of Continuity</span>
            <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight font-headline">Elevate Your Morning <br />Ritual, Monthly.</h2>
            <p className="text-primary/90 text-lg md:text-xl max-w-2xl mx-auto font-body font-light drop-shadow-sm">Experience the world's most exceptional beans delivered to your doorstep. Flexible, curated, and designed for the true coffee enthusiast.</p>
          </div>
        </section>

        {/* Key Benefits Bento */}
        <section className="px-6 mb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-secondary text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h3 className="text-xl font-bold mb-3 text-primary">Curated Selection</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light">Each month, our master roasters hand-pick rare microlots and seasonal gems specifically for our members.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-secondary text-3xl mb-4">priority_high</span>
              <h3 className="text-xl font-bold mb-3 text-primary">Early Access</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light">Be the first to taste limited releases and exclusive single-origin beans before they hit the general store.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-secondary text-3xl mb-4">local_shipping</span>
              <h3 className="text-xl font-bold mb-3 text-primary">Free Shipping</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light">Enjoy complimentary premium shipping on every subscription order, handled with care from our roastery to your cup.</p>
            </div>
          </div>
        </section>

        {/* Subscription Tiers */}
        <section className="px-6 mb-24 max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-headline font-bold text-primary">Choose Your Journey</h2>
            <p className="text-on-surface-variant mt-4 font-light">Simple plans for every coffee lover.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Tier 1: The Explorer */}
            <div className="bg-surface-container-lowest p-10 rounded-3xl flex flex-col transition-all duration-500 hover:shadow-2xl border border-outline-variant/15 group">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">The Explorer</h3>
                <p className="text-on-surface-variant text-sm mb-8 font-light italic">Perfect for the curious palate</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-headline font-bold text-primary">50.000đ</span>
                  <span className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">/ month</span>
                </div>
              </div>
              <ul className="space-y-6 mb-12 flex-grow">
                <li className="flex items-start gap-4 text-sm font-light text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>1x 250g bag of seasonal blend</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-light text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>Detailed tasting notes card</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-light text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>Standard brewing guides</span>
                </li>
              </ul>
              <button 
                onClick={() => handleSubscribe("The Explorer", 50000, "Perfect for the curious palate")}
                className="w-full py-4 bg-surface-container text-primary font-bold rounded-xl hover:bg-stone-200 hover:scale-105 transition-all active:scale-95 uppercase text-[10px] tracking-widest shadow-sm"
              >
                Start Exploring
              </button>
            </div>

            {/* Tier 2: The Daily Ritual (Featured) */}
            <div className="bg-primary text-on-primary p-10 rounded-3xl flex flex-col relative overflow-hidden shadow-2xl scale-105 z-10 group">
              <div className="absolute top-6 right-6 px-4 py-1.5 bg-secondary text-on-secondary text-[10px] uppercase tracking-[0.2em] font-bold rounded-full shadow-lg">Most Loved</div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">The Daily Ritual</h3>
                <p className="text-on-primary/70 text-sm mb-8 font-light italic">Our most popular monthly essential</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-headline font-bold">85.000đ</span>
                  <span className="text-on-primary/70 text-xs uppercase tracking-widest font-bold">/ month</span>
                </div>
              </div>
              <ul className="space-y-6 mb-12 flex-grow">
                <li className="flex items-start gap-4 text-sm font-light">
                  <span className="material-symbols-outlined text-secondary-fixed text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>2x 250g bags (1 Blend, 1 Origin)</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-light">
                  <span className="material-symbols-outlined text-secondary-fixed text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>15% off additional shop orders</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-light">
                  <span className="material-symbols-outlined text-secondary-fixed text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>Exclusive video masterclasses</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-light">
                  <span className="material-symbols-outlined text-secondary-fixed text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>Free priority shipping</span>
                </li>
              </ul>
              <button 
                onClick={() => handleSubscribe("The Daily Ritual", 85000, "Our most popular monthly essential")}
                className="w-full py-4 bg-secondary text-on-secondary font-bold rounded-xl hover:brightness-110 hover:scale-105 transition-all shadow-xl active:scale-95 uppercase text-[10px] tracking-widest"
              >
                Subscribe Now
              </button>
            </div>

            {/* Tier 3: The Connoisseur */}
            <div className="bg-surface-container-lowest p-10 rounded-3xl flex flex-col transition-all duration-500 hover:shadow-2xl border border-outline-variant/15 group">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">The Connoisseur</h3>
                <p className="text-on-surface-variant text-sm mb-8 font-light italic">For the uncompromising aficionado</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-headline font-bold text-primary">180.000đ</span>
                  <span className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">/ month</span>
                </div>
              </div>
              <ul className="space-y-6 mb-12 flex-grow">
                <li className="flex items-start gap-4 text-sm font-light text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>3x Rare microlot & limited release bags</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-light text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>Quarterly gift from our gear collection</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-light text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>Direct access to our head roaster</span>
                </li>
              </ul>
              <button 
                onClick={() => handleSubscribe("The Connoisseur", 180000, "For the uncompromising aficionado")}
                className="w-full py-4 bg-surface-container text-primary font-bold rounded-xl hover:bg-stone-200 hover:scale-105 transition-all active:scale-95 uppercase text-[10px] tracking-widest shadow-sm"
              >
                Join Elite Tier
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-24 bg-surface-container-low rounded-[3rem] mx-6 max-w-7xl lg:mx-auto border border-stone-100 shadow-inner">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-headline font-bold text-primary text-center mb-20 leading-tight">Simplified Continuity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-outline-variant/30 z-0"></div>
              
              <div className="relative z-10 text-center space-y-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg border border-outline-variant/10 transition-transform hover:scale-110">
                  <span className="text-3xl font-serif font-bold text-primary">01</span>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-primary uppercase text-xs tracking-widest">Pick Your Plan</h4>
                  <p className="text-on-surface-variant text-sm font-light leading-relaxed">Select the tier that best matches your daily coffee intake and curiosity.</p>
                </div>
              </div>

              <div className="relative z-10 text-center space-y-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg border border-outline-variant/10 transition-transform hover:scale-110">
                  <span className="text-3xl font-serif font-bold text-primary">02</span>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-primary uppercase text-xs tracking-widest">Fresh Roasting</h4>
                  <p className="text-on-surface-variant text-sm font-light leading-relaxed">We roast your selection to order at our central workshop on the 1st of every month.</p>
                </div>
              </div>

              <div className="relative z-10 text-center space-y-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg border border-outline-variant/10 transition-transform hover:scale-110">
                  <span className="text-3xl font-serif font-bold text-primary">03</span>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-primary uppercase text-xs tracking-widest">Savor the Steam</h4>
                  <p className="text-on-surface-variant text-sm font-light leading-relaxed">Arriving within 3 days of roasting, guaranteed fresh and ready for your favorite brew method.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote / Brand Moment */}
        <section className="px-6 py-32 text-center max-w-4xl mx-auto">
          <blockquote className="space-y-10">
            <p className="text-3xl md:text-5xl font-headline italic text-primary leading-tight font-light tracking-tight">
              "Coffee is a language in itself. Our subscription is the conversation we have with our most dedicated drinkers."
            </p>
            <cite className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] not-italic block">— Elias Thorne, Master Roaster</cite>
          </blockquote>
        </section>
      </main>
    </div>
  );
};

export default Subscriptions;
