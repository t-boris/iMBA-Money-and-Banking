'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/visualizations';

interface DataPoint {
  year: number;
  gdp: number;
  unemp: number;
}

const historicalData: DataPoint[] = [
  { year: 1970, gdp: 0.2, unemp: 2.0 },
  { year: 1974, gdp: -0.5, unemp: 1.6 },
  { year: 1975, gdp: -0.2, unemp: 1.3 },
  { year: 1980, gdp: -0.3, unemp: 1.5 },
  { year: 1982, gdp: -1.8, unemp: 2.2 },
  { year: 1984, gdp: 7.2, unemp: -2.1 },
  { year: 1991, gdp: -0.1, unemp: 1.0 },
  { year: 1994, gdp: 4.0, unemp: -0.6 },
  { year: 1997, gdp: 4.5, unemp: -0.5 },
  { year: 2000, gdp: 4.1, unemp: -0.2 },
  { year: 2001, gdp: 1.0, unemp: 1.2 },
  { year: 2005, gdp: 3.5, unemp: -0.2 },
  { year: 2009, gdp: -2.5, unemp: 3.5 },
  { year: 2010, gdp: 2.6, unemp: -0.6 },
  { year: 2014, gdp: 2.5, unemp: -1.2 },
  { year: 2018, gdp: 3.0, unemp: -0.6 },
  { year: 2020, gdp: -3.4, unemp: 4.4 },
  { year: 2021, gdp: 5.9, unemp: -2.8 },
];

// Okun's Law regression: deltaU = intercept + slope * gdpGrowth
// Slope ~ -0.5 (Okun's coefficient)
const OKUN_SLOPE = -0.5;
// Compute intercept from data mean for a realistic fit
const meanGDP = historicalData.reduce((s, d) => s + d.gdp, 0) / historicalData.length;
const meanUnemp = historicalData.reduce((s, d) => s + d.unemp, 0) / historicalData.length;
const OKUN_INTERCEPT = meanUnemp - OKUN_SLOPE * meanGDP;

function predictUnemploymentChange(gdpGrowth: number): number {
  return OKUN_INTERCEPT + OKUN_SLOPE * gdpGrowth;
}

// Chart dimensions
const WIDTH = 640;
const HEIGHT = 400;
const PADDING = { top: 40, right: 50, bottom: 65, left: 75 };
const CHART_W = WIDTH - PADDING.left - PADDING.right;
const CHART_H = HEIGHT - PADDING.top - PADDING.bottom;

// Axis ranges
const X_MIN = -4;
const X_MAX = 8;
const Y_MIN = -3.5;
const Y_MAX = 5;

function xScale(val: number): number {
  return PADDING.left + ((val - X_MIN) / (X_MAX - X_MIN)) * CHART_W;
}

function yScale(val: number): number {
  return PADDING.top + CHART_H - ((val - Y_MIN) / (Y_MAX - Y_MIN)) * CHART_H;
}

export default function OkunsLawChart() {
  const [gdpGrowth, setGdpGrowth] = useState(2.0);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  const predictedUnemp = useMemo(() => predictUnemploymentChange(gdpGrowth), [gdpGrowth]);

  // Regression line endpoints clamped to chart area
  const regressionLine = useMemo(() => {
    const x1 = X_MIN;
    const y1 = predictUnemploymentChange(x1);
    const x2 = X_MAX;
    const y2 = predictUnemploymentChange(x2);

    // Clamp y values
    const clampedPoints: { x: number; y: number }[] = [];
    for (const p of [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ]) {
      clampedPoints.push({
        x: Math.max(X_MIN, Math.min(X_MAX, p.x)),
        y: Math.max(Y_MIN, Math.min(Y_MAX, p.y)),
      });
    }

    return {
      x1: xScale(clampedPoints[0].x),
      y1: yScale(clampedPoints[0].y),
      x2: xScale(clampedPoints[1].x),
      y2: yScale(clampedPoints[1].y),
    };
  }, []);

  // X-axis tick values
  const xTicks = [-4, -2, 0, 2, 4, 6, 8];
  // Y-axis tick values
  const yTicks = [-3, -2, -1, 0, 1, 2, 3, 4, 5];

  // Prediction marker position
  const predX = xScale(gdpGrowth);
  const predY = yScale(predictedUnemp);
  const predClamped = predictedUnemp >= Y_MIN && predictedUnemp <= Y_MAX;

  return (
    <div
      className={cn('w-full')}
      style={{ maxWidth: '720px', margin: '0 auto' }}
    >
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
          Okun&apos;s Law
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          The inverse relationship between GDP growth and changes in unemployment
        </p>
      </div>

      {/* Chart Container */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <clipPath id="okun-chart-area">
              <rect
                x={PADDING.left}
                y={PADDING.top}
                width={CHART_W}
                height={CHART_H}
              />
            </clipPath>
          </defs>

          {/* Grid lines */}
          <g opacity={0.25}>
            {xTicks.map((tick) => (
              <line
                key={`gx-${tick}`}
                x1={xScale(tick)}
                y1={PADDING.top}
                x2={xScale(tick)}
                y2={PADDING.top + CHART_H}
                stroke="var(--color-surface-2)"
                strokeWidth={1}
                strokeDasharray={tick === 0 ? '0' : '4,4'}
              />
            ))}
            {yTicks.map((tick) => (
              <line
                key={`gy-${tick}`}
                x1={PADDING.left}
                y1={yScale(tick)}
                x2={PADDING.left + CHART_W}
                y2={yScale(tick)}
                stroke="var(--color-surface-2)"
                strokeWidth={1}
                strokeDasharray={tick === 0 ? '0' : '4,4'}
              />
            ))}
          </g>

          {/* Zero lines (thicker, more visible) */}
          <line
            x1={xScale(0)}
            y1={PADDING.top}
            x2={xScale(0)}
            y2={PADDING.top + CHART_H}
            stroke="var(--color-text-muted)"
            strokeWidth={1}
            opacity={0.5}
          />
          <line
            x1={PADDING.left}
            y1={yScale(0)}
            x2={PADDING.left + CHART_W}
            y2={yScale(0)}
            stroke="var(--color-text-muted)"
            strokeWidth={1}
            opacity={0.5}
          />

          {/* Axes */}
          <line
            x1={PADDING.left}
            y1={PADDING.top + CHART_H}
            x2={PADDING.left + CHART_W}
            y2={PADDING.top + CHART_H}
            stroke="var(--color-text-muted)"
            strokeWidth={2}
          />
          <line
            x1={PADDING.left}
            y1={PADDING.top}
            x2={PADDING.left}
            y2={PADDING.top + CHART_H}
            stroke="var(--color-text-muted)"
            strokeWidth={2}
          />

          {/* X-axis tick labels */}
          {xTicks.map((tick) => (
            <text
              key={`xl-${tick}`}
              x={xScale(tick)}
              y={PADDING.top + CHART_H + 20}
              fill="var(--color-text-muted)"
              fontSize="11"
              textAnchor="middle"
            >
              {tick}%
            </text>
          ))}

          {/* X-axis label */}
          <text
            x={PADDING.left + CHART_W / 2}
            y={HEIGHT - 8}
            fill="var(--color-text-secondary)"
            fontSize="13"
            fontWeight={500}
            textAnchor="middle"
          >
            Real GDP Growth (%)
          </text>

          {/* Y-axis tick labels */}
          {yTicks.map((tick) => (
            <text
              key={`yl-${tick}`}
              x={PADDING.left - 10}
              y={yScale(tick) + 4}
              fill="var(--color-text-muted)"
              fontSize="11"
              textAnchor="end"
            >
              {tick}%
            </text>
          ))}

          {/* Y-axis label */}
          <text
            x={18}
            y={PADDING.top + CHART_H / 2}
            fill="var(--color-text-secondary)"
            fontSize="13"
            fontWeight={500}
            textAnchor="middle"
            transform={`rotate(-90, 18, ${PADDING.top + CHART_H / 2})`}
          >
            Change in Unemployment (%)
          </text>

          {/* Regression line */}
          <g clipPath="url(#okun-chart-area)">
            <motion.line
              x1={regressionLine.x1}
              y1={regressionLine.y1}
              x2={regressionLine.x2}
              y2={regressionLine.y2}
              stroke="var(--color-primary-500)"
              strokeWidth={2.5}
              strokeDasharray="8,4"
              opacity={0.7}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </g>

          {/* Regression line label */}
          <text
            x={xScale(6.5)}
            y={yScale(predictUnemploymentChange(6.5)) - 12}
            fill="var(--color-primary-500)"
            fontSize="11"
            fontWeight={500}
            textAnchor="middle"
            opacity={0.8}
          >
            Slope = {OKUN_SLOPE}
          </text>

          {/* Data points */}
          {historicalData.map((point, index) => {
            const cx = xScale(point.gdp);
            const cy = yScale(point.unemp);
            const isHovered = hoveredPoint?.year === point.year;

            return (
              <g key={point.year}>
                {/* Hover hit area (larger, invisible) */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={14}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Visible dot */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 7 : 5}
                  fill={
                    point.gdp < 0
                      ? 'rgb(239, 68, 68)'
                      : point.gdp > 3
                        ? 'rgb(16, 185, 129)'
                        : 'rgb(99, 102, 241)'
                  }
                  stroke="var(--color-surface-1)"
                  strokeWidth={2}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.3 + index * 0.04,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}

          {/* Prediction marker on regression line */}
          {predClamped && (
            <g>
              {/* Vertical dashed line from prediction to X axis */}
              <motion.line
                x1={predX}
                y1={predY}
                x2={predX}
                y2={PADDING.top + CHART_H}
                stroke="var(--color-primary-500)"
                strokeWidth={1}
                strokeDasharray="3,3"
                opacity={0.4}
                animate={{ x1: predX, x2: predX, y1: predY }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
              {/* Horizontal dashed line from prediction to Y axis */}
              <motion.line
                x1={PADDING.left}
                y1={predY}
                x2={predX}
                y2={predY}
                stroke="var(--color-primary-500)"
                strokeWidth={1}
                strokeDasharray="3,3"
                opacity={0.4}
                animate={{ y1: predY, y2: predY, x2: predX }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
              {/* Outer pulse ring */}
              <motion.circle
                cx={predX}
                cy={predY}
                r={9}
                fill="none"
                stroke="var(--color-primary-500)"
                strokeWidth={2}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{
                  scale: [1, 1.8],
                  opacity: [0.6, 0],
                  cx: predX,
                  cy: predY,
                }}
                transition={{
                  scale: { duration: 1.5, repeat: Infinity, ease: 'easeOut' },
                  opacity: { duration: 1.5, repeat: Infinity, ease: 'easeOut' },
                  cx: { type: 'spring', stiffness: 120, damping: 20 },
                  cy: { type: 'spring', stiffness: 120, damping: 20 },
                }}
              />
              {/* Prediction dot */}
              <motion.circle
                cx={predX}
                cy={predY}
                r={9}
                fill="var(--color-primary-500)"
                stroke="var(--color-surface-1)"
                strokeWidth={3}
                animate={{ cx: predX, cy: predY }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
              />
              {/* Label on prediction marker */}
              <motion.text
                x={predX}
                y={predY - 16}
                fill="var(--color-primary-500)"
                fontSize="11"
                fontWeight={600}
                textAnchor="middle"
                animate={{ x: predX, y: predY - 16 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              >
                Prediction
              </motion.text>
            </g>
          )}

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredPoint && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {(() => {
                  const tx = xScale(hoveredPoint.gdp);
                  const ty = yScale(hoveredPoint.unemp);
                  // Position tooltip to the right unless too close to right edge
                  const tooltipW = 160;
                  const tooltipH = 60;
                  const flipX = tx + tooltipW + 20 > WIDTH - PADDING.right;
                  const tooltipX = flipX ? tx - tooltipW - 12 : tx + 12;
                  const tooltipY = Math.max(
                    PADDING.top,
                    Math.min(ty - tooltipH / 2, PADDING.top + CHART_H - tooltipH)
                  );

                  return (
                    <>
                      <rect
                        x={tooltipX}
                        y={tooltipY}
                        width={tooltipW}
                        height={tooltipH}
                        rx={8}
                        fill="var(--color-surface-0)"
                        stroke="var(--color-surface-2)"
                        strokeWidth={1}
                        style={{
                          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
                        }}
                      />
                      <text
                        x={tooltipX + tooltipW / 2}
                        y={tooltipY + 18}
                        fill="var(--color-text-primary)"
                        fontSize="13"
                        fontWeight={700}
                        textAnchor="middle"
                      >
                        {hoveredPoint.year}
                      </text>
                      <text
                        x={tooltipX + tooltipW / 2}
                        y={tooltipY + 34}
                        fill="var(--color-text-secondary)"
                        fontSize="11"
                        textAnchor="middle"
                      >
                        GDP: {hoveredPoint.gdp > 0 ? '+' : ''}
                        {hoveredPoint.gdp.toFixed(1)}%
                      </text>
                      <text
                        x={tooltipX + tooltipW / 2}
                        y={tooltipY + 50}
                        fill="var(--color-text-secondary)"
                        fontSize="11"
                        textAnchor="middle"
                      >
                        Unemp: {hoveredPoint.unemp > 0 ? '+' : ''}
                        {hoveredPoint.unemp.toFixed(1)}%
                      </text>
                    </>
                  );
                })()}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Legend */}
          <g transform={`translate(${PADDING.left + 8}, ${PADDING.top + 8})`}>
            <rect
              x={0}
              y={0}
              width={140}
              height={72}
              rx={8}
              fill="var(--color-surface-0)"
              opacity={0.85}
              stroke="var(--color-surface-2)"
              strokeWidth={1}
            />
            <circle cx={14} cy={16} r={4} fill="rgb(239, 68, 68)" />
            <text
              x={24}
              y={20}
              fill="var(--color-text-secondary)"
              fontSize="10"
            >
              Recession (GDP {'<'} 0)
            </text>
            <circle cx={14} cy={36} r={4} fill="rgb(99, 102, 241)" />
            <text
              x={24}
              y={40}
              fill="var(--color-text-secondary)"
              fontSize="10"
            >
              Moderate (0-3%)
            </text>
            <circle cx={14} cy={56} r={4} fill="rgb(16, 185, 129)" />
            <text
              x={24}
              y={60}
              fill="var(--color-text-secondary)"
              fontSize="10"
            >
              Strong ({'>'}3%)
            </text>
          </g>
        </svg>
      </div>

      {/* Slider */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <Slider
          label="GDP Growth Rate"
          value={gdpGrowth}
          onChange={setGdpGrowth}
          min={-4}
          max={8}
          step={0.5}
          unit="%"
        />
      </div>

      {/* Prediction Result */}
      <motion.div
        key={gdpGrowth}
        initial={{ opacity: 0.7, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          border: '1px solid var(--color-surface-2)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          {/* GDP Growth Input */}
          <div
            style={{
              padding: '16px',
              backgroundColor:
                gdpGrowth >= 0
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                marginBottom: '4px',
              }}
            >
              GDP Growth
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color:
                  gdpGrowth >= 0
                    ? 'rgb(16, 185, 129)'
                    : 'rgb(239, 68, 68)',
              }}
            >
              {gdpGrowth > 0 ? '+' : ''}
              {gdpGrowth.toFixed(1)}%
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              fontSize: '24px',
              color: 'var(--color-text-muted)',
              fontWeight: 300,
            }}
          >
            {'\u2192'}
          </div>

          {/* Predicted Unemployment Change */}
          <div
            style={{
              padding: '16px',
              backgroundColor:
                predictedUnemp <= 0
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                marginBottom: '4px',
              }}
            >
              Predicted Unemp. Change
            </div>
            <motion.div
              key={predictedUnemp.toFixed(2)}
              initial={{ scale: 1.1, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color:
                  predictedUnemp <= 0
                    ? 'rgb(16, 185, 129)'
                    : 'rgb(239, 68, 68)',
              }}
            >
              {predictedUnemp > 0 ? '+' : ''}
              {predictedUnemp.toFixed(1)}%
            </motion.div>
          </div>
        </div>

        {/* Sentence summary */}
        <div
          style={{
            marginTop: '16px',
            padding: '12px 16px',
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: '10px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            If real GDP grows by{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>
              {gdpGrowth > 0 ? '+' : ''}
              {gdpGrowth.toFixed(1)}%
            </strong>
            , Okun&apos;s Law predicts unemployment will change by approximately{' '}
            <strong
              style={{
                color:
                  predictedUnemp <= 0
                    ? 'rgb(16, 185, 129)'
                    : 'rgb(239, 68, 68)',
              }}
            >
              {predictedUnemp > 0 ? '+' : ''}
              {predictedUnemp.toFixed(1)} percentage points
            </strong>
            .
          </p>
        </div>
      </motion.div>

      {/* Key Insight */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.25)',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.7',
          }}
        >
          <strong style={{ color: 'rgb(99, 102, 241)' }}>
            Okun&apos;s Law:
          </strong>{' '}
          For every 1 percentage point increase in GDP growth above trend,
          unemployment falls by roughly 0.5 percentage points. This empirical
          relationship (coefficient {'\u2248'} {OKUN_SLOPE}) helps central banks
          gauge how monetary policy changes that affect GDP will ultimately
          impact unemployment in the labor market.
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
        Hover over data points to see historical values. Use the slider to
        explore predictions.
      </p>
    </div>
  );
}
