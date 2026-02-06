'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SafetyNetFlowProps {
  className?: string;
}

export function SafetyNetFlow({ className }: SafetyNetFlowProps) {
  const [showMoralHazard, setShowMoralHazard] = useState(false);

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
          Government Safety Net: Two Pillars
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          How deposit insurance and the lender of last resort prevent bank runs
        </p>
      </div>

      {/* Two Pillars Side by Side */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {/* Left: FDIC Deposit Insurance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            padding: '24px',
            border: '2px solid rgba(16, 185, 129, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              &#x1F6E1;&#xFE0F;
            </div>
            <div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'rgb(16, 185, 129)',
                }}
              >
                FDIC Deposit Insurance
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                }}
              >
                Ex-Ante Protection
              </div>
            </div>
          </div>

          {/* Flow Diagram */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            {[
              {
                icon: '\u{1F464}',
                label: 'Depositor',
                sub: 'Places money in bank',
              },
              { icon: '\u2193', label: '', sub: '' },
              {
                icon: '\u{1F3E6}',
                label: 'Bank',
                sub: 'FDIC-insured institution',
              },
              { icon: '\u2193', label: '', sub: '' },
              {
                icon: '\u{1F6E1}\uFE0F',
                label: 'FDIC Shield',
                sub: 'Up to $250,000 insured',
              },
            ].map((item, i) =>
              item.label === '' ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: '16px',
                  }}
                >
                  {item.icon}
                </motion.div>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.1,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                  style={{
                    padding: '10px 14px',
                    backgroundColor: 'rgba(16, 185, 129, 0.06)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>

          {/* Depositor thought */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'rgb(16, 185, 129)',
                textAlign: 'center',
              }}
            >
              &quot;My money is safe - no reason to run.&quot;
            </div>
          </motion.div>

          {/* Key Text */}
          <div
            style={{
              padding: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.06)',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgb(16, 185, 129)',
              textAlign: 'center',
            }}
          >
            Removes incentive to run BEFORE panic starts
          </div>
        </motion.div>

        {/* Right: Lender of Last Resort */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            padding: '24px',
            border: '2px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              &#x1F3DB;&#xFE0F;
            </div>
            <div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'rgb(59, 130, 246)',
                }}
              >
                Lender of Last Resort
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                }}
              >
                Ex-Post Stabilization
              </div>
            </div>
          </div>

          {/* Flow Diagram */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            {[
              {
                icon: '\u{1F3E6}',
                label: 'Bank Under Pressure',
                sub: 'Facing deposit withdrawals',
              },
              { icon: '\u2193', label: '', sub: '' },
              {
                icon: '\u{1F3DB}\uFE0F',
                label: 'Federal Reserve',
                sub: 'Provides emergency cash loan',
              },
              { icon: '\u2193', label: '', sub: '' },
              {
                icon: '\u2705',
                label: 'Bank Serves Depositors',
                sub: 'Withdrawals honored, panic stops',
              },
            ].map((item, i) =>
              item.label === '' ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  style={{
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: '16px',
                  }}
                >
                  {item.icon}
                </motion.div>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.1 + 0.2,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                  style={{
                    padding: '10px 14px',
                    backgroundColor: 'rgba(59, 130, 246, 0.06)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>

          {/* Repayment note */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'rgb(59, 130, 246)',
                textAlign: 'center',
              }}
            >
              Bank later repays Fed with interest (collateralized loan)
            </div>
          </motion.div>

          {/* Key Text */}
          <div
            style={{
              padding: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.06)',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgb(59, 130, 246)',
              textAlign: 'center',
            }}
          >
            Stops run DURING panic with emergency liquidity
          </div>
        </motion.div>
      </div>

      {/* Moral Hazard Section */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setShowMoralHazard(!showMoralHazard)}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '12px',
            border: showMoralHazard
              ? '2px solid rgba(245, 158, 11, 0.4)'
              : '2px solid transparent',
            backgroundColor: showMoralHazard
              ? 'rgba(245, 158, 11, 0.08)'
              : 'var(--color-surface-1)',
            color: showMoralHazard
              ? 'rgb(245, 158, 11)'
              : 'var(--color-text-primary)',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>&#x26A0;&#xFE0F; The Downside: Moral Hazard</span>
          <span
            style={{
              transform: showMoralHazard ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            &#9660;
          </span>
        </button>

        <AnimatePresence>
          {showMoralHazard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: '12px',
                  padding: '24px',
                  backgroundColor: 'rgba(245, 158, 11, 0.06)',
                  borderRadius: '16px',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                }}
              >
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'rgb(245, 158, 11)',
                    marginBottom: '16px',
                    textAlign: 'center',
                  }}
                >
                  Insurance Creates Perverse Incentives
                </div>

                {/* Logic Chain */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '20px',
                  }}
                >
                  {[
                    {
                      step: 'Safety Net Exists',
                      desc: 'Deposits insured, Fed backs banks',
                    },
                    {
                      step: 'Depositors Stop Monitoring',
                      desc: 'Why check bank health? Money is safe.',
                    },
                    {
                      step: 'Banks Take Bigger Risks',
                      desc: 'No market discipline from depositors',
                    },
                  ].map((item, i) => (
                    <div key={i}>
                      {i > 0 && (
                        <div
                          style={{
                            textAlign: 'center',
                            color: 'rgb(245, 158, 11)',
                            fontSize: '16px',
                            marginBottom: '8px',
                          }}
                        >
                          &#8595;
                        </div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        style={{
                          padding: '12px 16px',
                          backgroundColor: 'rgba(245, 158, 11, 0.08)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(245, 158, 11, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: 'rgb(245, 158, 11)',
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: '13px',
                              fontWeight: 600,
                              color: 'var(--color-text-primary)',
                            }}
                          >
                            {item.step}
                          </div>
                          <div
                            style={{
                              fontSize: '11px',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            {item.desc}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Heads/Tails Payoff */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                      padding: '16px',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '12px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{ fontSize: '24px', marginBottom: '8px' }}
                    >
                      &#x1F4B5;
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'rgb(16, 185, 129)',
                        marginBottom: '4px',
                      }}
                    >
                      Heads: Bank Wins
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Risky bets pay off. Bank keeps all profits.
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                      padding: '16px',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      borderRadius: '12px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{ fontSize: '24px', marginBottom: '8px' }}
                    >
                      &#x1F4B8;
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'rgb(239, 68, 68)',
                        marginBottom: '4px',
                      }}
                    >
                      Tails: Taxpayers Lose
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Risky bets fail. Government absorbs losses.
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Explore how deposit insurance and the Fed prevent bank runs, and the
        moral hazard they create
      </p>
    </div>
  );
}
