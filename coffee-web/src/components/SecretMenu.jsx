import React, { useState, useEffect } from 'react';
import { api } from '../api';

const SecretMenu = ({ onAddClick }) => {
  const [secretProducts, setSecretProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const data = await api.getSecretProducts();
        setSecretProducts(data);
      } catch (err) {
        console.error("Failed to load secret menu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSecret();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-amber-500">
        <span className="material-symbols-outlined text-4xl animate-spin">cyclone</span>
        <p className="text-xs uppercase tracking-[0.2em] mt-3 font-bold">Unveiling Arcane Flavors...</p>
      </div>
    );
  }

  if (secretProducts.length === 0) return null;

  return (
    <section className="mt-16 p-8 bg-gradient-to-b from-stone-950 via-stone-900 to-black rounded-[3rem] border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.08)] relative overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Mystical background effects */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-500/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-500/5 blur-[120px] rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)] mb-4 animate-pulse">
            <span className="material-symbols-outlined text-white text-2xl">auto_awesome</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 tracking-tight italic">
            The Secret Menu
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent my-3"></div>
          <p className="text-[10px] md:text-xs text-amber-300/60 uppercase tracking-[0.3em] font-medium max-w-md leading-relaxed">
            Reserved exclusively for Alchemist Masters who have unlocked the deep secrets of coffee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secretProducts.map((drink) => {
            const productName = drink.productName || drink.name || '';
            const dbImage = drink.imageUrl || drink.imageURL || drink.ImageURL || drink.image;
            // Mysterious/premium default image if none specified
            const productImage = dbImage || "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop";

            return (
              <div 
                key={drink.productId || drink.id}
                className="bg-stone-900/50 hover:bg-stone-900/80 rounded-[2rem] p-6 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-500 flex gap-6 shadow-xl relative overflow-hidden group"
              >
                {/* Glow on hover */}
                <div className="absolute -inset-px bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 rounded-[2rem] blur-sm transition-opacity duration-500 pointer-events-none"></div>

                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-amber-500/20 shadow-inner relative">
                  <img 
                    src={productImage} 
                    alt={productName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent"></div>
                </div>

                <div className="flex flex-col justify-between flex-grow relative z-10">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-headline font-bold text-amber-100 group-hover:text-yellow-400 transition-colors">
                        {productName}
                      </h3>
                      <span className="text-xs font-bold text-amber-400 whitespace-nowrap bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        {new Intl.NumberFormat('vi-VN').format(drink.price)}đ
                      </span>
                    </div>
                    <p className="text-xs text-stone-400/90 italic leading-relaxed mt-2 font-light line-clamp-2">
                      {drink.description || 'Hương vị tuyệt hảo chứa đựng bí thuật rang xay của Alchemist.'}
                    </p>
                  </div>

                  <button
                    onClick={() => onAddClick({
                      ...drink,
                      id: drink.productId || drink.id,
                      imageURL: productImage,
                      name: productName,
                      isSecret: true
                    })}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 group-hover:text-yellow-300 flex items-center gap-2 mt-4 hover:gap-3 transition-all cursor-pointer w-fit"
                  >
                    Add to Order
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecretMenu;
