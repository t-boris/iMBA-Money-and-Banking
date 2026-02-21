'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { AnimatedValue } from '@/components/visualizations/AnimatedValue';

interface FedBalanceSheetExplorerProps {
  className?: string;
}

interface BalanceSheetItem {
  id: string;
  label: string;
  value: number;
  color: string;
  explanation: string;
}

interface EraData {
  id: 'pre2008' | 'post2021';
  label: string;
  subtitle: string;
  total: number;
  assets: BalanceSheetItem[];
  liabilities: BalanceSheetItem[];
}

const eras: EraData[] = [
  {
    id: 'pre2008',
    label: 'Pre-2008',
    subtitle: 'Traditional',
    total: 630,
    assets: [
      {
        id: 'pre-gov-sec',
        label: 'Government Securities',
        value: 550,
        color: 'rgb(16, 185, 129)',
        explanation:
          'Primarily U.S. Treasury securities held outright. This was the Fed\'s main asset — used to conduct open market operations and earn seigniorage revenue.',
      },
      {
        id: 'pre-other-assets',
        label: 'Other Assets',
        value: 80,
        color: 'rgb(74, 222, 128)',
        explanation:
          'Included gold certificates, SDR certificates, coins, and foreign currency holdings. A small portion of the balance sheet reflecting traditional central bank reserves.',
      },
    ],
    liabilities: [
      {
        id: 'pre-currency',
        label: 'Currency in Circulation',
        value: 600,
        color: 'rgb(99, 102, 241)',
        explanation:
          'Physical Federal Reserve Notes (paper bills) held by the public and banks. This dominated the liability side — the Fed\'s main liability to the economy.',
      },
      {
        id: 'pre-reserves',
        label: 'Bank Reserves',
        value: 14,
        color: 'rgb(129, 140, 248)',
        explanation:
          'Deposits held by commercial banks at the Fed. Before 2008, reserves were scarce (~$14B), so the fed funds rate was set by open market operations adjusting this tiny pool.',
      },
      {
        id: 'pre-other-liab',
        label: 'Other Liabilities',
        value: 16,
        color: 'rgb(165, 180, 252)',
        explanation:
          'Included Treasury deposits, foreign official deposits, and deferred availability items. A minor portion of the pre-crisis balance sheet.',
      },
    ],
  },
  {
    id: 'post2021',
    label: 'Post-2021',
    subtitle: 'Post-QE',
    total: 7300,
    assets: [
      {
        id: 'post-treasuries',
        label: 'Treasury Securities',
        value: 4800,
        color: 'rgb(16, 185, 129)',
        explanation:
          'U.S. Treasury securities purchased through multiple rounds of QE. The Fed became the single largest holder of U.S. government debt, absorbing ~25% of outstanding Treasuries.',
      },
      {
        id: 'post-mbs',
        label: 'Agency MBS',
        value: 2200,
        color: 'rgb(34, 197, 94)',
        explanation:
          'Mortgage-backed securities guaranteed by Fannie Mae, Freddie Mac, and Ginnie Mae. Purchased to lower long-term mortgage rates and support the housing market during and after the financial crisis.',
      },
      {
        id: 'post-other-assets',
        label: 'Other Assets',
        value: 300,
        color: 'rgb(74, 222, 128)',
        explanation:
          'Includes gold, foreign currency, central bank liquidity swaps, and lending facility balances. Much larger than pre-2008 due to expanded crisis-era programs.',
      },
    ],
    liabilities: [
      {
        id: 'post-currency',
        label: 'Currency in Circulation',
        value: 2100,
        color: 'rgb(99, 102, 241)',
        explanation:
          'Physical currency grew ~3.5x from pre-2008 levels, reflecting both economic growth and increased global demand for U.S. dollars as a safe haven.',
      },
      {
        id: 'post-reserves',
        label: 'Bank Reserves',
        value: 3200,
        color: 'rgb(129, 140, 248)',
        explanation:
          'Reserves exploded from $14B to $3.2T — a 228x increase. Banks now hold abundant reserves, making the fed funds rate controlled by administered rates (IOER/IORB) rather than reserve scarcity.',
      },
      {
        id: 'post-tga',
        label: 'Treasury General Account',
        value: 500,
        color: 'rgb(165, 180, 252)',
        explanation:
          'The U.S. Treasury\'s checking account at the Fed. Grew significantly as the Treasury built larger cash buffers, especially during COVID-era fiscal programs.',
      },
      {
        id: 'post-onrrp',
        label: 'ON RRP Facility',
        value: 1000,
        color: 'rgb(196, 181, 253)',
        explanation:
          'Overnight Reverse Repo facility — allows money market funds and other eligible counterparties to deposit cash at the Fed overnight. Acts as a floor for short-term rates in the ample-reserves regime.',
      },
      {
        id: 'post-other-liab',
        label: 'Other Liabilities',
        value: 500,
        color: 'rgb(221, 214, 254)',
        explanation:
          'Includes foreign official deposits, deferred availability items, and other miscellaneous liabilities.',
      },
    ],
  },
];

function formatValue(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}T`;
  }
  return `$${value}B`;
}

export default function FedBalanceSheetExplorer({ className }: FedBalanceSheetExplorerProps) {
  const [activeEra, setActiveEra] = useState<'pre2008' | 'post2021'>('pre2008');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const currentEra = eras.find((e) => e.id === activeEra) || eras[0];
  const totalAssets = currentEra.assets.reduce((sum, a) => sum + a.value, 0);
  const totalLiabilities = currentEra.liabilities.reduce((sum, l) => sum + l.value, 0);

  const allItems = [...currentEra.assets, ...currentEra.liabilities];
  const selectedData = allItems.find((item) => item.id === selectedItem);

  const maxValue = Math.max(
    ...currentEra.assets.map((a) => a.value),
    ...currentEra.liabilities.map((l) => l.value)
  );

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '900px', margin: '0 auto' }}>
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
          Federal Reserve Balance Sheet Explorer
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Compare the Fed&apos;s balance sheet before and after the era of quantitative easing.
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
        {eras.map((era) => (
          <motion.button
            key={era.id}
            onClick={() => {
              setActiveEra(era.id);
              setSelectedItem(null);
            }}
            className={cn(
              'px-5 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer',
              'outline-none focus:ring-2 focus:ring-primary-500/50',
              activeEra === era.id
                ? 'border-primary-500 bg-primary-500/10'
                : 'border-surface-2 bg-surface-1 hover:border-surface-3'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color:
                  activeEra === era.id ? 'rgb(99, 102, 241)' : 'var(--color-text-primary)',
              }}
            >
              {era.label}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              {era.subtitle}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Total display */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: 'var(--color-surface-1)',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
          Total Balance Sheet Size
        </div>
        <AnimatedValue
          value={currentEra.total >= 1000 ? currentEra.total / 1000 : currentEra.total}
          prefix="$"
          suffix={currentEra.total >= 1000 ? 'T' : 'B'}
          decimals={currentEra.total >= 1000 ? 1 : 0}
          size="xl"
        />
      </div>

      {/* T-Account layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEra}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: 'var(--color-surface-1)',
            border: '1px solid var(--color-surface-2)',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-2)',
              padding: '12px',
              textAlign: 'center',
              borderBottom: '1px solid var(--color-surface-2)',
            }}
          >
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              T-ACCOUNT — {currentEra.label} ({currentEra.subtitle})
            </h4>
          </div>

          {/* Body */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {/* Assets */}
            <div style={{ padding: '20px', borderRight: '2px solid var(--color-surface-2)' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: 'rgb(16, 185, 129)',
                    fontWeight: 600,
                    fontSize: '14px',
                    borderRadius: '6px',
                  }}
                >
                  ASSETS
                </span>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    marginTop: '4px',
                  }}
                >
                  What the Fed owns
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentEra.assets.map((asset) => (
                  <BalanceSheetBar
                    key={asset.id}
                    item={asset}
                    maxValue={maxValue}
                    isSelected={selectedItem === asset.id}
                    onClick={() =>
                      setSelectedItem(selectedItem === asset.id ? null : asset.id)
                    }
                  />
                ))}
              </div>

              {/* Total */}
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '2px solid rgb(16, 185, 129)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  TOTAL
                </span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'rgb(16, 185, 129)' }}>
                  {formatValue(totalAssets)}
                </span>
              </div>
            </div>

            {/* Liabilities */}
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    color: 'rgb(99, 102, 241)',
                    fontWeight: 600,
                    fontSize: '14px',
                    borderRadius: '6px',
                  }}
                >
                  LIABILITIES
                </span>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    marginTop: '4px',
                  }}
                >
                  What the Fed owes
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentEra.liabilities.map((liability) => (
                  <BalanceSheetBar
                    key={liability.id}
                    item={liability}
                    maxValue={maxValue}
                    isSelected={selectedItem === liability.id}
                    onClick={() =>
                      setSelectedItem(selectedItem === liability.id ? null : liability.id)
                    }
                  />
                ))}
              </div>

              {/* Total */}
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '2px solid rgb(99, 102, 241)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  TOTAL
                </span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
                  {formatValue(totalLiabilities)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Explanation panel */}
      <AnimatePresence mode="wait">
        {selectedData && (
          <motion.div
            key={selectedData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: '16px' }}
          >
            <div
              className={cn(
                'p-5 rounded-xl',
                'bg-surface-1 border border-surface-2 shadow-sm'
              )}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    backgroundColor: selectedData.color,
                    flexShrink: 0,
                  }}
                />
                <h4
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {selectedData.label}
                  <span
                    style={{
                      marginLeft: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {formatValue(selectedData.value)}
                  </span>
                </h4>
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                {selectedData.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>💡</span>
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(217, 119, 6)',
                marginBottom: '4px',
              }}
            >
              Key Insight
            </h4>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              The balance sheet grew 11x from $630B to $7.3T — mostly through QE purchases of
              Treasuries and MBS. Bank reserves exploded from $14B to $3.2T, fundamentally
              changing how the Fed implements monetary policy from a scarce-reserves corridor
              system to an ample-reserves floor system.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Hint text */}
      {!selectedData && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            marginTop: '16px',
          }}
        >
          Click on any balance sheet item to learn more about it
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bar component for each balance sheet item                          */
/* ------------------------------------------------------------------ */

interface BalanceSheetBarProps {
  item: BalanceSheetItem;
  maxValue: number;
  isSelected: boolean;
  onClick: () => void;
}

function BalanceSheetBar({ item, maxValue, isSelected, onClick }: BalanceSheetBarProps) {
  const percentage = (item.value / maxValue) * 100;

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'w-full text-left cursor-pointer rounded-lg p-2 -m-2 transition-colors',
        'outline-none focus:ring-2 focus:ring-primary-500/50',
        isSelected ? 'bg-surface-2' : 'hover:bg-surface-2/50'
      )}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      style={{ border: 'none', background: isSelected ? undefined : 'transparent' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
        }}
      >
        <span
          style={{
            fontSize: '13px',
            color: isSelected ? item.color : 'var(--color-text-secondary)',
            fontWeight: isSelected ? 600 : 400,
            transition: 'all 0.2s',
          }}
        >
          {item.label}
        </span>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          {formatValue(item.value)}
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
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{
            height: '100%',
            backgroundColor: item.color,
            borderRadius: '4px',
            opacity: isSelected ? 1 : 0.8,
          }}
        />
      </div>
    </motion.button>
  );
}
