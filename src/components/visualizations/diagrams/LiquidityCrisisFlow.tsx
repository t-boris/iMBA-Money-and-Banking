'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface LiquidityCrisisFlowProps {
  className?: string;
}

interface BalanceSheetState {
  cash: number;
  securities: number;
  loans: number;
  deposits: number;
  equity: number;
}

interface CrisisStep {
  id: number;
  title: string;
  description: string;
  balanceSheet: BalanceSheetState;
  highlight: string[];
  message: string;
  color: string;
}

const crisisSteps: CrisisStep[] = [
  {
    id: 1,
    title: 'Normal State',
    description: 'Bank operates with healthy balance sheet',
    balanceSheet: { cash: 10, securities: 20, loans: 70, deposits: 90, equity: 10 },
    highlight: [],
    message: 'All balanced. Bank is healthy with adequate liquidity.',
    color: '16, 185, 129', // emerald
  },
  {
    id: 2,
    title: 'Confidence Loss',
    description: 'News or rumor triggers depositor concern',
    balanceSheet: { cash: 10, securities: 20, loans: 70, deposits: 90, equity: 10 },
    highlight: ['deposits'],
    message: 'Trust is fragile. Depositors start questioning bank safety.',
    color: '245, 158, 11', // amber
  },
  {
    id: 3,
    title: 'Bank Run Begins',
    description: 'Depositors rush to withdraw funds',
    balanceSheet: { cash: 0, securities: 0, loans: 70, deposits: 50, equity: 10 },
    highlight: ['cash', 'securities', 'deposits'],
    message: 'Withdrawals spike: 40 units. Cash and securities depleted first.',
    color: '249, 115, 22', // orange
  },
  {
    id: 4,
    title: 'Liability Management Fails',
    description: 'Bank cannot borrow from markets',
    balanceSheet: { cash: 0, securities: 0, loans: 70, deposits: 50, equity: 10 },
    highlight: ['deposits'],
    message: 'Markets close to the bank. Wholesale funding unavailable. Rollover denied.',
    color: '239, 68, 68', // red
  },
  {
    id: 5,
    title: 'Fire Sale',
    description: 'Must sell assets at steep discount',
    balanceSheet: { cash: 15, securities: 0, loans: 50, deposits: 50, equity: 5 },
    highlight: ['loans', 'equity'],
    message: 'Loans worth 20 sold for 15. Fire sale loss = 5 (book value - sale price).',
    color: '220, 38, 38', // darker red
  },
  {
    id: 6,
    title: 'Equity Absorbs Loss',
    description: 'Capital buffer depleted, insolvency risk',
    balanceSheet: { cash: 15, securities: 0, loans: 50, deposits: 50, equity: 5 },
    highlight: ['equity'],
    message: 'Equity shrinks: 10 to 5. If losses exceed equity, INSOLVENCY.',
    color: '127, 29, 29', // very dark red
  },
];

const keyConcepts = [
  {
    label: 'Cash Shortfall',
    formula: 'Outflows - Inflows',
    description: 'When more money leaves than enters',
  },
  {
    label: 'Fire Sale Loss',
    formula: 'Book Value - Sale Price',
    description: 'Discount from forced selling',
  },
  {
    label: 'Liquidity to Solvency',
    formula: 'Contagion Risk',
    description: 'Cash problem becomes capital problem',
  },
];

export function LiquidityCrisisFlow({ className }: LiquidityCrisisFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConcepts, setShowConcepts] = useState(false);

  const step = crisisSteps[currentStep];

  // Auto-play through steps
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= crisisSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePlayCrisis = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(true);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handleStepChange = useCallback((direction: 'prev' | 'next') => {
    setIsPlaying(false);
    setCurrentStep((prev) => {
      if (direction === 'prev') return Math.max(0, prev - 1);
      return Math.min(crisisSteps.length - 1, prev + 1);
    });
  }, []);

  const totalAssets =
    step.balanceSheet.cash + step.balanceSheet.securities + step.balanceSheet.loans;
  const totalLiabilities = step.balanceSheet.deposits + step.balanceSheet.equity;

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          Liquidity Crisis: From Cash Crunch to Insolvency
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          How a bank run unfolds in 6 steps
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlayCrisis}
          disabled={isPlaying}
          style={{
            padding: '10px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: isPlaying ? 'var(--color-surface-2)' : 'rgba(239, 68, 68, 0.15)',
            color: isPlaying ? 'var(--color-text-muted)' : 'rgb(239, 68, 68)',
            fontWeight: 600,
            fontSize: '14px',
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {isPlaying ? (
            <>
              <span style={{ animation: 'pulse 1s infinite' }}>Playing...</span>
            </>
          ) : (
            <>
              <span>Play Crisis</span>
              <span>&#9658;</span>
            </>
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: 'var(--color-surface-1)',
            color: 'var(--color-text-secondary)',
            fontWeight: 500,
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Reset
        </motion.button>
      </div>

      {/* Step Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => handleStepChange('prev')}
          disabled={currentStep === 0}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor:
              currentStep === 0 ? 'var(--color-surface-1)' : 'var(--color-surface-2)',
            color: currentStep === 0 ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            fontSize: '18px',
          }}
        >
          &lt;
        </button>
        {crisisSteps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(i);
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: i === currentStep ? `2px solid rgb(${step.color})` : 'none',
              backgroundColor:
                i <= currentStep ? `rgba(${crisisSteps[i].color}, 0.2)` : 'var(--color-surface-1)',
              color: i === currentStep ? `rgb(${step.color})` : 'var(--color-text-muted)',
              fontWeight: i === currentStep ? 700 : 500,
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {s.id}
          </button>
        ))}
        <button
          onClick={() => handleStepChange('next')}
          disabled={currentStep === crisisSteps.length - 1}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor:
              currentStep === crisisSteps.length - 1
                ? 'var(--color-surface-1)'
                : 'var(--color-surface-2)',
            color:
              currentStep === crisisSteps.length - 1
                ? 'var(--color-text-muted)'
                : 'var(--color-text-primary)',
            cursor: currentStep === crisisSteps.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '18px',
          }}
        >
          &gt;
        </button>
      </div>

      {/* Current Step Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            padding: '20px',
            backgroundColor: `rgba(${step.color}, 0.1)`,
            borderRadius: '12px',
            marginBottom: '24px',
            border: `2px solid rgba(${step.color}, 0.3)`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: `rgb(${step.color})`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '18px',
              }}
            >
              {step.id}
            </div>
            <div>
              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: `rgb(${step.color})`,
                  margin: 0,
                }}
              >
                {step.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
                {step.description}
              </p>
            </div>
          </div>
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: `rgba(${step.color}, 0.08)`,
              borderRadius: '8px',
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              fontWeight: 500,
              lineHeight: '1.6',
            }}
          >
            {step.message}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Balance Sheet Visualization */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Balance Sheet
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Assets Side */}
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              Assets
            </div>
            {[
              { key: 'cash', label: 'Cash', color: '59, 130, 246' },
              { key: 'securities', label: 'Securities', color: '139, 92, 246' },
              { key: 'loans', label: 'Loans', color: '16, 185, 129' },
            ].map((asset) => {
              const value = step.balanceSheet[asset.key as keyof BalanceSheetState];
              const isHighlighted = step.highlight.includes(asset.key);
              const prevValue =
                currentStep > 0
                  ? crisisSteps[currentStep - 1].balanceSheet[asset.key as keyof BalanceSheetState]
                  : value;
              const change = value - prevValue;

              return (
                <motion.div
                  key={asset.key}
                  animate={{
                    backgroundColor: isHighlighted
                      ? `rgba(${step.color}, 0.15)`
                      : 'var(--color-surface-2)',
                    borderColor: isHighlighted ? `rgba(${step.color}, 0.5)` : 'transparent',
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    marginBottom: '8px',
                    border: '2px solid transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {asset.label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {change !== 0 && (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                          fontSize: '12px',
                          color: change < 0 ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)',
                          fontWeight: 500,
                        }}
                      >
                        {change > 0 ? '+' : ''}
                        {change}
                      </motion.span>
                    )}
                    <motion.span
                      key={`${asset.key}-${value}`}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: `rgb(${asset.color})`,
                        minWidth: '40px',
                        textAlign: 'right',
                      }}
                    >
                      {value}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
              }}
            >
              <span
                style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}
              >
                Total Assets
              </span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
                {totalAssets}
              </span>
            </div>
          </div>

          {/* Liabilities Side */}
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              Liabilities + Equity
            </div>
            {[
              { key: 'deposits', label: 'Deposits', color: '245, 158, 11' },
              { key: 'equity', label: 'Equity', color: '236, 72, 153' },
            ].map((liability) => {
              const value = step.balanceSheet[liability.key as keyof BalanceSheetState];
              const isHighlighted = step.highlight.includes(liability.key);
              const prevValue =
                currentStep > 0
                  ? crisisSteps[currentStep - 1].balanceSheet[
                      liability.key as keyof BalanceSheetState
                    ]
                  : value;
              const change = value - prevValue;

              return (
                <motion.div
                  key={liability.key}
                  animate={{
                    backgroundColor: isHighlighted
                      ? `rgba(${step.color}, 0.15)`
                      : 'var(--color-surface-2)',
                    borderColor: isHighlighted ? `rgba(${step.color}, 0.5)` : 'transparent',
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    marginBottom: '8px',
                    border: '2px solid transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {liability.label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {change !== 0 && (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                          fontSize: '12px',
                          color: change < 0 ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)',
                          fontWeight: 500,
                        }}
                      >
                        {change > 0 ? '+' : ''}
                        {change}
                      </motion.span>
                    )}
                    <motion.span
                      key={`${liability.key}-${value}`}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: `rgb(${liability.color})`,
                        minWidth: '40px',
                        textAlign: 'right',
                      }}
                    >
                      {value}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
              }}
            >
              <span
                style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}
              >
                Total L+E
              </span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
                {totalLiabilities}
              </span>
            </div>
          </div>
        </div>

        {/* Fire Sale Loss Indicator */}
        {currentStep >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '10px',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(239, 68, 68)',
                marginBottom: '4px',
              }}
            >
              Fire Sale Loss
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'rgb(239, 68, 68)' }}>-5</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Book value 20 sold for 15
            </div>
          </motion.div>
        )}
      </div>

      {/* Key Concepts Panel */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => setShowConcepts(!showConcepts)}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: 'var(--color-surface-1)',
            color: 'var(--color-text-primary)',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Key Concepts</span>
          <span
            style={{
              transform: showConcepts ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            &#9660;
          </span>
        </button>
        <AnimatePresence>
          {showConcepts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginTop: '12px',
                }}
              >
                {keyConcepts.map((concept, i) => (
                  <motion.div
                    key={concept.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      padding: '16px',
                      backgroundColor: 'var(--color-surface-1)',
                      borderRadius: '10px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: '4px',
                      }}
                    >
                      {concept.label}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'rgb(99, 102, 241)',
                        marginBottom: '8px',
                      }}
                    >
                      {concept.formula}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {concept.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Crisis Timeline Progress */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          padding: '16px',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          Crisis Timeline
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {crisisSteps.map((s, i) => (
            <div
              key={s.id}
              style={{
                flex: 1,
                height: '8px',
                backgroundColor: i <= currentStep ? `rgb(${s.color})` : 'var(--color-surface-2)',
                borderRadius:
                  i === 0 ? '4px 0 0 4px' : i === crisisSteps.length - 1 ? '0 4px 4px 0' : '0',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
            fontSize: '10px',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>Normal</span>
          <span>Crisis</span>
          <span>Insolvency Risk</span>
        </div>
      </div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Click &quot;Play Crisis&quot; to animate through all 6 steps, or navigate step-by-step
      </p>
    </div>
  );
}
