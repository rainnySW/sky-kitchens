import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const setUser = useAppStore(state => state.setUser);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const payload = isLogin 
        ? { identifier: formData.email || formData.username, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (res.ok) {
        setUser(data.user);
        navigate('/');
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-3xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-3xl font-serif text-center gold-gradient-text mb-8">
          {isLogin ? 'Welcome Back' : 'Join High Society'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input 
                type="text" 
                required
                className="w-full bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400"
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm mb-1">{isLogin ? 'Email or Username' : 'Email'}</label>
            <input 
              type={isLogin ? 'text' : 'email'} 
              required
              className="w-full bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="gold-button mt-4">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-gold-500 hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
