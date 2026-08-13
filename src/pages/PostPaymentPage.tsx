import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { CheckCircle2, Receipt } from 'lucide-react';

const PostPaymentPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const clearCart = useAppStore(state => state.clearCart);
  
  const [printing, setPrinting] = useState(true);
  const tableNumber = location.state?.tableNumber || Math.floor(Math.random() * 20) + 1;
  const queueNumber = `Q-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  useEffect(() => {
    // Clear cart upon successful payment processing view
    clearCart();

    const timer = setTimeout(() => {
      setPrinting(false);
    }, 3000); // 3 second printing animation

    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      {printing ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Receipt size={64} className="text-gold-500" />
          </motion.div>
          <h2 className="text-2xl font-serif animate-pulse">{t('printing_slip')}</h2>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="glass-panel p-10 rounded-3xl shadow-2xl text-center max-w-md w-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-400 to-gold-600" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-3xl font-serif mb-2">{t('order_confirmed')}</h1>
          <p className="text-gray-500 mb-8">Thank you for dining with Sky Thai</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/10">
              <p className="text-sm text-gray-500 mb-1">{t('table_number')}</p>
              <p className="text-2xl font-bold text-gold-500">{tableNumber}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/10">
              <p className="text-sm text-gray-500 mb-1">{t('queue_number')}</p>
              <p className="text-2xl font-bold text-gold-500">{queueNumber}</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="w-full border border-gold-400 text-gold-500 py-3 rounded-full hover:bg-gold-400 hover:text-navy-900 transition"
          >
            Return to {t('home')}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PostPaymentPage;
