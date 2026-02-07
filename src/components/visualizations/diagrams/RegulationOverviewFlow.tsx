'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface Pillar {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  items: string[];
}

const pillars: Pillar[] = [
  {
    id: 'rules',
    icon: '\u{1F4CB}',
    title: 'Rules',
    subtitle: 'Bank Regulation',
    color: 'rgb(99, 102, 241)', // indigo
    items: [
      'Entry & competition controls',
      'Activity & investment restrictions',
      'Funding requirements (capital, leverage)',
      'Disclosure requirements',
    ],
  },
  {
    id: 'safety-net',
    icon: '\u{1F6E1}\uFE0F',
    title: 'Safety Net',
    subtitle: 'Government Backstop',
    color: 'rgb(16, 185, 129)', // emerald
    items: [
      'FDIC Deposit Insurance (ex-ante)',
      'Fed Lender of Last Resort (ex-post)',
    ],
  },
  {
    id: 'oversight',
    icon: '\u{1F50D}',
    title: 'Oversight',
    subtitle: 'Bank Supervision',
    color: 'rgb(245, 158, 11)', // amber
    items: [
      'Examination (onsite + offsite)',
      'CAMELS rating system',
      'Enforcement actions',
      'Stress testing',
    ],
  },
];

interface Regulator {
  name: string;
  role: string;
  color: string;
}

const usRegulators: Regulator[] = [
  { name: 'FDIC', role: 'Deposit insurer & resolver', color: 'rgb(16, 185, 129)' },
  { name: 'Federal Reserve', role: 'Central bank & supervisor', color: 'rgb(99, 102, 241)' },
  { name: 'OCC', role: 'National bank regulator', color: 'rgb(245, 158, 11)' },
  { name: 'State Regulators', role: 'State-chartered banks', color: 'rgb(139, 92, 246)' },
];

const consequences = [
  'Lost credit access for businesses',
  'Lost savings for depositors',
  'Taxpayer-funded bailouts',
  'Contagion to other banks',
];

const tradeoffItems = [
  { label: 'Inefficiency', description: 'Lower profits from compliance costs' },
  { label: 'Unintended consequences', description: 'Rules can distort behavior' },
  { label: 'Moral hazard', description: 'Safety net encourages risk-taking' },
];

interface RegulationOverviewFlowProps {
  className?: string;
}

export function RegulationOverviewFlow({ className }: RegulationOverviewFlowProps) {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const [showConsequences, setShowConsequences] = useState(false);
  const [showRegulators, setShowRegulators] = useState(false);
  const [showTradeoffs, setShowTradeoffs] = useState(false);

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '900px', margin: '0 auto' }}>
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
          The Regulatory Framework
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Why banks are regulated and the three pillars of the regulatory system
        </p>
      </div>

      {/* Section 1: Why Regulate Banks? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        {/* Starting Point */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>{'\u{1F3E6}'}</div>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}>
              Banks create value: credit, payments, savings
            </span>
          </div>
        </div>

        {/* Arrow Down */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: '20px',
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
          }}
        >
          {'\u2193'}
        </motion.div>

        {/* Failure Warning */}
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(239, 68, 68)' }}>
              But failures create negative externalities
            </span>
          </div>
        </div>

        {/* Expandable Consequences */}
        <button
          onClick={() => setShowConsequences(!showConsequences)}
          style={{
            padding: '8px 16px',
            backgroundColor: showConsequences
              ? 'rgba(239, 68, 68, 0.1)'
              : 'var(--color-surface-2)',
            borderRadius: '8px',
            border: showConsequences
              ? '1px solid rgba(239, 68, 68, 0.3)'
              : '1px solid var(--color-surface-2)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            color: showConsequences ? 'rgb(239, 68, 68)' : 'var(--color-text-secondary)',
            transition: 'all 0.2s',
          }}
        >
          {showConsequences ? 'Hide' : 'Show'} Consequences
          <motion.span
            animate={{ rotate: showConsequences ? 180 : 0 }}
            style={{ display: 'inline-block', marginLeft: '8px' }}
          >
            {'\u25BC'}
          </motion.span>
        </button>

        <AnimatePresence>
          {showConsequences && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {consequences.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      borderRadius: '8px',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Arrow Down */}
      <div style={{ textAlign: 'center', margin: '4px 0', color: 'var(--color-text-muted)' }}>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '20px' }}
        >
          {'\u2193'}
        </motion.div>
        <span style={{ fontSize: '12px', fontWeight: 600 }}>Therefore, regulation is needed</span>
      </div>

      {/* Section 2: Three Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginTop: '12px',
          marginBottom: '16px',
        }}
      >
        {pillars.map((pillar, i) => {
          const isExpanded = expandedPillar === pillar.id;
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12 }}
              onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
              style={{
                padding: '16px',
                backgroundColor: isExpanded ? `${pillar.color}12` : 'var(--color-surface-1)',
                borderRadius: '12px',
                border: isExpanded
                  ? `2px solid ${pillar.color}`
                  : '1px solid var(--color-surface-2)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{pillar.icon}</div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: pillar.color,
                  marginBottom: '4px',
                }}
              >
                {pillar.title}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '12px',
                }}
              >
                {pillar.subtitle}
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        marginTop: '4px',
                      }}
                    >
                      {pillar.items.map((item, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.06 }}
                          style={{
                            padding: '6px 10px',
                            backgroundColor: `${pillar.color}10`,
                            borderRadius: '6px',
                            fontSize: '11px',
                            color: 'var(--color-text-secondary)',
                            textAlign: 'left',
                          }}
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isExpanded && (
                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Click to expand
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Section 3: US Regulatory Structure */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setShowRegulators(!showRegulators)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: showRegulators
              ? '2px solid rgb(139, 92, 246)'
              : '1px solid var(--color-surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>{'\u{1F3DB}\uFE0F'}</span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: showRegulators ? 'rgb(139, 92, 246)' : 'var(--color-text-primary)',
              }}
            >
              US Regulatory Structure
            </span>
          </div>
          <motion.span
            animate={{ rotate: showRegulators ? 180 : 0 }}
            style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
          >
            {'\u25BC'}
          </motion.span>
        </button>

        <AnimatePresence>
          {showRegulators && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: '12px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                }}
              >
                {usRegulators.map((reg, i) => (
                  <motion.div
                    key={reg.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      padding: '14px',
                      backgroundColor: 'var(--color-surface-1)',
                      borderRadius: '10px',
                      border: `1px solid ${reg.color}40`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: reg.color,
                        marginBottom: '4px',
                      }}
                    >
                      {reg.name}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.5',
                      }}
                    >
                      {reg.role}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  marginTop: '12px',
                  padding: '10px 16px',
                  backgroundColor: 'rgba(139, 92, 246, 0.08)',
                  borderRadius: '8px',
                  border: '1px dashed rgba(139, 92, 246, 0.3)',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '12px', color: 'rgb(139, 92, 246)', fontWeight: 500 }}>
                  Multiple regulators (unusual -- most countries have one)
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 4: Costs/Trade-offs */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setShowTradeoffs(!showTradeoffs)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: showTradeoffs
              ? '2px solid rgb(236, 72, 153)'
              : '1px solid var(--color-surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>{'\u2696\uFE0F'}</span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: showTradeoffs ? 'rgb(236, 72, 153)' : 'var(--color-text-primary)',
              }}
            >
              Regulation Is Not Free
            </span>
          </div>
          <motion.span
            animate={{ rotate: showTradeoffs ? 180 : 0 }}
            style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
          >
            {'\u25BC'}
          </motion.span>
        </button>

        <AnimatePresence>
          {showTradeoffs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {tradeoffItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'var(--color-surface-1)',
                      borderRadius: '10px',
                      border: '1px solid rgba(236, 72, 153, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'rgb(236, 72, 153)',
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          marginBottom: '2px',
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  style={{
                    marginTop: '4px',
                    padding: '10px 16px',
                    backgroundColor: 'rgba(236, 72, 153, 0.08)',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '12px', color: 'rgb(236, 72, 153)', fontWeight: 500 }}>
                    Good regulation = benefits exceed costs (cost-benefit analysis)
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Click on pillars and sections to explore the regulatory framework
      </p>
    </div>
  );
}
