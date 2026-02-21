'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Slider } from '../Slider';
import { AnimatedValue } from '../AnimatedValue';

interface DiscountWindowCalculatorProps {
  className?: string;
}

const collateralData = [
  { type: '1-year U.S. Treasury', power: '~99%', risk: 'Very Safe', color: 'rgb(16, 185, 129)' },
  { type: 'Agency MBS', power: '~95%', risk: 'Safe', color: 'rgb(59, 130, 246)' },
  { type: 'Commercial loans', power: '~75%', risk: 'Moderate', color: 'rgb(245, 158, 11)' },
  { type: 'Commercial real estate', power: '~35-95%', risk: 'Variable', color: 'rgb(168, 85, 247)' },
  { type: 'Consumer loans', power: '~70%', risk: 'Moderate', color: 'rgb(245, 158, 11)' },
] as const;

const cardStyle = (color: string) => ({
  display: 'flex' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const,
  padding: '14px', borderRadius: '10px',
  backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
  border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
});

const panelStyle = {
  padding: '20px', borderRadius: '12px',
  backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-surface-2)',
};

const sectionBadge = (label: string, bg: string, fg: string) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: '28px', height: '28px', borderRadius: '8px',
    backgroundColor: bg, color: fg, fontSize: '14px', fontWeight: 700,
  }}>{label}</span>
);

const spring = { type: 'spring' as const, stiffness: 200, damping: 25 };

export default function DiscountWindowCalculator({ className }: DiscountWindowCalculatorProps) {
  const [faceValue, setFaceValue] = useState(10000);
  const [discountRate, setDiscountRate] = useState(5.5);
  const [showCollateral, setShowCollateral] = useState(false);
  const [targetRate, setTargetRate] = useState(5.25);

  const cashReceived = faceValue * (1 - discountRate / 100);
  const effectiveCost = faceValue * (discountRate / 100);
  const targetRangeLower = targetRate - 0.25;
  const targetRangeUpper = targetRate + 0.25;
  const discountWindowRate = targetRangeUpper + 0.25;

  // SVG layout
  const svgW = 600, svgH = 320;
  const cL = 70, cR = svgW - 40, cT = 30, cB = svgH - 40, cH = svgH - 70;
  const rateMax = useMemo(() => Math.max(discountWindowRate + 1.5, 7), [discountWindowRate]);
  const rateToY = (r: number) => cB - (r / rateMax) * cH;

  const fmtCur = (v: number) => v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : `$${v.toFixed(0)}`;

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Header */}
      <div style={{
        padding: '18px', borderRadius: '14px', border: '1px solid var(--color-surface-2)',
        background: 'linear-gradient(140deg, color-mix(in srgb, var(--color-primary) 10%, transparent), var(--color-surface-1))',
        marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Discount Window Calculator
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
          Explore how the Fed&apos;s discount window works as both a lending facility and a rate corridor mechanism.
        </p>
      </div>

      {/* Section A: Discount Loan Calculator */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring} style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {sectionBadge('A', 'rgba(99, 102, 241, 0.15)', 'rgb(99, 102, 241)')}
          Discount Loan Calculator
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Sliders */}
          <div style={panelStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Slider label="Face Value" value={faceValue} onChange={setFaceValue} min={1000} max={100000} step={1000} formatValue={(v) => `$${v.toLocaleString()}`} />
              <Slider label="Discount Rate" value={discountRate} onChange={setDiscountRate} min={1} max={15} step={0.25} formatValue={(v) => `${v.toFixed(2)}%`} />
            </div>
          </div>

          {/* Results */}
          <div style={panelStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={cardStyle('rgb(16, 185, 129)')}>
                <div>
                  <span style={{ fontSize: '14px', color: 'rgb(16, 185, 129)', fontWeight: 600 }}>Cash Received Today</span>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Face value x (1 - discount rate)</div>
                </div>
                <AnimatedValue value={cashReceived} prefix="$" decimals={0} size="lg" className="text-emerald-500" />
              </div>
              <div style={cardStyle('rgb(59, 130, 246)')}>
                <div>
                  <span style={{ fontSize: '14px', color: 'rgb(59, 130, 246)', fontWeight: 600 }}>Repayment at Maturity</span>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Full face value</div>
                </div>
                <AnimatedValue value={faceValue} prefix="$" decimals={0} size="lg" className="text-blue-500" />
              </div>
              <div style={cardStyle('rgb(239, 68, 68)')}>
                <div>
                  <span style={{ fontSize: '14px', color: 'rgb(239, 68, 68)', fontWeight: 600 }}>Effective Cost</span>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Face value x discount rate</div>
                </div>
                <AnimatedValue value={effectiveCost} prefix="$" decimals={0} size="lg" className="text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Formula */}
        <div style={{ marginTop: '16px', padding: '14px 18px', backgroundColor: 'var(--color-surface-2)', borderRadius: '10px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
          <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 600 }}>Cash received</span>
          {' = '}
          <span style={{ color: 'rgb(59, 130, 246)' }}>Face value</span>
          {' - ('}
          <span style={{ color: 'rgb(59, 130, 246)' }}>Face value</span>
          {' x '}
          <span style={{ color: 'rgb(239, 68, 68)' }}>Discount rate</span>
          {') = '}
          <span style={{ color: 'rgb(59, 130, 246)' }}>{fmtCur(faceValue)}</span>
          {' - ('}
          <span style={{ color: 'rgb(59, 130, 246)' }}>{fmtCur(faceValue)}</span>
          {' x '}
          <span style={{ color: 'rgb(239, 68, 68)' }}>{discountRate.toFixed(2)}%</span>
          {') = '}
          <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 700 }}>
            ${cashReceived.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>

        {/* Collateral Table Toggle */}
        <div style={{ marginTop: '16px' }}>
          <motion.button
            onClick={() => setShowCollateral(!showCollateral)}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-surface-2)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Collateral Haircut Reference</span>
            <motion.span animate={{ rotate: showCollateral ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              &#9660;
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showCollateral && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ type: 'spring', stiffness: 250, damping: 30 }} style={{ overflow: 'hidden' }}>
                <div style={{ marginTop: '8px', borderRadius: '10px', border: '1px solid var(--color-surface-2)', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 110px', padding: '10px 16px', backgroundColor: 'var(--color-surface-2)', gap: '8px' }}>
                    {['Collateral Type', 'Borrowing Power', 'Risk Level'].map((h) => (
                      <span key={h} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)', textAlign: h === 'Collateral Type' ? 'left' : 'center' }}>{h}</span>
                    ))}
                  </div>
                  {collateralData.map((row, i) => (
                    <motion.div key={row.type} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 110px', padding: '10px 16px', backgroundColor: i % 2 === 0 ? 'var(--color-surface-1)' : 'var(--color-surface-0)', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{row.type}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', textAlign: 'center', fontFamily: 'monospace' }}>{row.power}</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: row.color, textAlign: 'center', padding: '2px 8px', borderRadius: '6px', backgroundColor: `color-mix(in srgb, ${row.color} 12%, transparent)` }}>{row.risk}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Section B: Rate Corridor */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.1 }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {sectionBadge('B', 'rgba(168, 85, 247, 0.15)', 'rgb(168, 85, 247)')}
          Rate Corridor Visualization
        </h4>

        <div style={{ ...panelStyle, padding: '16px 20px', marginBottom: '16px' }}>
          <Slider label="Federal Funds Target Rate" value={targetRate} onChange={setTargetRate} min={0} max={6} step={0.25} formatValue={(v) => `${v.toFixed(2)}%`} />
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Discount Rate (Upper Bound)</div>
              <AnimatedValue value={discountWindowRate} suffix="%" decimals={2} size="md" className="text-red-500" />
            </div>
            <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Target Range</div>
              <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 600, color: 'rgb(59, 130, 246)' }}>
                {targetRangeLower.toFixed(2)}% - {targetRangeUpper.toFixed(2)}%
              </span>
            </div>
            <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Effective Fed Funds Rate</div>
              <AnimatedValue value={targetRate} suffix="%" decimals={2} size="md" className="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* SVG Rate Corridor */}
        <div style={{ ...panelStyle, marginBottom: '16px' }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: '280px' }}>
            {Array.from({ length: Math.ceil(rateMax) + 1 }, (_, i) => i).map((tick) => {
              if (tick > rateMax) return null;
              const y = rateToY(tick);
              return (
                <g key={`g-${tick}`}>
                  <line x1={cL} y1={y} x2={cR} y2={y} stroke="var(--color-surface-2)" strokeWidth="1" />
                  <text x={cL - 8} y={y + 4} fontSize="11" fill="var(--color-text-muted)" textAnchor="end">{tick}%</text>
                </g>
              );
            })}
            <line x1={cL} y1={cB} x2={cR} y2={cB} stroke="var(--color-text-muted)" strokeWidth="1.2" />
            <line x1={cL} y1={cT} x2={cL} y2={cB} stroke="var(--color-text-muted)" strokeWidth="1.2" />

            {/* Target range band */}
            <motion.rect x={cL} width={cR - cL} initial={false}
              animate={{ y: rateToY(targetRangeUpper), height: rateToY(targetRangeLower) - rateToY(targetRangeUpper) }}
              transition={spring} fill="rgba(59, 130, 246, 0.12)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
            <motion.text initial={false} animate={{ y: rateToY((targetRangeLower + targetRangeUpper) / 2) + 4 }}
              transition={spring} x={cR - 4} fontSize="11" fill="rgb(59, 130, 246)" textAnchor="end" fontWeight="600">Target Range</motion.text>

            {/* Discount rate line */}
            <motion.line x1={cL} x2={cR} initial={false}
              animate={{ y1: rateToY(discountWindowRate), y2: rateToY(discountWindowRate) }}
              transition={spring} stroke="rgb(239, 68, 68)" strokeWidth="2.5" strokeDasharray="8 5" />
            <motion.text initial={false} animate={{ y: rateToY(discountWindowRate) - 8 }}
              transition={spring} x={cL + 8} fontSize="12" fill="rgb(239, 68, 68)" fontWeight="600">
              Discount Rate: {discountWindowRate.toFixed(2)}% (Upper Bound)
            </motion.text>

            {/* Fed funds rate dot */}
            <motion.circle initial={false} animate={{ cy: rateToY(targetRate) }}
              transition={spring} cx={(cL + cR) / 2} r="8" fill="rgb(16, 185, 129)" stroke="white" strokeWidth="2" />
            <motion.text initial={false} animate={{ y: rateToY(targetRate) + 5 }}
              transition={spring} x={(cL + cR) / 2 + 16} fontSize="12" fill="rgb(16, 185, 129)" fontWeight="600">
              Fed Funds: {targetRate.toFixed(2)}%
            </motion.text>

            {/* Y-axis label */}
            <text x="14" y={(cT + cB) / 2} fontSize="12" fill="var(--color-text-muted)" textAnchor="middle"
              transform={`rotate(-90, 14, ${(cT + cB) / 2})`}>Interest Rate</text>
          </svg>
        </div>

        {/* Corridor logic */}
        <div style={{ padding: '16px', backgroundColor: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '20px', lineHeight: '1' }}>&#8505;</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)', marginBottom: '6px' }}>How the Corridor Works</div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.65', margin: 0 }}>
                If the fed funds rate rises above the discount rate, banks borrow from the discount window instead of from each other. This reduces demand for interbank funds and pushes the rate back down. The discount rate acts as a ceiling on interbank borrowing costs.
              </p>
            </div>
          </div>
        </div>

        {/* Historical note */}
        <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-surface-2)', borderRadius: '10px', fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: '1.6' }}>
          Since 2003, the primary credit rate (discount rate) sits above the fed funds target rate, creating a penalty rate that discourages routine borrowing while ensuring liquidity is always available in times of stress.
        </div>
      </motion.div>
    </div>
  );
}
