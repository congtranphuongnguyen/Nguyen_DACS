import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-20 bg-[#121412] mt-24 border-t border-stone-800/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* About Section */}
          <div className="space-y-6">
            <div className="font-headline font-bold text-2xl text-[#D7CCC8] tracking-tight">
              The Artisanal Digital Roastery
            </div>
            <p className="font-body text-sm font-medium text-[#E0E0E0] leading-relaxed max-w-xs">
              Crafting the slow ritual for the modern home. Sustainable, direct-trade, and meticulously roasted.
            </p>
            <div className="pt-4 text-[10px] font-bold text-stone-600 uppercase tracking-widest">
              © 2024 Roastery Digital Group
            </div>
          </div>
          
          {/* Shop Column */}
          <div className="space-y-6">
            <h4 className="font-headline font-bold text-[#D7CCC8] text-sm uppercase tracking-widest">Cửa hàng (Shop)</h4>
            <div className="flex flex-col gap-4 font-body text-sm font-medium text-[#E0E0E0]">
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/single-origins">
                Nguồn gốc đơn hạt (Single Origins)
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/menu">
                Thực đơn đồ uống (Drink Menu)
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/signature-blends">
                Hỗn hợp đặc trưng (Signature Blends)
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/brewing-gear">
                Dụng cụ pha chế (Brewing Gear)
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/subscriptions">
                Gói đăng ký (Subscriptions)
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            </div>
          </div>

          {/* Resources Column */}
          <div className="space-y-6">
            <h4 className="font-headline font-bold text-[#D7CCC8] text-sm uppercase tracking-widest">Tài nguyên (Resources)</h4>
            <div className="flex flex-col gap-4 font-body text-sm font-medium text-[#E0E0E0]">
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/brewing-guides">
                Hướng dẫn pha chế (Brewing Guides)
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/faqs">
                Câu hỏi thường gặp (FAQs)
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/shipping-policy">
                Chính sách vận chuyển (Shipping)
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/contact">
                Liên hệ (Contact)
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            </div>
          </div>

          {/* Connect Column */}
          <div className="space-y-6">
            <h4 className="font-headline font-bold text-[#D7CCC8] text-sm uppercase tracking-widest">Kết nối (Connect)</h4>
            <div className="flex flex-col gap-4 font-body text-sm font-medium text-[#E0E0E0]">
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/profile">
                Instagram
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/profile">
                Pinterest
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link className="transition-all duration-300 hover:text-white group w-fit" to="/profile">
                Twitter
                <span className="block h-0.5 bg-[#D7CCC8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
