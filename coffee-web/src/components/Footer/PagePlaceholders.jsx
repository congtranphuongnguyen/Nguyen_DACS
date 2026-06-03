import React from 'react';
import { Link } from 'react-router-dom';

const PageHero = ({ title, subtitle }) => (
  <div className="py-24 border-b border-stone-100 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
    <h1 className="text-6xl font-headline font-bold text-stone-800 mb-6 tracking-tighter">{title}</h1>
    <p className="text-xl text-stone-500 max-w-2xl leading-relaxed italic">"{subtitle}"</p>
    <Link to="/shop" className="inline-block mt-8 text-stone-800 font-bold border-b-2 border-stone-800 pb-1 hover:text-stone-500 hover:border-stone-200 transition-all uppercase tracking-widest text-xs">
      Explore the shop
    </Link>
  </div>
);

export const FAQs = () => (
  <div className="max-w-4xl mx-auto px-6">
    <PageHero title="FAQs" subtitle="Common inquiries regarding the ritual." />
    <div className="space-y-8 pb-24">
      {[1, 2, 3].map(i => (
        <div key={i} className="border-b border-stone-100 pb-8">
          <h3 className="font-headline text-2xl font-bold text-stone-800 mb-4">How do you ensure peak freshness?</h3>
          <p className="text-stone-500 leading-relaxed font-light">We roast every order in small batches within 48 hours of dispatch. Our oxygen-barrier bags ensure the aromatics remain trapped until you break the seal.</p>
        </div>
      ))}
    </div>
  </div>
);

export const Shipping = () => (
  <div className="max-w-4xl mx-auto px-6">
    <PageHero title="Shipping & Logistics" subtitle="Directly from the roastery to your doorstep." />
    <div className="space-y-12 pb-24 text-stone-600 leading-relaxed font-light text-lg">
      <p>We leverage carbon-neutral logistics to ensure your sensory provisions arrive in pristine condition, regardless of terrain.</p>
      <ul className="list-disc pl-6 space-y-4">
        <li>Domestic: 2-3 Business Days</li>
        <li>International: 5-8 Business Days</li>
      </ul>
    </div>
  </div>
);

export const Contact = () => (
  <div className="max-w-4xl mx-auto px-6">
    <PageHero title="Contact Us" subtitle="Connect with our master roasters." />
    <div className="pb-24 max-w-xl">
      <form className="space-y-8" onSubmit={e => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Email Ceremony</label>
          <input className="w-full bg-white border border-stone-200 rounded-lg px-6 py-4 outline-none focus:ring-1 focus:ring-stone-800" placeholder="your@email.com" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Inquiry</label>
          <textarea className="w-full bg-white border border-stone-200 rounded-lg px-6 py-4 outline-none focus:ring-1 focus:ring-stone-800 h-32" placeholder="Tell us about your ritual..."></textarea>
        </div>
        <button className="bg-stone-800 text-white px-12 py-5 rounded-lg font-bold text-sm tracking-widest hover:bg-stone-700 transition-all uppercase">
          INITIATE CONTACT
        </button>
      </form>
    </div>
  </div>
);

export const UnderConstruction = ({ title }) => (
  <div className="max-w-4xl mx-auto px-6">
    <PageHero title={title} subtitle="This ritual is still being perfected." />
    <div className="py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-300">
        <span className="material-symbols-outlined text-4xl">construction</span>
      </div>
      <p className="text-stone-500 font-light italic_font italic">Our master roasters are currently documenting this section. Check back soon for the full experience.</p>
    </div>
  </div>
);

export const Subscriptions = () => (
  <div className="max-w-4xl mx-auto px-6">
    <PageHero title="Subscriptions" subtitle="Never interrupt your daily sanctuary." />
    <div className="pb-24">
      <div className="p-12 bg-stone-900 text-white rounded-[32px] text-center space-y-8 shadow-2xl">
        <h2 className="text-4xl font-headline font-bold">The Roastery Circle</h2>
        <p className="text-stone-400 max-w-md mx-auto leading-relaxed font-light">Receive a curated rotation of single-origin beans every month, selected by our head roaster.</p>
        <button className="bg-stone-50 text-stone-900 px-12 py-5 rounded-lg font-bold text-xs tracking-widest hover:bg-white transition-all uppercase">
          JOIN THE CIRCLE
        </button>
      </div>
    </div>
  </div>
);
