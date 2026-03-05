'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 };

type Phase = 'normal' | 'crisis';

interface FlowNode {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  x: number;
  y: number;
  width: number;
}

const nodes: FlowNode[] = [
  { id: 'buyer', label: 'Car Buyer', sublabel: 'Needs financing', icon: '🚗', x: 10, y: 50, width: 100 },
  { id: 'captive', label: 'Captive Finance', sublabel: 'GMAC, Ford Credit', icon: '🏢', x: 140, y: 50, width: 120 },
  { id: 'trust', label: 'Special Purpose Trust', sublabel: 'Holds loan pool', icon: '📦', x: 290, y: 50, width: 130 },
  { id: 'abcp', label: 'ABCP Investors', sublabel: 'Short-term paper', icon: '📄', x: 450, y: 20, width: 120 },
  { id: 'abs', label: 'ABS Investors', sublabel: 'Long-term bonds', icon: '📊', x: 450, y: 80, width: 120 },
];

const salesData = [
  { year: '2005', sales: 16.9, financed: 85 },
  { year: '2006', sales: 16.5, financed: 83 },
  { year: '2007', sales: 16.1, financed: 80 },
  { year: '2008', sales: 13.2, financed: 60 },
  { year: '2009', sales: 10.4, financed: 45 },
  { year: '2010', sales: 11.6, financed: 55 },
];

export default function AutoLoanCrisisFlow() {
  const [phase, setPhase] = useState<Phase>('normal');
  const [showSales, setShowSales] = useState(false);

  const isCrisis = phase === 'crisis';

  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-surface-2)',
        backgroundColor: 'var(--color-surface-1)',
        padding: '16px',
      }}
    >
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
        Auto Loan Financing & the 2008 Crisis
      </h3>
      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
        How captive finance companies funded auto loans through ABCP and ABS — and what happened when investors ran
      </p>

      {/* Phase toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {([
          { id: 'normal' as Phase, label: 'Normal Flow', color: 'rgb(16, 185, 129)' },
          { id: 'crisis' as Phase, label: 'Crisis Mode', color: 'rgb(239, 68, 68)' },
        ]).map((p) => (
          <button
            key={p.id}
            onClick={() => setPhase(p.id)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: `2px solid ${phase === p.id ? p.color : 'var(--color-surface-2)'}`,
              backgroundColor: phase === p.id
                ? `color-mix(in srgb, ${p.color} 12%, transparent)`
                : 'var(--color-surface-0)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              color: phase === p.id ? p.color : 'var(--color-text-secondary)',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Flow diagram */}
      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <div style={{ position: 'relative', minWidth: '580px', height: '160px' }}>
          {/* Connection lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Buyer → Captive */}
            <motion.line
              x1={110} y1={75} x2={140} y2={75}
              stroke={isCrisis ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)'}
              strokeWidth={2}
              strokeDasharray={isCrisis ? '6,4' : '0'}
              animate={{ opacity: isCrisis ? 0.4 : 1 }}
            />
            {/* Captive → Trust */}
            <motion.line
              x1={260} y1={75} x2={290} y2={75}
              stroke={isCrisis ? 'rgb(245, 158, 11)' : 'rgb(16, 185, 129)'}
              strokeWidth={2}
              animate={{ opacity: 1 }}
            />
            {/* Trust → ABCP */}
            <motion.line
              x1={420} y1={60} x2={450} y2={45}
              stroke={isCrisis ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)'}
              strokeWidth={2}
              strokeDasharray={isCrisis ? '6,4' : '0'}
            />
            {/* Trust → ABS */}
            <motion.line
              x1={420} y1={85} x2={450} y2={105}
              stroke={isCrisis ? 'rgb(239, 68, 68)' : 'rgb(99, 102, 241)'}
              strokeWidth={2}
              strokeDasharray={isCrisis ? '6,4' : '0'}
            />

            {/* Crisis X marks on ABCP line */}
            {isCrisis && (
              <motion.text
                x={435} y={48}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ fontSize: '18px', fill: 'rgb(239, 68, 68)', fontWeight: 700 }}
              >
                ✕
              </motion.text>
            )}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isAffected = isCrisis && ['buyer', 'abcp', 'abs'].includes(node.id);
            const nodeColor = isCrisis
              ? node.id === 'abcp' || node.id === 'abs'
                ? 'rgb(239, 68, 68)'
                : node.id === 'buyer'
                  ? 'rgb(245, 158, 11)'
                  : 'var(--color-surface-2)'
              : 'var(--color-surface-2)';

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  borderColor: nodeColor,
                }}
                transition={{ delay: i * 0.08, ...spring }}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.width}px`,
                  padding: '8px',
                  borderRadius: '10px',
                  border: `2px solid ${nodeColor}`,
                  backgroundColor: isAffected
                    ? 'color-mix(in srgb, rgb(239, 68, 68) 8%, var(--color-surface-0))'
                    : 'var(--color-surface-0)',
                  textAlign: 'center',
                  zIndex: 1,
                }}
              >
                <div style={{ fontSize: '16px', marginBottom: '2px' }}>{node.icon}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {node.label}
                </div>
                <div style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>
                  {isCrisis && node.id === 'abcp' ? 'Refuses to roll over!' :
                   isCrisis && node.id === 'abs' ? 'Market frozen' :
                   isCrisis && node.id === 'buyer' ? 'No financing available' :
                   node.sublabel}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: isCrisis
              ? 'color-mix(in srgb, rgb(239, 68, 68) 8%, transparent)'
              : 'color-mix(in srgb, rgb(16, 185, 129) 8%, transparent)',
            border: `1px solid ${isCrisis ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)'}`,
            marginBottom: '12px',
          }}
        >
          {isCrisis ? (
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'rgb(239, 68, 68)' }}>Crisis:</strong> Investors refuse to roll over
              ABCP. The trust cannot fund new loans. Captive finance companies lose access to capital markets.
              Auto lending freezes. Without financing, car sales collapse — down 38% from peak to trough.
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'rgb(16, 185, 129)' }}>Normal flow:</strong> Car buyers get loans from
              captive finance companies (GMAC, Ford Credit). The loans are pooled into trusts, which issue
              short-term ABCP and long-term ABS to investors. Cash flows back to fund more auto loans.
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Auto sales chart toggle */}
      <button
        onClick={() => setShowSales((s) => !s)}
        style={{
          padding: '6px 14px',
          borderRadius: '6px',
          border: '1px solid var(--color-surface-2)',
          backgroundColor: 'var(--color-surface-0)',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          color: 'var(--color-text-secondary)',
          marginBottom: showSales ? '12px' : '0',
        }}
      >
        {showSales ? 'Hide' : 'Show'} Auto Sales Impact
      </button>

      <AnimatePresence>
        {showSales && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {salesData.map((d, i) => (
                <div key={d.year} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', width: '32px' }}>
                    {d.year}
                  </span>
                  <div style={{ flex: 1, height: '20px', backgroundColor: 'var(--color-surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.sales / 17) * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      style={{
                        height: '100%',
                        borderRadius: '4px',
                        backgroundColor: d.sales < 14 ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '6px',
                      }}
                    >
                      <span style={{ fontSize: '9px', fontWeight: 600, color: 'white' }}>
                        {d.sales}M units
                      </span>
                    </motion.div>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', width: '50px' }}>
                    {d.financed}% financed
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
