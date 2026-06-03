import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { products } from '../../products';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ cartCount, onCartToggle, searchQuery, onSearchChange }) => {
  const { isLoggedIn, isAdmin, currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Filter suggestions based on searchQuery
  const suggestions = searchQuery.trim() !== ''
    ? products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.roast.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5) // Limit to 5 suggestions
    : [];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      navigate('/shop');
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 py-6 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center gap-8">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-serif font-bold text-primary flex-shrink-0 hover:opacity-80 transition-opacity">
          The Artisanal Digital Roastery
        </Link>


        {/* Search Bar - Center */}
        <div className="flex-1 max-w-md hidden lg:block relative" ref={dropdownRef}>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              type="text"
              placeholder="Search beans, roasts, regions..."
              className="w-full bg-surface-container-low border-none rounded-full py-3 pl-12 pr-6 text-sm text-primary focus:ring-2 focus:ring-outline outline-none transition-all placeholder:text-secondary/60"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && searchQuery.trim() !== '' && (
            <div className="absolute top-full mt-2 w-full bg-surface-container rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              {suggestions.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
                    Gợi ý sản phẩm
                  </div>
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low transition-colors group"
                      onClick={() => setShowSuggestions(false)}
                    >
                      <div className="w-12 h-12 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-primary">{product.name}</div>
                        <div className="text-xs text-secondary">{product.roast} • {product.region}</div>
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {new Intl.NumberFormat('vi-VN').format(product.price)}đ
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/shop"
                    className="block text-center py-3 text-sm text-secondary hover:text-primary font-medium border-t border-outline-variant/10 transition-colors"
                    onClick={() => setShowSuggestions(false)}
                  >
                    Xem tất cả kết quả cho "{searchQuery}"
                  </Link>
                </div>
              ) : (
                <div className="p-10 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-outline text-3xl">search_off</span>
                  </div>
                  <p className="text-sm text-secondary font-semibold px-4 leading-relaxed font-sans">
                    Rất tiếc, chúng tôi không tìm thấy hạt cà phê này. Hãy thử từ khóa khác nhé!
                  </p>

                </div>
              )}

            </div>
          )}
        </div>

        {/* Links & Actions */}
        <div className="flex items-center gap-8 font-medium text-secondary">
          <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest">
            <Link
              to="/"
              className={`transition-colors h-8 flex items-center ${isActive('/') ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`transition-colors h-8 flex items-center ${isActive('/shop') ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}`}
            >
              Shop
            </Link>
            <Link
              to="/menu"
              className={`transition-colors h-8 flex items-center ${isActive('/menu') ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}`}
            >
              Menu
            </Link>
            
            {isAdmin ? (
              <Link
                to="/admin"
                className={`transition-colors h-8 flex items-center ${isActive('/admin') ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}`}
              >
                Admin
              </Link>
            ) : (
              <>
                <Link
                  to="/brewing"
                  className={`transition-colors h-8 flex items-center ${isActive('/brewing') ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}`}
                >
                  Brewing
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/my-orders"
                    className={`transition-colors h-8 flex items-center ${isActive('/my-orders') ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}`}
                  >
                    My Orders
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-6">
            <Link to={isLoggedIn ? "/profile" : "/login"} className="hover:opacity-80 transition-opacity p-2 hover:bg-surface-container rounded-full flex items-center">
              <span className={`material-symbols-outlined ${location.pathname === '/profile' ? 'text-primary' : 'text-secondary'}`}>
                person
              </span>
            </Link>

            {isLoggedIn && (
              <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-secondary">
                {currentUser?.fullName?.split(' ')[0] || currentUser?.email.split('@')[0]}
              </span>
            )}

            {/* Cart Icon */}
            <button
              onClick={() => onCartToggle()}
              className="relative cursor-pointer group p-2 hover:bg-surface-container rounded-full transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-secondary group-hover:text-primary">
                shopping_bag
              </span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-surface animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;