import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.terms) {
      setError("You must agree to the Terms of Service.");
      return;
    }

    const result = register({ 
      email: formData.email, 
      password: formData.password, 
      fullName: formData.fullName,
      role: formData.role
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
    } else {
      setError(result.message);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-12 rounded-2xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <span className="material-symbols-outlined text-4xl text-stone-800">done_all</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">Journey Begun!</h2>
          <p className="text-stone-500 mb-8 leading-relaxed">Your account for <strong>{formData.email}</strong> has been created. Redirecting you to the login ritual...</p>
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-stone-800 animate-progress origin-left"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 -mt-32 -mx-6 md:-mx-12 min-h-screen">
      {/* Visual Side (Left) */}
      <div className="hidden lg:block relative overflow-hidden">
        <img 
          alt="Freshly roasted coffee beans" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCemSWHN8eClzp5eppycolnwovAMv95Vx-L86rpFPRGHnXSNZvKyalkWFcWWxWz6P5yzKvNW6EGHyQQjaAvT5YNryYn00po3oH_arVdtWPbgzz7RfJqw8M6ftzGNh8QoIVe-kdkKo72diJTVrH1LaVXSXCQsQs0Eq2-hS46-S-hc0vfFvmiFLEYC4pka83y_n3RD1ClSUKWqLXbcEKXeFG6wrgQjXrBK1Xk_Qw_mK0k9rwDdRC_ncXzL3r3VWNYJ6wR3Ok8UOLlXCg"
        />
        <div className="absolute inset-0 bg-stone-900/40 backdrop-brightness-75"></div>
        <div className="absolute bottom-24 left-16 right-16 z-10 text-white">
          <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">Elevate your daily coffee ritual.</h2>
          <p className="text-xl opacity-90 max-w-md font-light tracking-wide leading-relaxed">
            Join our community of coffee enthusiasts and discover the art of the perfect brew through exclusive guides.
          </p>
        </div>
      </div>

      {/* Form Side (Right) */}
      <div className="flex items-center justify-center p-8 md:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-12">
          <div className="mb-12">
            <Link to="/" className="inline-block mb-8">
              <span className="font-serif text-3xl font-bold italic text-stone-800">Roast & Ritual</span>
            </Link>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-3">Begin Your Journey</h1>
            <p className="text-stone-500 font-medium">Create an account to explore our curated collections.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100 flex items-center gap-3">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 ml-1" htmlFor="fullName">Full Name</label>
              <input 
                className="w-full px-5 py-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-stone-800 transition-all duration-200 placeholder-stone-300 font-medium outline-none" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Alexander Sterling" 
                required 
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 ml-1" htmlFor="email">Email Address</label>
              <input 
                className="w-full px-5 py-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-stone-800 transition-all duration-200 placeholder-stone-300 font-medium outline-none" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="alexander@ritual.com" 
                required 
                type="email"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 ml-1" htmlFor="password">Password</label>
                <input 
                  className="w-full px-5 py-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-stone-800 transition-all duration-200 outline-none" 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  required 
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 ml-1" htmlFor="confirmPassword">Confirm</label>
                <input 
                  className="w-full px-5 py-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-stone-800 transition-all duration-200 outline-none" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  required 
                  type="password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 ml-1">Account Type</label>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, role: 'user'})}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${formData.role === 'user' ? 'bg-stone-800 text-white shadow-lg' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'}`}
                >
                  User
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, role: 'admin'})}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${formData.role === 'admin' ? 'bg-stone-800 text-white shadow-lg' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'}`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <div className="flex items-center h-5">
                <input 
                  className="h-5 w-5 rounded-md border-stone-200 text-stone-800 focus:ring-stone-800 bg-stone-50 transition-all cursor-pointer" 
                  id="terms" 
                  name="terms" 
                  checked={formData.terms}
                  onChange={handleChange}
                  required 
                  type="checkbox"
                />
              </div>
              <div className="text-sm">
                <label className="text-stone-500 font-medium cursor-pointer" htmlFor="terms">
                  I agree to the <a className="text-stone-900 font-bold hover:underline" href="#">Terms of Service</a> and <a className="text-stone-900 font-bold hover:underline" href="#">Privacy Policy</a>.
                </label>
              </div>
            </div>

            <button 
              className="w-full bg-stone-800 text-white py-5 px-6 rounded-xl font-bold tracking-widest shadow-xl hover:bg-stone-700 active:scale-[0.98] transition-all duration-300 uppercase text-xs" 
              type="submit"
            >
              Create Account
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-stone-100 text-center">
            <p className="text-stone-500 font-medium">
              Already have a ritual? 
              <Link className="text-stone-900 font-bold ml-2 hover:underline" to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;