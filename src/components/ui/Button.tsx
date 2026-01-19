'use client';

import { motion } from '@/lib/motion';
import type { HTMLMotionProps } from 'motion/react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium rounded-lg',
          'transition-colors focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          // Variants
          variant === 'primary' && [
            'bg-primary-500 text-white hover:bg-primary-600',
            'shadow-md hover:shadow-lg',
          ],
          variant === 'secondary' && [
            'bg-glass-light backdrop-blur-sm border border-glass-border',
            'text-text-primary hover:bg-surface-2',
          ],
          variant === 'ghost' && [
            'text-text-secondary hover:text-text-primary',
            'hover:bg-surface-2',
          ],
          // Sizes
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4 text-base',
          size === 'lg' && 'h-12 px-6 text-lg',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
