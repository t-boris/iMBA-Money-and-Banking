'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface RiskReturnTradeoffProps {
  className?: string;
}

interface InvestmentPoint {
  id: string;
  name: string;
  risk: number; // 0-100 scale
  return: number; // percentage
  color: string;
  description: string;
}

const investmentPoints: InvestmentPoint[] = [
  {
    id: 'tbills',
    name: 'Treasury Bills',
    risk: 5,
    return: 4.5,
    color: 'rgb(16, 185, 129)', // emerald
    description: 'Risk-free rate benchmark. Short-term government debt with no default risk.',
  },
  {
    id: 'govbonds',
    name: 'Government Bonds',
    risk: 15,
    return: 5.5,
    color: 'rgb(20, 184, 166)', // teal
    description:
      'Longer-term government securities. Higher duration risk but still no default risk.',
  },
  {
    id: 'corpbonds',
    name: 'Corporate Bonds',
    risk: 30,
    return: 7,
    color: 'rgb(59, 130, 246)', // blue
    description: 'Debt issued by corporations. Includes credit risk and interest rate risk.',
  },
  {
    id: 'bankloans',
    name: 'Bank Loans',
    risk: 45,
    return: 9,
    color: 'rgb(99, 102, 241)', // indigo
    description:
      'Where banks operate. Earn spread through credit assessment and relationship lending.',
  },
  {
    id: 'equities',
    name: 'Equities',
    risk: 75,
    return: 12,
    color: 'rgb(239, 68, 68)', // red
    description:
      'Stock market investments. Highest volatility but highest long-term expected returns.',
  },
];

// Generate curve points for the risk-return frontier
function generateCurvePoints(numPoints: number = 100): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const x = (i / numPoints) * 100;
    // Concave curve: diminishing returns to risk
    // y = riskFreeRate + a * sqrt(x)
    const y = 4.5 + 0.9 * Math.sqrt(x);
    points.push({ x, y });
  }
  return points;
}

// Get point on curve for a given risk level
function getPointOnCurve(risk: number): { risk: number; return: number } {
  return {
    risk,
    return: 4.5 + 0.9 * Math.sqrt(risk),
  };
}

// Get risk zone info
function getRiskZone(risk: number): { name: string; color: string; investments: string[] } {
  if (risk < 12) {
    return {
      name: 'Very Low Risk',
      color: 'rgb(16, 185, 129)',
      investments: ['Treasury Bills', 'Money Market Funds', 'Savings Accounts'],
    };
  } else if (risk < 25) {
    return {
      name: 'Low Risk',
      color: 'rgb(20, 184, 166)',
      investments: ['Government Bonds', 'Investment-Grade Corporate Bonds', 'CDs'],
    };
  } else if (risk < 40) {
    return {
      name: 'Moderate Risk',
      color: 'rgb(59, 130, 246)',
      investments: ['Corporate Bonds', 'Preferred Stock', 'Balanced Funds'],
    };
  } else if (risk < 60) {
    return {
      name: 'Medium-High Risk',
      color: 'rgb(99, 102, 241)',
      investments: ['Bank Loan Portfolios', 'REITs', 'Dividend Stocks'],
    };
  } else {
    return {
      name: 'High Risk',
      color: 'rgb(239, 68, 68)',
      investments: ['Growth Stocks', 'Small-Cap Equities', 'Emerging Markets'],
    };
  }
}

export function RiskReturnTradeoff({ className }: RiskReturnTradeoffProps) {
  const [riskLevel, setRiskLevel] = useState(45); // Default to bank loans zone
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const curvePoints = useMemo(() => generateCurvePoints(100), []);
  const currentPoint = useMemo(() => getPointOnCurve(riskLevel), [riskLevel]);
  const currentZone = useMemo(() => getRiskZone(riskLevel), [riskLevel]);

  // SVG dimensions
  const width = 600;
  const height = 350;
  const paddingTop = 40;
  const paddingRight = 40;
  const paddingBottom = 60;
  const paddingLeft = 70;
  const padding = {
    top: paddingTop,
    right: paddingRight,
    bottom: paddingBottom,
    left: paddingLeft,
  };
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Scale functions (memoized for stable references)
  const xScale = useCallback(
    (risk: number) => paddingLeft + (risk / 100) * chartWidth,
    [chartWidth, paddingLeft]
  );
  const yScale = useCallback(
    (ret: number) => height - paddingBottom - ((ret - 3) / 12) * chartHeight,
    [chartHeight, paddingBottom]
  );

  // Generate curve path
  const curvePath = useMemo(() => {
    return curvePoints
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.x)} ${yScale(p.y)}`)
      .join(' ');
  }, [curvePoints, xScale, yScale]);

  // Risk-free rate line
  const riskFreeLine = `M ${padding.left} ${yScale(4.5)} L ${width - padding.right} ${yScale(4.5)}`;

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '700px', margin: '0 auto' }}>
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
          Risk-Return Tradeoff
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Higher expected returns require taking on more risk
        </p>
      </div>

      {/* Main Chart */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
          {/* Grid lines */}
          <g opacity={0.3}>
            {[0, 25, 50, 75, 100].map((x) => (
              <line
                key={`grid-x-${x}`}
                x1={xScale(x)}
                y1={padding.top}
                x2={xScale(x)}
                y2={height - padding.bottom}
                stroke="var(--color-surface-2)"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}
            {[4, 6, 8, 10, 12, 14].map((y) => (
              <line
                key={`grid-y-${y}`}
                x1={padding.left}
                y1={yScale(y)}
                x2={width - padding.right}
                y2={yScale(y)}
                stroke="var(--color-surface-2)"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}
          </g>

          {/* Risk-free rate line */}
          <motion.path
            d={riskFreeLine}
            stroke="rgb(16, 185, 129)"
            strokeWidth={2}
            strokeDasharray="8,4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          <text
            x={width - padding.right + 5}
            y={yScale(4.5) + 4}
            fill="rgb(16, 185, 129)"
            fontSize="11"
            fontWeight={500}
          >
            Risk-Free Rate
          </text>

          {/* Risk-return curve */}
          <motion.path
            d={curvePath}
            stroke="url(#curveGradient)"
            strokeWidth={3}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" />
              <stop offset="30%" stopColor="rgb(59, 130, 246)" />
              <stop offset="60%" stopColor="rgb(99, 102, 241)" />
              <stop offset="100%" stopColor="rgb(239, 68, 68)" />
            </linearGradient>
          </defs>

          {/* Investment points */}
          {investmentPoints.map((point, index) => (
            <g key={point.id}>
              <motion.circle
                cx={xScale(point.risk)}
                cy={yScale(point.return)}
                r={selectedPoint === point.id ? 12 : 8}
                fill={point.color}
                stroke="white"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
              />
              {/* Pulsing animation for bank loans (where banks operate) */}
              {point.id === 'bankloans' && (
                <motion.circle
                  cx={xScale(point.risk)}
                  cy={yScale(point.return)}
                  r={8}
                  fill="none"
                  stroke={point.color}
                  strokeWidth={2}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              {/* Label */}
              <text
                x={xScale(point.risk)}
                y={yScale(point.return) - 16}
                fill="var(--color-text-primary)"
                fontSize="11"
                fontWeight={500}
                textAnchor="middle"
              >
                {point.name}
              </text>
            </g>
          ))}

          {/* Current position indicator */}
          <motion.circle
            cx={xScale(currentPoint.risk)}
            cy={yScale(currentPoint.return)}
            r={10}
            fill="white"
            stroke={currentZone.color}
            strokeWidth={3}
            animate={{
              cx: xScale(currentPoint.risk),
              cy: yScale(currentPoint.return),
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />

          {/* Vertical line from current position to x-axis */}
          <motion.line
            x1={xScale(currentPoint.risk)}
            y1={yScale(currentPoint.return)}
            x2={xScale(currentPoint.risk)}
            y2={height - padding.bottom}
            stroke={currentZone.color}
            strokeWidth={1}
            strokeDasharray="4,2"
            opacity={0.5}
            animate={{
              x1: xScale(currentPoint.risk),
              x2: xScale(currentPoint.risk),
              y1: yScale(currentPoint.return),
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />

          {/* Horizontal line from current position to y-axis */}
          <motion.line
            x1={padding.left}
            y1={yScale(currentPoint.return)}
            x2={xScale(currentPoint.risk)}
            y2={yScale(currentPoint.return)}
            stroke={currentZone.color}
            strokeWidth={1}
            strokeDasharray="4,2"
            opacity={0.5}
            animate={{
              y1: yScale(currentPoint.return),
              y2: yScale(currentPoint.return),
              x2: xScale(currentPoint.risk),
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />

          {/* Axes */}
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="var(--color-text-muted)"
            strokeWidth={2}
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="var(--color-text-muted)"
            strokeWidth={2}
          />

          {/* X-axis labels */}
          {[0, 25, 50, 75, 100].map((x) => (
            <text
              key={`x-label-${x}`}
              x={xScale(x)}
              y={height - padding.bottom + 20}
              fill="var(--color-text-muted)"
              fontSize="11"
              textAnchor="middle"
            >
              {x}%
            </text>
          ))}
          <text
            x={width / 2}
            y={height - 10}
            fill="var(--color-text-secondary)"
            fontSize="13"
            fontWeight={500}
            textAnchor="middle"
          >
            Risk (Volatility / Standard Deviation)
          </text>

          {/* Y-axis labels */}
          {[4, 6, 8, 10, 12, 14].map((y) => (
            <text
              key={`y-label-${y}`}
              x={padding.left - 10}
              y={yScale(y) + 4}
              fill="var(--color-text-muted)"
              fontSize="11"
              textAnchor="end"
            >
              {y}%
            </text>
          ))}
          <text
            x={15}
            y={height / 2}
            fill="var(--color-text-secondary)"
            fontSize="13"
            fontWeight={500}
            textAnchor="middle"
            transform={`rotate(-90, 15, ${height / 2})`}
          >
            Expected Return
          </text>
        </svg>
      </div>

      {/* Risk Slider */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Adjust Risk Tolerance
          </span>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: currentZone.color,
              padding: '4px 12px',
              backgroundColor: `${currentZone.color}20`,
              borderRadius: '6px',
            }}
          >
            {currentZone.name}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={riskLevel}
          onChange={(e) => setRiskLevel(Number(e.target.value))}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            appearance: 'none',
            background: `linear-gradient(to right,
              rgb(16, 185, 129) 0%,
              rgb(59, 130, 246) 40%,
              rgb(99, 102, 241) 60%,
              rgb(239, 68, 68) 100%)`,
            cursor: 'pointer',
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>Low Risk</span>
          <span>High Risk</span>
        </div>
      </div>

      {/* Info Panel */}
      <motion.div
        key={riskLevel}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
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
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Risk Level
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(59, 130, 246)' }}>
            {riskLevel}%
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>volatility</div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Expected Return
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(16, 185, 129)' }}>
            {currentPoint.return.toFixed(1)}%
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>annual</div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Risk Premium
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(245, 158, 11)' }}>
            {(currentPoint.return - 4.5).toFixed(1)}%
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>above risk-free</div>
        </div>
      </motion.div>

      {/* Example Investments */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: `${currentZone.color}15`,
          borderRadius: '12px',
          border: `1px solid ${currentZone.color}40`,
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: currentZone.color,
            marginBottom: '8px',
          }}
        >
          Example Investments at This Risk Level:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {currentZone.investments.map((inv) => (
            <span
              key={inv}
              style={{
                padding: '4px 10px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
              }}
            >
              {inv}
            </span>
          ))}
        </div>
      </div>

      {/* Selected Investment Detail */}
      {selectedPoint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: `2px solid ${investmentPoints.find((p) => p.id === selectedPoint)?.color || 'var(--color-surface-2)'}`,
            marginBottom: '20px',
          }}
        >
          {(() => {
            const point = investmentPoints.find((p) => p.id === selectedPoint);
            if (!point) return null;
            return (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: point.color }}>
                    {point.name}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Risk: {point.risk}% | Return: {point.return}%
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                    lineHeight: '1.6',
                  }}
                >
                  {point.description}
                </p>
              </>
            );
          })()}
        </motion.div>
      )}

      {/* Key Insight */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          <strong style={{ color: 'rgb(99, 102, 241)' }}>Where Banks Operate:</strong> Banks
          typically operate in the medium-risk zone through lending activities. They earn the{' '}
          <strong>risk premium</strong> (the return above the risk-free rate) by assessing credit
          risk, managing loan portfolios, and maintaining relationships with borrowers. This is why
          banking is fundamentally about <em>risk management</em>.
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
        Click on investment points for details. Use the slider to explore different risk levels.
      </p>
    </div>
  );
}
