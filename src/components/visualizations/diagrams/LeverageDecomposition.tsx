'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface LeverageDecompositionProps {
  className?: string;
}

type Scenario = 'good' | 'bad';

interface ScenarioData {
  roa: number;
  leverage: number;
  roe: number;
  description: string;
}

const scenarios: Record<Scenario, ScenarioData> = {
  good: {
    roa: 1.0,
    leverage: 12,
    roe: 12.0,
    description: 'Economic expansion, low defaults, strong fee income',
  },
  bad: {
    roa: -1.0,
    leverage: 12,
    roe: -12.0,
    description: 'Recession, high loan losses, falling asset values',
  },
};

// Historical context data
const historicalData = [
  { year: '2006', roa: 1.3, roe: 13.0, leverage: 10.0, crisis: false },
  { year: '2007', roa: 0.9, roe: 9.2, leverage: 10.2, crisis: false },
  { year: '2008', roa: -0.1, roe: -1.8, leverage: 11.8, crisis: true },
  { year: '2009', roa: -0.2, roe: -2.5, leverage: 10.5, crisis: true },
  { year: '2010', roa: 0.7, roe: 7.5, leverage: 10.7, crisis: false },
  { year: '2019', roa: 1.3, roe: 11.5, leverage: 8.8, crisis: false },
  { year: '2020', roa: 0.7, roe: 6.0, leverage: 8.6, crisis: true },
  { year: '2023', roa: 1.2, roe: 10.8, leverage: 9.0, crisis: false },
];

export function LeverageDecomposition({ className }: LeverageDecompositionProps) {
  const [activeScenario, setActiveScenario] = useState<Scenario>('good');
  const [showHistory, setShowHistory] = useState(false);

  const currentData = scenarios[activeScenario];
  const isPositive = currentData.roe > 0;

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          Leverage: A Double-Edged Sword
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          The same leverage that amplifies gains in good times magnifies losses during downturns.
          Toggle between scenarios to see the effect.
        </p>
      </div>

      {/* Scenario Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '28px',
          padding: '4px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          width: 'fit-content',
          margin: '0 auto 28px auto',
        }}
      >
        <motion.button
          onClick={() => setActiveScenario('good')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '12px 24px',
            backgroundColor: activeScenario === 'good' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            border:
              activeScenario === 'good'
                ? '2px solid rgba(16, 185, 129, 0.4)'
                : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color:
                activeScenario === 'good' ? 'rgb(16, 185, 129)' : 'var(--color-text-secondary)',
            }}
          >
            ☀️ Good Times
          </span>
        </motion.button>
        <motion.button
          onClick={() => setActiveScenario('bad')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '12px 24px',
            backgroundColor: activeScenario === 'bad' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
            border:
              activeScenario === 'bad'
                ? '2px solid rgba(239, 68, 68, 0.4)'
                : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: activeScenario === 'bad' ? 'rgb(239, 68, 68)' : 'var(--color-text-secondary)',
            }}
          >
            🌧️ Bad Times
          </span>
        </motion.button>
      </div>

      {/* Main Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '24px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '20px',
        }}
      >
        {/* Scenario Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              padding: '12px 16px',
              backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                color: isPositive ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                fontWeight: 500,
              }}
            >
              {currentData.description}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Leverage Amplification Visual */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}
        >
          {/* ROA Box */}
          <motion.div
            layout
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '12px',
              border: '2px solid rgba(99, 102, 241, 0.3)',
              minWidth: '100px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                color: 'rgb(99, 102, 241)',
                fontWeight: 500,
                marginBottom: '8px',
              }}
            >
              ROA
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`roa-${activeScenario}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: currentData.roa >= 0 ? 'rgb(99, 102, 241)' : 'rgb(239, 68, 68)',
                  fontFamily: 'monospace',
                }}
              >
                {currentData.roa > 0 ? '+' : ''}
                {currentData.roa.toFixed(1)}%
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Multiplier with pulsing animation */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                '0 0 0 0 rgba(245, 158, 11, 0.3)',
                '0 0 0 12px rgba(245, 158, 11, 0)',
                '0 0 0 0 rgba(245, 158, 11, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              padding: '16px 24px',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              borderRadius: '12px',
              border: '3px solid rgba(245, 158, 11, 0.5)',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'rgb(245, 158, 11)' }}>
              x {currentData.leverage}
            </span>
            <div style={{ fontSize: '10px', color: 'rgb(180, 130, 20)', marginTop: '4px' }}>
              LEVERAGE
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path
              d="M0 12 L32 12 M24 4 L32 12 L24 20"
              stroke={isPositive ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>

          {/* ROE Box - Larger to show amplification */}
          <motion.div
            layout
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px 32px',
              backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              borderRadius: '12px',
              border: isPositive
                ? '3px solid rgba(16, 185, 129, 0.5)'
                : '3px solid rgba(239, 68, 68, 0.5)',
              minWidth: '140px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                color: isPositive ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                fontWeight: 500,
                marginBottom: '8px',
              }}
            >
              ROE
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`roe-${activeScenario}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: isPositive ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                  fontFamily: 'monospace',
                }}
              >
                {currentData.roe > 0 ? '+' : ''}
                {currentData.roe.toFixed(1)}%
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Formula display */}
        <div
          style={{
            textAlign: 'center',
            padding: '12px',
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          <span style={{ color: 'rgb(99, 102, 241)' }}>ROE</span>
          <span style={{ color: 'var(--color-text-muted)' }}> = </span>
          <span style={{ color: 'rgb(99, 102, 241)' }}>ROA</span>
          <span style={{ color: 'var(--color-text-muted)' }}> x </span>
          <span style={{ color: 'rgb(245, 158, 11)' }}>(Assets / Equity)</span>
        </div>
      </motion.div>

      {/* Key Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          padding: '16px',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          border: '1px solid rgba(147, 51, 234, 0.2)',
          borderRadius: '12px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '24px' }}>⚖️</span>
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              marginBottom: '4px',
            }}
          >
            Same Leverage, Opposite Outcomes
          </div>
          <div
            style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}
          >
            With 12x leverage, a +1% ROA becomes +12% ROE in good times, but a -1% ROA becomes -12%
            ROE in bad times. This is why bank capital regulation matters - it limits the
            amplification of losses.
          </div>
        </div>
      </motion.div>

      {/* Historical Context Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={() => setShowHistory(!showHistory)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: showHistory ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-surface-1)',
            border: showHistory
              ? '1px solid rgba(99, 102, 241, 0.3)'
              : '1px solid var(--color-surface-2)',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '24px' }}>📊</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, color: 'var(--color-text-primary)', fontSize: '14px' }}>
              Historical Perspective
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              See how leverage amplified losses during real crises
            </div>
          </div>
          <motion.span
            animate={{ rotate: showHistory ? 180 : 0 }}
            style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}
          >
            ▼
          </motion.span>
        </button>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: '12px',
                  padding: '20px',
                  backgroundColor: 'var(--color-surface-1)',
                  border: '1px solid var(--color-surface-2)',
                  borderRadius: '12px',
                }}
              >
                {/* Table Header */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 80px 80px 80px',
                    gap: '12px',
                    marginBottom: '12px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--color-surface-2)',
                  }}
                >
                  <div
                    style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}
                  >
                    Year
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(99, 102, 241)' }}>
                    ROA
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}>
                    ROE
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(245, 158, 11)' }}>
                    Leverage
                  </div>
                </div>

                {/* Table Data */}
                {historicalData.map((data, index) => (
                  <motion.div
                    key={data.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 80px 80px 80px',
                      gap: '12px',
                      padding: '8px 0',
                      backgroundColor: data.crisis ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                      borderRadius: '4px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: data.crisis ? 600 : 400,
                        color: data.crisis ? 'rgb(239, 68, 68)' : 'var(--color-text-primary)',
                      }}
                    >
                      {data.year} {data.crisis && '⚠️'}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        color: data.roa >= 0 ? 'rgb(99, 102, 241)' : 'rgb(239, 68, 68)',
                      }}
                    >
                      {data.roa > 0 ? '+' : ''}
                      {data.roa.toFixed(1)}%
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        fontWeight: 600,
                        color: data.roe >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                      }}
                    >
                      {data.roe > 0 ? '+' : ''}
                      {data.roe.toFixed(1)}%
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        color: 'rgb(245, 158, 11)',
                      }}
                    >
                      {data.leverage.toFixed(1)}x
                    </div>
                  </motion.div>
                ))}

                {/* Crisis Highlight */}
                <div
                  style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong style={{ color: 'rgb(239, 68, 68)' }}>2008 Financial Crisis:</strong>{' '}
                    Banks with high leverage saw small asset losses magnified into devastating
                    equity losses. This led to the Basel III capital requirements that limit bank
                    leverage.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
