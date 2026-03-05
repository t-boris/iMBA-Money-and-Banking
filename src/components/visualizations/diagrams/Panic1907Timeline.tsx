'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 };

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  detail: string;
  color: string;
  icon: string;
}

const events: TimelineEvent[] = [
  {
    id: 'earthquake',
    year: '1906',
    title: 'San Francisco Earthquake',
    description: 'Insurance payouts drain gold from New York banks',
    detail:
      'The 1906 earthquake caused $6B in insurance claims (2024 dollars). British insurers shipped gold from New York to pay claims, straining U.S. bank reserves at a time when the gold standard tied money supply to gold holdings.',
    color: 'rgb(245, 158, 11)',
    icon: '🌋',
  },
  {
    id: 'harvest',
    year: '1907 Spring',
    title: 'Crop Financing Strain',
    description: 'Seasonal demand for cash in the South and West',
    detail:
      'Every autumn, banks in agricultural regions drew down their New York deposits to finance the harvest. In 1907, this seasonal drain hit an already stressed system, reducing liquidity in the financial center.',
    color: 'rgb(234, 179, 8)',
    icon: '🌾',
  },
  {
    id: 'speculation',
    year: '1907 Summer',
    title: 'Copper Speculation',
    description: 'F. Augustus Heinze attempts to corner the copper market',
    detail:
      'Heinze tried to corner United Copper Company stock using borrowed money. When the scheme failed, copper shares collapsed and lenders called in their loans. Heinze was connected to multiple banks and trust companies.',
    color: 'rgb(239, 68, 68)',
    icon: '📉',
  },
  {
    id: 'bank-failures',
    year: 'Oct 1907',
    title: 'Bank Runs Begin',
    description: 'Heinze-linked banks fail, trust companies face runs',
    detail:
      "Mercantile National Bank (where Heinze was president) failed first. Then Knickerbocker Trust — New York's third-largest trust company — faced a devastating run. Lines of depositors stretched around the block demanding their money.",
    color: 'rgb(220, 38, 38)',
    icon: '🏦',
  },
  {
    id: 'contagion',
    year: 'Oct-Nov 1907',
    title: 'Contagion Spreads',
    description: 'Panic spreads to healthy banks and the stock exchange',
    detail:
      'The NYSE almost closed due to lack of cash. Call money rates (overnight lending) spiked to 125%. Banks across the country suspended cash payments. The economy lurched toward depression.',
    color: 'rgb(185, 28, 28)',
    icon: '🔥',
  },
  {
    id: 'morgan',
    year: 'Nov 1907',
    title: 'J.P. Morgan Intervenes',
    description: 'Morgan organizes private bailouts and forces cooperation',
    detail:
      "Morgan locked the city's top bankers in his library and refused to let them leave until they pledged funds to stop the panic. He directed rescue efforts like a one-man central bank — deciding which institutions to save and which to let fail.",
    color: 'rgb(99, 102, 241)',
    icon: '🏛️',
  },
  {
    id: 'fed-creation',
    year: '1913',
    title: 'Federal Reserve Created',
    description: 'Congress establishes a permanent lender of last resort',
    detail:
      "The Panic proved the U.S. couldn't rely on one private banker to rescue the financial system. The Federal Reserve Act of 1913 created a central bank that could lend freely in crises — the function J.P. Morgan had performed personally.",
    color: 'rgb(16, 185, 129)',
    icon: '⚖️',
  },
];

export default function Panic1907Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
        The Panic of 1907
      </h3>
      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
        The crisis that proved America needed a central bank. Click events to expand.
      </p>

      <div style={{ position: 'relative', paddingLeft: '28px' }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: '11px',
            top: '12px',
            bottom: '12px',
            width: '2px',
            background: 'linear-gradient(to bottom, rgb(245, 158, 11), rgb(239, 68, 68), rgb(99, 102, 241), rgb(16, 185, 129))',
            borderRadius: '1px',
          }}
        />

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, ...spring }}
            style={{ position: 'relative', marginBottom: index < events.length - 1 ? '8px' : '0' }}
          >
            {/* Node dot */}
            <motion.div
              animate={{
                scale: expandedId === event.id ? 1.3 : 1,
                boxShadow: expandedId === event.id ? `0 0 12px ${event.color}` : 'none',
              }}
              style={{
                position: 'absolute',
                left: '-22px',
                top: '14px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: event.color,
                border: '2px solid var(--color-surface-1)',
                zIndex: 1,
              }}
            />

            <button
              onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: '10px',
                border: `1px solid ${expandedId === event.id ? event.color : 'var(--color-surface-2)'}`,
                backgroundColor: expandedId === event.id
                  ? `color-mix(in srgb, ${event.color} 8%, var(--color-surface-0))`
                  : 'var(--color-surface-0)',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background-color 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>{event.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: event.color }}>{event.year}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {event.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {event.description}
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: expandedId === event.id ? 180 : 0 }}
                  style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
                >
                  &#x25BC;
                </motion.span>
              </div>
            </button>

            <AnimatePresence>
              {expandedId === event.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    padding: '10px 12px',
                    marginTop: '4px',
                    marginLeft: '26px',
                    borderLeft: `3px solid ${event.color}`,
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                  }}>
                    {event.detail}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Key lesson */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: '16px',
          padding: '12px',
          borderRadius: '10px',
          backgroundColor: 'color-mix(in srgb, rgb(16, 185, 129) 8%, transparent)',
          border: '1px solid color-mix(in srgb, rgb(16, 185, 129) 30%, transparent)',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(16, 185, 129)', marginBottom: '4px' }}>
          Key Lesson
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          A modern economy cannot depend on a single private individual to stop financial panics.
          The Federal Reserve was created to institutionalize the lender-of-last-resort function that Morgan performed personally in 1907.
        </div>
      </motion.div>
    </div>
  );
}
