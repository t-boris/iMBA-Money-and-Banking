'use client';

import { useState } from 'react';
import { Slider, AnimatedValue } from '@/components/visualizations';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface MonetaryAggregatesCalculatorProps {
  className?: string;
}

interface TooltipContent {
  title: string;
  description: string;
  example: string;
}

const tooltips: Record<string, TooltipContent> = {
  currency: {
    title: 'Currency in Circulation',
    description: 'Physical cash (bills and coins) held by the public, not in bank vaults.',
    example: 'The $50 bill in your wallet',
  },
  checking: {
    title: 'Checking Deposits',
    description: 'Demand deposits that can be used for transactions immediately.',
    example: 'Your checking account balance',
  },
  savings: {
    title: 'Savings Deposits',
    description: 'Not directly payable but easily transferred to checking.',
    example: 'Your savings account balance',
  },
  moneyMarket: {
    title: 'Money Market Funds',
    description: 'Liquid investments in short-term securities, easily converted to cash.',
    example: 'Treasury money market fund shares',
  },
};

// Tooltip component
function InfoTooltip({
  tooltipKey,
  isOpen,
  onToggle,
}: {
  tooltipKey: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const content = tooltips[tooltipKey];

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={cn(
          'w-5 h-5 rounded-full text-xs font-semibold',
          'border transition-colors duration-200',
          isOpen
            ? 'bg-primary-500 text-white border-primary-500'
            : 'bg-transparent text-text-tertiary border-text-tertiary/30 hover:border-primary-500 hover:text-primary-500'
        )}
        aria-label={`Learn about ${content.title}`}
      >
        ?
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className={cn(
              'absolute z-20 left-6 top-0 w-64 p-3 rounded-lg',
              'bg-surface-1 border border-glass-border',
              'shadow-lg'
            )}
          >
            <h5 className="text-sm font-semibold text-text-primary mb-1">
              {content.title}
            </h5>
            <p className="text-xs text-text-secondary mb-2">{content.description}</p>
            <p className="text-xs text-text-tertiary italic">
              Example: {content.example}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Visual comparison bar showing M1 inside M2
function AggregateBar({
  m1: m1Value,
  m2: m2Value,
}: {
  m1: number;
  m2: number;
}) {
  const m1Percentage = m2Value > 0 ? (m1Value / m2Value) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-text-secondary">M1</span>
        <div className="flex-1 h-1 bg-surface-2 rounded-full" />
        <span className="text-xs font-medium text-text-secondary">M2</span>
      </div>

      <div className="relative h-12 bg-surface-2 rounded-xl overflow-hidden">
        {/* M2 background (full width represents M2) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-emerald-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* M1 portion */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-400"
          initial={{ width: 0 }}
          animate={{ width: `${m1Percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />

        {/* Labels */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <motion.span
            className="text-xs font-semibold text-white z-10"
            animate={{ opacity: m1Percentage > 15 ? 1 : 0 }}
          >
            M1
          </motion.span>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            M2
          </span>
        </div>
      </div>

      {/* Percentage indicator */}
      <div className="flex justify-between mt-2">
        <span className="text-xs text-primary-500 font-medium">
          M1 = {m1Percentage.toFixed(0)}% of M2
        </span>
        <span className="text-xs text-emerald-500 font-medium">
          M2 = 100%
        </span>
      </div>
    </div>
  );
}

// Liquidity indicator
function LiquidityIndicator() {
  return (
    <motion.div
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg',
        'bg-glass-light backdrop-blur-md',
        'border border-glass-border'
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <span className="text-xs font-medium text-text-secondary">More Liquid</span>
      <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-primary-500 via-amber-400 to-emerald-500" />
      <span className="text-xs font-medium text-text-secondary">Less Liquid</span>
      <div className="flex items-center gap-1 ml-2">
        <span className="text-xs px-1.5 py-0.5 bg-primary-500/20 text-primary-500 rounded font-medium">M1</span>
        <span className="text-xs text-text-tertiary">vs</span>
        <span className="text-xs px-1.5 py-0.5 bg-emerald-500/20 text-emerald-500 rounded font-medium">M2</span>
      </div>
    </motion.div>
  );
}

// Format currency for display
const formatCurrency = (value: number) => `$${(value / 1000).toFixed(1)}T`;

export function MonetaryAggregatesCalculator({
  className,
}: MonetaryAggregatesCalculatorProps) {
  // Default values roughly based on real proportions (in billions)
  const [currency, setCurrency] = useState(2000);
  const [checkingDeposits, setCheckingDeposits] = useState(4000);
  const [savingsDeposits, setSavingsDeposits] = useState(10000);
  const [moneyMarketFunds, setMoneyMarketFunds] = useState(5000);

  // Active tooltip state
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Calculate aggregates
  const m1 = currency + checkingDeposits;
  const m2 = m1 + savingsDeposits + moneyMarketFunds;

  const handleTooltipToggle = (key: string) => {
    setActiveTooltip(activeTooltip === key ? null : key);
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          Monetary Aggregates Calculator
        </h3>
        <p className="text-sm text-text-secondary">
          Adjust the sliders to see how M1 and M2 are calculated
        </p>
      </motion.div>

      {/* Calculator sections */}
      <div className="space-y-6">
        {/* M1 Section */}
        <motion.div
          className={cn(
            'p-4 rounded-xl',
            'bg-glass-light backdrop-blur-md',
            'border border-primary-500/30',
            'shadow-glass'
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-primary-500/20 text-primary-500 text-sm font-semibold rounded">
              M1
            </span>
            <span className="text-sm text-text-secondary">
              = Currency + Checking Deposits
            </span>
          </div>

          <div className="space-y-4">
            {/* Currency slider */}
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <Slider
                  label="Currency in Circulation"
                  value={currency}
                  onChange={setCurrency}
                  min={0}
                  max={5000}
                  step={100}
                  formatValue={formatCurrency}
                />
              </div>
              <InfoTooltip
                tooltipKey="currency"
                isOpen={activeTooltip === 'currency'}
                onToggle={() => handleTooltipToggle('currency')}
              />
            </div>

            {/* Checking deposits slider */}
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <Slider
                  label="Checking Account Deposits"
                  value={checkingDeposits}
                  onChange={setCheckingDeposits}
                  min={0}
                  max={10000}
                  step={100}
                  formatValue={formatCurrency}
                />
              </div>
              <InfoTooltip
                tooltipKey="checking"
                isOpen={activeTooltip === 'checking'}
                onToggle={() => handleTooltipToggle('checking')}
              />
            </div>
          </div>

          {/* M1 Total */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-glass-border">
            <span className="text-sm font-medium text-text-secondary">M1 Total:</span>
            <AnimatedValue
              value={m1 / 1000}
              prefix="$"
              suffix="T"
              decimals={1}
              size="lg"
              className="text-primary-500"
            />
          </div>
        </motion.div>

        {/* M2 Section */}
        <motion.div
          className={cn(
            'p-4 rounded-xl',
            'bg-glass-light backdrop-blur-md',
            'border border-emerald-500/30',
            'shadow-glass'
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-500 text-sm font-semibold rounded">
              M2
            </span>
            <span className="text-sm text-text-secondary">
              = M1 + Savings + Money Market
            </span>
          </div>

          <div className="space-y-4">
            {/* Savings deposits slider */}
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <Slider
                  label="Savings Deposits"
                  value={savingsDeposits}
                  onChange={setSavingsDeposits}
                  min={0}
                  max={20000}
                  step={200}
                  formatValue={formatCurrency}
                />
              </div>
              <InfoTooltip
                tooltipKey="savings"
                isOpen={activeTooltip === 'savings'}
                onToggle={() => handleTooltipToggle('savings')}
              />
            </div>

            {/* Money market funds slider */}
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <Slider
                  label="Money Market Funds"
                  value={moneyMarketFunds}
                  onChange={setMoneyMarketFunds}
                  min={0}
                  max={10000}
                  step={100}
                  formatValue={formatCurrency}
                />
              </div>
              <InfoTooltip
                tooltipKey="moneyMarket"
                isOpen={activeTooltip === 'moneyMarket'}
                onToggle={() => handleTooltipToggle('moneyMarket')}
              />
            </div>
          </div>

          {/* M2 Total */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-glass-border">
            <span className="text-sm font-medium text-text-secondary">M2 Total:</span>
            <AnimatedValue
              value={m2 / 1000}
              prefix="$"
              suffix="T"
              decimals={1}
              size="lg"
              className="text-emerald-500"
            />
          </div>
        </motion.div>

        {/* Visual comparison */}
        <motion.div
          className={cn(
            'p-4 rounded-xl',
            'bg-glass-light backdrop-blur-md',
            'border border-glass-border',
            'shadow-glass'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-text-primary mb-4">
            Visual Comparison
          </h4>
          <AggregateBar m1={m1} m2={m2} />
        </motion.div>

        {/* Liquidity indicator */}
        <LiquidityIndicator />
      </div>
    </div>
  );
}
