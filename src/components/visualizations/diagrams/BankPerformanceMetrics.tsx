'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface BankPerformanceMetricsProps {
  className?: string;
}

interface MetricDefinition {
  id: string;
  name: string;
  formula: string;
  formulaExpanded: string;
  meaning: string;
  typicalRange: string;
  whatItTells: string;
  limitations: string;
  color: string;
}

const metrics: MetricDefinition[] = [
  {
    id: 'roa',
    name: 'ROA (Return on Assets)',
    formula: 'Net Income / Total Assets',
    formulaExpanded: 'ROA = Net Income ÷ Total Assets × 100%',
    meaning: 'How much profit the bank generates from each dollar of assets',
    typicalRange: '0.5% - 1.5% for healthy banks',
    whatItTells:
      'Measures operational efficiency — how well management uses the bank&apos;s resources to generate profit. Higher ROA means better asset utilization.',
    limitations:
      'Does not account for how assets are financed (debt vs equity). Two banks with same ROA can have very different risk profiles.',
    color: 'rgb(99, 102, 241)',
  },
  {
    id: 'roe',
    name: 'ROE (Return on Equity)',
    formula: 'Net Income / Total Equity',
    formulaExpanded: 'ROE = Net Income ÷ Shareholders&apos; Equity × 100%',
    meaning: 'How much profit shareholders earn on their invested capital',
    typicalRange: '8% - 15% for healthy banks',
    whatItTells:
      'Measures return to shareholders — the profit generated per dollar of owner investment. This is what investors care most about.',
    limitations:
      'Can be artificially high with excessive leverage. A high ROE from high leverage is riskier than high ROE from high ROA.',
    color: 'rgb(16, 185, 129)',
  },
];

interface Scenario {
  id: string;
  name: string;
  description: string;
  roa: number;
  leverage: number;
  roe: number;
  interpretation: string;
  icon: string;
}

const scenarios: Scenario[] = [
  {
    id: 'efficient',
    name: 'Efficient & Conservative',
    description: 'High ROA, moderate leverage',
    roa: 1.5,
    leverage: 8,
    roe: 12,
    interpretation:
      'Best scenario: Strong operating performance without excessive risk. The bank earns good returns through skill, not just leverage.',
    icon: '✅',
  },
  {
    id: 'leveraged',
    name: 'Leverage-Dependent',
    description: 'Low ROA, high leverage',
    roa: 0.6,
    leverage: 18,
    roe: 10.8,
    interpretation:
      'Warning sign: Similar ROE but achieved through dangerous leverage. Small asset losses could wipe out equity. This was common before 2008.',
    icon: '⚠️',
  },
  {
    id: 'struggling',
    name: 'Struggling Bank',
    description: 'Low ROA, moderate leverage',
    roa: 0.4,
    leverage: 10,
    roe: 4,
    interpretation:
      'Poor performance: Low efficiency AND low returns to shareholders. May face pressure to take more risk or cut costs.',
    icon: '📉',
  },
  {
    id: 'crisis',
    name: 'Crisis Mode',
    description: 'Negative ROA, high leverage',
    roa: -0.5,
    leverage: 15,
    roe: -7.5,
    interpretation:
      'Danger zone: Losses are amplified by leverage. The bank is destroying shareholder value and may need capital injection or face failure.',
    icon: '🚨',
  },
];

export function BankPerformanceMetrics({ className }: BankPerformanceMetricsProps) {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<string>('efficient');

  const currentScenario = scenarios.find((s) => s.id === activeScenario) || scenarios[0];

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
          Key Bank Performance Metrics
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Understanding ROA and ROE is essential for evaluating bank health and comparing
          performance across institutions.
        </p>
      </div>

      {/* Metric Definitions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '24px',
              backgroundColor: 'var(--color-surface-1)',
              borderRadius: '16px',
              border:
                activeMetric === metric.id
                  ? `2px solid ${metric.color}`
                  : '1px solid var(--color-surface-2)',
              cursor: 'pointer',
              transition: 'border 0.2s',
            }}
            onClick={() => setActiveMetric(activeMetric === metric.id ? null : metric.id)}
          >
            {/* Header */}
            <div style={{ marginBottom: '16px' }}>
              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: metric.color,
                  marginBottom: '8px',
                }}
              >
                {metric.name}
              </h4>
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: `color-mix(in srgb, ${metric.color} 10%, transparent)`,
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: metric.color,
                  textAlign: 'center',
                }}
              >
                {metric.formula}
              </div>
            </div>

            {/* Meaning */}
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
                What it measures
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                {metric.meaning}
              </p>
            </div>

            {/* Typical Range */}
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                Typical range:{' '}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: metric.color }}>
                {metric.typicalRange}
              </span>
            </div>

            {/* Expandable Details */}
            <AnimatePresence>
              {activeMetric === metric.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  {/* What it tells you */}
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
                      What it tells you
                    </div>
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                        margin: 0,
                      }}
                    >
                      {metric.whatItTells}
                    </p>
                  </div>

                  {/* Limitations */}
                  <div
                    style={{
                      padding: '12px',
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'rgb(180, 130, 20)',
                        marginBottom: '4px',
                      }}
                    >
                      ⚠️ Limitations
                    </div>
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.5',
                        margin: 0,
                      }}
                    >
                      {metric.limitations}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Click hint */}
            <div
              style={{
                marginTop: '12px',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
              }}
            >
              {activeMetric === metric.id ? 'Click to collapse' : 'Click for more details'}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Relationship */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '24px',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          border: '2px solid rgba(147, 51, 234, 0.3)',
          borderRadius: '16px',
          marginBottom: '32px',
        }}
      >
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'rgb(147, 51, 234)',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          🔗 The Key Relationship: ROE = ROA × Leverage
        </h4>

        {/* Visual Formula */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              borderRadius: '10px',
              border: '2px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'rgb(16, 185, 129)' }}>
              ROE
            </span>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
            =
          </span>
          <div
            style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              borderRadius: '10px',
              border: '2px solid rgba(99, 102, 241, 0.3)',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
              ROA
            </span>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
            ×
          </span>
          <div
            style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              borderRadius: '10px',
              border: '2px solid rgba(245, 158, 11, 0.3)',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'rgb(245, 158, 11)' }}>
              Assets / Equity
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.7',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          This formula shows why the same ROE can mean very different things. A bank can achieve
          high ROE through <strong style={{ color: 'rgb(99, 102, 241)' }}>high ROA</strong>{' '}
          (efficient operations) or through{' '}
          <strong style={{ color: 'rgb(245, 158, 11)' }}>high leverage</strong> (more risk).
          Understanding which source drives ROE is critical for assessing bank quality.
        </p>
      </motion.div>

      {/* Scenario Comparison */}
      <div style={{ marginBottom: '24px' }}>
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Same ROE, Different Risk: Compare Scenarios
        </h4>

        {/* Scenario Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          {scenarios.map((scenario) => (
            <motion.button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '10px 16px',
                backgroundColor:
                  activeScenario === scenario.id
                    ? 'rgba(99, 102, 241, 0.15)'
                    : 'var(--color-surface-1)',
                border:
                  activeScenario === scenario.id
                    ? '2px solid rgba(99, 102, 241, 0.4)'
                    : '1px solid var(--color-surface-2)',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <span style={{ marginRight: '6px' }}>{scenario.icon}</span>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: activeScenario === scenario.id ? 600 : 400,
                  color:
                    activeScenario === scenario.id
                      ? 'rgb(99, 102, 241)'
                      : 'var(--color-text-secondary)',
                }}
              >
                {scenario.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Scenario Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              padding: '24px',
              backgroundColor: 'var(--color-surface-1)',
              borderRadius: '16px',
              border: '1px solid var(--color-surface-2)',
            }}
          >
            {/* Metrics Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                flexWrap: 'wrap',
                marginBottom: '20px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'rgb(99, 102, 241)', marginBottom: '4px' }}>
                  ROA
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: currentScenario.roa >= 0 ? 'rgb(99, 102, 241)' : 'rgb(239, 68, 68)',
                    fontFamily: 'monospace',
                  }}
                >
                  {currentScenario.roa > 0 ? '+' : ''}
                  {currentScenario.roa}%
                </div>
              </div>
              <div
                style={{ fontSize: '24px', color: 'var(--color-text-muted)', alignSelf: 'center' }}
              >
                ×
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'rgb(245, 158, 11)', marginBottom: '4px' }}>
                  Leverage
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: currentScenario.leverage > 15 ? 'rgb(239, 68, 68)' : 'rgb(245, 158, 11)',
                    fontFamily: 'monospace',
                  }}
                >
                  {currentScenario.leverage}x
                </div>
              </div>
              <div
                style={{ fontSize: '24px', color: 'var(--color-text-muted)', alignSelf: 'center' }}
              >
                =
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'rgb(16, 185, 129)', marginBottom: '4px' }}>
                  ROE
                </div>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: currentScenario.roe >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                    fontFamily: 'monospace',
                  }}
                >
                  {currentScenario.roe > 0 ? '+' : ''}
                  {currentScenario.roe}%
                </div>
              </div>
            </div>

            {/* Interpretation */}
            <div
              style={{
                padding: '16px',
                backgroundColor:
                  currentScenario.id === 'efficient'
                    ? 'rgba(16, 185, 129, 0.1)'
                    : currentScenario.id === 'crisis'
                      ? 'rgba(239, 68, 68, 0.1)'
                      : 'rgba(245, 158, 11, 0.1)',
                borderRadius: '10px',
                border:
                  currentScenario.id === 'efficient'
                    ? '1px solid rgba(16, 185, 129, 0.2)'
                    : currentScenario.id === 'crisis'
                      ? '1px solid rgba(239, 68, 68, 0.2)'
                      : '1px solid rgba(245, 158, 11, 0.2)',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '6px',
                }}
              >
                {currentScenario.icon} {currentScenario.description}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                {currentScenario.interpretation}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Key Takeaway */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '20px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '12px',
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
              Key Takeaway: Always Look at Both Metrics
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              <strong>ROA</strong> tells you about management quality and operational efficiency.{' '}
              <strong>ROE</strong> tells you about returns to shareholders. A healthy bank has both
              reasonable ROA (1%+) and ROE (10%+) without excessive leverage. When comparing banks,
              check how much of ROE comes from ROA versus leverage.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
