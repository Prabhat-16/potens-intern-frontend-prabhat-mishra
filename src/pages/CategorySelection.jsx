import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Map, Trash2, Droplets, Zap, Bus, MoreHorizontal, ChevronRight } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 }
};

const pageTransition = { type: 'tween', ease: 'easeOut', duration: 0.3 };

const CategorySelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const categories = [
    { id: 'infrastructure', icon: Map, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'sanitation', icon: Trash2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'water', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'electricity', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 'transport', icon: Bus, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'other', icon: MoreHorizontal, color: 'text-zinc-600', bg: 'bg-zinc-100' }
  ];

  const handleSelect = (categoryId) => {
    localStorage.setItem('issue_category', categoryId);
    navigate('/details');
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
      <div className="mb-6 mt-2">
        <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
          {t('categories.title')}
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          {t('tagline')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 flex-1 pb-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${cat.bg} ${cat.color}`}>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="font-medium text-zinc-800">
                  {t(`categories.${cat.id}`)}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-zinc-500 transition-colors" />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategorySelection;
