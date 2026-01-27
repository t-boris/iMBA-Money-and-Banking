'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface BankBalanceSheetDetailedProps {
  className?: string;
}

type BankType = 'money-center' | 'community';

interface CategoryData {
  name: string;
  percentage: number;
  amount: number;
  subItems: { name: string; percentage: number }[];
  isExpanded?: boolean;
  isTradingBook?: boolean;
}

interface BalanceSheetData {
  assets: CategoryData[];
  liabilities: CategoryData[];
  totalAssets: number;
}

const moneyCenter: BalanceSheetData = {
  totalAssets: 3400, // $3.4 trillion (JPMorgan scale)
  assets: [
    {
      name: 'Cash & Reserves',
      percentage: 10,
      amount: 340,
      subItems: [
        { name: 'Vault Cash', percentage: 1 },
        { name: 'Reserves at Fed', percentage: 7 },
        { name: 'Due from Banks', percentage: 2 },
      ],
    },
    {
      name: 'Securities - Banking Book',
      percentage: 15,
      amount: 510,
      subItems: [
        { name: 'Treasury Bonds (HTM)', percentage: 8 },
        { name: 'Agency Securities', percentage: 5 },
        { name: 'Municipal Bonds', percentage: 2 },
      ],
    },
    {
      name: 'Securities - Trading Book',
      percentage: 10,
      amount: 340,
      isTradingBook: true,
      subItems: [
        { name: 'Equity Positions', percentage: 3 },
        { name: 'Bond Positions', percentage: 4 },
        { name: 'Derivatives (Long)', percentage: 3 },
      ],
    },
    {
      name: 'Loans',
      percentage: 55,
      amount: 1870,
      subItems: [
        { name: 'Mortgages', percentage: 20 },
        { name: 'Credit Cards', percentage: 8 },
        { name: 'Auto Loans', percentage: 5 },
        { name: 'Corporate Loans', percentage: 15 },
        { name: 'Commercial Real Estate', percentage: 7 },
      ],
    },
    {
      name: 'Other Assets',
      percentage: 10,
      amount: 340,
      subItems: [
        { name: 'Goodwill', percentage: 4 },
        { name: 'Premises & Equipment', percentage: 3 },
        { name: 'Other', percentage: 3 },
      ],
    },
  ],
  liabilities: [
    {
      name: 'Deposits',
      percentage: 60,
      amount: 2040,
      subItems: [
        { name: 'Transaction Accounts', percentage: 25 },
        { name: 'Savings Accounts', percentage: 20 },
        { name: 'Time Deposits (CDs)', percentage: 15 },
      ],
    },
    {
      name: 'Borrowings',
      percentage: 30,
      amount: 1020,
      subItems: [
        { name: 'Fed Funds Purchased', percentage: 5 },
        { name: 'Repo Agreements', percentage: 12 },
        { name: 'Long-term Debt', percentage: 13 },
      ],
    },
    {
      name: 'Equity',
      percentage: 10,
      amount: 340,
      subItems: [
        { name: 'Common Stock', percentage: 3 },
        { name: 'Retained Earnings', percentage: 5 },
        { name: 'Other Equity', percentage: 2 },
      ],
    },
  ],
};

const communityBank: BalanceSheetData = {
  totalAssets: 2, // $2 billion (typical community bank)
  assets: [
    {
      name: 'Cash & Reserves',
      percentage: 8,
      amount: 0.16,
      subItems: [
        { name: 'Vault Cash', percentage: 2 },
        { name: 'Reserves at Fed', percentage: 5 },
        { name: 'Due from Banks', percentage: 1 },
      ],
    },
    {
      name: 'Securities',
      percentage: 15,
      amount: 0.3,
      subItems: [
        { name: 'Treasury Bonds', percentage: 8 },
        { name: 'Municipal Bonds', percentage: 5 },
        { name: 'Agency Securities', percentage: 2 },
      ],
    },
    {
      name: 'Loans',
      percentage: 70,
      amount: 1.4,
      subItems: [
        { name: 'Residential Mortgages', percentage: 30 },
        { name: 'Commercial Real Estate', percentage: 20 },
        { name: 'Small Business Loans', percentage: 12 },
        { name: 'Consumer Loans', percentage: 8 },
      ],
    },
    {
      name: 'Other Assets',
      percentage: 7,
      amount: 0.14,
      subItems: [
        { name: 'Premises & Equipment', percentage: 4 },
        { name: 'Other', percentage: 3 },
      ],
    },
  ],
  liabilities: [
    {
      name: 'Deposits',
      percentage: 85,
      amount: 1.7,
      subItems: [
        { name: 'Transaction Accounts', percentage: 30 },
        { name: 'Savings Accounts', percentage: 35 },
        { name: 'Time Deposits (CDs)', percentage: 20 },
      ],
    },
    {
      name: 'Borrowings',
      percentage: 5,
      amount: 0.1,
      subItems: [
        { name: 'FHLB Advances', percentage: 3 },
        { name: 'Other Borrowings', percentage: 2 },
      ],
    },
    {
      name: 'Equity',
      percentage: 10,
      amount: 0.2,
      subItems: [
        { name: 'Common Stock', percentage: 4 },
        { name: 'Retained Earnings', percentage: 6 },
      ],
    },
  ],
};

function formatAmount(amount: number, totalAssets: number): string {
  if (totalAssets > 100) {
    // Money center - billions
    return `$${amount.toFixed(0)}B`;
  }
  // Community bank - billions with decimals
  return `$${amount.toFixed(1)}B`;
}

function CategoryItem({
  category,
  isAsset,
  totalAssets,
  isExpanded,
  onToggle,
}: {
  category: CategoryData;
  isAsset: boolean;
  totalAssets: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const baseColor = isAsset
    ? category.isTradingBook
      ? 'rgb(99, 102, 241)' // Trading book in indigo
      : 'rgb(59, 130, 246)' // Banking book in blue
    : category.name === 'Equity'
      ? 'rgb(16, 185, 129)' // Equity in emerald
      : 'rgb(245, 158, 11)'; // Liabilities in amber

  return (
    <div style={{ marginBottom: '12px' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: isExpanded ? 'var(--color-surface-2)' : 'var(--color-surface-1)',
          border: `1px solid ${isExpanded ? baseColor : 'var(--color-surface-2)'}`,
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <motion.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
            >
              ▶
            </motion.span>
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              {category.name}
              {category.isTradingBook && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  color: 'rgb(99, 102, 241)',
                  borderRadius: '4px',
                  fontWeight: 500,
                }}>
                  MTM
                </span>
              )}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: baseColor }}>
              {category.percentage}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              {formatAmount(category.amount, totalAssets)}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          height: '6px',
          backgroundColor: 'var(--color-surface-2)',
          borderRadius: '3px',
          overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${category.percentage}%` }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              height: '100%',
              backgroundColor: baseColor,
              borderRadius: '3px',
              background: category.isTradingBook
                ? `repeating-linear-gradient(45deg, ${baseColor}, ${baseColor} 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 8px)`
                : baseColor,
            }}
          />
        </div>
      </button>

      {/* Expanded sub-items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: '8px',
              marginLeft: '20px',
              padding: '12px',
              backgroundColor: 'var(--color-surface-1)',
              borderRadius: '8px',
              border: '1px dashed var(--color-surface-2)',
            }}>
              {category.subItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: idx < category.subItems.length - 1 ? '1px solid var(--color-surface-2)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: baseColor }}>
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BankBalanceSheetDetailed({ className }: BankBalanceSheetDetailedProps) {
  const [bankType, setBankType] = useState<BankType>('money-center');
  const [expandedAssets, setExpandedAssets] = useState<Set<number>>(new Set());
  const [expandedLiabilities, setExpandedLiabilities] = useState<Set<number>>(new Set());

  const data = bankType === 'money-center' ? moneyCenter : communityBank;

  const toggleAsset = (index: number) => {
    const newExpanded = new Set(expandedAssets);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedAssets(newExpanded);
  };

  const toggleLiability = (index: number) => {
    const newExpanded = new Set(expandedLiabilities);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedLiabilities(newExpanded);
  };

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Detailed Bank Balance Sheet
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Assets (what the bank owns) must equal Liabilities + Equity (how the bank is funded)
        </p>
      </div>

      {/* Bank Type Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => {
            setBankType('money-center');
            setExpandedAssets(new Set());
            setExpandedLiabilities(new Set());
          }}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            border: bankType === 'money-center' ? '2px solid rgb(99, 102, 241)' : '2px solid var(--color-surface-2)',
            backgroundColor: bankType === 'money-center' ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-surface-1)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🏛️</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: bankType === 'money-center' ? 'rgb(99, 102, 241)' : 'var(--color-text-primary)',
              }}>
                Money Center Bank
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                JPMorgan-scale ($3.4T assets)
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            setBankType('community');
            setExpandedAssets(new Set());
            setExpandedLiabilities(new Set());
          }}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            border: bankType === 'community' ? '2px solid rgb(16, 185, 129)' : '2px solid var(--color-surface-2)',
            backgroundColor: bankType === 'community' ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-surface-1)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🏘️</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: bankType === 'community' ? 'rgb(16, 185, 129)' : 'var(--color-text-primary)',
              }}>
                Community Bank
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Local bank ($2B assets)
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Main Balance Sheet Grid */}
      <motion.div
        key={bankType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        {/* Assets Column */}
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '2px solid rgba(59, 130, 246, 0.3)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              color: 'rgb(59, 130, 246)',
              fontWeight: 700,
              fontSize: '16px',
              borderRadius: '8px',
            }}>
              ASSETS
            </span>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
              What the bank owns (Uses of Funds)
            </p>
          </div>

          {data.assets.map((category, index) => (
            <CategoryItem
              key={`${bankType}-asset-${index}`}
              category={category}
              isAsset={true}
              totalAssets={data.totalAssets}
              isExpanded={expandedAssets.has(index)}
              onToggle={() => toggleAsset(index)}
            />
          ))}

          {/* Total */}
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '2px solid rgb(59, 130, 246)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              TOTAL ASSETS
            </span>
            <span style={{ fontSize: '22px', fontWeight: 700, color: 'rgb(59, 130, 246)' }}>
              {data.totalAssets > 100 ? `$${(data.totalAssets / 1000).toFixed(1)}T` : `$${data.totalAssets}B`}
            </span>
          </div>
        </div>

        {/* Liabilities + Equity Column */}
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '2px solid rgba(245, 158, 11, 0.3)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: 'rgb(245, 158, 11)',
              fontWeight: 700,
              fontSize: '16px',
              borderRadius: '8px',
            }}>
              LIABILITIES + EQUITY
            </span>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
              How the bank is funded (Sources of Funds)
            </p>
          </div>

          {data.liabilities.map((category, index) => (
            <CategoryItem
              key={`${bankType}-liability-${index}`}
              category={category}
              isAsset={false}
              totalAssets={data.totalAssets}
              isExpanded={expandedLiabilities.has(index)}
              onToggle={() => toggleLiability(index)}
            />
          ))}

          {/* Total */}
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '2px solid rgb(245, 158, 11)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              TOTAL L + E
            </span>
            <span style={{ fontSize: '22px', fontWeight: 700, color: 'rgb(245, 158, 11)' }}>
              {data.totalAssets > 100 ? `$${(data.totalAssets / 1000).toFixed(1)}T` : `$${data.totalAssets}B`}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Balance Indicator */}
      <div style={{
        padding: '12px 20px',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderRadius: '10px',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}>
          ✓ Assets = Liabilities + Equity (Balance Sheet Always Balances)
        </span>
      </div>

      {/* Key Differences Box */}
      <motion.div
        key={`insight-${bankType}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: '20px',
          backgroundColor: bankType === 'money-center' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(16, 185, 129, 0.1)',
          borderRadius: '12px',
          border: `1px solid ${bankType === 'money-center' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
          marginBottom: '20px',
        }}
      >
        <h4 style={{
          fontSize: '15px',
          fontWeight: 600,
          color: bankType === 'money-center' ? 'rgb(99, 102, 241)' : 'rgb(16, 185, 129)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>{bankType === 'money-center' ? '🏛️' : '🏘️'}</span>
          {bankType === 'money-center' ? 'Money Center Bank Characteristics' : 'Community Bank Characteristics'}
        </h4>

        {bankType === 'money-center' ? (
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
            <li><strong>Trading Book:</strong> Significant trading assets (marked to market daily) for market-making</li>
            <li><strong>Wholesale Funding:</strong> Heavy reliance on repo and interbank borrowing (30% vs 5%)</li>
            <li><strong>Diverse Loan Portfolio:</strong> Mix of retail, corporate, and international lending</li>
            <li><strong>Complex Structure:</strong> Multiple business lines including investment banking</li>
          </ul>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
            <li><strong>Deposit-Heavy:</strong> 85% funded by deposits (vs 60% for money center)</li>
            <li><strong>Loan-Focused:</strong> 70% of assets in traditional loans (vs 55%)</li>
            <li><strong>No Trading Book:</strong> Securities held for investment, not trading</li>
            <li><strong>Local Focus:</strong> Residential mortgages and small business loans dominate</li>
          </ul>
        )}
      </motion.div>

      {/* Banking Book vs Trading Book Legend */}
      {bankType === 'money-center' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '10px',
            border: '1px solid var(--color-surface-2)',
          }}
        >
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '12px' }}>
            Banking Book vs Trading Book
          </h4>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '12px',
                backgroundColor: 'rgb(59, 130, 246)',
                borderRadius: '3px',
              }} />
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <strong>Banking Book:</strong> Held to maturity, recorded at cost
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '12px',
                background: 'repeating-linear-gradient(45deg, rgb(99, 102, 241), rgb(99, 102, 241) 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)',
                borderRadius: '3px',
              }} />
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <strong>Trading Book:</strong> Marked to market daily, profits/losses recognized
              </span>
            </div>
          </div>
        </motion.div>
      )}

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
        Click on each category to expand and see detailed breakdown
      </p>
    </div>
  );
}
