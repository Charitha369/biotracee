import React from 'react';
import { Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`${sizeClasses[size]} rounded-xl gradient-bg flex items-center justify-center shadow-glow`}>
        <Fingerprint className="text-primary-foreground" style={{ width: '60%', height: '60%' }} />
      </div>
      <span className={`${textClasses[size]} font-semibold gradient-text`}>
        BioTrace
      </span>
    </motion.div>
  );
};

export default Logo;
