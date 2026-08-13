import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from './store';
import { Moon, Sun, Globe, ShoppingCart, Home, Menu as MenuIcon, UtensilsCrossed } from 'lucide-react';
import HomePage from './pages/HomePage';
import OurMenuPage from './pages/OurMenuPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import PostPaymentPage from './pages/PostPaymentPage';

function App() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, language, setLanguage, cart } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(language === 'th' ? 'en' : 'th');

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
        <header className="sticky top-0 z-50 glass-panel border-b border-gray-200 dark:border-white/10 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 text-navy-900 dark:text-gold-400 hover:text-gold-600 dark:hover:text-yellow-300 hover:scale-105 transition-all duration-300">
            <UtensilsCrossed size={32} strokeWidth={1.5} />
            <span className="hidden md:block font-serif text-xl tracking-[0.2em] uppercase font-bold text-gold-600 dark:text-gold-500">SKY</span>
          </Link>

          {/* Premium Centered Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-12 font-serif text-lg">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gold-500 transition tracking-wider uppercase text-sm">{t('home')}</Link>
            <Link to="/menu" className="text-gray-600 dark:text-gray-300 hover:text-gold-500 transition tracking-wider uppercase text-sm">{t('menu')}</Link>
          </nav>

          <div className="flex items-center gap-1 md:gap-3">
            <Link to="/cart" className="hidden md:flex relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition text-navy-900 dark:text-gold-400">
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-sans font-bold shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <div className="w-px h-6 bg-gray-300 dark:bg-white/20 mx-1 hidden md:block"></div>

            <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition">
              <Globe size={20} className="text-navy-900 dark:text-gold-400" />
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition">
              {theme === 'dark' ? <Sun size={20} className="text-gold-400" /> : <Moon size={20} className="text-navy-900" />}
            </button>
          </div>
        </header>

        <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<OurMenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/post-payment" element={<PostPaymentPage />} />
          </Routes>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-gray-200 dark:border-white/10 flex justify-around p-3 pb-safe z-50">
          <Link to="/" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400 hover:text-gold-500 dark:hover:text-gold-400">
            <Home size={24} />
          </Link>
          <Link to="/menu" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400 hover:text-gold-500 dark:hover:text-gold-400">
            <MenuIcon size={24} />
          </Link>
          <Link to="/cart" className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400 hover:text-gold-500 dark:hover:text-gold-400 relative">
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;
