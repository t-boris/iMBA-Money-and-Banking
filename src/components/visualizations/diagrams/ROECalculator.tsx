'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { Slider } from '../Slider';
import { AnimatedValue } from '../AnimatedValue';
import { cn } from '@/lib/utils';

interface BankMetrics {
  netIncome: number;
  totalAssets: number;
  totalEquity: number;
}

interface Preset {
  name: string;
  description: string;
  metrics: BankMetrics;
}

const presets: Preset[] = [
  {
    name: 'JPMorgan Chase',
    description: 'Largest US bank by assets',
    metrics: {
      netIncome: 48,
      totalAssets: 3700,
      totalEquity: 300,
    },
  },
  {
    name: 'Bank of America',
    description: 'Major money center bank',
    metrics: {
      netIncome: 26,
      totalAssets: 3200,
      totalEquity: 270,
    },
  },
  {
    name: 'Community Bank',
    description: 'Typical small regional bank',
    metrics: {
      netIncome: 0.05,
      totalAssets: 2,
      totalEquity: 0.2,
    },
  },
];

interface ROECalculatorProps {
  className?: string;
}

export function ROECalculator({ className }: ROECalculatorProps) {
  const [metrics, setMetrics] = useState<BankMetrics>({
    netIncome: 30,
    totalAssets: 2000,
    totalEquity: 200,
  });

  // Calculations (with safety for division by zero)
  const roa = metrics.totalAssets > 0 ? (metrics.netIncome / metrics.totalAssets) * 100 : 0;
  const roe = metrics.totalEquity > 0 ? (metrics.netIncome / metrics.totalEquity) * 100 : 0;
  const leverage = metrics.totalEquity > 0 ? metrics.totalAssets / metrics.totalEquity : 0;

  // Verification: ROE should equal ROA * Leverage
  const roaTimesLeverage = roa * leverage;

  // Warning states
  const isHighLeverage = leverage > 15;
  const isVeryHighLeverage = leverage > 20;

  const updateMetric = (key: keyof BankMetrics, value: number) => {
    setMetrics((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: Preset) => {
    setMetrics(preset.metrics);
  };

  // Format large numbers appropriately
  const formatAssets = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}T`;
    }
    return `$${value.toFixed(0)}B`;
  };

  const formatIncome = (value: number) => {
    if (value < 1) {
      return `$${(value * 1000).toFixed(0)}M`;
    }
    return `$${value.toFixed(1)}B`;
  };

  const formatEquity = (value: number) => {
    if (value < 1) {
      return `$${(value * 1000).toFixed(0)}M`;
    }
    return `$${value.toFixed(0)}B`;
  };

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          ROA/ROE Calculator: The Leverage Effect
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Banks use leverage to amplify returns on assets into higher returns on equity.
          Adjust the sliders or select a real bank to see how leverage works.
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
            Bank Financials
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Slider
              label="Net Income"
              value={metrics.netIncome}
              onChange={(value) => updateMetric('netIncome', value)}
              min={0.01}
              max={50}
              step={0.5}
              formatValue={formatIncome}
            />

            <Slider
              label="Total Assets"
              value={metrics.totalAssets}
              onChange={(value) => updateMetric('totalAssets', value)}
              min={1}
              max={4000}
              step={10}
              formatValue={formatAssets}
            />

            <Slider
              label="Total Equity (Capital)"
              value={metrics.totalEquity}
              onChange={(value) => updateMetric('totalEquity', value)}
              min={0.1}
              max={300}
              step={1}
              formatValue={formatEquity}
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
            Performance Metrics
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* ROA */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}>
              <div>
                <span style={{ fontSize: '14px', color: 'rgb(99, 102, 241)', fontWeight: 600 }}>ROA</span>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Return on Assets
                </div>
              </div>
              <AnimatedValue value={roa} suffix="%" decimals={2} size="lg" className="text-indigo-500" />
            </div>

            {/* Leverage - with multiplier symbol */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: isHighLeverage ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)',
              borderRadius: '10px',
              border: isHighLeverage ? '2px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(245, 158, 11, 0.2)',
            }}>
              <div>
                <span style={{ fontSize: '14px', color: 'rgb(245, 158, 11)', fontWeight: 600 }}>Leverage</span>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Assets / Equity
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <AnimatedValue value={leverage} suffix="x" decimals={1} size="lg" className="text-amber-500" />
              </div>
            </div>

            {/* ROE - Hero metric */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: roe > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              borderRadius: '10px',
              border: roe > 0 ? '2px solid rgba(16, 185, 129, 0.4)' : '2px solid rgba(239, 68, 68, 0.4)',
            }}>
              <div>
                <span style={{ fontSize: '14px', color: roe > 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)', fontWeight: 600 }}>
                  ROE
                </span>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Return on Equity
                </div>
              </div>
              <AnimatedValue
                value={roe}
                suffix="%"
                decimals={1}
                size="xl"
                className={roe > 0 ? 'text-emerald-500' : 'text-red-500'}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Leverage Amplification Visual */}
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
          How Leverage Amplifies Returns
        </h4>

        {/* Visual representation of ROA x Leverage = ROE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {/* ROA Bar */}
          <div style={{ flex: '0 0 auto', minWidth: '80px' }}>
            <div style={{ fontSize: '12px', color: 'rgb(99, 102, 241)', fontWeight: 500, marginBottom: '4px' }}>
              ROA
            </div>
            <div style={{ height: '40px', backgroundColor: 'var(--color-surface-2)', borderRadius: '6px', overflow: 'hidden', width: '80px' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.abs(roa) * 50, 100)}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, rgb(99, 102, 241), rgb(129, 140, 248))',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>
                  {roa.toFixed(1)}%
                </span>
              </motion.div>
            </div>
          </div>

          {/* Multiplier */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              borderRadius: '8px',
              border: '2px solid rgba(245, 158, 11, 0.4)',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'rgb(245, 158, 11)' }}>
              x {leverage.toFixed(1)}
            </span>
          </motion.div>

          {/* Equals */}
          <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-muted)' }}>=</span>

          {/* ROE Bar */}
          <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
            <div style={{ fontSize: '12px', color: 'rgb(16, 185, 129)', fontWeight: 500, marginBottom: '4px' }}>
              ROE
            </div>
            <div style={{ height: '40px', backgroundColor: 'var(--color-surface-2)', borderRadius: '6px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.abs(roe) * 5, 100)}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  height: '100%',
                  background: roe > 0
                    ? 'linear-gradient(90deg, rgb(16, 185, 129), rgb(52, 211, 153))'
                    : 'linear-gradient(90deg, rgb(239, 68, 68), rgb(248, 113, 113))',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '12px',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>
                  {roe.toFixed(1)}%
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Formula verification */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: 'var(--color-surface-2)',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
        }}>
          <span style={{ color: 'rgb(99, 102, 241)' }}>{roa.toFixed(2)}%</span>
          <span style={{ color: 'var(--color-text-muted)' }}> ROA </span>
          <span style={{ color: 'rgb(245, 158, 11)' }}>x {leverage.toFixed(1)}</span>
          <span style={{ color: 'var(--color-text-muted)' }}> leverage </span>
          <span style={{ color: 'var(--color-text-muted)' }}>= </span>
          <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 600 }}>{roaTimesLeverage.toFixed(1)}%</span>
          <span style={{ color: 'var(--color-text-muted)' }}> ROE</span>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: '16px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '12px',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              Small ROA x Large Leverage = Significant ROE
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              Banks typically earn 1-1.5% ROA, but leverage of 10-12x transforms this into 10-15% ROE.
              This is why banking is attractive despite thin profit margins on assets.
            </div>
          </div>
        </div>
      </motion.div>

      {/* High leverage warning */}
      {isHighLeverage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '16px',
            backgroundColor: isVeryHighLeverage ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: isVeryHighLeverage ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '24px' }}>{isVeryHighLeverage ? '🚨' : '⚠️'}</span>
          <div>
            <div style={{
              fontWeight: 600,
              fontSize: '14px',
              color: isVeryHighLeverage ? 'rgb(239, 68, 68)' : 'rgb(217, 119, 6)',
              marginBottom: '4px',
            }}>
              {isVeryHighLeverage ? 'Extremely High Leverage!' : 'High Leverage Warning'}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              High leverage amplifies both gains AND losses. A {leverage.toFixed(0)}x leverage ratio means
              a {(1/leverage * 100).toFixed(1)}% loss on assets would wipe out all equity.
              {isVeryHighLeverage && ' This level of leverage contributed to bank failures in 2008.'}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
