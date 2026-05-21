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
      className="p-4 w-full h-full flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6 mt-2">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-zinc-200 transition-colors bg-zinc-100 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={t('details.back')}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 tracking-tight leading-tight">
            {t('details.title')}
          </h2>
          {formData.category && (
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full inline-block mt-1">
              {t(`categories.${formData.category}`)}
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5 pb-6">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-400" />
            {t('details.location')}
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder={t('details.locationPlaceholder')}
            className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-lg shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-zinc-900"
          />
        </div>

        <div className="space-y-1.5 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-zinc-400" />
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
            className="w-full flex-1 min-h-[120px] p-3 bg-white border border-zinc-200 rounded-lg shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-none text-zinc-900"
          />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-zinc-200 border-dashed rounded-lg text-zinc-600 font-medium hover:bg-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          <Camera className="w-5 h-5" />
          {t('details.upload')}
        </button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        >
          {t('details.submit')}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default IssueDetails;
