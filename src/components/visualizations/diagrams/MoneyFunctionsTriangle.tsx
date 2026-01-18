'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface MoneyFunctionsTriangleProps {
  className?: string;
}

interface MoneyFunction {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  explanation: string;
  color: string;
  position: { x: number; y: number };
}

const moneyFunctions: MoneyFunction[] = [
  {
    id: 'means-of-payment',
    name: 'Means of Payment',
    icon: '🔄',
    shortDescription: 'Settles transactions',
    explanation:
      'Money is accepted to complete transactions. When you pay, the transaction is finished. This is the most fundamental function - without it, we would need to barter.',
    color: 'primary',
    position: { x: 50, y: 15 }, // Top center
  },
  {
    id: 'unit-of-account',
    name: 'Unit of Account',
    icon: '📊',
    shortDescription: 'Measures value',
    explanation:
      "Prices are expressed in money. Without it, we'd need to know exchange rates between every pair of goods. With 100 goods, that's 4,950 exchange rates instead of just 100 prices!",
    color: 'secondary',
    position: { x: 15, y: 85 }, // Bottom left
  },
  {
    id: 'store-of-value',
    name: 'Store of Value',
    icon: '💰',
    shortDescription: 'Preserves purchasing power',
    explanation:
      'Money holds its value over time, allowing you to save today and spend tomorrow. If inflation is high, this function weakens - your money buys less in the future.',
    color: 'tertiary',
    position: { x: 85, y: 85 }, // Bottom right
  },
];

export function MoneyFunctionsTriangle({
  className,
}: MoneyFunctionsTriangleProps) {
  const [activeFunction, setActiveFunction] = useState<string | null>(null);
  const [hoveredFunction, setHoveredFunction] = useState<string | null>(null);

  const activeData = moneyFunctions.find(
    (f) => f.id === (activeFunction || hoveredFunction)
  );

  const getColorClasses = (color: string, isActive: boolean) => {
    const baseColors = {
      primary: {
        bg: isActive ? 'bg-primary-500/20' : 'bg-primary-500/10',
        border: isActive ? 'border-primary-500' : 'border-primary-500/30',
        text: 'text-primary-500',
        glow: 'shadow-primary-500/30',
      },
      secondary: {
        bg: isActive ? 'bg-emerald-500/20' : 'bg-emerald-500/10',
        border: isActive ? 'border-emerald-500' : 'border-emerald-500/30',
        text: 'text-emerald-500',
        glow: 'shadow-emerald-500/30',
      },
      tertiary: {
        bg: isActive ? 'bg-amber-500/20' : 'bg-amber-500/10',
        border: isActive ? 'border-amber-500' : 'border-amber-500/30',
        text: 'text-amber-500',
        glow: 'shadow-amber-500/30',
      },
    };
    return baseColors[color as keyof typeof baseColors] || baseColors.primary;
  };

  return (
    <div className={cn('relative w-full max-w-2xl mx-auto', className)}>
      {/* Main triangle container */}
      <div className="relative aspect-square max-h-[400px]">
        {/* SVG for connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Triangle connecting lines */}
          {[
            { from: moneyFunctions[0].position, to: moneyFunctions[1].position },
            { from: moneyFunctions[1].position, to: moneyFunctions[2].position },
            { from: moneyFunctions[2].position, to: moneyFunctions[0].position },
          ].map((line, index) => (
            <motion.line
              key={index}
              x1={line.from.x}
              y1={line.from.y}
              x2={line.to.x}
              y2={line.to.y}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-glass-border"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: activeFunction ? 0.3 : 0.5,
              }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          ))}

          {/* Animated pulse on lines */}
          {!activeFunction && (
            <>
              {[
                {
                  from: moneyFunctions[0].position,
                  to: moneyFunctions[1].position,
                },
                {
                  from: moneyFunctions[1].position,
                  to: moneyFunctions[2].position,
                },
                {
                  from: moneyFunctions[2].position,
                  to: moneyFunctions[0].position,
                },
              ].map((line, index) => (
                <motion.circle
                  key={`pulse-${index}`}
                  r="1"
                  fill="currentColor"
                  className="text-primary-500/50"
                  initial={{ cx: line.from.x, cy: line.from.y }}
                  animate={{
                    cx: [line.from.x, line.to.x],
                    cy: [line.from.y, line.to.y],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
            </>
          )}
        </svg>

        {/* Center money icon */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              'bg-glass-light backdrop-blur-md',
              'border border-glass-border shadow-glass'
            )}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 20px rgba(99, 102, 241, 0.1)',
                '0 0 30px rgba(99, 102, 241, 0.2)',
                '0 0 20px rgba(99, 102, 241, 0.1)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="text-3xl">💵</span>
          </motion.div>
          <p className="text-center text-xs font-medium text-text-secondary mt-1">
            Money
          </p>
        </motion.div>

        {/* Function vertices */}
        {moneyFunctions.map((func, index) => {
          const isActive = activeFunction === func.id;
          const isHovered = hoveredFunction === func.id;
          const colors = getColorClasses(func.color, isActive || isHovered);

          return (
            <motion.div
              key={func.id}
              className="absolute z-20"
              style={{
                left: `${func.position.x}%`,
                top: `${func.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 200 }}
            >
              <motion.button
                className={cn(
                  'relative flex flex-col items-center gap-2 p-4 rounded-xl',
                  'bg-glass-light backdrop-blur-md',
                  'border-2 transition-colors duration-200',
                  colors.border,
                  colors.bg,
                  (isActive || isHovered) && `shadow-lg ${colors.glow}`,
                  'cursor-pointer outline-none focus:ring-2 focus:ring-primary-500/50'
                )}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setActiveFunction(activeFunction === func.id ? null : func.id)
                }
                onMouseEnter={() => setHoveredFunction(func.id)}
                onMouseLeave={() => setHoveredFunction(null)}
              >
                <motion.span
                  className="text-3xl"
                  animate={
                    isActive || isHovered
                      ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    repeat: isActive ? Infinity : 0,
                    repeatDelay: 1,
                  }}
                >
                  {func.icon}
                </motion.span>
                <span
                  className={cn(
                    'text-sm font-semibold whitespace-nowrap',
                    isActive || isHovered ? colors.text : 'text-text-primary'
                  )}
                >
                  {func.name}
                </span>
                <span className="text-xs text-text-tertiary">
                  {func.shortDescription}
                </span>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Explanation panel */}
      <AnimatePresence mode="wait">
        {activeData && (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-6 overflow-hidden"
          >
            <div
              className={cn(
                'p-5 rounded-xl',
                'bg-glass-light backdrop-blur-md',
                'border border-glass-border shadow-glass'
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{activeData.icon}</span>
                <h3
                  className={cn(
                    'text-lg font-semibold',
                    getColorClasses(activeData.color, true).text
                  )}
                >
                  {activeData.name}
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {activeData.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint text when nothing is selected */}
      <AnimatePresence>
        {!activeData && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-text-tertiary mt-6"
          >
            Click on any function to learn more
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
