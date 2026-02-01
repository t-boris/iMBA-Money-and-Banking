'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface BankBalanceSheetProps {
  className?: string;
}

interface BalanceSheetState {
  reserves: number;
  loans: number;
  securities: number;
  deposits: number;
  borrowings: number;
  equity: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  state: BalanceSheetState;
  insight: string;
}

// All scenarios are balanced: Assets = Liabilities
const scenarios: Scenario[] = [
  {
    id: 'normal',
    name: 'Healthy Bank',
    description: 'Typical well-managed bank',
    icon: '🏦',
    state: {
      reserves: 100,
      loans: 700,
      securities: 200,
      deposits: 800,
      borrowings: 100,
      equity: 100,
    },
    insight:
      'A healthy bank keeps about 10% reserves against deposits, maintains diverse assets, and has adequate equity capital.',
  },
  {
    id: 'aggressive',
    name: 'Aggressive Lender',
    description: 'High loans, low reserves',
    icon: '📈',
    state: {
      reserves: 30,
      loans: 870,
      securities: 100,
      deposits: 800,
      borrowings: 150,
      equity: 50,
    },
    insight:
      'This bank maximizes lending to earn more interest, but has low reserves and thin equity — vulnerable to loan defaults.',
  },
  {
    id: 'conservative',
    name: 'Conservative Bank',
    description: 'High reserves, cautious lending',
    icon: '🛡️',
    state: {
      reserves: 200,
      loans: 500,
      securities: 300,
      deposits: 800,
      borrowings: 50,
      equity: 150,
    },
    insight:
      'This bank prioritizes safety over profits. High reserves and equity provide a buffer, but lower lending means lower returns.',
  },
];

export function BankBalanceSheet({ className }: BankBalanceSheetProps) {
  const [activeScenario, setActiveScenario] = useState<string>('normal');

  const currentScenario = scenarios.find((s) => s.id === activeScenario) || scenarios[0];
  const state = currentScenario.state;

  // Calculate totals (always balanced)
  const totalAssets = state.reserves + state.loans + state.securities;
  const totalLiabilities = state.deposits + state.borrowings + state.equity;

  // Calculate key ratios
  const reserveRatio = (state.reserves / state.deposits) * 100;
  const loanToDeposit = (state.loans / state.deposits) * 100;
  const leverage = totalAssets / state.equity;

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
          Bank Balance Sheet
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          A bank&apos;s assets (what it owns) must always equal its liabilities (what it owes) plus
          equity.
        </p>
      </div>

      {/* Scenario buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setActiveScenario(scenario.id)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border:
                activeScenario === scenario.id
                  ? '2px solid rgb(99, 102, 241)'
                  : '2px solid var(--color-surface-2)',
              backgroundColor:
                activeScenario === scenario.id
                  ? 'rgba(99, 102, 241, 0.1)'
                  : 'var(--color-surface-1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: '20px' }}>{scenario.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color:
                    activeScenario === scenario.id
                      ? 'rgb(99, 102, 241)'
                      : 'var(--color-text-primary)',
                }}
              >
                {scenario.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                {scenario.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* T-Account */}
      <div
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
            T-ACCOUNT
          </h4>
        </div>

        {/* Body - Assets | Liabilities */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Assets (Left) */}
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
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Uses of Funds
              </p>
            </div>

            {/* Asset items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AssetItem
                label="Reserves"
                value={state.reserves}
                color="rgb(16, 185, 129)"
                total={totalAssets}
              />
              <AssetItem
                label="Loans"
                value={state.loans}
                color="rgb(34, 197, 94)"
                total={totalAssets}
              />
              <AssetItem
                label="Securities"
                value={state.securities}
                color="rgb(74, 222, 128)"
                total={totalAssets}
              />
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
                style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}
              >
                TOTAL
              </span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgb(16, 185, 129)' }}>
                ${totalAssets}B
              </span>
            </div>
          </div>

          {/* Liabilities (Right) */}
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
                LIABILITIES + EQUITY
              </span>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Sources of Funds
              </p>
            </div>

            {/* Liability items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AssetItem
                label="Deposits"
                value={state.deposits}
                color="rgb(99, 102, 241)"
                total={totalLiabilities}
              />
              <AssetItem
                label="Borrowings"
                value={state.borrowings}
                color="rgb(129, 140, 248)"
                total={totalLiabilities}
              />
              <AssetItem
                label="Equity"
                value={state.equity}
                color="rgb(165, 180, 252)"
                total={totalLiabilities}
                isEquity
              />
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
                style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}
              >
                TOTAL
              </span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
                ${totalLiabilities}B
              </span>
            </div>
          </div>
        </div>

        {/* Balance indicator */}
        <div
          style={{
            padding: '12px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderTop: '1px solid rgba(16, 185, 129, 0.3)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgb(16, 185, 129)' }}>
            Assets = Liabilities + Equity (Always Balanced)
          </span>
        </div>
      </div>

      {/* Key Ratios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Key Ratios
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <RatioCard
            label="Reserve Ratio"
            value={reserveRatio}
            suffix="%"
            description="Reserves / Deposits"
            color={
              reserveRatio < 5
                ? 'rgb(239, 68, 68)'
                : reserveRatio < 10
                  ? 'rgb(245, 158, 11)'
                  : 'rgb(16, 185, 129)'
            }
          />
          <RatioCard
            label="Loan-to-Deposit"
            value={loanToDeposit}
            suffix="%"
            description="Loans / Deposits"
            color={loanToDeposit > 100 ? 'rgb(245, 158, 11)' : 'rgb(99, 102, 241)'}
          />
          <RatioCard
            label="Leverage"
            value={leverage}
            suffix="x"
            description="Assets / Equity"
            color={
              leverage > 15
                ? 'rgb(239, 68, 68)'
                : leverage > 10
                  ? 'rgb(245, 158, 11)'
                  : 'rgb(16, 185, 129)'
            }
          />
        </div>
      </motion.div>

      {/* Scenario insight */}
      <motion.div
        key={activeScenario}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>{currentScenario.icon}</span>
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(99, 102, 241)',
                marginBottom: '4px',
              }}
            >
              {currentScenario.name}
            </h4>
            <p
              style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}
            >
              {currentScenario.insight}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Maturity Mismatch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'rgb(217, 119, 6)',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>⚠️</span>
          The Fundamental Banking Risk: Maturity Mismatch
        </h4>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '12px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '12px 20px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                borderRadius: '8px',
                border: '1px dashed rgb(245, 158, 11)',
                marginBottom: '8px',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgb(217, 119, 6)' }}>
                Deposits
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Can leave anytime
            </span>
          </div>
          <span style={{ fontSize: '24px', color: 'var(--color-text-muted)' }}>vs</span>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '12px 20px',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                borderRadius: '8px',
                border: '1px dashed rgb(99, 102, 241)',
                marginBottom: '8px',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgb(99, 102, 241)' }}>
                Loans
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Locked for years
            </span>
          </div>
        </div>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            lineHeight: '1.6',
          }}
        >
          Banks borrow short (deposits) and lend long (mortgages, business loans). If too many
          depositors withdraw at once, the bank can&apos;t quickly convert loans to cash — this is
          why bank runs happen.
        </p>
      </motion.div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Click different bank types to see how balance sheet composition affects risk
      </p>
    </div>
  );
}

// Helper component for asset/liability items
function AssetItem({
  label,
  value,
  color,
  total,
  isEquity,
}: {
  label: string;
  value: number;
  color: string;
  total: number;
  isEquity?: boolean;
}) {
  const percentage = (value / total) * 100;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
        }}
      >
        <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          {label}{' '}
          {isEquity && (
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              (owner&apos;s stake)
            </span>
          )}
        </span>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          ${value}B
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
          transition={{ duration: 0.5 }}
          style={{
            height: '100%',
            backgroundColor: color,
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  );
}

// Helper component for ratio cards
function RatioCard({
  label,
  value,
  suffix,
  description,
  color,
}: {
  label: string;
  value: number;
  suffix: string;
  description: string;
  color: string;
}) {
  return (
    <div
      style={{
        padding: '12px',
        backgroundColor: 'var(--color-surface-2)',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '20px', fontWeight: 700, color }}>
        {value.toFixed(1)}
        {suffix}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
        {description}
      </div>
    </div>
  );
}
