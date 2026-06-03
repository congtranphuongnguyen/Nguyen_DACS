import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { api } from '../api';
import heroImage from '../assets/hero.png';
import grinderImage from '../assets/precision_hand_grinder.png';
import MemberCard from '../components/User/MemberCard';
import DrinkCustomizationModal from '../components/DrinkCustomizationModal';
import SecretMenu from '../components/SecretMenu';

const dailyQuests = [
  { id: 1, title: 'Uống 1 ly Cold Brew', xp: 20, targetProduct: 'Cold Brew' },
  { id: 2, title: 'Thưởng thức Croissant Trứng Muối', xp: 30, targetProduct: 'Croissant Trứng Muối' },
  { id: 3, title: 'Nạp năng lượng với Espresso', xp: 15, targetProduct: 'Espresso Alchemist' }
];

const DrinkMenu = () => {
  const { cart, toggleCart, cartCount, addToCart, isCoffeeLover } = useCart();
  const { openModal, isDarkMode, toggleDarkMode, showToast } = useUI();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiMood, setAiMood] = useState(null); // 'Bitter', 'Sweet', 'Alert'
  const [userPoints, setUserPoints] = useState(() => {
    const saved = localStorage.getItem('userPoints');
    return saved ? parseInt(saved) : 750;
  });

  const [currentQuest, setCurrentQuest] = useState(null);
  const [isQuestCompleted, setIsQuestCompleted] = useState(false);
  const [isSecretMenuUnlocked, setIsSecretMenuUnlocked] = useState(false);

  const [totalOrders, setTotalOrders] = useState(() => {
    const countStr = localStorage.getItem('ordersCount');
    if (countStr !== null) return parseInt(countStr);
    const savedOrders = localStorage.getItem('ritual_orders');
    if (savedOrders) {
      try {
        return JSON.parse(savedOrders).length;
      } catch (e) {}
    }
    return 0;
  });

  useEffect(() => {
    if (totalOrders >= 5 || cartCount >= 5) {
      if (!isSecretMenuUnlocked) {
        setIsSecretMenuUnlocked(true);
        showToast('Bạn đã mở khóa Secret Menu!');
      }
    } else {
      setIsSecretMenuUnlocked(false);
    }
  }, [totalOrders, cartCount, isSecretMenuUnlocked, showToast]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dailyQuests.length);
    setCurrentQuest(dailyQuests[randomIndex]);
  }, []);

  useEffect(() => {
    localStorage.setItem('userPoints', userPoints);
  }, [userPoints]);

  // Mapping product names to high-quality images for when SQL ImageURL is empty
  const imageMap = {
    'Espresso Alchemist': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
    'Espresso': heroImage,
    'Macchiato': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
    'Flat White': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
    'Latte Nghệ Thuật': 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop',
    'Latte': 'https://vinbarista.com/vnt_upload/news/08_2022/latte_la_gi.jpg',
    'Cold Brew': 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop',
    'Iced Vanilla Latte': 'https://vinbarista.com/vnt_upload/news/08_2022/latte_la_gi.jpg',
    'Butter Croissant': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    'Chocolate Muffin': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
    'Trà Đào Đá Xay': 'https://dayphache.edu.vn/wp-content/uploads/2020/02/tra-dao-da-xay-thom-ngon.jpg'
  };

  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800";

  useEffect(() => {
    const fetchDrinks = async () => {
      setLoading(true);
      try {
        const data = await api.getProducts(); // Fetch all products to handle Secret Menu correctly
        console.log(`[SQL Sync] Received ${data?.length || 0} products`);
        console.log("Menu Items (drinks) received:", data);

        setDrinks(data || []);
      } catch (error) {
        console.error("Critical API Error:", error);
        // Fallback on total failure
        setDrinks([
          { id: 'err1', name: 'Connection Error', price: 0, category: 'All', description: 'Kiểm tra lại Backend/SQL Connection String.' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
  }, [activeCategory]);

  const filteredDrinks = useMemo(() => {
    return drinks.filter(drink => {
      // Exclude secret items from public rendering entirely
      if (drink.isSecret === true || drink.IsSecret === true) return false;

      const name = drink.name || drink.productName || '';
      const drinkCategory = drink.categoryName || drink.CategoryName || '';
      const isHidden = drink.isHidden === true || drink.isSecret === true || drinkCategory.toLowerCase() === 'secret menu';

      // 1. Loyalty Check: Hidden items only for Coffee Lovers
      if (isHidden && !isCoffeeLover) return false;

      // 2. Search Filter
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // 3. Category Filter
      if (activeCategory !== 'All' && drinkCategory.toLowerCase() !== activeCategory.toLowerCase()) return false;

      return true;
    });
  }, [drinks, searchQuery, isCoffeeLover, activeCategory]);

  const handleAddClick = (drink) => {
    // Gamification: Award 10 points for every "Add to Order" action
    setUserPoints(prev => prev + 10);

    const drinkCategory = drink.categoryName || drink.CategoryName || '';
    if (drinkCategory === 'Trà & Trà Sữa') {
      setSelectedDrink(drink);
      setIsModalOpen(true);
    } else {
      addToCart(drink);
      showToast(`${drink.name || drink.productName} added to cart!`);
    }
  };

  const handleCustomAddToCart = (customizedItem) => {
    addToCart(customizedItem);
    const size = customizedItem.customization?.size || 'M';
    const ice = customizedItem.customization?.ice || '100%';
    showToast(`${customizedItem.name} (Size ${size}, ${ice} Đá) added to cart!`);
  };

  const handleQuestClick = () => {
    if (isQuestCompleted || !currentQuest) return;

    // Find target product in drinks
    const foundDrink = drinks.find(d => {
      const name = d.productName || d.name || '';
      return name.toLowerCase() === currentQuest.targetProduct.toLowerCase();
    });

    if (foundDrink) {
      const productName = foundDrink.productName || foundDrink.name || '';
      const lowerName = productName.toLowerCase();
      const drinkCategory = (foundDrink.categoryName || foundDrink.CategoryName || '').toLowerCase();
      const dbImage = foundDrink.imageUrl || foundDrink.imageURL || foundDrink.ImageURL || foundDrink.image;
      let productImage = dbImage;
      const isSecretItem = foundDrink.isSecret || foundDrink.IsSecret || foundDrink.isHidden || foundDrink.IsHidden || (foundDrink.categoryName || foundDrink.CategoryName) === 'Secret Menu';
      const isSoldOut = foundDrink.isSoldOut || foundDrink.IsSoldOut;

      if (!productImage) {
        if (isSecretItem) {
          productImage = imageMap[productName] || heroImage;
        } else if (lowerName === 'latte nghệ thuật') {
          productImage = "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop";
        } else if (lowerName === 'espresso alchemist') {
          productImage = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop";
        } else if (lowerName.includes('trà đào')) {
          productImage = "https://dayphache.edu.vn/wp-content/uploads/2020/02/tra-dao-da-xay-thom-ngon.jpg";
        } else if (lowerName.includes('latte')) {
          productImage = "https://vinbarista.com/vnt_upload/news/08_2022/latte_la_gi.jpg";
        } else if (lowerName.includes('espresso')) {
          productImage = heroImage;
        } else if (lowerName.includes('cold brew')) {
          productImage = "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop";
        } else if (drinkCategory.includes('bakery') || lowerName.includes('bánh')) {
          productImage = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800';
        } else {
          productImage = imageMap[productName] || heroImage;
        }
      }

      const productToAdd = {
        ...foundDrink,
        id: foundDrink.productId || foundDrink.id,
        imageURL: productImage,
        name: productName,
        isSecret: isSecretItem,
        isSoldOut: isSoldOut
      };
      addToCart(productToAdd);
    } else {
      // Fallback in case the product is not in the db or drinks list
      const mockProduct = {
        id: `quest-${currentQuest.id}`,
        name: currentQuest.targetProduct,
        price: 55000,
        imageUrl: heroImage,
        imageURL: heroImage,
        categoryName: 'Cold Alchemy',
        CategoryName: 'Cold Alchemy',
        description: 'Sản phẩm từ Nhiệm vụ hôm nay.'
      };
      addToCart(mockProduct);
    }

    setUserPoints(prev => prev + currentQuest.xp);
    setIsQuestCompleted(true);
    showToast("Đã nhận nhiệm vụ & Thêm vào giỏ hàng!");
  };

  if (loading) {
    return (
      <div className="bg-surface min-h-screen flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-stone-100 border-t-primary rounded-full animate-spin"></div>
        <p className="font-headline italic text-primary animate-pulse text-xl">Đang pha chế dữ liệu...</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Project Coffee Ritual</p>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body pb-24 animate-in fade-in duration-700">
      {/* Synchronized Header with Navbar */}
      <Navbar
        cartCount={cartCount}
        onCartToggle={() => toggleCart(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <section className="relative h-[397px] w-full overflow-hidden">
          <img
            alt="Barista pouring latte art"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZL711q__PF0H3qMCam55zGEI5UNKjkPq8bVNLXlD79BQLic7supyJ3mdAcw3n0pB-oMa8VgX0Kyg87-j3Hz4J2KgJB06OXuyx8j5frqayMkkirlgE9ORtN9MixgtqFwgwwEDk86Xj4-ESgq8Ggrug1AK2E1VLeqiYYirR1igi97t4AEF07WXXrSqdCXhL47eDjWtdKDt9YKd-fEcw5_rW1xFuc-rZ-Wvjc1z0nYmVLu3IA-VAN1dyOkLRZFEzVAc5kgLBWvl6HF_I"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent"></div>
          <div className="absolute bottom-12 left-0 px-8">
            <h1 className="text-4xl md:text-6xl text-surface font-headline font-bold tracking-tight italic">Handcrafted Drinks</h1>
            <p className="text-surface/90 mt-2 max-w-xs font-body text-sm uppercase tracking-widest font-bold">The Art of the Slow Pour</p>
          </div>
        </section>

        {/* AI Sommelier Section */}
        <section className="mt-12 px-6 max-w-7xl mx-auto">
          <div className="bg-stone-900 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl border border-stone-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <span className="material-symbols-outlined text-primary text-xl">tempest</span>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">AI Sommelier</span>
                </div>
                <h2 className="text-3xl font-headline font-bold text-white italic">Bạn đang cảm thấy thế nào?</h2>
                <p className="text-stone-400 mt-2 font-body text-sm">Để Alchemist gợi ý hương vị hoàn hảo cho tâm trạng của bạn.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { id: 'Bitter', label: 'Đắng', icon: 'coffee' },
                  { id: 'Sweet', label: 'Ngọt', icon: 'ice_cream' },
                  { id: 'Alert', label: 'Tỉnh táo', icon: 'bolt' }
                ].map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setAiMood(aiMood === mood.id ? null : mood.id)}
                    className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-500 font-bold uppercase text-[10px] tracking-widest ${aiMood === mood.id
                      ? 'bg-primary text-white shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                  >
                    <span className="material-symbols-outlined text-lg">{mood.icon}</span>
                    {mood.label}
                    {aiMood === mood.id && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12 items-start">
          {/* Main Menu Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Categories Section */}
            <section className="font-body">
              <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar justify-center lg:justify-start">
                {['All', 'Hot Classics', 'Cold Alchemy', 'Trà & Trà Sữa', 'Bakery & Pastries', ...(isCoffeeLover ? ['Secret Menu'] : [])].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border-2 ${activeCategory === cat
                      ? 'bg-[#4E342E] text-white border-[#4E342E] shadow-lg'
                      : 'bg-white text-[#4E342E] border-outline-variant/10 hover:bg-stone-50'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Dynamic Menu Display */}
            <section className="space-y-16">
              {drinks.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-stone-100 rounded-[3rem]">
                  <p className="text-stone-300 italic">Kho lưu trữ đang trống. Hãy thêm sản phẩm từ SQL.</p>
                </div>
              )}

              {['Hot Classics', 'Cold Alchemy', 'Trà & Trà Sữa', 'Bakery & Pastries', 'Secret Menu'].map((category) => {
                if (category === 'Secret Menu' && !isCoffeeLover) return null;
                const categoryDrinks = filteredDrinks.filter(d => (d.categoryName || d.CategoryName)?.toLowerCase() === category.toLowerCase());
                if (categoryDrinks.length === 0) return null;

                return (
                  <div key={category}>
                    <div className="flex flex-col gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-headline font-bold text-[#4E342E]">{category}</h2>
                        <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
                      </div>
                      {category === 'Secret Menu' && isCoffeeLover && (
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-[1.5rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000 shadow-sm">
                          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-white text-xl">workspace_premium</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-amber-900 leading-tight">Chúc mừng! Bạn đã đủ trình độ để thưởng thức Menu Bí Mật!</p>
                            <p className="text-[10px] text-amber-700/70 uppercase tracking-widest mt-0.5">Mở khóa độc quyền cho Coffee Lover</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`grid grid-cols-1 ${category === 'Cold Alchemy' || category === 'Bakery & Pastries' ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8`}>
                      {categoryDrinks.map((drink) => {
                        const productName = drink.productName || drink.name || '';
                        const lowerName = productName.toLowerCase();
                        const drinkCategory = (drink.categoryName || drink.CategoryName || '').toLowerCase();

                        // Priority Image Mapping Logic: SQL Data > Image Map > Default Hero
                        const dbImage = drink.imageUrl || drink.imageURL || drink.ImageURL || drink.image;
                        let productImage = dbImage;

                        const isSecretItem = drink.isSecret || drink.IsSecret || drink.isHidden || drink.IsHidden || (drink.categoryName || drink.CategoryName) === 'Secret Menu';

                        if (!productImage) {
                          if (isSecretItem) {
                            // Use default or fallback
                            productImage = imageMap[productName] || heroImage;
                          } else if (lowerName === 'latte nghệ thuật') {
                            productImage = "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop";
                          } else if (lowerName === 'espresso alchemist') {
                            productImage = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop";
                          } else if (lowerName.includes('trà đào')) {
                            productImage = "https://dayphache.edu.vn/wp-content/uploads/2020/02/tra-dao-da-xay-thom-ngon.jpg";
                          } else if (lowerName.includes('latte')) {
                            productImage = "https://vinbarista.com/vnt_upload/news/08_2022/latte_la_gi.jpg";
                          } else if (lowerName.includes('espresso')) {
                            productImage = heroImage;
                          } else if (lowerName.includes('cold brew')) {
                            productImage = "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop";
                          } else if (drinkCategory.includes('bakery') || lowerName.includes('bánh')) {
                            productImage = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800';
                          } else {
                            productImage = imageMap[productName] || heroImage;
                          }
                        }

                        const isRecommended = aiMood && (
                          (aiMood === 'Bitter' && (lowerName.includes('espresso') || lowerName.includes('cold brew') || lowerName.includes('macchiato'))) ||
                          (aiMood === 'Sweet' && (lowerName.includes('latte') || lowerName.includes('pastry') || lowerName.includes('bánh') || lowerName.includes('vanilla') || lowerName.includes('croissant'))) ||
                          (aiMood === 'Alert' && (lowerName.includes('espresso') || lowerName.includes('cold brew') || lowerName.includes('nitro')))
                        );


                        const isLocked = isSecretItem && !isCoffeeLover;
                        const isSoldOut = drink.isSoldOut || drink.IsSoldOut;

                        if (isLocked) {
                          return (
                            <div
                              key={drink.productId || drink.id}
                              className="flex gap-6 p-6 rounded-[2.5rem] bg-stone-100/50 border-2 border-dashed border-stone-200 relative overflow-hidden group/locked"
                            >
                              <div className="w-28 h-28 shrink-0 overflow-hidden rounded-2xl bg-stone-200/50 flex items-center justify-center relative">
                                <span className="material-symbols-outlined text-4xl text-stone-400 group-hover/locked:scale-110 transition-transform">lock</span>
                                <div className="absolute inset-0 bg-stone-200/20 backdrop-blur-[2px]"></div>
                              </div>
                              <div className="flex flex-col justify-center flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-headline font-bold text-stone-400">{productName}</h3>
                                  <span className="text-[10px] bg-stone-200 text-stone-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Locked</span>
                                </div>
                                <p className="text-sm text-stone-500 italic font-body">Mua 5 món để mở khóa Menu Bí Mật</p>
                                <div className="mt-4 flex items-center gap-2">
                                  <div className="h-1.5 w-24 bg-stone-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-stone-300 w-3/5"></div>
                                  </div>
                                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">3/5 Orders</span>
                                </div>
                              </div>
                              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                                <span className="material-symbols-outlined text-8xl">visibility_off</span>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={drink.productId || drink.id}
                            className={`flex gap-6 group transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] p-4 rounded-[2rem] bg-white hover:shadow-2xl border transition-all duration-700 ${isRecommended
                              ? 'border-primary ring-2 ring-primary/20 shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)] relative scale-[1.03] z-10'
                              : 'border-outline-variant/10'
                              } ${isSecretItem ? 'border-amber-200 bg-gradient-to-br from-white to-amber-50/30' : ''} ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}
                          >
                            {isRecommended && (
                              <div className="absolute -top-4 -left-4 bg-primary text-white px-4 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg animate-bounce z-20 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                                Perfect Match
                              </div>
                            )}
                            <div className="w-28 h-28 shrink-0 overflow-hidden rounded-2xl bg-surface-container-low shadow-inner relative">
                              <img
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                                alt={productName}
                                src={productImage}
                                onError={(e) => { e.target.src = heroImage; }}


                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                              {isLocked && (
                                <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                  <span className="material-symbols-outlined text-4xl mb-2">lock</span>
                                  <span className="text-[10px] font-bold uppercase tracking-widest">Locked</span>
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                              <div className="flex flex-col gap-2">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                                  <h3 className={`text-xl font-headline font-bold ${isSecretItem ? 'text-amber-900' : 'text-[#4E342E]'}`}>{productName}</h3>
                                  <span className="text-sm font-label font-bold text-[#4E342E] opacity-70 whitespace-nowrap">{new Intl.NumberFormat('vi-VN').format(drink.price)}đ</span>
                                </div>
                                <p className="text-sm text-[#4E342E]/60 mt-1 italic leading-relaxed font-light font-body">{drink.description || 'Hương vị tuyệt hảo từ Alchemist.'}</p>
                              </div>

                              {isLocked ? (
                                <div className="mt-4 flex items-center gap-2 text-stone-500">
                                  <span className="material-symbols-outlined text-sm">info</span>
                                  <span className="text-[10px] font-bold uppercase tracking-widest">Mua 5 món để mở khóa</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleAddClick({ ...drink, id: drink.productId || drink.id, imageURL: productImage, name: productName, isSecret: isSecretItem, isSoldOut: isSoldOut })}
                                  className={`text-xs font-bold uppercase tracking-[0.2em] text-[#4E342E] flex items-center gap-2 mt-4 hover:gap-3 transition-all ${isSoldOut ? 'text-stone-300' : ''} ${isSecretItem ? 'text-amber-700' : ''}`}
                                >
                                  {isSoldOut ? 'Notify Me' : 'Add to Order'}
                                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </section>

            {isSecretMenuUnlocked && (
              <SecretMenu onAddClick={handleAddClick} />
            )}
          </div>

          {/* Sidebar for MemberCard & Stats */}
          <aside className="space-y-12 sticky top-32 hidden lg:block">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-4">
                <span className="material-symbols-outlined text-primary text-sm">stars</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">Your Rewards</span>
              </div>
              <MemberCard userPoints={userPoints} totalOrders={totalOrders} />
            </div>

            {/* Daily Quest Section */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-[2rem] p-6 border border-yellow-500/20 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 blur-2xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-yellow-400 text-lg animate-bounce">rocket_launch</span>
                <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Nhiệm vụ hôm nay</h4>
              </div>

              <div className="space-y-4">
                {currentQuest && (
                  <div
                    onClick={handleQuestClick}
                    className={`p-4 bg-white/5 rounded-xl border border-white/5 transition-colors ${
                      isQuestCompleted
                        ? 'cursor-default'
                        : 'cursor-pointer hover:bg-white/10 group/item'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-stone-300 font-bold leading-tight">
                        {isQuestCompleted ? `Đã hoàn thành! +${currentQuest.xp}XP` : currentQuest.title}
                      </p>
                      {!isQuestCompleted && (
                        <span className="text-[8px] font-black text-yellow-400">{currentQuest.xp}XP</span>
                      )}
                    </div>
                    <div className="h-1 w-full bg-stone-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-yellow-400 transition-all duration-700 ${
                          isQuestCompleted ? 'w-full' : 'w-1/3 group-hover/item:w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats or Promo */}
            <div className="bg-stone-50 rounded-[2rem] p-6 border border-stone-100">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-widest mb-4">Daily Ritual</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Món uống yêu thích</span>
                  <span className="font-bold text-primary italic">Latte Alchemist</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Số lần ghé thăm</span>
                  <span className="font-bold text-primary italic">12</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Nav Bar - Consistent with other pages */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/90 backdrop-blur-md rounded-t-[1.5rem] border-t border-outline-variant/15 shadow-xl max-w-lg mx-auto left-1/2 -translate-x-1/2 md:hidden">
        <Link to="/menu" className={`flex flex-col items-center justify-center rounded-xl px-6 py-1.5 transition-all ${location.pathname === '/menu' ? 'bg-[#4E342E] text-white' : 'text-[#4E342E]/60 hover:text-primary'}`}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_cafe</span>
          <span className="font-body uppercase tracking-[0.1em] text-[10px] font-bold mt-0.5">Menu</span>
        </Link>
        <Link to="/shop" className="flex flex-col items-center justify-center text-[#4E342E]/60 hover:text-primary transition-opacity">
          <span className="material-symbols-outlined text-[20px]">grain</span>
          <span className="font-body uppercase tracking-[0.1em] text-[10px] font-bold mt-0.5">Beans</span>
        </Link>
        <Link to="/brewing-gear" className="flex flex-col items-center justify-center text-[#4E342E]/60 hover:text-primary transition-opacity">
          <span className="material-symbols-outlined text-[20px]">coffee_maker</span>
          <span className="font-body uppercase tracking-[0.1em] text-[10px] font-bold mt-0.5">Gear</span>
        </Link>
        <Link to="/journal" className={`flex flex-col items-center justify-center rounded-xl px-6 py-1.5 transition-all ${location.pathname === '/journal' ? 'bg-[#4E342E] text-white' : 'text-[#4E342E]/60 hover:text-primary'}`}>
          <span className="material-symbols-outlined text-[20px]">auto_stories</span>
          <span className="font-body uppercase tracking-[0.1em] text-[10px] font-bold mt-0.5">Journal</span>
        </Link>
      </nav>

      <DrinkCustomizationModal
        product={selectedDrink}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleCustomAddToCart}
      />
    </div>
  );
};

export default DrinkMenu;
