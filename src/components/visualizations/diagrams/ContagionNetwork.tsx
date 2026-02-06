'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ContagionNetworkProps {
  className?: string;
}

type ContagionChannel = 'information' | 'interconnection';

interface BankNode {
  id: number;
  x: number;
  y: number;
  label: string;
  central?: boolean;
}

type BankState = 'healthy' | 'failing' | 'infected' | 'uncertain';

const bankNodes: BankNode[] = [
  { id: 0, x: 300, y: 180, label: 'Bank A', central: true },
  { id: 1, x: 160, y: 80, label: 'Bank B' },
  { id: 2, x: 440, y: 80, label: 'Bank C' },
  { id: 3, x: 520, y: 220, label: 'Bank D' },
  { id: 4, x: 460, y: 360, label: 'Bank E' },
  { id: 5, x: 300, y: 400, label: 'Bank F' },
  { id: 6, x: 140, y: 360, label: 'Bank G' },
  { id: 7, x: 80, y: 220, label: 'Bank H' },
  { id: 8, x: 230, y: 280, label: 'Bank I' },
  { id: 9, x: 370, y: 280, label: 'Bank J' },
];

// Interbank connections (link indices)
const interbankLinks: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 7],
  [0, 8],
  [0, 9],
  [1, 2],
  [1, 7],
  [2, 3],
  [3, 4],
  [4, 5],
  [4, 9],
  [5, 6],
  [6, 7],
  [6, 8],
  [8, 9],
];

const stateColors: Record<BankState, string> = {
  healthy: 'rgb(16, 185, 129)',
  failing: 'rgb(239, 68, 68)',
  infected: 'rgb(239, 68, 68)',
  uncertain: 'rgb(245, 158, 11)',
};

const consequences = [
  { icon: '\u{1F6AB}', text: 'Credit stops flowing' },
  { icon: '\u{1F4C9}', text: 'Markets freeze up' },
  { icon: '\u{1F4C9}', text: 'Economy contracts' },
];

// Steps for interconnection contagion (which banks get affected at each wave)
const interconnectionWaves = [
  [0], // Wave 0: initial failure
  [1, 2, 3, 7, 8, 9], // Wave 1: direct connections to bank 0
  [4, 5, 6], // Wave 2: second-degree connections
];

export function ContagionNetwork({ className }: ContagionNetworkProps) {
  const [channel, setChannel] = useState<ContagionChannel>('information');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentWave, setCurrentWave] = useState(-1);
  const [bankStates, setBankStates] = useState<BankState[]>(
    bankNodes.map(() => 'healthy'),
  );
  const [showConsequences, setShowConsequences] = useState(false);

  const resetNetwork = useCallback(() => {
    setIsAnimating(false);
    setCurrentWave(-1);
    setBankStates(bankNodes.map(() => 'healthy'));
    setShowConsequences(false);
  }, []);

  // Auto-advance contagion waves
  useEffect(() => {
    if (!isAnimating || currentWave < 0) return;

    if (channel === 'information') {
      // Information contagion: all banks turn uncertain at once
      if (currentWave === 0) {
        setBankStates(
          bankNodes.map((b) => (b.central ? 'failing' : 'healthy')),
        );
        const timer = setTimeout(() => setCurrentWave(1), 800);
        return () => clearTimeout(timer);
      }
      if (currentWave === 1) {
        setBankStates(
          bankNodes.map((b) => (b.central ? 'failing' : 'uncertain')),
        );
        const timer = setTimeout(() => {
          setShowConsequences(true);
          setIsAnimating(false);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } else {
      // Interconnection contagion: wave by wave
      if (currentWave < interconnectionWaves.length) {
        setBankStates((prev) => {
          const next = [...prev];
          for (let w = 0; w <= currentWave; w++) {
            for (const idx of interconnectionWaves[w]) {
              next[idx] = w === 0 ? 'failing' : 'infected';
            }
          }
          return next;
        });

        if (currentWave < interconnectionWaves.length - 1) {
          const timer = setTimeout(() => setCurrentWave((w) => w + 1), 1200);
          return () => clearTimeout(timer);
        } else {
          const timer = setTimeout(() => {
            setShowConsequences(true);
            setIsAnimating(false);
          }, 1200);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [isAnimating, currentWave, channel]);

  const triggerFailure = useCallback(() => {
    resetNetwork();
    // Small delay to ensure reset happens first
    setTimeout(() => {
      setIsAnimating(true);
      setCurrentWave(0);
    }, 50);
  }, [resetNetwork]);

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          Financial Contagion: How Failures Spread
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Click &quot;Trigger Failure&quot; to see contagion spread through the
          banking system
        </p>
      </div>

      {/* Channel Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={() => {
            setChannel('information');
            resetNetwork();
          }}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor:
              channel === 'information'
                ? 'rgba(245, 158, 11, 0.15)'
                : 'var(--color-surface-1)',
            color:
              channel === 'information'
                ? 'rgb(245, 158, 11)'
                : 'var(--color-text-secondary)',
            fontWeight: channel === 'information' ? 600 : 400,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Information Contagion
        </button>
        <button
          onClick={() => {
            setChannel('interconnection');
            resetNetwork();
          }}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor:
              channel === 'interconnection'
                ? 'rgba(239, 68, 68, 0.15)'
                : 'var(--color-surface-1)',
            color:
              channel === 'interconnection'
                ? 'rgb(239, 68, 68)'
                : 'var(--color-text-secondary)',
            fontWeight: channel === 'interconnection' ? 600 : 400,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Interconnection Contagion
        </button>
      </div>

      {/* Trigger Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={triggerFailure}
          disabled={isAnimating}
          style={{
            padding: '12px 28px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: isAnimating
              ? 'var(--color-surface-2)'
              : 'rgba(239, 68, 68, 0.15)',
            color: isAnimating
              ? 'var(--color-text-muted)'
              : 'rgb(239, 68, 68)',
            fontWeight: 600,
            fontSize: '14px',
            cursor: isAnimating ? 'not-allowed' : 'pointer',
          }}
        >
          {isAnimating ? 'Spreading...' : 'Trigger Failure'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetNetwork}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: 'var(--color-surface-1)',
            color: 'var(--color-text-secondary)',
            fontWeight: 500,
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Reset
        </motion.button>
      </div>

      {/* Network Visualization */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
        }}
      >
        <svg
          viewBox="0 0 600 460"
          style={{ width: '100%', maxWidth: '600px', height: 'auto', display: 'block', margin: '0 auto' }}
        >
          {/* Interbank Links */}
          {interbankLinks.map(([a, b], i) => {
            const nodeA = bankNodes[a];
            const nodeB = bankNodes[b];
            const stateA = bankStates[a];
            const stateB = bankStates[b];
            const isInfectedLink =
              channel === 'interconnection' &&
              (stateA === 'failing' || stateA === 'infected') &&
              (stateB === 'failing' || stateB === 'infected');

            return (
              <motion.line
                key={`link-${i}`}
                x1={nodeA.x}
                y1={nodeA.y}
                x2={nodeB.x}
                y2={nodeB.y}
                stroke={
                  isInfectedLink
                    ? 'rgba(239, 68, 68, 0.6)'
                    : 'var(--color-surface-2)'
                }
                strokeWidth={isInfectedLink ? 3 : 1.5}
                animate={{
                  stroke: isInfectedLink
                    ? 'rgba(239, 68, 68, 0.6)'
                    : 'var(--color-surface-2)',
                  strokeWidth: isInfectedLink ? 3 : 1.5,
                }}
                transition={{ duration: 0.4 }}
              />
            );
          })}

          {/* Bank Nodes */}
          {bankNodes.map((bank) => {
            const state = bankStates[bank.id];
            const color = stateColors[state];
            const r = bank.central ? 28 : 22;

            return (
              <g key={bank.id}>
                {/* Pulse ring for failing/infected */}
                {(state === 'failing' || state === 'infected') && (
                  <motion.circle
                    cx={bank.x}
                    cy={bank.y}
                    r={r + 8}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0.6, 0.2, 0.6],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Uncertainty ring for information contagion */}
                {state === 'uncertain' && (
                  <motion.circle
                    cx={bank.x}
                    cy={bank.y}
                    r={r + 6}
                    fill="none"
                    stroke="rgba(245, 158, 11, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="4,3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Bank circle */}
                <motion.circle
                  cx={bank.x}
                  cy={bank.y}
                  r={r}
                  fill={color}
                  stroke="white"
                  strokeWidth="2"
                  animate={{ fill: color }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                />

                {/* Bank label */}
                <text
                  x={bank.x}
                  y={bank.y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize={bank.central ? '11' : '9'}
                  fontWeight="600"
                >
                  {bank.label.replace('Bank ', '')}
                </text>

                {/* State indicator label below node */}
                {state !== 'healthy' && (
                  <motion.text
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    x={bank.x}
                    y={bank.y + r + 16}
                    textAnchor="middle"
                    fill={color}
                    fontSize="9"
                    fontWeight="600"
                  >
                    {state === 'failing'
                      ? 'FAILED'
                      : state === 'infected'
                        ? 'INFECTED'
                        : 'UNCERTAIN'}
                  </motion.text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Channel Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={channel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            padding: '16px',
            borderRadius: '12px',
            backgroundColor:
              channel === 'information'
                ? 'rgba(245, 158, 11, 0.08)'
                : 'rgba(239, 68, 68, 0.08)',
            border: `1px solid ${
              channel === 'information'
                ? 'rgba(245, 158, 11, 0.2)'
                : 'rgba(239, 68, 68, 0.2)'
            }`,
            marginBottom: '20px',
          }}
        >
          {channel === 'information' ? (
            <>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgb(245, 158, 11)',
                  marginBottom: '8px',
                }}
              >
                Information Contagion
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: '1.6',
                }}
              >
                When one bank fails, depositors at <strong>all banks</strong>{' '}
                become uncertain. They <strong>can&apos;t distinguish</strong>{' '}
                between healthy and troubled banks. The result: runs on
                perfectly healthy institutions. All banks turn yellow
                (uncertain) regardless of their actual condition.
              </p>
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgb(239, 68, 68)',
                  marginBottom: '8px',
                }}
              >
                Interconnection Contagion
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: '1.6',
                }}
              >
                Banks lend to each other (interbank market). When Bank A fails,
                banks directly connected lose their interbank deposits. Those
                losses can make <strong>second-tier banks</strong> fail too,
                creating a <strong>domino effect</strong> through the network.
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Consequences */}
      <AnimatePresence>
        {showConsequences && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '20px',
                backgroundColor: 'rgba(239, 68, 68, 0.06)',
                borderRadius: '12px',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgb(239, 68, 68)',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
              >
                System-Wide Consequences
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                }}
              >
                {consequences.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    style={{
                      padding: '14px',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      borderRadius: '10px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                      {c.icon}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {c.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Toggle between contagion channels and trigger a bank failure to see how
        it spreads
      </p>
    </div>
  );
}
