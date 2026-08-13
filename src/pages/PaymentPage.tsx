import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { QrCode, CreditCard } from 'lucide-react';

const PaymentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [method, setMethod] = useState<'qr' | 'bank'>('qr');
  const [table, setTable] = useState('');

  const handlePayment = () => {
    if (!table) return alert('Please enter your table number');
    // Call API here to create order...
    navigate('/post-payment', { state: { tableNumber: table } });
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto">
      <h1 className="text-4xl text-center mb-10 gold-gradient-text">{t('payment')}</h1>
      
      <div className="glass-panel p-8 rounded-3xl shadow-xl flex flex-col items-center">
        
        <div className="w-full mb-8">
          <label className="block text-sm font-medium mb-2">{t('table_number')} *</label>
          <input 
            type="number"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="w-full bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400"
            placeholder="e.g. 12"
          />
        </div>

        <div className="flex w-full gap-4 mb-10">
          <button 
            onClick={() => setMethod('qr')}
            className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-2xl border transition ${method === 'qr' ? 'border-gold-400 bg-gold-400/10 text-gold-500' : 'border-gray-200 dark:border-white/10'}`}
          >
            <QrCode size={32} />
            <span>{t('scan_qr')}</span>
          </button>
          <button 
            onClick={() => setMethod('bank')}
            className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-2xl border transition ${method === 'bank' ? 'border-gold-400 bg-gold-400/10 text-gold-500' : 'border-gray-200 dark:border-white/10'}`}
          >
            <CreditCard size={32} />
            <span>{t('bank_transfer')}</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {method === 'qr' ? (
            <motion.div 
              key="qr"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-4 rounded-2xl shadow-inner mb-10"
            >
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SkyThaiKitchen" alt="QR Code" className="w-48 h-48" />
            </motion.div>
          ) : (
            <motion.div 
              key="bank"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full mb-10"
            >
              <div className="p-6 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center">
                <p className="text-sm text-gray-500 mb-1">Kasikorn Bank</p>
                <p className="text-xl font-mono tracking-widest text-gold-500 mb-4">123-4-56789-0</p>
                <p className="text-sm">Sky Thai Kitchen Co., Ltd.</p>
                
                <div className="mt-6 text-left">
                  <label className="block text-sm mb-2">Upload Transfer Slip</label>
                  <input type="file" className="text-sm" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={handlePayment} className="w-full gold-button text-lg">
          {t('finish_payment')}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
