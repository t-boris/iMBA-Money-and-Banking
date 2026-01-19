'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface DirectIndirectFinanceProps {
  className?: string;
}

export function DirectIndirectFinance({
  className,
}: DirectIndirectFinanceProps) {
  const [selectedPath, setSelectedPath] = useState<'direct' | 'indirect' | null>(null);

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Two Ways Funds Flow: Direct vs Indirect Finance
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Savers can provide funds to borrowers through markets (direct) or through financial institutions (indirect).
        </p>
      </div>

      {/* Side by side comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

        {/* Direct Finance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setSelectedPath(selectedPath === 'direct' ? null : 'direct')}
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: 'var(--color-surface-1)',
            border: selectedPath === 'direct' ? '2px solid rgb(16, 185, 129)' : '2px solid var(--color-surface-2)',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: 'rgb(16, 185, 129)',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: '8px',
            }}>
              Direct Finance
            </span>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              Through Markets
            </p>
          </div>

          {/* Flow diagram */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '12px 20px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '24px' }}>💼</span>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>Lender/Investor</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Has excess funds</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '2px', height: '20px', backgroundColor: 'rgb(16, 185, 129)' }} />
              <span style={{ fontSize: '11px', color: 'rgb(16, 185, 129)', fontWeight: 500 }}>Buys securities</span>
              <div style={{ width: '2px', height: '20px', backgroundColor: 'rgb(16, 185, 129)' }} />
            </div>

            <div style={{ padding: '16px 20px', backgroundColor: 'rgba(16, 185, 129, 0.15)', borderRadius: '12px', textAlign: 'center', border: '1px dashed rgb(16, 185, 129)' }}>
              <span style={{ fontSize: '28px' }}>📊</span>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}>Financial Markets</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Stocks, Bonds, etc.</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '2px', height: '20px', backgroundColor: 'rgb(16, 185, 129)' }} />
              <span style={{ fontSize: '11px', color: 'rgb(16, 185, 129)', fontWeight: 500 }}>Sells securities</span>
              <div style={{ width: '2px', height: '20px', backgroundColor: 'rgb(16, 185, 129)' }} />
            </div>

            <div style={{ padding: '12px 20px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '24px' }}>🏢</span>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>Borrower</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Issues securities</div>
            </div>
          </div>

          {/* Key point */}
          {selectedPath === 'direct' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                <strong style={{ color: 'rgb(16, 185, 129)' }}>Key:</strong> Lender bears the risk directly.
                If borrower defaults, lender loses money. No intermediary absorbs losses.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Indirect Finance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setSelectedPath(selectedPath === 'indirect' ? null : 'indirect')}
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: 'var(--color-surface-1)',
            border: selectedPath === 'indirect' ? '2px solid rgb(99, 102, 241)' : '2px solid var(--color-surface-2)',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              color: 'rgb(99, 102, 241)',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: '8px',
            }}>
              Indirect Finance
            </span>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              Through Institutions
            </p>
          </div>

          {/* Flow diagram */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '12px 20px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '24px' }}>💰</span>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>Saver/Depositor</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Has excess funds</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '2px', height: '20px', backgroundColor: 'rgb(99, 102, 241)' }} />
              <span style={{ fontSize: '11px', color: 'rgb(99, 102, 241)', fontWeight: 500 }}>Deposits</span>
              <div style={{ width: '2px', height: '20px', backgroundColor: 'rgb(99, 102, 241)' }} />
            </div>

            <div style={{ padding: '16px 20px', backgroundColor: 'rgba(99, 102, 241, 0.15)', borderRadius: '12px', textAlign: 'center', border: '1px dashed rgb(99, 102, 241)' }}>
              <span style={{ fontSize: '28px' }}>🏦</span>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(99, 102, 241)' }}>Bank / Institution</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Financial intermediary</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '2px', height: '20px', backgroundColor: 'rgb(99, 102, 241)' }} />
              <span style={{ fontSize: '11px', color: 'rgb(99, 102, 241)', fontWeight: 500 }}>Loans</span>
              <div style={{ width: '2px', height: '20px', backgroundColor: 'rgb(99, 102, 241)' }} />
            </div>

            <div style={{ padding: '12px 20px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '24px' }}>🏠</span>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>Borrower</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Gets loan from bank</div>
            </div>
          </div>

          {/* Key point */}
          {selectedPath === 'indirect' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}
            >
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                <strong style={{ color: 'rgb(99, 102, 241)' }}>Key:</strong> Bank bears the risk.
                If borrower defaults, bank absorbs the loss. Depositor's money is safe (up to insurance limits).
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
          <div>
            <div style={{ fontWeight: 600, color: 'rgb(16, 185, 129)', marginBottom: '8px' }}>Direct Finance</div>
            <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
              <li>Lender owns the security</li>
              <li>Risk stays with lender</li>
              <li>Examples: Stocks, Corporate Bonds</li>
            </ul>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'rgb(99, 102, 241)', marginBottom: '8px' }}>Indirect Finance</div>
            <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
              <li>Bank owns the loan</li>
              <li>Bank absorbs default risk</li>
              <li>Examples: Bank deposits, Loans</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
        Click on either path to learn more about the key differences
      </p>
    </div>
  );
}
