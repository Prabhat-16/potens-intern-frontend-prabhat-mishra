import React from 'react';
import { motion } from 'framer-motion';

const PageSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 w-full h-full flex flex-col pt-8 space-y-6"
    >
      <div className="space-y-3">
        <div className="h-6 bg-zinc-200 rounded-md w-1/3 animate-pulse"></div>
        <div className="h-4 bg-zinc-100 rounded-md w-2/3 animate-pulse"></div>
      </div>
      
      <div className="space-y-3 flex-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 w-full bg-zinc-100 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </motion.div>
  );
};

export default PageSkeleton;
