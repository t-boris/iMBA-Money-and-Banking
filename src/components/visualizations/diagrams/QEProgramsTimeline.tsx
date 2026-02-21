'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { AnimatedValue } from '@/components/visualizations/AnimatedValue';

interface QEProgramsTimelineProps { className?: string }

interface QEProgram {
  id: string; name: string; period: string; purchases: string;
  totalSize: string; details: string[]; special?: string;
  color: string; balanceSheetEnd: string;
}

interface YieldImpact { label: string; before: number; after: number; color: string }

const qePrograms: QEProgram[] = [
  {
    id: 'qe1',
    name: 'QE1',
    period: 'Nov 2008 - Mar 2010',
    purchases: '$1.25T MBS + $175B GSE debt + $300B Treasuries',
    totalSize: '~$1.75T',
    details: [
      'Purchased over 20% of the outstanding MBS market value',
      'First-ever large-scale asset purchases by the Fed',
      'Aimed to stabilize collapsing mortgage markets',
      'Largest single QE program relative to market size',
    ],
    color: 'rgb(59, 130, 246)',
    balanceSheetEnd: '~$2.1T',
  },
  {
    id: 'qe2',
    name: 'QE2',
    period: 'Nov 2010 - Jun 2011',
    purchases: '~$600B additional Treasuries',
    totalSize: '~$600B',
    details: [
      'Focused exclusively on longer-term Treasury securities',
      'Aimed to lower long-term interest rates further',
      'Responded to slow economic recovery and low inflation',
    ],
    color: 'rgb(16, 185, 129)',
    balanceSheetEnd: '~$2.9T',
  },
  {
    id: 'twist',
    name: 'Operation Twist',
    period: 'Sep 2011 - Dec 2012',
    purchases: 'Sell short-term, buy long-term Treasuries',
    totalSize: '~$667B swapped',
    details: [
      'Sold short-term securities and bought long-term ones',
      'Flattened the yield curve without expanding the balance sheet',
      'Named after a similar 1961 Kennedy-era program',
    ],
    special: 'No net balance sheet expansion -- pure maturity swap',
    color: 'rgb(245, 158, 11)',
    balanceSheetEnd: '~$2.9T (unchanged)',
  },
  {
    id: 'qe3',
    name: 'QE3',
    period: 'Sep 2012 - Oct 2014',
    purchases: '$85B/month open-ended, then tapered',
    totalSize: '~$1.6T total',
    details: [
      'Started at $40B MBS + $45B Treasuries per month',
      'First open-ended QE program (no fixed end date)',
      'Tapering began Dec 2013, reducing purchases by $10B/month',
      'Ended Oct 2014 after 25 months of purchases',
    ],
    color: 'rgb(139, 92, 246)',
    balanceSheetEnd: '~$4.5T',
  },
  {
    id: 'covid',
    name: 'COVID-19 QE',
    period: 'Mar 2020+',
    purchases: '"Amounts needed to support smooth market functioning"',
    totalSize: '~$4.6T added',
    details: [
      'Open-ended purchases with no predetermined limit',
      'Included Treasuries and agency MBS',
      'Balance sheet grew from ~$4.2T to ~$8.9T at peak',
      'Tapering began Nov 2021, ended Mar 2022',
      'Quantitative tightening (balance sheet runoff) began Jun 2022',
    ],
    color: 'rgb(239, 68, 68)',
    balanceSheetEnd: '~$8.9T (peak)',
  },
];

const yieldImpactsByProgram: Record<string, YieldImpact[]> = {
  qe1: [
    { label: '2-year Treasury', before: 1.6, after: 1.0, color: 'rgb(59, 130, 246)' },
    { label: 'BAA Corporate', before: 9.5, after: 8.0, color: 'rgb(245, 158, 11)' },
    { label: '30-yr Fixed Mortgage', before: 6.5, after: 4.85, color: 'rgb(16, 185, 129)' },
  ],
  qe2: [
    { label: '10-year Treasury', before: 2.6, after: 3.0, color: 'rgb(59, 130, 246)' },
    { label: '30-yr Fixed Mortgage', before: 4.4, after: 4.5, color: 'rgb(16, 185, 129)' },
    { label: 'BAA Corporate', before: 6.0, after: 5.7, color: 'rgb(245, 158, 11)' },
  ],
  twist: [
    { label: '10-year Treasury', before: 2.0, after: 1.6, color: 'rgb(59, 130, 246)' },
    { label: '30-yr Fixed Mortgage', before: 4.1, after: 3.4, color: 'rgb(16, 185, 129)' },
    { label: '2-year Treasury', before: 0.2, after: 0.25, color: 'rgb(245, 158, 11)' },
  ],
  qe3: [
    { label: '10-year Treasury', before: 1.7, after: 2.3, color: 'rgb(59, 130, 246)' },
    { label: '30-yr Fixed Mortgage', before: 3.5, after: 4.0, color: 'rgb(16, 185, 129)' },
    { label: 'BAA Corporate', before: 4.8, after: 4.5, color: 'rgb(245, 158, 11)' },
  ],
  covid: [
    { label: '10-year Treasury', before: 1.9, after: 0.6, color: 'rgb(59, 130, 246)' },
    { label: '30-yr Fixed Mortgage', before: 3.7, after: 2.7, color: 'rgb(16, 185, 129)' },
    { label: 'BAA Corporate', before: 5.4, after: 3.5, color: 'rgb(245, 158, 11)' },
  ],
};

const balanceSheetData = [
  { label: 'Pre-2008', value: 0.8 }, { label: 'Post-QE1', value: 2.1 },
  { label: 'Post-QE2', value: 2.9 }, { label: 'Post-QE3', value: 4.5 },
  { label: 'COVID Peak', value: 8.9 },
];

const mechanismSteps = ['Fed buys long-term bonds', 'Bond demand rises', 'Bond prices rise', 'Yields fall', 'Borrowing costs fall'];

export default function QEProgramsTimeline({ className }: QEProgramsTimelineProps) {
  const [expandedProgram, setExpandedProgram] = useState<string | null>('qe1');
  const [selectedYieldProgram, setSelectedYieldProgram] = useState<string>('qe1');

  const yieldImpacts = yieldImpactsByProgram[selectedYieldProgram];
  const maxYield = 10;
  const toggleProgram = (id: string) => setExpandedProgram(expandedProgram === id ? null : id);

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      {/* Header */}
      <div
        className={cn(
          'bg-glass-light backdrop-blur-md border border-glass-border shadow-glass rounded-2xl p-6',
          'mb-6'
        )}
      >
        <h3
          style={{
            fontSize: '19px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '6px',
          }}
        >
          Quantitative Easing Programs Timeline
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          Explore the Fed&apos;s unconventional monetary policy: large-scale asset purchases designed
          to lower long-term interest rates when the federal funds rate hit the zero lower bound.
        </p>
      </div>

      {/* Section A: QE Programs Timeline */}
      <div
        className={cn(
          'bg-glass-light backdrop-blur-md border border-glass-border shadow-glass rounded-2xl p-6',
          'mb-6'
        )}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          QE Programs
        </h4>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '28px' }}>
          {/* Vertical timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '11px',
              top: '12px',
              bottom: '12px',
              width: '2px',
              background:
                'linear-gradient(to bottom, rgb(59, 130, 246), rgb(16, 185, 129), rgb(245, 158, 11), rgb(139, 92, 246), rgb(239, 68, 68))',
              borderRadius: '1px',
            }}
          />

          {qePrograms.map((program, index) => {
            const isExpanded = expandedProgram === program.id;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                style={{ position: 'relative', marginBottom: '12px' }}
              >
                {/* Timeline dot */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '-22px',
                    top: '14px',
                    width: isExpanded ? '14px' : '10px',
                    height: isExpanded ? '14px' : '10px',
                    borderRadius: '50%',
                    backgroundColor: program.color,
                    border: '2px solid var(--color-surface-1)',
                    zIndex: 1,
                  }}
                  animate={{
                    scale: isExpanded ? [1, 1.2, 1] : 1,
                    width: isExpanded ? '14px' : '10px',
                    height: isExpanded ? '14px' : '10px',
                  }}
                  transition={{
                    scale: { duration: 1.5, repeat: isExpanded ? Infinity : 0, ease: 'easeInOut' },
                  }}
                />

                {/* Program card */}
                <motion.button
                  onClick={() => toggleProgram(program.id)}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: isExpanded
                      ? `2px solid color-mix(in srgb, ${program.color} 50%, transparent)`
                      : '1px solid var(--color-surface-2)',
                    backgroundColor: isExpanded
                      ? `color-mix(in srgb, ${program.color} 8%, var(--color-surface-1))`
                      : 'var(--color-surface-1)',
                    transition: 'border-color 0.2s, background-color 0.2s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: program.color,
                        }}
                      >
                        {program.name}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          color: 'var(--color-text-muted)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {program.period}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'monospace',
                      }}
                    >
                      {program.totalSize}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '4px',
                    }}
                  >
                    {program.purchases}
                  </p>

                  {program.special && (
                    <div
                      style={{
                        marginTop: '6px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        backgroundColor: `color-mix(in srgb, ${program.color} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${program.color} 25%, transparent)`,
                        fontSize: '11px',
                        fontWeight: 600,
                        color: program.color,
                        display: 'inline-block',
                      }}
                    >
                      {program.special}
                    </div>
                  )}
                </motion.button>

                {/* Expanded details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '12px 16px',
                          marginTop: '4px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--color-surface-1)',
                          border: '1px solid var(--color-surface-2)',
                        }}
                      >
                        <ul
                          style={{
                            margin: 0,
                            padding: '0 0 0 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                          }}
                        >
                          {program.details.map((detail) => (
                            <li
                              key={detail}
                              style={{
                                fontSize: '13px',
                                color: 'var(--color-text-secondary)',
                                lineHeight: '1.5',
                              }}
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                        <div
                          style={{
                            marginTop: '8px',
                            fontSize: '12px',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          Balance sheet after program:{' '}
                          <span style={{ fontWeight: 600, color: program.color }}>
                            {program.balanceSheetEnd}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section B: Yield Impact */}
      <div
        className={cn(
          'bg-glass-light backdrop-blur-md border border-glass-border shadow-glass rounded-2xl p-6',
          'mb-6'
        )}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Yield Impact Evidence
        </h4>

        {/* Program selector tabs */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}
        >
          {qePrograms.map((program) => (
            <button
              key={program.id}
              onClick={() => setSelectedYieldProgram(program.id)}
              style={{
                borderRadius: '999px',
                padding: '6px 12px',
                border:
                  selectedYieldProgram === program.id
                    ? `1px solid color-mix(in srgb, ${program.color} 60%, transparent)`
                    : '1px solid var(--color-surface-2)',
                color:
                  selectedYieldProgram === program.id
                    ? program.color
                    : 'var(--color-text-secondary)',
                background:
                  selectedYieldProgram === program.id
                    ? `color-mix(in srgb, ${program.color} 14%, transparent)`
                    : 'var(--color-surface-1)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {program.name}
            </button>
          ))}
        </div>

        {/* Yield bars */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYieldProgram}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {yieldImpacts.map((impact) => {
              const beforePct = (impact.before / maxYield) * 100;
              const afterPct = (impact.after / maxYield) * 100;
              const decreased = impact.after < impact.before;

              return (
                <div key={impact.label}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '6px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {impact.label}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        color: decreased ? 'rgb(16, 185, 129)' : 'rgb(245, 158, 11)',
                        fontWeight: 600,
                      }}
                    >
                      <AnimatedValue
                        value={impact.before}
                        suffix="%"
                        decimals={2}
                        size="sm"
                        className="text-text-muted"
                      />
                      {' -> '}
                      <AnimatedValue
                        value={impact.after}
                        suffix="%"
                        decimals={2}
                        size="sm"
                        className={decreased ? 'text-emerald-500' : 'text-amber-500'}
                      />
                    </span>
                  </div>

                  {/* Before bar */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '52px 1fr',
                      gap: '6px',
                      alignItems: 'center',
                      marginBottom: '3px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                        textAlign: 'right',
                      }}
                    >
                      Before
                    </span>
                    <div
                      style={{
                        height: '14px',
                        borderRadius: '7px',
                        backgroundColor: 'var(--color-surface-2)',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${beforePct}%` }}
                        transition={{ duration: 0.6, type: 'spring', stiffness: 80, damping: 18 }}
                        style={{
                          height: '100%',
                          backgroundColor: `color-mix(in srgb, ${impact.color} 50%, transparent)`,
                          borderRadius: '7px',
                        }}
                      />
                    </div>
                  </div>

                  {/* After bar */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '52px 1fr',
                      gap: '6px',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                        textAlign: 'right',
                      }}
                    >
                      After
                    </span>
                    <div
                      style={{
                        height: '14px',
                        borderRadius: '7px',
                        backgroundColor: 'var(--color-surface-2)',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${afterPct}%` }}
                        transition={{
                          duration: 0.6,
                          delay: 0.15,
                          type: 'spring',
                          stiffness: 80,
                          damping: 18,
                        }}
                        style={{
                          height: '100%',
                          backgroundColor: impact.color,
                          borderRadius: '7px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Section C: Mechanism */}
      <div
        className={cn(
          'bg-glass-light backdrop-blur-md border border-glass-border shadow-glass rounded-2xl p-6',
          'mb-6'
        )}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Transmission Mechanism
        </h4>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {mechanismSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-surface-1)',
                  border: '1px solid var(--color-surface-2)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {step}
              </div>
              {index < mechanismSteps.length - 1 && (
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-text-muted)',
                    fontWeight: 700,
                  }}
                >
                  {' -> '}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Balance Sheet Growth Bar */}
      <div
        className={cn(
          'bg-glass-light backdrop-blur-md border border-glass-border shadow-glass rounded-2xl p-6',
          'mb-6'
        )}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Balance Sheet Growth
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {balanceSheetData.map((point, index) => {
            const pct = (point.value / 9) * 100;
            const colors = [
              'rgb(156, 163, 175)',
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(139, 92, 246)',
              'rgb(239, 68, 68)',
            ];
            return (
              <div
                key={point.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '90px 1fr 60px',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {point.label}
                </span>
                <div
                  style={{
                    height: '22px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--color-surface-2)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 80,
                      damping: 18,
                    }}
                    style={{
                      height: '100%',
                      backgroundColor: colors[index],
                      borderRadius: '6px',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: colors[index],
                    fontFamily: 'monospace',
                  }}
                >
                  ${point.value}T
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          padding: '14px 18px',
          borderRadius: '12px',
          backgroundColor: 'color-mix(in srgb, var(--color-primary) 6%, var(--color-surface-1))',
          border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          lineHeight: '1.6',
          textAlign: 'center',
        }}
      >
        <strong style={{ color: 'var(--color-text-primary)' }}>Key insight:</strong> The Fed&apos;s
        balance sheet grew from ~$800B pre-2008 to ~$4.5T by 2014, then to ~$8.9T during COVID-19
        -- an 11x expansion in just over a decade, fundamentally transforming how monetary policy
        operates.
      </motion.div>
    </div>
  );
}

export { QEProgramsTimeline };
