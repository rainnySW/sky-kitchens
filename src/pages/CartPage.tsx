
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useAppStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 text-center flex flex-col items-center justify-center h-[70vh]">
        <ShoppingBag size={80} className="text-gray-300 dark:text-gray-700 mb-6" />
        <h2 className="text-2xl text-gray-500 font-serif">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl text-center mb-10 gold-gradient-text">{t('cart')}</h1>
      
      <div className="glass-panel p-6 rounded-3xl shadow-xl">
        <ul className="divide-y divide-gray-200 dark:divide-white/10">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-serif text-lg">{t(item.name)}</h3>
                    {item.option && (
                      <div className="flex gap-2 mb-1">
                        <span className="text-xs bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-full text-gray-500 dark:text-gray-400">
                          {item.option}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="font-semibold text-gold-500">฿{item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 p-2">
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif">
            Total: <span className="text-gold-500">฿{total}</span>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <button 
              onClick={clearCart}
              className="flex-1 md:flex-none py-3 px-6 rounded-full border border-red-400 text-red-500 hover:bg-red-400 hover:text-white transition"
            >
              {t('clear_cart')}
            </button>
            <button 
              onClick={() => navigate('/payment')}
              className="flex-1 md:flex-none gold-button"
            >
              {t('confirm_order')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
