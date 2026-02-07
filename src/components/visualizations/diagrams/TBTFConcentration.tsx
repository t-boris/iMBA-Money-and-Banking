'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface TBTFConcentrationProps {
  className?: string;
}

type MegabankView = 'efficiency' | 'subsidy';

interface GSIBBucket {
  bucket: number;
  surcharge: string;
  banks: string[];
  color: string;
  colorRgb: string;
}

const gsibBuckets: GSIBBucket[] = [
  {
    bucket: 5,
    surcharge: '+4.5%',
    banks: ['(Reserved - empty)'],
    color: 'rose',
    colorRgb: '239, 68, 68',
  },
  {
    bucket: 4,
    surcharge: '+3.5%',
    banks: ['(Reserved - empty)'],
    color: 'rose',
    colorRgb: '239, 68, 68',
  },
  {
    bucket: 3,
    surcharge: '+2.5%',
    banks: ['JPMorgan Chase'],
    color: 'amber',
    colorRgb: '245, 158, 11',
  },
  {
    bucket: 2,
    surcharge: '+2.0%',
    banks: ['Citigroup', 'Bank of America', 'Goldman Sachs'],
    color: 'amber',
    colorRgb: '245, 158, 11',
  },
  {
    bucket: 1,
    surcharge: '+1.5%',
    banks: ['Wells Fargo', 'Morgan Stanley', 'BNY Mellon', 'State Street'],
    color: 'primary',
    colorRgb: '99, 102, 241',
  },
];

const assessmentFactors = [
  { icon: '\u2B24', label: 'Size', description: 'Total exposures' },
  { icon: '\uD83D\uDD17', label: 'Interconnectedness', description: 'Inter-financial assets & liabilities' },
  { icon: '\uD83E\uDDE9', label: 'Complexity', description: 'Derivatives, trading, Level 3 assets' },
  { icon: '\uD83C\uDF0D', label: 'Global Activity', description: 'Cross-jurisdictional claims' },
  { icon: '\u2194\uFE0F', label: 'Substitutability', description: 'Payments, custody, underwriting' },
];

const concentrationSegments = [
  {
    label: 'Top ~10 Megabanks',
    share: 50,
    banks: 'JPMorgan, BofA, Citi, Wells Fargo, Goldman Sachs, Morgan Stanley...',
    colorRgb: '99, 102, 241',
  },
  {
    label: 'Mid-size Banks',
    share: 35,
    banks: 'PNC, Truist, US Bank, Capital One, TD Bank...',
    colorRgb: '245, 158, 11',
  },
  {
    label: 'Small/Community Banks',
    share: 15,
    banks: 'Thousands of local and community banks',
    colorRgb: '16, 185, 129',
  },
];

export function TBTFConcentration({ className }: TBTFConcentrationProps) {
  const [megabankView, setMegabankView] = useState<MegabankView>('efficiency');
  const [expandedBucket, setExpandedBucket] = useState<number | null>(null);

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
          Too Big to Fail &amp; G-SIB Framework
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Bank concentration, systemic risk, and the regulatory response
        </p>
      </div>

      {/* Section 1 - Bank Concentration */}
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          U.S. Banking System Asset Concentration
        </div>

        {/* Horizontal Stacked Bar */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              height: '48px',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            {concentrationSegments.map((seg, i) => (
              <motion.div
                key={seg.label}
                initial={{ width: 0 }}
                animate={{ width: `${seg.share}%` }}
                transition={{ type: 'spring', stiffness: 80, damping: 20, delay: i * 0.2 }}
                style={{
                  backgroundColor: `rgb(${seg.colorRgb})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  opacity: 0.85,
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {seg.share}%
                </span>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {concentrationSegments.map((seg) => (
              <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    backgroundColor: `rgb(${seg.colorRgb})`,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {seg.label}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-muted)',
                      marginLeft: '8px',
                    }}
                  >
                    {seg.banks}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: `rgb(${seg.colorRgb})`,
                  }}
                >
                  {seg.share}%
                </span>
              </div>
            ))}
          </div>

          {/* Key insight */}
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            <strong style={{ color: 'var(--color-text-primary)' }}>Key Insight:</strong> A handful
            of megabanks hold roughly half of all U.S. banking assets. Their failure could bring
            down the entire financial system.
          </div>
        </div>
      </div>

      {/* Section 2 - Why Megabanks Exist */}
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Why Do Megabanks Exist?
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => setMegabankView('efficiency')}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: megabankView === 'efficiency'
                ? '2px solid rgb(16, 185, 129)'
                : '2px solid transparent',
              backgroundColor: megabankView === 'efficiency'
                ? 'rgba(16, 185, 129, 0.15)'
                : 'var(--color-surface-1)',
              color: megabankView === 'efficiency'
                ? 'rgb(16, 185, 129)'
                : 'var(--color-text-secondary)',
              fontWeight: megabankView === 'efficiency' ? 600 : 400,
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Efficiency View
          </button>
          <button
            onClick={() => setMegabankView('subsidy')}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: megabankView === 'subsidy'
                ? '2px solid rgb(239, 68, 68)'
                : '2px solid transparent',
              backgroundColor: megabankView === 'subsidy'
                ? 'rgba(239, 68, 68, 0.15)'
                : 'var(--color-surface-1)',
              color: megabankView === 'subsidy'
                ? 'rgb(239, 68, 68)'
                : 'var(--color-text-secondary)',
              fontWeight: megabankView === 'subsidy' ? 600 : 400,
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Subsidy View
          </button>
        </div>

        <AnimatePresence mode="wait">
          {megabankView === 'efficiency' ? (
            <motion.div
              key="efficiency"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '16px',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'rgb(16, 185, 129)',
                  marginBottom: '12px',
                }}
              >
                Economies of Scale &amp; Scope
              </div>

              {/* Cost Curve Visualization */}
              <div style={{ marginBottom: '16px' }}>
                <svg
                  viewBox="0 0 400 160"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                >
                  {/* Axes */}
                  <line
                    x1="50" y1="130" x2="370" y2="130"
                    stroke="var(--color-text-muted)" strokeWidth="1"
                  />
                  <line
                    x1="50" y1="20" x2="50" y2="130"
                    stroke="var(--color-text-muted)" strokeWidth="1"
                  />
                  <text x="210" y="155" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
                    Bank Size
                  </text>
                  <text
                    x="16" y="75" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11"
                    transform="rotate(-90, 16, 75)"
                  >
                    Avg Cost
                  </text>

                  {/* Declining cost curve */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                    d="M 70 40 Q 150 50 200 80 Q 280 105 360 110"
                    fill="none"
                    stroke="rgb(16, 185, 129)"
                    strokeWidth="3"
                  />

                  {/* Labels */}
                  <text x="90" y="35" fill="rgb(16, 185, 129)" fontSize="10" fontWeight="600">
                    High cost
                  </text>
                  <text x="310" y="105" fill="rgb(16, 185, 129)" fontSize="10" fontWeight="600">
                    Low cost
                  </text>

                  {/* Size labels */}
                  <text x="80" y="145" fill="var(--color-text-muted)" fontSize="10">Small</text>
                  <text x="340" y="145" fill="var(--color-text-muted)" fontSize="10">Large</text>
                </svg>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}
              >
                {[
                  { title: 'Shared IT Infrastructure', desc: 'One platform serves millions of customers' },
                  { title: 'Global Service Network', desc: 'Serve multinational clients worldwide' },
                  { title: 'Risk Diversification', desc: 'Spread risk across geographies and sectors' },
                  { title: 'Cross-Selling', desc: 'Deposits, loans, investment, insurance in one place' },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'rgba(16, 185, 129, 0.08)',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'rgb(16, 185, 129)',
                        marginBottom: '2px',
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="subsidy"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '16px',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'rgb(239, 68, 68)',
                  marginBottom: '12px',
                }}
              >
                The TBTF Subsidy Chain
              </div>

              {/* Subsidy Chain */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                {[
                  { text: 'Grow large enough to become TBTF', colorRgb: '239, 68, 68' },
                  { text: 'Markets expect government bailout', colorRgb: '245, 158, 11' },
                  { text: 'Implicit guarantee lowers perceived risk', colorRgb: '245, 158, 11' },
                  { text: 'Lower funding costs (cheaper debt)', colorRgb: '16, 185, 129' },
                  { text: 'Competitive advantage over small banks', colorRgb: '16, 185, 129' },
                  { text: 'Incentive to grow even larger', colorRgb: '239, 68, 68' },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div
                      style={{
                        padding: '10px 20px',
                        backgroundColor: `rgba(${step.colorRgb}, 0.12)`,
                        borderRadius: '8px',
                        border: `1px solid rgba(${step.colorRgb}, 0.25)`,
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        textAlign: 'center',
                      }}
                    >
                      {step.text}
                    </div>
                    {i < 5 && (
                      <div
                        style={{
                          textAlign: 'center',
                          color: 'var(--color-text-muted)',
                          fontSize: '16px',
                          lineHeight: '1',
                        }}
                      >
                        &#8595;
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                }}
              >
                <strong style={{ color: 'rgb(239, 68, 68)' }}>Moral Hazard:</strong> The expectation
                of a bailout encourages excessive risk-taking. Banks privatize gains but socialize
                losses — taxpayers bear the downside.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 3 - G-SIB Bucket System */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          G-SIB Capital Surcharge Buckets
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          {/* Bucket Ladder */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '20px',
            }}
          >
            {gsibBuckets.map((bucket, i) => {
              const isExpanded = expandedBucket === bucket.bucket;
              const isEmpty = bucket.banks[0].startsWith('(');
              const widthPct = 50 + bucket.bucket * 10;

              return (
                <motion.div
                  key={bucket.bucket}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setExpandedBucket(isExpanded ? null : bucket.bucket)}
                  style={{
                    width: `${widthPct}%`,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    cursor: isEmpty ? 'default' : 'pointer',
                  }}
                >
                  <div
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      backgroundColor: isEmpty
                        ? 'var(--color-surface-2)'
                        : `rgba(${bucket.colorRgb}, ${isExpanded ? 0.2 : 0.12})`,
                      border: isExpanded
                        ? `2px solid rgb(${bucket.colorRgb})`
                        : '2px solid transparent',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      opacity: isEmpty ? 0.5 : 1,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: isEmpty ? 'var(--color-text-muted)' : `rgb(${bucket.colorRgb})`,
                          minWidth: '60px',
                        }}
                      >
                        Bucket {bucket.bucket}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: isEmpty ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {isEmpty ? 'Reserved' : bucket.banks.join(', ')}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: isEmpty ? 'var(--color-text-muted)' : `rgb(${bucket.colorRgb})`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {bucket.surcharge}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && !isEmpty && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          style={{
                            marginTop: '4px',
                            padding: '10px 16px',
                            backgroundColor: `rgba(${bucket.colorRgb}, 0.06)`,
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.6',
                          }}
                        >
                          These banks must hold an additional{' '}
                          <strong style={{ color: `rgb(${bucket.colorRgb})` }}>
                            {bucket.surcharge}
                          </strong>{' '}
                          capital surcharge on top of Basel III minimums, based on their systemic
                          importance score.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Five Assessment Factors */}
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '10px',
            }}
          >
            Five Assessment Factors
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '6px',
              marginBottom: '16px',
            }}
          >
            {assessmentFactors.map((factor) => (
              <div
                key={factor.label}
                style={{
                  padding: '10px 8px',
                  backgroundColor: 'rgba(99, 102, 241, 0.08)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{factor.icon}</div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'rgb(99, 102, 241)',
                    marginBottom: '2px',
                  }}
                >
                  {factor.label}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                  {factor.description}
                </div>
              </div>
            ))}
          </div>

          {/* Policy Logic */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              textAlign: 'center',
            }}
          >
            Higher systemic footprint &#8594; Higher capital buffer &#8594; Lower failure probability
          </div>
        </div>
      </div>

      {/* Systemic Risk Formula */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '12px',
          }}
        >
          Systemic Risk Formulas
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '14px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                marginBottom: '6px',
              }}
            >
              Spillover Size
            </div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'rgb(239, 68, 68)',
              }}
            >
              Spillover &#8733; Bank Size &#215; Interconnectedness
            </div>
          </div>
          <div
            style={{
              padding: '14px',
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                marginBottom: '6px',
              }}
            >
              Required Capital
            </div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'rgb(99, 102, 241)',
              }}
            >
              Required = Base + Systemic Surcharge
            </div>
          </div>
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
        Toggle between efficiency and subsidy views; click G-SIB buckets for details
      </p>
    </div>
  );
}
