'use client';

import { motion, MotionProps } from '@/lib/motion';
import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  hover?: boolean;
  as?: 'div' | 'article' | 'section';
}

export const Card = forwardRef<HTMLDivElement, CardProps & MotionProps>(
  ({ className, variant = 'default', hover = false, as = 'div', children, ...props }, ref) => {
    const Component = motion[as];

    return (
      <Component
        ref={ref}
        whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          // Base styles
          'rounded-xl p-6',
          // Variants
          variant === 'default' && ['bg-surface-1 border border-surface-2', 'shadow-sm'],
          variant === 'glass' && [
            'bg-glass-light backdrop-blur-md',
            'border border-glass-border',
            'shadow-glass',
          ],
          variant === 'elevated' && ['bg-surface-1', 'shadow-lg'],
          // Hover effect
          hover && 'cursor-pointer transition-shadow hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents
export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-xl font-semibold text-text-primary', className)} {...props} />
);

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('text-text-secondary text-sm leading-relaxed mt-1 block w-full', className)}
    {...props}
  />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('text-text-primary', className)} {...props} />
);
