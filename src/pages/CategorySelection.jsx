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
    { id: 'infrastructure', icon: Map },
    { id: 'sanitation', icon: Trash2 },
    { id: 'water', icon: Droplets },
    { id: 'electricity', icon: Zap },
    { id: 'transport', icon: Bus },
    { id: 'other', icon: MoreHorizontal }
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
              whileTap={{ 
                y: 1, 
                boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                backgroundColor: "#f4f4f5" 
              }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:border-zinc-300 transition-colors text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-md bg-zinc-100/80 text-zinc-600 group-hover:bg-zinc-200/50 transition-colors">
                  <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                </div>
                <span className="text-[14px] font-medium text-zinc-800 tracking-tight">
                  {t(`categories.${cat.id}`)}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all duration-200" />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategorySelection;
