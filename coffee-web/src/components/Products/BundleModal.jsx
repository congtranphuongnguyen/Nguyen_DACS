import React from 'react';

const BundleModal = ({ isOpen, onClose, onAddFullSet }) => {
  if (!isOpen) return null;

  const bundleItems = [
    { name: "The Obsidian Grinder", qty: 1, originalPrice: 420 },
    { name: "Aureum Kettle", qty: 1, originalPrice: 185 },
    { name: "Prism Dripper", qty: 1, originalPrice: 78 },
    { name: "Terra Cups", qty: 2, originalPrice: 45 },
    { name: "Laboratory Filters", qty: 1, originalPrice: 0, isBonus: true }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-primary/40 backdrop-blur-md transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] animate-in zoom-in fade-in slide-in-from-bottom-10 duration-500">
        <div className="bg-primary p-12 text-on-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-24 translate-x-24 blur-3xl"></div>
            <button 
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
                <span className="material-symbols-outlined">close</span>
            </button>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">The Ritual Collection</span>
            <h2 className="text-4xl md:text-5xl font-headline italic mt-4">The Complete <br />Alchemist Set</h2>
        </div>

        <div className="p-12 space-y-10">
            <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40">Included Artifacts</h3>
                <div className="grid gap-4">
                    {bundleItems.map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-xs text-primary">{item.qty}</span>
                                <span className="font-medium text-primary">{item.name}</span>
                                {item.isBonus && <span className="text-[8px] bg-secondary text-on-secondary px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Bonus</span>}
                            </div>
                            <span className="font-headline text-primary opacity-60 text-sm italic">
                                {item.originalPrice > 0 ? `$${item.originalPrice}.00` : 'Complimentary'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-inner">
                <div>
                   <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2 underline underline-offset-4 decoration-secondary/30">Bundle Alchemy</span>
                   <div className="flex items-center gap-4">
                      <span className="text-primary/30 line-through text-lg font-light">$728.00</span>
                      <span className="text-4xl font-headline text-primary font-bold italic">$618.80</span>
                      <span className="bg-primary text-white text-[10px] px-3 py-1.5 rounded-full font-bold tracking-widest uppercase">Save 15%</span>
                   </div>
                </div>
                <button 
                    onClick={() => { onAddFullSet(); onClose(); }}
                    className="w-full md:w-auto px-10 py-5 bg-primary text-on-primary rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-stone-800 active:scale-95 transition-all cursor-pointer"
                >
                    Add Full Set to Laboratory
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BundleModal;
