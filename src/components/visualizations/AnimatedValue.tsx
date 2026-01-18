'use client';

import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

interface AnimatedValueProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-2xl',
  xl: 'text-4xl',
};

export function AnimatedValue({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  size = 'md',
}: AnimatedValueProps) {
  // Spring-animated value with smooth interpolation
  const springValue = useSpring(value, {
    stiffness: 100,
    damping: 20,
  });

  // Update spring target when value changes
  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  // Transform the spring value to a formatted string
  const displayValue = useTransform(springValue, (latest) =>
    latest.toFixed(decimals)
  );

  return (
    <span
      className={cn(
        'font-mono tabular-nums font-semibold text-text-primary',
        sizeClasses[size],
        className
      )}
    >
      {prefix && <span className="text-text-secondary">{prefix}</span>}
      <motion.span>{displayValue}</motion.span>
      {suffix && <span className="text-text-secondary">{suffix}</span>}
    </span>
  );
}
