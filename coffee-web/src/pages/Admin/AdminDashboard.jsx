import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { products as initialProducts } from '../../products';
import { api } from '../../api';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { orders, updateStatus } = useOrders();
  const [activeTab, setActiveTab] = useState('products');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    imageURL: '',
    description: '',
    roast: 'Medium Roast',
    region: 'N/A',
    category: 'beans',
    isHidden: false
  });

  const handleQuickImageUpdate = async (id, newImageURL) => {
    const product = products.find(p => (p.productId || p.id) === id);
    if (!product) return;
    
    try {
      const updatedProduct = { 
        ...product, 
        imageURL: newImageURL,
        productId: product.productId || product.id,
        productName: product.productName || product.name
      };
      await api.updateProduct(id, updatedProduct);
      setProducts(products.map(p => (p.productId || p.id) === id ? { ...p, imageURL: newImageURL } : p));
      alert("Cập nhật ảnh thành công!");
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.productName || product.name,
        price: product.price,
        imageURL: product.ImageURL || product.imageURL || product.imageUrl || product.image,
        description: product.description,
        roast: product.roast || 'Medium Roast',
        region: product.region || 'N/A',
        category: product.category || 'beans',
        isHidden: product.isHidden || false
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        image: '',
        description: '',
        roast: 'Medium Roast',
        region: 'N/A',
        category: 'beans'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productId = editingProduct?.productId || editingProduct?.id;
    try {
      if (editingProduct) {
        const payload = {
          productId: productId,
          productName: formData.name,
          price: parseFloat(formData.price),
          imageURL: formData.imageURL,
          category: formData.category,
          description: formData.description,
          isHidden: formData.isHidden
        };
        const result = await api.updateProduct(productId, payload);
        
        // Refresh product list from SQL to ensure sync
        const freshData = await api.getProducts();
        setProducts(freshData);
        
        handleCloseModal();
      }
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => (p.productId || p.id) !== id));
    }
  };

  // Group orders by date for reports
  const dailyStats = useMemo(() => {
    const stats = {};
    orders.forEach(order => {
      try {
        if (!order.createdAt) return;
        const date = new Date(order.createdAt).toISOString().split('T')[0];
        if (!stats[date]) {
          stats[date] = { count: 0, revenue: 0, orders: [] };
        }
        stats[date].count += 1;
        const price = typeof order.total === 'string' 
          ? parseFloat(order.total.replace(/[^0-9.-]+/g, "")) 
          : order.total;
        stats[date].revenue += isNaN(price) ? 0 : price;
        stats[date].orders.push(order);
      } catch (e) {}
    });
    return Object.entries(stats)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [orders]);

  const downloadReport = (dateData) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Order ID,Customer,Items,Total,Status\n"
      + dateData.orders.map(o => `${dateData.date},${o.id},${o.user},"${o.items}",${o.total},${o.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `report_${dateData.date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Safe filtered orders calculation
  const filteredOrders = orders.filter(order => {
    if (!order.createdAt) return false;
    try {
      const d = new Date(order.createdAt);
      if (isNaN(d.getTime())) return false;
      return d.toISOString().split('T')[0] === selectedDate;
    } catch (e) {
      return false;
    }
  }).sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return db - da;
  });

  const [analytics, setAnalytics] = useState({ topToppings: [], alerts: [] });

  useEffect(() => {
    // Analytics call removed to clean console (endpoint not implemented)
  }, [orders]);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 animate-in fade-in duration-700">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Control Center</p>
          <h1 className="text-5xl font-serif font-bold text-stone-900 leading-tight">Admin Dashboard</h1>
        </div>
        <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-white shadow-md text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'products' ? 'bg-white shadow-md text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'orders' ? 'bg-white shadow-md text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'reports' ? 'bg-white shadow-md text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Reports
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'feedback' ? 'bg-white shadow-md text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Feedback
          </button>
        </div>
      </header>

      {activeTab === 'overview' && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
          {/* Operational Alerts Area */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-stone-800 tracking-tight flex items-center gap-3">
              <span className="material-symbols-outlined text-stone-400">notifications_active</span>
              Thông báo vận hành
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analytics.alerts.length > 0 ? analytics.alerts.map(alert => (
                <div key={alert.id} className={`p-6 rounded-[2rem] border flex gap-5 items-start transition-all hover:shadow-lg ${
                  alert.type === 'warning' 
                    ? 'bg-amber-50/50 border-amber-100 text-amber-900' 
                    : 'bg-blue-50/50 border-blue-100 text-blue-900'
                }`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    alert.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="material-symbols-outlined">{alert.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">{alert.title}</h4>
                    <p className="text-sm opacity-80 leading-relaxed font-medium">{alert.message}</p>
                  </div>
                </div>
              )) : (
                <div className="col-span-2 p-12 bg-stone-50 rounded-[2rem] border border-stone-100 text-center">
                  <p className="text-stone-400 italic text-sm">Hệ thống vận hành ổn định. Chưa có cảnh báo mới.</p>
                </div>
              )}
            </div>
          </div>

          {/* Trending Toppings Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-serif font-bold text-stone-800 tracking-tight">Top 3 Topping bán chạy hôm nay</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Real-time Analytics</span>
              </div>
              
              <div className="space-y-8">
                {analytics.topToppings.length > 0 ? analytics.topToppings.map(([name, count], index) => (
                  <div key={name} className="relative">
                    <div className="flex justify-between items-end mb-3">
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'
                        }`}>{index + 1}</span>
                        <span className="font-bold text-stone-800">{name}</span>
                      </div>
                      <span className="text-sm font-bold text-stone-900">{count} lượt chọn</span>
                    </div>
                    <div className="h-3 bg-stone-50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          index === 0 ? 'bg-stone-900' : index === 1 ? 'bg-stone-500' : 'bg-stone-300'
                        }`}
                        style={{ width: `${(count / analytics.topToppings[0][1]) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )) : (
                  <p className="text-stone-400 italic text-center py-10">Chưa có dữ liệu topping trong ngày.</p>
                )}
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-stone-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
              <h3 className="text-xl font-serif font-bold mb-8 italic">Quick Insight</h3>
              <div className="space-y-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-2">Đơn hàng hôm nay</p>
                  <p className="text-4xl font-bold font-headline">{(dailyStats.find(s => s.date === new Date().toISOString().split('T')[0])?.count || 0)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-2">Doanh thu dự tính</p>
                  <p className="text-4xl font-bold font-headline">
                    {new Intl.NumberFormat('vi-VN').format(dailyStats.find(s => s.date === new Date().toISOString().split('T')[0])?.revenue || 0)}đ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'products' && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-stone-800 tracking-tight">Product Catalog</h2>
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-6 py-4 bg-stone-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              New Product
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-stone-150 shadow-md overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/70 border-b border-stone-150">
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-stone-400">Product</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-stone-400">Category</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-stone-400">Price</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-stone-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map(product => {
                  const productId = product.productId || product.id;
                  const hasImageError = imageErrors[productId];
                  const imageUrl = product.imageURL || product.imageUrl || product.image;

                  return (
                    <tr key={productId} className="hover:bg-stone-50/20 transition-colors group">
                      <td className="px-8 py-7 align-middle">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200/60 overflow-hidden shadow-inner flex-shrink-0 flex items-center justify-center text-stone-400">
                            {hasImageError || !imageUrl ? (
                              <span className="material-symbols-outlined text-2xl">local_cafe</span>
                            ) : (
                              <img 
                                src={imageUrl} 
                                alt={product.productName || product.name} 
                                className="w-full h-full object-cover" 
                                onError={() => setImageErrors(prev => ({ ...prev, [productId]: true }))}
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-stone-850 text-sm leading-snug">{product.productName || product.name}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              {product.isHidden && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-bold rounded uppercase">Hidden</span>}
                              {product.roast && product.roast !== 'N/A' && (
                                <p className="text-xs text-stone-400 font-medium">{product.roast}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-7 align-middle">
                        <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-[9px] font-bold uppercase tracking-widest border border-stone-200/30">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-7 align-middle font-semibold text-stone-800 text-xs">
                        {new Intl.NumberFormat('vi-VN').format(parseFloat(product.price))}đ
                      </td>
                      <td className="px-8 py-7 align-middle text-right">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => handleOpenModal(product)}
                            className="p-2 hover:bg-stone-100 rounded-xl text-stone-600 hover:text-stone-900 transition-colors flex items-center justify-center cursor-pointer border border-stone-200/40 hover:border-stone-300"
                            title="Chỉnh sửa"
                          >
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(productId)}
                            className="p-2 hover:bg-red-50 rounded-xl text-stone-400 hover:text-red-600 transition-colors flex items-center justify-center cursor-pointer border border-stone-200/40 hover:border-red-200"
                            title="Xóa"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'orders' && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <h2 className="text-2xl font-serif font-bold text-stone-800 tracking-tight">Daily Manifest</h2>
            <div className="flex flex-wrap items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-100 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-stone-400 text-sm">calendar_month</span>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-xs font-bold uppercase tracking-widest text-stone-800 outline-none cursor-pointer"
                />
              </div>
              <div className="h-4 w-[1px] bg-stone-200 hidden md:block"></div>
              <button 
                onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-md"
              >
                Khởi tạo ngày mới (Today)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/50 border-b border-stone-100">
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Order ID</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Time</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Customer</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Items & Feedback</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Total</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Status</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filteredOrders.map(order => {
                  let formattedTime = "N/A";
                  let isNew = false;
                  try {
                    const orderTime = new Date(order.createdAt);
                    if (!isNaN(orderTime.getTime())) {
                      isNew = (new Date() - orderTime) < 5 * 60 * 1000;
                      formattedTime = orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + orderTime.toLocaleDateString('vi-VN');
                    }
                  } catch (e) {}
                  
                  return (
                    <tr key={order.id} className="hover:bg-stone-50/30 transition-colors group">
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                           <span className="font-bold text-stone-800 text-xs">{order.id}</span>
                           {isNew && (
                             <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[8px] font-black uppercase animate-pulse">New</span>
                           )}
                           {order.flavorNote && (
                             <span className="material-symbols-outlined text-amber-500 text-sm" title="Có ghi chú từ khách">book_5</span>
                           )}
                         </div>
                      </td>
                      <td className="px-8 py-6 text-[10px] font-medium text-stone-500">{formattedTime}</td>
                      <td className="px-8 py-6 text-sm text-stone-600">{order.user}</td>
                      <td className="px-8 py-6 max-w-[250px]">
                        <p className="text-sm text-stone-500 italic truncate mb-1">{order.items}</p>
                        {order.flavorNote && (
                          <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-100/50">
                            <div className="flex items-center gap-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`material-symbols-outlined text-[10px] ${i < order.flavorNote.rating ? 'text-amber-500' : 'text-stone-200'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                              ))}
                            </div>
                            <p className="text-[10px] text-amber-800 font-medium leading-tight">"{order.flavorNote.comment}"</p>
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6 font-medium text-stone-800">{order.total?.toString().includes('đ') ? order.total : new Intl.NumberFormat('vi-VN').format(parseFloat(order.total?.toString().replace(/[^0-9.-]+/g,"") || 0)) + 'đ'}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                          order.status === 'pending' ? 'bg-amber-50 text-amber-600' : 
                          order.status === 'processing' ? 'bg-blue-50 text-blue-600' : 
                          order.status === 'ready' ? 'bg-emerald-50 text-emerald-600 animate-pulse' : 
                          'bg-stone-100 text-stone-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          {order.status === 'pending' && (
                            <button 
                              onClick={() => updateStatus(order.id, 'processing')}
                              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all"
                            >
                              Bắt đầu làm
                            </button>
                          )}
                          {order.status === 'processing' && (
                            <button 
                              onClick={() => updateStatus(order.id, 'ready')}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all"
                            >
                              Đã xong / Mời lấy
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <button 
                              onClick={() => updateStatus(order.id, 'completed')}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all"
                            >
                              Đã nhận hàng
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="py-20 text-center text-stone-400">
                <p className="text-sm italic">Không có đơn hàng nào trong ngày {selectedDate.split('-').reverse().join('/')}.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'reports' && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-stone-800 tracking-tight">Revenue History</h2>
          </div>

          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/50 border-b border-stone-100">
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Date</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Total Orders</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Total Revenue</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400 text-right">Export</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {dailyStats.map(stat => (
                  <tr key={stat.date} className="hover:bg-stone-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-bold text-stone-800">{stat.date.split('-').reverse().join('/')}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold">
                        {stat.count} orders
                      </span>
                    </td>
                    <td className="px-8 py-6 font-medium text-stone-900 text-lg">
                      {new Intl.NumberFormat('vi-VN').format(stat.revenue)}đ
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => downloadReport(stat)}
                        className="flex items-center gap-2 ml-auto px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">download</span>
                        Tải báo cáo
                      </button>
                    </td>
                  </tr>
                ))}
                {dailyStats.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-stone-400 italic">No revenue data available yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'feedback' && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-stone-800 tracking-tight">Phản hồi khách hàng</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Dựa trên Sổ tay Hương vị</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.filter(o => o.flavorNote).length > 0 ? orders.filter(o => o.flavorNote).map(order => (
              <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1">#{order.id} • {order.user.split('@')[0]}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-sm ${i < order.flavorNote.rating ? 'text-amber-500' : 'text-stone-100'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-300 font-medium">{order.date}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <p className="text-xs text-stone-400 uppercase tracking-widest font-bold mb-2">Sản phẩm</p>
                    <p className="text-sm font-bold text-stone-800 line-clamp-1">{order.items}</p>
                  </div>
                  
                  <div className="p-6 bg-amber-50/30 rounded-[2rem] border border-amber-100/50 relative">
                     <span className="material-symbols-outlined absolute -top-3 -left-3 text-amber-200 text-4xl opacity-50">format_quote</span>
                     <p className="text-sm text-amber-900 font-medium leading-relaxed italic relative z-10">"{order.flavorNote.comment}"</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-24 text-center bg-stone-50 rounded-[3rem] border border-stone-100">
                <p className="text-stone-400 italic">Chưa có đánh giá nào từ khách hàng.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-lg bg-stone-900/40 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50" style={{ backdropFilter: 'blur(10px)' }}>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {editingProduct ? 'Refine Product' : 'Create New Offering'}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-full hover:bg-stone-200 flex items-center justify-center transition-colors text-stone-400"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Product Name</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-stone-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-stone-800 outline-none transition-all font-medium"
                    placeholder="e.g. Panama Geisha"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Price (VNĐ)</label>
                  <input 
                    required
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-stone-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-stone-800 outline-none transition-all font-medium"
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Image URL</label>
                <input 
                  required
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleInputChange}
                  className="w-full bg-stone-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-stone-800 outline-none transition-all font-medium"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Roast Level</label>
                  <select 
                    name="roast"
                    value={formData.roast}
                    onChange={handleInputChange}
                    className="w-full bg-stone-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-stone-800 outline-none transition-all font-medium appearance-none"
                  >
                    <option>Light Roast</option>
                    <option>Medium Roast</option>
                    <option>Dark Roast</option>
                    <option>N/A</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-stone-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-stone-800 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="beans">Coffee Beans</option>
                    <option value="gear">Brewing Gear</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Short Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-stone-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-stone-800 outline-none transition-all font-medium resize-none"
                  placeholder="Describe the flavor notes or features..."
                ></textarea>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-400 border border-stone-100 hover:bg-stone-50 transition-all"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-stone-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl active:scale-95"
                >
                  {editingProduct ? 'Save Changes' : 'Launch Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

