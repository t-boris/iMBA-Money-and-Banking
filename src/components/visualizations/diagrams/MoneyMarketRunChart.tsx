'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface MoneyMarketRunChartProps {
  className?: string;
}

// Approximate data points for MMF assets (in trillions)
const chartData = [
  { month: 'Jan 08', value: 3.4 },
  { month: 'Mar 08', value: 3.45 },
  { month: 'Jun 08', value: 3.5 },
  { month: 'Aug 08', value: 3.55 },
  { month: 'Sep 08', value: 3.4 },
  { month: 'Sep 15', value: 2.95 },
  { month: 'Sep 19', value: 2.5 },
  { month: 'Oct 08', value: 2.7 },
  { month: 'Dec 08', value: 3.0 },
  { month: 'Mar 09', value: 3.3 },
  { month: 'Jun 09', value: 3.6 },
];

interface CrisisStep {
  id: number;
  title: string;
  description: string;
  detail: string;
  color: string;
}

const crisisSteps: CrisisStep[] = [
  {
    id: 1,
    title: 'Some funds held Lehman debt',
    description: 'Money market funds held Lehman Brothers commercial paper as "safe" short-term assets.',
    detail:
      'Reserve Primary Fund held $785 million in Lehman debt — 1.2% of its total assets. Seemed tiny, but enough to break the $1 NAV.',
    color: '59, 130, 246',
  },
  {
    id: 2,
    title: 'Lehman collapses (Sep 15, 2008)',
    description: 'Lehman Brothers files for bankruptcy. Its debt becomes worthless overnight.',
    detail:
      'The largest bankruptcy in US history. All Lehman commercial paper instantly valued at near zero.',
    color: '245, 158, 11',
  },
  {
    id: 3,
    title: 'Reserve Primary Fund "breaks the buck"',
    description: 'NAV drops to $0.97 — below the sacred $1 per share. Investors panic.',
    detail:
      'Only the second time in history a money market fund broke below $1. This shattered the illusion that MMF shares were as safe as bank deposits.',
    color: '249, 115, 22',
  },
  {
    id: 4,
    title: 'Mass withdrawals across industry',
    description: 'Investors rush to withdraw from ALL money market funds — not just those with Lehman exposure.',
    detail:
      '$300+ billion withdrawn in one week. Redemptions hit funds with zero Lehman exposure. Classic contagion: rational individual behavior, devastating collective outcome.',
    color: '239, 68, 68',
  },
  {
    id: 5,
    title: 'Forced asset sales at discount',
    description: 'Funds sell commercial paper at fire-sale prices to meet redemptions.',
    detail:
      'Fire sales depressed prices for ALL short-term debt, creating a credit freeze. Companies could not roll over commercial paper, threatening payroll and operations.',
    color: '220, 38, 38',
  },
  {
    id: 6,
    title: 'Government intervention (Sep 19)',
    description: 'Treasury guarantees all MMF deposits. Fed creates lending facilities.',
    detail:
      'Treasury announced temporary guarantee program for MMF shareholders. Fed created AMLF and CPFF to buy distressed assets. Moral hazard in action: too important to fail.',
    color: '16, 185, 129',
  },
  {
    id: 7,
    title: 'Losses = 0 for investors',
    description: 'With government backstop, no investor lost money. Except at Reserve Primary Fund ($0.99).',
    detail:
      'Taxpayers bore the risk. The guarantee stopped the run, but reinforced the expectation that government will always bail out shadow banking.',
    color: '16, 185, 129',
  },
];

interface Reform {
  name: string;
  description: string;
  mechanism: string;
  workedLabel: string;
  workedDetail: string;
}

const reforms: Reform[] = [
  {
    name: 'Floating NAV',
    description: 'Share value can fluctuate instead of fixed $1',
    mechanism: 'Reduces the deposit illusion — investors see it is NOT a bank account',
    workedLabel: 'Partially effective',
    workedDetail:
      'Only applied to institutional prime funds. Retail and government funds kept $1 NAV. Did not prevent the 2020 run.',
  },
  {
    name: 'Liquidity Fees',
    description: 'Fees charged on withdrawals during stress periods',
    mechanism: 'Penalty for running — makes withdrawal costly during a crisis',
    workedLabel: 'Backfired',
    workedDetail:
      'In 2020, the THREAT of fees caused investors to run earlier to avoid being charged. The tool designed to stop runs accelerated them.',
  },
  {
    name: 'Redemption Gates',
    description: 'Temporary freeze on withdrawals for up to 10 days',
    mechanism: 'Physically stops the run — nobody can withdraw',
    workedLabel: 'Backfired',
    workedDetail:
      'Investors ran BEFORE gates could be imposed to avoid being locked out. The possibility of gates created a "first-mover advantage" — get out now or be trapped.',
  },
];

export function MoneyMarketRunChart({ className }: MoneyMarketRunChartProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [animatedSteps, setAnimatedSteps] = useState(0);
  const [showReformDetail, setShowReformDetail] = useState<number | null>(null);
  const [chartAnimated, setChartAnimated] = useState(false);

  // Animate chart on mount
  useEffect(() => {
    const timer = setTimeout(() => setChartAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-animate steps on first load
  const animateNextStep = useCallback(() => {
    setAnimatedSteps((prev) => {
      if (prev < crisisSteps.length) {
        return prev + 1;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (animatedSteps < crisisSteps.length) {
      const timer = setTimeout(animateNextStep, 400);
      return () => clearTimeout(timer);
    }
  }, [animatedSteps, animateNextStep]);

  // SVG chart dimensions
  const chartWidth = 560;
  const chartHeight = 200;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  // Scale values
  const minVal = 2.2;
  const maxVal = 3.8;

  const getX = (index: number) =>
    paddingLeft + (index / (chartData.length - 1)) * plotWidth;
  const getY = (value: number) =>
    paddingTop + plotHeight - ((value - minVal) / (maxVal - minVal)) * plotHeight;

  // Build path
  const linePath = chartData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`)
    .join(' ');

  // Build area path
  const areaPath = `${linePath} L ${getX(chartData.length - 1)} ${getY(minVal)} L ${getX(0)} ${getY(minVal)} Z`;

  // Color interpolation for the line based on value
  const getColor = (value: number) => {
    const ratio = (value - minVal) / (maxVal - minVal);
    if (ratio > 0.7) return 'rgb(59, 130, 246)';
    if (ratio > 0.4) return 'rgb(245, 158, 11)';
    return 'rgb(239, 68, 68)';
  };

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
          Money Market Fund Crisis
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          How a $785 million loss triggered a $300 billion run
        </p>
      </div>

      {/* Section 1: The Run Chart */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          The Run: MMF Assets (2008)
        </h4>

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        >
          <defs>
            <linearGradient id="mmf-area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0.05)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[2.5, 3.0, 3.5].map((val) => (
            <g key={val}>
              <line
                x1={paddingLeft}
                y1={getY(val)}
                x2={chartWidth - paddingRight}
                y2={getY(val)}
                stroke="var(--color-surface-2)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text
                x={paddingLeft - 5}
                y={getY(val) + 4}
                textAnchor="end"
                fill="var(--color-text-muted)"
                fontSize="10"
              >
                ${val}T
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {[0, 3, 6, 8, 10].map((idx) => (
            <text
              key={idx}
              x={getX(idx)}
              y={chartHeight - 5}
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="9"
            >
              {chartData[idx].month}
            </text>
          ))}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#mmf-area-gradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: chartAnimated ? 0.6 : 0 }}
            transition={{ duration: 1 }}
          />

          {/* Line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: chartAnimated ? 1 : 0 }}
            transition={{ duration: 2 }}
          />

          {/* Data points */}
          {chartData.map((d, i) => (
            <motion.circle
              key={i}
              cx={getX(i)}
              cy={getY(d.value)}
              r="3"
              fill={getColor(d.value)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: chartAnimated ? 1 : 0,
                scale: chartAnimated ? 1 : 0,
              }}
              transition={{ delay: (i / chartData.length) * 2, duration: 0.3 }}
            />
          ))}

          {/* Lehman collapse marker */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: chartAnimated ? 1 : 0 }}
            transition={{ delay: 1.5 }}
          >
            <line
              x1={getX(4)}
              y1={paddingTop}
              x2={getX(4)}
              y2={getY(minVal)}
              stroke="rgb(239, 68, 68)"
              strokeWidth="1"
              strokeDasharray="4,3"
            />
            <text
              x={getX(4)}
              y={paddingTop - 5}
              textAnchor="middle"
              fill="rgb(239, 68, 68)"
              fontSize="9"
              fontWeight="600"
            >
              Lehman Collapse
            </text>
          </motion.g>

          {/* Government guarantee marker */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: chartAnimated ? 1 : 0 }}
            transition={{ delay: 1.8 }}
          >
            <line
              x1={getX(6)}
              y1={paddingTop + 10}
              x2={getX(6)}
              y2={getY(minVal)}
              stroke="rgb(16, 185, 129)"
              strokeWidth="1"
              strokeDasharray="4,3"
            />
            <text
              x={getX(6)}
              y={paddingTop + 5}
              textAnchor="middle"
              fill="rgb(16, 185, 129)"
              fontSize="9"
              fontWeight="600"
            >
              Gov Guarantee
            </text>
          </motion.g>

          {/* Drop annotation */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: chartAnimated ? 1 : 0 }}
            transition={{ delay: 2 }}
          >
            <text
              x={(getX(4) + getX(6)) / 2}
              y={getY(3.0)}
              textAnchor="middle"
              fill="rgb(239, 68, 68)"
              fontSize="11"
              fontWeight="700"
            >
              -30%
            </text>
            <text
              x={(getX(4) + getX(6)) / 2}
              y={getY(3.0) + 14}
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="8"
            >
              ~$300B withdrawn
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Section 2: What Happened */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          What Happened: Step by Step
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {crisisSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: idx < animatedSteps ? 1 : 0,
                x: idx < animatedSteps ? 0 : -20,
              }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setActiveStep(activeStep === idx ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor:
                    activeStep === idx
                      ? `rgba(${step.color}, 0.1)`
                      : 'var(--color-surface-2)',
                  borderRadius: '10px',
                  border:
                    activeStep === idx
                      ? `2px solid rgba(${step.color}, 0.4)`
                      : '2px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: `rgba(${step.color}, 0.15)`,
                      color: `rgb(${step.color})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {step.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: '2px',
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {activeStep === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          marginTop: '10px',
                          marginLeft: '40px',
                          padding: '10px',
                          backgroundColor: `rgba(${step.color}, 0.05)`,
                          borderRadius: '8px',
                          borderLeft: `3px solid rgba(${step.color}, 0.4)`,
                        }}
                      >
                        <p
                          style={{
                            fontSize: '12px',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.6',
                            margin: 0,
                            fontStyle: 'italic',
                          }}
                        >
                          {step.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 3: Post-Crisis Reforms */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Post-Crisis Reforms (2014)
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reforms.map((reform, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '12px',
                border:
                  showReformDetail === idx
                    ? '2px solid rgba(168, 85, 247, 0.4)'
                    : '2px solid var(--color-surface-2)',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() =>
                  setShowReformDetail(showReformDetail === idx ? null : idx)
                }
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor:
                    showReformDetail === idx
                      ? 'rgba(168, 85, 247, 0.05)'
                      : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: '4px',
                      }}
                    >
                      {reform.name}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '6px',
                      }}
                    >
                      {reform.description}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Mechanism: {reform.mechanism}
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: showReformDetail === idx ? 90 : 0 }}
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-muted)',
                      marginLeft: '12px',
                      flexShrink: 0,
                    }}
                  >
                    &#x25B6;
                  </motion.span>
                </div>
              </button>

              <AnimatePresence>
                {showReformDetail === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 16px 16px' }}>
                      <div
                        style={{
                          padding: '12px',
                          backgroundColor:
                            reform.workedLabel === 'Backfired'
                              ? 'rgba(239, 68, 68, 0.08)'
                              : 'rgba(245, 158, 11, 0.08)',
                          borderRadius: '8px',
                          border: `1px solid ${
                            reform.workedLabel === 'Backfired'
                              ? 'rgba(239, 68, 68, 0.2)'
                              : 'rgba(245, 158, 11, 0.2)'
                          }`,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '3px 8px',
                              borderRadius: '6px',
                              backgroundColor:
                                reform.workedLabel === 'Backfired'
                                  ? 'rgba(239, 68, 68, 0.15)'
                                  : 'rgba(245, 158, 11, 0.15)',
                              color:
                                reform.workedLabel === 'Backfired'
                                  ? 'rgb(239, 68, 68)'
                                  : 'rgb(245, 158, 11)',
                            }}
                          >
                            {reform.workedLabel}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: '12px',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.6',
                            margin: 0,
                          }}
                        >
                          {reform.workedDetail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: 2020 COVID */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'rgb(239, 68, 68)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>2020 COVID: Rules Failed Again</span>
        </h4>

        {/* Timeline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            marginBottom: '16px',
            padding: '0 10px',
          }}
        >
          {[
            { label: 'Mar 2020', event: 'COVID panic', color: '245, 158, 11' },
            { label: 'Mar 2020', event: 'Another run', color: '239, 68, 68' },
            { label: 'Mar 2020', event: 'Another Fed bailout', color: '16, 185, 129' },
          ].map((item, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: `rgb(${item.color})`,
                  margin: '0 auto 8px',
                }}
              />
              {idx < 2 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '5px',
                    left: '50%',
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--color-surface-2)',
                  }}
                />
              )}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: `rgb(${item.color})`,
                  marginBottom: '2px',
                }}
              >
                {item.event}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Key Insight Card */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            borderRadius: '12px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'rgb(239, 68, 68)',
              marginBottom: '10px',
            }}
          >
            The Preemptive Run Paradox
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div
              style={{
                padding: '10px',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                borderRadius: '8px',
                borderLeft: '3px solid rgba(239, 68, 68, 0.4)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                Gates and fees make investors run <strong>EARLIER</strong> to avoid being
                locked out or charged.
              </p>
            </div>
            <div
              style={{
                padding: '10px',
                backgroundColor: 'rgba(245, 158, 11, 0.05)',
                borderRadius: '8px',
                borderLeft: '3px solid rgba(245, 158, 11, 0.4)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                Investor logic: &ldquo;Withdraw now or be trapped tomorrow&rdquo;
              </p>
            </div>
            <div
              style={{
                padding: '12px',
                backgroundColor: 'rgba(168, 85, 247, 0.08)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgb(168, 85, 247)',
                }}
              >
                Tools designed to stop runs actually accelerated them
              </span>
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
        Click on each step or reform card to see detailed analysis
      </p>
    </div>
  );
}
