import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products } from '../../products';

const AIChatBox = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Chào bạn! Tôi là trợ lý Alchemist. Bạn có cần tôi tư vấn dòng Signature phù hợp với khẩu vị sáng nay không?", isAi: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasShownGreeting, setHasShownGreeting] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    { text: "☕ Tư vấn vị Morning Mist", value: "tư vấn morning mist" },
    { text: "🌙 Dòng nào đậm nhất?", value: "dòng nào đậm nhất" },
    { text: "🛒 Xem giỏ hàng của tôi", value: "xem giỏ hàng" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownGreeting && !isOpen) {
        setShowGreetingBubble(true);
      }
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowGreetingBubble(false);
      setHasShownGreeting(true);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [hasShownGreeting, isOpen]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newMessage = { id: Date.now(), text, isAi: false };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowGreetingBubble(false);

    setTimeout(() => {
      let aiResponse = null;
      const lowerText = text.toLowerCase();
      const isSignaturePage = location.pathname.includes('signature-blends');
      const isBrewingPage = location.pathname.includes('brewing-gear');
      const isShopPage = location.pathname.includes('shop');

      const linkClass = "font-bold text-[#4E342E] underline underline-offset-4 hover:text-[#8b5e3c] transition-all cursor-pointer inline-flex items-center gap-1";

      // --- Intent: Shop Pagination / Gear Location ---
      if (lowerText.includes("dụng cụ") || lowerText.includes("ấm") || lowerText.includes("máy xay") || lowerText.includes("gear")) {
          if (isShopPage) {
              aiResponse = "Nếu bạn đang tìm dụng cụ pha chế (Kettle, Grinder...), hãy nhấn qua Trang 2 của cửa hàng nhé! Tôi tin bạn sẽ tìm thấy những món đồ ưng ý cho laboratory của mình.";
          } else {
              aiResponse = (
                <span>
                    Bạn có thể tìm thấy các dòng cafe tại Trang 1 và dụng cụ pha chế hi-end tại Trang 2 của <Link to="/shop" className={linkClass}>Cửa hàng Alchemist</Link> đó!
                </span>
              );
          }
      }
      // --- Intent: Bundle Pack Info ---
      else if (lowerText.includes("bundle") || lowerText.includes("compo") || lowerText.includes("set alchemist")) {
        aiResponse = "Bộ 'The Complete Alchemist Set' là đỉnh cao cho phòng thí nghiệm của bạn! Nó bao gồm: 1 máy xay Obsidian, 1 ấm Aureum, 1 phễu Prism, 2 cốc Terra và tặng kèm bộ lọc giấy. Đặc biệt, bạn tiết kiệm tới 15% khi mua trọn bộ đó!";
      }
      // --- Intent: Giá cả ---
      else if (lowerText.includes("giá") || lowerText.includes("bao nhiêu")) {
        let foundProduct = products.find(p => lowerText.includes(p.name.toLowerCase()) || lowerText.includes(p.name.split(' ')[0].toLowerCase()));
        if (foundProduct) {
          const priceStr = new Intl.NumberFormat('vi-VN').format(foundProduct.price) + 'đ';
          aiResponse = `Bạn muốn hỏi về ${foundProduct.name} đúng không? Sản phẩm này có giá là ${priceStr} nha bạn!`;
        } else {
          aiResponse = "Bạn muốn hỏi giá của hạt cafe hay dụng cụ nào vậy?";
        }
      }
      // --- Intent: Product Deep Dive ---
      else if (lowerText.includes("xem kỹ hơn") || lowerText.includes("chi tiết")) {
          if (lowerText.includes("midnight velvet")) {
              aiResponse = (
                  <span>Bạn có thể xem chi tiết dòng này tại đây: <Link to="/product/sig-midnight-velvet" className={linkClass}>Midnight Velvet Details</Link>.</span>
              );
          } else if (lowerText.includes("morning mist")) {
              aiResponse = (
                <span>Mời bạn xem kỹ hơn về <Link to="/product/sig-morning-mist" className={linkClass}>Morning Mist Details</Link> tại đây nhé.</span>
              );
          } else {
            aiResponse = "Tôi có thông số chi tiết của mọi nghệ phẩm tại đây. Bạn quan tâm đến món nào nhất?";
          }
      }
      // --- Intent: Navigation ---
      else if (lowerText.includes("ở đâu") || lowerText.includes("đường dẫn") || lowerText.includes("trang này")) {
        if (isShopPage) {
          aiResponse = "Bạn đang ở Cửa hàng chính! Trang 1 dành cho cafe hạt và Trang 2 dành cho dụng cụ pha chế. Bạn cần tôi tìm giúp gì không?";
        } else {
          aiResponse = (
            <span>
                Mời bạn khám phá bộ sưu tập tại <Link to="/shop" className={linkClass}>Cửa hàng</Link> của chúng tôi.
            </span>
          );
        }
      }
      // --- Intent: Order Status ---
      else if (lowerText.includes("xong chưa") || lowerText.includes("đơn hàng của tôi") || lowerText.includes("trạng thái") || lowerText.includes("ly của mình")) {
          aiResponse = (
            <span>
              Bạn có thể kiểm tra trạng thái pha chế chi tiết tại trang <Link to="/my-orders" className={linkClass}>My Orders</Link> nhé! Hệ thống của chúng tôi cập nhật thời gian thực từng công đoạn đó.
            </span>
          );
      }
      // --- Fallback ---
      else {
        aiResponse = "Chào bạn! Tôi có thể hỗ trợ bạn tìm kiếm hạt cafe (Trang 1) hoặc dụng cụ Brewing Gear (Trang 2) tại Cửa hàng.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: aiResponse, isAi: true }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans text-primary">
      {showGreetingBubble && !isOpen && (
        <div className="absolute bottom-20 right-0 w-64 p-4 bg-white rounded-2xl shadow-2xl border border-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-500 z-50">
          <p className="text-primary text-sm font-medium leading-relaxed italic">
            "Săn hạt tại Trang 1 hay chọn Gear tại Trang 2, Nguyen ơi?"
          </p>
          <div className="absolute top-full right-8 border-8 border-transparent border-t-white"></div>
        </div>
      )}

      <button
        onClick={() => { setIsOpen(!isOpen); setShowGreetingBubble(false); }}
        className="w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[420px] max-w-[90vw] h-[580px] max-h-[82vh] bg-surface-container rounded-[2.5rem] shadow-[-20px_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500 border border-outline-variant/10">
          <div className="bg-primary p-7 text-on-primary flex justify-between items-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
             <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/20 shadow-inner">
                    <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                </div>
                <div>
                    <h3 className="font-headline text-xl font-bold italic tracking-tight">Alchemist Shop Guide</h3>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 font-black">Hỗ trợ mua sắm</p>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined">close</span>
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-surface/40 scroll-smooth">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.isAi ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`
                    max-w-[88%] p-5 rounded-2xl shadow-sm text-sm leading-relaxed
                    ${m.isAi 
                        ? 'bg-white text-primary rounded-tl-none border border-outline-variant/10 font-headline italic' 
                        : 'bg-primary text-white rounded-tr-none font-medium px-6 shadow-md'}
                `}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white/40 p-6 space-y-4 border-t border-outline-variant/10 backdrop-blur-md">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="flex gap-3">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Bạn muốn hỏi về hạt hay dụng cụ?"
                className="flex-1 bg-white border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-secondary/40 font-medium"
              />
              <button type="submit" className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <span className="material-symbols-outlined font-bold">send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBox;
