'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { AnimatedValue, Slider } from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface BankBalanceSheetProps {
  className?: string;
}

interface BalanceSheetState {
  // Assets
  reserves: number;
  loans: number;
  securities: number;
  // Liabilities
  deposits: number;
  borrowings: number;
  equity: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  state: BalanceSheetState;
}

const scenarios: Scenario[] = [
  {
    id: 'normal',
    name: 'Normal Bank',
    description: 'Typical proportions',
    icon: '🏦',
    state: {
      reserves: 100,
      loans: 700,
      securities: 200,
      deposits: 800,
      borrowings: 100,
      equity: 100,
    },
  },
  {
    id: 'bank-run',
    name: 'Bank Run',
    description: 'Deposits flee rapidly',
    icon: '🏃',
    state: {
      reserves: 20,
      loans: 650,
      securities: 130,
      deposits: 400,
      borrowings: 300,
      equity: 100,
    },
  },
  {
    id: 'credit-boom',
    name: 'Credit Boom',
    description: 'High loans, low reserves',
    icon: '📈',
    state: {
      reserves: 50,
      loans: 850,
      securities: 100,
      deposits: 800,
      borrowings: 150,
      equity: 50,
    },
  },
];

const insights = [
  {
    icon: '💡',
    text: 'Deposits are liabilities - the bank owes you this money',
  },
  {
    icon: '📋',
    text: 'Loans are assets - borrowers owe the bank',
  },
  {
    icon: '💰',
    text: 'Banks profit from the spread: loan rates > deposit rates',
  },
];

// Value bar component for visual representation
function ValueBar({
  value,
  maxValue,
  color,
  label,
  className,
}: {
  value: number;
  maxValue: number;
  color: string;
  label: string;
  className?: string;
}) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm text-text-secondary">{label}</span>
        <span className="text-sm font-mono font-semibold text-text-primary">
          ${value}B
        </span>
      </div>
      <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}

// Maturity mismatch visualization
function MaturityMismatch() {
  return (
    <div
      className={cn(
        'p-4 rounded-xl mt-6',
        'bg-amber-500/5 border border-amber-500/20'
      )}
    >
      <h4 className="text-sm font-semibold text-amber-500 mb-3 flex items-center gap-2">
        <span>⚠️</span>
        Maturity Mismatch
      </h4>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        {/* Deposits timeline */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              'px-3 py-2 rounded-lg',
              'bg-amber-500/10 border border-amber-500/30'
            )}
          >
            <span className="text-xs text-amber-600 font-medium">Deposits</span>
          </div>
          <div className="h-8 w-px bg-amber-500/30 my-1" />
          <span className="text-xs text-text-tertiary">Can leave anytime</span>
        </div>

        {/* VS divider */}
        <div className="text-2xl text-text-tertiary">vs</div>

        {/* Loans timeline */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              'px-3 py-2 rounded-lg',
              'bg-primary-500/10 border border-primary-500/30'
            )}
          >
            <span className="text-xs text-primary-500 font-medium">Loans</span>
          </div>
          <div className="h-8 w-px bg-primary-500/30 my-1" />
          <span className="text-xs text-text-tertiary">Locked for years</span>
        </div>
      </div>
      <p className="text-xs text-text-tertiary text-center mt-3">
        This is the fundamental vulnerability of banking
      </p>
    </div>
  );
}

export function BankBalanceSheet({ className }: BankBalanceSheetProps) {
  const [state, setState] = useState<BalanceSheetState>(scenarios[0].state);
  const [activeScenario, setActiveScenario] = useState<string>('normal');

  // Calculate totals
  const totalAssets = state.reserves + state.loans + state.securities;
  const totalLiabilities = state.deposits + state.borrowings + state.equity;

  // Check if balanced
  const isBalanced = totalAssets === totalLiabilities;

  // Calculate key ratios
  const ratios = useMemo(
    () => ({
      reserveRatio: state.deposits > 0 ? (state.reserves / state.deposits) * 100 : 0,
      loanToDeposit: state.deposits > 0 ? (state.loans / state.deposits) * 100 : 0,
      leverage: state.equity > 0 ? totalAssets / state.equity : 0,
    }),
    [state.reserves, state.loans, state.deposits, state.equity, totalAssets]
  );

  // Handle scenario change
  const handleScenarioChange = useCallback((scenarioId: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      setActiveScenario(scenarioId);
      setState(scenario.state);
    }
  }, []);

  // Handle slider changes - adjust to maintain balance
  const handleDepositChange = useCallback((newDeposits: number) => {
    const diff = newDeposits - state.deposits;
    setState((prev) => ({
      ...prev,
      deposits: newDeposits,
      reserves: Math.max(0, prev.reserves + diff),
    }));
    setActiveScenario('');
  }, [state.deposits]);

  const handleLoanChange = useCallback((newLoans: number) => {
    const diff = newLoans - state.loans;
    setState((prev) => ({
      ...prev,
      loans: newLoans,
      reserves: Math.max(0, prev.reserves - diff),
    }));
    setActiveScenario('');
  }, [state.loans]);

  const maxValue = 1000;

  return (
    <div className={cn('w-full', className)}>
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-2">
          Bank Balance Sheet
        </h2>
        <p className="text-sm text-text-tertiary">
          Interactive T-account showing how banks hold assets and liabilities
        </p>
      </div>

      {/* Scenario buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {scenarios.map((scenario) => (
          <motion.button
            key={scenario.id}
            onClick={() => handleScenarioChange(scenario.id)}
            className={cn(
              'px-4 py-2 rounded-lg flex items-center gap-2',
              'border transition-all duration-200',
              activeScenario === scenario.id
                ? 'bg-primary-500/20 border-primary-500 text-primary-500'
                : 'bg-glass-light border-glass-border text-text-secondary hover:border-primary-500/50'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{scenario.icon}</span>
            <span className="text-sm font-medium">{scenario.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Main T-account */}
      <div
        className={cn(
          'rounded-xl overflow-hidden',
          'bg-glass-light backdrop-blur-md',
          'border shadow-glass',
          isBalanced ? 'border-glass-border' : 'border-red-500/50'
        )}
      >
        {/* Header */}
        <div className="bg-surface-2 p-3 text-center border-b border-glass-border">
          <h3 className="text-base font-semibold text-text-primary">
            BANK BALANCE SHEET
          </h3>
        </div>

        {/* T-account body */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-glass-border">
          {/* Assets (Left Side) */}
          <div className="p-6">
            <h4 className="text-sm font-semibold text-emerald-500 mb-1 text-center">
              ASSETS
            </h4>
            <p className="text-xs text-text-tertiary mb-4 text-center">
              Uses of Funds
            </p>

            <div className="space-y-4">
              <ValueBar
                label="Reserves"
                value={state.reserves}
                maxValue={maxValue}
                color="bg-emerald-400"
              />
              <ValueBar
                label="Loans"
                value={state.loans}
                maxValue={maxValue}
                color="bg-emerald-500"
              />
              <ValueBar
                label="Securities"
                value={state.securities}
                maxValue={maxValue}
                color="bg-emerald-600"
              />
            </div>

            {/* Total Assets */}
            <div className="mt-6 pt-4 border-t border-glass-border">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-text-primary">
                  TOTAL:
                </span>
                <AnimatedValue
                  value={totalAssets}
                  prefix="$"
                  suffix="B"
                  size="lg"
                  className="text-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Liabilities (Right Side) */}
          <div className="p-6">
            <h4 className="text-sm font-semibold text-primary-500 mb-1 text-center">
              LIABILITIES
            </h4>
            <p className="text-xs text-text-tertiary mb-4 text-center">
              Sources of Funds
            </p>

            <div className="space-y-4">
              <ValueBar
                label="Deposits"
                value={state.deposits}
                maxValue={maxValue}
                color="bg-primary-400"
              />
              <ValueBar
                label="Borrowings"
                value={state.borrowings}
                maxValue={maxValue}
                color="bg-primary-500"
              />
              <ValueBar
                label="Equity (Capital)"
                value={state.equity}
                maxValue={maxValue}
                color="bg-primary-600"
              />
            </div>

            {/* Total Liabilities */}
            <div className="mt-6 pt-4 border-t border-glass-border">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-text-primary">
                  TOTAL:
                </span>
                <AnimatedValue
                  value={totalLiabilities}
                  prefix="$"
                  suffix="B"
                  size="lg"
                  className="text-primary-500"
                />
              </div>
              <p
                className={cn(
                  'text-xs mt-1 text-center',
                  isBalanced ? 'text-text-tertiary' : 'text-red-500 font-medium'
                )}
              >
                {isBalanced ? '(Must Balance!)' : 'Out of Balance!'}
              </p>
            </div>
          </div>
        </div>

        {/* Balance indicator */}
        <AnimatePresence>
          {!isBalanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-500/10 border-t border-red-500/30 p-3 text-center overflow-hidden"
            >
              <p className="text-sm text-red-500 font-medium">
                Warning: Assets ({totalAssets}B) do not equal Liabilities (
                {totalLiabilities}B)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive sliders */}
      <div
        className={cn(
          'mt-6 p-6 rounded-xl',
          'bg-glass-light backdrop-blur-md',
          'border border-glass-border'
        )}
      >
        <h4 className="text-sm font-semibold text-text-primary mb-4">
          Adjust Values
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Slider
            label="Deposits"
            value={state.deposits}
            onChange={handleDepositChange}
            min={100}
            max={1000}
            step={50}
            formatValue={(v) => `$${v}B`}
          />
          <Slider
            label="Loans"
            value={state.loans}
            onChange={handleLoanChange}
            min={100}
            max={900}
            step={50}
            formatValue={(v) => `$${v}B`}
          />
        </div>
      </div>

      {/* Key ratios */}
      <div
        className={cn(
          'mt-6 p-6 rounded-xl',
          'bg-glass-light backdrop-blur-md',
          'border border-glass-border'
        )}
      >
        <h4 className="text-sm font-semibold text-text-primary mb-4">
          Key Ratios
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-surface-2">
            <p className="text-xs text-text-tertiary mb-1">Reserve Ratio</p>
            <p className="text-lg font-mono font-semibold text-emerald-500">
              <AnimatedValue
                value={ratios.reserveRatio}
                suffix="%"
                decimals={1}
              />
            </p>
            <p className="text-xs text-text-tertiary">Reserves / Deposits</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-surface-2">
            <p className="text-xs text-text-tertiary mb-1">Loan-to-Deposit</p>
            <p className="text-lg font-mono font-semibold text-primary-500">
              <AnimatedValue
                value={ratios.loanToDeposit}
                suffix="%"
                decimals={1}
              />
            </p>
            <p className="text-xs text-text-tertiary">Loans / Deposits</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-surface-2">
            <p className="text-xs text-text-tertiary mb-1">Leverage</p>
            <p className="text-lg font-mono font-semibold text-amber-500">
              <AnimatedValue value={ratios.leverage} suffix="x" decimals={1} />
            </p>
            <p className="text-xs text-text-tertiary">Assets / Equity</p>
          </div>
        </div>
      </div>

      {/* Educational insights */}
      <div
        className={cn(
          'mt-6 p-6 rounded-xl',
          'bg-glass-light backdrop-blur-md',
          'border border-glass-border'
        )}
      >
        <h4 className="text-sm font-semibold text-text-primary mb-4">
          Key Insights
        </h4>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="text-lg">{insight.icon}</span>
              <p className="text-sm text-text-secondary">{insight.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Maturity mismatch visualization */}
      <MaturityMismatch />

      {/* Instruction hint */}
      <motion.p
        className="text-center text-xs text-text-tertiary mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Use sliders to adjust values or click scenarios to see different bank
        states
      </motion.p>
    </div>
  );
}
