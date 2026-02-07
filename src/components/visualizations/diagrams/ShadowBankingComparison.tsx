'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ShadowBankingComparisonProps {
  className?: string;
}

type WhyView = 'efficiency' | 'arbitrage';

interface InstitutionCard {
  name: string;
  icon: string;
  assets: string;
  liabilities: string;
  risk: string;
  description: string;
}

const shadowInstitutions: InstitutionCard[] = [
  {
    name: 'Money Market Funds',
    icon: '💰',
    assets: 'Short-term debt (commercial paper, repos)',
    liabilities: 'Deposit-like shares (redeemable at $1)',
    risk: 'Run risk if assets lose value below $1 NAV',
    description:
      'Investors treat MMF shares like bank deposits. But unlike deposits, there is no FDIC insurance. If the fund "breaks the buck" (NAV < $1), panic ensues.',
  },
  {
    name: 'Repo Market',
    icon: '🔄',
    assets: 'Collateral (Treasury bonds, MBS)',
    liabilities: 'Short-term cash borrowing (overnight to 30 days)',
    risk: 'Collateral haircuts spike during stress',
    description:
      'Repos function like collateralized deposits. Lenders provide cash overnight, secured by bonds. But during a crisis, lenders refuse to roll over, forcing fire sales.',
  },
  {
    name: 'MBS Vehicles (SPVs)',
    icon: '🏠',
    assets: 'Mortgage pools (long-term, illiquid)',
    liabilities: 'Short-term commercial paper (ABCP)',
    risk: 'Classic maturity mismatch without safety net',
    description:
      'Special purpose vehicles hold mortgages and fund them with short-term paper. When investors refuse to buy new paper, the vehicle cannot refinance - same as a bank run.',
  },
];

const regulationItems = [
  { label: 'FDIC Insurance', traditional: true, shadow: false },
  { label: 'Fed Lender of Last Resort', traditional: true, shadow: false },
  { label: 'Capital Requirements', traditional: true, shadow: false },
  { label: 'Regulatory Supervision', traditional: true, shadow: false },
];

export function ShadowBankingComparison({ className }: ShadowBankingComparisonProps) {
  const [whyView, setWhyView] = useState<WhyView>('efficiency');
  const [expandedInstitution, setExpandedInstitution] = useState<number | null>(null);
  const [showNotShadow, setShowNotShadow] = useState(false);

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
          Traditional Banks vs Shadow Banks
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Same function, different regulation — the core fragility of shadow banking
        </p>
      </div>

      {/* Main Comparison Panel */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        {/* Traditional Bank Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            border: '2px solid rgba(59, 130, 246, 0.3)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '32px' }}>🏦</span>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'rgb(59, 130, 246)',
                marginTop: '8px',
                marginBottom: '4px',
              }}
            >
              Traditional Bank
            </h4>
            <span
              style={{
                fontSize: '11px',
                padding: '3px 10px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: 'rgb(59, 130, 246)',
                borderRadius: '12px',
                fontWeight: 500,
              }}
            >
              Regulated
            </span>
          </div>

          {/* Balance Sheet Visual */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}
            >
              Balance Sheet
            </div>

            {/* Assets */}
            <div
              style={{
                padding: '10px',
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                borderRadius: '8px',
                marginBottom: '6px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'rgb(59, 130, 246)',
                  marginBottom: '6px',
                }}
              >
                ASSETS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    backgroundColor: 'rgb(59, 130, 246)',
                  }}
                />
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Loans (illiquid, long-term)
                </span>
              </div>
            </div>

            {/* Liabilities */}
            <div
              style={{
                padding: '10px',
                backgroundColor: 'rgba(245, 158, 11, 0.08)',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'rgb(245, 158, 11)',
                  marginBottom: '6px',
                }}
              >
                LIABILITIES
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    backgroundColor: 'rgb(245, 158, 11)',
                  }}
                />
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Deposits (demand, short-term)
                </span>
              </div>
            </div>
          </div>

          {/* Regulation Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {regulationItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <span style={{ color: 'rgb(16, 185, 129)', fontSize: '14px' }}>&#x2705;</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Shadow Bank Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            border: '2px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '32px' }}>🏗️</span>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'rgb(245, 158, 11)',
                marginTop: '8px',
                marginBottom: '4px',
              }}
            >
              Shadow Bank
            </h4>
            <span
              style={{
                fontSize: '11px',
                padding: '3px 10px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: 'rgb(245, 158, 11)',
                borderRadius: '12px',
                fontWeight: 500,
              }}
            >
              Weakly Regulated
            </span>
          </div>

          {/* Balance Sheet Visual */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}
            >
              Balance Sheet
            </div>

            {/* Assets */}
            <div
              style={{
                padding: '10px',
                backgroundColor: 'rgba(245, 158, 11, 0.08)',
                borderRadius: '8px',
                marginBottom: '6px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'rgb(245, 158, 11)',
                  marginBottom: '6px',
                }}
              >
                ASSETS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    backgroundColor: 'rgb(245, 158, 11)',
                  }}
                />
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  MBS, loan funds (illiquid)
                </span>
              </div>
            </div>

            {/* Liabilities */}
            <div
              style={{
                padding: '10px',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'rgb(239, 68, 68)',
                  marginBottom: '6px',
                }}
              >
                LIABILITIES
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    backgroundColor: 'rgb(239, 68, 68)',
                  }}
                />
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Repos, MMF shares (demand-like)
                </span>
              </div>
            </div>
          </div>

          {/* Regulation Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {regulationItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <span style={{ color: 'rgb(239, 68, 68)', fontSize: '14px' }}>&#x274C;</span>
                <span>
                  No {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Shared Callout */}
      <div
        style={{
          padding: '14px 20px',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          borderRadius: '10px',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(168, 85, 247)' }}>
          Same function, different regulation
        </span>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
          Both transform short-term liabilities into long-term assets. But only traditional banks
          have a safety net.
        </p>
      </div>

      {/* Why Shadow Banks Exist Toggle */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Why Do Shadow Banks Exist?
        </h4>

        {/* Toggle Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => setWhyView('efficiency')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '10px',
              border:
                whyView === 'efficiency'
                  ? '2px solid rgb(59, 130, 246)'
                  : '2px solid var(--color-surface-2)',
              backgroundColor:
                whyView === 'efficiency' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: whyView === 'efficiency' ? 600 : 400,
              color:
                whyView === 'efficiency' ? 'rgb(59, 130, 246)' : 'var(--color-text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            Efficiency View
          </button>
          <button
            onClick={() => setWhyView('arbitrage')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '10px',
              border:
                whyView === 'arbitrage'
                  ? '2px solid rgb(245, 158, 11)'
                  : '2px solid var(--color-surface-2)',
              backgroundColor:
                whyView === 'arbitrage' ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: whyView === 'arbitrage' ? 600 : 400,
              color:
                whyView === 'arbitrage' ? 'rgb(245, 158, 11)' : 'var(--color-text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            Regulatory Arbitrage View
          </button>
        </div>

        {/* Toggle Content */}
        <AnimatePresence mode="wait">
          {whyView === 'efficiency' ? (
            <motion.div
              key="efficiency"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                padding: '16px',
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(59, 130, 246, 0.15)',
              }}
            >
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '2',
                }}
              >
                <li>
                  <strong>Specialized:</strong> Focus on one function, do it well
                </li>
                <li>
                  <strong>Cheaper:</strong> Lower overhead than full-service banks
                </li>
                <li>
                  <strong>Flexible:</strong> Adapt quickly to market opportunities
                </li>
                <li>
                  <strong>Innovative:</strong> Create new financial products faster
                </li>
              </ul>
              <div
                style={{
                  marginTop: '12px',
                  padding: '10px',
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: 'rgb(59, 130, 246)',
                    fontWeight: 500,
                  }}
                >
                  Genuine economic value through specialization and competition
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="arbitrage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                padding: '16px',
                backgroundColor: 'rgba(245, 158, 11, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(245, 158, 11, 0.15)',
              }}
            >
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '2',
                }}
              >
                <li>
                  <strong>Same service:</strong> Provide bank-like functions
                </li>
                <li>
                  <strong>Less regulation:</strong> Avoid costly compliance
                </li>
                <li>
                  <strong>Lower cost:</strong> Pass savings to attract customers
                </li>
                <li>
                  <strong>Competitive advantage:</strong> Undercut regulated banks
                </li>
              </ul>

              {/* Formula */}
              <div
                style={{
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px',
                    }}
                  >
                    <span style={{ color: 'rgb(59, 130, 246)', fontWeight: 600 }}>
                      Bank Profit
                    </span>
                    <span style={{ color: 'var(--color-text-muted)' }}>=</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Revenue</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                    <span style={{ color: 'rgb(239, 68, 68)', fontWeight: 600 }}>
                      High Regulation Cost
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px',
                    }}
                  >
                    <span style={{ color: 'rgb(245, 158, 11)', fontWeight: 600 }}>
                      Shadow Profit
                    </span>
                    <span style={{ color: 'var(--color-text-muted)' }}>=</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Revenue</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                    <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 600 }}>
                      Low Regulation Cost
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* What Is NOT Shadow Banking */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          marginBottom: '24px',
          border: '1px solid var(--color-surface-2)',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={() => setShowNotShadow(!showNotShadow)}
          style={{
            width: '100%',
            padding: '16px 20px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🛡️</span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
              }}
            >
              What Is NOT Shadow Banking?
            </span>
          </div>
          <motion.span
            animate={{ rotate: showNotShadow ? 90 : 0 }}
            style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
          >
            &#x25B6;
          </motion.span>
        </button>

        <AnimatePresence>
          {showNotShadow && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 20px 20px' }}>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    borderRadius: '10px',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>🏢</span>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'rgb(16, 185, 129)',
                      }}
                    >
                      Insurance Companies
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.6',
                      margin: '0 0 10px 0',
                    }}
                  >
                    Long-term assets + long-term liabilities = no run risk
                  </p>
                  <div
                    style={{
                      padding: '10px',
                      backgroundColor: 'rgba(16, 185, 129, 0.05)',
                      borderRadius: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        fontStyle: 'italic',
                      }}
                    >
                      No demand withdrawal risk = no bank-like fragility. Policyholders cannot
                      withdraw instantly like depositors can.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Key Shadow Institutions */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Key Shadow Banking Institutions
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {shadowInstitutions.map((inst, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '12px',
                border:
                  expandedInstitution === idx
                    ? '2px solid rgba(245, 158, 11, 0.4)'
                    : '2px solid var(--color-surface-2)',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() =>
                  setExpandedInstitution(expandedInstitution === idx ? null : idx)
                }
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor:
                    expandedInstitution === idx
                      ? 'rgba(245, 158, 11, 0.05)'
                      : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{inst.icon}</span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {inst.name}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: expandedInstitution === idx ? 90 : 0 }}
                  style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
                >
                  &#x25B6;
                </motion.span>
              </button>

              <AnimatePresence>
                {expandedInstitution === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 16px 16px' }}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '8px',
                          marginBottom: '10px',
                        }}
                      >
                        <div
                          style={{
                            padding: '10px',
                            backgroundColor: 'rgba(59, 130, 246, 0.06)',
                            borderRadius: '8px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              color: 'rgb(59, 130, 246)',
                              marginBottom: '4px',
                            }}
                          >
                            ASSETS
                          </div>
                          <span
                            style={{
                              fontSize: '12px',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            {inst.assets}
                          </span>
                        </div>
                        <div
                          style={{
                            padding: '10px',
                            backgroundColor: 'rgba(245, 158, 11, 0.06)',
                            borderRadius: '8px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              color: 'rgb(245, 158, 11)',
                              marginBottom: '4px',
                            }}
                          >
                            LIABILITIES
                          </div>
                          <span
                            style={{
                              fontSize: '12px',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            {inst.liabilities}
                          </span>
                        </div>
                      </div>

                      {/* Risk */}
                      <div
                        style={{
                          padding: '10px',
                          backgroundColor: 'rgba(239, 68, 68, 0.06)',
                          borderRadius: '8px',
                          marginBottom: '10px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: 'rgb(239, 68, 68)',
                            marginBottom: '4px',
                          }}
                        >
                          KEY RISK
                        </div>
                        <span
                          style={{
                            fontSize: '12px',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {inst.risk}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--color-text-muted)',
                          lineHeight: '1.6',
                          margin: 0,
                          fontStyle: 'italic',
                        }}
                      >
                        {inst.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
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
        Click on institution cards to expand details
      </p>
    </div>
  );
}
