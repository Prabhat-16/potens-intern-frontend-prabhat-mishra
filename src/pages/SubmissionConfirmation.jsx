import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, Home, Clock, Check } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.05 }
};

const pageTransition = { type: 'tween', ease: 'easeOut', duration: 0.4 };

const SubmissionConfirmation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [refId, setRefId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedRef = localStorage.getItem('issue_ref');
    if (!savedRef) {
      navigate('/');
    } else {
      setRefId(savedRef);
    }
  }, [navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHome = () => {
    localStorage.removeItem('issue_category');
    localStorage.removeItem('issue_details');
    // keep issue_ref if we want history, but clear form data
    navigate('/');
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="p-4 w-full h-full flex flex-col items-center pt-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5"
      >
        <CheckCircle className="w-8 h-8 text-green-600" strokeWidth={2.5} />
      </motion.div>

      <h2 className="text-2xl font-bold text-zinc-900 tracking-tight text-center mb-2">
        {t('confirmation.title')}
      </h2>
      <p className="text-zinc-500 text-center text-sm px-4 mb-8">
        {t('confirmation.successMessage')}
      </p>

      <div className="w-full bg-white border border-zinc-200 rounded-xl p-5 mb-8 shadow-sm">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
          {t('confirmation.referenceId')}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-mono font-bold text-zinc-800 tracking-wide">
            {refId}
          </span>
          <button
            onClick={copyToClipboard}
            className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 rounded-md transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            <span className={copied ? 'text-green-600' : ''}>
              {copied ? t('confirmation.copied') : t('confirmation.copy')}
            </span>
          </button>
        </div>
      </div>

      <div className="w-full mb-auto">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wider">
          {t('confirmation.trackStatus')}
        </h3>
        
        {/* Simple Timeline UI */}
        <div className="relative pl-3 space-y-6 before:absolute before:inset-y-2 before:left-[19px] before:w-px before:bg-zinc-200">
          <div className="relative flex items-start gap-4">
            <div className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-50 z-10 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-zinc-900">{t('confirmation.timeline.submitted')}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{t('confirmation.justNow')}</p>
            </div>
          </div>
          
          <div className="relative flex items-start gap-4">
            <div className="w-4 h-4 rounded-full bg-zinc-200 ring-4 ring-white z-10 shrink-0 mt-0.5 flex items-center justify-center">
              <Clock className="w-2.5 h-2.5 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">{t('confirmation.timeline.inReview')}</p>
            </div>
          </div>

          <div className="relative flex items-start gap-4">
            <div className="w-4 h-4 rounded-full bg-zinc-200 ring-4 ring-white z-10 shrink-0 mt-0.5 flex items-center justify-center">
              <Clock className="w-2.5 h-2.5 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">{t('confirmation.timeline.assigned')}</p>
            </div>
          </div>

          <div className="relative flex items-start gap-4">
            <div className="w-4 h-4 rounded-full bg-zinc-200 ring-4 ring-white z-10 shrink-0 mt-0.5 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">{t('confirmation.timeline.resolved')}</p>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleHome}
        className="w-full mt-8 py-3.5 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-800 font-medium rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Home className="w-5 h-5" />
        {t('confirmation.homeBtn')}
      </motion.button>
    </motion.div>
  );
};

export default SubmissionConfirmation;
