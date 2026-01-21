'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { Slider } from '../Slider';
import { AnimatedValue } from '../AnimatedValue';
import { cn } from '@/lib/utils';

interface BankMetrics {
  depositRate: number;
  loanRate: number;
  totalDeposits: number;
  ltdRatio: number;
}

interface Preset {
  name: string;
  description: string;
  metrics: BankMetrics;
}

const presets: Preset[] = [
  {
    name: '3-6-3 Rule',
    description: 'Classic banking: pay 3%, charge 6%, golf at 3pm',
    metrics: {
      depositRate: 3,
      loanRate: 6,
      totalDeposits: 500,
      ltdRatio: 75,
    },
  },
  {
    name: 'Modern Bank',
    description: 'Low rates era with tighter margins',
    metrics: {
      depositRate: 1,
      loanRate: 5,
      totalDeposits: 800,
      ltdRatio: 85,
    },
  },
];

interface InterestSpreadCalculatorProps {
  className?: string;
}

export function InterestSpreadCalculator({ className }: InterestSpreadCalculatorProps) {
  const [metrics, setMetrics] = useState<BankMetrics>({
    depositRate: 2,
    loanRate: 6,
    totalDeposits: 500,
    ltdRatio: 80,
  });

  // Calculations
  const totalLoans = metrics.totalDeposits * (metrics.ltdRatio / 100);
  const interestIncome = totalLoans * (metrics.loanRate / 100);
  const interestExpense = metrics.totalDeposits * (metrics.depositRate / 100);
  const netInterestIncome = interestIncome - interestExpense;
  const spread = metrics.loanRate - metrics.depositRate;

  // Warning state
  const isLowSpread = spread < 1;
  const isNegativeSpread = spread <= 0;

  const updateMetric = (key: keyof BankMetrics, value: number) => {
    setMetrics((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: Preset) => {
    setMetrics(preset.metrics);
  };

  // Format currency in billions
  const formatBillions = (value: number) => `$${value}B`;

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Interest Spread Calculator
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Banks profit from the spread between what they charge borrowers and pay depositors.
          Adjust the sliders to see how different rates affect bank profitability.
        </p>
      </div>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {presets.map((preset) => (
          <motion.button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '12px 20px',
              backgroundColor: 'var(--color-surface-1)',
              border: '1px solid var(--color-surface-2)',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)' }}>
              {preset.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {preset.description}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Left: Sliders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-surface-1)',
            border: '1px solid var(--color-surface-2)',
          }}
        >
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '20px' }}>
            Bank Parameters
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Slider
              label="Deposit Rate (what bank pays)"
              value={metrics.depositRate}
              onChange={(value) => updateMetric('depositRate', value)}
              min={0}
              max={5}
              step={0.1}
              unit="%"
            />

            <Slider
              label="Loan Rate (what bank charges)"
              value={metrics.loanRate}
              onChange={(value) => updateMetric('loanRate', value)}
              min={2}
              max={12}
              step={0.1}
              unit="%"
            />

            <Slider
              label="Total Deposits"
              value={metrics.totalDeposits}
              onChange={(value) => updateMetric('totalDeposits', value)}
              min={100}
              max={1000}
              step={10}
              formatValue={formatBillions}
            />

            <Slider
              label="Loan-to-Deposit Ratio"
              value={metrics.ltdRatio}
              onChange={(value) => updateMetric('ltdRatio', value)}
              min={50}
              max={95}
              step={1}
              unit="%"
            />
          </div>
        </motion.div>

        {/* Right: Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-surface-1)',
            border: '1px solid var(--color-surface-2)',
          }}
        >
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '20px' }}>
            Bank Performance
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Total Loans */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total Loans</span>
              <AnimatedValue value={totalLoans} prefix="$" suffix="B" decimals={1} size="md" />
            </div>

            {/* Interest Income */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}>
              <span style={{ fontSize: '14px', color: 'rgb(16, 185, 129)', fontWeight: 500 }}>Interest Income</span>
              <AnimatedValue value={interestIncome} prefix="$" suffix="B" decimals={2} size="md" className="text-emerald-500" />
            </div>

            {/* Interest Expense */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(245, 158, 11, 0.2)',
            }}>
              <span style={{ fontSize: '14px', color: 'rgb(245, 158, 11)', fontWeight: 500 }}>Interest Expense</span>
              <AnimatedValue value={interestExpense} prefix="$" suffix="B" decimals={2} size="md" className="text-amber-500" />
            </div>

            {/* Interest Spread */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              backgroundColor: isLowSpread ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
              borderRadius: '8px',
              border: isLowSpread ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(99, 102, 241, 0.2)',
            }}>
              <span style={{ fontSize: '14px', color: isLowSpread ? 'rgb(239, 68, 68)' : 'rgb(99, 102, 241)', fontWeight: 500 }}>
                Interest Spread
              </span>
              <AnimatedValue
                value={spread}
                suffix="%"
                decimals={1}
                size="md"
                className={isLowSpread ? 'text-red-500' : 'text-indigo-500'}
              />
            </div>

            {/* Net Interest Income - Hero metric */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: netInterestIncome > 0 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              borderRadius: '12px',
              border: netInterestIncome > 0 ? '2px solid rgba(99, 102, 241, 0.4)' : '2px solid rgba(239, 68, 68, 0.4)',
              marginTop: '8px',
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                color: netInterestIncome > 0 ? 'rgb(99, 102, 241)' : 'rgb(239, 68, 68)',
              }}>
                Net Interest Income
              </span>
              <AnimatedValue
                value={netInterestIncome}
                prefix="$"
                suffix="B"
                decimals={2}
                size="lg"
                className={netInterestIncome > 0 ? 'text-indigo-500' : 'text-red-500'}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Visual Bar Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '16px',
        }}
      >
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
          Income vs Expense Comparison
        </h4>

        {/* Income Bar */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: 'rgb(16, 185, 129)', fontWeight: 500 }}>Interest Income</span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>${interestIncome.toFixed(2)}B</span>
          </div>
          <div style={{ height: '24px', backgroundColor: 'var(--color-surface-2)', borderRadius: '6px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((interestIncome / Math.max(interestIncome, interestExpense)) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, rgb(16, 185, 129), rgb(52, 211, 153))',
                borderRadius: '6px',
              }}
            />
          </div>
        </div>

        {/* Expense Bar */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: 'rgb(245, 158, 11)', fontWeight: 500 }}>Interest Expense</span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>${interestExpense.toFixed(2)}B</span>
          </div>
          <div style={{ height: '24px', backgroundColor: 'var(--color-surface-2)', borderRadius: '6px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((interestExpense / Math.max(interestIncome, interestExpense)) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, rgb(245, 158, 11), rgb(251, 191, 36))',
                borderRadius: '6px',
              }}
            />
          </div>
        </div>

        {/* Net Result */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '12px',
          borderTop: '1px solid var(--color-surface-2)',
        }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Net Profit Margin
          </span>
          <span style={{
            fontSize: '14px',
            fontWeight: 600,
            color: netInterestIncome > 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
          }}>
            {interestIncome > 0 ? ((netInterestIncome / interestIncome) * 100).toFixed(1) : 0}%
          </span>
        </div>
      </motion.div>

      {/* Warning for low spread */}
      {isLowSpread && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '16px',
            backgroundColor: isNegativeSpread ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: isNegativeSpread ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '24px' }}>{isNegativeSpread ? '🚨' : '⚠️'}</span>
          <div>
            <div style={{
              fontWeight: 600,
              fontSize: '14px',
              color: isNegativeSpread ? 'rgb(239, 68, 68)' : 'rgb(217, 119, 6)',
              marginBottom: '4px',
            }}>
              {isNegativeSpread ? 'Negative Spread - Bank Losing Money!' : 'Low Spread Warning'}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              {isNegativeSpread
                ? 'The bank is paying more to depositors than it earns from loans. This is unsustainable and would lead to bank failure.'
                : 'A spread below 1% makes it difficult for banks to cover operating costs, loan losses, and generate profit. Most profitable banks maintain spreads of 2-4%.'}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
