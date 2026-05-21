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
      className="p-5 w-full h-full flex flex-col items-center pt-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-14 h-14 bg-zinc-100/80 border border-zinc-200/50 rounded-full flex items-center justify-center mb-6 shadow-sm"
      >
        <CheckCircle className="w-7 h-7 text-zinc-800" strokeWidth={2.5} />
      </motion.div>

      <h2 className="text-[20px] font-semibold text-zinc-900 tracking-tight text-center mb-1.5">
        {t('confirmation.title')}
      </h2>
      <p className="text-zinc-500 text-center text-[14px] px-4 mb-8">
        {t('confirmation.successMessage')}
      </p>

      <div className="w-full bg-[#FBFBFC] border border-zinc-200/80 rounded-xl p-5 mb-8 shadow-sm">
        <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
          {t('confirmation.referenceId')}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-mono font-medium text-zinc-800 tracking-wide">
            {refId}
          </span>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 bg-white border border-zinc-200/60 hover:border-zinc-300 text-zinc-600 rounded-md transition-colors flex items-center gap-2 text-[13px] font-medium focus:outline-none focus:ring-4 focus:ring-zinc-900/5 shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-zinc-900" /> : <Copy className="w-3.5 h-3.5" />}
            <span className={copied ? 'text-zinc-900' : ''}>
              {copied ? t('confirmation.copied') : t('confirmation.copy')}
            </span>
          </button>
        </div>
      </div>

      <div className="w-full mb-auto">
        <h3 className="text-[12px] font-semibold text-zinc-900 mb-5 uppercase tracking-wider">
          {t('confirmation.trackStatus')}
        </h3>
        
        {/* Simple Timeline UI */}
        <div className="relative pl-3.5 space-y-7 before:absolute before:inset-y-2 before:left-[21px] before:w-px before:bg-zinc-200/70">
          <div className="relative flex items-start gap-5">
            <div className="w-3.5 h-3.5 rounded-full bg-zinc-900 ring-4 ring-white z-10 shrink-0 mt-0.5 shadow-sm" />
            <div>
              <p className="text-[14px] font-medium text-zinc-900 leading-none">{t('confirmation.timeline.submitted')}</p>
              <p className="text-[12px] text-zinc-500 mt-1.5">{t('confirmation.justNow')}</p>
            </div>
          </div>
          
          <div className="relative flex items-start gap-5">
            <div className="w-3.5 h-3.5 rounded-full bg-zinc-100 ring-4 ring-white z-10 shrink-0 mt-0.5 flex items-center justify-center border border-zinc-200">
              <Clock className="w-2 h-2 text-zinc-400" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-zinc-400 leading-none">{t('confirmation.timeline.inReview')}</p>
            </div>
          </div>

          <div className="relative flex items-start gap-5">
            <div className="w-3.5 h-3.5 rounded-full bg-zinc-100 ring-4 ring-white z-10 shrink-0 mt-0.5 flex items-center justify-center border border-zinc-200">
              <Clock className="w-2 h-2 text-zinc-400" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-zinc-400 leading-none">{t('confirmation.timeline.assigned')}</p>
            </div>
          </div>

          <div className="relative flex items-start gap-5">
            <div className="w-3.5 h-3.5 rounded-full bg-zinc-100 ring-4 ring-white z-10 shrink-0 mt-0.5 flex items-center justify-center border border-zinc-200">
              <Check className="w-2 h-2 text-zinc-400" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-zinc-400 leading-none">{t('confirmation.timeline.resolved')}</p>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        whileTap={{ y: 1, scale: 0.995 }}
        onClick={handleHome}
        className="w-full mt-10 py-3 bg-white border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-800 text-[14px] font-medium rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-zinc-900/5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]"
      >
        <Home className="w-4 h-4 text-zinc-500" />
        {t('confirmation.homeBtn')}
      </motion.button>
    </motion.div>
  );
};

export default SubmissionConfirmation;
