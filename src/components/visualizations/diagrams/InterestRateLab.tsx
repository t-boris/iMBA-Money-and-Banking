'use client';

import { useMemo, useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface InterestRateLabProps {
  className?: string;
  initialView?: 'fisher' | 'treasury' | 'yield-curve';
  singleView?: boolean;
}

const tabs: Array<{ id: 'fisher' | 'treasury' | 'yield-curve'; label: string }> = [
  { id: 'fisher', label: 'Fisher & TIPS' },
  { id: 'treasury', label: 'Treasury Decomposition' },
  { id: 'yield-curve', label: 'Yield Curve Lab' },
];

const maturities = [0.25, 1, 2, 5, 10, 30];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function describeCurve(slope: number) {
  if (slope > 0.45) return 'Upward Sloping';
  if (slope < -0.15) return 'Inverted';
  return 'Flat / Transition';
}

function tabColor(shape: string) {
  if (shape === 'Inverted') return 'rgb(239, 68, 68)';
  if (shape === 'Upward Sloping') return 'rgb(16, 185, 129)';
  return 'rgb(245, 158, 11)';
}

export function InterestRateLab({ className, initialView = 'fisher', singleView = false }: InterestRateLabProps) {
  const [activeTab, setActiveTab] = useState<'fisher' | 'treasury' | 'yield-curve'>(initialView);

  const [realRate, setRealRate] = useState(1.6);
  const [expectedInflation, setExpectedInflation] = useState(2.3);

  const [termPremium, setTermPremium] = useState(0.9);

  const [shortRate, setShortRate] = useState(4.2);
  const [futurePolicyPath, setFuturePolicyPath] = useState(-1.1);
  const [curvePremiumSlope, setCurvePremiumSlope] = useState(0.45);

  const nominalApprox = realRate + expectedInflation;
  const nominalExact = (1 + realRate / 100) * (1 + expectedInflation / 100) - 1;
  const breakevenInflation = nominalApprox - realRate;

  const longTermYield = realRate + expectedInflation + termPremium;

  const curvePoints = useMemo(() => {
    return maturities.map((maturity) => {
      const expectationComponent = futurePolicyPath * (1 - Math.exp(-maturity / 5));
      const premiumComponent = curvePremiumSlope * Math.log1p(maturity) * 0.45;
      const yieldValue = shortRate + expectationComponent + premiumComponent;
      return {
        maturity,
        yield: clamp(yieldValue, -1, 12),
      };
    });
  }, [shortRate, futurePolicyPath, curvePremiumSlope]);

  const twoYear = curvePoints.find((point) => point.maturity === 2)?.yield ?? 0;
  const tenYear = curvePoints.find((point) => point.maturity === 10)?.yield ?? 0;
  const slope10y2y = tenYear - twoYear;
  const curveShape = describeCurve(slope10y2y);

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      {!singleView && (
        <div
          style={{
            borderRadius: '14px',
            border: '1px solid var(--color-surface-2)',
            padding: '18px',
            background:
              'linear-gradient(145deg, color-mix(in srgb, var(--color-emerald) 10%, transparent), var(--color-surface-1))',
            marginBottom: '16px',
          }}
        >
          <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Interest Rate Lab
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
            Interactively connect nominal vs real rates, Treasury decomposition, and yield-curve shape.
          </p>
        </div>
      )}

      {!singleView && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                borderRadius: '999px',
                border:
                  activeTab === tab.id
                    ? '1px solid color-mix(in srgb, var(--color-primary) 60%, transparent)'
                    : '1px solid var(--color-surface-2)',
                padding: '8px 14px',
                cursor: 'pointer',
                background:
                  activeTab === tab.id
                    ? 'color-mix(in srgb, var(--color-primary) 14%, transparent)'
                    : 'var(--color-surface-1)',
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'fisher' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Panel>
            <RangeInput
              label='Real Rate (r)'
              value={realRate}
              min={-1}
              max={6}
              step={0.1}
              onChange={setRealRate}
              format={(v) => `${v.toFixed(1)}%`}
            />
            <RangeInput
              label='Expected Inflation (pi)'
              value={expectedInflation}
              min={-1}
              max={8}
              step={0.1}
              onChange={setExpectedInflation}
              format={(v) => `${v.toFixed(1)}%`}
            />
          </Panel>

          <div
            style={{
              marginTop: '12px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}
          >
            <Metric title='Nominal (Approx)' value={`${nominalApprox.toFixed(2)}%`} tone='blue' />
            <Metric title='Nominal (Exact)' value={`${(nominalExact * 100).toFixed(2)}%`} tone='green' />
            <Metric title='Breakeven Inflation' value={`${breakevenInflation.toFixed(2)}%`} tone='amber' />
          </div>

          <div
            style={{
              marginTop: '14px',
              borderRadius: '12px',
              border: '1px solid var(--color-surface-2)',
              backgroundColor: 'var(--color-surface-1)',
              padding: '14px',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Real Rate</span>
              <StackBar value={realRate} max={12} color='rgb(16, 185, 129)' />
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Expected Inflation</span>
              <StackBar value={expectedInflation} max={12} color='rgb(245, 158, 11)' />
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Nominal (Approx)</span>
              <StackBar value={nominalApprox} max={12} color='rgb(59, 130, 246)' />
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'treasury' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Panel>
            <RangeInput
              label='Real Rate Component'
              value={realRate}
              min={-1}
              max={6}
              step={0.1}
              onChange={setRealRate}
              format={(v) => `${v.toFixed(1)}%`}
            />
            <RangeInput
              label='Expected Inflation Component'
              value={expectedInflation}
              min={-1}
              max={8}
              step={0.1}
              onChange={setExpectedInflation}
              format={(v) => `${v.toFixed(1)}%`}
            />
            <RangeInput
              label='Term Premium Component'
              value={termPremium}
              min={-1}
              max={4}
              step={0.05}
              onChange={setTermPremium}
              format={(v) => `${v.toFixed(2)}%`}
            />
          </Panel>

          <div
            style={{
              marginTop: '14px',
              borderRadius: '12px',
              border: '1px solid var(--color-surface-2)',
              backgroundColor: 'var(--color-surface-1)',
              padding: '16px',
            }}
          >
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
              Long-term nominal yield decomposition: real rate + expected inflation + term premium.
            </p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch', height: '36px' }}>
              <Segment value={realRate} total={longTermYield} color='rgb(16, 185, 129)' label='Real' />
              <Segment
                value={expectedInflation}
                total={longTermYield}
                color='rgb(245, 158, 11)'
                label='Inflation'
              />
              <Segment value={termPremium} total={longTermYield} color='rgb(99, 102, 241)' label='Term Premium' />
            </div>
            <div style={{ marginTop: '10px' }}>
              <Metric title='Implied Long-Term Nominal Yield' value={`${longTermYield.toFixed(2)}%`} tone='blue' compact />
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'yield-curve' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Panel>
            <RangeInput
              label='Current Short Rate (near policy rate)'
              value={shortRate}
              min={0}
              max={8}
              step={0.1}
              onChange={setShortRate}
              format={(v) => `${v.toFixed(1)}%`}
            />
            <RangeInput
              label='Expected Future Policy Path'
              value={futurePolicyPath}
              min={-4}
              max={4}
              step={0.1}
              onChange={setFuturePolicyPath}
              format={(v) => `${v >= 0 ? '+' : ''}${v.toFixed(1)} pts`}
            />
            <RangeInput
              label='Term Premium Slope Factor'
              value={curvePremiumSlope}
              min={-0.2}
              max={1.2}
              step={0.05}
              onChange={setCurvePremiumSlope}
              format={(v) => `${v.toFixed(2)}`}
            />
          </Panel>

          <div
            style={{
              marginTop: '14px',
              borderRadius: '12px',
              border: '1px solid var(--color-surface-2)',
              backgroundColor: 'var(--color-surface-1)',
              padding: '16px',
            }}
          >
            <svg viewBox='0 0 680 260' style={{ width: '100%', height: '220px' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((tick) => {
                const y = 220 - (tick / 8) * 175;
                return (
                  <g key={`y-${tick}`}>
                    <line x1='56' y1={y} x2='640' y2={y} stroke='var(--color-surface-2)' />
                    <text x='22' y={y + 4} fontSize='11' fill='var(--color-text-muted)'>
                      {tick}%
                    </text>
                  </g>
                );
              })}

              <line x1='56' y1='220' x2='640' y2='220' stroke='var(--color-text-muted)' />
              <line x1='56' y1='40' x2='56' y2='220' stroke='var(--color-text-muted)' />

              <polyline
                fill='none'
                stroke={tabColor(curveShape)}
                strokeWidth='3'
                points={curvePoints
                  .map((point, index) => {
                    const x = 56 + (index / (curvePoints.length - 1)) * 584;
                    const y = 220 - (point.yield / 8) * 175;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />

              {curvePoints.map((point, index) => {
                const x = 56 + (index / (curvePoints.length - 1)) * 584;
                const y = 220 - (point.yield / 8) * 175;
                return (
                  <g key={`point-${point.maturity}`}>
                    <circle cx={x} cy={y} r='4' fill={tabColor(curveShape)} />
                    <text x={x - 12} y='238' fontSize='10' fill='var(--color-text-muted)'>
                      {point.maturity < 1 ? '3M' : `${point.maturity}Y`}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div
              style={{
                marginTop: '10px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '10px',
              }}
            >
              <Metric title='Curve Shape' value={curveShape} tone='blue' compact />
              <Metric title='10Y - 2Y Spread' value={`${slope10y2y.toFixed(2)}%`} tone='amber' compact />
              <Metric
                title='Signal'
                value={slope10y2y < 0 ? 'Recession Risk Elevated' : 'Expansion / Neutral'}
                tone={slope10y2y < 0 ? 'red' : 'green'}
                compact
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-surface-2)',
        backgroundColor: 'var(--color-surface-1)',
        padding: '16px',
      }}
    >
      {children}
    </div>
  );
}

function RangeInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
}) {
  return (
    <label style={{ display: 'block', marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{label}</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {format(value)}
        </span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ width: '100%' }}
      />
    </label>
  );
}

function Metric({
  title,
  value,
  tone,
  compact = false,
}: {
  title: string;
  value: string;
  tone: 'blue' | 'green' | 'amber' | 'red';
  compact?: boolean;
}) {
  const colors = {
    blue: 'rgb(59, 130, 246)',
    green: 'rgb(16, 185, 129)',
    amber: 'rgb(245, 158, 11)',
    red: 'rgb(239, 68, 68)',
  };

  return (
    <div
      style={{
        borderRadius: '10px',
        border: `1px solid color-mix(in srgb, ${colors[tone]} 30%, transparent)`,
        padding: compact ? '10px' : '12px',
        backgroundColor: 'var(--color-surface-1)',
      }}
    >
      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: compact ? '15px' : '20px', fontWeight: 700, color: colors[tone] }}>{value}</div>
    </div>
  );
}

function Segment({
  value,
  total,
  color,
  label,
}: {
  value: number;
  total: number;
  color: string;
  label: string;
}) {
  const pct = total === 0 ? 0 : Math.max(3, (Math.max(0, value) / Math.max(0.01, total)) * 100);
  return (
    <div
      style={{
        width: `${pct}%`,
        borderRadius: '8px',
        background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 65%, white))`,
        minWidth: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '11px',
        fontWeight: 700,
      }}
    >
      {label}
    </div>
  );
}

function StackBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = clamp((Math.max(0, value) / Math.max(0.01, max)) * 100, 0, 100);
  return (
    <div
      style={{
        height: '24px',
        borderRadius: '8px',
        border: '1px solid var(--color-surface-2)',
        backgroundColor: 'var(--color-surface-0)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.3 }}
        style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, white))`,
        }}
      />
    </div>
  );
}
