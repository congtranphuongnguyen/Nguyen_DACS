import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { orders } = useOrders();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || ''
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: currentUser?.fullName || 'Julian Vance',
      street: '482 Editorial Lane, Suite 400',
      city: 'Portland',
      state: 'OR',
      zip: '97205',
      country: 'United States',
      label: 'Home Office',
      isPrimary: true
    }
  ]);
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zip: '', label: 'Home' });

  const handleEditProfile = () => {
    if (isEditing) {
      // Save logic (local only as requested)
      setIsEditing(false);
      alert('Profile updated successfully!');
    } else {
      setIsEditing(true);
    }
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const address = {
      id: Date.now(),
      name: profileData.fullName,
      ...newAddress,
      country: 'United States',
      isPrimary: false
    };
    setAddresses([...addresses, address]);
    setShowAddressForm(false);
    setNewAddress({ street: '', city: '', state: '', zip: '', label: 'Home' });
  };

  const handleSecuritySettings = () => {
    alert('Security settings are currently unavailable in this demo.');
  };

  // Points tracking
  const currentPoints = 840;
  const targetPoints = 1000;
  const progressPercentage = (currentPoints / targetPoints) * 100;

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="mb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4 block">Member Since 2024</p>
        <h1 className="text-6xl font-headline font-bold tracking-tight text-stone-800">
          Welcome back, <span className="italic font-light">{profileData.fullName.split(' ')[0] || 'Julian'}</span>.
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Sidebar: Account Stats & Details */}
        <aside className="lg:col-span-4 space-y-10">
          <div className="bg-stone-50 p-10 rounded-2xl border border-stone-100 shadow-sm transition-all duration-300">
            <h2 className="text-2xl font-headline font-bold mb-8 text-stone-800">Account Details</h2>
            <div className="space-y-8">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1 block">Full Name</label>
                    <input 
                      type="text" 
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      className="w-full bg-white border border-stone-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1 block">Email Address</label>
                    <input 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full bg-white border border-stone-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Email Address</p>
                    <p className="text-stone-800 font-medium">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Account Role</p>
                    <span className={`inline-flex items-center gap-2 py-1.5 px-4 mt-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${currentUser?.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'}`}>
                      <span className="material-symbols-outlined text-xs">
                        {currentUser?.role === 'admin' ? 'admin_panel_settings' : 'person'}
                      </span>
                      {currentUser?.role === 'admin' ? 'Administrator' : 'Standard User'}
                    </span>
                  </div>
                  <div className="mt-6">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Subscription Status</p>
                    <span className="inline-flex items-center gap-2 py-1.5 px-4 mt-2 rounded-full bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest">
                      <span className="material-symbols-outlined text-xs">eco</span>
                      Active Member
                    </span>
                  </div>
                </>
              )}
            </div>
            <button 
              onClick={handleEditProfile}
              className={`mt-10 w-full py-4 font-bold rounded-lg transition-all text-xs tracking-[0.2em] uppercase ${
                isEditing ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-white border border-stone-200 text-stone-800 hover:bg-stone-50'
              }`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button 
                onClick={() => setIsEditing(false)}
                className="mt-4 w-full py-2 text-stone-400 font-bold text-[10px] uppercase tracking-widest hover:text-stone-800 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="bg-stone-900 p-10 rounded-2xl shadow-xl overflow-hidden relative group">
            <div className="relative z-10 text-white">
              <h2 className="text-2xl font-headline font-bold mb-8 text-stone-50">Coffee Rewards</h2>
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-bold text-white tracking-tighter">{currentPoints}</span>
                <span className="text-xl italic font-light text-stone-400">grains</span>
              </div>
              <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-stone-100 transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="mt-4 text-sm text-stone-400 leading-relaxed font-light">
                You're {targetPoints - currentPoints} grains away from a complimentary single-origin bag.
              </p>
              <button className="inline-block mt-8 text-xs font-bold border-b border-white/30 text-white pb-1 tracking-[0.2em] uppercase hover:border-white transition-all">
                Explore Rewards
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[200px] text-white">coffee</span>
            </div>
          </div>
        </aside>

        {/* Main Content: Orders & Addresses */}
        <div className="lg:col-span-8 space-y-20">
            <div className="pt-8 bg-stone-50 rounded-2xl border border-stone-100 p-8">
              <h3 className="text-xl font-headline font-bold text-stone-800 mb-2">Order History</h3>
              <p className="text-sm text-stone-500 mb-6 font-light">View and track your previous rituals.</p>
              <Link to="/my-orders" className="inline-block px-8 py-3 bg-stone-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all">
                View My Orders
              </Link>
            </div>

          {/* Saved Addresses */}
          <section>
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-4xl font-headline font-bold text-stone-800 tracking-tight">Saved Addresses</h2>
              <button 
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-stone-800 transition-colors uppercase tracking-widest"
              >
                <span className="material-symbols-outlined text-lg text-stone-300">
                  {showAddressForm ? 'close' : 'add_circle'}
                </span>
                {showAddressForm ? 'Cancel' : 'Add New'}
              </button>
            </div>
            
            {showAddressForm && (
              <div className="mb-12 p-8 bg-stone-100 rounded-2xl border border-stone-200 animate-in slide-in-from-top duration-300">
                <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2 block">Street Address</label>
                    <input 
                      required
                      type="text" 
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                      className="w-full bg-white border border-stone-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-stone-400"
                      placeholder="e.g. 123 Coffee Lane"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2 block">City</label>
                    <input 
                      required
                      type="text" 
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      className="w-full bg-white border border-stone-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2 block">State / Zip</label>
                    <div className="flex gap-2">
                    <input 
                      required
                      type="text" 
                      placeholder="OR"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      className="w-1/3 bg-white border border-stone-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                    <input 
                      required
                      type="text" 
                      placeholder="97205"
                      value={newAddress.zip}
                      onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                      className="w-2/3 bg-white border border-stone-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full py-4 bg-stone-900 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-stone-800 transition-all">
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-10 bg-stone-50 rounded-2xl border border-stone-800/10 flex flex-col h-full group hover:border-stone-800/30 transition-all">
                  <div className="flex justify-between items-start mb-8">
                    {addr.isPrimary && (
                      <span className="bg-stone-900 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">Primary</span>
                    )}
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                      <button className="material-symbols-outlined text-stone-400 hover:text-stone-800 text-xl">edit</button>
                      <button 
                        onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}
                        className="material-symbols-outlined text-stone-400 hover:text-red-500 text-xl"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-stone-800 text-lg mb-2">{addr.name}</h3>
                  <p className="text-stone-500 text-sm leading-[1.8] mb-10 font-light">
                    {addr.street}<br/>
                    {addr.city}, {addr.state} {addr.zip}<br/>
                    {addr.country}
                  </p>
                  <div className="mt-auto pt-6 border-t border-stone-200 flex items-center gap-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">home</span>
                    {addr.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Profile Management CTA */}
          <div className="pt-16 border-t border-stone-100 flex flex-col md:flex-row gap-8 md:items-center justify-between">
            <div>
              <h4 className="text-2xl font-headline font-bold text-stone-800">Privacy & Security</h4>
              <p className="text-sm text-stone-500 font-light mt-2">Update your ritual credentials or manage linked accounts.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleSecuritySettings}
                className="px-8 py-4 bg-stone-100 text-stone-800 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-stone-200 transition-all shadow-sm"
              >
                Security Settings
              </button>
              <button 
                onClick={logout}
                className="px-8 py-4 bg-stone-100 text-stone-800 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm border border-transparent hover:border-red-100"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

