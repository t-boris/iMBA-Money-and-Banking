'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { AnimatedValue } from '../AnimatedValue';

type BankType = 'community' | 'moneyCenter';

interface FundingSource {
  name: string;
  description: string;
  stability: 'high' | 'medium' | 'low';
  cost: 'low' | 'medium' | 'high';
  items: string[];
  color: string;
  colorRgb: string;
}

const fundingSources: FundingSource[] = [
  {
    name: 'Retail Deposits',
    description: 'Most stable, cheapest source of funding',
    stability: 'high',
    cost: 'low',
    items: [
      'Transaction accounts (checking)',
      'Savings accounts',
      'Certificates of Deposit (CDs)',
      'Money market deposit accounts',
    ],
    color: 'emerald',
    colorRgb: '16, 185, 129',
  },
  {
    name: 'Wholesale Funding',
    description: 'Less stable, market-rate cost',
    stability: 'low',
    cost: 'medium',
    items: [
      'Federal Funds (overnight interbank)',
      'Repo agreements (secured by securities)',
      'Commercial paper',
      'Brokered deposits',
    ],
    color: 'amber',
    colorRgb: '245, 158, 11',
  },
  {
    name: 'Bank Capital',
    description: 'Most stable, highest cost',
    stability: 'high',
    cost: 'high',
    items: ['Common stock', 'Preferred stock', 'Retained earnings', 'Subordinated debt'],
    color: 'primary',
    colorRgb: '99, 102, 241',
  },
];

interface FundingMix {
  deposits: number;
  wholesale: number;
  capital: number;
}

const fundingMixes: Record<BankType, FundingMix> = {
  community: {
    deposits: 85,
    wholesale: 5,
    capital: 10,
  },
  moneyCenter: {
    deposits: 60,
    wholesale: 30,
    capital: 10,
  },
};

interface FundingSourcesComparisonProps {
  className?: string;
}

function FundingBar({
  mix,
  isAnimating,
}: {
  mix: FundingMix;
  isAnimating: boolean;
}) {
  return (
    <div
      style={{
        height: '48px',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        backgroundColor: 'var(--color-surface-2)',
      }}
    >
      {/* Deposits */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${mix.deposits}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        key={`deposits-${isAnimating}`}
        style={{
          backgroundColor: 'rgb(16, 185, 129)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: mix.deposits > 10 ? 'auto' : '0',
        }}
      >
        {mix.deposits >= 15 && (
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
            {mix.deposits}%
          </span>
        )}
      </motion.div>

      {/* Wholesale */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${mix.wholesale}%` }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        key={`wholesale-${isAnimating}`}
        style={{
          backgroundColor: 'rgb(245, 158, 11)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: mix.wholesale > 10 ? 'auto' : '0',
        }}
      >
        {mix.wholesale >= 15 && (
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
            {mix.wholesale}%
          </span>
        )}
      </motion.div>

      {/* Capital */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${mix.capital}%` }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        key={`capital-${isAnimating}`}
        style={{
          backgroundColor: 'rgb(99, 102, 241)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {mix.capital >= 10 && (
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
            {mix.capital}%
          </span>
        )}
      </motion.div>
    </div>
  );
}

function SourceCard({
  source,
  percentage,
  isExpanded,
  onClick,
}: {
  source: FundingSource;
  percentage: number;
  isExpanded: boolean;
  onClick: () => void;
}) {
  const stabilityColors = {
    high: 'rgb(16, 185, 129)',
    medium: 'rgb(245, 158, 11)',
    low: 'rgb(239, 68, 68)',
  };

  const costColors = {
    low: 'rgb(16, 185, 129)',
    medium: 'rgb(245, 158, 11)',
    high: 'rgb(239, 68, 68)',
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      style={{
        padding: '16px',
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '12px',
        border: isExpanded
          ? `2px solid rgb(${source.colorRgb})`
          : '2px solid var(--color-surface-2)',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '4px',
              backgroundColor: `rgb(${source.colorRgb})`,
            }}
          />
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {source.name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AnimatedValue value={percentage} suffix="%" size="lg" className="text-primary" />
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '8px',
          marginLeft: '22px',
        }}
      >
        {source.description}
      </p>

      {/* Stability & Cost Badges */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '10px', marginLeft: '22px' }}>
        <span
          style={{
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 500,
            backgroundColor: `${stabilityColors[source.stability]}20`,
            color: stabilityColors[source.stability],
          }}
        >
          {source.stability === 'high'
            ? 'High Stability'
            : source.stability === 'medium'
              ? 'Medium Stability'
              : 'Low Stability'}
        </span>
        <span
          style={{
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 500,
            backgroundColor: `${costColors[source.cost]}20`,
            color: costColors[source.cost],
          }}
        >
          {source.cost === 'low'
            ? 'Low Cost'
            : source.cost === 'medium'
              ? 'Market Cost'
              : 'High Cost'}
        </span>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                marginTop: '12px',
                marginLeft: '22px',
                padding: '12px',
                backgroundColor: `rgba(${source.colorRgb}, 0.08)`,
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: `rgb(${source.colorRgb})`,
                  marginBottom: '8px',
                }}
              >
                Components
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
                {source.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FundingSourcesComparison({ className }: FundingSourcesComparisonProps) {
  const [selectedBankType, setSelectedBankType] = useState<BankType>('community');
  const [expandedSource, setExpandedSource] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const currentMix = fundingMixes[selectedBankType];

  const handleBankTypeChange = (type: BankType) => {
    setSelectedBankType(type);
    setAnimationKey((prev) => prev + 1);
  };

  const bankTypeInfo = {
    community: {
      title: 'Community Bank',
      subtitle: 'Local focus, deposit-heavy',
      description:
        'Community banks rely primarily on stable retail deposits from local customers. This makes them less vulnerable to wholesale funding runs but limits growth potential.',
    },
    moneyCenter: {
      title: 'Money Center Bank',
      subtitle: 'Global operations, diversified funding',
      description:
        'Money center banks use significant wholesale funding to support their large balance sheets. This provides flexibility but creates vulnerability to market disruptions.',
    },
  };

  const currentInfo = bankTypeInfo[selectedBankType];

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
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
          Bank Funding Sources Comparison
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          How different bank types fund their operations
        </p>
      </div>

      {/* Bank Type Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        {(['community', 'moneyCenter'] as BankType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleBankTypeChange(type)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor:
                selectedBankType === type ? 'rgba(99, 102, 241, 0.15)' : 'var(--color-surface-1)',
              color:
                selectedBankType === type ? 'rgb(99, 102, 241)' : 'var(--color-text-secondary)',
              fontWeight: selectedBankType === type ? 600 : 400,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {type === 'community' ? 'Community Bank' : 'Money Center Bank'}
          </button>
        ))}
      </div>

      {/* Bank Type Info */}
      <motion.div
        key={selectedBankType}
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

      {/* Funding Bar */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '12px',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>Funding Mix</span>
          <span>100%</span>
        </div>
        <FundingBar mix={currentMix} isAnimating={animationKey > 0} />
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
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Retail Deposits</span>
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
            Wholesale Funding
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
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Bank Capital</span>
        </div>
      </div>

      {/* Source Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SourceCard
          source={fundingSources[0]}
          percentage={currentMix.deposits}
          isExpanded={expandedSource === 'deposits'}
          onClick={() => setExpandedSource(expandedSource === 'deposits' ? null : 'deposits')}
        />
        <SourceCard
          source={fundingSources[1]}
          percentage={currentMix.wholesale}
          isExpanded={expandedSource === 'wholesale'}
          onClick={() => setExpandedSource(expandedSource === 'wholesale' ? null : 'wholesale')}
        />
        <SourceCard
          source={fundingSources[2]}
          percentage={currentMix.capital}
          isExpanded={expandedSource === 'capital'}
          onClick={() => setExpandedSource(expandedSource === 'capital' ? null : 'capital')}
        />
      </div>

      {/* Run on Repo Insight */}
      {selectedBankType === 'moneyCenter' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>!</span>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgb(245, 158, 11)',
                  marginBottom: '4px',
                }}
              >
                Run on Repo Risk
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                Heavy reliance on wholesale funding creates vulnerability to &quot;runs on
                repo&quot;—when counterparties refuse to roll over short-term funding. This was a
                key mechanism in the 2008 financial crisis, as seen with Bear Stearns and Lehman
                Brothers.
              </p>
            </div>
          </div>
        </motion.div>
      )}

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
        <div
          style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}
        >
          <strong style={{ color: 'var(--color-text-primary)' }}>Key Insight:</strong>{' '}
          {selectedBankType === 'community'
            ? 'Community banks benefit from FDIC-insured deposits that are "sticky"—depositors rarely move accounts. This provides stable, low-cost funding but limits the bank\'s ability to grow quickly.'
            : 'Money center banks trade funding stability for flexibility. Wholesale funding allows rapid balance sheet expansion but requires constant market access. During crises, this funding can evaporate overnight.'}
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
        Click on any funding source to see its components
      </p>
    </div>
  );
}
