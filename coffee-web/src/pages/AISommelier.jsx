import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../products';
import { useCart } from '../context/CartContext';

const drinks = [
  { id: 'd1', name: 'Espresso', price: '35000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq61VomDNjEL1VLncM2k-BKjMTSzubgDee1rRmee4uskm61GjNWyqQQM7Szr1QzljP0dfywzkw_TXFLigKAAWoFxpHzJf9x8fWmbj_SEMRkN4NGvRYE2GzXKMS5UH1h6CQ4qnK0L52Z-hR3QukV3cRmzowx2HiEsdalhuXdqYkSgUvCU239yN1L3y6Y2iGHnTm-XcKAeaB-uMRBam-dcW5EqsqIpdcD3sAII0jxMm_IU3cMGwtt9NP3mmNItLK9XGcdmWM5BG4wJg4', description: 'Pure, intense essence of our signature roast.' },
  { id: 'd4', name: 'Latte', price: '45000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUPT7Zw18Cat-vGNULaVCJ69pyxVPvBw13pVd5-q33Occx5EzzHK_r7wfgYxFcJ1VrsD6E_ocptBER1MEx-GQMFPuoVxsouGcC8P3D8-c4cIOF_8iTNUMtZ22-DfFTgajC8lL7VzciC5Kuh7Shm829_NFIWTg7O-OE_Njom3dBo-NFumLfzIDCvbN3aW1zJVAKwCHrJj_MI_FFhP7vgqvXUkA-pLlq-45lEBZJg7_ZUror-gqU7aKqoAUyCRggGbJEcbYeXShB2g2N', description: 'Smooth, comforting steamed milk swirled with gold.' },
  { id: 'd5', name: 'Nitro Cold Brew', price: '55000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUYyu0Ncp69b-1VPQtr3drOwIJ1T_U1xdkbd8qh53N2-Y0b4MRVgc5UZqDQZ2fL83-7UnYyQG-wfiT1U43O0zbhpNRTNWfd6KkbM2qpvRs1Co7z86hOPl-bMt1Ar8OtxzRbEEkr-Sptzi3L4oH7dnEqqCAmB0RPo4bi9tSUIMcuLqo-oZmblPKHP80Q7pyHtLj02ax7Jaa04QGJTDBnkD2MoniLQXTV1UOPbDQVO3YrqqufX5c00Dnu83dAB_-ytmxmONGOLZEWrOn', description: 'Infused with nitrogen for a creamy, stout-like texture.' },
  { id: 'd3', name: 'Flat White', price: '48000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM9ec0AAAmo7I-UHnFoUxl8_HURXpGo0haKJFSnP7vYU9qSWxjG5b5WcWw7JnwrXeq7FZ-kqKJUGdonq1jSUjuZCKF8lcFvs6OEmLjDfHlvXX14ExE1fDCfjSZUHk4iPw6BFrzaClR3Over53R-s5fAYzqFn3C4UIg6nc0AlbB-64fcYvatqjKzR5fJr1xO9bJS9YU_fYiIjk8B2YVh0GJD0_6wvvbF43Ic15j4PQ8h_-6-oX17TUtVoTnPQqaSNvfAyq4u4h_fmDi', description: 'Velvety micro-foam over a double shot.' }
];

const AISommelier = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      text: "Khẩu vị ưu tiên của bạn là gì?",
      options: [
        { label: "Đắng Đậm Đà", value: "Đắng", icon: "bolt" },
        { label: "Chua Thanh Khiết", value: "Chua", icon: "eco" }
      ]
    },
    {
      id: 2,
      text: "Bạn cần một nguồn năng lượng thế nào?",
      options: [
        { label: "Mạnh Mẽ (High Caffeine)", value: "Mạnh", icon: "rocket_launch" },
        { label: "Nhẹ Nhàng (Balanced)", value: "Nhẹ", icon: "water_drop" }
      ]
    },
    {
      id: 3,
      text: "Bạn thích sự nguyên bản hay kết hợp?",
      options: [
        { label: "Cà Phê Đen Nguyên Bản", value: "Đen", icon: "palette" },
        { label: "Cà Phê Sữa Mượt Mà", value: "Sữa", icon: "opacity" }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(3); // Result step
    }
  };

  const recommendation = useMemo(() => {
    if (step !== 3) return null;
    const [flavor, strength, prep] = answers;

    let suggestedDrink, suggestedBeans;

    if (flavor === "Đắng" && strength === "Mạnh") {
      suggestedDrink = drinks.find(d => d.id === 'd1'); // Espresso
      suggestedBeans = products.find(p => p.id === 'sig-the-obsidian');
    } else if (flavor === "Chua" && strength === "Nhẹ") {
      suggestedDrink = drinks.find(d => d.id === 'd5'); // Nitro Cold Brew (acidic/light profile)
      suggestedBeans = products.find(p => p.id === 'p1'); // Ethiopia
    } else if (prep === "Sữa") {
      suggestedDrink = drinks.find(d => d.id === 'd4'); // Latte
      suggestedBeans = products.find(p => p.id === 'sig-morning-mist');
    } else {
      suggestedDrink = drinks.find(d => d.id === 'd3'); // Flat White
      suggestedBeans = products.find(p => p.id === 'sig-golden-hour');
    }

    return { drink: suggestedDrink, beans: suggestedBeans };
  }, [step, answers]);

  const handleTryNow = () => {
    if (recommendation) {
      addToCart(recommendation.drink);
      addToCart(recommendation.beans);
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#FAF9F6] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Mystical Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4E342E] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3E2723] rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {step < 3 ? (
          <div className="text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4AF37] opacity-80">Alchemist Selection</p>
              <h1 className="font-headline text-4xl md:text-6xl font-bold italic tracking-tight leading-tight">
                {questions[step].text}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="group relative p-12 bg-[#1A1A1A] border border-white/5 rounded-[3rem] overflow-hidden transition-all hover:border-[#D4AF37]/30 hover:bg-[#252525] hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="material-symbols-outlined text-5xl mb-6 text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-all scale-100 group-hover:scale-110">
                    {opt.icon}
                  </span>
                  <p className="font-headline text-2xl font-bold tracking-tight">{opt.label}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-12">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-12 bg-[#D4AF37]' : 'w-4 bg-white/10'}`}></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-16 animate-in fade-in zoom-in duration-1000">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Discovery Complete</p>
              <h2 className="font-headline text-5xl md:text-7xl font-bold italic tracking-tighter">Gu Cafe của bạn là...</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
              {/* Drink Result */}
              <div className="bg-[#1A1A1A] rounded-[3rem] p-10 border border-white/5 relative overflow-hidden group shadow-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-all"></div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]/60 mb-6">Món Nước Hoàn Hảo</p>
                <div className="flex gap-8 items-center mb-8">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-black/40 shadow-inner">
                    <img src={recommendation.drink?.image} alt={recommendation.drink?.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div>
                    <h3 className="font-headline text-3xl font-bold mb-2 italic tracking-tight">{recommendation.drink?.name}</h3>
                    <p className="text-sm text-[#FAF9F6]/50 font-light leading-relaxed">{recommendation.drink?.description}</p>
                  </div>
                </div>
              </div>

              {/* Beans Result */}
              <div className="bg-[#1A1A1A] rounded-[3rem] p-10 border border-white/5 relative overflow-hidden group shadow-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#4E342E]/10 rounded-full blur-3xl group-hover:bg-[#4E342E]/20 transition-all"></div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]/60 mb-6">Túi Cafe Phù Hợp</p>
                <div className="flex gap-8 items-center mb-8">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-black/40 shadow-inner">
                    <img src={recommendation.beans?.image} alt={recommendation.beans?.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div>
                    <h3 className="font-headline text-3xl font-bold mb-2 italic tracking-tight">{recommendation.beans?.name}</h3>
                    <p className="text-sm text-[#FAF9F6]/50 font-light leading-relaxed">{recommendation.beans?.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
              <button
                onClick={() => { setStep(0); setAnswers([]); }}
                className="px-12 py-5 rounded-2xl border border-white/10 font-bold text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Làm lại từ đầu
              </button>
              <button
                onClick={handleTryNow}
                className="px-12 py-5 rounded-2xl bg-[#D4AF37] text-black font-bold text-[10px] uppercase tracking-widest hover:bg-[#B8962E] transition-all shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95"
              >
                Thử ngay cặp đôi này
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alchemist Quotes at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full text-center px-6">
        <p className="text-[9px] font-serif italic text-white/20 tracking-widest uppercase">
          "The secret of alchemy is not in the stone, but in the roast."
        </p>
      </div>
    </div>
  );
};

export default AISommelier;
