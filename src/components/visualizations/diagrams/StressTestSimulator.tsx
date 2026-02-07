'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface StressTestSimulatorProps {
  className?: string;
}

type ScenarioId = 'baseline' | 'adverse' | 'severely-adverse';

interface MacroVariable {
  label: string;
  unit: string;
  baseline: number;
  adverse: number;
  severelyAdverse: number;
}

interface BankProfile {
  name: string;
  startingCapital: number;
  loanLosses: Record<ScenarioId, number>;
  revenueOffset: Record<ScenarioId, number>;
  description: string;
}

const macroVariables: MacroVariable[] = [
  { label: 'GDP Growth', unit: '%', baseline: 2.5, adverse: -1.0, severelyAdverse: -5.0 },
  { label: 'Unemployment', unit: '%', baseline: 4.0, adverse: 7.0, severelyAdverse: 10.0 },
  { label: 'House Prices', unit: '%', baseline: 3.0, adverse: -5.0, severelyAdverse: -25.0 },
  { label: 'Market Return', unit: '%', baseline: 8.0, adverse: -15.0, severelyAdverse: -40.0 },
];

const scenarios: { id: ScenarioId; name: string; color: string; colorRgb: string; severity: number }[] = [
  { id: 'baseline', name: 'Baseline', color: 'emerald', colorRgb: '16, 185, 129', severity: 0.15 },
  { id: 'adverse', name: 'Adverse', color: 'amber', colorRgb: '245, 158, 11', severity: 0.55 },
  { id: 'severely-adverse', name: 'Severely Adverse', color: 'rose', colorRgb: '239, 68, 68', severity: 0.95 },
];

const bankProfiles: BankProfile[] = [
  {
    name: 'MegaBank',
    startingCapital: 12.0,
    loanLosses: { baseline: 1.5, adverse: 3.5, 'severely-adverse': 5.5 },
    revenueOffset: { baseline: 2.0, adverse: 1.2, 'severely-adverse': 0.5 },
    description: 'Diversified global bank with strong capital buffers',
  },
  {
    name: 'Regional Bank',
    startingCapital: 10.5,
    loanLosses: { baseline: 1.2, adverse: 3.0, 'severely-adverse': 5.8 },
    revenueOffset: { baseline: 1.8, adverse: 1.0, 'severely-adverse': 0.3 },
    description: 'Mid-size bank with concentrated real estate exposure',
  },
  {
    name: 'Troubled Bank',
    startingCapital: 8.0,
    loanLosses: { baseline: 2.0, adverse: 4.5, 'severely-adverse': 7.0 },
    revenueOffset: { baseline: 1.5, adverse: 0.8, 'severely-adverse': 0.2 },
    description: 'Undercapitalized bank with weak loan portfolio',
  },
];

const MIN_CAPITAL_THRESHOLD = 4.5;

function getScenarioValue(variable: MacroVariable, scenarioId: ScenarioId): number {
  if (scenarioId === 'baseline') return variable.baseline;
  if (scenarioId === 'adverse') return variable.adverse;
  return variable.severelyAdverse;
}

function computeCapital(bank: BankProfile, scenarioId: ScenarioId) {
  const start = bank.startingCapital;
  const losses = bank.loanLosses[scenarioId];
  const revenue = bank.revenueOffset[scenarioId];
  const result = start - losses + revenue;
  const passes = result >= MIN_CAPITAL_THRESHOLD;
  return { start, losses, revenue, result, passes };
}

export function StressTestSimulator({ className }: StressTestSimulatorProps) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>('baseline');
  const [selectedBank, setSelectedBank] = useState(0);
  const [showSCAPCCAR, setShowSCAPCCAR] = useState(false);

  const scenario = scenarios.find((s) => s.id === selectedScenario)!;
  const bank = bankProfiles[selectedBank];
  const capital = computeCapital(bank, selectedScenario);

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
          Stress Test Simulator
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          How do regulators test if banks can survive a crisis?
        </p>
      </div>

      {/* Step 1 - Scenario Selection */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Step 1: Select Economic Scenario
        </div>

        {/* Scenario Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenario(s.id)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '12px',
                border: selectedScenario === s.id
                  ? `2px solid rgb(${s.colorRgb})`
                  : '2px solid transparent',
                backgroundColor: selectedScenario === s.id
                  ? `rgba(${s.colorRgb}, 0.15)`
                  : 'var(--color-surface-1)',
                color: selectedScenario === s.id
                  ? `rgb(${s.colorRgb})`
                  : 'var(--color-text-secondary)',
                fontWeight: selectedScenario === s.id ? 600 : 400,
                fontSize: '14px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Severity Meter */}
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              height: '8px',
              borderRadius: '4px',
              backgroundColor: 'var(--color-surface-2)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              animate={{ width: `${scenario.severity * 100}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              style={{
                height: '100%',
                borderRadius: '4px',
                background: `linear-gradient(to right, rgb(16, 185, 129), rgb(245, 158, 11), rgb(239, 68, 68))`,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4px',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
            }}
          >
            <span>Mild</span>
            <span>Severe</span>
          </div>
        </div>

        {/* Macro Variables Grid */}
        <motion.div
          key={selectedScenario}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
          }}
        >
          {macroVariables.map((variable) => {
            const value = getScenarioValue(variable, selectedScenario);
            const isNegative = value < 0;
            const isUnemployment = variable.label === 'Unemployment';
            const isBad = isNegative || (isUnemployment && value > 5);

            return (
              <div
                key={variable.label}
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-surface-1)',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    marginBottom: '4px',
                  }}
                >
                  {variable.label}
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: isBad ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)',
                  }}
                >
                  {value > 0 ? '+' : ''}
                  {value}
                  {variable.unit}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Step 2 - Bank Capital Impact */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Step 2: Capital Impact Waterfall
        </div>

        {/* Bank Selector */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {bankProfiles.map((b, i) => (
            <button
              key={b.name}
              onClick={() => setSelectedBank(i)}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '10px',
                border: selectedBank === i
                  ? '2px solid rgb(99, 102, 241)'
                  : '2px solid transparent',
                backgroundColor: selectedBank === i
                  ? 'rgba(99, 102, 241, 0.1)'
                  : 'var(--color-surface-1)',
                color: selectedBank === i
                  ? 'rgb(99, 102, 241)'
                  : 'var(--color-text-secondary)',
                fontWeight: selectedBank === i ? 600 : 400,
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {b.name}
            </button>
          ))}
        </div>

        <div
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          {bank.description}
        </div>

        {/* Waterfall Chart */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          <WaterfallChart capital={capital} scenario={scenario} />
        </div>
      </div>

      {/* Step 3 - Results Panel */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Step 3: Results
        </div>

        {/* Pass/Fail Banner */}
        <motion.div
          key={`${selectedScenario}-${selectedBank}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            backgroundColor: capital.passes
              ? 'rgba(16, 185, 129, 0.15)'
              : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${capital.passes ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: capital.passes ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
              marginBottom: '4px',
            }}
          >
            {capital.passes ? 'PASS' : 'FAIL'}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            {bank.name} {capital.passes ? 'maintains' : 'falls below'} the {MIN_CAPITAL_THRESHOLD}% minimum capital ratio
            under {scenario.name} scenario
          </div>
        </motion.div>

        {/* All Banks Results Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {bankProfiles.map((b, i) => {
            const cap = computeCapital(b, selectedScenario);
            return (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedBank(i)}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: selectedBank === i
                    ? `rgba(${cap.passes ? '16, 185, 129' : '239, 68, 68'}, 0.12)`
                    : 'var(--color-surface-1)',
                  border: selectedBank === i
                    ? `2px solid ${cap.passes ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'}`
                    : '2px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {b.name}
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: cap.passes ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                    marginBottom: '2px',
                  }}
                >
                  {cap.result.toFixed(1)}%
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: cap.passes ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                  }}
                >
                  {cap.passes ? 'PASS' : 'FAIL'}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Consequence Text */}
        {bankProfiles.some((b) => !computeCapital(b, selectedScenario).passes) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            <strong style={{ color: 'rgb(239, 68, 68)' }}>Consequence:</strong> Failed banks must
            raise capital, restrict dividends, or limit share buybacks until they rebuild their
            capital buffers above the minimum threshold.
          </motion.div>
        )}
      </div>

      {/* SCAP vs CCAR Comparison */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setShowSCAPCCAR(!showSCAPCCAR)}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: 'var(--color-surface-1)',
            color: 'var(--color-text-primary)',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>SCAP vs CCAR: Stress Test Evolution</span>
          <span
            style={{
              transform: showSCAPCCAR ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            &#9660;
          </span>
        </button>

        <AnimatePresence>
          {showSCAPCCAR && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: '12px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                {/* SCAP Card */}
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'rgb(245, 158, 11)',
                      marginBottom: '8px',
                    }}
                  >
                    SCAP (2009)
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '16px',
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.8',
                    }}
                  >
                    <li>One-time emergency assessment</li>
                    <li>19 largest bank holding companies</li>
                    <li>Crisis response measure</li>
                    <li>Results publicly disclosed</li>
                    <li>Restored market confidence</li>
                  </ul>
                </div>

                {/* CCAR Card */}
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'rgb(99, 102, 241)',
                      marginBottom: '8px',
                    }}
                  >
                    CCAR (Annual)
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '16px',
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.8',
                    }}
                  >
                    <li>Ongoing annual requirement</li>
                    <li>Largest banks by assets</li>
                    <li>3 scenarios (baseline, adverse, severely adverse)</li>
                    <li>Public results + capital plan review</li>
                    <li>Can restrict dividends if failed</li>
                  </ul>
                </div>
              </div>

              {/* Key Insight */}
              <div
                style={{
                  marginTop: '12px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(99, 102, 241, 0.08)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                }}
              >
                <strong style={{ color: 'var(--color-text-primary)' }}>Key Insight:</strong> Public
                disclosure of stress test results creates <em>market discipline</em> - investors and
                depositors can assess bank health, pressuring weak banks to strengthen their capital
                positions.
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
        Select a scenario and bank to simulate stress test outcomes
      </p>
    </div>
  );
}

/* ---- Waterfall Chart Sub-component ---- */

function WaterfallChart({
  capital,
  scenario,
}: {
  capital: ReturnType<typeof computeCapital>;
  scenario: (typeof scenarios)[number];
}) {
  const width = 600;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Y scale: 0 to max(start + 2, 14)
  const yMax = Math.max(capital.start + 2, 14);
  const yScale = (val: number) => padding.top + chartHeight - (val / yMax) * chartHeight;

  // X positions for bars
  const barCount = 4;
  const barWidth = chartWidth / (barCount * 2);
  const xPositions = [0, 1, 2, 3].map(
    (i) => padding.left + (i * 2 + 0.5) * barWidth
  );

  // Waterfall segments
  const bars = [
    {
      label: 'Starting Capital',
      value: capital.start,
      bottom: 0,
      top: capital.start,
      color: 'rgb(99, 102, 241)',
    },
    {
      label: 'Loan Losses',
      value: -capital.losses,
      bottom: capital.start - capital.losses,
      top: capital.start,
      color: 'rgb(239, 68, 68)',
    },
    {
      label: 'Revenue Offset',
      value: capital.revenue,
      bottom: capital.start - capital.losses,
      top: capital.start - capital.losses + capital.revenue,
      color: 'rgb(16, 185, 129)',
    },
    {
      label: 'Result',
      value: capital.result,
      bottom: 0,
      top: capital.result,
      color: capital.passes ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
    },
  ];

  // Threshold Y position
  const thresholdY = yScale(MIN_CAPITAL_THRESHOLD);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Y-axis grid lines */}
      {[0, 2, 4, 6, 8, 10, 12, 14].filter((v) => v <= yMax).map((v) => (
        <g key={v}>
          <line
            x1={padding.left}
            y1={yScale(v)}
            x2={width - padding.right}
            y2={yScale(v)}
            stroke="var(--color-surface-2)"
            strokeWidth="1"
          />
          <text
            x={padding.left - 10}
            y={yScale(v) + 4}
            textAnchor="end"
            fill="var(--color-text-muted)"
            fontSize="11"
          >
            {v}%
          </text>
        </g>
      ))}

      {/* Minimum threshold line */}
      <line
        x1={padding.left}
        y1={thresholdY}
        x2={width - padding.right}
        y2={thresholdY}
        stroke="rgb(239, 68, 68)"
        strokeWidth="2"
        strokeDasharray="6,4"
      />
      <text
        x={width - padding.right + 4}
        y={thresholdY + 4}
        fill="rgb(239, 68, 68)"
        fontSize="10"
        fontWeight="600"
      >
        {MIN_CAPITAL_THRESHOLD}% min
      </text>

      {/* Connector lines between bars */}
      {[0, 1, 2].map((i) => {
        const fromTop = bars[i].label === 'Starting Capital' ? bars[i].top : bars[i].top;
        const toBar = bars[i + 1];
        const connectorY = i === 0 ? yScale(bars[0].top) : yScale(toBar.label === 'Result' ? 0 : toBar.bottom);
        // Simplified: draw connector from right of current bar to left of next bar at the connecting level
        let cy: number;
        if (i === 0) cy = yScale(capital.start);
        else if (i === 1) cy = yScale(capital.start - capital.losses);
        else cy = yScale(capital.start - capital.losses + capital.revenue);

        return (
          <line
            key={i}
            x1={xPositions[i] + barWidth}
            y1={cy}
            x2={xPositions[i + 1]}
            y2={cy}
            stroke="var(--color-text-muted)"
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity={0.5}
          />
        );
      })}

      {/* Bars */}
      {bars.map((bar, i) => {
        const barTop = yScale(bar.top);
        const barBottom = yScale(bar.bottom);
        const barHeight = Math.abs(barBottom - barTop);

        return (
          <g key={bar.label}>
            <motion.rect
              initial={{ height: 0, y: barBottom }}
              animate={{ height: barHeight, y: barTop }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.15 }}
              x={xPositions[i]}
              width={barWidth}
              rx="4"
              fill={bar.color}
              opacity={0.8}
            />
            {/* Value label on bar */}
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 + 0.3 }}
              x={xPositions[i] + barWidth / 2}
              y={barTop - 8}
              textAnchor="middle"
              fill={bar.color}
              fontSize="12"
              fontWeight="700"
            >
              {bar.value >= 0 ? '+' : ''}
              {bar.value.toFixed(1)}%
            </motion.text>
            {/* X-axis label */}
            <text
              x={xPositions[i] + barWidth / 2}
              y={height - padding.bottom + 16}
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="10"
            >
              {bar.label}
            </text>
          </g>
        );
      })}

      {/* Y-axis label */}
      <text
        x={16}
        y={height / 2}
        textAnchor="middle"
        fill="var(--color-text-secondary)"
        fontSize="11"
        transform={`rotate(-90, 16, ${height / 2})`}
      >
        Capital Ratio
      </text>
    </svg>
  );
}
