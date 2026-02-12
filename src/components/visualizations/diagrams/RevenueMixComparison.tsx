'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface RevenueMixComparisonProps {
  className?: string;
}

interface RevenueSource {
  name: string;
  traditional: number;
  modern: number;
  description: string;
  color: string;
}

const revenueSources: RevenueSource[] = [
  {
    name: 'Net Interest Income',
    traditional: 85,
    modern: 50,
    description: 'Difference between loan interest earned and deposit interest paid',
    color: '99, 102, 241', // primary
  },
  {
    name: 'Service Charges',
    traditional: 8,
    modern: 15,
    description: 'Account maintenance fees, overdraft fees, ATM fees',
    color: '16, 185, 129', // emerald
  },
  {
    name: 'Trading Revenue',
    traditional: 2,
    modern: 12,
    description: 'Securities trading, market making (post Gramm-Leach-Bliley)',
    color: '245, 158, 11', // amber
  },
  {
    name: 'Investment Banking',
    traditional: 0,
    modern: 10,
    description: 'Underwriting, M&A advisory (post Gramm-Leach-Bliley)',
    color: '168, 85, 247', // purple
  },
  {
    name: 'Wealth Management',
    traditional: 3,
    modern: 8,
    description: 'Asset management, financial planning, trust services',
    color: '236, 72, 153', // pink
  },
  {
    name: 'Other Fee Income',
    traditional: 2,
    modern: 5,
    description: 'Credit card fees, mortgage origination, insurance sales',
    color: '20, 184, 166', // teal
  },
];

type Era = 'traditional' | 'modern';

export function RevenueMixComparison({ className }: RevenueMixComparisonProps) {
  const [selectedEra, setSelectedEra] = useState<Era>('modern');
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  const eraInfo = {
    traditional: {
      title: 'Traditional Banking (1935-1999)',
      subtitle: 'The 3-6-3 Rule Era',
      description:
        'Banks relied almost entirely on interest spread. Pay 3% on deposits, lend at 6%, golf by 3 PM.',
    },
    modern: {
      title: 'Modern Banking (Post-1999)',
      subtitle: 'Diversified Financial Services',
      description:
        'After Gramm-Leach-Bliley, banks diversified into trading, investment banking, and fee-based services.',
    },
  };

  const currentInfo = eraInfo[selectedEra];

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
          Bank Revenue Mix: Then vs Now
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          How banks transformed from interest-dependent to diversified revenue streams
        </p>
      </div>

      {/* Era Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        {(['traditional', 'modern'] as Era[]).map((era) => (
          <button
            key={era}
            onClick={() => setSelectedEra(era)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor:
                selectedEra === era ? 'rgba(99, 102, 241, 0.15)' : 'var(--color-surface-1)',
              color: selectedEra === era ? 'rgb(99, 102, 241)' : 'var(--color-text-secondary)',
              fontWeight: selectedEra === era ? 600 : 400,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {era === 'traditional' ? '🏛️ Traditional' : '🏢 Modern'}
          </button>
        ))}
      </div>

      {/* Era Info Card */}
      <motion.div
        key={selectedEra}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '4px',
          }}
        >
          {currentInfo.title}
        </h4>
        <p
          style={{
            fontSize: '13px',
            color: 'rgb(99, 102, 241)',
            fontWeight: 500,
            marginBottom: '8px',
          }}
        >
          {currentInfo.subtitle}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          {currentInfo.description}
        </p>
      </motion.div>

      {/* Revenue Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {revenueSources.map((source, index) => {
          const value = selectedEra === 'traditional' ? source.traditional : source.modern;
          const isHovered = hoveredSource === source.name;

          return (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredSource(source.name)}
              onMouseLeave={() => setHoveredSource(null)}
              onClick={() => setHoveredSource(isHovered ? null : source.name)}
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '12px',
                border: isHovered
                  ? `2px solid rgba(${source.color}, 0.5)`
                  : '2px solid transparent',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}
                >
                  {source.name}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: `rgb(${source.color})`,
                  }}
                >
                  {value}%
                </span>
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: '8px',
                  backgroundColor: 'var(--color-surface-2)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  key={`${source.name}-${selectedEra}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  style={{
                    height: '100%',
                    backgroundColor: `rgb(${source.color})`,
                    borderRadius: '4px',
                  }}
                />
              </div>

              {/* Description (shown on hover/click) */}
              {isHovered && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    marginTop: '8px',
                    lineHeight: '1.5',
                  }}
                >
                  {source.description}
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Key Insight:</strong>{' '}
          {selectedEra === 'traditional'
            ? 'Traditional banks were essentially "spread businesses" - their profit came almost entirely from the difference between loan and deposit rates. This made them vulnerable to interest rate changes.'
            : 'Modern banks have diversified revenue streams, reducing dependence on interest rates. However, this diversification also increased complexity and interconnectedness, contributing to systemic risk.'}
        </div>
      </motion.div>

      {/* Comparison Summary */}
      <div
        style={{
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}
      >
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
            {selectedEra === 'traditional' ? '85%' : '50%'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Interest Income
          </div>
        </div>
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(16, 185, 129)' }}>
            {selectedEra === 'traditional' ? '15%' : '50%'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Fee & Other Income
          </div>
        </div>
      </div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Click on any revenue source to see its description
      </p>
    </div>
  );
}
