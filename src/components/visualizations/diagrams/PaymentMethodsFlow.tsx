'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface PaymentMethodsFlowProps {
  className?: string;
}

type BranchType = 'cash' | 'non-cash' | null;
type MethodType = 'check' | 'ach' | 'debit' | 'credit' | 'digital' | null;

interface PaymentMethod {
  id: MethodType;
  name: string;
  icon: string;
  description: string;
  insight?: string;
}

const nonCashMethods: PaymentMethod[] = [
  {
    id: 'check',
    name: 'Check',
    icon: '📝',
    description: 'Instruction to your bank to transfer funds from your account',
    insight: 'A check is NOT money - it is an instruction to transfer money!',
  },
  {
    id: 'ach',
    name: 'ACH',
    icon: '⚡',
    description: 'Electronic batch transfers between banks (direct deposit, bill pay)',
  },
  {
    id: 'debit',
    name: 'Debit Card',
    icon: '💳',
    description: 'Directly withdraws from your checking account',
  },
  {
    id: 'credit',
    name: 'Credit Card',
    icon: '🏦',
    description: 'Bank pays merchant, you owe the bank',
    insight: 'Credit cards create loans, not payments - you are borrowing!',
  },
  {
    id: 'digital',
    name: 'Digital',
    icon: '📱',
    description: 'Mobile wallets, P2P apps (Venmo, Apple Pay, etc.)',
  },
];

// Animated connection line component
function ConnectionLine({
  isActive,
  direction = 'down'
}: {
  isActive: boolean;
  direction?: 'down' | 'left' | 'right';
}) {
  const isVertical = direction === 'down';

  return (
    <div className={cn(
      'relative overflow-hidden',
      isVertical ? 'w-0.5 h-8' : 'h-0.5 w-8'
    )}>
      <motion.div
        className={cn(
          'absolute bg-primary-400/50',
          isVertical ? 'w-full' : 'h-full'
        )}
        initial={isVertical ? { height: 0 } : { width: 0 }}
        animate={isVertical ? { height: '100%' } : { width: '100%' }}
        transition={{ duration: 0.5 }}
      />
      {isActive && (
        <motion.div
          className={cn(
            'absolute bg-primary-500 rounded-full',
            isVertical ? 'w-1.5 h-1.5 -left-0.5' : 'w-1.5 h-1.5 -top-0.5'
          )}
          animate={isVertical
            ? { top: [0, '100%', 0] }
            : { left: [0, '100%', 0] }
          }
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}

// Branch card component
function BranchCard({
  icon,
  name,
  description,
  isSelected,
  onClick,
  color = 'primary',
}: {
  icon: string;
  name: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  color?: 'primary' | 'emerald';
}) {
  const colorClasses = color === 'emerald'
    ? {
        border: isSelected ? 'border-emerald-500' : 'border-emerald-500/30',
        bg: isSelected ? 'bg-emerald-500/10' : '',
        text: isSelected ? 'text-emerald-500' : 'text-text-primary',
        shadow: isSelected ? 'shadow-emerald-500/20' : '',
      }
    : {
        border: isSelected ? 'border-primary-500' : 'border-primary-500/30',
        bg: isSelected ? 'bg-primary-500/10' : '',
        text: isSelected ? 'text-primary-500' : 'text-text-primary',
        shadow: isSelected ? 'shadow-primary-500/20' : '',
      };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center gap-2 p-4 rounded-xl',
        'bg-glass-light backdrop-blur-md',
        'border-2 transition-colors duration-200',
        colorClasses.border,
        colorClasses.bg,
        isSelected && `shadow-lg ${colorClasses.shadow}`,
        'cursor-pointer outline-none focus:ring-2 focus:ring-primary-500/50',
        'w-32 sm:w-40'
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="text-3xl"
        animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.6, repeat: isSelected ? Infinity : 0, repeatDelay: 1 }}
      >
        {icon}
      </motion.span>
      <span className={cn('text-sm font-semibold', colorClasses.text)}>
        {name}
      </span>
      <span className="text-xs text-text-tertiary text-center">
        {description}
      </span>
    </motion.button>
  );
}

// Method card component for non-cash methods
function MethodCard({
  method,
  isSelected,
  onClick,
}: {
  method: PaymentMethod;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center gap-1.5 p-3 rounded-lg',
        'bg-glass-light backdrop-blur-md',
        'border transition-colors duration-200',
        isSelected ? 'border-amber-500 bg-amber-500/10' : 'border-glass-border',
        isSelected && 'shadow-md shadow-amber-500/10',
        'cursor-pointer outline-none focus:ring-2 focus:ring-primary-500/50',
        'w-20 sm:w-24'
      )}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <motion.span
        className="text-2xl"
        animate={isSelected ? { rotate: [0, 5, -5, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {method.icon}
      </motion.span>
      <span className={cn(
        'text-xs font-medium',
        isSelected ? 'text-amber-500' : 'text-text-primary'
      )}>
        {method.name}
      </span>
    </motion.button>
  );
}

// Insight callout component
function InsightCallout({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        'p-4 rounded-xl',
        'bg-amber-500/10 border border-amber-500/30',
        'backdrop-blur-md'
      )}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg">💡</span>
        <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

// Detail panel for selected method
function MethodDetailPanel({
  method,
  onClose,
}: {
  method: PaymentMethod;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'p-4 rounded-xl',
        'bg-glass-light backdrop-blur-md',
        'border border-amber-500/30',
        'shadow-lg shadow-amber-500/5'
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{method.icon}</span>
          <h4 className="text-sm font-semibold text-amber-500">{method.name}</h4>
        </div>
        <button
          onClick={onClose}
          className="text-text-tertiary hover:text-text-primary transition-colors text-lg leading-none"
          aria-label="Close detail panel"
        >
          x
        </button>
      </div>
      <p className="text-sm text-text-secondary mb-3">{method.description}</p>
      {method.insight && <InsightCallout text={method.insight} />}
    </motion.div>
  );
}

// Cash detail panel
function CashDetailPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'p-4 rounded-xl',
        'bg-glass-light backdrop-blur-md',
        'border border-emerald-500/30',
        'shadow-lg shadow-emerald-500/5'
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💵</span>
          <h4 className="text-sm font-semibold text-emerald-500">Cash Characteristics</h4>
        </div>
        <button
          onClick={onClose}
          className="text-text-tertiary hover:text-text-primary transition-colors text-lg leading-none"
          aria-label="Close detail panel"
        >
          x
        </button>
      </div>
      <ul className="space-y-2">
        {[
          { icon: '👤', text: 'Anonymous - no record of who paid' },
          { icon: '⚡', text: 'Immediate - settlement is instant' },
          { icon: '🔒', text: 'No intermediary - peer-to-peer' },
          { icon: '📉', text: 'No trace - hard to track or audit' },
        ].map((item, index) => (
          <motion.li
            key={item.text}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-sm text-text-secondary flex items-center gap-2"
          >
            <span>{item.icon}</span>
            {item.text}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function PaymentMethodsFlow({ className }: PaymentMethodsFlowProps) {
  const [selectedBranch, setSelectedBranch] = useState<BranchType>(null);
  const [selectedMethod, setSelectedMethod] = useState<MethodType>(null);

  const handleBranchClick = (branch: BranchType) => {
    if (selectedBranch === branch) {
      setSelectedBranch(null);
      setSelectedMethod(null);
    } else {
      setSelectedBranch(branch);
      setSelectedMethod(null);
    }
  };

  const handleMethodClick = (method: MethodType) => {
    setSelectedMethod(selectedMethod === method ? null : method);
  };

  const selectedMethodData = nonCashMethods.find((m) => m.id === selectedMethod);

  return (
    <div className={cn('w-full', className)}>
      {/* Main flow diagram */}
      <div className="flex flex-col items-center gap-4">
        {/* Top: Payment root node */}
        <motion.div
          className={cn(
            'flex flex-col items-center gap-2 p-4 rounded-xl',
            'bg-glass-light backdrop-blur-md',
            'border border-glass-border shadow-glass'
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.span
            className="text-4xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            💰
          </motion.span>
          <span className="text-sm font-semibold text-text-primary">Payment</span>
        </motion.div>

        {/* Connection lines to branches */}
        <div className="flex items-center gap-16 sm:gap-24">
          <ConnectionLine isActive={selectedBranch === 'cash'} direction="down" />
          <ConnectionLine isActive={selectedBranch === 'non-cash'} direction="down" />
        </div>

        {/* Branch selection: Cash vs Non-Cash */}
        <div className="flex gap-4 sm:gap-8">
          <BranchCard
            icon="💵"
            name="Cash"
            description="Physical currency"
            isSelected={selectedBranch === 'cash'}
            onClick={() => handleBranchClick('cash')}
            color="emerald"
          />
          <BranchCard
            icon="🏦"
            name="Non-Cash"
            description="Bank account transfers"
            isSelected={selectedBranch === 'non-cash'}
            onClick={() => handleBranchClick('non-cash')}
            color="primary"
          />
        </div>

        {/* Expanded content based on selection */}
        <AnimatePresence mode="wait">
          {selectedBranch === 'cash' && (
            <motion.div
              key="cash-detail"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full max-w-md overflow-hidden"
            >
              <CashDetailPanel onClose={() => setSelectedBranch(null)} />
            </motion.div>
          )}

          {selectedBranch === 'non-cash' && (
            <motion.div
              key="non-cash-detail"
              className="flex flex-col items-center gap-4 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Connection line to methods */}
              <ConnectionLine isActive={true} direction="down" />

              {/* Non-cash methods grid */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {nonCashMethods.map((method) => (
                  <MethodCard
                    key={method.id}
                    method={method}
                    isSelected={selectedMethod === method.id}
                    onClick={() => handleMethodClick(method.id)}
                  />
                ))}
              </div>

              {/* Selected method detail */}
              <AnimatePresence mode="wait">
                {selectedMethodData && (
                  <div className="w-full max-w-md">
                    <MethodDetailPanel
                      method={selectedMethodData}
                      onClose={() => setSelectedMethod(null)}
                    />
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instruction hint */}
      <motion.p
        className="text-center text-xs text-text-tertiary mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {selectedBranch === null
          ? 'Click on Cash or Non-Cash to explore payment methods'
          : selectedBranch === 'non-cash' && selectedMethod === null
          ? 'Click on a payment method to learn more'
          : ''}
      </motion.p>
    </div>
  );
}
