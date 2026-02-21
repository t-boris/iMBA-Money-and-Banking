'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Slider } from '../Slider';
import { AnimatedValue } from '../AnimatedValue';

interface MoneySupplyCalculatorProps {
  className?: string;
}

interface MoneyLayer {
  id: string;
  name: string;
  components: string[];
  color: string;
  colorRgb: string;
  note?: string;
}

const moneyLayers: MoneyLayer[] = [
  {
    id: 'm0',
    name: 'M0 (Monetary Base)',
    components: ['Currency in circulation', 'Bank reserves at the Fed'],
    color: 'rgb(99, 102, 241)',
    colorRgb: '99, 102, 241',
  },
  {
    id: 'm1',
    name: 'M1',
    components: ['M0 components', 'Demand deposits (checking accounts)', "Traveler\u2019s checks"],
    color: 'rgb(16, 185, 129)',
    colorRgb: '16, 185, 129',
  },
  {
    id: 'm2',
    name: 'M2',
    components: [
      'All M1 components', 'Savings deposits',
      'Small time deposits (< $100K)', 'Retail money market mutual funds (MMMF)',
    ],
    color: 'rgb(245, 158, 11)',
    colorRgb: '245, 158, 11',
  },
  {
    id: 'm3',
    name: 'M3',
    components: [
      'All M2 components', 'Large time deposits (>= $100K)',
      'Institutional money market funds', 'Short-term repurchase agreements (repos)',
    ],
    color: 'rgb(239, 68, 68)',
    colorRgb: '239, 68, 68',
    note: 'Fed discontinued M3 reporting in March 2006',
  },
];

interface DepositRound {
  round: number;
  deposit: number;
  reserve: number;
  lent: number;
}

function computeRounds(initialDeposit: number, reserveRatio: number, count: number): DepositRound[] {
  const rounds: DepositRound[] = [];
  let deposit = initialDeposit;
  for (let i = 1; i <= count; i++) {
    const reserve = deposit * reserveRatio;
    const lent = deposit - reserve;
    rounds.push({ round: i, deposit, reserve, lent });
    deposit = lent;
  }
  return rounds;
}

export default function MoneySupplyCalculator({ className }: MoneySupplyCalculatorProps) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [reserveRatioPercent, setReserveRatioPercent] = useState(10);
  const [initialDeposit, setInitialDeposit] = useState(1000);

  const reserveRatio = reserveRatioPercent / 100;
  const moneyMultiplier = reserveRatio > 0 ? 1 / reserveRatio : 0;
  const totalMoneyCreated = initialDeposit * moneyMultiplier;
  const totalNewLoans = totalMoneyCreated - initialDeposit;

  const rounds = useMemo(
    () => computeRounds(initialDeposit, reserveRatio, 6),
    [initialDeposit, reserveRatio]
  );

  const activeLayerData = moneyLayers.find((l) => l.id === activeLayer);
  const layerWidths = [40, 60, 80, 100];

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '920px', margin: '0 auto' }}>
      {/* ========== SECTION A: Money Supply Nesting ========== */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Money Supply Aggregates
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Each broader measure contains all components of the narrower ones
          </p>
        </div>

        {/* Nested boxes visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
          {[...moneyLayers].reverse().map((layer, reverseIndex) => {
            const layerIndex = moneyLayers.length - 1 - reverseIndex;
            const isActive = activeLayer === layer.id;
            const isDiscontinued = layer.id === 'm3';
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reverseIndex * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                onClick={() => setActiveLayer(isActive ? null : layer.id)}
                style={{
                  width: `${layerWidths[layerIndex]}%`,
                  padding: '16px 16px 8px 16px',
                  backgroundColor: isActive ? `rgba(${layer.colorRgb}, 0.15)` : `rgba(${layer.colorRgb}, 0.06)`,
                  border: isActive ? `2px solid rgba(${layer.colorRgb}, 0.5)` : `1px solid rgba(${layer.colorRgb}, 0.2)`,
                  borderRadius: reverseIndex === 0 ? '16px 16px 0 0' : reverseIndex === moneyLayers.length - 1 ? '0 0 16px 16px' : '0',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, border-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: isActive ? layer.color : 'var(--color-text-primary)' }}>
                    {layer.name}
                  </span>
                  {isDiscontinued && (
                    <span style={{
                      fontSize: '10px', color: 'var(--color-text-muted)',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '2px 8px', borderRadius: '6px',
                    }}>
                      Discontinued
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Layer detail panel */}
        <AnimatePresence mode="wait">
          {activeLayerData ? (
            <motion.div
              key={activeLayerData.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                padding: '20px', borderRadius: '12px',
                backgroundColor: `rgba(${activeLayerData.colorRgb}, 0.08)`,
                border: `2px solid rgba(${activeLayerData.colorRgb}, 0.2)`,
              }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: activeLayerData.color, marginBottom: '12px' }}>
                {activeLayerData.name} Components
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {activeLayerData.components.map((comp, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px', lineHeight: '1.5' }}
                  >
                    {comp}
                  </motion.li>
                ))}
              </ul>
              {activeLayerData.note && (
                <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '12px', color: 'rgb(239, 68, 68)', fontStyle: 'italic' }}>
                  Note: {activeLayerData.note}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="hint-layers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}
            >
              Click any layer to see its components
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ========== SECTION B: Money Multiplier Calculator ========== */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Money Multiplier Calculator
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            See how an initial deposit creates money through the banking system
          </p>
        </div>

        {/* Sliders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            style={{ padding: '20px', borderRadius: '12px', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-surface-2)' }}
          >
            <Slider label="Reserve Ratio" value={reserveRatioPercent} onChange={setReserveRatioPercent} min={1} max={25} step={0.5} unit="%" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            style={{ padding: '20px', borderRadius: '12px', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-surface-2)' }}
          >
            <Slider label="Initial Deposit" value={initialDeposit} onChange={setInitialDeposit} min={100} max={100000} step={100} formatValue={(v) => `$${v.toLocaleString()}`} />
          </motion.div>
        </div>

        {/* Formula display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{
            textAlign: 'center', padding: '14px 20px', marginBottom: '24px',
            backgroundColor: 'rgba(99, 102, 241, 0.06)', borderRadius: '12px',
            border: '1px solid rgba(99, 102, 241, 0.15)',
          }}
        >
          <span style={{ fontSize: '14px', fontFamily: 'monospace', color: 'rgb(99, 102, 241)', fontWeight: 600 }}>
            Money Multiplier = 1 / rr = 1 / {reserveRatio.toFixed(2)} = {moneyMultiplier.toFixed(2)}
          </span>
        </motion.div>

        {/* Computed values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ padding: '16px', borderRadius: '12px', textAlign: 'center', backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}
          >
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>Money Multiplier</div>
            <AnimatedValue value={moneyMultiplier} suffix="x" decimals={1} size="xl" className="text-indigo-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ padding: '16px', borderRadius: '12px', textAlign: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
          >
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>Total Money Created</div>
            <AnimatedValue value={totalMoneyCreated} prefix="$" decimals={0} size="xl" className="text-emerald-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ padding: '16px', borderRadius: '12px', textAlign: 'center', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}
          >
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>Total New Loans</div>
            <AnimatedValue value={totalNewLoans} prefix="$" decimals={0} size="xl" className="text-amber-500" />
          </motion.div>
        </div>

        {/* Deposit cycle animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ padding: '20px', borderRadius: '12px', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-surface-2)', marginBottom: '20px' }}
        >
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Deposit Expansion Cycle
          </h4>

          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr', gap: '8px', marginBottom: '8px', padding: '0 4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Round</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(99, 102, 241)' }}>Deposit</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(239, 68, 68)' }}>Reserve</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}>Lend</span>
          </div>

          {/* Rounds */}
          {rounds.map((round) => {
            const maxDeposit = initialDeposit;
            const depositWidth = maxDeposit > 0 ? (round.deposit / maxDeposit) * 100 : 0;
            const reserveWidth = maxDeposit > 0 ? (round.reserve / maxDeposit) * 100 : 0;
            const lentWidth = maxDeposit > 0 ? (round.lent / maxDeposit) * 100 : 0;
            const springCfg = { type: 'spring' as const, stiffness: 120, damping: 18 };
            const barStyle = { height: '28px', borderRadius: '6px', backgroundColor: 'var(--color-surface-2)', overflow: 'hidden' as const };
            const labelStyle = { fontSize: '10px', color: 'white', fontWeight: 600 as const };
            return (
              <motion.div
                key={round.round}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: round.round * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr', gap: '8px', marginBottom: '6px', alignItems: 'center' }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                  {round.round}
                </span>
                <div style={barStyle}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${depositWidth}%` }}
                    transition={{ delay: round.round * 0.08 + 0.1, duration: 0.5, ...springCfg }}
                    style={{ height: '100%', backgroundColor: 'rgba(99, 102, 241, 0.7)', borderRadius: '6px', display: 'flex', alignItems: 'center', paddingLeft: '6px' }}
                  >
                    <span style={labelStyle}>${round.deposit.toFixed(0)}</span>
                  </motion.div>
                </div>
                <div style={barStyle}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${reserveWidth}%` }}
                    transition={{ delay: round.round * 0.08 + 0.2, duration: 0.5, ...springCfg }}
                    style={{ height: '100%', backgroundColor: 'rgba(239, 68, 68, 0.7)', borderRadius: '6px', display: 'flex', alignItems: 'center', paddingLeft: '6px' }}
                  >
                    <span style={labelStyle}>${round.reserve.toFixed(0)}</span>
                  </motion.div>
                </div>
                <div style={barStyle}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${lentWidth}%` }}
                    transition={{ delay: round.round * 0.08 + 0.3, duration: 0.5, ...springCfg }}
                    style={{ height: '100%', backgroundColor: 'rgba(16, 185, 129, 0.7)', borderRadius: '6px', display: 'flex', alignItems: 'center', paddingLeft: '6px' }}
                  >
                    <span style={labelStyle}>${round.lent.toFixed(0)}</span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          <div style={{ textAlign: 'center', padding: '8px', fontSize: '12px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
            ... and so on until the deposit amount approaches zero
          </div>
        </motion.div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ padding: '16px 20px', backgroundColor: 'rgba(245, 158, 11, 0.08)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}
        >
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.7', textAlign: 'center' }}>
            <strong style={{ color: 'rgb(245, 158, 11)' }}>In practice,</strong> the actual
            multiplier is lower because banks hold excess reserves and some cash
            &ldquo;leaks&rdquo; out of the banking system when people hold currency
            rather than depositing it.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
