import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login({ email, password });
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 -mt-32 -mx-6 md:-mx-12 min-h-screen">
      {/* Visual Side (Left) */}
      <div className="hidden lg:block relative overflow-hidden">
        <img 
          alt="Premium roasted coffee" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCemSWHN8eClzp5eppycolnwovAMv95Vx-L86rpFPRGHnXSNZvKyalkWFcWWxWz6P5yzKvNW6EGHyQQjaAvT5YNryYn00po3oH_arVdtWPbgzz7RfJqw8M6ftzGNh8QoIVe-kdkKo72diJTVrH1LaVXSXCQsQs0Eq2-hS46-S-hc0vfFvmiFLEYC4pka83y_n3RD1ClSUKWqLXbcEKXeFG6wrgQjXrBK1Xk_Qw_mK0k9rwDdRC_ncXzL3r3VWNYJ6wR3Ok8UOLlXCg"
        />
        <div className="absolute inset-0 bg-stone-900/40 backdrop-brightness-75"></div>
        <div className="absolute bottom-24 left-16 right-16 z-10 text-white">
          <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">Welcome back to the Ritual.</h2>
          <p className="text-xl opacity-90 max-w-md font-light tracking-wide leading-relaxed">
            Access your curated collections and continue your journey into the art of brewing.
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
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-3">Sign In</h1>
            <p className="text-stone-500 font-medium">Enter your credentials to access your account.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100 flex items-center gap-3">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 ml-1" htmlFor="email">Email Address</label>
              <input 
                className="w-full px-5 py-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-stone-800 transition-all duration-200 placeholder-stone-300 font-medium outline-none" 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alexander@ritual.com" 
                required 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 ml-1" htmlFor="password">Password</label>
                <a href="#" className="text-[10px] uppercase tracking-wider font-bold text-stone-400 hover:text-stone-800 transition-colors">Forgot?</a>
              </div>
              <input 
                className="w-full px-5 py-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-stone-800 transition-all duration-200 outline-none" 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required 
              />
            </div>
            
            <button 
              className="w-full bg-stone-800 text-white py-5 px-6 rounded-xl font-bold tracking-widest shadow-xl hover:bg-stone-700 active:scale-[0.98] transition-all duration-300 uppercase text-xs" 
              type="submit"
            >
              Sign In
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-stone-100 text-center">
            <p className="text-stone-500 font-medium">
              Don't have a ritual? 
              <Link className="text-stone-900 font-bold ml-2 hover:underline" to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
