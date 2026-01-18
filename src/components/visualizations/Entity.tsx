'use client';

import { motion, MotionProps } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface EntityProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  label: string;
  value?: string;
  subtext?: string;
  highlighted?: boolean;
  onClick?: () => void;
}

export function Entity({
  icon,
  label,
  value,
  subtext,
  highlighted = false,
  onClick,
  className,
  ...props
}: EntityProps & Omit<MotionProps, 'onClick'>) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        // Base styles - glass morphism
        'relative rounded-xl p-4',
        'bg-glass-light backdrop-blur-md',
        'border border-glass-border',
        'shadow-glass',
        // Highlighted state
        highlighted && [
          'border-primary-500/50',
          'shadow-lg shadow-primary-500/10',
          'ring-1 ring-primary-500/30',
        ],
        // Interactive states
        onClick && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Highlighted glow effect */}
      {highlighted && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/5 to-primary-600/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative flex flex-col items-center gap-2 text-center">
        {/* Icon */}
        <motion.span
          className="text-3xl"
          animate={highlighted ? { scale: [1, 1.1, 1] } : undefined}
          transition={
            highlighted
              ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              : undefined
          }
        >
          {icon}
        </motion.span>

        {/* Label */}
        <span
          className={cn(
            'text-sm font-medium',
            highlighted ? 'text-primary-500' : 'text-text-primary'
          )}
        >
          {label}
        </span>

        {/* Value */}
        {value && (
          <span className="text-lg font-semibold font-mono text-text-primary">
            {value}
          </span>
        )}

        {/* Subtext */}
        {subtext && (
          <span className="text-xs text-text-tertiary">{subtext}</span>
        )}
      </div>
    </motion.div>
  );
}
