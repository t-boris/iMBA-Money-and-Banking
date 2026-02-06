'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface TEDSpreadTimelineProps {
  className?: string;
}

interface DataPoint {
  date: string; // YYYY-MM format
  value: number; // basis points
}

interface CrisisEvent {
  id: string;
  date: string;
  label: string;
  detail: string;
  category: 'crisis' | 'response';
}

// Approximate TED spread data points (basis points)
const tedData: DataPoint[] = [
  { date: '2006-01', value: 30 },
  { date: '2006-06', value: 35 },
  { date: '2006-12', value: 32 },
  { date: '2007-03', value: 40 },
  { date: '2007-06', value: 55 },
  { date: '2007-08', value: 200 },
  { date: '2007-10', value: 180 },
  { date: '2007-12', value: 150 },
  { date: '2008-01', value: 120 },
  { date: '2008-03', value: 200 },
  { date: '2008-05', value: 110 },
  { date: '2008-07', value: 130 },
  { date: '2008-09', value: 350 },
  { date: '2008-10', value: 450 },
  { date: '2008-11', value: 380 },
  { date: '2008-12', value: 200 },
  { date: '2009-03', value: 130 },
  { date: '2009-06', value: 70 },
  { date: '2009-09', value: 45 },
  { date: '2009-12', value: 30 },
  { date: '2010-06', value: 35 },
  { date: '2010-12', value: 25 },
];

const crisisEvents: CrisisEvent[] = [
  {
    id: 'bnp',
    date: '2007-08',
    label: '2007: BNP Paribas freezes funds',
    detail:
      'BNP Paribas halts withdrawals from three subprime mortgage funds, signaling the first major cracks in the global financial system. Interbank lending begins to freeze as banks lose trust in each other.',
    category: 'crisis',
  },
  {
    id: 'bear',
    date: '2008-03',
    label: 'Mar 2008: Bear Stearns rescue',
    detail:
      'The Federal Reserve facilitates JPMorgan\'s emergency acquisition of Bear Stearns at $2/share (later raised to $10). The Fed provides $30 billion in guarantees, marking unprecedented intervention to prevent systemic collapse.',
    category: 'crisis',
  },
  {
    id: 'lehman',
    date: '2008-09',
    label: 'Sep 2008: Lehman Brothers collapse',
    detail:
      'Lehman Brothers files for bankruptcy with $639 billion in assets - the largest bankruptcy in US history. The decision not to bail out Lehman sends shockwaves through global markets, freezing credit markets worldwide.',
    category: 'crisis',
  },
  {
    id: 'fdic',
    date: '2008-10',
    label: 'Sep 2008: Deposit insurance raised to $250K',
    detail:
      'FDIC deposit insurance limit permanently increased from $100,000 to $250,000 per depositor per bank. This prevents panic withdrawals by reassuring depositors their savings are protected.',
    category: 'response',
  },
  {
    id: 'tarp',
    date: '2008-11',
    label: 'Oct 2008: TARP bailout enacted',
    detail:
      'The Troubled Asset Relief Program authorizes $700 billion to purchase toxic assets and inject capital into banks. The Treasury uses $250 billion to buy preferred stock in major banks, stabilizing the system.',
    category: 'response',
  },
  {
    id: 'fed',
    date: '2008-12',
    label: 'Fed creates emergency liquidity facilities',
    detail:
      'The Federal Reserve creates unprecedented emergency lending programs (TAF, TSLF, PDCF, CPFF) to provide liquidity to financial institutions. The Fed\'s balance sheet expands from $900 billion to over $2 trillion.',
    category: 'response',
  },
];

// Chart dimensions
const CHART_WIDTH = 700;
const CHART_HEIGHT = 280;
const PADDING = { top: 20, right: 30, bottom: 40, left: 50 };
const PLOT_WIDTH = CHART_WIDTH - PADDING.left - PADDING.right;
const PLOT_HEIGHT = CHART_HEIGHT - PADDING.top - PADDING.bottom;

// Date to X position
function dateToX(dateStr: string): number {
  const [year, month] = dateStr.split('-').map(Number);
  const startDate = 2006;
  const endDate = 2011;
  const totalMonths = (endDate - startDate) * 12;
  const monthsSinceStart = (year - startDate) * 12 + (month - 1);
  return PADDING.left + (monthsSinceStart / totalMonths) * PLOT_WIDTH;
}

// Value to Y position
function valueToY(bps: number): number {
  const maxBps = 500;
  return PADDING.top + PLOT_HEIGHT - (bps / maxBps) * PLOT_HEIGHT;
}

// Get color for TED spread value (green=low stress, red=high stress)
function getStressColor(bps: number): string {
  if (bps < 50) return 'rgb(16, 185, 129)';
  if (bps < 100) return 'rgb(245, 158, 11)';
  if (bps < 200) return 'rgb(249, 115, 22)';
  return 'rgb(239, 68, 68)';
}

// Build SVG path for the area chart
function buildLinePath(data: DataPoint[]): string {
  return data
    .map((p, i) => {
      const x = dateToX(p.date);
      const y = valueToY(p.value);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}

function buildAreaPath(data: DataPoint[]): string {
  const linePart = buildLinePath(data);
  const lastX = dateToX(data[data.length - 1].date);
  const firstX = dateToX(data[0].date);
  const baseY = PADDING.top + PLOT_HEIGHT;
  return `${linePart} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
}

export function TEDSpreadTimeline({ className }: TEDSpreadTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<CrisisEvent | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  // Animate line drawing on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.02;
        if (progress >= 1) {
          progress = 1;
          clearInterval(interval);
        }
        setAnimationProgress(progress);
      }, 20);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Calculate visible data points based on animation progress
  const visibleCount = Math.ceil(tedData.length * animationProgress);
  const visibleData = tedData.slice(0, Math.max(visibleCount, 1));

  const handleEventClick = (event: CrisisEvent) => {
    if (selectedEvent?.id === event.id) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
  };

  // Get the current peak value for stress indicator
  const currentPeakBps = Math.max(...visibleData.map((d) => d.value));

  // Y-axis tick values
  const yTicks = [0, 100, 200, 300, 400, 500];

  // X-axis year labels
  const yearLabels = [2006, 2007, 2008, 2009, 2010];

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      {/* TED Spread Formula Display */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '4px',
              fontFamily: 'monospace',
            }}
          >
            TED Spread = Interbank Rate (LIBOR) - Treasury Bill Rate
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '8px' }}>
            <div
              style={{
                fontSize: '12px',
                color: 'rgb(16, 185, 129)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(16, 185, 129)',
                }}
              />
              Narrow = Trust
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'rgb(239, 68, 68)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(239, 68, 68)',
                }}
              />
              Wide = Fear
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor:
              currentPeakBps > 200
                ? 'rgba(239, 68, 68, 0.1)'
                : currentPeakBps > 100
                  ? 'rgba(245, 158, 11, 0.1)'
                  : 'rgba(16, 185, 129, 0.1)',
            border: `1px solid ${
              currentPeakBps > 200
                ? 'rgba(239, 68, 68, 0.3)'
                : currentPeakBps > 100
                  ? 'rgba(245, 158, 11, 0.3)'
                  : 'rgba(16, 185, 129, 0.3)'
            }`,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: getStressColor(currentPeakBps),
            }}
          />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: getStressColor(currentPeakBps),
            }}
          >
            Peak Spread: {currentPeakBps} bps
          </span>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            {currentPeakBps < 50
              ? '(Normal)'
              : currentPeakBps < 100
                ? '(Elevated)'
                : currentPeakBps < 200
                  ? '(Stressed)'
                  : '(Crisis)'}
          </span>
        </div>
      </motion.div>

      {/* SVG Chart */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid var(--color-surface-2)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            style={{ width: '100%', minWidth: '500px', height: 'auto', display: 'block' }}
          >
            <defs>
              {/* Gradient for area fill */}
              <linearGradient id="tedAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.4)" />
                <stop offset="50%" stopColor="rgba(245, 158, 11, 0.2)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
              </linearGradient>
              {/* Gradient for the line */}
              <linearGradient id="tedLineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(239, 68, 68)" />
                <stop offset="60%" stopColor="rgb(245, 158, 11)" />
                <stop offset="100%" stopColor="rgb(16, 185, 129)" />
              </linearGradient>
            </defs>

            {/* Y-axis grid lines and labels */}
            {yTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={PADDING.left}
                  y1={valueToY(tick)}
                  x2={PADDING.left + PLOT_WIDTH}
                  y2={valueToY(tick)}
                  stroke="var(--color-surface-2)"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? '0' : '4,4'}
                />
                <text
                  x={PADDING.left - 8}
                  y={valueToY(tick) + 4}
                  textAnchor="end"
                  fill="var(--color-text-muted)"
                  fontSize="10"
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* Y-axis label */}
            <text
              x={12}
              y={PADDING.top + PLOT_HEIGHT / 2}
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="10"
              transform={`rotate(-90, 12, ${PADDING.top + PLOT_HEIGHT / 2})`}
            >
              Basis Points
            </text>

            {/* X-axis year labels */}
            {yearLabels.map((year) => {
              const x = dateToX(`${year}-01`);
              return (
                <g key={year}>
                  <line
                    x1={x}
                    y1={PADDING.top}
                    x2={x}
                    y2={PADDING.top + PLOT_HEIGHT}
                    stroke="var(--color-surface-2)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                  />
                  <text
                    x={x}
                    y={PADDING.top + PLOT_HEIGHT + 20}
                    textAnchor="middle"
                    fill="var(--color-text-muted)"
                    fontSize="11"
                    fontWeight="500"
                  >
                    {year}
                  </text>
                </g>
              );
            })}

            {/* Area fill */}
            {isAnimated && visibleData.length > 1 && (
              <motion.path
                d={buildAreaPath(visibleData)}
                fill="url(#tedAreaGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {/* Line */}
            {isAnimated && visibleData.length > 1 && (
              <motion.path
                d={buildLinePath(visibleData)}
                fill="none"
                stroke="url(#tedLineGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Crisis event markers */}
            {isAnimated &&
              animationProgress >= 0.3 &&
              crisisEvents.map((event, index) => {
                const x = dateToX(event.date);
                // Find nearest data point value for y position
                const nearestData = tedData.reduce((prev, curr) => {
                  return Math.abs(dateToX(curr.date) - x) < Math.abs(dateToX(prev.date) - x)
                    ? curr
                    : prev;
                });
                const y = valueToY(nearestData.value);
                const isSelected = selectedEvent?.id === event.id;
                const isCrisis = event.category === 'crisis';
                const markerColor = isCrisis ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)';

                return (
                  <g
                    key={event.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEventClick(event)}
                  >
                    {/* Vertical reference line */}
                    <motion.line
                      x1={x}
                      y1={y}
                      x2={x}
                      y2={PADDING.top + PLOT_HEIGHT}
                      stroke={markerColor}
                      strokeWidth="1"
                      strokeDasharray="3,3"
                      strokeOpacity={isSelected ? 0.6 : 0.3}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    />

                    {/* Marker dot */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 8 : 6}
                      fill={markerColor}
                      stroke="white"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    />

                    {/* Pulse ring on selected */}
                    {isSelected && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={8}
                        fill="none"
                        stroke={markerColor}
                        strokeWidth="2"
                        initial={{ r: 8, opacity: 1 }}
                        animate={{ r: 16, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </g>
                );
              })}
          </svg>
        </div>
      </div>

      {/* Event Markers Legend */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '16px',
          marginBottom: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'rgb(239, 68, 68)',
            }}
          />
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Crisis Event
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'rgb(16, 185, 129)',
            }}
          />
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Safety Net Response
          </span>
        </div>
      </div>

      {/* Clickable Event Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
          marginTop: '12px',
          marginBottom: '16px',
        }}
      >
        {crisisEvents.map((event) => {
          const isSelected = selectedEvent?.id === event.id;
          const isCrisis = event.category === 'crisis';
          const color = isCrisis ? '239, 68, 68' : '16, 185, 129';

          return (
            <motion.button
              key={event.id}
              onClick={() => handleEventClick(event)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '10px 12px',
                backgroundColor: isSelected ? `rgba(${color}, 0.15)` : 'var(--color-surface-1)',
                border: isSelected
                  ? `2px solid rgba(${color}, 0.4)`
                  : '1px solid var(--color-surface-2)',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? `rgb(${color})` : 'var(--color-text-secondary)',
                lineHeight: '1.4',
              }}
            >
              {event.label}
            </motion.button>
          );
        })}
      </div>

      {/* Detail Card */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'rounded-xl overflow-hidden',
              'bg-glass-light backdrop-blur-md',
              'border border-glass-border shadow-glass'
            )}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                background:
                  selectedEvent.category === 'crisis'
                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))'
                    : 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor:
                        selectedEvent.category === 'crisis'
                          ? 'rgb(239, 68, 68)'
                          : 'rgb(16, 185, 129)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {selectedEvent.category === 'crisis' ? (
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
                      ) : (
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color:
                          selectedEvent.category === 'crisis'
                            ? 'rgb(239, 68, 68)'
                            : 'rgb(16, 185, 129)',
                        marginBottom: '2px',
                      }}
                    >
                      {selectedEvent.category === 'crisis' ? 'Crisis Event' : 'Safety Net Response'}
                    </div>
                    <h4
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        margin: 0,
                      }}
                    >
                      {selectedEvent.label}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  style={{
                    padding: '6px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)',
                  }}
                  aria-label="Close details"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Detail content */}
            <div style={{ padding: '16px 20px' }}>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.7',
                  margin: 0,
                }}
              >
                {selectedEvent.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation hint */}
      {!selectedEvent && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            marginTop: '12px',
          }}
        >
          Click on crisis events or chart markers to explore the 2007-2009 financial crisis
        </p>
      )}
    </div>
  );
}
