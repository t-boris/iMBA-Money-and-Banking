'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface MaturityMismatchDiagramProps {
  className?: string;
}

type RateScenario = 'stable' | 'rise' | 'fall';

interface MaturityItem {
  name: string;
  maturity: string;
  years: number;
  percentage: number;
}

const liabilities: MaturityItem[] = [
  { name: 'Checking Accounts', maturity: 'Overnight', years: 0.003, percentage: 25 },
  { name: 'Savings Deposits', maturity: 'Days-Weeks', years: 0.1, percentage: 30 },
  { name: 'CDs (Short-term)', maturity: '3-12 Months', years: 0.5, percentage: 25 },
  { name: 'Wholesale Funding', maturity: '1-30 Days', years: 0.08, percentage: 20 },
];

const assets: MaturityItem[] = [
  { name: 'Mortgages', maturity: '20-30 Years', years: 25, percentage: 35 },
  { name: 'Commercial Loans', maturity: '3-10 Years', years: 6, percentage: 25 },
  { name: 'Auto Loans', maturity: '3-7 Years', years: 5, percentage: 15 },
  { name: 'Securities', maturity: '5-10 Years', years: 7, percentage: 25 },
];

// Calculate weighted average duration
const liabilityDuration = liabilities.reduce(
  (sum, item) => sum + item.years * (item.percentage / 100),
  0
);
const assetDuration = assets.reduce((sum, item) => sum + item.years * (item.percentage / 100), 0);
const durationGap = assetDuration - liabilityDuration;

interface ScenarioImpact {
  title: string;
  niiChange: string;
  assetValueChange: string;
  equityImpact: string;
  explanation: string;
  color: string;
}

const scenarioImpacts: Record<RateScenario, ScenarioImpact> = {
  stable: {
    title: 'Rates Stable',
    niiChange: '0%',
    assetValueChange: '0%',
    equityImpact: 'Stable',
    explanation: 'No repricing pressure. NII and asset values remain stable.',
    color: 'rgb(99, 102, 241)', // indigo
  },
  rise: {
    title: 'Rates Rise +2%',
    niiChange: '-15%',
    assetValueChange: '-12%',
    equityImpact: 'Squeezed',
    explanation:
      'Liabilities reprice quickly (expense up), assets reprice slowly (income lags). Net Interest Income squeezed. Asset market values fall.',
    color: 'rgb(239, 68, 68)', // red
  },
  fall: {
    title: 'Rates Fall -2%',
    niiChange: '+12%',
    assetValueChange: '+10%',
    equityImpact: 'Expanded',
    explanation:
      'Liabilities reprice quickly (expense down), assets reprice slowly (income stable). NII expands. But: prepayment risk on mortgages increases.',
    color: 'rgb(16, 185, 129)', // green
  },
};

function MaturityBar({
  item,
  maxYears,
  color,
  delay,
}: {
  item: MaturityItem;
  maxYears: number;
  color: string;
  delay: number;
}) {
  const barWidth = Math.max((item.years / maxYears) * 100, 5);

  return (
    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
          {item.name}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{item.maturity}</span>
      </div>
      <div
        style={{
          height: '20px',
          backgroundColor: 'var(--color-surface-2)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 0.6, delay }}
          style={{
            height: '100%',
            backgroundColor: color,
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '8px',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: 'white',
            }}
          >
            {item.percentage}%
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function CashFlowAnimation({ scenario }: { scenario: RateScenario }) {
  const impact = scenarioImpacts[scenario];

  // Mock NII values - Year 1 baseline, Year 2 after repricing
  const year1Income = 60;
  const year1Expense = scenario === 'rise' ? 35 : scenario === 'fall' ? 22 : 28;
  const year2Income = scenario === 'rise' ? 62 : scenario === 'fall' ? 58 : 60;
  const year2Expense = scenario === 'rise' ? 42 : scenario === 'fall' ? 18 : 28;

  const year1NII = year1Income - year1Expense;
  const year2NII = year2Income - year2Expense;

  return (
    <motion.div
      key={scenario}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: '16px',
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '12px',
        border: `2px solid ${impact.color}`,
      }}
    >
      <h4
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: impact.color,
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        Cash Flow Impact: {impact.title}
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Year 1 */}
        <div
          style={{
            padding: '12px',
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '8px',
            }}
          >
            Year 1
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'rgb(16, 185, 129)' }}>Interest Income</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}>
                ${year1Income}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'rgb(239, 68, 68)' }}>Interest Expense</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(239, 68, 68)' }}>
                -${year1Expense}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '4px',
                borderTop: '1px solid var(--color-surface-1)',
                marginTop: '4px',
              }}
            >
              <span
                style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}
              >
                NII
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
                ${year1NII}
              </span>
            </div>
          </div>
        </div>

        {/* Year 2 */}
        <div
          style={{
            padding: '12px',
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '8px',
            }}
          >
            Year 2 (After Repricing)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'rgb(16, 185, 129)' }}>Interest Income</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(16, 185, 129)' }}
              >
                ${year2Income}
              </motion.span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'rgb(239, 68, 68)' }}>Interest Expense</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: '11px', fontWeight: 600, color: 'rgb(239, 68, 68)' }}
              >
                -${year2Expense}
              </motion.span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '4px',
                borderTop: '1px solid var(--color-surface-1)',
                marginTop: '4px',
              }}
            >
              <span
                style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}
              >
                NII
              </span>
              <motion.span
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color:
                    year2NII > year1NII
                      ? 'rgb(16, 185, 129)'
                      : year2NII < year1NII
                        ? 'rgb(239, 68, 68)'
                        : 'rgb(99, 102, 241)',
                }}
              >
                ${year2NII}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* NII Change Indicator */}
      <div
        style={{
          marginTop: '12px',
          padding: '10px',
          backgroundColor:
            scenario === 'rise'
              ? 'rgba(239, 68, 68, 0.1)'
              : scenario === 'fall'
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(99, 102, 241, 0.1)',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: impact.color,
          }}
        >
          NII Change: {year2NII > year1NII ? '+' : ''}
          {Math.round(((year2NII - year1NII) / year1NII) * 100)}%
          {scenario === 'rise' && ' (Margin Squeeze)'}
          {scenario === 'fall' && ' (Margin Expansion)'}
        </span>
      </div>
    </motion.div>
  );
}

export function MaturityMismatchDiagram({ className }: MaturityMismatchDiagramProps) {
  const [scenario, setScenario] = useState<RateScenario>('stable');

  const impact = scenarioImpacts[scenario];
  const maxYears = 30; // For bar scaling

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
          Bank Maturity Mismatch
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Banks borrow short (liabilities) and lend long (assets), creating interest rate risk
        </p>
      </div>

      {/* Rate Scenario Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        {(['stable', 'rise', 'fall'] as RateScenario[]).map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: scenario === s ? scenarioImpacts[s].color : 'var(--color-surface-1)',
              color: scenario === s ? 'white' : 'var(--color-text-secondary)',
              fontWeight: scenario === s ? 600 : 400,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {s === 'stable' && 'Rates Stable'}
            {s === 'rise' && 'Rates Rise +2%'}
            {s === 'fall' && 'Rates Fall -2%'}
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        {/* Liabilities Column */}
        <div
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            border: '2px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: 'rgb(245, 158, 11)',
                fontWeight: 700,
                fontSize: '14px',
                borderRadius: '8px',
              }}
            >
              LIABILITIES (Short-term)
            </span>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
              Reprice quickly when rates change
            </p>
          </div>

          {liabilities.map((item, index) => (
            <MaturityBar
              key={item.name}
              item={item}
              maxYears={maxYears}
              color="rgb(245, 158, 11)"
              delay={index * 0.1}
            />
          ))}

          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '2px solid rgb(245, 158, 11)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Average Duration
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(245, 158, 11)' }}>
              {liabilityDuration.toFixed(1)} years
            </div>
          </div>
        </div>

        {/* Assets Column */}
        <div
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            border: '2px solid rgba(59, 130, 246, 0.3)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                color: 'rgb(59, 130, 246)',
                fontWeight: 700,
                fontSize: '14px',
                borderRadius: '8px',
              }}
            >
              ASSETS (Long-term)
            </span>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
              Reprice slowly when rates change
            </p>
          </div>

          {assets.map((item, index) => (
            <MaturityBar
              key={item.name}
              item={item}
              maxYears={maxYears}
              color="rgb(59, 130, 246)"
              delay={index * 0.1 + 0.4}
            />
          ))}

          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '2px solid rgb(59, 130, 246)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Average Duration
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(59, 130, 246)' }}>
              {assetDuration.toFixed(1)} years
            </div>
          </div>
        </div>
      </div>

      {/* Duration Gap Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '16px 24px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '12px',
          border: '2px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Asset Duration</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: 'rgb(59, 130, 246)' }}>
            {assetDuration.toFixed(1)}y
          </div>
        </div>
        <div style={{ fontSize: '20px', color: 'var(--color-text-muted)' }}>-</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            Liability Duration
          </div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: 'rgb(245, 158, 11)' }}>
            {liabilityDuration.toFixed(1)}y
          </div>
        </div>
        <div style={{ fontSize: '20px', color: 'var(--color-text-muted)' }}>=</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Duration Gap</div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '24px', fontWeight: 700, color: 'rgb(239, 68, 68)' }}
          >
            {durationGap.toFixed(1)} years
          </motion.div>
        </div>
      </motion.div>

      {/* Cash Flow Channel Animation */}
      <AnimatePresence mode="wait">
        <CashFlowAnimation key={scenario} scenario={scenario} />
      </AnimatePresence>

      {/* Impact Explanation */}
      <motion.div
        key={`impact-${scenario}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              padding: '12px',
              backgroundColor:
                scenario === 'rise'
                  ? 'rgba(239, 68, 68, 0.1)'
                  : scenario === 'fall'
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(99, 102, 241, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>NII Impact</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: impact.color }}>
              {impact.niiChange}
            </div>
          </div>
          <div
            style={{
              padding: '12px',
              backgroundColor:
                scenario === 'rise'
                  ? 'rgba(239, 68, 68, 0.1)'
                  : scenario === 'fall'
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(99, 102, 241, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Asset Value</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: impact.color }}>
              {impact.assetValueChange}
            </div>
          </div>
          <div
            style={{
              padding: '12px',
              backgroundColor:
                scenario === 'rise'
                  ? 'rgba(239, 68, 68, 0.1)'
                  : scenario === 'fall'
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(99, 102, 241, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Equity</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: impact.color }}>
              {impact.equityImpact}
            </div>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Explanation:</strong>{' '}
          {impact.explanation}
        </div>
      </motion.div>

      {/* Key Formulas */}
      <div
        style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'rgba(99, 102, 241, 0.05)',
          borderRadius: '12px',
          border: '1px dashed rgba(99, 102, 241, 0.3)',
        }}
      >
        <h4
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'rgb(99, 102, 241)',
            marginBottom: '12px',
          }}
        >
          Key Formulas
        </h4>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            <strong>Net Interest Income (NII)</strong> = Interest Income - Interest Expense
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            <strong>Duration Gap</strong> = Asset Duration - Liability Duration
          </div>
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
        Toggle rate scenarios to see how maturity mismatch creates interest rate risk
      </p>
    </div>
  );
}
