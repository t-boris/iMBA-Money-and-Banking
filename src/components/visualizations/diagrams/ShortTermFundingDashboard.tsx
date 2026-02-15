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
                term: 'What is this dashboard?',
                text: 'It simulates the market where the Federal Reserve\u2019s key interest rate \u2014 the federal funds rate \u2014 is determined. In real life this rate emerges from overnight lending of reserves between banks. Here you control the three forces that drive it.',
              },
              {
                term: 'Bank reserves',
                text: 'Every commercial bank holds an account at the Federal Reserve. The balance in that account is the bank\u2019s reserves. Banks use reserves to settle payments between each other (e.g. when your bank transfers money to someone else\u2019s bank) and to satisfy regulatory requirements. Reserves are the most fundamental form of "bank money."',
              },
              {
                term: 'Federal funds market',
                text: 'At the end of each business day, some banks have more reserves than they need, while others are short. They lend/borrow reserves overnight in the federal funds market. The interest rate on these loans is the federal funds rate \u2014 the single most important rate in the economy, because almost every other rate (mortgages, corporate bonds, savings accounts) is priced relative to it.',
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
            <SliderHint
              text='How many reserves are available in the banking system overall. The Fed controls this through open market operations: when the Fed buys bonds from banks, it credits their reserve accounts (supply goes up); when it sells bonds, reserves drain out (supply goes down). More supply means banks compete to lend out their excess cash, pushing rates down.'
            />
            <RangeRow
              label='Reserve Supply Index'
              value={reserveSupply}
              min={30}
              max={100}
              step={1}
              onChange={setReserveSupply}
            />
            <SliderHint
              text='How urgently banks need to borrow reserves. Demand rises when banks face large payment outflows, when regulatory requirements increase, or during quarter-end reporting dates when banks want to look well-capitalized. Higher demand means more banks are competing for the same pool of reserves, pushing rates up.'
            />
            <RangeRow
              label='Reserve Demand Pressure'
              value={reserveDemand}
              min={35}
              max={90}
              step={1}
              onChange={setReserveDemand}
            />
            <SliderHint
              text='Since 2008 the Fed pays banks interest on the reserves they hold. This creates a floor for the fed funds rate: why would Bank A lend to Bank B at 4% if the Fed is already paying 4.35% risk-free? In practice the floor is not perfectly tight (some lenders like government-sponsored enterprises cannot earn IOR), but it anchors the lower bound. The dashed green line on the chart shows this floor.'
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
              <ExplainerBlock
                items={[
                  {
                    term: 'Reading the chart',
                    text: 'The blue curve shows how the fed funds rate changes as reserve supply increases (left to right). The purple dot is the current equilibrium implied by your slider positions. The dashed green line is the IOR floor. Try dragging Reserve Supply to the right \u2014 the dot slides down the curve (cheaper to borrow). Try raising IOR \u2014 the entire floor shifts up.',
                  },
                  {
                    term: 'Liquidity Gap card',
                    text: 'Shows demand minus supply. When positive (amber), banks are scrambling for reserves and rates are under upward pressure. When negative (green), the system has ample liquidity.',
                  },
                ]}
              />
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
                term: 'What is this dashboard?',
                text: 'It simulates a single repo transaction so you can see how haircuts protect (or fail to protect) the lender when collateral prices drop. In real markets, trillions of dollars flow through repo every day \u2014 it is the largest source of overnight secured funding.',
              },
              {
                term: 'Repo (repurchase agreement)',
                text: 'A short-term secured loan disguised as two trades. Step 1: the borrower sells a security (typically a Treasury bond) to the lender and receives cash. Step 2: the next day, the borrower buys the security back at a slightly higher price. The price difference is the interest. The lender holds the security overnight as collateral \u2014 if the borrower defaults, the lender keeps it.',
              },
              {
                term: 'Why repo exists',
                text: 'Banks, hedge funds, and dealers constantly need short-term cash to finance their bond portfolios. Meanwhile, money market funds and corporations have idle cash they want to park safely overnight. Repo connects the two: the cash provider gets collateral protection, and the borrower gets cheap funding because the loan is secured.',
              },
              {
                term: 'Haircut',
                text: 'The percentage discount applied to the collateral\u2019s market value when calculating how much cash the borrower can receive. If collateral is worth $100 and the haircut is 2%, the borrower receives only $98. The remaining $2 is a safety buffer: even if the collateral drops in price by up to 2% overnight, the lender can sell it and still recover the full $98 loan.',
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
            <SliderHint
              text='The market value of securities the borrower pledges as collateral. In practice this is often US Treasuries (lowest haircuts, ~2%), agency MBS (~3\u20135%), or corporate bonds (~5\u201310%). Higher-quality collateral means smaller haircuts.'
            />
            <RangeRow
              label='Collateral Value'
              value={collateralValue}
              min={50}
              max={500}
              step={5}
              onChange={setCollateralValue}
              formatter={(value) => `$${value.toFixed(0)}m`}
            />
            <SliderHint
              text='The safety buffer. A 2% haircut on $200m collateral means the loan is only $196m \u2014 the lender is protected against a price drop of up to 2%. In calm markets, Treasury haircuts are tiny (~2%). In a crisis, haircuts on riskier collateral can spike to 20\u201350%, choking off funding for firms that depend on repo.'
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
            <SliderHint
              text='Simulates a sudden drop in the market price of the pledged security (e.g. a bond sell-off or credit downgrade). If the post-shock collateral value falls below the loan amount, the haircut was not large enough and the lender takes a residual loss. This is exactly what happened to repo lenders holding mortgage-backed securities in 2007\u20132008.'
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

          <ExplainerBlock
            items={[
              {
                term: 'Repo Loan Amount (blue card)',
                text: 'Collateral Value \u00d7 (1 \u2212 Haircut%). This is how much cash the borrower actually receives. The rest is the lender\u2019s safety margin.',
              },
              {
                term: 'Post-Shock Collateral (amber card)',
                text: 'Collateral Value \u00d7 (1 \u2212 Price Shock%). What the collateral would be worth if the market moved against the borrower overnight.',
              },
              {
                term: 'Lender Residual Loss (red/green card)',
                text: 'If Post-Shock Collateral < Repo Loan, the lender cannot recover the full loan by selling the collateral \u2014 the card turns red. If the haircut was large enough, the loss is zero and the card stays green. Try setting the price shock above the haircut to see the loss appear.',
              },
            ]}
          />

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
            <ExplainerBlock
              items={[
                {
                  term: 'Reading the bar chart',
                  text: 'Blue bar = full collateral value. Green bar = the actual loan (always shorter than blue because of the haircut). Amber bar = collateral value after the price shock. When the amber bar is shorter than the green bar, the lender is underwater \u2014 that gap is the residual loss.',
                },
              ]}
            />
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
                term: 'What is this dashboard?',
                text: 'It compares three key overnight interest rates and shows how they behave differently under market stress. These rates are the benchmarks that price trillions of dollars of loans, derivatives, and bonds worldwide.',
              },
              {
                term: 'Why reference rates matter',
                text: 'When a bank offers you a floating-rate mortgage or a corporation issues a floating-rate bond, the contract says "pay reference rate + X%." The choice of which reference rate is used determines how the borrower\u2019s cost behaves. A rate that spikes during crises (LIBOR) transmits stress directly to borrowers; a rate that stays stable (SOFR) does not.',
              },
              {
                term: 'EFFR (Effective Federal Funds Rate)',
                text: 'The volume-weighted average rate on actual overnight unsecured reserve loans between banks. This is the Fed\u2019s primary policy rate \u2014 the one the FOMC announces after each meeting. It anchors the entire short-term rate complex.',
              },
              {
                term: 'LIBOR (London Interbank Offered Rate)',
                text: 'For decades the world\u2019s dominant benchmark. Every day, a panel of large banks in London submitted estimates of what they would charge each other for unsecured loans at various maturities (overnight, 1 month, 3 months, etc.). The problem: submissions were self-reported, not based on actual transactions. During 2008 and again in 2012, banks were caught manipulating their quotes \u2014 understating rates to look healthier or to profit on derivatives tied to LIBOR. After a global scandal, regulators mandated a transition to transaction-based rates. LIBOR was officially phased out after June 2023.',
              },
              {
                term: 'SOFR (Secured Overnight Financing Rate)',
                text: 'The replacement for USD LIBOR, published daily by the New York Fed since 2018. It is calculated from real overnight repo transactions backed by US Treasury securities \u2014 roughly $1 trillion in daily volume. Because it is secured (the loan has Treasury collateral) and transaction-based (no self-reporting), SOFR is essentially manipulation-proof and carries almost no credit risk. The trade-off: SOFR is overnight only, so building a term structure (30-day, 90-day SOFR) requires additional market infrastructure.',
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
            <SliderHint
              text='Simulates rising financial stress from 0 (calm markets, low counterparty fear) to 100 (full-blown crisis like 2008). As stress rises, banks become reluctant to lend to each other without collateral. This pushes the unsecured rate (LIBOR) sharply higher, while the secured rate (SOFR) rises only modestly because Treasury collateral keeps it insulated. Drag the slider right and watch the gap between the amber and green lines widen \u2014 that spread is the market\u2019s price of bank credit risk.'
            />
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

          <ExplainerBlock
            items={[
              {
                term: 'Reading the cards',
                text: 'Blue = EFFR (the Fed\u2019s policy rate). Green = SOFR (secured, collateral-backed). Amber = LIBOR-style unsecured rate. At low stress all three are close together. As stress rises, the amber card pulls away \u2014 that gap is the credit-risk premium banks charge each other for unsecured lending.',
              },
              {
                term: 'Reading the chart',
                text: 'The three colored lines show the same rates over a 12-month horizon. Blue (EFFR) and green (SOFR) stay close together because both are anchored to Fed policy and/or secured transactions. The amber line (LIBOR) sits above and diverges further under stress. The vertical distance between amber and green is the secured\u2013unsecured spread \u2014 a real-time measure of how much banks distrust each other.',
              },
              {
                term: 'Try this experiment',
                text: 'Set stress to 0 and note how tightly the three lines cluster. Then slowly drag to 100. The amber line rises steeply while blue and green barely move. This is exactly what happened in 2007\u20132008: LIBOR spiked because banks feared lending to each other without collateral, while repo rates (the basis for SOFR) stayed relatively calm.',
              },
            ]}
          />

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

function SliderHint({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: '12px',
        lineHeight: '1.55',
        color: 'var(--color-text-muted)',
        margin: '0 0 4px 0',
        padding: '6px 8px',
        borderLeft: '2px solid color-mix(in srgb, var(--color-primary) 30%, transparent)',
        backgroundColor: 'color-mix(in srgb, var(--color-primary) 3%, transparent)',
        borderRadius: '0 6px 6px 0',
      }}
    >
      {text}
    </p>
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
