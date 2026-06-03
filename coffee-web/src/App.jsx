import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Header from './components/Header/Header';
import Filters from './components/Sidebar/Filters';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import Pagination from './components/Common/Pagination';
import Footer from './components/Footer/Footer';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';
import Brewing from './components/Brewing/Brewing';
import Cart from './components/Cart/Cart';
import CartPage from './components/Cart/CartPage';
import Checkout from './components/Cart/Checkout';
import Home from './Home';
import ScrollToTop from './components/Common/ScrollToTop';
import { UnderConstruction } from './components/Footer/PagePlaceholders';
import BrewingGuides from './pages/BrewingGuides';
import SingleOrigins from './pages/SingleOrigins';
import SignatureBlends from './pages/SignatureBlends';
import BrewingGear from './pages/BrewingGear';
import Subscriptions from './pages/Subscriptions';
import FAQs from './pages/FAQs';
import Shipping from './pages/Shipping';
import Contact from './pages/Contact';
import DrinkMenu from './pages/DrinkMenu';
import Journal from './pages/Journal';
import BrewingMethodDetail from './pages/BrewingMethodDetail';
import AdminDashboard from './pages/Admin/AdminDashboard';
import OrderHistory from './pages/OrderHistory';
import { UIProvider, useUI } from './context/UIContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Toast from './components/Common/Toast';
import AISommelier from './pages/AISommelier';
import CustomizationModal from './components/Products/CustomizationModal';
import AIChatBox from './components/Common/AIChatBox';
import OrderNotificationPopup from './components/Common/OrderNotificationPopup';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppContent() {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedRoasts, setSelectedRoasts] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const { modal } = useUI();
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, toggleCart, cartCount, addToCart } = useCart();

  const handleFilterChange = (type, value) => {
    if (type === 'roast') {
      setSelectedRoasts(prev => 
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (type === 'region') {
      setSelectedRegions(prev => 
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
    setCurrentPage(1); // Reset page on filter change
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRoasts([]);
    setSelectedRegions([]);
    setSortBy('relevance');
    setCurrentPage(1);
  };

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const isHandcraftedPage = location.pathname === '/menu';

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden flex flex-col">
      <ScrollToTop />
      {!isHandcraftedPage && (
        <Navbar 
          cartCount={cartCount}
          onCartToggle={() => toggleCart(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => toggleCart(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <Toast />
      {modal.isOpen && modal.type === 'customization' && (
        <CustomizationModal 
          product={modal.data} 
          onAddToCart={addToCart} 
        />
      )}

      <main className={`${isHandcraftedPage ? 'pt-0' : 'pt-24 md:pt-32'} pb-24 flex-grow w-full`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
              <Header />
              <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
                <Filters 
                  sortBy={sortBy} 
                  onSortChange={setSortBy}
                  selectedRoasts={selectedRoasts}
                  selectedRegions={selectedRegions}
                  onFilterChange={handleFilterChange}
                />
                <div className="flex-1">
                  <ProductList 
                    sortBy={sortBy} 
                    selectedRoasts={selectedRoasts}
                    selectedRegions={selectedRegions}
                    searchQuery={searchQuery}
                    onResetFilters={handleResetFilters}
                    currentPage={currentPage}
                  />
                  <Pagination 
                     currentPage={currentPage}
                     onPageChange={changePage}
                     totalPages={2}
                  />
                </div>
              </div>
            </div>
          } />
          <Route path="/register" element={
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              {isLoggedIn ? <Navigate to="/" /> : <Register />}
            </div>
          } />
          <Route path="/login" element={
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              {isLoggedIn ? <Navigate to="/" /> : <Login />}
            </div>
          } />
          <Route path="/brewing" element={<div className="w-full"><Brewing /></div>} />
          <Route path="/brewing/:methodId" element={<BrewingMethodDetail />} />
          <Route path="/single-origins" element={<SingleOrigins />} />
          <Route path="/signature-blends" element={<SignatureBlends />} />
          <Route path="/brewing-gear" element={<BrewingGear />} />
          <Route path="/brewing-guides" element={<BrewingGuides />} />
          <Route path="/menu" element={<DrinkMenu />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/shipping-policy" element={<Shipping />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/product/:productId" element={<div className="max-w-[1440px] mx-auto px-6 md:px-12"><ProductDetail /></div>} />
          <Route path="/cart" element={<div className="max-w-[1440px] mx-auto px-6 md:px-12"><CartPage items={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} /></div>} />
          <Route path="/checkout" element={<div className="max-w-[1440px] mx-auto px-6 md:px-12"><Checkout items={cart} onClearCart={clearCart} /></div>} />
          <Route path="/sommelier" element={<AISommelier />} />

          <Route path="/profile" element={
            <ProtectedRoute>
              <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <Profile />
              </div>
            </ProtectedRoute>
          } />

          <Route path="/my-orders" element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/*" element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!isHandcraftedPage && <Footer />}
      <AIChatBox />
      <OrderNotificationPopup />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <UIProvider>
          <OrderProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </OrderProvider>
        </UIProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;