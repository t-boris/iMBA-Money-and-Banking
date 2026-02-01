'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { AnimatedValue } from '../AnimatedValue';
import { cn } from '@/lib/utils';

interface BankConsolidationChartProps {
  className?: string;
}

interface DataPoint {
  year: number;
  banks: number;
  event?: string;
  eventType?: 'legislation' | 'crisis' | 'peak';
}

interface Driver {
  id: string;
  name: string;
  description: string;
  icon: string;
  period: [number, number];
  color: string;
}

const consolidationData: DataPoint[] = [
  { year: 1985, banks: 14400, event: 'Peak bank count', eventType: 'peak' },
  { year: 1990, banks: 12300 },
  { year: 1994, banks: 10500, event: 'Riegle-Neal Act', eventType: 'legislation' },
  { year: 1999, banks: 8600, event: 'Gramm-Leach-Bliley', eventType: 'legislation' },
  { year: 2005, banks: 7500 },
  { year: 2008, banks: 7000, event: 'Financial Crisis', eventType: 'crisis' },
  { year: 2015, banks: 5300 },
  { year: 2020, banks: 4400 },
];

const drivers: Driver[] = [
  {
    id: 'technology',
    name: 'Technology',
    description:
      'ATMs, online banking, and mobile apps eliminated the need for physical branches, allowing banks to serve more customers with fewer locations.',
    icon: '💻',
    period: [1985, 2020],
    color: 'rgb(99, 102, 241)',
  },
  {
    id: 'competition',
    name: 'Competition',
    description:
      'Money market funds and securitization challenged traditional banking, forcing consolidation to remain competitive.',
    icon: '⚔️',
    period: [1985, 2005],
    color: 'rgb(245, 158, 11)',
  },
  {
    id: 'deregulation',
    name: 'Deregulation',
    description:
      'Riegle-Neal (1994) enabled interstate banking; Gramm-Leach-Bliley (1999) allowed mergers across financial services.',
    icon: '📜',
    period: [1994, 2005],
    color: 'rgb(16, 185, 129)',
  },
  {
    id: 'scale',
    name: 'Economies of Scale',
    description:
      'Larger banks have lower costs per customer due to shared IT infrastructure, compliance systems, and brand recognition.',
    icon: '📈',
    period: [1990, 2020],
    color: 'rgb(139, 92, 246)',
  },
  {
    id: 'crisis',
    name: 'Financial Crisis',
    description:
      'The 2008 crisis led to failures and forced mergers. Weak banks were acquired by stronger ones, accelerating consolidation.',
    icon: '⚠️',
    period: [2008, 2015],
    color: 'rgb(239, 68, 68)',
  },
];

// SVG chart dimensions
const CHART_WIDTH = 700;
const CHART_HEIGHT = 300;
const PADDING = { top: 40, right: 30, bottom: 60, left: 70 };
const INNER_WIDTH = CHART_WIDTH - PADDING.left - PADDING.right;
const INNER_HEIGHT = CHART_HEIGHT - PADDING.top - PADDING.bottom;

// Data range
const MIN_YEAR = 1985;
const MAX_YEAR = 2020;
const MIN_BANKS = 0;
const MAX_BANKS = 16000;

export function BankConsolidationChart({ className }: BankConsolidationChartProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scale functions
  const xScale = (year: number) => {
    return ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * INNER_WIDTH;
  };

  const yScale = (banks: number) => {
    return INNER_HEIGHT - ((banks - MIN_BANKS) / (MAX_BANKS - MIN_BANKS)) * INNER_HEIGHT;
  };

  // Generate SVG path for the line
  const linePath = useMemo(() => {
    return consolidationData
      .map((d, i) => {
        const x = xScale(d.year);
        const y = yScale(d.banks);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, []);

  // Generate area path (for gradient fill under line)
  const areaPath = useMemo(() => {
    const line = consolidationData
      .map((d, i) => {
        const x = xScale(d.year);
        const y = yScale(d.banks);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    const lastX = xScale(consolidationData[consolidationData.length - 1].year);
    const firstX = xScale(consolidationData[0].year);

    return `${line} L ${lastX} ${INNER_HEIGHT} L ${firstX} ${INNER_HEIGHT} Z`;
  }, []);

  // Get selected data point
  const selectedData = selectedYear ? consolidationData.find((d) => d.year === selectedYear) : null;

  // Check if year is within driver period
  const isYearInDriverPeriod = (year: number, driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId);
    if (!driver) return false;
    return year >= driver.period[0] && year <= driver.period[1];
  };

  // Y-axis ticks
  const yTicks = [0, 4000, 8000, 12000, 16000];

  // X-axis ticks (all data years)
  const xTicks = consolidationData.map((d) => d.year);

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
          US Bank Consolidation (1985-2020)
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          The number of US banks has declined by over 69% in 35 years, from 14,400 to 4,400
        </p>
      </div>

      {/* Chart Container */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          padding: '20px',
          marginBottom: '24px',
          overflowX: 'auto',
        }}
      >
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          style={{
            width: '100%',
            maxWidth: CHART_WIDTH,
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        >
          <defs>
            {/* Gradient for area fill */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.05" />
            </linearGradient>
            {/* Filter for glow effect on selected points */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform={`translate(${PADDING.left}, ${PADDING.top})`}>
            {/* Grid lines */}
            {yTicks.map((tick) => (
              <line
                key={tick}
                x1={0}
                y1={yScale(tick)}
                x2={INNER_WIDTH}
                y2={yScale(tick)}
                stroke="var(--color-surface-2)"
                strokeDasharray="4,4"
                strokeOpacity={0.5}
              />
            ))}

            {/* Y-axis */}
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={INNER_HEIGHT}
              stroke="var(--color-surface-2)"
              strokeWidth={2}
            />

            {/* Y-axis labels */}
            {yTicks.map((tick) => (
              <text
                key={tick}
                x={-10}
                y={yScale(tick)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="12"
                fill="var(--color-text-muted)"
              >
                {(tick / 1000).toFixed(0)}k
              </text>
            ))}

            {/* Y-axis title */}
            <text
              x={-50}
              y={INNER_HEIGHT / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="var(--color-text-secondary)"
              transform={`rotate(-90, -50, ${INNER_HEIGHT / 2})`}
            >
              Number of Banks
            </text>

            {/* X-axis */}
            <line
              x1={0}
              y1={INNER_HEIGHT}
              x2={INNER_WIDTH}
              y2={INNER_HEIGHT}
              stroke="var(--color-surface-2)"
              strokeWidth={2}
            />

            {/* X-axis labels */}
            {xTicks.map((year) => (
              <text
                key={year}
                x={xScale(year)}
                y={INNER_HEIGHT + 20}
                textAnchor="middle"
                fontSize="11"
                fill="var(--color-text-muted)"
              >
                {year}
              </text>
            ))}

            {/* Area under line */}
            <motion.path
              d={areaPath}
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: animated ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            />

            {/* Animated line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="rgb(99, 102, 241)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: animated ? 1 : 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* Data points */}
            {consolidationData.map((point, index) => {
              const isSelected = selectedYear === point.year;
              const isHighlighted = selectedDriver
                ? isYearInDriverPeriod(point.year, selectedDriver)
                : true;

              return (
                <g key={point.year}>
                  {/* Event marker line (for events) */}
                  {point.event && (
                    <motion.line
                      x1={xScale(point.year)}
                      y1={yScale(point.banks) - 10}
                      x2={xScale(point.year)}
                      y2={-20}
                      stroke={
                        point.eventType === 'crisis'
                          ? 'rgb(239, 68, 68)'
                          : point.eventType === 'legislation'
                            ? 'rgb(16, 185, 129)'
                            : 'rgb(245, 158, 11)'
                      }
                      strokeWidth={1}
                      strokeDasharray="4,4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animated ? 0.5 : 0 }}
                      transition={{ delay: index * 0.15 + 2 }}
                    />
                  )}

                  {/* Event label */}
                  {point.event && (
                    <motion.text
                      x={xScale(point.year)}
                      y={-25}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="500"
                      fill={
                        point.eventType === 'crisis'
                          ? 'rgb(239, 68, 68)'
                          : point.eventType === 'legislation'
                            ? 'rgb(16, 185, 129)'
                            : 'rgb(245, 158, 11)'
                      }
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: animated ? 1 : 0, y: animated ? 0 : -10 }}
                      transition={{ delay: index * 0.15 + 2.2 }}
                    >
                      {point.event}
                    </motion.text>
                  )}

                  {/* Clickable data point */}
                  <motion.circle
                    cx={xScale(point.year)}
                    cy={yScale(point.banks)}
                    r={isSelected ? 10 : 7}
                    fill={isSelected ? 'rgb(99, 102, 241)' : 'var(--color-surface-1)'}
                    stroke="rgb(99, 102, 241)"
                    strokeWidth={2}
                    style={{
                      cursor: 'pointer',
                      filter: isSelected ? 'url(#glow)' : 'none',
                      opacity: isHighlighted ? 1 : 0.3,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: animated ? 1 : 0,
                      opacity: animated ? (isHighlighted ? 1 : 0.3) : 0,
                    }}
                    transition={{ delay: index * 0.15 + 1.8, type: 'spring' }}
                    whileHover={{ scale: 1.3 }}
                    onClick={() => setSelectedYear(selectedYear === point.year ? null : point.year)}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Selected Year Details */}
      <AnimatePresence mode="wait">
        {selectedData && (
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '4px',
                  }}
                >
                  Year
                </div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
                  {selectedData.year}
                </div>
              </div>
              <div
                style={{ width: '1px', height: '50px', backgroundColor: 'rgba(99, 102, 241, 0.3)' }}
              />
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '4px',
                  }}
                >
                  Number of Banks
                </div>
                <AnimatedValue value={selectedData.banks} size="xl" suffix=" banks" />
              </div>
              {selectedData.event && (
                <>
                  <div
                    style={{
                      width: '1px',
                      height: '50px',
                      backgroundColor: 'rgba(99, 102, 241, 0.3)',
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '4px',
                      }}
                    >
                      Key Event
                    </div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color:
                          selectedData.eventType === 'crisis'
                            ? 'rgb(239, 68, 68)'
                            : selectedData.eventType === 'legislation'
                              ? 'rgb(16, 185, 129)'
                              : 'rgb(245, 158, 11)',
                      }}
                    >
                      {selectedData.event}
                    </div>
                  </div>
                </>
              )}
            </div>
            {selectedYear && selectedYear !== 1985 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  marginTop: '16px',
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <span style={{ fontWeight: 600, color: 'rgb(239, 68, 68)' }}>
                  -{Math.round(((14400 - selectedData.banks) / 14400) * 100)}%
                </span>{' '}
                decline from 1985 peak
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consolidation Drivers */}
      <div style={{ marginBottom: '16px' }}>
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Drivers of Consolidation
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          Click on a driver to highlight its active period on the chart
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px',
          }}
        >
          {drivers.map((driver, index) => {
            const isSelected = selectedDriver === driver.id;

            return (
              <motion.button
                key={driver.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSelectedDriver(isSelected ? null : driver.id);
                  setSelectedYear(null);
                }}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: isSelected ? `${driver.color}15` : 'var(--color-surface-1)',
                  border: `2px solid ${isSelected ? driver.color : 'var(--color-surface-2)'}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{driver.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {driver.name}
                    </span>
                    <div style={{ fontSize: '11px', color: driver.color, marginTop: '2px' }}>
                      {driver.period[0]} - {driver.period[1]}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                    lineHeight: '1.5',
                  }}
                >
                  {driver.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Key Takeaway */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '24px',
          padding: '20px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(99, 102, 241)',
                marginBottom: '8px',
              }}
            >
              Key Takeaway
            </h4>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              Bank consolidation reflects the shift from a fragmented, locally-focused banking
              system to one dominated by large national and regional banks. While this brings
              efficiency gains, it also raises concerns about &quot;too big to fail&quot;
              institutions and reduced access to banking in rural communities.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Instruction */}
      {!selectedYear && !selectedDriver && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            marginTop: '16px',
          }}
        >
          Click on data points to see details, or click on drivers to highlight their impact period
        </p>
      )}
    </div>
  );
}
