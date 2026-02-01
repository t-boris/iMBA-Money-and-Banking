'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface LoanContractDesignProps {
  className?: string;
}

interface ContractFeature {
  id: string;
  name: string;
  icon: string;
  definition: string;
  howItProtects: string;
  riskReduced: 'PD' | 'LGD' | 'EAD' | 'Both';
  example: string;
  color: string;
}

const contractFeatures: ContractFeature[] = [
  {
    id: 'collateral',
    name: 'Collateral',
    icon: '🏠',
    definition:
      'Assets pledged by the borrower that the lender can seize and sell if the borrower defaults on the loan.',
    howItProtects:
      'Reduces the lender\'s loss if default occurs. Even if the borrower cannot repay, the lender recovers value by selling the collateral (e.g., foreclosing on a house, repossessing a car).',
    riskReduced: 'LGD',
    example:
      'A mortgage loan secured by the house itself. If the borrower defaults, the bank forecloses and sells the property to recover the loan balance.',
    color: 'rgb(59, 130, 246)',
  },
  {
    id: 'covenants',
    name: 'Restrictive Covenants',
    icon: '📋',
    definition:
      'Contractual clauses that require the borrower to maintain certain conditions or restrict certain activities during the loan term.',
    howItProtects:
      'Limits risky borrower behavior that could increase default probability. Gives lender early warning signs and ability to demand repayment if covenants are breached.',
    riskReduced: 'PD',
    example:
      'A business loan requiring the company to maintain a debt-to-equity ratio below 2:1, or prohibiting additional borrowing without lender approval.',
    color: 'rgb(139, 92, 246)',
  },
  {
    id: 'compensating-balance',
    name: 'Compensating Balance',
    icon: '💰',
    definition:
      'A requirement that the borrower maintain a minimum deposit balance (typically 10-20% of the loan) at the lending bank.',
    howItProtects:
      'Provides the bank with a buffer it can seize if default occurs. Also increases the effective interest rate and ensures the borrower maintains a relationship with the bank.',
    riskReduced: 'LGD',
    example:
      'A $100,000 business loan requiring the borrower to keep $15,000 on deposit. If default occurs, the bank immediately recovers $15,000.',
    color: 'rgb(16, 185, 129)',
  },
  {
    id: 'credit-rationing',
    name: 'Credit Rationing',
    icon: '✂️',
    definition:
      'Limiting the loan amount to less than what the borrower requests, even if they are willing to pay a higher interest rate.',
    howItProtects:
      'Caps the maximum possible loss (Exposure at Default). Prevents adverse selection where only the riskiest borrowers accept high rates.',
    riskReduced: 'EAD',
    example:
      'A borrower requests $500,000 but the bank only approves $300,000, reducing the bank\'s maximum exposure regardless of what rate the borrower would accept.',
    color: 'rgb(245, 158, 11)',
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Reporting',
    icon: '📊',
    definition:
      'Requirements for borrowers to provide regular financial statements, allow inspections, or report material changes in their business.',
    howItProtects:
      'Enables early detection of deteriorating credit quality. Bank can take action (demand repayment, restructure loan) before full default occurs.',
    riskReduced: 'PD',
    example:
      'Quarterly financial statement submission, annual audited reports, and immediate notification if the borrower loses a major customer.',
    color: 'rgb(236, 72, 153)',
  },
  {
    id: 'seniority',
    name: 'Seniority / Priority',
    icon: '🥇',
    definition:
      'The order in which creditors are repaid in the event of default or bankruptcy. Senior debt is paid before junior/subordinated debt.',
    howItProtects:
      'Ensures the lender is first in line to receive proceeds from asset liquidation. Higher seniority means higher recovery rate in default.',
    riskReduced: 'LGD',
    example:
      'A senior secured loan has priority over unsecured creditors. Recovery rates: Senior secured ~80%, Senior unsecured ~50%, Subordinated ~25%.',
    color: 'rgb(6, 182, 212)',
  },
];

const riskLabels: Record<string, { full: string; color: string }> = {
  PD: { full: 'Probability of Default', color: 'rgb(239, 68, 68)' },
  LGD: { full: 'Loss Given Default', color: 'rgb(245, 158, 11)' },
  EAD: { full: 'Exposure at Default', color: 'rgb(139, 92, 246)' },
  Both: { full: 'Multiple Risk Components', color: 'rgb(99, 102, 241)' },
};

export function LoanContractDesign({ className }: LoanContractDesignProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>('collateral');

  const currentFeature = contractFeatures.find((f) => f.id === selectedFeature);

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
          Loan Contract Design: Protecting Against Default
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Banks design loan contracts with specific features to minimize losses when borrowers
          default. Each feature targets a different component of credit risk.
        </p>
      </div>

      {/* Risk Formula Context */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
          Contract features target components of Expected Loss:
        </div>
        <div style={{ fontSize: '16px', fontWeight: 600 }}>
          <span style={{ color: 'rgb(99, 102, 241)' }}>Expected Loss</span>
          <span style={{ color: 'var(--color-text-muted)' }}> = </span>
          <span style={{ color: 'rgb(239, 68, 68)' }}>PD</span>
          <span style={{ color: 'var(--color-text-muted)' }}> × </span>
          <span style={{ color: 'rgb(245, 158, 11)' }}>LGD</span>
          <span style={{ color: 'var(--color-text-muted)' }}> × </span>
          <span style={{ color: 'rgb(139, 92, 246)' }}>EAD</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '11px', color: 'rgb(239, 68, 68)' }}>
            PD = Probability of Default
          </span>
          <span style={{ fontSize: '11px', color: 'rgb(245, 158, 11)' }}>
            LGD = Loss Given Default
          </span>
          <span style={{ fontSize: '11px', color: 'rgb(139, 92, 246)' }}>
            EAD = Exposure at Default
          </span>
        </div>
      </div>

      {/* Feature Selection Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        {contractFeatures.map((feature) => (
          <motion.button
            key={feature.id}
            onClick={() => setSelectedFeature(feature.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '16px 12px',
              backgroundColor:
                selectedFeature === feature.id ? feature.color : 'var(--color-surface-1)',
              borderRadius: '12px',
              border:
                selectedFeature === feature.id
                  ? `2px solid ${feature.color}`
                  : '1px solid var(--color-surface-2)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{feature.icon}</div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: selectedFeature === feature.id ? 'white' : 'var(--color-text-primary)',
                lineHeight: '1.3',
              }}
            >
              {feature.name}
            </div>
            <div
              style={{
                fontSize: '10px',
                marginTop: '6px',
                padding: '2px 6px',
                backgroundColor:
                  selectedFeature === feature.id
                    ? 'rgba(255,255,255,0.2)'
                    : `${riskLabels[feature.riskReduced].color}20`,
                borderRadius: '4px',
                color:
                  selectedFeature === feature.id
                    ? 'white'
                    : riskLabels[feature.riskReduced].color,
                fontWeight: 500,
              }}
            >
              ↓ {feature.riskReduced}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Feature Detail Panel */}
      <AnimatePresence mode="wait">
        {currentFeature && (
          <motion.div
            key={currentFeature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              padding: '24px',
              backgroundColor: 'var(--color-surface-1)',
              borderRadius: '16px',
              border: `2px solid ${currentFeature.color}`,
              marginBottom: '24px',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <span style={{ fontSize: '36px' }}>{currentFeature.icon}</span>
              <div>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: currentFeature.color,
                    margin: 0,
                  }}
                >
                  {currentFeature.name}
                </h4>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '4px',
                    padding: '4px 10px',
                    backgroundColor: `${riskLabels[currentFeature.riskReduced].color}15`,
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Reduces:
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: riskLabels[currentFeature.riskReduced].color,
                    }}
                  >
                    {riskLabels[currentFeature.riskReduced].full}
                  </span>
                </div>
              </div>
            </div>

            {/* Definition */}
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px',
                }}
              >
                Definition
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                  lineHeight: '1.7',
                  margin: 0,
                }}
              >
                {currentFeature.definition}
              </p>
            </div>

            {/* How It Protects */}
            <div
              style={{
                padding: '16px',
                backgroundColor: `${currentFeature.color}10`,
                borderRadius: '10px',
                border: `1px solid ${currentFeature.color}30`,
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: currentFeature.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px',
                }}
              >
                🛡️ How It Protects the Lender
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.7',
                  margin: 0,
                }}
              >
                {currentFeature.howItProtects}
              </p>
            </div>

            {/* Example */}
            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '10px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px',
                }}
              >
                📝 Example
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                {currentFeature.example}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Table */}
      <div
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '20px',
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
          Summary: Contract Features and Risk Reduction
        </h4>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-2)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    borderRadius: '6px 0 0 0',
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-2)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                  }}
                >
                  Risk Reduced
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-2)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    borderRadius: '0 6px 0 0',
                  }}
                >
                  Protection Mechanism
                </th>
              </tr>
            </thead>
            <tbody>
              {contractFeatures.map((feature, index) => (
                <tr
                  key={feature.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-surface-0)',
                  }}
                >
                  <td
                    style={{
                      padding: '10px 12px',
                      color: 'var(--color-text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    {feature.icon} {feature.name}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        backgroundColor: `${riskLabels[feature.riskReduced].color}15`,
                        borderRadius: '4px',
                        color: riskLabels[feature.riskReduced].color,
                        fontWeight: 600,
                        fontSize: '12px',
                      }}
                    >
                      ↓ {feature.riskReduced}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '10px 12px',
                      color: 'var(--color-text-secondary)',
                      fontSize: '12px',
                    }}
                  >
                    {feature.id === 'collateral' && 'Seize assets if borrower defaults'}
                    {feature.id === 'covenants' && 'Restrict risky borrower behavior'}
                    {feature.id === 'compensating-balance' && 'Bank holds buffer deposit'}
                    {feature.id === 'credit-rationing' && 'Limit maximum loan exposure'}
                    {feature.id === 'monitoring' && 'Early warning of problems'}
                    {feature.id === 'seniority' && 'First in line for repayment'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                marginBottom: '6px',
              }}
            >
              Key Insight: Multiple Layers of Protection
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              Banks rarely rely on just one protective feature. A well-designed loan contract
              combines multiple features: collateral reduces loss severity, covenants prevent risky
              behavior, monitoring provides early warning, and seniority ensures priority in
              bankruptcy. Together, these features significantly reduce expected losses.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
