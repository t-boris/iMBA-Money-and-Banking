'use client';

import { useState, useMemo } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface InterestRateSensitivityProps {
  className?: string;
}

type HighlightedDuration = 'all' | '1-year' | '5-year' | '30-year';

interface DurationInfo {
  label: string;
  years: number;
  color: string;
  description: string;
}

const durations: Record<Exclude<HighlightedDuration, 'all'>, DurationInfo> = {
  '1-year': {
    label: '1-Year Bond',
    years: 1,
    color: 'rgb(16, 185, 129)',
    description: 'Nearly flat - minimal rate sensitivity',
  },
  '5-year': {
    label: '5-Year Bond',
    years: 5,
    color: 'rgb(99, 102, 241)',
    description: 'Moderate curve - medium sensitivity',
  },
  '30-year': {
    label: '30-Year Bond',
    years: 30,
    color: 'rgb(239, 68, 68)',
    description: 'Steep curve - high rate sensitivity',
  },
};

// Calculate bond price given yield change
// Price % change ~ -Duration * (rate change)
function calculatePriceChange(duration: number, currentRate: number, newRate: number): number {
  const rateChange = newRate - currentRate;
  // Modified duration approximation with convexity adjustment
  const modifiedDuration = duration / (1 + currentRate / 100);
  const priceChange = -modifiedDuration * rateChange;
  // Add convexity effect for large changes
  const convexity = (duration * (duration + 1)) / (2 * Math.pow(1 + currentRate / 100, 2));
  const convexityAdjustment = 0.5 * convexity * Math.pow(rateChange / 100, 2) * 100;
  return priceChange + convexityAdjustment;
}

// Generate curve points for SVG
function generateCurvePoints(
  duration: number,
  startRate: number = 0,
  endRate: number = 10
): string {
  const points: string[] = [];
  const basePrice = 100;

  for (let rate = startRate; rate <= endRate; rate += 0.5) {
    const priceChange = calculatePriceChange(duration, 4, rate);
    const price = basePrice + priceChange;
    // Map to SVG coordinates
    const x = 60 + (rate / 10) * 480; // 60 to 540
    const y = 300 - (price / 200) * 260; // 40 to 300 (inverted y)
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return points.join(' ');
}

function BondPriceCurve({ highlighted }: { highlighted: HighlightedDuration }) {
  const viewBox = '0 0 600 350';

  return (
    <svg viewBox={viewBox} style={{ width: '100%', height: 'auto', maxHeight: '350px' }}>
      {/* Background grid */}
      <defs>
        <pattern id="grid" width="48" height="26" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 26" fill="none" stroke="var(--color-surface-2)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="60" y="40" width="480" height="260" fill="url(#grid)" />

      {/* Axes */}
      <line x1="60" y1="300" x2="540" y2="300" stroke="var(--color-text-muted)" strokeWidth="2" />
      <line x1="60" y1="40" x2="60" y2="300" stroke="var(--color-text-muted)" strokeWidth="2" />

      {/* X-axis labels */}
      {[0, 2, 4, 6, 8, 10].map((rate) => (
        <text
          key={rate}
          x={60 + (rate / 10) * 480}
          y="320"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="12"
        >
          {rate}%
        </text>
      ))}
      <text
        x="300"
        y="345"
        textAnchor="middle"
        fill="var(--color-text-secondary)"
        fontSize="13"
        fontWeight="600"
      >
        Interest Rate
      </text>

      {/* Y-axis labels */}
      {[50, 75, 100, 125, 150].map((price) => (
        <g key={price}>
          <text
            x="50"
            y={300 - (price / 200) * 260 + 4}
            textAnchor="end"
            fill="var(--color-text-muted)"
            fontSize="11"
          >
            {price}
          </text>
          <line
            x1="60"
            y1={300 - (price / 200) * 260}
            x2="540"
            y2={300 - (price / 200) * 260}
            stroke="var(--color-surface-2)"
            strokeWidth="1"
            strokeDasharray={price === 100 ? '0' : '4,4'}
            opacity={price === 100 ? 0.6 : 0.3}
          />
        </g>
      ))}
      <text
        x="15"
        y="170"
        textAnchor="middle"
        fill="var(--color-text-secondary)"
        fontSize="13"
        fontWeight="600"
        transform="rotate(-90, 15, 170)"
      >
        Bond Price (% of Par)
      </text>

      {/* Par value reference line */}
      <line
        x1="60"
        y1="170"
        x2="540"
        y2="170"
        stroke="var(--color-text-muted)"
        strokeWidth="1"
        strokeDasharray="6,3"
      />
      <text x="545" y="174" fill="var(--color-text-muted)" fontSize="10">
        Par
      </text>

      {/* Price curves */}
      {(Object.keys(durations) as Exclude<HighlightedDuration, 'all'>[]).map((key) => {
        const dur = durations[key];
        const isHighlighted = highlighted === 'all' || highlighted === key;
        const points = generateCurvePoints(dur.years);

        return (
          <motion.polyline
            key={key}
            points={points}
            fill="none"
            stroke={dur.color}
            strokeWidth={isHighlighted ? 3 : 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: isHighlighted ? 1 : 0.3,
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        );
      })}

      {/* Current rate marker at 4% */}
      <motion.line
        x1={60 + (4 / 10) * 480}
        y1="40"
        x2={60 + (4 / 10) * 480}
        y2="300"
        stroke="var(--color-text-muted)"
        strokeWidth="2"
        strokeDasharray="4,4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
      />
      <text
        x={60 + (4 / 10) * 480}
        y="35"
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fontSize="11"
      >
        Current (4%)
      </text>
    </svg>
  );
}

function EquityImpactDemo({ currentRate, newRate }: { currentRate: number; newRate: number }) {
  // Simplified balance sheet
  const assets = 1000; // $1B in assets
  const liabilities = 900; // $900M in liabilities
  const initialEquity = assets - liabilities; // $100M

  // Asset duration ~7 years, liability duration ~0.5 years
  const assetDuration = 7;
  const liabilityDuration = 0.5;

  const assetValueChange = calculatePriceChange(assetDuration, currentRate, newRate);
  const liabilityValueChange = calculatePriceChange(liabilityDuration, currentRate, newRate);

  const newAssetValue = assets * (1 + assetValueChange / 100);
  const newLiabilityValue = liabilities * (1 + liabilityValueChange / 100);
  const newEquity = newAssetValue - newLiabilityValue;
  const equityChange = ((newEquity - initialEquity) / initialEquity) * 100;

  const isRateRise = newRate > currentRate;
  const isRateFall = newRate < currentRate;

  return (
    <motion.div
      key={`${currentRate}-${newRate}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        padding: '20px',
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '12px',
        border: '1px solid var(--color-surface-2)',
      }}
    >
      <h4
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        Bank Equity Impact (Mark-to-Market)
      </h4>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        {/* Before */}
        <div
          style={{
            padding: '12px',
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            Before (at {currentRate}%)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'rgb(59, 130, 246)' }}>Assets</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(59, 130, 246)' }}>
                ${assets}M
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'rgb(245, 158, 11)' }}>Liabilities</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(245, 158, 11)' }}>
                ${liabilities}M
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '6px',
                borderTop: '1px solid var(--color-surface-1)',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}>
                Equity
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'rgb(16, 185, 129)' }}>
                ${initialEquity}M
              </span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ fontSize: '24px', color: 'var(--color-text-muted)' }}
        >
          {isRateRise ? '->' : isRateFall ? '->' : '='}
        </motion.div>

        {/* After */}
        <div
          style={{
            padding: '12px',
            backgroundColor: isRateRise
              ? 'rgba(239, 68, 68, 0.1)'
              : isRateFall
                ? 'rgba(16, 185, 129, 0.1)'
                : 'var(--color-surface-2)',
            borderRadius: '8px',
            border:
              isRateRise || isRateFall
                ? `2px solid ${isRateRise ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                : 'none',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            After (at {newRate}%)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'rgb(59, 130, 246)' }}>Assets</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(59, 130, 246)' }}>
                ${newAssetValue.toFixed(0)}M
                <span
                  style={{
                    fontSize: '10px',
                    marginLeft: '4px',
                    color: assetValueChange > 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                  }}
                >
                  ({assetValueChange > 0 ? '+' : ''}
                  {assetValueChange.toFixed(1)}%)
                </span>
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'rgb(245, 158, 11)' }}>Liabilities</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(245, 158, 11)' }}>
                ${newLiabilityValue.toFixed(0)}M
                <span
                  style={{
                    fontSize: '10px',
                    marginLeft: '4px',
                    color: liabilityValueChange > 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                  }}
                >
                  ({liabilityValueChange > 0 ? '+' : ''}
                  {liabilityValueChange.toFixed(1)}%)
                </span>
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '6px',
                borderTop: '1px solid var(--color-surface-1)',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: equityChange >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                }}
              >
                Equity
              </span>
              <motion.span
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5 }}
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: equityChange >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                }}
              >
                ${newEquity.toFixed(0)}M
                <span style={{ fontSize: '10px', marginLeft: '4px' }}>
                  ({equityChange > 0 ? '+' : ''}
                  {equityChange.toFixed(1)}%)
                </span>
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '12px',
          padding: '10px',
          backgroundColor: isRateRise
            ? 'rgba(239, 68, 68, 0.1)'
            : isRateFall
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(99, 102, 241, 0.1)',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: isRateRise
              ? 'rgb(239, 68, 68)'
              : isRateFall
                ? 'rgb(16, 185, 129)'
                : 'rgb(99, 102, 241)',
            fontWeight: 500,
          }}
        >
          {isRateRise && 'Assets fall more than liabilities (longer duration) -> Equity shrinks'}
          {isRateFall && 'Assets rise more than liabilities (longer duration) -> Equity expands'}
          {!isRateRise && !isRateFall && 'No rate change - equity stable'}
        </span>
      </div>
    </motion.div>
  );
}

export function InterestRateSensitivity({ className }: InterestRateSensitivityProps) {
  const [highlighted, setHighlighted] = useState<HighlightedDuration>('all');
  const [currentRate, setCurrentRate] = useState(4);
  const [newRate, setNewRate] = useState(6);

  const priceChanges = useMemo(() => {
    return (Object.keys(durations) as Exclude<HighlightedDuration, 'all'>[]).map((key) => ({
      key,
      ...durations[key],
      change: calculatePriceChange(durations[key].years, currentRate, newRate),
    }));
  }, [currentRate, newRate]);

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
          Interest Rate Sensitivity
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Longer duration = more sensitive to rate changes (the Valuation Channel)
        </p>
      </div>

      {/* Duration Highlight Selector */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setHighlighted('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor:
              highlighted === 'all' ? 'var(--color-text-primary)' : 'var(--color-surface-1)',
            color:
              highlighted === 'all' ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
            fontWeight: highlighted === 'all' ? 600 : 400,
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          All Curves
        </button>
        {(Object.keys(durations) as Exclude<HighlightedDuration, 'all'>[]).map((key) => (
          <button
            key={key}
            onClick={() => setHighlighted(key)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor:
                highlighted === key ? durations[key].color : 'var(--color-surface-1)',
              color: highlighted === key ? 'white' : 'var(--color-text-secondary)',
              fontWeight: highlighted === key ? 600 : 400,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {durations[key].label}
          </button>
        ))}
      </div>

      {/* Price-Rate Curve */}
      <div
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          marginBottom: '20px',
        }}
      >
        <BondPriceCurve highlighted={highlighted} />

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}
        >
          {(Object.keys(durations) as Exclude<HighlightedDuration, 'all'>[]).map((key) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '24px',
                  height: '3px',
                  backgroundColor: durations[key].color,
                  borderRadius: '2px',
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {durations[key].label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Change Simulator */}
      <div
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          marginBottom: '20px',
        }}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Rate Change Simulator
        </h4>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '20px',
          }}
        >
          {/* Current Rate Slider */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                marginBottom: '8px',
              }}
            >
              Current Rate:{' '}
              <strong style={{ color: 'var(--color-text-primary)' }}>{currentRate}%</strong>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={currentRate}
              onChange={(e) => setCurrentRate(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* New Rate Slider */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                marginBottom: '8px',
              }}
            >
              New Rate:{' '}
              <strong
                style={{
                  color:
                    newRate > currentRate
                      ? 'rgb(239, 68, 68)'
                      : newRate < currentRate
                        ? 'rgb(16, 185, 129)'
                        : 'var(--color-text-primary)',
                }}
              >
                {newRate}%
              </strong>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={newRate}
              onChange={(e) => setNewRate(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Rate Change Indicator */}
        <div
          style={{
            textAlign: 'center',
            padding: '12px',
            backgroundColor:
              newRate > currentRate
                ? 'rgba(239, 68, 68, 0.1)'
                : newRate < currentRate
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'var(--color-surface-2)',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color:
                newRate > currentRate
                  ? 'rgb(239, 68, 68)'
                  : newRate < currentRate
                    ? 'rgb(16, 185, 129)'
                    : 'var(--color-text-muted)',
            }}
          >
            Rate Change: {newRate > currentRate ? '+' : ''}
            {(newRate - currentRate).toFixed(1)}%
          </span>
        </div>

        {/* Price Impact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {priceChanges.map((item) => (
            <motion.div
              key={item.key}
              initial={{ scale: 1 }}
              animate={{ scale: newRate !== currentRate ? [1, 1.02, 1] : 1 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: '16px',
                backgroundColor: `${item.color}15`,
                borderRadius: '12px',
                textAlign: 'center',
                border: `2px solid ${item.color}40`,
              }}
            >
              <div
                style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}
              >
                {item.label}
              </div>
              <motion.div
                key={`${item.key}-${currentRate}-${newRate}`}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color:
                    item.change > 0
                      ? 'rgb(16, 185, 129)'
                      : item.change < 0
                        ? 'rgb(239, 68, 68)'
                        : item.color,
                }}
              >
                {item.change > 0 ? '+' : ''}
                {item.change.toFixed(1)}%
              </motion.div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>price change</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Valuation Formula */}
      <div
        style={{
          padding: '16px',
          backgroundColor: 'rgba(99, 102, 241, 0.05)',
          borderRadius: '12px',
          border: '1px dashed rgba(99, 102, 241, 0.3)',
          marginBottom: '20px',
        }}
      >
        <h4
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'rgb(99, 102, 241)',
            marginBottom: '12px',
          }}
        >
          Valuation Channel
        </h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <div>
            <strong>Bond Price</strong> = Sum of (Cash Flow / (1+r)^t)
          </div>
          <div>Higher r (rate) = Lower present value of future cash flows</div>
          <div>Longer t (time) = More sensitive to r changes</div>
        </div>
      </div>

      {/* Bank Equity Impact */}
      <EquityImpactDemo currentRate={currentRate} newRate={newRate} />

      {/* Hedging Tools Panel */}
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
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
          Hedging Interest Rate Risk
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div
            style={{
              padding: '16px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(16, 185, 129)',
                marginBottom: '8px',
              }}
            >
              Interest Rate Swap
            </div>
            <div
              style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}
            >
              Exchange fixed-rate payments for floating-rate payments. Reduces duration mismatch by
              converting long-term fixed assets to floating.
            </div>
            <div
              style={{
                marginTop: '12px',
                padding: '8px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '6px',
              }}
            >
              <div
                style={{ fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center' }}
              >
                Pay Fixed (Long Assets) {'->'} Receive Floating {'->'} Reduced Duration
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(99, 102, 241)',
                marginBottom: '8px',
              }}
            >
              Duration Matching
            </div>
            <div
              style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}
            >
              Align asset duration with liability duration. When asset duration = liability
              duration, equity is immunized from rate changes.
            </div>
            <div
              style={{
                marginTop: '12px',
                padding: '8px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '6px',
              }}
            >
              <div
                style={{ fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center' }}
              >
                Duration Gap = 0 {'->'} Rate-Neutral Position
              </div>
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
        Adjust the rate sliders to see how different durations respond to interest rate changes
      </p>
    </div>
  );
}
