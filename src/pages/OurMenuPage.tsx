import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { Plus, Minus, X, Check } from 'lucide-react';

const sizeOptions = [
  { label: 'Regular', extra: 0 },
  { label: 'Large', extra: 10 },
  { label: 'Extra Large', extra: 20 }
];

const instructionOptions = [
  'Less Spicy', 
  'Extra Spicy', 
  'No MSG', 
  'No Veggies', 
  'Extra Meat',
  'No Peanuts'
];

const OurMenuPage = () => {
  const { t } = useTranslation();
  const [menu, setMenu] = useState([]);
  
  // Modal State
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [selectedInstructions, setSelectedInstructions] = useState<string[]>([]);
  
  const addToCart = useAppStore(state => state.addToCart);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(console.error);
  }, []);

  const handleOpenModal = (item: any) => {
    setSelectedFood(item);
    setQuantity(1);
    setSizeIdx(0);
    setSelectedInstructions([]);
  };

  const toggleInstruction = (inst: string) => {
    setSelectedInstructions(prev => 
      prev.includes(inst) 
        ? prev.filter(i => i !== inst) 
        : [...prev, inst]
    );
  };

  const handleAddToCart = () => {
    if (selectedFood) {
      const finalPrice = selectedFood.price + sizeOptions[sizeIdx].extra;
      const instructionText = selectedInstructions.join(', ');
      const finalOption = `Size: ${sizeOptions[sizeIdx].label}${instructionText ? ` | Note: ${instructionText}` : ''}`;
      
      addToCart({ 
        ...selectedFood, 
        price: finalPrice,
        quantity, 
        option: finalOption 
      });
      setSelectedFood(null);
    }
  };

  const currentItemTotal = selectedFood ? (selectedFood.price + sizeOptions[sizeIdx].extra) * quantity : 0;

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl text-center mb-16 gold-gradient-text"
      >
        {t('menu')}
      </motion.h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {menu.map((item: any, idx: number) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
            onClick={() => handleOpenModal(item)}
          >
            <div className="h-32 md:h-48 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-gold-400 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                {t(item.category)}
              </div>
            </div>
            <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm md:text-lg font-serif mb-1 md:mb-2 line-clamp-2">{t(item.name)}</h3>
                <p className="text-base md:text-xl text-gold-500 font-semibold">฿{item.price}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedFood && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedFood(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-navy-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-50"
            >
              <div className="h-48 relative">
                <img src={selectedFood.image} alt={t(selectedFood.name)} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedFood(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-serif mb-2">{t(selectedFood.name)}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{selectedFood.description}</p>

                {/* Size Options */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">{t('Select Size')}</label>
                  <div className="flex gap-2">
                    {sizeOptions.map((size, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSizeIdx(idx)}
                        className={`flex-1 py-2 text-sm rounded-xl border transition-all ${
                          sizeIdx === idx 
                            ? 'border-gold-400 bg-gold-400/10 text-gold-500 font-semibold shadow-sm' 
                            : 'border-gray-200 dark:border-white/10 text-gray-500 hover:border-gold-400/50'
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <span>{t(size.label)}</span>
                          {size.extra > 0 && <span className="text-xs opacity-70">+฿{size.extra}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Boolean Special Instructions */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">{t('Special Instructions')}</label>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {instructionOptions.map((inst, idx) => {
                      const isActive = selectedInstructions.includes(inst);
                      return (
                        <button 
                          key={idx}
                          onClick={() => toggleInstruction(inst)}
                          className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-xl border transition-all ${
                            isActive 
                              ? 'border-gold-400 bg-gold-400/10 text-gold-500 font-medium' 
                              : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-gold-400/50'
                          }`}
                        >
                          <span>{t(inst)}</span>
                          {isActive && <Check size={16} className="text-gold-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-8 py-4 border-t border-gray-100 dark:border-white/5">
                  <span className="font-medium">{t('Quantity')}</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-xl font-semibold w-6 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full gold-button flex items-center justify-center gap-2 text-lg"
                >
                  <Plus size={20} /> {t('add_to_cart')} - ฿{currentItemTotal}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurMenuPage;
