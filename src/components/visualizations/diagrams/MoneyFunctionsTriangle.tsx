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
  },
  {
    id: 'unit-of-account',
    name: 'Unit of Account',
    icon: '📊',
    shortDescription: 'Measures value',
    explanation:
      "Prices are expressed in money. Without it, we'd need to know exchange rates between every pair of goods. With 100 goods, that's 4,950 exchange rates instead of just 100 prices!",
    color: 'secondary',
  },
  {
    id: 'store-of-value',
    name: 'Store of Value',
    icon: '💰',
    shortDescription: 'Preserves purchasing power',
    explanation:
      'Money holds its value over time, allowing you to save today and spend tomorrow. If inflation is high, this function weakens - your money buys less in the future.',
    color: 'tertiary',
  },
];

export function MoneyFunctionsTriangle({ className }: MoneyFunctionsTriangleProps) {
  const [activeFunction, setActiveFunction] = useState<string | null>(null);

  const activeData = moneyFunctions.find((f) => f.id === activeFunction);

  const getColorClasses = (color: string, isActive: boolean) => {
    const baseColors = {
      primary: {
        bg: isActive ? 'bg-primary-500/20' : 'bg-primary-500/10',
        border: isActive ? 'border-primary-500' : 'border-primary-500/30',
        text: 'text-primary-500',
      },
      secondary: {
        bg: isActive ? 'bg-emerald-500/20' : 'bg-emerald-500/10',
        border: isActive ? 'border-emerald-500' : 'border-emerald-500/30',
        text: 'text-emerald-500',
      },
      tertiary: {
        bg: isActive ? 'bg-amber-500/20' : 'bg-amber-500/10',
        border: isActive ? 'border-amber-500' : 'border-amber-500/30',
        text: 'text-amber-500',
      },
    };
    return baseColors[color as keyof typeof baseColors] || baseColors.primary;
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Triangle Layout */}
      <div className="flex flex-col items-center gap-8 py-4">
        {/* Top vertex - Means of Payment */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FunctionCard
            func={moneyFunctions[0]}
            isActive={activeFunction === moneyFunctions[0].id}
            onClick={() =>
              setActiveFunction(
                activeFunction === moneyFunctions[0].id ? null : moneyFunctions[0].id
              )
            }
            colorClasses={getColorClasses(
              moneyFunctions[0].color,
              activeFunction === moneyFunctions[0].id
            )}
          />
        </motion.div>

        {/* Center - Money icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="flex flex-col items-center"
        >
          <motion.div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              'bg-surface-1 border border-surface-2 shadow-md'
            )}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="text-3xl">💵</span>
          </motion.div>
          <p className="text-center text-sm font-medium text-text-secondary mt-2">Money</p>
        </motion.div>

        {/* Bottom vertices - Unit of Account & Store of Value */}
        <div className="flex justify-center gap-8 md:gap-16 lg:gap-24 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FunctionCard
              func={moneyFunctions[1]}
              isActive={activeFunction === moneyFunctions[1].id}
              onClick={() =>
                setActiveFunction(
                  activeFunction === moneyFunctions[1].id ? null : moneyFunctions[1].id
                )
              }
              colorClasses={getColorClasses(
                moneyFunctions[1].color,
                activeFunction === moneyFunctions[1].id
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FunctionCard
              func={moneyFunctions[2]}
              isActive={activeFunction === moneyFunctions[2].id}
              onClick={() =>
                setActiveFunction(
                  activeFunction === moneyFunctions[2].id ? null : moneyFunctions[2].id
                )
              }
              colorClasses={getColorClasses(
                moneyFunctions[2].color,
                activeFunction === moneyFunctions[2].id
              )}
            />
          </motion.div>
        </div>
      </div>

      {/* Explanation panel */}
      <AnimatePresence mode="wait">
        {activeData && (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            <div className={cn('p-5 rounded-xl', 'bg-surface-1 border border-surface-2 shadow-sm')}>
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
              <p className="text-text-secondary" style={{ lineHeight: '1.6' }}>
                {activeData.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint text when nothing is selected */}
      {!activeData && (
        <p className="text-center text-sm text-text-muted mt-6">
          Click on any function to learn more
        </p>
      )}
    </div>
  );
}

// Function card component
interface FunctionCardProps {
  func: MoneyFunction;
  isActive: boolean;
  onClick: () => void;
  colorClasses: {
    bg: string;
    border: string;
    text: string;
  };
}

function FunctionCard({ func, isActive, onClick, colorClasses }: FunctionCardProps) {
  return (
    <motion.button
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-xl',
        'bg-surface-1 border-2 transition-all duration-200',
        'min-w-[140px]',
        colorClasses.border,
        isActive && colorClasses.bg,
        'cursor-pointer outline-none focus:ring-2 focus:ring-primary-500/50',
        'hover:shadow-md'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <motion.span
        className="text-3xl"
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
      >
        {func.icon}
      </motion.span>
      <span
        className={cn(
          'text-sm font-semibold text-center',
          isActive ? colorClasses.text : 'text-text-primary'
        )}
      >
        {func.name}
      </span>
      <span className="text-xs text-text-muted text-center">{func.shortDescription}</span>
    </motion.button>
  );
}
