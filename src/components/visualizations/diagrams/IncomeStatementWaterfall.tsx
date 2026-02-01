'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface IncomeStatementWaterfallProps {
  className?: string;
}

type BankType = 'jpmorgan' | 'community';

interface IncomeItem {
  id: string;
  label: string;
  jpmorgan: number;
  community: number;
  type: 'add' | 'subtract' | 'result';
  description: string;
}

const incomeData: IncomeItem[] = [
  {
    id: 'interest-income',
    label: 'Interest Income',
    jpmorgan: 89,
    community: 42,
    type: 'add',
    description: 'Income from loans and securities',
  },
  {
    id: 'interest-expense',
    label: 'Interest Expense',
    jpmorgan: 29,
    community: 12,
    type: 'subtract',
    description: 'Cost of deposits and borrowings',
  },
  {
    id: 'nii',
    label: 'Net Interest Income',
    jpmorgan: 60,
    community: 30,
    type: 'result',
    description: 'Core banking profit',
  },
  {
    id: 'fee-income',
    label: 'Non-Interest Income',
    jpmorgan: 58,
    community: 8,
    type: 'add',
    description: 'Fees, trading, asset management',
  },
  {
    id: 'total-revenue',
    label: 'Total Revenue',
    jpmorgan: 118,
    community: 38,
    type: 'result',
    description: 'All revenue sources combined',
  },
  {
    id: 'operating-expense',
    label: 'Operating Expense',
    jpmorgan: 69,
    community: 24,
    type: 'subtract',
    description: 'Salaries, technology, facilities',
  },
  {
    id: 'provisions',
    label: 'Loan Loss Provisions',
    jpmorgan: 8,
    community: 2,
    type: 'subtract',
    description: 'Reserve for expected defaults',
  },
  {
    id: 'net-income',
    label: 'Net Income',
    jpmorgan: 41,
    community: 12,
    type: 'result',
    description: 'Bottom line profit',
  },
];

export function IncomeStatementWaterfall({ className }: IncomeStatementWaterfallProps) {
  const [bankType, setBankType] = useState<BankType>('jpmorgan');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const bankInfo = {
    jpmorgan: { name: 'JPMorgan Chase', scale: 'B', unit: 'billions' },
    community: { name: 'Community Bank', scale: 'M', unit: 'millions' },
  };

  const current = bankInfo[bankType];

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '700px', margin: '0 auto' }}>
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
          Bank Income Statement
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          How banks generate profit: from revenue to net income
        </p>
      </div>

      {/* Bank Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        {(['jpmorgan', 'community'] as BankType[]).map((type) => (
          <button
            key={type}
            onClick={() => setBankType(type)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor:
                bankType === type ? 'rgba(99, 102, 241, 0.15)' : 'var(--color-surface-1)',
              color: bankType === type ? 'rgb(99, 102, 241)' : 'var(--color-text-secondary)',
              fontWeight: bankType === type ? 600 : 400,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {type === 'jpmorgan' ? 'JPMorgan ($B)' : 'Community Bank ($M)'}
          </button>
        ))}
      </div>

      {/* Income Flow */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '24px',
        }}
      >
        {incomeData.map((item, index) => {
          const value = bankType === 'jpmorgan' ? item.jpmorgan : item.community;
          const isResult = item.type === 'result';
          const isSubtract = item.type === 'subtract';
          const isSelected = selectedId === item.id;

          // Colors
          const bgColor = isResult
            ? 'rgba(99, 102, 241, 0.15)'
            : isSubtract
              ? 'rgba(239, 68, 68, 0.08)'
              : 'rgba(16, 185, 129, 0.08)';
          const textColor = isResult
            ? 'rgb(99, 102, 241)'
            : isSubtract
              ? 'rgb(239, 68, 68)'
              : 'rgb(16, 185, 129)';
          const symbol = isSubtract ? '−' : isResult ? '=' : '+';

          return (
            <div key={item.id}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedId(isSelected ? null : item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  backgroundColor: bgColor,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: isSelected ? `2px solid ${textColor}` : '2px solid transparent',
                  transition: 'border 0.2s',
                }}
              >
                {/* Symbol */}
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    backgroundColor: textColor,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {symbol}
                </div>

                {/* Label */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: isResult ? '15px' : '14px',
                      fontWeight: isResult ? 700 : 500,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {item.label}
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        marginTop: '2px',
                      }}
                    >
                      {item.description}
                    </motion.div>
                  )}
                </div>

                {/* Value */}
                <div
                  style={{
                    fontSize: isResult ? '20px' : '18px',
                    fontWeight: 700,
                    color: textColor,
                    minWidth: '70px',
                    textAlign: 'right',
                  }}
                >
                  ${value}
                  {current.scale}
                </div>
              </motion.div>

              {/* Connector line between items */}
              {index < incomeData.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '4px 0',
                  }}
                >
                  <div
                    style={{
                      width: '2px',
                      height: '12px',
                      backgroundColor: 'var(--color-surface-2)',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginTop: '24px',
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
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            NII Share
          </div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'rgb(16, 185, 129)' }}>
            {bankType === 'jpmorgan' ? '51%' : '79%'}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>of revenue</div>
        </div>
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Fee Share
          </div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
            {bankType === 'jpmorgan' ? '49%' : '21%'}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>of revenue</div>
        </div>
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Net Margin
          </div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'rgb(245, 158, 11)' }}>
            {bankType === 'jpmorgan' ? '35%' : '32%'}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>profit/revenue</div>
        </div>
      </div>

      {/* Key Insight */}
      <motion.div
        key={bankType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
            ? 'Universal banks like JPMorgan earn nearly half their revenue from fees (trading, investment banking, asset management). This diversification reduces interest rate sensitivity.'
            : 'Community banks are "spread businesses" — ~80% of revenue comes from the interest rate spread between loans and deposits. Simpler model, but more sensitive to rate changes.'}
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
        Click any row for more details
      </p>
    </div>
  );
}
