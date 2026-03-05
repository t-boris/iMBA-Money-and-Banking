'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 };

type TabId = 'crash' | 'banking' | 'deflation' | 'response';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'crash', label: 'Stock Crash', icon: '📉' },
  { id: 'banking', label: 'Bank Failures', icon: '🏦' },
  { id: 'deflation', label: 'Deflation Spiral', icon: '🌀' },
  { id: 'response', label: 'Policy Response', icon: '⚖️' },
];

// ── Stock Market Crash ──
function StockCrashView() {
  const [showMarginCalls, setShowMarginCalls] = useState(false);

  const pricePoints = [
    { date: 'Sep 1929', price: 381, label: 'Peak' },
    { date: 'Oct 24', price: 299, label: 'Black Thursday' },
    { date: 'Oct 28', price: 260, label: 'Black Monday' },
    { date: 'Oct 29', price: 230, label: 'Black Tuesday' },
    { date: 'Nov 1929', price: 199, label: 'Partial recovery' },
    { date: 'Jul 1932', price: 41, label: 'Bottom (-89%)' },
  ];

  const WIDTH = 500;
  const HEIGHT = 200;
  const PAD = { top: 20, right: 30, bottom: 40, left: 50 };
  const cw = WIDTH - PAD.left - PAD.right;
  const ch = HEIGHT - PAD.top - PAD.bottom;

  const x = (i: number) => PAD.left + (i / (pricePoints.length - 1)) * cw;
  const y = (price: number) => PAD.top + ch - ((price - 30) / (390 - 30)) * ch;

  const pathD = pricePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.price)}`).join(' ');

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
        The DJIA fell <strong style={{ color: 'rgb(239, 68, 68)' }}>89%</strong> from its 1929 peak to its 1932 bottom.
        Margin calls forced leveraged investors to sell, driving prices lower in a vicious cycle.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ width: '100%', maxWidth: WIDTH }}>
          {/* Grid lines */}
          {[100, 200, 300].map((val) => (
            <g key={val}>
              <line x1={PAD.left} y1={y(val)} x2={WIDTH - PAD.right} y2={y(val)} stroke="var(--color-surface-2)" strokeDasharray="4,4" />
              <text x={PAD.left - 6} y={y(val) + 4} textAnchor="end" fill="var(--color-text-muted)" fontSize="9">{val}</text>
            </g>
          ))}

          {/* Price line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="rgb(239, 68, 68)"
            strokeWidth={2.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Data points */}
          {pricePoints.map((p, i) => (
            <g key={p.date}>
              <motion.circle
                cx={x(i)}
                cy={y(p.price)}
                r={4}
                fill="rgb(239, 68, 68)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (i / pricePoints.length) * 1.5 + 0.2 }}
              />
              <text x={x(i)} y={HEIGHT - 8} textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">
                {p.date}
              </text>
              <text x={x(i)} y={y(p.price) - 10} textAnchor="middle" fill="var(--color-text-secondary)" fontSize="8" fontWeight={600}>
                {p.price}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Margin call cascade */}
      <div style={{ marginTop: '12px' }}>
        <button
          onClick={() => setShowMarginCalls((s) => !s)}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: '1px solid var(--color-surface-2)',
            backgroundColor: 'var(--color-surface-0)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
          }}
        >
          {showMarginCalls ? 'Hide' : 'Show'} Margin Call Cascade
        </button>

        <AnimatePresence>
          {showMarginCalls && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                {[
                  { step: '1', text: 'Prices fall', color: 'rgb(245, 158, 11)' },
                  { step: '2', text: 'Broker issues margin call', color: 'rgb(239, 68, 68)' },
                  { step: '3', text: "Investor can't pay", color: 'rgb(220, 38, 38)' },
                  { step: '4', text: 'Forced liquidation', color: 'rgb(185, 28, 28)' },
                  { step: '5', text: 'More selling pressure', color: 'rgb(153, 27, 27)' },
                  { step: '→', text: 'Repeat (downward spiral)', color: 'rgb(99, 102, 241)' },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.12 }}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                      border: `1px solid ${item.color}`,
                      fontSize: '11px',
                      fontWeight: 600,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span style={{ fontSize: '10px', opacity: 0.7 }}>{item.step}</span> {item.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Banking Collapse ──
function BankingCollapseView() {
  const [animatedCount, setAnimatedCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const TARGET = 9000;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAnimatedCount((prev) => {
        const next = prev + Math.floor(Math.random() * 300) + 100;
        if (next >= TARGET) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return TARGET;
        }
        return next;
      });
    }, 50);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const yearlyData = [
    { year: '1929', failures: 659, pct: 7 },
    { year: '1930', failures: 1352, pct: 15 },
    { year: '1931', failures: 2294, pct: 26 },
    { year: '1932', failures: 1456, pct: 16 },
    { year: '1933', failures: 4004, pct: 44 },
  ];

  return (
    <div>
      {/* Animated counter */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <motion.div
          style={{ fontSize: '48px', fontWeight: 800, color: 'rgb(239, 68, 68)', fontVariantNumeric: 'tabular-nums' }}
        >
          {animatedCount.toLocaleString()}
        </motion.div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
          Banks Failed (1929-1933)
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          Nearly half of all U.S. banks were destroyed
        </div>
      </div>

      {/* Year-by-year bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {yearlyData.map((d, i) => (
          <div key={d.year} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', width: '36px' }}>
              {d.year}
            </span>
            <div style={{ flex: 1, height: '24px', backgroundColor: 'var(--color-surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(d.failures / 4004) * 100}%` }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{
                  height: '100%',
                  borderRadius: '4px',
                  background: `linear-gradient(90deg, rgb(239, 68, 68), rgb(185, 28, 28))`,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '8px',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>
                  {d.failures.toLocaleString()} failures
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '12px',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: 'color-mix(in srgb, rgb(239, 68, 68) 8%, transparent)',
        fontSize: '12px',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: 'rgb(239, 68, 68)' }}>Contagion mechanism:</strong> Each bank failure destroyed deposits, reducing spending
        and causing more loan defaults at other banks. Without deposit insurance, rational depositors ran on any bank that seemed vulnerable.
      </div>
    </div>
  );
}

// ── Deflation Spiral ──
function DeflationSpiralView() {
  const [step, setStep] = useState(0);

  const spiralSteps = [
    { label: 'Prices Fall', detail: 'CPI declined 25% from 1929 to 1933', color: 'rgb(59, 130, 246)', icon: '📉' },
    { label: 'Real Debt Rises', detail: 'Fixed dollar debts become harder to repay', color: 'rgb(139, 92, 246)', icon: '💰' },
    { label: 'Defaults Spike', detail: 'Borrowers cannot service debts at lower prices', color: 'rgb(239, 68, 68)', icon: '💥' },
    { label: 'Banks Fail', detail: 'Loan losses wipe out bank capital', color: 'rgb(220, 38, 38)', icon: '🏦' },
    { label: 'Credit Contracts', detail: 'Surviving banks cut lending to preserve capital', color: 'rgb(185, 28, 28)', icon: '🚫' },
    { label: 'Spending Falls', detail: 'Less credit → less spending → less production', color: 'rgb(153, 27, 27)', icon: '⬇️' },
    { label: 'Prices Fall Further', detail: 'Weak demand drives prices even lower', color: 'rgb(127, 29, 29)', icon: '🔄' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % spiralSteps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [spiralSteps.length]);

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
        Deflation creates a self-reinforcing doom loop: falling prices increase real debt burdens,
        causing defaults that destroy banks, contract credit, and push prices even lower.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {spiralSteps.map((s, i) => (
          <motion.div
            key={s.label}
            animate={{
              scale: i === step ? 1.02 : 1,
              borderColor: i === step ? s.color : 'var(--color-surface-2)',
              backgroundColor: i === step
                ? `color-mix(in srgb, ${s.color} 10%, var(--color-surface-0))`
                : 'var(--color-surface-0)',
            }}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-surface-2)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '18px' }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: i === step ? s.color : 'var(--color-text-primary)' }}>
                {i + 1}. {s.label}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{s.detail}</div>
            </div>
            {i < spiralSteps.length - 1 && (
              <motion.span
                animate={{ opacity: i === step ? [0.3, 1, 0.3] : 0.3 }}
                transition={{ repeat: i === step ? Infinity : 0, duration: 1 }}
                style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}
              >
                ↓
              </motion.span>
            )}
            {i === spiralSteps.length - 1 && (
              <motion.span
                animate={{ opacity: i === step ? [0.3, 1, 0.3] : 0.3, rotate: i === step ? [0, 180] : 0 }}
                transition={{ repeat: i === step ? Infinity : 0, duration: 1 }}
                style={{ fontSize: '14px', color: 'rgb(239, 68, 68)' }}
              >
                ↻
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Policy Response Timeline ──
function PolicyResponseView() {
  const responses = [
    {
      date: 'Mar 6, 1933',
      title: 'Bank Holiday',
      detail: 'FDR closes all banks for 4 days. Examiners check which are solvent.',
      color: 'rgb(245, 158, 11)',
      icon: '🔒',
    },
    {
      date: 'Mar 9, 1933',
      title: 'Emergency Banking Act',
      detail: 'Gives Treasury power to reopen sound banks with RFC capital injections.',
      color: 'rgb(59, 130, 246)',
      icon: '📜',
    },
    {
      date: 'Jun 1933',
      title: 'Glass-Steagall Act',
      detail: 'Separates commercial and investment banking. Creates FDIC.',
      color: 'rgb(99, 102, 241)',
      icon: '⚖️',
    },
    {
      date: 'Jan 1, 1934',
      title: 'FDIC Opens',
      detail: 'Deposit insurance begins at $2,500/account. Bank runs effectively end.',
      color: 'rgb(16, 185, 129)',
      icon: '🛡️',
    },
    {
      date: '1933-1938',
      title: 'New Deal Programs',
      detail: 'WPA, CCC, Social Security — massive fiscal expansion creates jobs and safety nets.',
      color: 'rgb(34, 197, 94)',
      icon: '🏗️',
    },
  ];

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
        The Depression produced the modern financial safety net. Each response targeted a specific failure.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {responses.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, ...spring }}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-surface-2)',
              backgroundColor: 'var(--color-surface-0)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{r.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: r.color }}>{r.date}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{r.title}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{r.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{
        marginTop: '12px',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: 'color-mix(in srgb, rgb(16, 185, 129) 8%, transparent)',
        border: '1px solid color-mix(in srgb, rgb(16, 185, 129) 30%, transparent)',
        fontSize: '12px',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: 'rgb(16, 185, 129)' }}>Result:</strong> After FDIC insurance began,
        bank runs essentially disappeared from the U.S. financial system for 75 years — until the 2008 crisis
        revealed that the shadow banking system had no equivalent protection.
      </div>
    </div>
  );
}

// ── Main Component ──
export default function GreatDepressionDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('crash');

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
          The Great Depression (1929-1933)
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
          The worst financial crisis in American history — and the reforms it produced
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
            {activeTab === 'crash' && <StockCrashView />}
            {activeTab === 'banking' && <BankingCollapseView />}
            {activeTab === 'deflation' && <DeflationSpiralView />}
            {activeTab === 'response' && <PolicyResponseView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
