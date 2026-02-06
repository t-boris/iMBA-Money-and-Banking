'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ExternalityDiagramProps {
  className?: string;
}

interface SpilloverStep {
  id: number;
  label: string;
  detail: string;
  icon: string;
}

const spilloverSteps: SpilloverStep[] = [
  {
    id: 1,
    label: 'Bank Fails',
    detail:
      'A bank becomes insolvent when losses exceed its equity capital. This can happen from credit losses, liquidity crises, or market shocks.',
    icon: '\u{1F3E6}',
  },
  {
    id: 2,
    label: 'Lost Credit Access',
    detail:
      'Businesses and consumers lose their credit lines. Small businesses that depend on relationship lending are hit hardest.',
    icon: '\u{1F6AB}',
  },
  {
    id: 3,
    label: 'Lost Savings',
    detail:
      'Uninsured depositors lose money above the $250,000 FDIC limit. This includes businesses, municipalities, and large savers.',
    icon: '\u{1F4B8}',
  },
  {
    id: 4,
    label: 'Taxpayer Cost',
    detail:
      'Government safety net (FDIC fund, Fed lending) ultimately costs taxpayers. TARP in 2008 initially committed $700 billion.',
    icon: '\u{1F4B0}',
  },
  {
    id: 5,
    label: 'Contagion Spreads',
    detail:
      'Other banks face runs as depositors panic. Interbank lending freezes. The entire financial system can seize up.',
    icon: '\u{26A0}\u{FE0F}',
  },
];

type PrudentialView = 'micro' | 'macro';

export function ExternalityDiagram({ className }: ExternalityDiagramProps) {
  const [activePanel, setActivePanel] = useState<'cost' | 'spillover' | 'prudential'>('cost');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [prudentialView, setPrudentialView] = useState<PrudentialView>('micro');

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
          Why Regulate Banks? The Externality Argument
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Bank failures impose costs on society far beyond the bank itself
        </p>
      </div>

      {/* Panel Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {[
          { id: 'cost' as const, label: 'Private vs Social Cost' },
          { id: 'spillover' as const, label: 'Failure Spillovers' },
          { id: 'prudential' as const, label: 'Micro vs Macro' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor:
                activePanel === tab.id
                  ? 'rgba(99, 102, 241, 0.15)'
                  : 'var(--color-surface-1)',
              color:
                activePanel === tab.id
                  ? 'rgb(99, 102, 241)'
                  : 'var(--color-text-secondary)',
              fontWeight: activePanel === tab.id ? 600 : 400,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <AnimatePresence mode="wait">
        {activePanel === 'cost' && (
          <motion.div
            key="cost"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CostComparisonPanel />
          </motion.div>
        )}
        {activePanel === 'spillover' && (
          <motion.div
            key="spillover"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <SpilloverChainPanel
              expandedStep={expandedStep}
              onToggleStep={(id) =>
                setExpandedStep(expandedStep === id ? null : id)
              }
            />
          </motion.div>
        )}
        {activePanel === 'prudential' && (
          <motion.div
            key="prudential"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <PrudentialPanel
              view={prudentialView}
              onToggle={setPrudentialView}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Switch between panels to explore the economic rationale for bank
        regulation
      </p>
    </div>
  );
}

/* ─── Panel 1: Private vs Social Cost ─── */

function CostComparisonPanel() {
  const privateCost = 40;
  const socialCost = 100;
  const gap = socialCost - privateCost;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '16px',
        padding: '24px',
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
        The Cost Gap: Why Markets Fail
      </h4>

      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginBottom: '24px',
          height: '220px',
        }}
      >
        {/* Private Cost Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
          }}
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(privateCost / socialCost) * 180}px` }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
            style={{
              width: '100px',
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <span
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: '18px',
              }}
            >
              {privateCost}%
            </span>
          </motion.div>
          <div
            style={{
              marginTop: '12px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(59, 130, 246)',
              }}
            >
              Private Cost
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                maxWidth: '120px',
              }}
            >
              What the bank bears
            </div>
          </div>
        </div>

        {/* Gap Arrow */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '12px',
              border: '2px dashed rgba(239, 68, 68, 0.4)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'rgb(239, 68, 68)',
              }}
            >
              {gap}%
            </div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'rgb(239, 68, 68)',
              }}
            >
              Negative
            </div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'rgb(239, 68, 68)',
              }}
            >
              Externality
            </div>
          </motion.div>
        </div>

        {/* Social Cost Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
          }}
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(socialCost / socialCost) * 180}px` }}
            transition={{
              duration: 1.0,
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
            style={{
              width: '100px',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Private portion */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: `${(privateCost / socialCost) * 100}%`,
                backgroundColor: 'rgba(59, 130, 246, 0.4)',
              }}
            />
            {/* Spillover portion */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: `${(gap / socialCost) * 100}%`,
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
              }}
            />
            <span
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: '18px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {socialCost}%
            </span>
          </motion.div>
          <div
            style={{
              marginTop: '12px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(239, 68, 68)',
              }}
            >
              Social Cost
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                maxWidth: '120px',
              }}
            >
              What society bears
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          padding: '16px',
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.2)',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'rgb(245, 158, 11)',
            marginBottom: '8px',
          }}
        >
          Market Failure Logic
        </div>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            margin: 0,
            lineHeight: '1.6',
          }}
        >
          Banks only consider their <strong>private cost</strong> of risk-taking (losses to
          shareholders). But bank failures cause <strong>spillovers</strong>: lost
          credit, lost savings, taxpayer bailouts, and contagion. Since banks
          don&apos;t pay for these externalities, they take <strong>too much risk</strong>.
          Regulation corrects this market failure.
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Panel 2: Spillover Chain ─── */

interface SpilloverChainPanelProps {
  expandedStep: number | null;
  onToggleStep: (id: number) => void;
}

function SpilloverChainPanel({
  expandedStep,
  onToggleStep,
}: SpilloverChainPanelProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '16px',
        padding: '24px',
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
        Bank Failure: The Spillover Chain
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {spilloverSteps.map((step, index) => (
          <div key={step.id}>
            {/* Arrow connector */}
            {index > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.15 }}
                style={{
                  textAlign: 'center',
                  color: 'var(--color-text-muted)',
                  fontSize: '20px',
                  marginBottom: '8px',
                }}
              >
                &#8595;
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
                damping: 20,
              }}
              onClick={() => onToggleStep(step.id)}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border:
                  expandedStep === step.id
                    ? '2px solid rgba(239, 68, 68, 0.4)'
                    : '2px solid transparent',
                backgroundColor:
                  expandedStep === step.id
                    ? 'rgba(239, 68, 68, 0.08)'
                    : 'var(--color-surface-2)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: `rgba(239, 68, 68, ${0.1 + index * 0.15})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <span
                      style={{
                        color: 'rgb(239, 68, 68)',
                        marginRight: '8px',
                      }}
                    >
                      {step.id}.
                    </span>
                    {step.label}
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-muted)',
                      transform:
                        expandedStep === step.id
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    &#9660;
                  </span>
                </div>
              </div>
            </motion.button>

            {/* Expanded Detail */}
            <AnimatePresence>
              {expandedStep === step.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    style={{
                      padding: '16px 20px',
                      marginTop: '4px',
                      backgroundColor: 'rgba(239, 68, 68, 0.05)',
                      borderRadius: '10px',
                      marginLeft: '56px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        margin: 0,
                        lineHeight: '1.6',
                      }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Panel 3: Micro vs Macro Prudential ─── */

interface PrudentialPanelProps {
  view: PrudentialView;
  onToggle: (view: PrudentialView) => void;
}

// Bank positions for the network
const bankPositions = [
  { x: 300, y: 60, size: 'small' as const },
  { x: 480, y: 100, size: 'small' as const },
  { x: 540, y: 240, size: 'medium' as const },
  { x: 460, y: 370, size: 'small' as const },
  { x: 300, y: 400, size: 'large' as const },
  { x: 140, y: 370, size: 'small' as const },
  { x: 60, y: 240, size: 'medium' as const },
  { x: 120, y: 100, size: 'small' as const },
];

const bankSizes = {
  small: { r: 20, label: '$5B' },
  medium: { r: 28, label: '$50B' },
  large: { r: 38, label: '$500B' },
};

// Connections between banks (indices)
const connections = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
  [0, 4],
  [2, 6],
  [1, 5],
  [3, 7],
];

function PrudentialPanel({ view, onToggle }: PrudentialPanelProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '16px',
        padding: '24px',
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
        Two Approaches to Regulation
      </h4>

      {/* Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={() => onToggle('micro')}
          style={{
            padding: '10px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor:
              view === 'micro'
                ? 'rgba(59, 130, 246, 0.15)'
                : 'var(--color-surface-2)',
            color:
              view === 'micro'
                ? 'rgb(59, 130, 246)'
                : 'var(--color-text-secondary)',
            fontWeight: view === 'micro' ? 600 : 400,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Microprudential
        </button>
        <button
          onClick={() => onToggle('macro')}
          style={{
            padding: '10px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor:
              view === 'macro'
                ? 'rgba(139, 92, 246, 0.15)'
                : 'var(--color-surface-2)',
            color:
              view === 'macro'
                ? 'rgb(139, 92, 246)'
                : 'var(--color-text-secondary)',
            fontWeight: view === 'macro' ? 600 : 400,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Macroprudential
        </button>
      </div>

      {/* SVG Network */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <svg viewBox="0 0 600 460" style={{ width: '100%', maxWidth: '500px', height: 'auto' }}>
          {/* Connection Lines */}
          {connections.map(([a, b], i) => (
            <motion.line
              key={`conn-${i}`}
              x1={bankPositions[a].x}
              y1={bankPositions[a].y}
              x2={bankPositions[b].x}
              y2={bankPositions[b].y}
              stroke={
                view === 'macro'
                  ? 'rgba(139, 92, 246, 0.3)'
                  : 'var(--color-surface-2)'
              }
              strokeWidth={view === 'macro' ? 2 : 1}
              strokeDasharray={view === 'micro' ? '4,4' : '0'}
              initial={{ opacity: 0 }}
              animate={{
                opacity: view === 'macro' ? 0.8 : 0.3,
                strokeWidth: view === 'macro' ? 2 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
          ))}

          {/* Bank Nodes */}
          {bankPositions.map((bank, i) => {
            const sizeData = bankSizes[bank.size];
            const isBig = bank.size === 'large' || bank.size === 'medium';
            const nodeColor =
              view === 'micro'
                ? 'rgb(59, 130, 246)'
                : isBig
                  ? 'rgb(139, 92, 246)'
                  : 'rgba(139, 92, 246, 0.5)';
            const nodeR =
              view === 'macro' && isBig ? sizeData.r + 4 : sizeData.r;

            return (
              <g key={`bank-${i}`}>
                {/* Protective shield for micro / Surcharge ring for macro */}
                {view === 'micro' && (
                  <motion.circle
                    cx={bank.x}
                    cy={bank.y}
                    r={sizeData.r + 8}
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="4,3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  />
                )}
                {view === 'macro' && isBig && (
                  <motion.circle
                    cx={bank.x}
                    cy={bank.y}
                    r={nodeR + 10}
                    fill="none"
                    stroke="rgba(239, 68, 68, 0.5)"
                    strokeWidth="3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                )}

                {/* Bank circle */}
                <motion.circle
                  cx={bank.x}
                  cy={bank.y}
                  r={nodeR}
                  fill={nodeColor}
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: i * 0.05,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                />

                {/* Size label */}
                <text
                  x={bank.x}
                  y={bank.y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize={bank.size === 'large' ? '11' : '9'}
                  fontWeight="600"
                >
                  {sizeData.label}
                </text>
              </g>
            );
          })}

          {/* Macro surcharge label for big banks */}
          {view === 'macro' && (
            <>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                x={bankPositions[4].x}
                y={bankPositions[4].y + bankSizes.large.r + 28}
                textAnchor="middle"
                fill="rgb(239, 68, 68)"
                fontSize="11"
                fontWeight="600"
              >
                G-SIB Surcharge
              </motion.text>
            </>
          )}
        </svg>
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            padding: '16px',
            borderRadius: '12px',
            backgroundColor:
              view === 'micro'
                ? 'rgba(59, 130, 246, 0.08)'
                : 'rgba(139, 92, 246, 0.08)',
            border: `1px solid ${
              view === 'micro'
                ? 'rgba(59, 130, 246, 0.2)'
                : 'rgba(139, 92, 246, 0.2)'
            }`,
          }}
        >
          {view === 'micro' ? (
            <>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgb(59, 130, 246)',
                  marginBottom: '8px',
                }}
              >
                Microprudential Regulation
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: '1.6',
                }}
              >
                Focus on <strong>individual bank safety</strong>. Each bank gets
                the same protective regulations: capital requirements, activity
                restrictions, and risk limits. The dashed circles represent
                individual regulatory shields. Goal: prevent any single bank
                from failing.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginTop: '12px',
                }}
              >
                {['Capital requirements', 'Activity restrictions', 'Risk limits', 'Examinations'].map(
                  (tool) => (
                    <div
                      key={tool}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: 'rgb(59, 130, 246)',
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {tool}
                    </div>
                  ),
                )}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgb(139, 92, 246)',
                  marginBottom: '8px',
                }}
              >
                Macroprudential Regulation
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: '1.6',
                }}
              >
                Focus on <strong>system-wide stability</strong>. Connections
                between banks create systemic risk. Bigger banks get
                <strong> stricter rules</strong> (red rings = G-SIB surcharges).
                The network lines show interbank exposures. Goal: prevent
                cascading failures across the system.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginTop: '12px',
                }}
              >
                {['G-SIB surcharges', 'Systemic oversight (FSOC)', 'Stress testing', 'Resolution planning'].map(
                  (tool) => (
                    <div
                      key={tool}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'rgba(139, 92, 246, 0.08)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: 'rgb(139, 92, 246)',
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {tool}
                    </div>
                  ),
                )}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
