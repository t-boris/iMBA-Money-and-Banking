'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

type TabId = 'supply-shocks' | 'jobless-recoveries';

const tabs: { id: TabId; label: string }[] = [
  { id: 'supply-shocks', label: 'Supply Shocks & Stagflation' },
  { id: 'jobless-recoveries', label: 'Jobless Recoveries & Risk-Taking' },
];

const spring = { type: 'spring' as const, stiffness: 250, damping: 28 };

const timelineEvents = [
  {
    year: '1973',
    title: 'Arab Oil Embargo',
    description: 'Oil price quadruples from $3 to $12 per barrel',
    color: 'rgb(239, 68, 68)',
  },
  {
    year: '1979',
    title: 'Iranian Revolution',
    description: 'Oil doubles from $14 to $35 per barrel',
    color: 'rgb(245, 158, 11)',
  },
  {
    year: '1980-81',
    title: 'Volcker Tightening',
    description: 'Fed raises rates to 19%+ to crush inflation',
    color: 'rgb(99, 102, 241)',
  },
  {
    year: '1982',
    title: 'Inflation Breaks',
    description: 'Recession peaks at 10.8% unemployment',
    color: 'rgb(59, 130, 246)',
  },
];

const stagflationGrid: {
  label: string;
  inflation: string;
  unemployment: string;
  color: string;
  bgColor: string;
  highlight: boolean;
}[] = [
  {
    label: 'Normal',
    inflation: 'Low',
    unemployment: 'Low',
    color: 'rgb(16, 185, 129)',
    bgColor: 'color-mix(in srgb, rgb(16, 185, 129) 10%, transparent)',
    highlight: false,
  },
  {
    label: 'Overheating',
    inflation: 'High',
    unemployment: 'Low',
    color: 'rgb(245, 158, 11)',
    bgColor: 'color-mix(in srgb, rgb(245, 158, 11) 10%, transparent)',
    highlight: false,
  },
  {
    label: 'Recession',
    inflation: 'Low',
    unemployment: 'High',
    color: 'rgb(59, 130, 246)',
    bgColor: 'color-mix(in srgb, rgb(59, 130, 246) 10%, transparent)',
    highlight: false,
  },
  {
    label: 'Stagflation',
    inflation: 'High',
    unemployment: 'High',
    color: 'rgb(239, 68, 68)',
    bgColor: 'color-mix(in srgb, rgb(239, 68, 68) 12%, transparent)',
    highlight: true,
  },
];

const recoveryData = [
  {
    recession: '1990-91',
    gdpQuarters: 3,
    jobsMonths: 23,
    gdpLabel: '3 quarters',
    jobsLabel: '23 months',
  },
  {
    recession: '2001',
    gdpQuarters: 1,
    jobsMonths: 39,
    gdpLabel: '1 quarter',
    jobsLabel: '39 months',
  },
  {
    recession: '2008-09',
    gdpQuarters: 4,
    jobsMonths: 76,
    gdpLabel: '4 quarters',
    jobsLabel: '76 months',
  },
];

const riskChainSteps = [
  'Low rates for extended period',
  'Investors reach for yield',
  'Excessive leverage',
  'Asset bubbles',
  'Financial instability',
];

export default function PolicyLimitsDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('supply-shocks');

  return (
    <div className={cn('w-full max-w-4xl mx-auto')}>
      {/* Header */}
      <div
        style={{
          padding: '18px',
          borderRadius: '14px',
          border: '1px solid var(--color-surface-2)',
          background:
            'linear-gradient(140deg, color-mix(in srgb, var(--color-primary) 10%, transparent), var(--color-surface-1))',
          marginBottom: '20px',
        }}
      >
        <h3
          style={{
            fontSize: '19px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          Where Monetary Policy Breaks Down
        </h3>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
            marginTop: '6px',
            lineHeight: '1.6',
          }}
        >
          Exploring the structural limits of central bank power: supply shocks,
          stagflation, jobless recoveries, and the risk-taking channel.
        </p>
      </div>

      {/* Tab selector */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              borderRadius: '999px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              border:
                activeTab === tab.id
                  ? '1px solid color-mix(in srgb, var(--color-primary) 60%, transparent)'
                  : '1px solid var(--color-surface-2)',
              color:
                activeTab === tab.id
                  ? 'var(--color-primary)'
                  : 'var(--color-text-secondary)',
              background:
                activeTab === tab.id
                  ? 'color-mix(in srgb, var(--color-primary) 14%, transparent)'
                  : 'var(--color-surface-1)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'supply-shocks' && (
          <motion.div
            key="supply-shocks"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={spring}
          >
            {/* Oil Price Timeline */}
            <div
              style={{
                borderRadius: '12px',
                border: '1px solid var(--color-surface-2)',
                backgroundColor: 'var(--color-surface-1)',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '4px',
                }}
              >
                Oil Price Shocks Timeline
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '20px',
                }}
              >
                Key events that created the stagflation nightmare of the 1970s
                and early 1980s
              </div>

              {/* Timeline horizontal line */}
              <div style={{ position: 'relative', padding: '0 12px' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '28px',
                    left: '12px',
                    right: '12px',
                    height: '3px',
                    backgroundColor: 'var(--color-surface-2)',
                    borderRadius: '2px',
                  }}
                />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px',
                    position: 'relative',
                  }}
                >
                  {timelineEvents.map((event, index) => (
                    <motion.div
                      key={event.year}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, ...spring }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      {/* Year marker */}
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: event.color,
                          marginBottom: '8px',
                        }}
                      >
                        {event.year}
                      </div>

                      {/* Dot on timeline */}
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: event.color,
                          border: '3px solid var(--color-surface-1)',
                          boxShadow: `0 0 0 2px ${event.color}`,
                          marginBottom: '12px',
                          flexShrink: 0,
                        }}
                      />

                      {/* Event card */}
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: `1px solid color-mix(in srgb, ${event.color} 30%, transparent)`,
                          backgroundColor: `color-mix(in srgb, ${event.color} 6%, var(--color-surface-0))`,
                          width: '100%',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: event.color,
                            marginBottom: '4px',
                          }}
                        >
                          {event.title}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.5',
                          }}
                        >
                          {event.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stagflation 2x2 Grid */}
            <div
              style={{
                borderRadius: '12px',
                border: '1px solid var(--color-surface-2)',
                backgroundColor: 'var(--color-surface-1)',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '4px',
                }}
              >
                The Macroeconomic Quadrants
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '16px',
                }}
              >
                Stagflation is the quadrant where standard monetary tools fail
              </div>

              {/* Axis labels */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr 1fr',
                  gridTemplateRows: 'auto auto auto',
                  gap: '0px',
                }}
              >
                {/* Top-left corner: empty */}
                <div />
                {/* Column headers */}
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    padding: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Low Unemployment
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    padding: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  High Unemployment
                </div>

                {/* Row 1: Low inflation */}
                <div
                  style={{
                    writingMode: 'vertical-lr',
                    transform: 'rotate(180deg)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: '8px',
                  }}
                >
                  Low Inflation
                </div>
                {/* Normal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05, ...spring }}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: `1px solid color-mix(in srgb, ${stagflationGrid[0].color} 30%, transparent)`,
                    backgroundColor: stagflationGrid[0].bgColor,
                    margin: '4px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: stagflationGrid[0].color,
                      marginBottom: '6px',
                    }}
                  >
                    {stagflationGrid[0].label}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    Inflation: {stagflationGrid[0].inflation}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    Unemployment: {stagflationGrid[0].unemployment}
                  </div>
                </motion.div>
                {/* Recession */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, ...spring }}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: `1px solid color-mix(in srgb, ${stagflationGrid[2].color} 30%, transparent)`,
                    backgroundColor: stagflationGrid[2].bgColor,
                    margin: '4px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: stagflationGrid[2].color,
                      marginBottom: '6px',
                    }}
                  >
                    {stagflationGrid[2].label}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    Inflation: {stagflationGrid[2].inflation}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    Unemployment: {stagflationGrid[2].unemployment}
                  </div>
                </motion.div>

                {/* Row 2: High inflation */}
                <div
                  style={{
                    writingMode: 'vertical-lr',
                    transform: 'rotate(180deg)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: '8px',
                  }}
                >
                  High Inflation
                </div>
                {/* Overheating */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, ...spring }}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: `1px solid color-mix(in srgb, ${stagflationGrid[1].color} 30%, transparent)`,
                    backgroundColor: stagflationGrid[1].bgColor,
                    margin: '4px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: stagflationGrid[1].color,
                      marginBottom: '6px',
                    }}
                  >
                    {stagflationGrid[1].label}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    Inflation: {stagflationGrid[1].inflation}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    Unemployment: {stagflationGrid[1].unemployment}
                  </div>
                </motion.div>
                {/* Stagflation - highlighted */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, ...spring }}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: `2px solid color-mix(in srgb, ${stagflationGrid[3].color} 60%, transparent)`,
                    backgroundColor: stagflationGrid[3].bgColor,
                    margin: '4px',
                    textAlign: 'center',
                    boxShadow: `0 0 16px color-mix(in srgb, ${stagflationGrid[3].color} 15%, transparent)`,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'white',
                      backgroundColor: stagflationGrid[3].color,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Policy Nightmare
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: stagflationGrid[3].color,
                      marginBottom: '6px',
                    }}
                  >
                    {stagflationGrid[3].label}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    Inflation: {stagflationGrid[3].inflation}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    Unemployment: {stagflationGrid[3].unemployment}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Key Insight */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, ...spring }}
              style={{
                padding: '14px 18px',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '12px',
                borderLeft: '4px solid rgb(239, 68, 68)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.65',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                Supply shocks create a no-win situation: raising rates fights
                inflation but worsens unemployment. Lowering rates fights
                unemployment but fuels inflation.
              </p>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'jobless-recoveries' && (
          <motion.div
            key="jobless-recoveries"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={spring}
          >
            {/* Recovery Comparison */}
            <div
              style={{
                borderRadius: '12px',
                border: '1px solid var(--color-surface-2)',
                backgroundColor: 'var(--color-surface-1)',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '4px',
                }}
              >
                Recovery Comparison: GDP vs. Jobs
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '18px',
                }}
              >
                Each recession shows a widening gap between economic output
                recovery and employment recovery
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {recoveryData.map((recovery, index) => {
                  const maxMonths = 76;
                  const gdpMonths = recovery.gdpQuarters * 3;
                  const gdpPct = (gdpMonths / maxMonths) * 100;
                  const jobsPct = (recovery.jobsMonths / maxMonths) * 100;

                  return (
                    <motion.div
                      key={recovery.recession}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, ...spring }}
                      style={{
                        padding: '16px',
                        borderRadius: '10px',
                        border: '1px solid var(--color-surface-2)',
                        backgroundColor: 'var(--color-surface-0)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          marginBottom: '12px',
                        }}
                      >
                        {recovery.recession} Recession
                      </div>

                      {/* GDP Recovery Bar */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            color: 'var(--color-text-muted)',
                            width: '90px',
                            flexShrink: 0,
                          }}
                        >
                          GDP Recovery
                        </span>
                        <div
                          style={{
                            flex: 1,
                            height: '24px',
                            borderRadius: '6px',
                            backgroundColor: 'var(--color-surface-2)',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${gdpPct}%` }}
                            transition={{
                              delay: index * 0.08 + 0.15,
                              duration: 0.6,
                              ease: 'easeOut',
                            }}
                            style={{
                              height: '100%',
                              background:
                                'linear-gradient(90deg, rgb(16, 185, 129), color-mix(in srgb, rgb(16, 185, 129) 65%, white))',
                              borderRadius: '6px',
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: 'rgb(16, 185, 129)',
                            width: '80px',
                            flexShrink: 0,
                            textAlign: 'right',
                          }}
                        >
                          {recovery.gdpLabel}
                        </span>
                      </div>

                      {/* Jobs Recovery Bar */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            color: 'var(--color-text-muted)',
                            width: '90px',
                            flexShrink: 0,
                          }}
                        >
                          Jobs Recovery
                        </span>
                        <div
                          style={{
                            flex: 1,
                            height: '24px',
                            borderRadius: '6px',
                            backgroundColor: 'var(--color-surface-2)',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${jobsPct}%` }}
                            transition={{
                              delay: index * 0.08 + 0.25,
                              duration: 0.6,
                              ease: 'easeOut',
                            }}
                            style={{
                              height: '100%',
                              background:
                                'linear-gradient(90deg, rgb(239, 68, 68), color-mix(in srgb, rgb(239, 68, 68) 65%, white))',
                              borderRadius: '6px',
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: 'rgb(239, 68, 68)',
                            width: '80px',
                            flexShrink: 0,
                            textAlign: 'right',
                          }}
                        >
                          {recovery.jobsLabel}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Risk-Taking Dynamics */}
            <div
              style={{
                borderRadius: '12px',
                border: '1px solid var(--color-surface-2)',
                backgroundColor: 'var(--color-surface-1)',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '4px',
                }}
              >
                The Risk-Taking Channel
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '18px',
                }}
              >
                How accommodative policy plants the seeds of the next crisis
              </div>

              {/* Chain of cards with arrows */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                {riskChainSteps.map((step, index) => {
                  const stepColors = [
                    'rgb(16, 185, 129)',
                    'rgb(59, 130, 246)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)',
                    'rgb(139, 0, 0)',
                  ];
                  const color = stepColors[index];

                  return (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, ...spring }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <div
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
                          backgroundColor: `color-mix(in srgb, ${color} 8%, var(--color-surface-0))`,
                          textAlign: 'center',
                          minWidth: '110px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color,
                            lineHeight: '1.4',
                          }}
                        >
                          {step}
                        </div>
                      </div>
                      {index < riskChainSteps.length - 1 && (
                        <div
                          style={{
                            fontSize: '16px',
                            color: 'var(--color-text-muted)',
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          &rarr;
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Example case */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ...spring }}
                style={{
                  marginTop: '16px',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border:
                    '1px solid color-mix(in srgb, rgb(245, 158, 11) 25%, transparent)',
                  backgroundColor:
                    'color-mix(in srgb, rgb(245, 158, 11) 6%, var(--color-surface-0))',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'rgb(245, 158, 11)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '6px',
                  }}
                >
                  Historical Example: 2001-2006
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-surface-1)',
                      border: '1px solid var(--color-surface-2)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                        marginBottom: '4px',
                      }}
                    >
                      Fed Funds Rate
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'rgb(16, 185, 129)',
                      }}
                    >
                      1.00%
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Held low for extended period
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-surface-1)',
                      border: '1px solid var(--color-surface-2)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                        marginBottom: '4px',
                      }}
                    >
                      HELOC Growth
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'rgb(245, 158, 11)',
                      }}
                    >
                      Exploded
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Home equity borrowing surged
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-surface-1)',
                      border: '1px solid var(--color-surface-2)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                        marginBottom: '4px',
                      }}
                    >
                      Housing Prices
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'rgb(239, 68, 68)',
                      }}
                    >
                      +80%
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Nationwide bubble formed
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Key Insight */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...spring }}
              style={{
                padding: '14px 18px',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '12px',
                borderLeft: '4px solid rgb(245, 158, 11)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.65',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                Low rates helped GDP recover but left workers behind and planted
                seeds of the next crisis.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
