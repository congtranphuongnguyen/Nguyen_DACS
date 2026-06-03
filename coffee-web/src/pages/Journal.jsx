import React from 'react';
import { useUI } from '../context/UIContext';
import { Link } from 'react-router-dom';

const Journal = () => {
  const { journal } = useUI();

  return (
    <div className="animate-in fade-in duration-700 w-full min-h-screen pt-32 bg-surface text-on-surface font-body pb-32">
      <main className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-4 block italic">Chronicles of Taste</span>
          <h1 className="text-6xl md:text-8xl font-headline font-bold text-primary tracking-tighter italic leading-tight">Your Coffee Journal</h1>
          <p className="mt-8 text-on-surface-variant font-light text-lg leading-relaxed">
            Every cup is a memory. Here, you'll find the narrative of your journey through the world's finest harvests and handcrafted alchemy.
          </p>
        </header>

        {journal.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {journal.map((item, index) => (
              <div key={index} className="bg-white dark:bg-stone-800/40 rounded-[2.5rem] p-10 border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-2xl transition-all group">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-8 shadow-inner">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-headline font-bold text-primary dark:text-stone-100 italic">{item.name}</h3>
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-sm ${i < item.rating ? 'fill-mode-both' : ''}`} style={{ fontVariationSettings: i < item.rating ? "'FILL' 1" : "'FILL' 0" }}>
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant dark:text-stone-400 italic font-light leading-relaxed">
                    "{item.category || 'Specialty Brew'} - A remarkable experience with notes of clarity and depth."
                  </p>
                  <div className="pt-8 border-t border-stone-100 dark:border-stone-700 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Status: Mastered</span>
                    <button className="text-primary dark:text-stone-300 hover:gap-2 transition-all flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                      Brew Again <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-stone-50 dark:bg-stone-800/20 rounded-[4rem] border border-stone-100 dark:border-stone-700">
            <span className="material-symbols-outlined text-9xl text-stone-200 dark:text-stone-700 mb-10">auto_stories</span>
            <h2 className="text-4xl font-headline font-bold text-stone-400 italic">Your pages are currently empty</h2>
            <p className="mt-6 text-stone-500 max-w-sm mx-auto font-light leading-relaxed">
              Begin your tasting ritual by exploring our menu and saving your favorites to your personal gallery.
            </p>
            <Link 
              to="/menu" 
              className="mt-12 inline-block px-12 py-5 bg-primary text-white rounded-3xl font-bold uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-stone-800 transition-all active:scale-95"
            >
              Start Your Journey
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Journal;
