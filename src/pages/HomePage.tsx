import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setRecommendations(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-900/60 z-10" />
          <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=2000" 
            alt="Thai Food Hero"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            {t('welcome')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-gold-400 font-light mb-10"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/menu" className="gold-button inline-block text-lg">
              {t('menu')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-16 gold-gradient-text">
          {t('recommendations')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
          {recommendations.map((item: any, idx: number) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="glass-panel rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl hover:shadow-gold-500/20 cursor-pointer transition-shadow"
            >
              <div className="h-40 md:h-64 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
              <div className="p-3 md:p-6 text-center">
                <h3 className="text-sm md:text-xl font-serif mb-1 md:mb-2 line-clamp-2">{t(item.name)}</h3>
                <p className="text-gold-500 font-medium text-sm md:text-base">฿{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
