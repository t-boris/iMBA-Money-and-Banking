'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface IncomeStatementWaterfallProps {
  className?: string;
}

type BankType = 'jpmorgan' | 'community';

interface WaterfallItem {
  id: string;
  name: string;
  jpmorgan: number; // in billions
  community: number; // in millions
  type: 'positive' | 'negative' | 'subtotal' | 'total';
  description: string;
  details: string[];
  color: string;
}

const waterfallData: WaterfallItem[] = [
  {
    id: 'interest-income',
    name: 'Interest Income',
    jpmorgan: 89,
    community: 42,
    type: 'positive',
    description: 'Income earned from loans and securities',
    details: [
      'Loan interest: largest component',
      'Securities interest: bonds, treasuries',
      'Trading asset interest',
      'Fed funds and repo income',
    ],
    color: '16, 185, 129', // emerald
  },
  {
    id: 'interest-expense',
    name: 'Interest Expense',
    jpmorgan: -29,
    community: -12,
    type: 'negative',
    description: 'Interest paid on deposits and borrowings',
    details: [
      'Deposit interest: checking, savings, CDs',
      'Borrowing costs: fed funds, repos',
      'Subordinated debt interest',
      'Higher rates = higher expense',
    ],
    color: '239, 68, 68', // red
  },
  {
    id: 'nii',
    name: 'Net Interest Income',
    jpmorgan: 60,
    community: 30,
    type: 'subtotal',
    description: 'NII = Interest Income - Interest Expense (traditional banking profit)',
    details: [
      'Core of commercial banking profit',
      'Net Interest Margin (NIM) = NII / Earning Assets',
      'Typical NIM: 2.5% - 4%',
      'Community banks rely heavily on NII',
    ],
    color: '99, 102, 241', // primary
  },
  {
    id: 'non-interest-income',
    name: 'Non-Interest Income',
    jpmorgan: 58,
    community: 8,
    type: 'positive',
    description: 'Fee-based revenue streams',
    details: [
      'Investment banking fees',
      'Trading revenue',
      'Asset management fees',
      'Service charges & card fees',
      'Mortgage origination fees',
    ],
    color: '16, 185, 129', // emerald
  },
  {
    id: 'total-revenue',
    name: 'Total Revenue',
    jpmorgan: 118,
    community: 38,
    type: 'subtotal',
    description: 'NII + Non-Interest Income',
    details: [
      'All sources of bank revenue combined',
      'JPMorgan: ~50% from fees',
      'Community banks: ~80% from interest',
      'Diversification reduces rate sensitivity',
    ],
    color: '99, 102, 241', // primary
  },
  {
    id: 'non-interest-expense',
    name: 'Non-Interest Expense',
    jpmorgan: -69,
    community: -24,
    type: 'negative',
    description: 'Operating costs of running the bank',
    details: [
      'Salaries & benefits (largest)',
      'Technology & equipment',
      'Occupancy costs',
      'Legal & professional fees',
      'Marketing & advertising',
    ],
    color: '239, 68, 68', // red
  },
  {
    id: 'provisions',
    name: 'Loan Loss Provisions',
    jpmorgan: -8,
    community: -2,
    type: 'negative',
    description: 'Reserve for expected loan defaults',
    details: [
      'Expense for anticipated losses',
      'Increases during economic stress',
      'Builds the loan loss reserve',
      'CECL: current expected credit losses',
      'Key indicator of credit quality outlook',
    ],
    color: '245, 158, 11', // amber
  },
  {
    id: 'net-income',
    name: 'Net Income',
    jpmorgan: 41,
    community: 12,
    type: 'total',
    description: 'The bottom line - profit after all expenses',
    details: [
      'What shareholders earn',
      'Return on Equity (ROE) = Net Income / Equity',
      'Typical ROE target: 10-15%',
      'Retained earnings grow capital',
    ],
    color: '16, 185, 129', // emerald (profit)
  },
];

export function IncomeStatementWaterfall({ className }: IncomeStatementWaterfallProps) {
  const [bankType, setBankType] = useState<BankType>('jpmorgan');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Re-trigger animation when bank type changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [bankType]);

  const bankInfo = {
    jpmorgan: {
      name: 'JPMorgan Chase',
      subtitle: 'Universal Bank',
      scale: 'billions',
      description: 'Diversified revenue: ~50% interest, ~50% fees. Multiple business lines reduce rate sensitivity.',
    },
    community: {
      name: 'Typical Community Bank',
      subtitle: 'Traditional Model',
      scale: 'millions',
      description: 'Interest-dependent: ~80% from NII. Higher NIM but more rate-sensitive.',
    },
  };

  const currentBank = bankInfo[bankType];
  const selectedItemData = selectedItem ? waterfallData.find((item) => item.id === selectedItem) : null;

  // Calculate running totals for waterfall positioning
  const getWaterfallValues = () => {
    let runningTotal = 0;
    return waterfallData.map((item) => {
      const value = bankType === 'jpmorgan' ? item.jpmorgan : item.community;
      let start = runningTotal;
      let end = runningTotal;

      if (item.type === 'positive' || item.type === 'negative') {
        end = runningTotal + value;
        runningTotal = end;
      } else if (item.type === 'subtotal' || item.type === 'total') {
        start = 0;
        end = value;
        runningTotal = value;
      }

      return { ...item, value, start, end };
    });
  };

  const waterfallValues = getWaterfallValues();
  const maxValue = Math.max(...waterfallValues.map((v) => Math.max(Math.abs(v.start), Math.abs(v.end))));

  // Convert value to percentage of chart height
  const valueToPercent = (val: number) => (val / maxValue) * 100;

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Bank Income Statement Waterfall
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          How revenue flows to profit - from interest income to net income
        </p>
      </div>

      {/* Bank Type Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '24px',
      }}>
        {(['jpmorgan', 'community'] as BankType[]).map((type) => (
          <button
            key={type}
            onClick={() => setBankType(type)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: bankType === type ? 'rgba(99, 102, 241, 0.15)' : 'var(--color-surface-1)',
              color: bankType === type ? 'rgb(99, 102, 241)' : 'var(--color-text-secondary)',
              fontWeight: bankType === type ? 600 : 400,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {type === 'jpmorgan' ? '🏢 JPMorgan' : '🏛️ Community Bank'}
          </button>
        ))}
      </div>

      {/* Bank Info Card */}
      <motion.div
        key={bankType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '16px 20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          {currentBank.name}
        </h4>
        <p style={{ fontSize: '12px', color: 'rgb(99, 102, 241)', marginBottom: '8px' }}>
          {currentBank.subtitle} (values in ${currentBank.scale})
        </p>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>
          {currentBank.description}
        </p>
      </motion.div>

      {/* Waterfall Chart */}
      <div style={{
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          height: '250px',
          paddingTop: '20px',
        }} key={animationKey}>
          {waterfallValues.map((item, index) => {
            const barHeight = Math.abs(valueToPercent(item.end - item.start)) || valueToPercent(Math.abs(item.value));
            const barBottom = item.type === 'positive' || item.type === 'negative'
              ? valueToPercent(Math.min(item.start, item.end))
              : 0;
            const isSelected = selectedItem === item.id;

            return (
              <div
                key={item.id}
                style={{
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  position: 'relative',
                }}
              >
                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}%` }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => setSelectedItem(isSelected ? null : item.id)}
                  style={{
                    position: 'absolute',
                    bottom: `${barBottom}%`,
                    left: '10%',
                    right: '10%',
                    backgroundColor: `rgb(${item.color})`,
                    borderRadius: '4px 4px 0 0',
                    cursor: 'pointer',
                    opacity: isSelected ? 1 : 0.85,
                    border: isSelected ? '2px solid white' : 'none',
                    boxShadow: isSelected ? '0 0 10px rgba(0,0,0,0.3)' : 'none',
                    transition: 'opacity 0.2s, border 0.2s',
                    minHeight: '20px',
                  }}
                >
                  {/* Value label on bar */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: `rgb(${item.color})`,
                    whiteSpace: 'nowrap',
                  }}>
                    {item.value > 0 ? '+' : ''}{item.value}
                  </div>
                </motion.div>

                {/* Label below */}
                <div style={{
                  marginTop: '8px',
                  fontSize: '9px',
                  color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  fontWeight: isSelected ? 600 : 400,
                  height: '32px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-surface-2)',
        }}>
          {[
            { label: 'Income', color: '16, 185, 129' },
            { label: 'Expense', color: '239, 68, 68' },
            { label: 'Subtotal', color: '99, 102, 241' },
            { label: 'Provisions', color: '245, 158, 11' },
          ].map(({ label, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                backgroundColor: `rgb(${color})`,
              }} />
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedItemData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{
            padding: '20px',
            backgroundColor: `rgba(${selectedItemData.color}, 0.08)`,
            borderRadius: '12px',
            marginBottom: '24px',
            border: `1px solid rgba(${selectedItemData.color}, 0.2)`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: `rgb(${selectedItemData.color})`, margin: 0 }}>
              {selectedItemData.name}
            </h4>
            <span style={{
              fontSize: '18px',
              fontWeight: 700,
              color: `rgb(${selectedItemData.color})`,
            }}>
              ${Math.abs(bankType === 'jpmorgan' ? selectedItemData.jpmorgan : selectedItemData.community)}
              {bankType === 'jpmorgan' ? 'B' : 'M'}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
            {selectedItemData.description}
          </p>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {selectedItemData.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '6px',
                  lineHeight: '1.4',
                }}
              >
                {detail}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Formula Box */}
      <div style={{
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '12px', textAlign: 'center' }}>
          Income Statement Formula
        </h4>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
        }}>
          <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 600 }}>Interest Income</span>
          <span style={{ color: 'var(--color-text-muted)' }}>-</span>
          <span style={{ color: 'rgb(239, 68, 68)', fontWeight: 600 }}>Interest Expense</span>
          <span style={{ color: 'var(--color-text-muted)' }}>=</span>
          <span style={{ color: 'rgb(99, 102, 241)', fontWeight: 600 }}>NII</span>
          <span style={{ color: 'var(--color-text-muted)' }}>+</span>
          <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 600 }}>Fee Income</span>
          <span style={{ color: 'var(--color-text-muted)' }}>-</span>
          <span style={{ color: 'rgb(239, 68, 68)', fontWeight: 600 }}>OpEx</span>
          <span style={{ color: 'var(--color-text-muted)' }}>-</span>
          <span style={{ color: 'rgb(245, 158, 11)', fontWeight: 600 }}>Provisions</span>
          <span style={{ color: 'var(--color-text-muted)' }}>=</span>
          <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 700 }}>Net Income</span>
        </div>
      </div>

      {/* Comparison Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
      }}>
        {[
          {
            label: 'NII Share',
            jpmorgan: '51%',
            community: '79%',
            description: 'of total revenue',
          },
          {
            label: 'Fee Share',
            jpmorgan: '49%',
            community: '21%',
            description: 'of total revenue',
          },
          {
            label: 'Net Margin',
            jpmorgan: '35%',
            community: '32%',
            description: 'net income / revenue',
          },
        ].map((metric) => (
          <div
            key={metric.label}
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-surface-1)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              {metric.label}
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
              {bankType === 'jpmorgan' ? metric.jpmorgan : metric.community}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {metric.description}
            </div>
          </div>
        ))}
      </div>

      {/* Key Insight */}
      <motion.div
        key={bankType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Key Insight:</strong>{' '}
          {bankType === 'jpmorgan'
            ? 'Large universal banks like JPMorgan have diversified revenue streams - nearly half from fees. This reduces sensitivity to interest rate changes but increases complexity and interconnected risks.'
            : 'Community banks are "spread businesses" - ~80% of revenue comes from the interest rate spread. When rates fall, margins compress. But their model is simpler and more focused on traditional lending relationships.'}
        </div>
      </motion.div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
        Click on any bar to see detailed breakdown
      </p>
    </div>
  );
}
