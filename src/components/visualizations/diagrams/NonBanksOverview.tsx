'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface NonBanksOverviewProps {
  className?: string;
}

interface NonBankType {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  howItWorks: string;
  riskProfile: 'low' | 'medium' | 'high';
  examples: string[];
  keyDifference: string;
}

const nonBankTypes: NonBankType[] = [
  {
    id: 'insurance',
    name: 'Insurance Companies',
    icon: '🛡️',
    shortDescription: 'Pool risk across many people',
    howItWorks: 'Collect premiums from many customers, pay out claims to the few who experience losses. Invest premiums in bonds and stocks while waiting to pay claims.',
    riskProfile: 'low',
    examples: ['Life insurance', 'Auto insurance', 'Health insurance'],
    keyDifference: 'Unlike banks, they don\'t create money or take deposits. They transform risk, not maturity.',
  },
  {
    id: 'pension',
    name: 'Pension Funds',
    icon: '👴',
    shortDescription: 'Long-term retirement savings',
    howItWorks: 'Collect contributions from workers and employers over decades. Invest in stocks, bonds, and real estate to grow the fund. Pay out benefits when workers retire.',
    riskProfile: 'low',
    examples: ['401(k) plans', 'State pension funds', 'Corporate pensions'],
    keyDifference: 'Very long time horizons (30+ years) allow them to invest in illiquid assets that banks cannot.',
  },
  {
    id: 'mutual',
    name: 'Mutual Funds',
    icon: '📊',
    shortDescription: 'Pooled investment vehicles',
    howItWorks: 'Pool money from many small investors to buy a diversified portfolio. Investors own shares of the fund, not the underlying securities directly.',
    riskProfile: 'medium',
    examples: ['Index funds', 'Bond funds', 'Target-date funds'],
    keyDifference: 'Provide diversification to small investors. No leverage, no maturity transformation.',
  },
  {
    id: 'investment-bank',
    name: 'Investment Banks',
    icon: '🏛️',
    shortDescription: 'Help companies raise capital',
    howItWorks: 'Underwrite stock and bond offerings, advise on mergers and acquisitions, trade securities for clients and their own accounts.',
    riskProfile: 'high',
    examples: ['Goldman Sachs', 'Morgan Stanley', 'JP Morgan (investment arm)'],
    keyDifference: 'Don\'t take deposits from the public. Make money from fees, trading, and advisory services.',
  },
  {
    id: 'hedge',
    name: 'Hedge Funds',
    icon: '🎯',
    shortDescription: 'Sophisticated investment strategies',
    howItWorks: 'Use complex strategies including leverage, short-selling, and derivatives. Only available to wealthy "accredited" investors due to higher risks.',
    riskProfile: 'high',
    examples: ['Bridgewater', 'Renaissance Technologies', 'Citadel'],
    keyDifference: 'Lightly regulated, can take concentrated bets. "2 and 20" fee structure (2% management, 20% of profits).',
  },
  {
    id: 'pe',
    name: 'Private Equity',
    icon: '🔑',
    shortDescription: 'Buy and improve companies',
    howItWorks: 'Raise funds from institutional investors, buy private companies (or take public ones private), improve operations, sell for profit in 5-7 years.',
    riskProfile: 'high',
    examples: ['Blackstone', 'KKR', 'Carlyle Group'],
    keyDifference: 'Very illiquid — money locked up for years. High fees but potential for high returns.',
  },
];

const riskColors = {
  low: { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)', text: 'rgb(16, 185, 129)' },
  medium: { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)', text: 'rgb(245, 158, 11)' },
  high: { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)', text: 'rgb(239, 68, 68)' },
};

export function NonBanksOverview({ className }: NonBanksOverviewProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const selectedNonBank = nonBankTypes.find(t => t.id === selectedType);

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Non-Bank Financial Institutions
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Banks aren't the only financial intermediaries. These institutions move money from savers to borrowers
          without taking traditional deposits or creating money.
        </p>
      </div>

      {/* Bank vs Non-Bank comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '24px',
        }}
      >
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
          What Makes Banks Special?
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>🏦</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(99, 102, 241)' }}>Banks</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
              <li>Take deposits (create money)</li>
              <li>Maturity transformation</li>
              <li>Access to central bank</li>
              <li>FDIC insured</li>
              <li>Heavily regulated</li>
            </ul>
          </div>
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>🏢</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}>Non-Banks</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
              <li>Don't take deposits</li>
              <li>Different transformations</li>
              <li>No central bank access</li>
              <li>Various protections</li>
              <li>Less regulated (often)</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Non-bank types grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {nonBankTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: selectedType === type.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--color-surface-1)',
              border: selectedType === type.id ? '2px solid rgb(99, 102, 241)' : '2px solid var(--color-surface-2)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>{type.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{type.name}</span>
                  <span style={{
                    padding: '2px 8px',
                    fontSize: '10px',
                    fontWeight: 500,
                    borderRadius: '4px',
                    backgroundColor: riskColors[type.riskProfile].bg,
                    color: riskColors[type.riskProfile].text,
                    border: `1px solid ${riskColors[type.riskProfile].border}`,
                  }}>
                    {type.riskProfile.toUpperCase()} RISK
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.5' }}>
                  {type.shortDescription}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Selected type details */}
      {selectedNonBank && (
        <motion.div
          key={selectedNonBank.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: '2px solid rgb(99, 102, 241)',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '32px' }}>{selectedNonBank.icon}</span>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                {selectedNonBank.name}
              </h4>
              <span style={{
                display: 'inline-block',
                marginTop: '4px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 500,
                borderRadius: '4px',
                backgroundColor: riskColors[selectedNonBank.riskProfile].bg,
                color: riskColors[selectedNonBank.riskProfile].text,
              }}>
                {selectedNonBank.riskProfile.toUpperCase()} RISK PROFILE
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h5 style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(99, 102, 241)', marginBottom: '8px' }}>
                How It Works
              </h5>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {selectedNonBank.howItWorks}
              </p>
            </div>

            <div>
              <h5 style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(99, 102, 241)', marginBottom: '8px' }}>
                Examples
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedNonBank.examples.map((example) => (
                  <span
                    key={example}
                    style={{
                      padding: '4px 12px',
                      fontSize: '12px',
                      backgroundColor: 'var(--color-surface-2)',
                      borderRadius: '6px',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
            }}>
              <h5 style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(217, 119, 6)', marginBottom: '4px' }}>
                Key Difference from Banks
              </h5>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', margin: 0 }}>
                {selectedNonBank.keyDifference}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Shadow Banking note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          padding: '16px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>⚠️</span>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(239, 68, 68)', marginBottom: '4px' }}>
              The Shadow Banking System
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
              When non-banks perform bank-like functions (like short-term lending) without bank regulation, it's called "shadow banking."
              This was a major factor in the 2008 financial crisis — institutions like money market funds and investment banks
              faced runs similar to bank runs, but without deposit insurance or central bank support.
            </p>
          </div>
        </div>
      </motion.div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
        Click on any institution type to learn more about how it works
      </p>
    </div>
  );
}
