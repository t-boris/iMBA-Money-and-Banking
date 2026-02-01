'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

type BankTier = 'community' | 'regional' | 'moneyCenter';

interface BankTierData {
  id: BankTier;
  name: string;
  assets: string;
  focus: string;
  funding: string;
  examples: string[];
  count: string;
  characteristics: string[];
  color: string;
  colorRgb: string;
}

const bankTiers: BankTierData[] = [
  {
    id: 'moneyCenter',
    name: 'Money Center Banks',
    assets: '$1T+',
    focus: 'Global wholesale banking',
    funding: 'Heavy wholesale reliance',
    examples: ['JPMorgan Chase', 'Citigroup', 'Bank of America'],
    count: '~10 banks',
    characteristics: [
      'Global operations across multiple countries',
      'Heavy reliance on wholesale funding',
      'Major players in derivatives markets',
      'Too Big To Fail (TBTF) designation',
    ],
    color: 'amber',
    colorRgb: '245, 158, 11',
  },
  {
    id: 'regional',
    name: 'Regional/Super-Regional Banks',
    assets: '$10B - $500B+',
    focus: 'Retail + wholesale mix',
    funding: 'Deposits + some wholesale',
    examples: ['PNC', 'US Bank', 'Truist', 'Fifth Third'],
    count: '~100 banks',
    characteristics: [
      'Multi-state operations',
      'Mix of retail and commercial banking',
      'Growing wealth management services',
      'M&A activity to reach scale',
    ],
    color: 'primary',
    colorRgb: '99, 102, 241',
  },
  {
    id: 'community',
    name: 'Community Banks',
    assets: '< $1B',
    focus: 'Local retail banking',
    funding: 'Primarily deposits',
    examples: ['Local credit unions', 'Small town banks', 'Farm credit banks'],
    count: '~4,000+ banks',
    characteristics: [
      'Strong local market knowledge',
      'Relationship-based lending',
      'High deposit-to-asset ratios',
      'Limited geographic diversification',
    ],
    color: 'emerald',
    colorRgb: '16, 185, 129',
  },
];

interface BankTypesPyramidProps {
  className?: string;
}

function PyramidTier({
  tier,
  index,
  isSelected,
  onClick,
}: {
  tier: BankTierData;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  // Pyramid widths: top is narrowest, bottom is widest
  const widths = ['60%', '80%', '100%'];
  const width = widths[index];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.15 }}
      onClick={onClick}
      style={{
        width,
        margin: '0 auto',
        cursor: 'pointer',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        style={{
          padding: '20px 24px',
          backgroundColor: isSelected
            ? `rgba(${tier.colorRgb}, 0.2)`
            : `rgba(${tier.colorRgb}, 0.1)`,
          borderRadius: '12px',
          border: isSelected
            ? `2px solid rgb(${tier.colorRgb})`
            : `2px solid rgba(${tier.colorRgb}, 0.3)`,
          transition: 'all 0.2s',
        }}
      >
        {/* Tier Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: `rgb(${tier.colorRgb})`,
                marginBottom: '4px',
              }}
            >
              {tier.name}
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{tier.count}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: `rgb(${tier.colorRgb})`,
              }}
            >
              {tier.assets}
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>in assets</p>
          </div>
        </div>

        {/* Quick Info */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '12px',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <div>
            <span style={{ fontWeight: 500 }}>Focus:</span> {tier.focus}
          </div>
          <div>
            <span style={{ fontWeight: 500 }}>Funding:</span> {tier.funding}
          </div>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: '16px',
                  padding: '16px',
                  backgroundColor: `rgba(${tier.colorRgb}, 0.08)`,
                  borderRadius: '8px',
                }}
              >
                {/* Examples */}
                <div style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: `rgb(${tier.colorRgb})`,
                      marginBottom: '6px',
                    }}
                  >
                    Examples
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {tier.examples.map((example) => (
                      <span
                        key={example}
                        style={{
                          padding: '4px 10px',
                          backgroundColor: `rgba(${tier.colorRgb}, 0.15)`,
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Characteristics */}
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: `rgb(${tier.colorRgb})`,
                      marginBottom: '6px',
                    }}
                  >
                    Key Characteristics
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '16px',
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.7',
                    }}
                  >
                    {tier.characteristics.map((char) => (
                      <li key={char}>{char}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function BankTypesPyramid({ className }: BankTypesPyramidProps) {
  const [selectedTier, setSelectedTier] = useState<BankTier | null>(null);

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          Commercial Bank Size Pyramid
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          From local community banks to global money center institutions
        </p>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '3px',
              backgroundColor: 'rgb(16, 185, 129)',
            }}
          />
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Stable (deposits)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '3px',
              backgroundColor: 'rgb(99, 102, 241)',
            }}
          />
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Mixed funding</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '3px',
              backgroundColor: 'rgb(245, 158, 11)',
            }}
          />
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Complex (wholesale)
          </span>
        </div>
      </div>

      {/* Pyramid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {bankTiers.map((tier, index) => (
          <PyramidTier
            key={tier.id}
            tier={tier}
            index={index}
            isSelected={selectedTier === tier.id}
            onClick={() => setSelectedTier(selectedTier === tier.id ? null : tier.id)}
          />
        ))}
      </div>

      {/* Metrics Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}
      >
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(16, 185, 129)' }}>
            4,000+
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Community Banks
          </div>
        </div>
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>~100</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Regional Banks
          </div>
        </div>
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(245, 158, 11)' }}>~10</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Money Centers
          </div>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Key Insight:</strong> While
          community banks vastly outnumber money center banks, the top 10 banks hold roughly 50% of
          all U.S. banking assets. This concentration increased dramatically after the 2008
          financial crisis when many regional banks were acquired or failed.
        </div>
      </motion.div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Click on any tier to see details and examples
      </p>
    </div>
  );
}
