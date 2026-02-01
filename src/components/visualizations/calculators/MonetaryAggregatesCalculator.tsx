'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface MonetaryAggregatesCalculatorProps {
  className?: string;
}

// M1 and M2 components with their approximate real values (as of 2024, in trillions)
const m1Components = [
  { name: 'Currency', value: 2.3, icon: '💵', description: 'Physical cash held by public' },
  { name: 'Checking Deposits', value: 4.8, icon: '🏦', description: 'Demand deposits in banks' },
];

const m2OnlyComponents = [
  {
    name: 'Savings Deposits',
    value: 9.5,
    icon: '💰',
    description: 'Easily transferred to checking',
  },
  { name: 'Money Market', value: 1.2, icon: '📊', description: 'Short-term liquid investments' },
];

export function MonetaryAggregatesCalculator({ className }: MonetaryAggregatesCalculatorProps) {
  const [showInflationInsight, setShowInflationInsight] = useState(false);

  const m1Total = m1Components.reduce((sum, c) => sum + c.value, 0);
  const m2OnlyTotal = m2OnlyComponents.reduce((sum, c) => sum + c.value, 0);
  const m2Total = m1Total + m2OnlyTotal;

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '700px', margin: '0 auto' }}>
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
          What is Money? M1 vs M2
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Economists measure money supply in different ways. M1 is the most liquid (spendable
          immediately), while M2 includes less liquid forms.
        </p>
      </div>

      {/* Visual representation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {/* M1 Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-surface-1)',
            border: '2px solid rgb(99, 102, 241)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span
              style={{
                padding: '4px 12px',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                color: 'rgb(99, 102, 241)',
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: '6px',
              }}
            >
              M1 = ${m1Total.toFixed(1)}T
            </span>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Most Liquid — Can spend immediately
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {m1Components.map((component) => (
              <div
                key={component.name}
                style={{
                  flex: '1 1 200px',
                  padding: '12px',
                  backgroundColor: 'rgba(99, 102, 241, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}
                >
                  <span style={{ fontSize: '20px' }}>{component.icon}</span>
                  <span
                    style={{
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      fontSize: '14px',
                    }}
                  >
                    {component.name}
                  </span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'rgb(99, 102, 241)' }}>
                  ${component.value}T
                </div>
                <div
                  style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}
                >
                  {component.description}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* M2 Additional Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-surface-1)',
            border: '2px solid rgb(16, 185, 129)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span
              style={{
                padding: '4px 12px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: 'rgb(16, 185, 129)',
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: '6px',
              }}
            >
              M2 = ${m2Total.toFixed(1)}T
            </span>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              M1 + Less Liquid Savings
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {m2OnlyComponents.map((component) => (
              <div
                key={component.name}
                style={{
                  flex: '1 1 200px',
                  padding: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}
                >
                  <span style={{ fontSize: '20px' }}>{component.icon}</span>
                  <span
                    style={{
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      fontSize: '14px',
                    }}
                  >
                    {component.name}
                  </span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}>
                  ${component.value}T
                </div>
                <div
                  style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}
                >
                  {component.description}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Visual Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '12px',
            color: 'var(--color-text-primary)',
          }}
        >
          M1 is {((m1Total / m2Total) * 100).toFixed(0)}% of M2
        </div>
        <div
          style={{
            height: '32px',
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(m1Total / m2Total) * 100}%` }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, rgb(99, 102, 241), rgb(129, 140, 248))',
              borderRadius: '8px 0 0 8px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            <span style={{ color: 'white' }}>M1</span>
            <span style={{ color: 'rgb(16, 185, 129)' }}>M2</span>
          </div>
        </div>
      </motion.div>

      {/* Inflation Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={() => setShowInflationInsight(!showInflationInsight)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: showInflationInsight
              ? 'rgba(245, 158, 11, 0.1)'
              : 'var(--color-surface-1)',
            border: showInflationInsight
              ? '1px solid rgba(245, 158, 11, 0.3)'
              : '1px solid var(--color-surface-2)',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '24px' }}>💡</span>
          <div>
            <div style={{ fontWeight: 500, color: 'var(--color-text-primary)', fontSize: '14px' }}>
              Why does this matter for inflation?
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Click to learn more
            </div>
          </div>
        </button>

        {showInflationInsight && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              marginTop: '12px',
              padding: '16px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '12px',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.7',
                marginBottom: '12px',
              }}
            >
              <strong style={{ color: 'rgb(217, 119, 6)' }}>
                More money chasing same goods = higher prices.
              </strong>{' '}
              When the Fed increases money supply faster than the economy grows, each dollar buys
              less.
            </p>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.7',
                marginBottom: '12px',
              }}
            >
              Between 2020-2022, M2 grew by ~40% due to pandemic stimulus. This contributed to
              inflation rising from 1.4% to over 9%.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              The Fed monitors M2 closely when setting monetary policy to balance growth and price
              stability.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
