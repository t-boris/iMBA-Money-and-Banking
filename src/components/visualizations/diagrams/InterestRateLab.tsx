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
          <ExplainerBlock
            items={[
              {
                term: 'What is this dashboard?',
                text: 'It lets you explore the Fisher equation \u2014 the fundamental relationship between nominal interest rates, real interest rates, and inflation. Every interest rate you see quoted (a mortgage, a savings account, a bond yield) is a nominal rate. This dashboard shows you what is actually inside that number.',
              },
              {
                term: 'Nominal interest rate',
                text: 'The rate you see advertised \u2014 e.g. "your savings account pays 5%." This is the raw number in current dollars, before accounting for inflation. If prices are rising at 3%, your 5% nominal return only gives you ~2% more purchasing power.',
              },
              {
                term: 'Real interest rate',
                text: 'What you actually earn in terms of purchasing power after stripping out inflation. If a bond pays 5% nominal and inflation is 3%, the real return is roughly 2%. This is the true reward for lending your money. TIPS (Treasury Inflation-Protected Securities) directly pay a real rate because their principal adjusts with the CPI.',
              },
              {
                term: 'Fisher equation',
                text: 'Nominal rate \u2248 Real rate + Expected inflation (the approximation). The exact formula is (1 + nominal) = (1 + real) \u00d7 (1 + inflation). The approximation is close when rates are low, but the gap grows at higher rates \u2014 try setting both sliders above 5% to see the two cards diverge.',
              },
              {
                term: 'Breakeven inflation',
                text: 'In real markets this is the difference between a regular Treasury yield (nominal) and a TIPS yield (real) of the same maturity. It represents the market\u2019s best guess of future inflation. Here it equals nominal minus real \u2014 exactly the expected inflation you set.',
              },
            ]}
          />
          <Panel>
            <SliderHint
              text='The real interest rate \u2014 the purchasing-power return an investor earns. Determined by economic fundamentals: productivity growth, savings supply, and central bank policy. When the economy is strong, real rates tend to be higher (more demand for capital). TIPS yields directly measure this in practice.'
            />
            <RangeInput
              label='Real Rate (r)'
              value={realRate}
              min={-1}
              max={6}
              step={0.1}
              onChange={setRealRate}
              format={(v) => `${v.toFixed(1)}%`}
            />
            <SliderHint
              text='What the market expects inflation to average over the life of the bond. Central bank credibility matters here: if the Fed is trusted to keep inflation near 2%, this number stays anchored. If credibility weakens (e.g. after a large fiscal expansion), inflation expectations drift up and nominal rates follow.'
            />
            <RangeInput
              label='Expected Inflation (\u03C0)'
              value={expectedInflation}
              min={-1}
              max={8}
              step={0.1}
              onChange={setExpectedInflation}
              format={(v) => `${v.toFixed(1)}%`}
            />
          </Panel>

          <ExplainerBlock
            items={[
              {
                term: 'Nominal (Approx) \u2014 blue card',
                text: 'Simply real + inflation. This is the Fisher approximation, which works well at low rates. For example: 1.6% real + 2.3% inflation \u2248 3.9% nominal.',
              },
              {
                term: 'Nominal (Exact) \u2014 green card',
                text: 'Uses the exact formula: (1 + r) \u00d7 (1 + \u03C0) \u2212 1. This is slightly higher than the approximation because of the cross-term r \u00d7 \u03C0. The difference is tiny at low rates but becomes visible when you push both sliders above 5%.',
              },
              {
                term: 'Breakeven Inflation \u2014 amber card',
                text: 'The inflation rate that makes a nominal Treasury and a TIPS of the same maturity give equal returns. If actual inflation exceeds breakeven, TIPS holders win; if inflation is lower, regular Treasuries win.',
              },
            ]}
          />

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
            <ExplainerBlock
              items={[
                {
                  term: 'Reading the bar chart',
                  text: 'Green bar = real rate (purchasing-power return). Amber bar = expected inflation (the part that gets eaten by rising prices). Blue bar = their sum, the nominal rate. Notice that the blue bar is always roughly as long as green + amber combined.',
                },
              ]}
            />
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
          <ExplainerBlock
            items={[
              {
                term: 'What is this dashboard?',
                text: 'It breaks down a long-term Treasury bond yield into its three building blocks. When you see "the 10-year Treasury yields 4.8%," this dashboard shows you where that number comes from and what each component means.',
              },
              {
                term: 'Why Treasuries are the benchmark',
                text: 'US Treasury bonds are considered the risk-free asset because the US government can always print dollars to repay. Every other rate in the economy (corporate bonds, mortgages, student loans) is priced as "Treasury yield + a spread for extra risk." Understanding Treasuries is the foundation for understanding all interest rates.',
              },
              {
                term: 'The decomposition formula',
                text: 'Long-term nominal yield = Real rate + Expected inflation + Term premium. This is an extension of the Fisher equation: the first two pieces are the same (purchasing-power return + inflation compensation), and the third piece \u2014 the term premium \u2014 is the extra reward for locking your money up for a long time.',
              },
            ]}
          />
          <Panel>
            <SliderHint
              text='The compensation an investor receives for giving up purchasing power today. Driven by the same fundamentals as in the Fisher tab: productivity growth, savings supply, and central bank policy. In practice, this is observable through TIPS yields. After the 2008 crisis, real rates fell near zero (or below) as central banks cut rates aggressively.'
            />
            <RangeInput
              label='Real Rate Component'
              value={realRate}
              min={-1}
              max={6}
              step={0.1}
              onChange={setRealRate}
              format={(v) => `${v.toFixed(1)}%`}
            />
            <SliderHint
              text='The inflation rate the market expects over the bond\u2019s life. If investors believe the Fed will keep inflation at 2%, this stays near 2%. If a supply shock or fiscal policy shakes confidence, this rises \u2014 pushing the nominal yield up even if the real rate hasn\u2019t changed.'
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
            <SliderHint
              text='The extra yield investors demand for holding a long-maturity bond instead of rolling over short-term bills. Why does it exist? Longer bonds carry more interest-rate risk (if rates rise, the bond\u2019s price drops more), more inflation uncertainty, and more exposure to unknown future events. In calm periods the term premium is small (~0.5\u20131%). In volatile periods or when government debt supply surges, it can rise above 2%.'
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
            <ExplainerBlock
              items={[
                {
                  term: 'Reading the stacked bar',
                  text: 'Green = real rate, amber = expected inflation, purple = term premium. The total width is the implied long-term nominal yield. Drag each slider to see how its segment grows or shrinks \u2014 and how the total yield responds.',
                },
                {
                  term: 'Try this experiment',
                  text: 'Set real rate to 2%, inflation to 2%, term premium to 0%. You get a 4% yield with no term premium \u2014 the market is indifferent between short and long bonds. Now raise term premium to 1.5%: the yield jumps to 5.5%, reflecting the extra compensation investors demand for duration risk.',
                },
              ]}
            />
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
          <ExplainerBlock
            items={[
              {
                term: 'What is this dashboard?',
                text: 'It lets you build a yield curve from scratch by controlling three forces: where the Fed has set rates today, where the market expects rates to go, and how much extra compensation investors demand for holding longer bonds. The resulting curve shape is one of the most watched signals in all of finance.',
              },
              {
                term: 'What is a yield curve?',
                text: 'A snapshot of interest rates across different maturities at a single point in time. The x-axis shows time to maturity (3 months to 30 years), and the y-axis shows the yield. It answers the question: "If I lend to the US government for X years, what annual rate do I earn?"',
              },
              {
                term: 'Upward sloping (normal)',
                text: 'Long-term rates are higher than short-term rates. This is the typical shape during economic expansions: investors demand extra compensation (term premium) for locking money away longer, and the market expects the economy to grow steadily.',
              },
              {
                term: 'Inverted',
                text: 'Short-term rates exceed long-term rates. This is rare and historically one of the most reliable recession predictors. It usually happens when the Fed has raised short rates aggressively, but the market expects it will have to cut soon because the economy is weakening. Every US recession since the 1960s was preceded by an inversion of the 10Y\u20132Y spread.',
              },
              {
                term: '10Y\u20132Y spread',
                text: 'The most-watched measure of curve slope. Positive = normal curve, negative = inverted. When this goes negative, bond traders, central bankers, and the financial press all pay attention because of its recession-forecasting track record.',
              },
            ]}
          />
          <Panel>
            <SliderHint
              text='Where the Fed has set the overnight policy rate right now. This anchors the left end of the curve (short maturities). When the Fed is tightening (raising rates to fight inflation), this is high. When easing (cutting rates to support growth), this is low.'
            />
            <RangeInput
              label='Current Short Rate (near policy rate)'
              value={shortRate}
              min={0}
              max={8}
              step={0.1}
              onChange={setShortRate}
              format={(v) => `${v.toFixed(1)}%`}
            />
            <SliderHint
              text='What the bond market expects the Fed to do over the coming years. Negative values mean the market expects rate cuts (the Fed will ease because the economy is slowing). Positive values mean the market expects rate hikes (tightening to fight inflation). This is the single biggest driver of curve shape: strongly negative expectations pull long rates below short rates, creating an inversion.'
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
            <SliderHint
              text='How much extra yield investors demand per unit of maturity for bearing duration risk. Higher values steepen the curve (long bonds pay more). This reflects uncertainty about the future: when fiscal deficits are large, inflation is unpredictable, or bond supply is surging, investors demand a bigger premium. When central banks buy long bonds (QE), they compress this premium.'
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
            <ExplainerBlock
              items={[
                {
                  term: 'Reading the chart',
                  text: 'Each dot is a Treasury maturity (3M, 1Y, 2Y, 5Y, 10Y, 30Y). The line connecting them is the yield curve. Green = upward sloping (normal expansion). Red = inverted (recession signal). Amber = flat / transitional. Watch the color change as you adjust the sliders.',
                },
                {
                  term: 'Try this: create an inversion',
                  text: 'Set the short rate high (e.g. 5.5%), the future policy path strongly negative (e.g. \u22123.0), and the term premium low (e.g. 0.1). The curve inverts \u2014 short rates sit above long rates because the market is pricing in aggressive rate cuts. This is exactly what happened in 2006\u20132007 before the financial crisis.',
                },
                {
                  term: 'Try this: create a steep curve',
                  text: 'Set the short rate low (e.g. 1.0%), the future policy path positive (e.g. +2.0), and the term premium high (e.g. 1.0). The curve slopes steeply upward \u2014 characteristic of early economic recoveries when the Fed is still keeping rates low but the market expects tightening ahead.',
                },
              ]}
            />
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

            <ExplainerBlock
              items={[
                {
                  term: 'Curve Shape',
                  text: 'Classified by the 10Y\u20132Y spread. Upward Sloping (green) when spread > 0.45%. Inverted (red) when spread < \u22120.15%. Flat/Transition (amber) in between.',
                },
                {
                  term: 'Signal card',
                  text: 'When the spread goes negative (inverted), the signal switches to "Recession Risk Elevated." This is not a guarantee \u2014 but historically, inversions have preceded every US recession with a lead time of roughly 6\u201318 months.',
                },
              ]}
            />

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
