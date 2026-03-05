'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/visualizations';

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 };

type TabId = 'gdp-identity' | 'stimulus' | 'multiplier' | 'interaction';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'gdp-identity', label: 'GDP Identity', icon: '📊' },
  { id: 'stimulus', label: 'Stimulus Checks', icon: '💵' },
  { id: 'multiplier', label: 'Multiplier', icon: '✕' },
  { id: 'interaction', label: 'Fiscal + Monetary', icon: '🤝' },
];

// ── GDP Identity View ──
function GDPIdentityView() {
  const [scenario, setScenario] = useState<'normal' | 'crisis' | 'response'>('normal');

  const scenarios = {
    normal: {
      C: 68, I: 18, G: 17, NX: -3,
      label: 'Normal Economy',
      color: 'rgb(16, 185, 129)',
      note: 'Consumer spending (C) drives ~68% of U.S. GDP. Investment (I) and Government (G) make up most of the rest.',
    },
    crisis: {
      C: 58, I: 10, G: 17, NX: -3,
      label: 'Crisis Shock',
      color: 'rgb(239, 68, 68)',
      note: 'During a crisis, C drops as households retrench and I collapses as businesses freeze. GDP shrinks rapidly.',
    },
    response: {
      C: 60, I: 11, G: 26, NX: -3,
      label: 'Fiscal Response',
      color: 'rgb(59, 130, 246)',
      note: 'Government increases G through spending programs, partially offsetting the collapse in C and I.',
    },
  };

  const s = scenarios[scenario];
  const total = s.C + s.I + s.G + Math.abs(s.NX);

  const components = [
    { label: 'C (Consumption)', value: s.C, color: 'rgb(99, 102, 241)' },
    { label: 'I (Investment)', value: s.I, color: 'rgb(245, 158, 11)' },
    { label: 'G (Government)', value: s.G, color: 'rgb(16, 185, 129)' },
    { label: 'NX (Net Exports)', value: s.NX, color: 'rgb(239, 68, 68)' },
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Y = C + I + G + NX
        </span>
      </div>

      {/* Scenario buttons */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        {(['normal', 'crisis', 'response'] as const).map((sc) => (
          <button
            key={sc}
            onClick={() => setScenario(sc)}
            style={{
              flex: 1,
              padding: '6px 8px',
              borderRadius: '8px',
              border: `2px solid ${scenario === sc ? scenarios[sc].color : 'var(--color-surface-2)'}`,
              backgroundColor: scenario === sc
                ? `color-mix(in srgb, ${scenarios[sc].color} 12%, transparent)`
                : 'var(--color-surface-0)',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600,
              color: scenario === sc ? scenarios[sc].color : 'var(--color-text-muted)',
            }}
          >
            {scenarios[sc].label}
          </button>
        ))}
      </div>

      {/* Animated bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
        {components.map((comp) => (
          <div key={comp.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', width: '120px' }}>
              {comp.label}
            </span>
            <div style={{ flex: 1, height: '28px', backgroundColor: 'var(--color-surface-2)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
              <motion.div
                animate={{ width: `${Math.abs(comp.value / total) * 100}%` }}
                transition={spring}
                style={{
                  height: '100%',
                  backgroundColor: comp.color,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '8px',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>
                  {comp.value > 0 ? '' : '-'}{Math.abs(comp.value)}%
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: `color-mix(in srgb, ${s.color} 8%, transparent)`,
        border: `1px solid ${s.color}`,
        fontSize: '12px',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: s.color }}>{s.label}:</strong> {s.note}
      </div>
    </div>
  );
}

// ── Stimulus Check Breakdown ──
function StimulusView() {
  const segments = [
    { label: 'Spent', pct: 33, color: 'rgb(16, 185, 129)', detail: 'Groceries, rent, bills — directly boosts GDP' },
    { label: 'Saved', pct: 33, color: 'rgb(59, 130, 246)', detail: 'Builds household buffer — indirect economic support' },
    { label: 'Debt Paydown', pct: 34, color: 'rgb(245, 158, 11)', detail: 'Reduces financial stress — stabilizes balance sheets' },
  ];

  const rounds = [
    { name: 'CARES Act (Apr 2020)', amount: '$1,200', total: '$290B' },
    { name: 'Dec 2020 Package', amount: '$600', total: '$166B' },
    { name: 'ARP (Mar 2021)', amount: '$1,400', total: '$411B' },
  ];

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
        Research shows stimulus checks split roughly into thirds: spent, saved, and used for debt.
        This makes them less potent per dollar than direct government purchases.
      </p>

      {/* Pie-like bar */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          height: '32px',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
        }}>
          {segments.map((seg, i) => (
            <motion.div
              key={seg.label}
              initial={{ width: 0 }}
              animate={{ width: `${seg.pct}%` }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              style={{
                height: '100%',
                backgroundColor: seg.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>
                {seg.label} {seg.pct}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Segment details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
        {segments.map((seg) => (
          <div
            key={seg.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 10px',
              borderRadius: '6px',
              backgroundColor: 'var(--color-surface-0)',
              border: '1px solid var(--color-surface-2)',
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: seg.color, flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: seg.color, width: '80px' }}>{seg.label}</span>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{seg.detail}</span>
          </div>
        ))}
      </div>

      {/* Three rounds */}
      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
        Three Rounds of Stimulus Checks (2020-2021)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {rounds.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 10px',
              borderRadius: '6px',
              backgroundColor: 'var(--color-surface-0)',
              border: '1px solid var(--color-surface-2)',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--color-text-primary)' }}>{r.name}</span>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              {r.amount}/person &middot; {r.total} total
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Multiplier Calculator ──
function MultiplierView() {
  const [deltaG, setDeltaG] = useState(100);
  const [multiplier, setMultiplier] = useState(1.5);

  const deltaY = useMemo(() => deltaG * multiplier, [deltaG, multiplier]);

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
        The spending multiplier determines how much GDP changes for each dollar of government spending.
        Adjust the sliders to see the effect.
      </p>

      {/* Government spending slider */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Government Spending Change (&#916;G)
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgb(16, 185, 129)' }}>
            ${deltaG}B
          </span>
        </div>
        <Slider
          min={10}
          max={500}
          step={10}
          value={deltaG}
          onChange={setDeltaG}
          label=""
        />
      </div>

      {/* Multiplier slider */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Multiplier
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
            {multiplier.toFixed(1)}x
          </span>
        </div>
        <Slider
          min={0.5}
          max={3.0}
          step={0.1}
          value={multiplier}
          onChange={setMultiplier}
          label=""
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
          <span>Boom (crowding out)</span>
          <span>Recession (idle resources)</span>
        </div>
      </div>

      {/* Result */}
      <motion.div
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 0.3 }}
        key={`${deltaG}-${multiplier}`}
        style={{
          padding: '16px',
          borderRadius: '10px',
          backgroundColor: 'color-mix(in srgb, rgb(99, 102, 241) 8%, transparent)',
          border: '1px solid rgb(99, 102, 241)',
          textAlign: 'center',
          marginBottom: '12px',
        }}
      >
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
          &#916;Y = &#916;G &times; Multiplier
        </div>
        <div style={{ fontSize: '28px', fontWeight: 800, color: 'rgb(99, 102, 241)' }}>
          ${deltaY.toFixed(0)}B
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          ${deltaG}B spending &times; {multiplier.toFixed(1)} = ${deltaY.toFixed(0)}B in GDP
        </div>
      </motion.div>

      <div style={{
        padding: '8px 12px',
        borderRadius: '6px',
        backgroundColor: 'var(--color-surface-0)',
        border: '1px solid var(--color-surface-2)',
        fontSize: '11px',
        color: 'var(--color-text-muted)',
        lineHeight: 1.5,
      }}>
        <strong>Why the multiplier varies:</strong> During recessions, workers and factories sit idle,
        so each dollar of spending directly creates jobs and output (multiplier &gt;1).
        During booms, government spending competes with private spending for scarce resources, crowding it out (multiplier &lt;1).
      </div>
    </div>
  );
}

// ── Fiscal + Monetary Interaction ──
function InteractionView() {
  const tools = [
    {
      type: 'Monetary Policy',
      color: 'rgb(99, 102, 241)',
      icon: '🏛️',
      mechanisms: [
        'Lower interest rates to stimulate borrowing',
        'QE to inject reserves and lower long-term rates',
        'Forward guidance to shape expectations',
        'Lender of last resort to prevent bank failures',
      ],
      strengths: 'Fast to deploy (FOMC meets 8x/year)',
      limits: 'Zero lower bound; cannot target specific groups; pushes on a string when banks won\'t lend',
    },
    {
      type: 'Fiscal Policy',
      color: 'rgb(16, 185, 129)',
      icon: '🏛️',
      mechanisms: [
        'Direct government spending (G) on infrastructure/services',
        'Stimulus checks and tax cuts to boost consumption (C)',
        'Unemployment benefits as automatic stabilizers',
        'Targeted programs (PPP, TARP) for specific sectors',
      ],
      strengths: 'Can target specific sectors and demographics',
      limits: 'Slow (requires Congressional approval); increases public debt; political constraints',
    },
  ];

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
        Modern crisis responses combine monetary and fiscal tools. Each has strengths where the other is weak.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        {tools.map((tool) => (
          <div
            key={tool.type}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: `1px solid ${tool.color}`,
              backgroundColor: `color-mix(in srgb, ${tool.color} 6%, var(--color-surface-0))`,
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 700, color: tool.color, marginBottom: '8px' }}>
              {tool.type}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '8px' }}>
              {tool.mechanisms.map((m) => (
                <div key={m} style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'flex', gap: '4px' }}>
                  <span style={{ color: tool.color }}>&#x2022;</span> {m}
                </div>
              ))}
            </div>
            <div style={{
              padding: '6px 8px',
              borderRadius: '6px',
              backgroundColor: 'var(--color-surface-0)',
              fontSize: '10px',
              marginBottom: '4px',
            }}>
              <strong style={{ color: 'rgb(16, 185, 129)' }}>Strength:</strong>{' '}
              <span style={{ color: 'var(--color-text-muted)' }}>{tool.strengths}</span>
            </div>
            <div style={{
              padding: '6px 8px',
              borderRadius: '6px',
              backgroundColor: 'var(--color-surface-0)',
              fontSize: '10px',
            }}>
              <strong style={{ color: 'rgb(239, 68, 68)' }}>Limit:</strong>{' '}
              <span style={{ color: 'var(--color-text-muted)' }}>{tool.limits}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: '10px 14px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, color-mix(in srgb, rgb(99, 102, 241) 8%, transparent), color-mix(in srgb, rgb(16, 185, 129) 8%, transparent))',
        border: '1px solid var(--color-surface-2)',
        fontSize: '12px',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: 'var(--color-text-primary)' }}>2020 Example:</strong> The Fed cut rates to zero and
        launched unlimited QE (monetary). Congress passed $5 trillion in stimulus spending (fiscal).
        Together, they prevented a financial crisis from becoming a depression — the economy recovered faster
        than any previous crisis.
      </div>
    </div>
  );
}

// ── Main Component ──
export default function FiscalResponseDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('gdp-identity');

  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-surface-2)',
        backgroundColor: 'var(--color-surface-1)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '16px 16px 0' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          Fiscal Responses to Financial Crises
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
          How government spending, stimulus checks, and multipliers fight economic collapse
        </p>

        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--color-surface-2)', marginBottom: '16px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium rounded-t-lg transition-colors flex items-center gap-1.5',
                activeTab === tab.id
                  ? 'bg-surface-0 text-primary-500 border-b-2 border-primary-500'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'gdp-identity' && <GDPIdentityView />}
            {activeTab === 'stimulus' && <StimulusView />}
            {activeTab === 'multiplier' && <MultiplierView />}
            {activeTab === 'interaction' && <InteractionView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
