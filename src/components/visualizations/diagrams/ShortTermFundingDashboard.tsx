'use client';

import { useMemo, useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ShortTermFundingDashboardProps {
  className?: string;
  initialView?: 'federal-funds' | 'repo' | 'reference-rates';
}

const views: Array<{
  id: 'federal-funds' | 'repo' | 'reference-rates';
  label: string;
}> = [
  { id: 'federal-funds', label: 'Federal Funds' },
  { id: 'repo', label: 'Repo & Haircuts' },
  { id: 'reference-rates', label: 'LIBOR vs SOFR' },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function linePath(points: Array<{ x: number; y: number }>) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(' ');
}

export function ShortTermFundingDashboard({
  className,
  initialView = 'federal-funds',
}: ShortTermFundingDashboardProps) {
  const [activeView, setActiveView] = useState<'federal-funds' | 'repo' | 'reference-rates'>(
    initialView,
  );

  const [reserveSupply, setReserveSupply] = useState(70);
  const [reserveDemand, setReserveDemand] = useState(56);
  const [ior, setIor] = useState(4.35);

  const [collateralValue, setCollateralValue] = useState(200);
  const [haircut, setHaircut] = useState(2);
  const [priceShock, setPriceShock] = useState(1.4);

  const [stress, setStress] = useState(22);

  const fedFundsRate = useMemo(() => {
    const raw = 6.8 - reserveSupply * 0.04 + reserveDemand * 0.03 + (ior - 4) * 0.6;
    return clamp(raw, 0.5, 8.5);
  }, [reserveSupply, reserveDemand, ior]);

  const supplyCurve = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => {
      const x = 30 + i * 7;
      const rate = clamp(7.2 - x * 0.045 + reserveDemand * 0.03 + (ior - 4) * 0.6, 0.5, 8.5);
      return {
        reserves: x,
        rate,
      };
    });
  }, [reserveDemand, ior]);

  const repoLoan = collateralValue * (1 - haircut / 100);
  const collateralAfterShock = collateralValue * (1 - priceShock / 100);
  const lenderLoss = Math.max(0, repoLoan - collateralAfterShock);

  const referenceRates = useMemo(() => {
    const fed = 3.1 + stress * 0.032;
    const sofr = fed - 0.08 + stress * 0.0018;
    const libor = fed + 0.16 + stress * 0.011;

    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const fedSeries = months.map((m) => ({
      x: m,
      y: fed + Math.sin((m / 12) * Math.PI * 1.2) * 0.08,
    }));
    const sofrSeries = months.map((m) => ({
      x: m,
      y: sofr + Math.cos((m / 12) * Math.PI * 1.4) * 0.06,
    }));
    const liborSeries = months.map((m) => ({
      x: m,
      y: libor + Math.sin((m / 12) * Math.PI * 1.6) * 0.1,
    }));

    return { fed, sofr, libor, fedSeries, sofrSeries, liborSeries };
  }, [stress]);

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      <div
        style={{
          padding: '18px',
          borderRadius: '14px',
          border: '1px solid var(--color-surface-2)',
          background:
            'linear-gradient(140deg, color-mix(in srgb, var(--color-primary) 10%, transparent), var(--color-surface-1))',
          marginBottom: '18px',
        }}
      >
        <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Short-Term Funding Dashboard
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '6px' }}>
          Track how reserve liquidity, collateral quality, and stress shift policy-sensitive rates.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            style={{
              borderRadius: '999px',
              padding: '8px 14px',
              border:
                activeView === view.id
                  ? '1px solid color-mix(in srgb, var(--color-primary) 60%, transparent)'
                  : '1px solid var(--color-surface-2)',
              color: activeView === view.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              background:
                activeView === view.id
                  ? 'color-mix(in srgb, var(--color-primary) 14%, transparent)'
                  : 'var(--color-surface-1)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {view.label}
          </button>
        ))}
      </div>

      {activeView === 'federal-funds' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <ExplainerBlock
            items={[
              {
                term: 'Bank reserves',
                text: 'Deposits that commercial banks hold at the Federal Reserve. Banks need them to settle payments and meet regulatory requirements.',
              },
              {
                term: 'Federal funds market',
                text: 'An overnight market where banks with excess reserves lend to banks that need more. The interest rate on these loans is the federal funds rate \u2014 the Fed\u2019s main policy target.',
              },
              {
                term: 'Interest on Reserves (IOR)',
                text: 'The rate the Fed pays banks on their reserve balances. It acts as a floor: no rational bank would lend reserves to another bank at a rate lower than what the Fed already pays them.',
              },
              {
                term: 'How the sliders work',
                text: 'Raising reserve supply pushes the fed funds rate down (more cash chasing borrowers). Raising demand pressure pushes it up (more borrowers competing for scarce reserves). The IOR slider shifts the floor.',
              },
            ]}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
              marginBottom: '16px',
            }}
          >
            <MetricCard label='Implied Fed Funds Rate' value={`${fedFundsRate.toFixed(2)}%`} tone='blue' />
            <MetricCard label='IOR (floor reference)' value={`${ior.toFixed(2)}%`} tone='green' />
            <MetricCard
              label='Liquidity Gap'
              value={`${(reserveDemand - reserveSupply).toFixed(0)} pts`}
              tone={reserveDemand > reserveSupply ? 'amber' : 'green'}
            />
          </div>

          <div
            style={{
              borderRadius: '12px',
              border: '1px solid var(--color-surface-2)',
              backgroundColor: 'var(--color-surface-1)',
              padding: '16px',
            }}
          >
            <RangeRow
              label='Reserve Supply Index'
              value={reserveSupply}
              min={30}
              max={100}
              step={1}
              onChange={setReserveSupply}
            />
            <RangeRow
              label='Reserve Demand Pressure'
              value={reserveDemand}
              min={35}
              max={90}
              step={1}
              onChange={setReserveDemand}
            />
            <RangeRow
              label='Interest on Reserves (IOR)'
              value={ior}
              min={0}
              max={8}
              step={0.05}
              onChange={setIor}
              formatter={(value) => `${value.toFixed(2)}%`}
            />

            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                Stylized reserve-supply curve: higher reserves generally push fed funds lower.
              </p>
              <svg viewBox='0 0 680 260' style={{ width: '100%', height: '220px' }}>
                <rect x='0' y='0' width='680' height='260' fill='transparent' />

                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((tick) => {
                  const y = 220 - (tick / 8) * 180;
                  return (
                    <g key={`y-${tick}`}>
                      <line x1='56' y1={y} x2='640' y2={y} stroke='var(--color-surface-2)' strokeWidth='1' />
                      <text x='20' y={y + 4} fontSize='11' fill='var(--color-text-muted)'>
                        {tick}%
                      </text>
                    </g>
                  );
                })}

                <line x1='56' y1='220' x2='640' y2='220' stroke='var(--color-text-muted)' strokeWidth='1.2' />
                <line x1='56' y1='40' x2='56' y2='220' stroke='var(--color-text-muted)' strokeWidth='1.2' />

                <path
                  d={linePath(
                    supplyCurve.map((point, index) => ({
                      x: 56 + (index / (supplyCurve.length - 1)) * 584,
                      y: 220 - (point.rate / 8.5) * 180,
                    })),
                  )}
                  fill='none'
                  stroke='rgb(59, 130, 246)'
                  strokeWidth='3'
                />

                <line
                  x1='56'
                  y1={220 - (ior / 8.5) * 180}
                  x2='640'
                  y2={220 - (ior / 8.5) * 180}
                  stroke='rgb(16, 185, 129)'
                  strokeDasharray='6 6'
                />

                <circle
                  cx={56 + ((reserveSupply - 30) / 70) * 584}
                  cy={220 - (fedFundsRate / 8.5) * 180}
                  r='6'
                  fill='rgb(99, 102, 241)'
                />
                <text
                  x={56 + ((reserveSupply - 30) / 70) * 584 + 10}
                  y={220 - (fedFundsRate / 8.5) * 180 - 8}
                  fontSize='11'
                  fill='var(--color-text-primary)'
                >
                  Current: {fedFundsRate.toFixed(2)}%
                </text>
              </svg>
            </div>
          </div>
        </motion.div>
      )}

      {activeView === 'repo' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <ExplainerBlock
            items={[
              {
                term: 'Repo (repurchase agreement)',
                text: 'A short-term secured loan. The borrower sells a security (e.g. a Treasury bond) to the lender today and agrees to buy it back tomorrow at a slightly higher price. The price difference is the interest.',
              },
              {
                term: 'Haircut',
                text: 'The percentage discount applied to the collateral\u2019s market value when calculating the loan amount. If collateral is worth $100 and the haircut is 2%, the borrower receives only $98. This buffer protects the lender if the collateral loses value before the repo matures.',
              },
              {
                term: 'Collateral price shock',
                text: 'Simulates a sudden drop in the market price of the pledged securities. If the post-shock collateral value falls below the loan amount, the lender suffers a residual loss \u2014 the haircut was not large enough.',
              },
              {
                term: 'How the sliders work',
                text: 'Set the collateral value, choose a haircut size, then apply a price shock to see whether the haircut provides enough protection. Watch the bar chart and "Lender Residual Loss" card turn red when the buffer is breached.',
              },
            ]}
          />
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
              label='Collateral Value'
              value={collateralValue}
              min={50}
              max={500}
              step={5}
              onChange={setCollateralValue}
              formatter={(value) => `$${value.toFixed(0)}m`}
            />
            <RangeRow
              label='Haircut'
              value={haircut}
              min={0}
              max={10}
              step={0.25}
              onChange={setHaircut}
              formatter={(value) => `${value.toFixed(2)}%`}
            />
            <RangeRow
              label='Collateral Price Shock'
              value={priceShock}
              min={0}
              max={8}
              step={0.2}
              onChange={setPriceShock}
              formatter={(value) => `-${value.toFixed(1)}%`}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <MetricCard label='Repo Loan Amount' value={`$${repoLoan.toFixed(1)}m`} tone='blue' />
            <MetricCard
              label='Post-Shock Collateral'
              value={`$${collateralAfterShock.toFixed(1)}m`}
              tone='amber'
            />
            <MetricCard
              label='Lender Residual Loss'
              value={`$${lenderLoss.toFixed(1)}m`}
              tone={lenderLoss > 0 ? 'red' : 'green'}
            />
          </div>

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
              Haircuts protect the cash lender by forcing collateral value to exceed the loan amount.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Collateral</span>
              <Bar value={collateralValue} max={500} color='rgb(59, 130, 246)' />
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Loan</span>
              <Bar value={repoLoan} max={500} color='rgb(16, 185, 129)' />
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Post-Shock Value</span>
              <Bar value={collateralAfterShock} max={500} color='rgb(245, 158, 11)' />
            </div>
          </div>
        </motion.div>
      )}

      {activeView === 'reference-rates' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <ExplainerBlock
            items={[
              {
                term: 'EFFR (Effective Federal Funds Rate)',
                text: 'The volume-weighted average rate on actual overnight unsecured reserve loans between banks. This is the Fed\u2019s primary policy rate.',
              },
              {
                term: 'LIBOR (London Interbank Offered Rate)',
                text: 'A now-retired benchmark based on surveys: large banks submitted estimates of what they would charge each other for unsecured loans. Because it relied on self-reported quotes rather than real transactions, banks were able to manipulate it. LIBOR was phased out after 2023.',
              },
              {
                term: 'SOFR (Secured Overnight Financing Rate)',
                text: 'The replacement for LIBOR. It is calculated from actual overnight repo transactions backed by Treasury securities \u2014 roughly $1 trillion per day. Because it is secured (collateral-backed) and transaction-based, it is harder to manipulate and carries less credit risk.',
              },
              {
                term: 'Why LIBOR spikes more under stress',
                text: 'LIBOR reflects unsecured lending between banks, so it includes bank credit risk. When markets are stressed, banks distrust each other, and the unsecured rate jumps. SOFR stays closer to EFFR because Treasury collateral keeps it insulated from counterparty fears.',
              },
              {
                term: 'Funding Stress Index',
                text: 'The slider simulates rising market stress (0 = calm, 100 = crisis). Drag it right to see how the three rates diverge \u2014 especially the widening gap between LIBOR and SOFR.',
              },
            ]}
          />
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
              label='Funding Stress Index'
              value={stress}
              min={0}
              max={100}
              step={1}
              onChange={setStress}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '10px',
                marginTop: '10px',
              }}
            >
              <MetricCard label='Fed Funds (EFFR)' value={`${referenceRates.fed.toFixed(2)}%`} tone='blue' />
              <MetricCard label='SOFR (secured)' value={`${referenceRates.sofr.toFixed(2)}%`} tone='green' />
              <MetricCard label='LIBOR-like (unsecured)' value={`${referenceRates.libor.toFixed(2)}%`} tone='amber' />
            </div>
          </div>

          <div
            style={{
              borderRadius: '12px',
              border: '1px solid var(--color-surface-2)',
              backgroundColor: 'var(--color-surface-1)',
              padding: '16px',
            }}
          >
            <svg viewBox='0 0 680 260' style={{ width: '100%', height: '220px' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((tick) => {
                const y = 220 - (tick / 7) * 175;
                return (
                  <line
                    key={`grid-${tick}`}
                    x1='56'
                    y1={y}
                    x2='640'
                    y2={y}
                    stroke='var(--color-surface-2)'
                    strokeWidth='1'
                  />
                );
              })}

              <line x1='56' y1='220' x2='640' y2='220' stroke='var(--color-text-muted)' />
              <line x1='56' y1='40' x2='56' y2='220' stroke='var(--color-text-muted)' />

              <polyline
                fill='none'
                stroke='rgb(59, 130, 246)'
                strokeWidth='2.5'
                points={referenceRates.fedSeries
                  .map((p, idx) => {
                    const x = 56 + (idx / (referenceRates.fedSeries.length - 1)) * 584;
                    const y = 220 - ((p.y - 2) / 6) * 175;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
              <polyline
                fill='none'
                stroke='rgb(16, 185, 129)'
                strokeWidth='2.5'
                points={referenceRates.sofrSeries
                  .map((p, idx) => {
                    const x = 56 + (idx / (referenceRates.sofrSeries.length - 1)) * 584;
                    const y = 220 - ((p.y - 2) / 6) * 175;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
              <polyline
                fill='none'
                stroke='rgb(245, 158, 11)'
                strokeWidth='2.5'
                points={referenceRates.liborSeries
                  .map((p, idx) => {
                    const x = 56 + (idx / (referenceRates.liborSeries.length - 1)) * 584;
                    const y = 220 - ((p.y - 2) / 6) * 175;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />

              <text x='78' y='56' fill='rgb(59, 130, 246)' fontSize='12'>
                EFFR
              </text>
              <text x='78' y='74' fill='rgb(16, 185, 129)' fontSize='12'>
                SOFR
              </text>
              <text x='78' y='92' fill='rgb(245, 158, 11)' fontSize='12'>
                LIBOR-style unsecured rate
              </text>
            </svg>
          </div>
        </motion.div>
      )}
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
  formatter,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatter?: (value: number) => string;
}) {
  return (
    <label style={{ display: 'block', marginBottom: '10px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
        }}
      >
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{label}</span>
        <span style={{ fontSize: '12px', color: 'var(--color-text-primary)', fontWeight: 600 }}>
          {formatter ? formatter(value) : value.toFixed(0)}
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

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'blue' | 'green' | 'amber' | 'red';
}) {
  const colorByTone = {
    blue: 'rgb(59, 130, 246)',
    green: 'rgb(16, 185, 129)',
    amber: 'rgb(245, 158, 11)',
    red: 'rgb(239, 68, 68)',
  };

  return (
    <div
      style={{
        borderRadius: '12px',
        border: `1px solid color-mix(in srgb, ${colorByTone[tone]} 28%, transparent)`,
        backgroundColor: 'var(--color-surface-1)',
        padding: '12px',
      }}
    >
      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '21px', fontWeight: 700, color: colorByTone[tone] }}>{value}</div>
    </div>
  );
}

function ExplainerBlock({ items }: { items: Array<{ term: string; text: string }> }) {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid color-mix(in srgb, var(--color-primary) 18%, transparent)',
        backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, var(--color-surface-1))',
        padding: '14px 16px',
        marginBottom: '14px',
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Key concepts
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((item) => (
          <li key={item.term} style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.55' }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>{item.term}</strong>
            {' \u2014 '}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = clamp((value / max) * 100, 0, 100);
  return (
    <div
      style={{
        height: '26px',
        borderRadius: '8px',
        border: '1px solid var(--color-surface-2)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface-0)',
      }}
    >
      <motion.div
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.35 }}
        style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, white))`,
        }}
      />
    </div>
  );
}
