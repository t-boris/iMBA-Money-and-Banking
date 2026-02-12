'use client';

import { useMemo, useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SecuritizationPipelineProps {
  className?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function SecuritizationPipeline({ className }: SecuritizationPipelineProps) {
  const [poolSize, setPoolSize] = useState(500);
  const [assetYield, setAssetYield] = useState(5.2);
  const [defaultRate, setDefaultRate] = useState(2.0);
  const [recoveryRate, setRecoveryRate] = useState(45);

  const [seniorShare, setSeniorShare] = useState(78);
  const [seniorCoupon, setSeniorCoupon] = useState(4.0);

  const [shortFundingStress, setShortFundingStress] = useState(20);

  const metrics = useMemo(() => {
    const grossCashFlow = poolSize * (assetYield / 100);
    const expectedLosses = poolSize * (defaultRate / 100) * (1 - recoveryRate / 100);
    const netCashFlow = Math.max(0, grossCashFlow - expectedLosses);

    const seniorNotional = poolSize * (seniorShare / 100);
    const equityNotional = Math.max(0, poolSize - seniorNotional);

    const seniorPromised = seniorNotional * (seniorCoupon / 100);
    const seniorPaid = Math.min(seniorPromised, netCashFlow);
    const equityPaid = Math.max(0, netCashFlow - seniorPaid);

    const seniorCoverage = seniorPromised === 0 ? 100 : (seniorPaid / seniorPromised) * 100;

    const fundingCapacity = clamp(100 - shortFundingStress * 0.9, 5, 100);
    const originationCapacity = poolSize * (fundingCapacity / 100);

    return {
      grossCashFlow,
      expectedLosses,
      netCashFlow,
      seniorNotional,
      equityNotional,
      seniorPromised,
      seniorPaid,
      equityPaid,
      seniorCoverage,
      fundingCapacity,
      originationCapacity,
    };
  }, [poolSize, assetYield, defaultRate, recoveryRate, seniorShare, seniorCoupon, shortFundingStress]);

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      <div
        style={{
          borderRadius: '14px',
          border: '1px solid var(--color-surface-2)',
          background:
            'linear-gradient(140deg, color-mix(in srgb, var(--color-amber) 12%, transparent), var(--color-surface-1))',
          padding: '18px',
          marginBottom: '16px',
        }}
      >
        <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Securitization Pipeline Simulator
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
          Explore tranche waterfall payouts and how short-term funding stress disrupts new credit supply.
        </p>
      </div>

      <div
        style={{
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          backgroundColor: 'var(--color-surface-1)',
          padding: '16px',
          marginBottom: '14px',
        }}
      >
        <RangeRow
          label='Loan Pool Size'
          value={poolSize}
          min={100}
          max={1000}
          step={10}
          onChange={setPoolSize}
          format={(value) => `$${value.toFixed(0)}m`}
        />
        <RangeRow
          label='Average Asset Yield'
          value={assetYield}
          min={2}
          max={10}
          step={0.1}
          onChange={setAssetYield}
          format={(value) => `${value.toFixed(1)}%`}
        />
        <RangeRow
          label='Expected Default Rate'
          value={defaultRate}
          min={0}
          max={12}
          step={0.1}
          onChange={setDefaultRate}
          format={(value) => `${value.toFixed(1)}%`}
        />
        <RangeRow
          label='Recovery Rate on Defaults'
          value={recoveryRate}
          min={0}
          max={90}
          step={1}
          onChange={setRecoveryRate}
          format={(value) => `${value.toFixed(0)}%`}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '14px',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            borderRadius: '12px',
            border: '1px solid var(--color-surface-2)',
            backgroundColor: 'var(--color-surface-1)',
            padding: '14px',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            Tranche design
          </p>
          <RangeRow
            label='Senior Tranche Share'
            value={seniorShare}
            min={50}
            max={95}
            step={1}
            onChange={setSeniorShare}
            format={(value) => `${value.toFixed(0)}%`}
          />
          <RangeRow
            label='Senior Coupon Promise'
            value={seniorCoupon}
            min={1}
            max={8}
            step={0.1}
            onChange={setSeniorCoupon}
            format={(value) => `${value.toFixed(1)}%`}
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Senior notional: ${metrics.seniorNotional.toFixed(1)}m | Equity notional: ${metrics.equityNotional.toFixed(1)}m
          </div>
        </div>

        <div
          style={{
            borderRadius: '12px',
            border: '1px solid var(--color-surface-2)',
            backgroundColor: 'var(--color-surface-1)',
            padding: '14px',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            Waterfall payout (per period)
          </p>
          <Bar label='Gross Pool Cash Flow' value={metrics.grossCashFlow} max={60} color='rgb(59, 130, 246)' />
          <Bar label='Expected Credit Losses' value={metrics.expectedLosses} max={60} color='rgb(239, 68, 68)' />
          <Bar label='Net Cash Available' value={metrics.netCashFlow} max={60} color='rgb(16, 185, 129)' />
          <Bar label='Senior Promised' value={metrics.seniorPromised} max={60} color='rgb(99, 102, 241)' />
          <Bar label='Senior Paid' value={metrics.seniorPaid} max={60} color='rgb(14, 165, 233)' />
          <Bar label='Equity Residual' value={metrics.equityPaid} max={60} color='rgb(245, 158, 11)' />
        </div>
      </div>

      <div
        style={{
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          backgroundColor: 'var(--color-surface-1)',
          padding: '16px',
          marginBottom: '14px',
        }}
      >
        <RangeRow
          label='Short-term Funding Stress'
          value={shortFundingStress}
          min={0}
          max={100}
          step={1}
          onChange={setShortFundingStress}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '10px' }}>
          <MetricCard label='Senior Coverage Ratio' value={`${metrics.seniorCoverage.toFixed(1)}%`} tone={metrics.seniorCoverage < 100 ? 'red' : 'green'} />
          <MetricCard label='Funding Capacity' value={`${metrics.fundingCapacity.toFixed(1)}%`} tone={metrics.fundingCapacity < 50 ? 'red' : 'amber'} />
          <MetricCard label='Implied New Loan Origination' value={`$${metrics.originationCapacity.toFixed(1)}m`} tone='blue' />
        </div>

          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
              Pipeline channel: Short-term funding -&gt; loan warehousing -&gt; securitization issuance
            </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <PipelineBox label='Commercial Paper / Repo' value={`${(100 - shortFundingStress).toFixed(0)} / 100`} color='rgb(59, 130, 246)' />
            <PipelineBox label='Warehoused Loans' value={`$${metrics.originationCapacity.toFixed(0)}m`} color='rgb(99, 102, 241)' />
            <PipelineBox label='ABS / MBS Issuance' value={`${(metrics.originationCapacity / poolSize * 100).toFixed(0)}% of baseline`} color='rgb(245, 158, 11)' />
          </div>
        </div>
      </div>
    </div>
  );
}

function RangeRow({
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
  format?: (value: number) => string;
}) {
  return (
    <label style={{ display: 'block', marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{label}</span>
        <span style={{ fontSize: '12px', color: 'var(--color-text-primary)', fontWeight: 600 }}>
          {format ? format(value) : value.toFixed(0)}
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

function Bar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = clamp((value / max) * 100, 0, 100);
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
        <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{value.toFixed(2)}</span>
      </div>
      <div
        style={{
          height: '18px',
          borderRadius: '7px',
          border: '1px solid var(--color-surface-2)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface-0)',
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
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'green' | 'amber' | 'red' | 'blue';
}) {
  const tones = {
    green: 'rgb(16, 185, 129)',
    amber: 'rgb(245, 158, 11)',
    red: 'rgb(239, 68, 68)',
    blue: 'rgb(59, 130, 246)',
  };

  return (
    <div
      style={{
        borderRadius: '10px',
        border: `1px solid color-mix(in srgb, ${tones[tone]} 32%, transparent)`,
        backgroundColor: 'var(--color-surface-1)',
        padding: '10px',
      }}
    >
      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '17px', color: tones[tone], fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function PipelineBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        borderRadius: '10px',
        border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
        backgroundColor: 'var(--color-surface-1)',
        padding: '10px',
      }}
    >
      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '15px', color, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
