'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 };

interface Crisis {
  id: string;
  year: string;
  name: string;
  creditBoom: string;
  badInvestment: string;
  fundingRun: string;
  international: string;
  outcome: string;
  color: string;
}

const crises: Crisis[] = [
  {
    id: '1873',
    year: '1873',
    name: 'Long Depression',
    creditBoom: 'Railroad bonds financed by European capital',
    badInvestment: 'Overbuilt railways with no traffic',
    fundingRun: 'Jay Cooke & Co. fails; bank panic follows',
    international: 'Spread from Vienna to New York to London',
    outcome: '6 years of global depression, 89 railroad bankruptcies',
    color: 'rgb(99, 102, 241)',
  },
  {
    id: '1890',
    year: '1890',
    name: 'Baring Crisis',
    creditBoom: 'British lending to Argentine infrastructure',
    badInvestment: 'Argentine real estate and public works',
    fundingRun: 'Barings Bank cannot roll over Argentine debt',
    international: 'London crisis spreads to global markets',
    outcome: 'Bank of England orchestrates rescue; Argentine default',
    color: 'rgb(139, 92, 246)',
  },
  {
    id: '1907',
    year: '1907',
    name: 'Panic of 1907',
    creditBoom: 'Trust companies expand with minimal regulation',
    badInvestment: 'Copper speculation (Heinze scheme)',
    fundingRun: 'Depositor runs on trust companies',
    international: 'Gold drain from earthquake insurance payouts',
    outcome: 'J.P. Morgan private rescue; leads to Fed creation (1913)',
    color: 'rgb(59, 130, 246)',
  },
  {
    id: '1930s',
    year: '1930s',
    name: 'Great Depression',
    creditBoom: 'Margin lending fuels stock speculation',
    badInvestment: 'Stock market bubble; real estate boom',
    fundingRun: '9,000 bank failures from depositor runs',
    international: 'Gold standard transmitted deflation globally',
    outcome: 'FDIC, Glass-Steagall, SEC, New Deal',
    color: 'rgb(239, 68, 68)',
  },
  {
    id: '2008',
    year: '2008',
    name: 'Global Financial Crisis',
    creditBoom: 'Subprime mortgages securitized into MBS/CDOs',
    badInvestment: 'Housing bubble ($8T in value destroyed)',
    fundingRun: 'Shadow banks lose wholesale funding (repo, ABCP)',
    international: 'European banks held toxic U.S. MBS',
    outcome: 'TARP, QE, Dodd-Frank, $800B fiscal stimulus',
    color: 'rgb(220, 38, 38)',
  },
];

const features = [
  { key: 'creditBoom' as const, label: 'Credit Boom', icon: '📈' },
  { key: 'badInvestment' as const, label: 'Bad Investment', icon: '💸' },
  { key: 'fundingRun' as const, label: 'Funding Run', icon: '🏃' },
  { key: 'international' as const, label: 'International Link', icon: '🌍' },
  { key: 'outcome' as const, label: 'Outcome', icon: '⚖️' },
];

export default function CrisisPatternMatrix() {
  const [selectedCrisis, setSelectedCrisis] = useState<string | null>(null);
  const [highlightedFeature, setHighlightedFeature] = useState<string | null>(null);

  const activeCrisis = crises.find((c) => c.id === selectedCrisis);

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
        Crisis Pattern Matrix
      </h3>
      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
        Five crises across 140 years share the same DNA. Select a crisis or feature to explore.
      </p>

      {/* Crisis selector */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {crises.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCrisis(selectedCrisis === c.id ? null : c.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: `2px solid ${selectedCrisis === c.id ? c.color : 'var(--color-surface-2)'}`,
              backgroundColor: selectedCrisis === c.id
                ? `color-mix(in srgb, ${c.color} 12%, transparent)`
                : 'var(--color-surface-0)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, color: selectedCrisis === c.id ? c.color : 'var(--color-text-primary)' }}>
              {c.year}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{c.name}</div>
          </button>
        ))}
      </div>

      {/* Feature comparison grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {features.map((feature) => (
          <div key={feature.key}>
            <button
              onClick={() => setHighlightedFeature(highlightedFeature === feature.key ? null : feature.key)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 10px',
                borderRadius: '8px',
                border: `1px solid ${highlightedFeature === feature.key ? 'rgb(99, 102, 241)' : 'var(--color-surface-2)'}`,
                backgroundColor: highlightedFeature === feature.key
                  ? 'color-mix(in srgb, rgb(99, 102, 241) 8%, var(--color-surface-0))'
                  : 'var(--color-surface-0)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{feature.icon}</span>
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                color: highlightedFeature === feature.key ? 'rgb(99, 102, 241)' : 'var(--color-text-primary)',
                minWidth: '110px',
              }}>
                {feature.label}
              </span>

              {selectedCrisis && activeCrisis ? (
                <motion.span
                  key={selectedCrisis}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: '11px', color: 'var(--color-text-secondary)', flex: 1, lineHeight: 1.4 }}
                >
                  {activeCrisis[feature.key]}
                </motion.span>
              ) : (
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  Select a crisis above
                </span>
              )}
            </button>

            {/* Show all crises for this feature when feature is highlighted */}
            <AnimatePresence>
              {highlightedFeature === feature.key && !selectedCrisis && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px', paddingLeft: '34px' }}>
                    {crises.map((c) => (
                      <div
                        key={c.id}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          borderLeft: `3px solid ${c.color}`,
                          backgroundColor: 'var(--color-surface-0)',
                          fontSize: '11px',
                        }}
                      >
                        <span style={{ fontWeight: 600, color: c.color, marginRight: '6px' }}>{c.year}:</span>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{c[feature.key]}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Common pattern summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '16px',
          padding: '12px',
          borderRadius: '10px',
          backgroundColor: 'color-mix(in srgb, rgb(99, 102, 241) 8%, transparent)',
          border: '1px solid color-mix(in srgb, rgb(99, 102, 241) 25%, transparent)',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(99, 102, 241)', marginBottom: '6px' }}>
          The Universal Pattern
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          Every major crisis follows the same script: a <strong>credit boom</strong> funds{' '}
          <strong>speculative investments</strong> that turn sour. When short-term creditors{' '}
          <strong>run</strong>, fire sales and <strong>international contagion</strong> amplify
          the damage far beyond the original losses. The only variable is which asset class
          and which institutions are at the center.
        </div>
      </motion.div>
    </div>
  );
}
