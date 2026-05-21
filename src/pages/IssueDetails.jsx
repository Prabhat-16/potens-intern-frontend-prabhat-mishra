import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Camera, CheckCircle2 } from 'lucide-react';
import VoiceInput from '../components/VoiceInput';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

const pageTransition = { type: 'tween', ease: 'easeOut', duration: 0.3 };

const IssueDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    category: ''
  });
  
  const [interimText, setInterimText] = useState('');
  
  useEffect(() => {
    const savedCategory = localStorage.getItem('issue_category');
    if (!savedCategory) {
      navigate('/');
    } else {
      setFormData(prev => ({ ...prev, category: savedCategory }));
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.location || !formData.description) return;
    
    // Generate a reference ID (e.g. CR-123456)
    const refId = `CR-${Math.floor(100000 + Math.random() * 900000)}`;
    localStorage.setItem('issue_ref', refId);
    localStorage.setItem('issue_details', JSON.stringify(formData));
    
    navigate('/confirmation');
  };

  const handleVoiceResult = (finalText, currentInterim = '') => {
    if (finalText) {
      setFormData(prev => ({
        ...prev,
        description: prev.description ? `${prev.description} ${finalText}` : finalText
      }));
    }
    setInterimText(currentInterim);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="p-5 w-full h-full flex flex-col"
    >
      <div className="flex items-center gap-3 mb-8 mt-1">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 rounded-md hover:bg-zinc-200/50 transition-colors bg-zinc-100/80 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          aria-label={t('details.back')}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-[17px] font-semibold text-zinc-900 tracking-tight leading-tight">
            {t('details.title')}
          </h2>
          {formData.category && (
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mt-0.5 block">
              {t(`categories.${formData.category}`)}
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 pb-6">
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-zinc-700 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            {t('details.location')}
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder={t('details.locationPlaceholder')}
            className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-lg shadow-sm placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-400 transition-all text-[14px] text-zinc-900"
          />
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-medium text-zinc-700 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
              {t('details.description')}
            </label>
            <VoiceInput onResult={handleVoiceResult} />
          </div>
          <textarea
            required
            value={formData.description + (interimText ? (formData.description ? ' ' : '') + interimText : '')}
            onChange={(e) => {
              setInterimText('');
              setFormData({ ...formData, description: e.target.value });
            }}
            placeholder={t('details.descriptionPlaceholder')}
            className="w-full flex-1 min-h-[120px] p-3 bg-zinc-50 border border-zinc-200/80 rounded-lg shadow-sm placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-400 transition-all resize-none text-[14px] text-zinc-900"
          />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FBFBFC] border border-zinc-200/80 border-dashed rounded-lg text-[13px] text-zinc-600 font-medium hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-4 focus:ring-zinc-900/5"
        >
          <Camera className="w-4 h-4" />
          {t('details.upload')}
        </button>

        <motion.button
          whileTap={{ y: 1, scale: 0.995 }}
          type="submit"
          className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-[14px] font-medium rounded-xl shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-zinc-900/20 mt-2"
        >
          {t('details.submit')}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default IssueDetails;
