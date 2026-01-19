'use client';

import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { useId } from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  formatValue,
  className,
}: SliderProps) {
  const id = useId();
  const percentage = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

  return (
    <div className={cn('w-full', className)}>
      {/* Label and value display */}
      <div className="flex items-center justify-between mb-2 gap-2">
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-secondary flex-1"
          style={{ whiteSpace: 'nowrap' }}
        >
          {label}
        </label>
        <motion.span
          key={value}
          initial={{ scale: 1.1, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-sm font-mono font-semibold text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded flex-shrink-0"
        >
          {displayValue}
        </motion.span>
      </div>

      {/* Slider track */}
      <div className="relative h-2 w-full">
        {/* Background track */}
        <div className="absolute inset-0 bg-surface-2 rounded-full overflow-hidden">
          {/* Filled track */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Native range input for accessibility */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            'absolute inset-0 w-full h-full opacity-0 cursor-pointer',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:w-4',
            '[&::-webkit-slider-thumb]:h-4'
          )}
        />

        {/* Custom thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ left: `calc(${percentage}% - 8px)` }}
          initial={false}
          animate={{ left: `calc(${percentage}% - 8px)` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.div
            className={cn(
              'w-4 h-4 rounded-full',
              'bg-white border-2 border-primary-500',
              'shadow-md'
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          />
        </motion.div>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-1">
        <span className="text-xs text-text-muted" style={{ whiteSpace: 'nowrap' }}>
          {formatValue ? formatValue(min) : `${min}${unit}`}
        </span>
        <span className="text-xs text-text-muted" style={{ whiteSpace: 'nowrap' }}>
          {formatValue ? formatValue(max) : `${max}${unit}`}
        </span>
      </div>
    </div>
  );
}
