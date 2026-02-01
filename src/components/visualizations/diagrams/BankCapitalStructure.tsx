'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface BankCapitalStructureProps {
  className?: string;
}

type LossScenario = 'normal' | 'small-loss' | 'large-loss' | 'insolvency';

interface ScenarioData {
  id: LossScenario;
  name: string;
  description: string;
  assets: number; // in billions
  liabilities: number;
  equity: number;
  lossAmount: number;
  status: 'healthy' | 'stressed' | 'critical' | 'insolvent';
  statusColor: string;
  equityColor: string;
}

const scenarios: ScenarioData[] = [
  {
    id: 'normal',
    name: 'Normal Operations',
    description: 'Bank is well-capitalized with healthy equity buffer',
    assets: 100,
    liabilities: 90,
    equity: 10,
    lossAmount: 0,
    status: 'healthy',
    statusColor: 'rgb(16, 185, 129)',
    equityColor: 'rgb(16, 185, 129)',
  },
  {
    id: 'small-loss',
    name: 'Small Loss (2%)',
    description: 'Loan defaults cause $2B loss - equity absorbs it',
    assets: 98,
    liabilities: 90,
    equity: 8,
    lossAmount: 2,
    status: 'stressed',
    statusColor: 'rgb(245, 158, 11)',
    equityColor: 'rgb(245, 158, 11)',
  },
  {
    id: 'large-loss',
    name: 'Large Loss (7%)',
    description: 'Major credit event - equity severely depleted',
    assets: 93,
    liabilities: 90,
    equity: 3,
    lossAmount: 7,
    status: 'critical',
    statusColor: 'rgb(239, 68, 68)',
    equityColor: 'rgb(239, 68, 68)',
  },
  {
    id: 'insolvency',
    name: 'Insolvency (12%)',
    description: 'Losses exceed equity - liabilities at risk',
    assets: 88,
    liabilities: 90,
    equity: -2,
    lossAmount: 12,
    status: 'insolvent',
    statusColor: 'rgb(127, 29, 29)',
    equityColor: 'rgb(127, 29, 29)',
  },
];

export function BankCapitalStructure({ className }: BankCapitalStructureProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showWaterfall, setShowWaterfall] = useState(false);

  const scenario = scenarios[scenarioIndex];

  // Calculate bar heights (max height = 300px for $100B)
  const maxHeight = 300;
  const assetsHeight = (scenario.assets / 100) * maxHeight;
  const liabilitiesHeight = (scenario.liabilities / 100) * maxHeight;
  const equityHeight = (Math.abs(scenario.equity) / 100) * maxHeight;
  const equityPercentage = ((scenario.equity / scenario.assets) * 100).toFixed(1);

  // Threshold line position
  const insolvencyThreshold = (90 / 100) * maxHeight; // Where assets = liabilities

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '800px', margin: '0 auto' }}>
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
          Bank Capital Structure
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Equity serves as the &quot;loss absorber&quot; protecting creditors and depositors
        </p>
      </div>

      {/* Scenario Selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {scenarios.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setScenarioIndex(index)}
            style={{
              padding: '12px 8px',
              borderRadius: '10px',
              border:
                scenarioIndex === index
                  ? `2px solid ${s.statusColor}`
                  : '2px solid var(--color-surface-2)',
              backgroundColor:
                scenarioIndex === index ? `${s.statusColor}15` : 'var(--color-surface-1)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: scenarioIndex === index ? s.statusColor : 'var(--color-text-primary)',
              }}
            >
              {s.name}
            </div>
            <div
              style={{
                fontSize: '10px',
                color: 'var(--color-text-muted)',
                marginTop: '4px',
              }}
            >
              Loss: ${s.lossAmount}B
            </div>
          </button>
        ))}
      </div>

      {/* Main Visualization */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '60px',
            height: `${maxHeight + 60}px`,
            position: 'relative',
          }}
        >
          {/* Insolvency threshold line */}
          <AnimatePresence>
            {scenarioIndex >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  left: '10%',
                  right: '10%',
                  bottom: `${insolvencyThreshold}px`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    background:
                      'repeating-linear-gradient(90deg, rgb(239, 68, 68) 0px, rgb(239, 68, 68) 8px, transparent 8px, transparent 16px)',
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'rgb(239, 68, 68)',
                    whiteSpace: 'nowrap',
                    backgroundColor: 'var(--color-surface-1)',
                    padding: '2px 8px',
                  }}
                >
                  INSOLVENCY THRESHOLD
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    background:
                      'repeating-linear-gradient(90deg, rgb(239, 68, 68) 0px, rgb(239, 68, 68) 8px, transparent 8px, transparent 16px)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Assets Bar */}
          <div style={{ textAlign: 'center' }}>
            <motion.div
              animate={{ height: assetsHeight }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
              style={{
                width: '120px',
                backgroundColor: 'rgb(59, 130, 246)',
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Loss indicator */}
              <AnimatePresence>
                {scenario.lossAmount > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(scenario.lossAmount / 100) * maxHeight}px` }}
                    exit={{ height: 0 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(239, 68, 68, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: 'white', fontWeight: 600 }}>
                      -${scenario.lossAmount}B
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.span
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                ${scenario.assets}B
              </motion.span>
            </motion.div>
            <div
              style={{
                marginTop: '12px',
                padding: '6px 16px',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                borderRadius: '6px',
                display: 'inline-block',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(59, 130, 246)' }}>
                ASSETS
              </span>
            </div>
          </div>

          {/* Equals Sign */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--color-text-muted)',
              marginBottom: '40px',
            }}
          >
            =
          </div>

          {/* Liabilities + Equity Stack */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative' }}>
              {/* Equity (on top or below for insolvency) */}
              {scenario.equity >= 0 ? (
                <>
                  <motion.div
                    animate={{ height: equityHeight }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    style={{
                      width: '120px',
                      backgroundColor: scenario.equityColor,
                      borderRadius: '8px 8px 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <motion.span
                      style={{
                        fontSize: equityHeight > 30 ? '16px' : '12px',
                        fontWeight: 700,
                        color: 'white',
                      }}
                    >
                      ${scenario.equity}B
                    </motion.span>
                    {equityHeight > 50 && (
                      <span
                        style={{
                          fontSize: '10px',
                          color: 'rgba(255,255,255,0.8)',
                          marginTop: '2px',
                        }}
                      >
                        Equity
                      </span>
                    )}
                  </motion.div>
                  <motion.div
                    animate={{ height: liabilitiesHeight }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    style={{
                      width: '120px',
                      backgroundColor: 'rgb(245, 158, 11)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>
                      ${scenario.liabilities}B
                    </span>
                    <span
                      style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}
                    >
                      Liabilities
                    </span>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ height: liabilitiesHeight }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    style={{
                      width: '120px',
                      backgroundColor: 'rgb(245, 158, 11)',
                      borderRadius: '8px 8px 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>
                      ${scenario.liabilities}B
                    </span>
                    <span
                      style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}
                    >
                      Liabilities
                    </span>
                  </motion.div>
                  {/* Negative equity indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      position: 'absolute',
                      top: '-40px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '6px 12px',
                      backgroundColor: 'rgb(127, 29, 29)',
                      borderRadius: '6px',
                      border: '2px solid rgb(239, 68, 68)',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>
                      Equity: -${Math.abs(scenario.equity)}B
                    </span>
                  </motion.div>
                </>
              )}
            </div>
            <div
              style={{
                marginTop: '12px',
                padding: '6px 16px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                borderRadius: '6px',
                display: 'inline-block',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(245, 158, 11)' }}>
                L + E
              </span>
            </div>
          </div>
        </div>

        {/* Equation */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            padding: '12px 20px',
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: '10px',
            display: 'inline-block',
            width: '100%',
          }}
        >
          <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            <span style={{ color: 'rgb(59, 130, 246)', fontWeight: 600 }}>Assets</span>
            {' = '}
            <span style={{ color: 'rgb(245, 158, 11)', fontWeight: 600 }}>Liabilities</span>
            {' + '}
            <span style={{ color: scenario.equityColor, fontWeight: 600 }}>Equity</span>
            {' → '}
            <span style={{ fontWeight: 700 }}>
              ${scenario.assets}B = ${scenario.liabilities}B + ${scenario.equity >= 0 ? '' : '('}$
              {scenario.equity}B{scenario.equity < 0 && ')'}
            </span>
          </span>
        </div>
      </div>

      {/* Status Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            padding: '16px',
            backgroundColor: `${scenario.equityColor}15`,
            borderRadius: '12px',
            textAlign: 'center',
            border: `2px solid ${scenario.equityColor}40`,
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Equity Ratio
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: scenario.equityColor }}>
            {scenario.equity >= 0 ? equityPercentage : 'N/A'}%
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>equity/assets</div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor:
              scenario.lossAmount > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Loss Absorbed
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: scenario.lossAmount > 0 ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)',
            }}
          >
            ${scenario.lossAmount}B
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>by equity</div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: `${scenario.statusColor}15`,
            borderRadius: '12px',
            textAlign: 'center',
            border: `2px solid ${scenario.statusColor}40`,
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Bank Status
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: scenario.statusColor,
              textTransform: 'uppercase',
            }}
          >
            {scenario.status}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
            {scenario.status === 'healthy' && 'well-capitalized'}
            {scenario.status === 'stressed' && 'needs attention'}
            {scenario.status === 'critical' && 'undercapitalized'}
            {scenario.status === 'insolvent' && 'liabilities > assets'}
          </div>
        </div>
      </div>

      {/* Scenario Description */}
      <motion.div
        key={scenario.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          padding: '16px 20px',
          backgroundColor: `${scenario.statusColor}10`,
          borderRadius: '12px',
          border: `1px solid ${scenario.statusColor}30`,
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: scenario.statusColor,
            marginBottom: '6px',
          }}
        >
          {scenario.name}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          {scenario.description}
          {scenario.status === 'insolvent' && (
            <span
              style={{
                display: 'block',
                marginTop: '8px',
                color: 'rgb(239, 68, 68)',
                fontWeight: 500,
              }}
            >
              Warning: Creditors and depositors are now at risk. Regulatory intervention likely.
            </span>
          )}
        </div>
      </motion.div>

      {/* Liquidation Waterfall Toggle */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={() => setShowWaterfall(!showWaterfall)}
          style={{
            width: '100%',
            padding: '16px 20px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Liquidation Waterfall: Who Gets Paid First?
          </span>
          <motion.span
            animate={{ rotate: showWaterfall ? 180 : 0 }}
            style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
          >
            ▼
          </motion.span>
        </button>

        <AnimatePresence>
          {showWaterfall && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 20px 20px 20px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {[
                    {
                      step: 1,
                      name: 'Sell Assets',
                      desc: 'Convert loans, securities to cash',
                      color: 'rgb(59, 130, 246)',
                    },
                    {
                      step: 2,
                      name: 'Pay Secured Creditors',
                      desc: 'Creditors with collateral get paid first',
                      color: 'rgb(99, 102, 241)',
                    },
                    {
                      step: 3,
                      name: 'Pay Depositors',
                      desc: 'FDIC insurance covers up to $250K',
                      color: 'rgb(245, 158, 11)',
                    },
                    {
                      step: 4,
                      name: 'Pay Unsecured Creditors',
                      desc: 'Bondholders and other lenders',
                      color: 'rgb(234, 88, 12)',
                    },
                    {
                      step: 5,
                      name: 'Residual to Shareholders',
                      desc: 'Equity holders get what remains (often $0)',
                      color: 'rgb(16, 185, 129)',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        backgroundColor: 'var(--color-surface-2)',
                        borderRadius: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: 'white',
                          flexShrink: 0,
                        }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          {item.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6',
                  }}
                >
                  <strong style={{ color: 'rgb(16, 185, 129)' }}>Key Insight:</strong> Shareholders
                  have a <em>residual claim</em> — they only get paid after all other obligations.
                  This is why equity is called the &quot;first-loss piece&quot; and why regulators
                  require banks to maintain capital buffers.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Key Concepts */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          <strong style={{ color: 'rgb(99, 102, 241)' }}>Why Capital Requirements Matter:</strong>{' '}
          Regulators require banks to maintain minimum equity ratios (typically 8-10%) to ensure
          they can absorb losses without becoming insolvent. This protects depositors and prevents
          systemic crises. When equity falls below thresholds, regulators can force the bank to
          raise capital, restrict dividends, or even take control.
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
        Click scenarios to see how losses affect bank capital structure
      </p>
    </div>
  );
}
