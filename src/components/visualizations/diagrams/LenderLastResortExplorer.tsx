'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 };

type TabId = 'bagehot' | 'comparison' | 'expansion';

const tabs: { id: TabId; label: string }[] = [
  { id: 'bagehot', label: "Bagehot's Dictum" },
  { id: 'comparison', label: '2008 vs 2020' },
  { id: 'expansion', label: 'Expanding Safety Net' },
];

// ── Bagehot's Three Pillars ──
function BagehotView() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars = [
    {
      title: 'Lend Freely',
      subtitle: 'Stop the panic',
      detail: 'During a crisis, hesitation kills. The central bank must make clear it will provide unlimited liquidity to any solvent institution. This commitment alone can stop a run before it starts.',
      color: 'rgb(59, 130, 246)',
      icon: '💧',
      example: 'In 2008, the Fed established the Term Auction Facility (TAF) to lend billions to banks without the stigma of the discount window.',
    },
    {
      title: 'Good Collateral',
      subtitle: 'Protect taxpayers',
      detail: "Lending should be secured by assets worth more than the loan. This ensures taxpayers are protected if the borrower can't repay. Only solvent institutions with good assets qualify.",
      color: 'rgb(16, 185, 129)',
      icon: '🛡️',
      example: "The distinction matters: Bear Stearns had good collateral (agency MBS) and was helped. Lehman's collateral was questionable.",
    },
    {
      title: 'Penalty Rate',
      subtitle: 'Prevent abuse',
      detail: 'Charging above-market rates ensures borrowers only come to the central bank as a last resort and return to private markets as soon as possible. It prevents the safety net from becoming a permanent subsidy.',
      color: 'rgb(245, 158, 11)',
      icon: '⚠️',
      example: 'The discount window rate is set above the fed funds target — typically 25-50 basis points higher — to discourage non-emergency use.',
    },
  ];

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
        Walter Bagehot (1873) established the framework for central bank crisis lending that has guided
        policy for 150 years. Three principles must all be satisfied.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
        {pillars.map((p, i) => (
          <motion.button
            key={p.title}
            onClick={() => setActivePillar(activePillar === i ? null : i)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, ...spring }}
            style={{
              padding: '16px 10px',
              borderRadius: '10px',
              border: `2px solid ${activePillar === i ? p.color : 'var(--color-surface-2)'}`,
              backgroundColor: activePillar === i
                ? `color-mix(in srgb, ${p.color} 10%, var(--color-surface-0))`
                : 'var(--color-surface-0)',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>{p.icon}</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: p.color }}>{p.title}</div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{p.subtitle}</div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activePillar !== null && (
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              borderLeft: `4px solid ${pillars[activePillar].color}`,
              backgroundColor: 'var(--color-surface-0)',
              border: `1px solid var(--color-surface-2)`,
            }}>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '8px' }}>
                {pillars[activePillar].detail}
              </div>
              <div style={{
                padding: '8px',
                borderRadius: '6px',
                backgroundColor: `color-mix(in srgb, ${pillars[activePillar].color} 8%, transparent)`,
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}>
                <strong style={{ color: pillars[activePillar].color }}>Example:</strong> {pillars[activePillar].example}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── 2008 vs 2020 Comparison ──
function ComparisonView() {
  const facilities = [
    {
      name: 'Term Auction Facility (TAF)',
      year2008: true,
      year2020: false,
      target: 'Banks',
      description: 'Auctioned discount window loans to remove stigma',
    },
    {
      name: 'Primary Dealer Credit Facility',
      year2008: true,
      year2020: true,
      target: 'Broker-dealers',
      description: 'Overnight loans to non-bank primary dealers',
    },
    {
      name: 'Commercial Paper Funding',
      year2008: true,
      year2020: true,
      target: 'CP issuers',
      description: 'Direct purchase of commercial paper',
    },
    {
      name: 'Money Market Lending (AMLF/MMLF)',
      year2008: true,
      year2020: true,
      target: 'Money market funds',
      description: 'Loans to support money market fund redemptions',
    },
    {
      name: 'Main Street Lending',
      year2008: false,
      year2020: true,
      target: 'Mid-size businesses',
      description: 'Direct loans to businesses too small for bond markets',
    },
    {
      name: 'Municipal Liquidity Facility',
      year2008: false,
      year2020: true,
      target: 'State/local govt',
      description: 'Purchase of municipal notes',
    },
    {
      name: 'Corporate Bond Purchases',
      year2008: false,
      year2020: true,
      target: 'Corporations',
      description: 'Fed buys corporate bonds and bond ETFs directly',
    },
    {
      name: 'Paycheck Protection Lending',
      year2008: false,
      year2020: true,
      target: 'Small businesses',
      description: 'Loans supporting PPP small business program',
    },
  ];

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
        The Fed expanded its crisis toolkit dramatically between 2008 and 2020, reaching far beyond traditional
        bank lending into corporate bonds, municipal debt, and small business loans.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '2px solid var(--color-surface-2)', color: 'var(--color-text-secondary)' }}>
                Facility
              </th>
              <th style={{ textAlign: 'center', padding: '6px 8px', borderBottom: '2px solid var(--color-surface-2)', color: 'var(--color-text-secondary)', width: '50px' }}>
                2008
              </th>
              <th style={{ textAlign: 'center', padding: '6px 8px', borderBottom: '2px solid var(--color-surface-2)', color: 'var(--color-text-secondary)', width: '50px' }}>
                2020
              </th>
              <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '2px solid var(--color-surface-2)', color: 'var(--color-text-secondary)' }}>
                Target
              </th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((f, i) => (
              <motion.tr
                key={f.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                style={{ borderBottom: '1px solid var(--color-surface-2)' }}
              >
                <td style={{ padding: '6px 8px', color: 'var(--color-text-primary)', fontWeight: 500 }}>{f.name}</td>
                <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                  {f.year2008 ? (
                    <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 700 }}>&#x2713;</span>
                  ) : (
                    <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                  )}
                </td>
                <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                  {f.year2020 ? (
                    <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 700 }}>&#x2713;</span>
                  ) : (
                    <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                  )}
                </td>
                <td style={{ padding: '6px 8px', color: 'var(--color-text-muted)' }}>{f.target}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Expanding Safety Net ──
function ExpansionView() {
  const [era, setEra] = useState(0);

  const eras = [
    {
      label: 'Pre-1913',
      title: 'No Safety Net',
      entities: ['Private bankers (J.P. Morgan)'],
      color: 'rgb(156, 163, 175)',
      description: 'Before the Fed, crisis response depended on wealthy private citizens organizing ad hoc rescues.',
    },
    {
      label: '1913-2007',
      title: 'Traditional Banking Safety Net',
      entities: ['Commercial banks', 'Savings institutions'],
      color: 'rgb(59, 130, 246)',
      description: 'The Fed served as lender of last resort to regulated banks. Discount window + FDIC covered the traditional banking system.',
    },
    {
      label: '2008',
      title: 'Expanded to Shadow Banking',
      entities: ['Commercial banks', 'Savings institutions', 'Investment banks', 'Money market funds', 'AIG (insurance)'],
      color: 'rgb(245, 158, 11)',
      description: 'The crisis forced the Fed to lend to non-bank financial institutions for the first time, acknowledging that the financial system had outgrown traditional banking.',
    },
    {
      label: '2020',
      title: 'Expanded to Real Economy',
      entities: ['Commercial banks', 'Savings institutions', 'Investment banks', 'Money market funds', 'Corporate bond issuers', 'Small businesses', 'Municipalities', 'States'],
      color: 'rgb(16, 185, 129)',
      description: 'The Fed crossed into direct lending to non-financial businesses and governments — territory previously considered fiscal policy, not monetary policy.',
    },
  ];

  const currentEra = eras[era];

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
        Each crisis expanded who the Fed would rescue. Track the expanding circle of protection.
      </p>

      {/* Era slider */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {eras.map((e, i) => (
          <button
            key={e.label}
            onClick={() => setEra(i)}
            style={{
              flex: 1,
              padding: '6px 4px',
              borderRadius: '6px',
              border: `2px solid ${era === i ? e.color : 'var(--color-surface-2)'}`,
              backgroundColor: era === i ? `color-mix(in srgb, ${e.color} 12%, transparent)` : 'var(--color-surface-0)',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 600,
              color: era === i ? e.color : 'var(--color-text-muted)',
            }}
          >
            {e.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={era}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: currentEra.color, marginBottom: '4px' }}>
              {currentEra.title}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
              {currentEra.description}
            </div>
          </div>

          {/* Protected entities */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {currentEra.entities.map((entity, i) => (
              <motion.div
                key={entity}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, ...spring }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backgroundColor: `color-mix(in srgb, ${currentEra.color} 12%, transparent)`,
                  border: `1px solid ${currentEra.color}`,
                  fontSize: '11px',
                  fontWeight: 500,
                  color: currentEra.color,
                }}
              >
                {entity}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Main Component ──
export default function LenderLastResortExplorer() {
  const [activeTab, setActiveTab] = useState<TabId>('bagehot');

  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-surface-2)',
        backgroundColor: 'var(--color-surface-1)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '16px 16px 0' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          Lender of Last Resort
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
          How the Fed stops financial panics — from Bagehot&apos;s 1873 framework to modern emergency facilities
        </p>

        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--color-surface-2)', marginBottom: '16px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium rounded-t-lg transition-colors',
                activeTab === tab.id
                  ? 'bg-surface-0 text-primary-500 border-b-2 border-primary-500'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'bagehot' && <BagehotView />}
            {activeTab === 'comparison' && <ComparisonView />}
            {activeTab === 'expansion' && <ExpansionView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
