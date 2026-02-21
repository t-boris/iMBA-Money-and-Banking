'use client';

import { useState, useMemo } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { AnimatedValue } from '@/components/visualizations/AnimatedValue';
import { Slider } from '@/components/visualizations/Slider';
import { Entity } from '@/components/visualizations/Entity';
import { FlowArrow } from '@/components/visualizations/FlowArrow';

interface OpenMarketOperationsFlowProps {
  className?: string;
}

const TARGET_LOW = 5.25;
const TARGET_HIGH = 5.50;
const CHART_W = 400;
const CHART_H = 280;
const PAD = { top: 30, right: 30, bottom: 50, left: 60 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;
const RATE_MAX = 8;

function rateToY(rate: number): number {
  return PAD.top + PLOT_H * (1 - rate / RATE_MAX);
}

function resToX(reserves: number): number {
  return PAD.left + PLOT_W * (reserves / 200);
}

function demandRate(reserves: number): number {
  return 7.5 - (reserves / 180) * 6;
}

function getDemandPath(): string {
  const parts: string[] = [];
  for (let r = 20; r <= 180; r += 5) {
    parts.push(`${r === 20 ? 'M' : 'L'}${resToX(r)},${rateToY(demandRate(r))}`);
  }
  return parts.join(' ');
}

export default function OpenMarketOperationsFlow({ className }: OpenMarketOperationsFlowProps) {
  const [fedAction, setFedAction] = useState(0);
  const supplyReserves = 100 + fedAction;
  const equilibriumRate = demandRate(supplyReserves);
  const demandPath = useMemo(() => getDemandPath(), []);

  const actionLabel =
    fedAction > 0 ? 'Fed BUYS securities' : fedAction < 0 ? 'Fed SELLS securities' : 'No action';
  const actionColor =
    fedAction > 0 ? 'rgb(16, 185, 129)' : fedAction < 0 ? 'rgb(239, 68, 68)' : 'var(--color-text-muted)';
  const isActive = fedAction !== 0;
  const springCfg = { type: 'spring' as const, stiffness: 200, damping: 25 };

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Open Market Operations
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          How the Fed controls the federal funds rate by buying and selling securities.
        </p>
      </div>

      {/* Section A: Supply/Demand Diagram */}
      <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-surface-2)', marginBottom: '24px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px', textAlign: 'center' }}>
          Market for Bank Reserves
        </h4>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* SVG Chart */}
          <div style={{ flexShrink: 0 }}>
            <svg width={CHART_W} height={CHART_H} viewBox={`0 0 ${CHART_W} ${CHART_H}`} style={{ overflow: 'visible' }}>
              {/* Grid lines */}
              {[1, 2, 3, 4, 5, 6, 7].map((rate) => (
                <line key={`g-${rate}`} x1={PAD.left} y1={rateToY(rate)} x2={PAD.left + PLOT_W} y2={rateToY(rate)} stroke="var(--color-surface-2)" strokeWidth="1" strokeDasharray="4,4" />
              ))}
              {/* Axes */}
              <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + PLOT_H} stroke="var(--color-text-muted)" strokeWidth="2" />
              <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={PAD.left + PLOT_W} y2={PAD.top + PLOT_H} stroke="var(--color-text-muted)" strokeWidth="2" />
              {/* Y-axis labels */}
              {[0, 2, 4, 6, 8].map((rate) => (
                <text key={`y-${rate}`} x={PAD.left - 8} y={rateToY(rate)} textAnchor="end" dominantBaseline="middle" style={{ fontSize: '11px', fill: 'var(--color-text-muted)' }}>
                  {rate}%
                </text>
              ))}
              {/* Y-axis title */}
              <text x={14} y={PAD.top + PLOT_H / 2} textAnchor="middle" dominantBaseline="middle" transform={`rotate(-90, 14, ${PAD.top + PLOT_H / 2})`} style={{ fontSize: '12px', fill: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Fed Funds Rate
              </text>
              {/* X-axis title */}
              <text x={PAD.left + PLOT_W / 2} y={CHART_H - 6} textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Quantity of Reserves
              </text>
              {/* Target rate range band */}
              <rect x={PAD.left} y={rateToY(TARGET_HIGH)} width={PLOT_W} height={rateToY(TARGET_LOW) - rateToY(TARGET_HIGH)} fill="rgba(99, 102, 241, 0.08)" />
              <line x1={PAD.left} y1={rateToY(TARGET_HIGH)} x2={PAD.left + PLOT_W} y2={rateToY(TARGET_HIGH)} stroke="rgb(99, 102, 241)" strokeWidth="1" strokeDasharray="6,3" />
              <line x1={PAD.left} y1={rateToY(TARGET_LOW)} x2={PAD.left + PLOT_W} y2={rateToY(TARGET_LOW)} stroke="rgb(99, 102, 241)" strokeWidth="1" strokeDasharray="6,3" />
              <text x={PAD.left + PLOT_W + 4} y={rateToY((TARGET_LOW + TARGET_HIGH) / 2)} dominantBaseline="middle" style={{ fontSize: '10px', fill: 'rgb(99, 102, 241)', fontWeight: 500 }}>
                Target
              </text>
              {/* Demand curve */}
              <path d={demandPath} stroke="rgb(245, 158, 11)" strokeWidth="2.5" fill="none" />
              <text x={resToX(170)} y={rateToY(demandRate(170)) - 10} style={{ fontSize: '12px', fill: 'rgb(245, 158, 11)', fontWeight: 600 }} textAnchor="middle">
                Demand
              </text>
              {/* Ghost supply line when shifted */}
              {isActive && (
                <line x1={resToX(100)} y1={PAD.top} x2={resToX(100)} y2={PAD.top + PLOT_H} stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="4,4" opacity={0.4} />
              )}
              {/* Animated supply line */}
              <motion.line x1={resToX(supplyReserves)} y1={PAD.top} x2={resToX(supplyReserves)} y2={PAD.top + PLOT_H} stroke="rgb(16, 185, 129)" strokeWidth="2.5" initial={false} animate={{ x1: resToX(supplyReserves), x2: resToX(supplyReserves) }} transition={springCfg} />
              <motion.g initial={false} animate={{ x: resToX(supplyReserves) - resToX(0) }} transition={springCfg}>
                <text x={resToX(0)} y={PAD.top - 8} textAnchor="middle" style={{ fontSize: '12px', fill: 'rgb(16, 185, 129)', fontWeight: 600 }}>
                  Supply
                </text>
              </motion.g>
              {/* Shift arrow */}
              {isActive && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <defs>
                    <marker id="arrowhead-omo" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={fedAction > 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'} />
                    </marker>
                  </defs>
                  <line x1={resToX(100) + (fedAction > 0 ? 6 : -6)} y1={PAD.top + PLOT_H / 2} x2={resToX(supplyReserves) + (fedAction > 0 ? -6 : 6)} y2={PAD.top + PLOT_H / 2} stroke={fedAction > 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'} strokeWidth="2" markerEnd="url(#arrowhead-omo)" />
                </motion.g>
              )}
              {/* Equilibrium dot */}
              <motion.circle r="6" fill="rgb(239, 68, 68)" stroke="white" strokeWidth="2" initial={false} animate={{ cx: resToX(supplyReserves), cy: rateToY(equilibriumRate) }} transition={springCfg} />
              {/* Equilibrium label */}
              <motion.g initial={false} animate={{ x: resToX(supplyReserves) + 10 - resToX(0), y: rateToY(equilibriumRate) - 12 - rateToY(0) }} transition={springCfg}>
                <text x={resToX(0)} y={rateToY(0)} style={{ fontSize: '11px', fill: 'rgb(239, 68, 68)', fontWeight: 600 }}>Eq.</text>
              </motion.g>
            </svg>
          </div>

          {/* Controls and readout */}
          <div style={{ flex: '1 1 220px', minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Slider
              label="Fed Action"
              value={fedAction}
              onChange={setFedAction}
              min={-50}
              max={50}
              step={5}
              formatValue={(v: number) => (v > 0 ? `Buy +${v}` : v < 0 ? `Sell ${v}` : 'None')}
            />

            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--color-surface-2)', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: actionColor, marginBottom: '4px' }}>
                {actionLabel}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                {fedAction > 0 ? 'Supply shifts right, rate falls' : fedAction < 0 ? 'Supply shifts left, rate rises' : 'Supply unchanged'}
              </div>
            </div>

            <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'var(--color-surface-2)', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                Equilibrium Fed Funds Rate
              </div>
              <AnimatedValue value={equilibriumRate} suffix="%" decimals={2} size="lg" />
              <div style={{ marginTop: '8px', fontSize: '12px', color: 'rgb(99, 102, 241)' }}>
                Target: {TARGET_LOW.toFixed(2)}% - {TARGET_HIGH.toFixed(2)}%
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <LegendItem color="rgb(245, 158, 11)" label="Demand for reserves" />
              <LegendItem color="rgb(16, 185, 129)" label="Supply of reserves (Fed)" />
              <LegendItem color="rgb(239, 68, 68)" label="Equilibrium point" />
              <LegendItem color="rgb(99, 102, 241)" label="Target range" dashed />
            </div>
          </div>
        </div>
      </div>

      {/* Section B: OMO Transmission Chain */}
      <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-surface-2)', marginBottom: '24px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '20px', textAlign: 'center' }}>
          OMO Transmission Chain
        </h4>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Entity icon="🏛️" label="FOMC" subtext="Sets target rate range" highlighted={isActive} className="flex-shrink-0" style={{ minWidth: '130px', maxWidth: '160px' }} />
          <FlowArrow direction="right" animated={isActive} label="Directive" className="flex-shrink-0" />
          <Entity icon="🏦" label="NY Fed Desk" subtext="Executes buy/sell orders" highlighted={isActive} className="flex-shrink-0" style={{ minWidth: '130px', maxWidth: '160px' }} />
          <FlowArrow direction="right" animated={isActive} label="Trades" className="flex-shrink-0" />
          <Entity icon="📊" label="SOMA Portfolio" subtext="Securities added/removed" highlighted={isActive} className="flex-shrink-0" style={{ minWidth: '130px', maxWidth: '160px' }} />
          <FlowArrow direction="right" animated={isActive} label="Counterparty" className="flex-shrink-0" />
          <Entity icon="🏢" label="Primary Dealers" subtext="~24 authorized firms" highlighted={isActive} className="flex-shrink-0" style={{ minWidth: '130px', maxWidth: '160px' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '20px' }}>
          <StepCard step={1} title="Policy Decision" description="FOMC meets ~8 times per year and sets the target federal funds rate range." />
          <StepCard step={2} title="Execution" description="The NY Fed Trading Desk conducts daily operations to keep the rate within target." />
          <StepCard step={3} title="Portfolio Change" description="Securities are added to (buying) or removed from (selling) the System Open Market Account." />
          <StepCard step={4} title="Market Impact" description="Primary dealers trade directly with the Fed, transmitting the effect to the broader financial system." />
        </div>
      </div>

      {/* Bottom Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ padding: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>💡</span>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(99, 102, 241)', marginBottom: '4px' }}>
              How It Works
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
              When the Fed buys Treasuries: creates new reserves (digital, not printed) →
              bank reserves increase → more supply → equilibrium rate falls. When the Fed
              sells Treasuries: destroys reserves → bank reserves decrease → less supply →
              equilibrium rate rises.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Helper: Legend item */
function LegendItem({ color, label, dashed = false }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          width: '16px', height: '3px', borderRadius: '2px', flexShrink: 0,
          backgroundColor: dashed ? 'transparent' : color,
          ...(dashed ? { backgroundImage: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px)` } : {}),
        }}
      />
      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{label}</span>
    </div>
  );
}

/* Helper: Step card */
function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--color-surface-2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.2)', color: 'rgb(99, 102, 241)', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
          {step}
        </span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{title}</span>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', margin: 0 }}>
        {description}
      </p>
    </div>
  );
}
