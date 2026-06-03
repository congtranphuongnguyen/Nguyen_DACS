import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../products';

const methodData = {
  'hario-v60': {
    name: "Hario V60",
    description: "The V60's 60-degree angle and spiral ribs allow for a clean, nuanced extraction that highlights delicate floral and fruit notes. Perfect for the discerning palate.",
    time: "3:00 MIN",
    roast: "LIGHT ROAST",
    tag: "PRECISION",
    ratio: "1:15",
    grind: "Medium-Fine",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgYaJ2CU2AvKvIsRkFuIsivt35P9ruenr2CpXU_VpCk9P5LeDZJVZO3FreTFkznCxzI9mcF36I0b4v97rfB81GYm5PQbXsg3MjRFgPtX9w81ex6yCY8O-CI1uFM8bhksuLJ4UCDJ7qbNL78UMEVFEHb_M8dDqI8PBA8zFuabPoV-aTW-iNcxSBHunuKJXFEEm6l9qQnQR81DBWxvq86heKQADq2Ud2iiXwNbIVn0odgyQmY7UhTTLP5j5wKbcA4livN1sYO6ARtI0",
    steps: [
      { title: "The Bloom", desc: "Pour 50g of water to saturate the grounds evenly. Wait 30 seconds for the 'bloom' - this releases trapped CO2 and prepares the beans for extraction." },
      { title: "Main Pour", desc: "Slowly pour 200g of water in steady, concentric circles, moving from the center outwards. Keep the water level consistent." },
      { title: "The Final Draw", desc: "Add the remaining 100g of water and give a gentle stir. Wait for the water to draw down completely through the bed of coffee." }
    ]
  },
  'chemex': {
    name: "Chemex",
    description: "Combining laboratory-grade glass with proprietary thick filters, the Chemex produces a crisp, sediment-free cup that emphasizes sweetness and clarity.",
    time: "4:30 MIN",
    roast: "LIGHT ROAST",
    tag: "CLARITY",
    ratio: "1:16",
    grind: "Medium-Coarse",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDTTyGEPDOMYTu21EScx1cXHk5HdFm3eKwZAzK7Z3WM7__caPCZaR9raw7eglzj2yQ6Ftq-YeqjMBCOjDe9azm89_jYoqOXRLkQZ8D0Pj0cfWyW01ZQtwZp--GCi6KwmsS5_-fOGlHfm8pCC8u7LH0CZkkNQqNdqSXDdrfTwnwiJ1aW0d1-tpR8mKV2_dFh62R6Kq1fcquorqMnka8DoJjez8ySRMdlDA60U9w230eRIla4kOk5zQ5uMxfIwZ7l0kGXn87gJMHAng",
    steps: [
      { title: "Set the Filter", desc: "Place the multi-layer filter with the 3-layered side against the spout. Rinse with hot water to remove any paper taste and pre-heat the glass." },
      { title: "Continuous Pour", desc: "Pour water in a steady stream, focusing on the center. The thick filter slows down the flow, allowing for a deep, sweet extraction." },
      { title: "The Aeration", desc: "Once the brew is finished, remove the filter and swirl the carafe. This aerates the coffee, opening up its full aromatic potential." }
    ]
  },
  'french-press': {
    name: "French Press",
    description: "The classic immersion method. By allowing the grounds to steep fully in water, you achieve a rich, oily, and heavy-bodied cup that is unparalleled in its depth.",
    time: "4:00 MIN",
    roast: "DARK ROAST",
    tag: "BODY",
    ratio: "1:12",
    grind: "Coarse",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL5_I6wODLxA7wQCl538KU8e1729H-uaB2CB4avDc-LWPxaMu1pnQvX7YFHhqOElVPHEcbeKGJIu5ESqIIsBZHDdc56JAXtwlC7Cyb1xsmH0kt2SYjy6L11DtymmtBCJGjmcckcVo7cZjgSdywcq97oSfUBY5z5knuUQyPNQAp5UO4GLFCnfxi5nuc2V3dKOJk7amfJyiTiRi_Ag-gmR600Lo8R3mQmbf8zCNk3p1ujrr3jVd6Gawa_BvV7_OjtbwxSVoyWEbuPW0",
    steps: [
      { title: "The Steep", desc: "Add coarse grounds and hot water. Set your timer for 4 minutes. Let the immersion do the work - no stirring required just yet." },
      { title: "The Break", desc: "At 4 minutes, use a spoon to gently break the 'crust' of grounds on the surface. They will sink to the bottom, leaving the clear coffee above." },
      { title: "The Plunge", desc: "Slowly press the plunger down. Use only the weight of your hand. Pour immediately to stop the extraction process." }
    ]
  },
  'aeropress': {
    name: "Aeropress",
    description: "Beloved by travelers and enthusiasts alike, the Aeropress uses pressure to extract flavors quickly. It is the most versatile tool in your brewing arsenal.",
    time: "1:30 MIN",
    roast: "MEDIUM ROAST",
    tag: "VERSATILITY",
    ratio: "1:13",
    grind: "Fine-Medium",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3rmiPX57X5Bxe-i5yEdsFBjls-KsXou7LrvctVAvL1aIBubzkqcPN4e_SrZKUbKytwRQYYzAiy8Fqig7d6hF0d_f_nnPmkgEeocvUFrQzuahYu0TSyxwNdH1lAeTvFWS7xTa9atztLY0kNuo2oSFogvM4Fx2ZScO7KcK7fbQLoTF3pl2XYsk91a3luKFgjS5w32kSj7N8RZ6gAvTi0i0nwTt933u-WVBeTEoQfmq0xgumCfSF8lSNK1tw9dudmkm8he4KiRhWiBY",
    steps: [
      { title: "Inverted Method", desc: "Place the plunger inside the chamber and turn it upside down. Add coffee and water. This allows for total control over steep time." },
      { title: "The Agitation", desc: "Stir gently for 10 seconds to ensure all grounds are saturated. Attach the filter cap and wait for the remaining 30 seconds." },
      { title: "The Hiss", desc: "Flip the Aeropress onto your cup and press down firmly but steadily. Stop when you hear the characteristic 'hiss' of air escaping." }
    ]
  }
};

const BrewingMethodDetail = () => {
  const { methodId } = useParams();
  const [method, setMethod] = useState(null);
  const [recommendedBeans, setRecommendedBeans] = useState([]);

  useEffect(() => {
    const currentMethod = methodData[methodId];
    if (currentMethod) {
      setMethod(currentMethod);
      
      // Filter recommended beans based on roast type
      const beans = products.filter(p => 
        p.isSingleOrigin && 
        p.roast.toLowerCase() === currentMethod.roast.toLowerCase()
      ).slice(0, 3);
      setRecommendedBeans(beans);
    }
    window.scrollTo(0, 0);
  }, [methodId]);

  if (!method) return <div className="min-h-screen flex items-center justify-center font-serif text-primary text-2xl">Method not found...</div>;

  return (
    <div className="animate-in fade-in duration-700 w-full overflow-x-hidden pt-12">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div className="order-2 lg:order-1">
          <Link to="/brewing" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-12 font-label text-[10px] uppercase tracking-widest font-bold">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Library
          </Link>
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary/60 mb-4 block">{method.tag}</span>
          <h1 className="font-headline text-6xl md:text-8xl text-primary font-bold mb-8 tracking-tighter leading-tight uppercase">
            {method.name}
          </h1>
          <p className="font-body text-xl text-secondary leading-relaxed mb-12 font-light max-w-xl">
            {method.description}
          </p>
          
          <div className="grid grid-cols-3 gap-8 py-8 border-y border-outline-variant/30">
            <div>
              <span className="block font-label text-[10px] uppercase tracking-widest text-secondary/50 mb-2">Time</span>
              <span className="font-headline text-2xl font-bold text-primary">{method.time}</span>
            </div>
            <div>
              <span className="block font-label text-[10px] uppercase tracking-widest text-secondary/50 mb-2">Ratio</span>
              <span className="font-headline text-2xl font-bold text-primary">{method.ratio}</span>
            </div>
            <div>
              <span className="block font-label text-[10px] uppercase tracking-widest text-secondary/50 mb-2">Grind</span>
              <span className="font-headline text-2xl font-bold text-primary">{method.grind}</span>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl relative">
            <img src={method.image} alt={method.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Step by Step Guide */}
      <section className="bg-surface-container-low py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-20">
            <h2 className="font-headline text-4xl md:text-6xl text-primary font-bold mb-6 tracking-tighter">Step-by-Step Guide</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 relative">
             {/* Timeline bar for desktop */}
            <div className="hidden md:block absolute top-[1.125rem] left-0 right-0 h-px bg-outline-variant/30 z-0"></div>
            
            {method.steps.map((step, idx) => (
              <div key={idx} className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline font-bold mb-8 shadow-xl">
                  {idx + 1}
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4 font-bold uppercase tracking-tight italic">{step.title}</h3>
                <p className="font-body text-secondary leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Beans */}
      <section className="py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16 border-b border-outline-variant/30 pb-12">
            <div>
              <h2 className="font-headline text-4xl text-primary font-bold mb-4 tracking-tighter">Recommended Beans</h2>
              <p className="font-body text-secondary italic font-light">The perfect pairings for your {method.name}.</p>
            </div>
            <Link to="/shop" className="font-label text-xs uppercase tracking-widest font-bold text-primary hover:opacity-70 flex items-center gap-2">
              View All Shop
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedBeans.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="group">
                <div className="bg-surface-container rounded-3xl overflow-hidden border border-outline-variant/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="aspect-square overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full font-label text-[9px] font-bold uppercase tracking-widest">
                      {product.roast}
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="font-label text-[9px] uppercase tracking-[0.2em] text-secondary/60 mb-2 block">{product.region}</span>
                    <h3 className="font-headline text-xl text-primary font-bold mb-2 group-hover:text-secondary transition-colors">{product.name}</h3>
                    <p className="text-secondary/70 text-sm mb-6 font-light">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-lg font-bold text-primary whitespace-nowrap">{new Intl.NumberFormat('vi-VN').format(product.price)}đ</span>
                      <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-32">
        <div className="bg-stone-900 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-6xl text-white font-bold mb-8 tracking-tighter leading-tight italic">
              Experience the Full Ritual
            </h2>
            <p className="font-body text-white/60 text-lg max-w-2xl mx-auto mb-12 font-light">
              Don't just make coffee. Create a sensory experience. Our subscription ensures you never run out of the world's finest seasonal harvests.
            </p>
            <Link to="/subscriptions" className="inline-block bg-white text-primary px-12 py-5 rounded-2xl font-label text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-surface transition-all shadow-2xl active:scale-95">
              Explore Subscriptions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrewingMethodDetail;
