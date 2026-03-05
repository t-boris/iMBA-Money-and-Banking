'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 };

interface Depositor {
  id: number;
  status: 'waiting' | 'withdrawing' | 'paid' | 'denied';
  amount: number;
}

type ViewTab = 'mismatch' | 'simulation' | 'comparison';

const tabs: { id: ViewTab; label: string }[] = [
  { id: 'mismatch', label: 'Maturity Mismatch' },
  { id: 'simulation', label: 'Run Simulation' },
  { id: 'comparison', label: 'Illiquid vs Insolvent' },
];

// ── Maturity Mismatch View ──
function MaturityMismatchView() {
  const [showStress, setShowStress] = useState(false);

  const assets = [
    { label: '30-yr Mortgages', pct: 45, color: 'rgb(99, 102, 241)', maturity: '30 years' },
    { label: 'Business Loans', pct: 25, color: 'rgb(79, 70, 229)', maturity: '5-10 years' },
    { label: 'Auto Loans', pct: 15, color: 'rgb(129, 140, 248)', maturity: '3-5 years' },
    { label: 'Cash & Reserves', pct: 15, color: 'rgb(16, 185, 129)', maturity: 'Instant' },
  ];

  const liabilities = [
    { label: 'Demand Deposits', pct: 55, color: 'rgb(239, 68, 68)', maturity: 'On demand' },
    { label: 'Savings Accounts', pct: 20, color: 'rgb(245, 158, 11)', maturity: '0-30 days' },
    { label: 'Short CDs', pct: 10, color: 'rgb(234, 179, 8)', maturity: '3-12 months' },
    { label: 'Equity Capital', pct: 15, color: 'rgb(59, 130, 246)', maturity: 'Permanent' },
  ];

  return (
    <div>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
        Banks borrow short and lend long. The left side shows{' '}
        <strong style={{ color: 'var(--color-text-primary)' }}>long-term assets</strong> that cannot be quickly sold;
        the right shows <strong style={{ color: 'var(--color-text-primary)' }}>short-term liabilities</strong> that depositors
        can withdraw any time.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'stretch' }}>
        {/* Assets column */}
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 600, textAlign: 'center', marginBottom: '8px', color: 'rgb(99, 102, 241)' }}>
            ASSETS (Long-term)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {assets.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.1, ...spring }}
                style={{
                  height: `${Math.max(a.pct * 1.2, 30)}px`,
                  backgroundColor: showStress && a.label !== 'Cash & Reserves'
                    ? 'color-mix(in srgb, rgb(239, 68, 68) 20%, ' + a.color + ')'
                    : a.color,
                  borderRadius: '6px',
                  padding: '6px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>{a.label}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}>{a.maturity}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gap arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
          <motion.div
            animate={{ scale: showStress ? [1, 1.3, 1] : 1, color: showStress ? 'rgb(239, 68, 68)' : 'var(--color-text-muted)' }}
            transition={{ repeat: showStress ? Infinity : 0, duration: 1 }}
            style={{ fontSize: '28px', fontWeight: 700 }}
          >
            &#x21C6;
          </motion.div>
          <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', textAlign: 'center', maxWidth: '60px' }}>
            {showStress ? 'GAP EXPOSED' : 'Maturity Gap'}
          </span>
        </div>

        {/* Liabilities column */}
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 600, textAlign: 'center', marginBottom: '8px', color: 'rgb(239, 68, 68)' }}>
            LIABILITIES (Short-term)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {liabilities.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ scaleX: 0, originX: 1 }}
                animate={{
                  scaleX: 1,
                  opacity: showStress && l.label === 'Demand Deposits' ? [1, 0.5, 1] : 1,
                }}
                transition={{
                  scaleX: { delay: i * 0.1, ...spring },
                  opacity: { repeat: showStress ? Infinity : 0, duration: 0.8 },
                }}
                style={{
                  height: `${Math.max(l.pct * 1.2, 30)}px`,
                  backgroundColor: l.color,
                  borderRadius: '6px',
                  padding: '6px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>{l.label}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}>{l.maturity}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <button
          onClick={() => setShowStress((s) => !s)}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: showStress ? 'rgb(239, 68, 68)' : 'rgb(99, 102, 241)',
            color: 'white',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {showStress ? 'Reset' : 'Trigger Stress'}
        </button>
      </div>
    </div>
  );
}

// ── Run Simulation View ──
function RunSimulationView() {
  const TOTAL_CASH = 15;
  const TOTAL_DEPOSITORS = 10;
  const DEPOSIT_EACH = 10;

  const [depositors, setDepositors] = useState<Depositor[]>([]);
  const [cashRemaining, setCashRemaining] = useState(TOTAL_CASH);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDepositors(
      Array.from({ length: TOTAL_DEPOSITORS }, (_, i) => ({
        id: i,
        status: 'waiting' as const,
        amount: DEPOSIT_EACH,
      }))
    );
    setCashRemaining(TOTAL_CASH);
    setIsRunning(false);
    setPhase('idle');
  }, []);

  useEffect(() => {
    reset();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [reset]);

  const triggerRun = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('running');
    setIsRunning(true);

    let cash = TOTAL_CASH;
    let index = 0;

    const processNext = () => {
      if (index >= TOTAL_DEPOSITORS) {
        setPhase('done');
        setIsRunning(false);
        return;
      }

      const i = index;
      index++;

      setDepositors((prev) => {
        const next = [...prev];
        if (cash >= DEPOSIT_EACH) {
          next[i] = { ...next[i], status: 'withdrawing' };
        } else {
          next[i] = { ...next[i], status: 'withdrawing' };
        }
        return next;
      });

      timerRef.current = setTimeout(() => {
        setDepositors((prev) => {
          const next = [...prev];
          if (cash >= DEPOSIT_EACH) {
            cash -= DEPOSIT_EACH;
            setCashRemaining(cash);
            next[i] = { ...next[i], status: 'paid' };
          } else {
            next[i] = { ...next[i], status: 'denied' };
            // Mark remaining as denied too
            for (let j = i + 1; j < TOTAL_DEPOSITORS; j++) {
              next[j] = { ...next[j], status: 'denied' };
            }
            index = TOTAL_DEPOSITORS;
            setPhase('done');
            setIsRunning(false);
          }
          return next;
        });

        if (cash >= DEPOSIT_EACH || index < TOTAL_DEPOSITORS) {
          timerRef.current = setTimeout(processNext, 600);
        }
      }, 400);
    };

    processNext();
  }, [phase]);

  const paidCount = depositors.filter((d) => d.status === 'paid').length;
  const deniedCount = depositors.filter((d) => d.status === 'denied').length;

  return (
    <div>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
        This bank holds <strong style={{ color: 'var(--color-text-primary)' }}>$15M in cash</strong> but owes{' '}
        <strong style={{ color: 'var(--color-text-primary)' }}>$100M to 10 depositors</strong> ($10M each).
        The rest is locked in long-term loans. Watch what happens when everyone tries to withdraw.
      </p>

      {/* Cash gauge */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Bank Cash Reserves</span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: cashRemaining <= 5 ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)' }}>
            ${cashRemaining}M / ${TOTAL_CASH}M
          </span>
        </div>
        <div style={{ height: '12px', backgroundColor: 'var(--color-surface-2)', borderRadius: '6px', overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${(cashRemaining / TOTAL_CASH) * 100}%` }}
            transition={spring}
            style={{
              height: '100%',
              borderRadius: '6px',
              backgroundColor: cashRemaining <= 5 ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)',
            }}
          />
        </div>
      </div>

      {/* Depositor queue */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '16px' }}>
        {depositors.map((d) => (
          <motion.div
            key={d.id}
            animate={{
              scale: d.status === 'withdrawing' ? [1, 1.1, 1] : 1,
              backgroundColor:
                d.status === 'waiting' ? 'var(--color-surface-2)' :
                d.status === 'withdrawing' ? 'rgb(245, 158, 11)' :
                d.status === 'paid' ? 'rgb(16, 185, 129)' :
                'rgb(239, 68, 68)',
            }}
            transition={spring}
            style={{
              borderRadius: '10px',
              padding: '10px 6px',
              textAlign: 'center',
              border: '1px solid var(--color-surface-2)',
            }}
          >
            <div style={{ fontSize: '20px', marginBottom: '2px' }}>
              {d.status === 'waiting' ? '🧑' :
               d.status === 'withdrawing' ? '🏃' :
               d.status === 'paid' ? '✅' : '❌'}
            </div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: d.status === 'waiting' ? 'var(--color-text-muted)' : 'white' }}>
              #{d.id + 1} · ${d.amount}M
            </div>
            <div style={{ fontSize: '9px', color: d.status === 'waiting' ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.8)' }}>
              {d.status === 'waiting' ? 'In line' :
               d.status === 'withdrawing' ? 'Withdrawing...' :
               d.status === 'paid' ? 'Got cash' : 'No cash left'}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Results */}
      {phase === 'done' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '12px 16px',
            borderRadius: '10px',
            backgroundColor: 'color-mix(in srgb, rgb(239, 68, 68) 10%, transparent)',
            border: '1px solid rgb(239, 68, 68)',
            marginBottom: '16px',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(239, 68, 68)', marginBottom: '4px' }}>
            Bank Run Result: {paidCount} paid, {deniedCount} denied
          </p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            Only the first {paidCount} depositors got their money. The remaining {deniedCount} lost access to their
            savings — even though the bank&apos;s long-term assets could eventually cover everyone. This is why first-come,
            first-served creates panic: being early is rational, so everyone runs.
          </p>
        </motion.div>
      )}

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={phase === 'idle' ? triggerRun : reset}
          disabled={isRunning}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: isRunning ? 'var(--color-surface-2)' : phase === 'idle' ? 'rgb(239, 68, 68)' : 'rgb(99, 102, 241)',
            color: isRunning ? 'var(--color-text-muted)' : 'white',
            fontSize: '13px',
            fontWeight: 600,
            cursor: isRunning ? 'not-allowed' : 'pointer',
          }}
        >
          {phase === 'idle' ? 'Start Bank Run' : isRunning ? 'Running...' : 'Reset Simulation'}
        </button>
      </div>
    </div>
  );
}

// ── Illiquid vs Insolvent Comparison ──
function ComparisonView() {
  const [activeCase, setActiveCase] = useState<'illiquid' | 'insolvent'>('illiquid');

  const cases = {
    illiquid: {
      title: 'Illiquid Bank',
      subtitle: 'Needs time, not money',
      assets: { total: 120, cash: 5, longTerm: 115 },
      liabilities: { total: 100, deposits: 85, other: 15 },
      equity: 20,
      color: 'rgb(245, 158, 11)',
      verdict: 'SOLVENT — assets ($120M) exceed liabilities ($100M). Needs a bridge loan to survive the run.',
      action: 'Lender of Last Resort should lend against good collateral.',
    },
    insolvent: {
      title: 'Insolvent Bank',
      subtitle: 'Broken beyond repair',
      assets: { total: 80, cash: 3, longTerm: 77 },
      liabilities: { total: 100, deposits: 85, other: 15 },
      equity: -20,
      color: 'rgb(239, 68, 68)',
      verdict: 'INSOLVENT — liabilities ($100M) exceed assets ($80M). Even liquidating everything leaves a $20M hole.',
      action: 'Should be closed by regulators. Lending to it would waste public funds.',
    },
  };

  const c = cases[activeCase];
  const maxVal = Math.max(c.assets.total, c.liabilities.total);

  return (
    <div>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
        The critical distinction in crisis management: an <strong style={{ color: 'rgb(245, 158, 11)' }}>illiquid</strong> bank
        should be rescued; an <strong style={{ color: 'rgb(239, 68, 68)' }}>insolvent</strong> bank should be closed.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {(['illiquid', 'insolvent'] as const).map((caseId) => (
          <button
            key={caseId}
            onClick={() => setActiveCase(caseId)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: `2px solid ${activeCase === caseId ? cases[caseId].color : 'var(--color-surface-2)'}`,
              backgroundColor: activeCase === caseId
                ? `color-mix(in srgb, ${cases[caseId].color} 10%, transparent)`
                : 'var(--color-surface-0)',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: cases[caseId].color }}>{cases[caseId].title}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{cases[caseId].subtitle}</div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
            {/* Assets bar */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-text-secondary)' }}>
                Total Assets: ${c.assets.total}M
              </div>
              <div style={{ height: '40px', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', overflow: 'hidden', display: 'flex' }}>
                <motion.div
                  animate={{ width: `${(c.assets.cash / maxVal) * 100}%` }}
                  transition={spring}
                  style={{ height: '100%', backgroundColor: 'rgb(16, 185, 129)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '9px', fontWeight: 600, color: 'white' }}>Cash</span>
                </motion.div>
                <motion.div
                  animate={{ width: `${(c.assets.longTerm / maxVal) * 100}%` }}
                  transition={spring}
                  style={{ height: '100%', backgroundColor: 'rgb(99, 102, 241)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '9px', fontWeight: 600, color: 'white' }}>Long-term</span>
                </motion.div>
              </div>
            </div>
            {/* Liabilities bar */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-text-secondary)' }}>
                Total Liabilities: ${c.liabilities.total}M
              </div>
              <div style={{ height: '40px', backgroundColor: 'var(--color-surface-2)', borderRadius: '8px', overflow: 'hidden', display: 'flex' }}>
                <motion.div
                  animate={{ width: `${(c.liabilities.deposits / maxVal) * 100}%` }}
                  transition={spring}
                  style={{ height: '100%', backgroundColor: 'rgb(239, 68, 68)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '9px', fontWeight: 600, color: 'white' }}>Deposits</span>
                </motion.div>
                <motion.div
                  animate={{ width: `${(c.liabilities.other / maxVal) * 100}%` }}
                  transition={spring}
                  style={{ height: '100%', backgroundColor: 'rgb(245, 158, 11)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '9px', fontWeight: 600, color: 'white' }}>Other</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Equity indicator */}
          <div style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: `color-mix(in srgb, ${c.color} 10%, transparent)`,
            border: `1px solid ${c.color}`,
            marginBottom: '10px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: c.color, marginBottom: '4px' }}>
              Equity: ${c.equity}M {c.equity < 0 ? '(Negative!)' : ''}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{c.verdict}</div>
          </div>
          <div style={{
            padding: '8px 14px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-surface-1)',
            border: '1px solid var(--color-surface-2)',
          }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Correct response:</strong> {c.action}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Main Component ──
export default function BankRunSimulator() {
  const [activeTab, setActiveTab] = useState<ViewTab>('mismatch');

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
          Bank Run Mechanics
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
          Why maturity mismatch makes banks fragile, and why rational depositors run
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--color-surface-2)', marginBottom: '16px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium rounded-t-lg transition-colors',
                activeTab === tab.id
                  ? 'bg-surface-0 text-primary-500 border-b-2 border-primary-500'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {tab.label}
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
            {activeTab === 'mismatch' && <MaturityMismatchView />}
            {activeTab === 'simulation' && <RunSimulationView />}
            {activeTab === 'comparison' && <ComparisonView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
