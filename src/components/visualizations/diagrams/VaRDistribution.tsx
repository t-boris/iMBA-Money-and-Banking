'use client';

import { useState, useMemo } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface VaRDistributionProps {
  className?: string;
}

type ConfidenceLevel = 95 | 99 | 99.9;
type DistributionType = 'normal' | 'fat-tails';

interface BetExample {
  id: string;
  name: string;
  description: string;
  outcomes: { probability: number; pnl: number }[];
  expectedValue: number;
  var95: number;
}

const betExamples: BetExample[] = [
  {
    id: 'bet-a',
    name: 'Bet A: Moderate Risk',
    description: '50% chance -$100, 50% chance +$300',
    outcomes: [
      { probability: 0.5, pnl: -100 },
      { probability: 0.5, pnl: 300 },
    ],
    expectedValue: 100, // (0.5 * -100) + (0.5 * 300) = 100
    var95: 100, // Worst 5% loss
  },
  {
    id: 'bet-b',
    name: 'Bet B: Tail Risk',
    description: '10% chance -$800, 80% chance +$0, 10% chance +$1000',
    outcomes: [
      { probability: 0.1, pnl: -800 },
      { probability: 0.8, pnl: 0 },
      { probability: 0.1, pnl: 1000 },
    ],
    expectedValue: 100, // (0.1 * -800) + (0.8 * 0) + (0.1 * 1000) = 100
    var95: 800, // Worst 5% loss (actually 10%)
  },
];

// VaR thresholds for different confidence levels
const varThresholds: Record<ConfidenceLevel, Record<DistributionType, number>> = {
  95: { normal: 1.645, 'fat-tails': 1.8 },
  99: { normal: 2.326, 'fat-tails': 2.8 },
  99.9: { normal: 3.09, 'fat-tails': 4.0 },
};

// Generate distribution data points
function generateDistribution(type: DistributionType, points: number = 100): { x: number; y: number }[] {
  const data: { x: number; y: number }[] = [];

  for (let i = 0; i < points; i++) {
    const x = -4 + (8 * i) / (points - 1); // Range from -4 to +4 standard deviations

    let y: number;
    if (type === 'normal') {
      // Standard normal distribution
      y = Math.exp(-(x * x) / 2) / Math.sqrt(2 * Math.PI);
    } else {
      // Fat-tailed (Student's t with df=3)
      const df = 3;
      y = (0.36755 * Math.pow(1 + (x * x) / df, -(df + 1) / 2));
    }

    data.push({ x, y });
  }

  return data;
}

export function VaRDistribution({ className }: VaRDistributionProps) {
  const [confidence, setConfidence] = useState<ConfidenceLevel>(99);
  const [distributionType, setDistributionType] = useState<DistributionType>('normal');
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const [showBetComparison, setShowBetComparison] = useState(false);

  const distribution = useMemo(() => generateDistribution(distributionType), [distributionType]);

  // SVG dimensions
  const width = 600;
  const height = 280;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Scale functions
  const xScale = (x: number) => padding.left + ((x + 4) / 8) * chartWidth;
  const yScale = (y: number) => padding.top + chartHeight - (y / 0.45) * chartHeight;

  // VaR threshold line position
  const varThreshold = varThresholds[confidence][distributionType];
  const varX = xScale(-varThreshold);

  // Create path for distribution curve
  const pathData = distribution
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${xScale(point.x)} ${yScale(point.y)}`)
    .join(' ');

  // Create path for shaded tail area
  const tailAreaData = distribution
    .filter((point) => point.x <= -varThreshold)
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${xScale(point.x)} ${yScale(point.y)}`)
    .join(' ')
    + ` L ${varX} ${yScale(0)} L ${xScale(-4)} ${yScale(0)} Z`;

  // Dollar VaR (assuming $10M standard deviation)
  const dollarVaR = Math.round(varThreshold * 10);

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Value at Risk (VaR) Distribution
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          How much can we lose on a bad day?
        </p>
      </div>

      {/* Controls Row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {/* Confidence Level Selector */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px', textAlign: 'center' }}>
            Confidence Level
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {([95, 99, 99.9] as ConfidenceLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setConfidence(level)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: confidence === level ? 'rgba(99, 102, 241, 0.15)' : 'var(--color-surface-1)',
                  color: confidence === level ? 'rgb(99, 102, 241)' : 'var(--color-text-secondary)',
                  fontWeight: confidence === level ? 600 : 400,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {level}%
              </button>
            ))}
          </div>
        </div>

        {/* Distribution Type Toggle */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px', textAlign: 'center' }}>
            Distribution Type
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['normal', 'fat-tails'] as DistributionType[]).map((type) => (
              <button
                key={type}
                onClick={() => setDistributionType(type)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: distributionType === type ? 'rgba(245, 158, 11, 0.15)' : 'var(--color-surface-1)',
                  color: distributionType === type ? 'rgb(245, 158, 11)' : 'var(--color-text-secondary)',
                  fontWeight: distributionType === type ? 600 : 400,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {type === 'normal' ? 'Normal' : 'Fat Tails'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VaR Summary */}
      <motion.div
        key={`${confidence}-${distributionType}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '16px 24px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '12px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
          {confidence}% VaR = <strong style={{ color: 'rgb(99, 102, 241)' }}>${dollarVaR}M</strong>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
          &quot;With {confidence}% confidence, worst daily loss won&apos;t exceed ${dollarVaR}M&quot;
        </div>
      </motion.div>

      {/* Main Chart */}
      <div style={{
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
      }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(239, 68, 68, 0.6)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0.2)" />
            </linearGradient>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" />
              <stop offset="50%" stopColor="rgb(99, 102, 241)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
            <line
              key={x}
              x1={xScale(x)}
              y1={padding.top}
              x2={xScale(x)}
              y2={height - padding.bottom}
              stroke="var(--color-surface-2)"
              strokeWidth="1"
            />
          ))}

          {/* X-axis */}
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="var(--color-text-muted)"
            strokeWidth="1"
          />

          {/* X-axis labels */}
          {[
            { x: -3, label: '-$30M' },
            { x: -2, label: '-$20M' },
            { x: -1, label: '-$10M' },
            { x: 0, label: '$0' },
            { x: 1, label: '+$10M' },
            { x: 2, label: '+$20M' },
            { x: 3, label: '+$30M' },
          ].map((tick) => (
            <text
              key={tick.x}
              x={xScale(tick.x)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="11"
            >
              {tick.label}
            </text>
          ))}

          {/* X-axis title */}
          <text
            x={width / 2}
            y={height - 5}
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            fontSize="12"
          >
            Daily P&amp;L
          </text>

          {/* Shaded tail area */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            d={tailAreaData}
            fill="url(#tailGradient)"
          />

          {/* Distribution curve */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            d={pathData}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="3"
          />

          {/* VaR threshold line */}
          <motion.line
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x1={varX}
            y1={padding.top}
            x2={varX}
            y2={height - padding.bottom}
            stroke="rgb(239, 68, 68)"
            strokeWidth="2"
            strokeDasharray="6,4"
          />

          {/* VaR label */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <rect
              x={varX - 45}
              y={padding.top + 10}
              width="90"
              height="26"
              rx="6"
              fill="rgba(239, 68, 68, 0.9)"
            />
            <text
              x={varX}
              y={padding.top + 28}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="600"
            >
              VaR = ${dollarVaR}M
            </text>
          </motion.g>

          {/* Tail probability label */}
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x={xScale(-3.5)}
            y={padding.top + 60}
            textAnchor="middle"
            fill="rgb(239, 68, 68)"
            fontSize="11"
            fontWeight="600"
          >
            {(100 - confidence).toFixed(1)}% tail
          </motion.text>

          {/* Loss/Gain labels */}
          <text
            x={xScale(-2)}
            y={height - padding.bottom - 10}
            textAnchor="middle"
            fill="rgb(239, 68, 68)"
            fontSize="11"
            fontWeight="600"
          >
            LOSSES
          </text>
          <text
            x={xScale(2)}
            y={height - padding.bottom - 10}
            textAnchor="middle"
            fill="rgb(16, 185, 129)"
            fontSize="11"
            fontWeight="600"
          >
            GAINS
          </text>
        </svg>
      </div>

      {/* Fat Tails Explanation */}
      {distributionType === 'fat-tails' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '16px 20px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid rgba(245, 158, 11, 0.2)',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(245, 158, 11)', marginBottom: '8px' }}>
            Why Fat Tails Matter
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
            Real market returns have &quot;fat tails&quot; - extreme events happen more often than a normal distribution predicts.
            The 2008 financial crisis saw moves that were supposed to be &quot;25 standard deviation events&quot; - essentially impossible
            under normal assumptions. VaR can severely underestimate tail risk.
          </div>
        </motion.div>
      )}

      {/* Black Swan Callout */}
      <div style={{
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(127, 29, 29, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            flexShrink: 0,
          }}>
            &#128038;
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              The Black Swan Problem
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              <strong>VaR tells you the threshold, not how bad it can get.</strong> During the 2008 crisis, some banks lost
              10x their VaR in a single day. A 99% VaR says nothing about what happens in that remaining 1% -
              it could be a small loss or a catastrophic wipeout. This is why regulators now require &quot;stressed VaR&quot;
              and &quot;Expected Shortfall&quot; calculations.
            </div>
          </div>
        </div>
      </div>

      {/* Bet Comparison Section */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => setShowBetComparison(!showBetComparison)}
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
          <span>Bet Comparison: Same Expected Return, Different Risk</span>
          <span style={{ transform: showBetComparison ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            &#9660;
          </span>
        </button>

        {showBetComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{ marginTop: '12px' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {betExamples.map((bet) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedBet(selectedBet === bet.id ? null : bet.id)}
                  style={{
                    padding: '16px',
                    backgroundColor: selectedBet === bet.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-surface-1)',
                    borderRadius: '12px',
                    border: selectedBet === bet.id ? '2px solid rgba(99, 102, 241, 0.3)' : '2px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                    {bet.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                    {bet.description}
                  </div>

                  {/* Outcome bars */}
                  <div style={{ marginBottom: '12px' }}>
                    {bet.outcomes.map((outcome, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div style={{
                          width: `${outcome.probability * 100}%`,
                          minWidth: '20px',
                          height: '16px',
                          backgroundColor: outcome.pnl < 0 ? 'rgba(239, 68, 68, 0.3)' : outcome.pnl > 0 ? 'rgba(16, 185, 129, 0.3)' : 'var(--color-surface-2)',
                          borderRadius: '4px',
                        }} />
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                          {(outcome.probability * 100)}%: {outcome.pnl >= 0 ? '+' : ''}{outcome.pnl}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)' }}>Expected: </span>
                      <span style={{ fontWeight: 600, color: 'rgb(16, 185, 129)' }}>+${bet.expectedValue}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)' }}>95% VaR: </span>
                      <span style={{ fontWeight: 600, color: 'rgb(239, 68, 68)' }}>${bet.var95}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{
              marginTop: '12px',
              padding: '12px 16px',
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
            }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Key Insight:</strong> Both bets have the same expected return (+$100),
              but Bet B has 8x higher VaR. Same reward, very different risk. This is why VaR matters for
              comparing investments with similar expected returns.
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
      }}>
        <div style={{
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Confidence
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
            {confidence}%
          </div>
        </div>
        <div style={{
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            VaR Threshold
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(239, 68, 68)' }}>
            ${dollarVaR}M
          </div>
        </div>
        <div style={{
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Tail Probability
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(245, 158, 11)' }}>
            {(100 - confidence).toFixed(1)}%
          </div>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
        Adjust confidence level and distribution type to see how VaR changes
      </p>
    </div>
  );
}
