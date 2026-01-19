'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface FinancialDevelopmentProps {
  className?: string;
}

interface Channel {
  id: string;
  name: string;
  icon: string;
  description: string;
  example: string;
}

const positiveChannels: Channel[] = [
  {
    id: 'capital',
    name: 'Capital Allocation',
    icon: '🎯',
    description: 'Financial markets direct savings to their most productive uses',
    example: 'Venture capital funds promising startups, not just connected firms',
  },
  {
    id: 'risk',
    name: 'Risk Management',
    icon: '🛡️',
    description: 'Insurance and derivatives help businesses take productive risks',
    example: 'Farmers hedge crop prices, freeing them to invest in better equipment',
  },
  {
    id: 'monitoring',
    name: 'Corporate Governance',
    icon: '👁️',
    description: 'Investors monitor managers, improving corporate performance',
    example: 'Shareholders vote out underperforming CEOs',
  },
  {
    id: 'liquidity',
    name: 'Liquidity Provision',
    icon: '💧',
    description: 'Markets allow investors to exit, encouraging long-term investment',
    example: 'You can invest in stocks knowing you can sell tomorrow',
  },
];

const darkSideIssues = [
  {
    id: 'financialization',
    name: 'Financialization',
    icon: '📈',
    description: 'When finance grows too large relative to the economy',
    consequence: 'Resources flow to speculation rather than productive investment',
  },
  {
    id: 'instability',
    name: 'Financial Instability',
    icon: '🌊',
    description: 'Boom-bust cycles amplified by financial leverage',
    consequence: '2008 crisis: Financial innovation spread risk instead of managing it',
  },
  {
    id: 'inequality',
    name: 'Wealth Concentration',
    icon: '⚖️',
    description: 'Financial returns often exceed economic growth',
    consequence: 'Capital owners gain more than workers over time',
  },
  {
    id: 'shorttermism',
    name: 'Short-termism',
    icon: '⏱️',
    description: 'Market pressure for quarterly results',
    consequence: 'Companies underinvest in R&D and worker training',
  },
];

export function FinancialDevelopment({ className }: FinancialDevelopmentProps) {
  const [activeView, setActiveView] = useState<'positive' | 'dark'>('positive');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Financial Development and Economic Growth
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          A well-functioning financial system supports economic growth — but finance can also cause harm when it grows too large or unstable.
        </p>
      </div>

      {/* View toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => { setActiveView('positive'); setSelectedItem(null); }}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: activeView === 'positive' ? '2px solid rgb(16, 185, 129)' : '2px solid var(--color-surface-2)',
            backgroundColor: activeView === 'positive' ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-surface-1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: '20px' }}>✨</span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: activeView === 'positive' ? 'rgb(16, 185, 129)' : 'var(--color-text-primary)' }}>
            Benefits of Finance
          </span>
        </button>
        <button
          onClick={() => { setActiveView('dark'); setSelectedItem(null); }}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: activeView === 'dark' ? '2px solid rgb(239, 68, 68)' : '2px solid var(--color-surface-2)',
            backgroundColor: activeView === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-surface-1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: activeView === 'dark' ? 'rgb(239, 68, 68)' : 'var(--color-text-primary)' }}>
            The Dark Side
          </span>
        </button>
      </div>

      {/* Content based on view */}
      {activeView === 'positive' ? (
        <motion.div
          key="positive"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Inverted U curve illustration */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: '1px solid var(--color-surface-2)',
            marginBottom: '24px',
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px', textAlign: 'center' }}>
              Finance and Growth: The Inverted U
            </h4>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '4px', height: '120px', marginBottom: '16px' }}>
              {[20, 45, 70, 90, 100, 95, 85, 70, 55].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    width: '40px',
                    backgroundColor: i < 5 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                    borderRadius: '4px 4px 0 0',
                    opacity: i === 4 ? 1 : 0.6 + (i < 5 ? i * 0.1 : (8 - i) * 0.1),
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)' }}>
              <span>Less finance</span>
              <span style={{ fontWeight: 500, color: 'rgb(16, 185, 129)' }}>Optimal</span>
              <span>More finance</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '12px', lineHeight: '1.6' }}>
              Research shows finance helps growth up to a point — but too much financial sector activity can harm the real economy.
            </p>
          </div>

          {/* Positive channels */}
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(16, 185, 129)', marginBottom: '16px' }}>
            How Finance Helps Growth
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {positiveChannels.map((channel, index) => (
              <motion.button
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedItem(selectedItem === channel.id ? null : channel.id)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: selectedItem === channel.id ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-surface-1)',
                  border: selectedItem === channel.id ? '2px solid rgb(16, 185, 129)' : '2px solid var(--color-surface-2)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>{channel.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{channel.name}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  {channel.description}
                </p>
                {selectedItem === channel.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                      marginTop: '12px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <p style={{ fontSize: '12px', color: 'rgb(16, 185, 129)', margin: 0 }}>
                      <strong>Example:</strong> {channel.example}
                    </p>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Warning banner */}
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            marginBottom: '24px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.6' }}>
              When financial sector profits come from zero-sum trading, excessive leverage, or rent extraction
              rather than facilitating real economic activity, finance can become a drag on growth.
            </p>
          </div>

          {/* Dark side issues */}
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(239, 68, 68)', marginBottom: '16px' }}>
            Potential Problems
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {darkSideIssues.map((issue, index) => (
              <motion.button
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedItem(selectedItem === issue.id ? null : issue.id)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: selectedItem === issue.id ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-surface-1)',
                  border: selectedItem === issue.id ? '2px solid rgb(239, 68, 68)' : '2px solid var(--color-surface-2)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>{issue.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{issue.name}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  {issue.description}
                </p>
                {selectedItem === issue.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                      marginTop: '12px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(239, 68, 68, 0.3)',
                    }}
                  >
                    <p style={{ fontSize: '12px', color: 'rgb(239, 68, 68)', margin: 0 }}>
                      <strong>Consequence:</strong> {issue.consequence}
                    </p>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Key takeaway */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '24px',
          padding: '20px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(99, 102, 241)', marginBottom: '8px' }}>
              Key Takeaway
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Finance is like medicine: the right dose helps, but too much can be toxic.
              The goal of financial regulation is to preserve the benefits of finance while limiting its potential for harm.
            </p>
          </div>
        </div>
      </motion.div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
        Click on any item to learn more about its real-world impact
      </p>
    </div>
  );
}
