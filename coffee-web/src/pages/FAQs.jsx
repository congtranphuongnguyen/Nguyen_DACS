import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders",
    icon: "package_2",
    questions: [
      { 
        id: "q1", 
        question: "How can I track my roasted beans?", 
        answer: "Once your beans have left our roastery, you will receive a tracking link via email. You can also view live status updates within the 'Journal' tab of your Terra Brew app under recent activity." 
      },
      { 
        id: "q2", 
        question: "What is the shipping window for fresh roasts?", 
        answer: "To ensure peak flavor, we roast every Tuesday and Friday. Orders placed before midnight on roasting days typically ship within 24 hours. Delivery usually takes 2-4 business days depending on your location." 
      }
    ]
  },
  {
    category: "Brewing Tips",
    icon: "local_cafe",
    questions: [
      { 
        id: "q3", 
        question: "Best water temperature for V60?", 
        answer: (
          <span>
            For light roasts, we recommend water between 92°C and 96°C. If you're brewing a darker roast, try 88°C to 91°C to avoid over-extraction and bitterness. 
            Check out our full <Link to="/brewing/hario-v60" className="text-secondary font-bold underline underline-offset-4 hover:text-primary transition-colors">V60 guide</Link> for more details.
          </span>
        )
      },
      { 
        id: "q4", 
        question: "Grind size for French Press?", 
        answer: (
          <span>
            French Press requires a coarse, sea-salt-like grind. This allows for a clean 4-minute steep without sediment passing through the mesh filter. 
            Read more about French Press precision in our <Link to="/brewing/french-press" className="text-secondary font-bold underline underline-offset-4 hover:text-primary transition-colors">manual</Link>.
          </span>
        )
      }
    ]
  },
  {
    category: "Account",
    icon: "person_pin",
    questions: [
      { 
        id: "q5", 
        question: "How do I earn 'Beans'?", 
        answer: "Our loyalty program, The Alchemist Circle, rewards you with 5 Beans for every bag of coffee purchased. You can also earn bonus Beans by completing brew logs in your Journal." 
      },
      { 
        id: "q6", 
        question: "Managing subscriptions", 
        answer: "Subscriptions can be paused, modified, or canceled at any time through the Profile tab. There are no lock-in contracts; we believe you should only receive coffee when you're ready for it." 
      }
    ]
  }
];

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (typeof q.answer === 'string' && q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="animate-in fade-in duration-700 w-full overflow-x-hidden pt-12 bg-surface text-on-surface font-body">
      <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary mb-4 leading-tight tracking-tight uppercase">
            Curating Your <br /><span className="italic font-light text-secondary">Perfect Brew</span>
          </h2>
          <p className="font-body text-secondary/70 max-w-md font-light leading-relaxed">
            Everything you need to know about our artisanal process, your orders, and mastering the alchemy of coffee at home.
          </p>
        </section>

        {/* Search Bar - Logic Activated */}
        <div className="relative mb-20 group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-secondary/40">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            className="w-full pl-14 pr-6 py-5 bg-surface-container border border-outline-variant/10 rounded-[2rem] focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body text-primary placeholder:text-secondary/40 shadow-sm focus:shadow-xl" 
            placeholder="Search for answers..." 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-24">
          {filteredData.length > 0 ? filteredData.map((cat, catIdx) => (
            <section key={catIdx} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${catIdx * 100}ms` }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-primary/5 rounded-[1.25rem] border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                </div>
                <h3 className="font-headline text-3xl text-primary italic font-bold tracking-tight">{cat.category}</h3>
              </div>

              {/* Special Masterclass Card for Brewing Tips */}
              {cat.category === "Brewing Tips" && searchQuery === "" && (
                <Link to="/brewing" className="block relative h-64 md:h-96 rounded-[2.5rem] overflow-hidden mb-10 group cursor-pointer shadow-xl border border-outline-variant/10">
                  <img 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDsu2plwQzrO3xU5Ha6S-qnd-FpL__-EWpVzlV9OSPrpuSpp8aoQGmXCFunQTRBcvYcyID0gRH6qva0ZuRnXohf5Fst6mD4D6pqlXutlnaAKPwaOlspKylN6F0FcV6Thh6Cm87LpcNn1EAZmU1nmG9bPIk4MUysiAyx-Vx8mVv76VZfrbvb7tMncz0u5QjEpNu649v52wttzsUnsOkx9acrRXcd2pwGNoi4_B-o-aeHhtPKhesp5GKl7pjVtWVfJSoap5HRvMYXjji" 
                    alt="Espresso shot Masterclass"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <span className="text-white/60 font-label text-[10px] uppercase tracking-[0.4em] font-bold mb-4">Masterclass</span>
                    <h4 className="font-headline text-3xl md:text-5xl text-white italic tracking-tighter leading-tight">The Alchemy of <br/>the Pour-Over</h4>
                  </div>
                </Link>
              )}

              <div className="space-y-4">
                {cat.questions.map((q) => (
                  <details key={q.id} className="group bg-surface-container rounded-[1.5rem] overflow-hidden transition-all duration-500 border border-outline-variant/10 hover:border-primary/20 hover:shadow-lg">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-body font-bold text-primary group-hover:text-secondary transition-colors text-lg tracking-tight">{q.question}</span>
                      <div className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center transition-transform group-open:rotate-180 group-open:bg-primary group-open:border-primary">
                        <span className="material-symbols-outlined text-outline text-lg group-open:text-surface">expand_more</span>
                      </div>
                    </summary>
                    <div className="px-8 pb-8 text-secondary/80 leading-relaxed font-light text-base animate-in fade-in slide-in-from-top-2 duration-300">
                      {q.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )) : (
            <div className="text-center py-20 bg-surface-container rounded-[3rem] border border-outline-variant/10">
              <span className="material-symbols-outlined text-5xl text-outline mb-6">search_off</span>
              <h3 className="font-headline text-2xl text-primary font-bold mb-2">No answers found</h3>
              <p className="text-secondary font-light">Try adjusting your search terms or keywords.</p>
            </div>
          )}
        </div>

        {/* Contact Support CTA - Smooth expansion target */}
        <section className="mt-40 p-16 bg-primary rounded-[3rem] text-on-primary flex flex-col items-center text-center space-y-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-stone-800 opacity-20 z-0"></div>
          <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
          
          <div className="relative z-10 space-y-6">
            <h4 className="font-headline text-5xl md:text-7xl italic font-light tracking-tighter text-white">Still curious?</h4>
            <p className="font-body text-white/70 text-lg max-w-sm font-light leading-relaxed mx-auto italic">
              Our Master Roasters are always happy to discuss the nuances of the bean or help resolve any brewing dilemmas.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-white text-primary px-14 py-5 rounded-[1.25rem] font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-surface-container-high hover:scale-105 transition-all shadow-xl active:scale-95 duration-300 border border-transparent hover:border-secondary/30"
            >
              Message Support
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FAQs;
