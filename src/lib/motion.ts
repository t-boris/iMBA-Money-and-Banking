'use client';

// Re-export Motion components for consistent imports across the app
export { motion, AnimatePresence } from 'motion/react';
export type { MotionProps, Variants } from 'motion/react';

// Common animation variants for reuse
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
