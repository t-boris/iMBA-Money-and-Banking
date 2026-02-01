'use client';

import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface FlowArrowProps {
  direction?: 'right' | 'left' | 'up' | 'down';
  animated?: boolean;
  label?: string;
  value?: string;
  className?: string;
}

const rotationMap = {
  right: 0,
  down: 90,
  left: 180,
  up: 270,
};

export function FlowArrow({
  direction = 'right',
  animated = false,
  label,
  value,
  className,
}: FlowArrowProps) {
  const rotation = rotationMap[direction];
  const isVertical = direction === 'up' || direction === 'down';

  return (
    <div className={cn('flex items-center gap-2', isVertical && 'flex-col', className)}>
      {/* Arrow SVG */}
      <div
        className={cn('relative', isVertical ? 'h-16 w-8' : 'w-16 h-8')}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg
          viewBox="0 0 64 32"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arrow line */}
          <path
            d="M4 16H52"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary-400"
          />
          {/* Arrow head */}
          <path
            d="M48 8L56 16L48 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-500"
          />

          {/* Animated flowing dot */}
          {animated && (
            <motion.circle
              cx="4"
              cy="16"
              r="4"
              className="fill-primary-500"
              initial={{ cx: 4, opacity: 0 }}
              animate={{
                cx: [4, 52, 4],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.4, 0.6, 1],
              }}
            />
          )}
        </svg>
      </div>

      {/* Label and value */}
      {(label || value) && (
        <div className={cn('flex flex-col items-center text-center', isVertical && 'order-first')}>
          {label && <span className="text-xs font-medium text-text-secondary">{label}</span>}
          {value && <span className="text-sm font-semibold text-primary-500">{value}</span>}
        </div>
      )}
    </div>
  );
}
