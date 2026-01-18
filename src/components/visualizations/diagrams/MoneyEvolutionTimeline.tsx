'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface MoneyEvolutionTimelineProps {
  className?: string;
}

interface MoneyEra {
  id: string;
  name: string;
  icon: string;
  period: string;
  definition: string;
  examples: string[];
  characteristics: string[];
  tradeoff: string;
  color: string;
}

const moneyEras: MoneyEra[] = [
  {
    id: 'commodity',
    name: 'Commodity Money',
    icon: '🪙',
    period: 'Ancient - 1600s',
    definition: 'Money with intrinsic value',
    examples: [
      'Arrowheads',
      'Shells',
      'Salt',
      'Gold coins',
      'Copper plates (Sweden)',
    ],
    characteristics: [
      'Has value even if not used as money',
      'Limited supply creates scarcity',
      'Difficult to transport in large quantities',
    ],
    tradeoff: 'Has intrinsic value but heavy, hard to divide, and inconvenient for large transactions',
    color: 'amber',
  },
  {
    id: 'representative',
    name: 'Representative Money',
    icon: '📜',
    period: '1600s - 1930s',
    definition: 'Paper backed by commodity',
    examples: [
      "Palmstruch's paper money (1661)",
      'Gold certificates',
      'Silver certificates',
      'US Gold Standard',
    ],
    characteristics: [
      'Redeemable for gold or silver on demand',
      'Lighter and more convenient than coins',
      'Value depends on ability to redeem',
    ],
    tradeoff: 'Convenient to carry but requires trust that the issuer can redeem it',
    color: 'emerald',
  },
  {
    id: 'fiat',
    name: 'Fiat Money',
    icon: '💵',
    period: '1930s - Present',
    definition: 'Value by government decree',
    examples: [
      'US Dollar (post-1971)',
      'Euro',
      'Japanese Yen',
      'All modern currencies',
    ],
    characteristics: [
      'No intrinsic value',
      'Declared legal tender by government',
      'Supply controlled by central bank',
      'Value based on trust and stability',
    ],
    tradeoff: 'Most convenient but requires trust in government and monetary policy',
    color: 'primary',
  },
];

export function MoneyEvolutionTimeline({
  className,
}: MoneyEvolutionTimelineProps) {
  const [activeEra, setActiveEra] = useState<number>(0);

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      amber: {
        bg: isActive ? 'bg-amber-500/20' : 'bg-amber-500/10',
        border: isActive ? 'border-amber-500' : 'border-amber-500/30',
        text: 'text-amber-500',
        fill: 'bg-amber-500',
        gradient: 'from-amber-500/20 to-amber-600/10',
      },
      emerald: {
        bg: isActive ? 'bg-emerald-500/20' : 'bg-emerald-500/10',
        border: isActive ? 'border-emerald-500' : 'border-emerald-500/30',
        text: 'text-emerald-500',
        fill: 'bg-emerald-500',
        gradient: 'from-emerald-500/20 to-emerald-600/10',
      },
      primary: {
        bg: isActive ? 'bg-primary-500/20' : 'bg-primary-500/10',
        border: isActive ? 'border-primary-500' : 'border-primary-500/30',
        text: 'text-primary-500',
        fill: 'bg-primary-500',
        gradient: 'from-primary-500/20 to-primary-600/10',
      },
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Timeline track */}
      <div className="relative mb-8">
        {/* Background track */}
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-glass-border rounded-full" />

        {/* Animated progress track */}
        <motion.div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-amber-500 via-emerald-500 to-primary-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{
            width: `${((activeEra + 1) / moneyEras.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Era nodes */}
        <div className="relative flex justify-between">
          {moneyEras.map((era, index) => {
            const isActive = index === activeEra;
            const isPast = index < activeEra;
            const colors = getColorClasses(era.color, isActive);

            return (
              <motion.button
                key={era.id}
                className="relative flex flex-col items-center outline-none"
                onClick={() => setActiveEra(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Node circle */}
                <motion.div
                  className={cn(
                    'relative w-14 h-14 rounded-full flex items-center justify-center',
                    'border-2 transition-all duration-300',
                    'bg-glass-light backdrop-blur-md',
                    isActive || isPast ? colors.border : 'border-glass-border',
                    isActive && 'shadow-lg',
                    'cursor-pointer'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    isActive
                      ? {
                          boxShadow: [
                            '0 0 0 0 rgba(99, 102, 241, 0)',
                            '0 0 0 8px rgba(99, 102, 241, 0.1)',
                            '0 0 0 0 rgba(99, 102, 241, 0)',
                          ],
                        }
                      : {}
                  }
                  transition={
                    isActive
                      ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                      : {}
                  }
                >
                  <motion.span
                    className="text-2xl"
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={
                      isActive
                        ? { duration: 1, repeat: Infinity, repeatDelay: 0.5 }
                        : {}
                    }
                  >
                    {era.icon}
                  </motion.span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      className={cn(
                        'absolute -bottom-1 w-2 h-2 rounded-full',
                        colors.fill
                      )}
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>

                {/* Era label */}
                <div className="mt-3 text-center">
                  <p
                    className={cn(
                      'text-sm font-semibold transition-colors',
                      isActive ? colors.text : 'text-text-primary'
                    )}
                  >
                    {era.name}
                  </p>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    {era.period}
                  </p>
                </div>

                {/* Arrow connector (except last) */}
                {index < moneyEras.length - 1 && (
                  <motion.div
                    className={cn(
                      'absolute left-full top-7 -translate-y-1/2 w-[calc(100%-3.5rem)] flex items-center justify-center',
                      'text-text-tertiary'
                    )}
                    style={{ left: '3.5rem' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isPast ? 1 : 0.3 }}
                  >
                    <span className="text-lg">→</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEra}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'rounded-xl overflow-hidden',
            'bg-glass-light backdrop-blur-md',
            'border border-glass-border shadow-glass'
          )}
        >
          {/* Header gradient */}
          <div
            className={cn(
              'p-5 bg-gradient-to-r',
              getColorClasses(moneyEras[activeEra].color, true).gradient
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{moneyEras[activeEra].icon}</span>
              <div>
                <h3
                  className={cn(
                    'text-xl font-bold',
                    getColorClasses(moneyEras[activeEra].color, true).text
                  )}
                >
                  {moneyEras[activeEra].name}
                </h3>
                <p className="text-text-secondary">
                  {moneyEras[activeEra].definition}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5">
            {/* Examples */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">
                Historical Examples
              </h4>
              <div className="flex flex-wrap gap-2">
                {moneyEras[activeEra].examples.map((example, index) => (
                  <motion.span
                    key={example}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm',
                      'bg-glass-light border border-glass-border'
                    )}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {example}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Characteristics */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">
                Key Characteristics
              </h4>
              <ul className="space-y-1.5">
                {moneyEras[activeEra].characteristics.map((char, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span
                      className={cn(
                        'mt-1.5 w-1.5 h-1.5 rounded-full shrink-0',
                        getColorClasses(moneyEras[activeEra].color, true).fill
                      )}
                    />
                    {char}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tradeoff insight */}
            <motion.div
              className={cn(
                'p-4 rounded-lg',
                'bg-surface-secondary/50 border border-glass-border'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">💡</span>
                <div>
                  <p className="text-sm font-medium text-text-primary mb-1">
                    The Tradeoff
                  </p>
                  <p className="text-sm text-text-secondary">
                    {moneyEras[activeEra].tradeoff}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation hint */}
      <p className="text-center text-sm text-text-tertiary mt-4">
        Click on an era to explore its characteristics
      </p>
    </div>
  );
}
