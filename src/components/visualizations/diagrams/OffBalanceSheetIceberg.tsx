'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface OffBalanceSheetIcebergProps {
  className?: string;
}

interface BalanceSheetItem {
  id: string;
  name: string;
  value: string;
  description: string;
  details: string[];
  color: string;
  position: 'above' | 'below';
  category: 'assets' | 'commitments' | 'guarantees' | 'derivatives';
}

const balanceSheetItems: BalanceSheetItem[] = [
  // Above waterline - On-Balance Sheet
  {
    id: 'total-assets',
    name: 'Total Assets',
    value: '$3.4T',
    description: 'What appears on the balance sheet - loans, securities, cash',
    details: [
      'Loans and leases: ~$1.1T',
      'Investment securities: ~$500B',
      'Cash and deposits: ~$600B',
      'Trading assets: ~$400B',
      'Other assets: ~$800B',
    ],
    color: '99, 102, 241', // primary blue
    position: 'above',
    category: 'assets',
  },
  // Below waterline - Off-Balance Sheet
  {
    id: 'loan-commitments',
    name: 'Loan Commitments',
    value: '$1.5T+',
    description: 'Contingent assets - must fund if customer requests',
    details: [
      'Credit card undrawn limits: ~$500B+',
      'Business credit lines: ~$400B',
      'Mortgage commitments: ~$200B',
      'Standby commitments: ~$400B',
      '"You promised to lend - now you must"',
    ],
    color: '16, 185, 129', // emerald
    position: 'below',
    category: 'commitments',
  },
  {
    id: 'guarantees',
    name: 'Guarantees',
    value: '$100B+',
    description: 'Contingent liabilities - pay if third party defaults',
    details: [
      'Letters of credit (trade finance)',
      'Performance guarantees',
      'Financial standby letters',
      'Credit enhancement',
      '"If they fail to pay, you pay"',
    ],
    color: '168, 85, 247', // purple
    position: 'below',
    category: 'guarantees',
  },
  {
    id: 'derivatives',
    name: 'Derivatives',
    value: '$50T+ notional',
    description: 'Both assets and liabilities - notional is NOT actual risk',
    details: [
      'Interest rate swaps: ~$30T notional',
      'Credit default swaps: ~$3T notional',
      'FX contracts: ~$10T notional',
      'Equity & commodity: ~$7T notional',
      'Net exposure after netting: ~$200B',
    ],
    color: '245, 158, 11', // amber
    position: 'below',
    category: 'derivatives',
  },
];

const insights = [
  {
    title: 'Credit Cards: The Hidden Obligation',
    content:
      "Your credit limit is $10,000 but you only owe $2,000. That $8,000 undrawn? It's nowhere on the bank's balance sheet - but they MUST fund it if you charge.",
    icon: '💳',
  },
  {
    title: 'Notional vs Actual Risk',
    content:
      'Like home insurance: $300,000 coverage (notional) but your premium risk is tiny. A $50T derivative book might have only $200B actual exposure after netting.',
    icon: '📊',
  },
  {
    title: 'Concentration Risk',
    content:
      '7 largest US banks hold ~95% of all derivatives. JPMorgan alone: ~$50T notional. "Too big to fail" meets "too complex to understand."',
    icon: '🏦',
  },
];

export function OffBalanceSheetIceberg({ className }: OffBalanceSheetIcebergProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [insightIndex, setInsightIndex] = useState(0);
  const [bobOffset, setBobOffset] = useState(0);

  // Gentle bobbing animation for the iceberg
  useEffect(() => {
    const interval = setInterval(() => {
      setBobOffset(Math.sin(Date.now() / 1000) * 3);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const selectedItemData = selectedItem
    ? balanceSheetItems.find((item) => item.id === selectedItem)
    : null;

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
          Off-Balance Sheet: The Hidden Iceberg
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          What you see on a bank&apos;s balance sheet is just the tip - massive obligations lurk
          beneath
        </p>
      </div>

      {/* Iceberg Visualization */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        {/* SVG Iceberg */}
        <svg
          viewBox="0 0 400 350"
          style={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        >
          {/* Water gradient background */}
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(30, 64, 175, 0.6)" />
            </linearGradient>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(186, 230, 253, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 197, 253, 0.2)" />
            </linearGradient>
            <linearGradient id="iceAbove" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(224, 231, 255, 0.95)" />
              <stop offset="100%" stopColor="rgba(199, 210, 254, 0.9)" />
            </linearGradient>
            <linearGradient id="iceBelow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(129, 140, 248, 0.5)" />
              <stop offset="100%" stopColor="rgba(67, 56, 202, 0.7)" />
            </linearGradient>
          </defs>

          {/* Sky background */}
          <rect x="0" y="0" width="400" height="100" fill="url(#skyGradient)" />

          {/* Water background */}
          <rect x="0" y="100" width="400" height="250" fill="url(#waterGradient)" />

          {/* Iceberg group with bobbing animation */}
          <g transform={`translate(0, ${bobOffset})`}>
            {/* Above waterline - Visible portion (smaller) */}
            <motion.path
              d="M 200 30 L 270 95 L 250 100 L 150 100 L 130 95 Z"
              fill="url(#iceAbove)"
              stroke="rgba(99, 102, 241, 0.5)"
              strokeWidth="2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                setSelectedItem(selectedItem === 'total-assets' ? null : 'total-assets')
              }
            />

            {/* Below waterline - Hidden portion (much larger) */}
            <motion.path
              d="M 150 105 L 250 105 L 320 160 L 340 250 L 280 320 L 120 320 L 60 250 L 80 160 Z"
              fill="url(#iceBelow)"
              stroke="rgba(99, 102, 241, 0.3)"
              strokeWidth="2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            {/* Labels on iceberg */}
            <text
              x="200"
              y="70"
              textAnchor="middle"
              fill="rgb(99, 102, 241)"
              fontSize="11"
              fontWeight="600"
            >
              $3.4T
            </text>
            <text
              x="200"
              y="85"
              textAnchor="middle"
              fill="var(--color-text-secondary)"
              fontSize="9"
            >
              On-Balance Sheet
            </text>

            <text
              x="200"
              y="180"
              textAnchor="middle"
              fill="rgba(255,255,255,0.9)"
              fontSize="11"
              fontWeight="600"
            >
              $50T+ Notional
            </text>
            <text x="200" y="195" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
              Off-Balance Sheet
            </text>
          </g>

          {/* Waterline indicator */}
          <motion.line
            x1="0"
            y1="100"
            x2="400"
            y2="100"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="2"
            strokeDasharray="8,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Wave effect at waterline */}
          <motion.path
            d={`M 0 100 Q 50 ${95 + bobOffset} 100 100 Q 150 ${105 + bobOffset} 200 100 Q 250 ${95 + bobOffset} 300 100 Q 350 ${105 + bobOffset} 400 100`}
            fill="none"
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Interactive Categories */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        {balanceSheetItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
            style={{
              padding: '16px',
              backgroundColor:
                selectedItem === item.id ? `rgba(${item.color}, 0.15)` : 'var(--color-surface-1)',
              borderRadius: '12px',
              border:
                selectedItem === item.id
                  ? `2px solid rgba(${item.color}, 0.5)`
                  : '2px solid transparent',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '4px',
              }}
            >
              <span
                style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)' }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: `rgb(${item.color})`,
                  padding: '2px 8px',
                  backgroundColor: `rgba(${item.color}, 0.1)`,
                  borderRadius: '6px',
                }}
              >
                {item.value}
              </span>
            </div>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                margin: 0,
                lineHeight: '1.4',
              }}
            >
              {item.description}
            </p>
            {item.position === 'below' && (
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '8px',
                  fontSize: '10px',
                  color: 'var(--color-text-muted)',
                  backgroundColor: 'var(--color-surface-2)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                Hidden
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Detail Panel */}
      {selectedItemData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            padding: '20px',
            backgroundColor: `rgba(${selectedItemData.color}, 0.08)`,
            borderRadius: '12px',
            marginBottom: '24px',
            border: `1px solid rgba(${selectedItemData.color}, 0.2)`,
          }}
        >
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: `rgb(${selectedItemData.color})`,
              marginBottom: '12px',
            }}
          >
            {selectedItemData.name} Details
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {selectedItemData.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                  lineHeight: '1.5',
                }}
              >
                {detail}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Rotating Insights */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '24px' }}>{insights[insightIndex].icon}</span>
          <h4
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            {insights[insightIndex].title}
          </h4>
        </div>
        <motion.p
          key={insightIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6',
            margin: 0,
          }}
        >
          {insights[insightIndex].content}
        </motion.p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
          {insights.map((_, i) => (
            <button
              key={i}
              onClick={() => setInsightIndex(i)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor:
                  i === insightIndex ? 'rgb(99, 102, 241)' : 'var(--color-surface-2)',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Scale Comparison */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          The Scale Problem (JPMorgan Example)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'On-Balance Sheet Assets', value: '$3.4T', width: 7, color: '99, 102, 241' },
            { label: 'Loan Commitments', value: '$1.5T', width: 3, color: '16, 185, 129' },
            { label: 'Derivatives (Notional)', value: '$50T+', width: 100, color: '245, 158, 11' },
          ].map((item, i) => (
            <div key={i}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
              >
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {item.label}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: `rgb(${item.color})` }}>
                  {item.value}
                </span>
              </div>
              <div
                style={{
                  height: '8px',
                  backgroundColor: 'var(--color-surface-2)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.width}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    height: '100%',
                    backgroundColor: `rgb(${item.color})`,
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            marginTop: '12px',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          Note: Derivatives bar shows relative notional scale - actual risk exposure is much smaller
          after netting
        </p>
      </div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Click on any category above to see detailed breakdown
      </p>
    </div>
  );
}
