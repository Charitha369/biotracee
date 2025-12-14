import React from 'react';
import { motion } from 'framer-motion';

interface ProcessingAnimationProps {
  message?: string;
}

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ 
  message = "Tracing fingerprint patterns…" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Fingerprint scanning animation */}
      <div className="relative w-32 h-32 mb-8">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/30"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-primary/50"
          animate={{ scale: [1, 1.05, 1], rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Inner circle with fingerprint icon */}
        <motion.div
          className="absolute inset-4 rounded-full gradient-bg shadow-glow flex items-center justify-center"
          animate={{ scale: [0.95, 1, 0.95] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-12 h-12 text-primary-foreground"
          >
            <motion.path
              d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.path
              d="M14 12.5a2 2 0 0 0-2-2.5c-1.5 0-3 .5-3 2.5 0 1.5-.5 3.5-1 4.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
            />
            <motion.path
              d="M4.26 10.147a8 8 0 1 1 15.48 0"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ top: '0%' }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Loading dots */}
      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ y: [-4, 4, -4], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.p 
        className="text-muted-foreground text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default ProcessingAnimation;
