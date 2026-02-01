'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface RiskTypesPentagonProps {
  className?: string;
}

interface RiskType {
  id: string;
  name: string;
  definition: string;
  keyMetric: string;
  tools: string[];
  color: string;
  angle: number; // Position on pentagon (0-360 degrees)
}

interface BankProfile {
  id: string;
  name: string;
  type: string;
  risks: Record<string, number>; // 0-100 scale for radar chart
  description: string;
}

const riskTypes: RiskType[] = [
  {
    id: 'credit',
    name: 'Credit Risk',
    definition: 'Risk that borrowers fail to repay loans or meet obligations',
    keyMetric: 'Probability of Default (PD)',
    tools: ['Screening & due diligence', 'Risk-based pricing', 'Loan covenants', 'Credit Default Swaps (CDS)'],
    color: '239, 68, 68', // red
    angle: 270, // top
  },
  {
    id: 'interest-rate',
    name: 'Interest Rate Risk',
    definition: 'Risk that interest rate changes adversely affect profits',
    keyMetric: 'Duration Gap',
    tools: ['Interest rate swaps', 'Asset-liability matching', 'Repricing gap analysis', 'Duration hedging'],
    color: '245, 158, 11', // amber
    angle: 342, // top-right
  },
  {
    id: 'liquidity',
    name: 'Liquidity Risk',
    definition: 'Risk of cash shortfall when obligations come due',
    keyMetric: 'Liquidity Coverage Ratio (LCR)',
    tools: ['Asset-liability management', 'Cash reserves', 'Credit lines', 'Diversified funding'],
    color: '59, 130, 246', // blue
    angle: 54, // bottom-right
  },
  {
    id: 'market',
    name: 'Market Risk',
    definition: 'Risk of losses from trading book due to market movements',
    keyMetric: 'Value at Risk (VaR)',
    tools: ['Position limits', 'Hedging strategies', 'Stop-loss orders', 'Stress testing'],
    color: '139, 92, 246', // purple
    angle: 126, // bottom-left
  },
  {
    id: 'operational',
    name: 'Operational Risk',
    definition: 'Risk from failed processes, systems, or people',
    keyMetric: 'Hard to quantify (loss data)',
    tools: ['Internal controls', 'Governance & compliance', 'Business continuity', 'Insurance'],
    color: '16, 185, 129', // emerald
    angle: 198, // top-left
  },
];

const bankProfiles: BankProfile[] = [
  {
    id: 'money-center',
    name: 'JPMorgan Chase',
    type: 'Money Center Bank',
    risks: {
      credit: 70,
      'interest-rate': 60,
      liquidity: 50,
      market: 90,
      operational: 85,
    },
    description: 'Large trading book and complex operations mean high market and operational risk',
  },
  {
    id: 'community',
    name: 'First Community Bank',
    type: 'Community Bank',
    risks: {
      credit: 85,
      'interest-rate': 75,
      liquidity: 60,
      market: 20,
      operational: 40,
    },
    description: 'Loan-focused business model creates high credit and interest rate exposure',
  },
];

export function RiskTypesPentagon({ className }: RiskTypesPentagonProps) {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [showBankProfile, setShowBankProfile] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>('money-center');

  const selectedRiskData = selectedRisk ? riskTypes.find((r) => r.id === selectedRisk) : null;
  const selectedBankData = bankProfiles.find((b) => b.id === selectedBank);

  // SVG dimensions
  const size = 340;
  const center = size / 2;
  const radius = 120;
  const innerRadius = 40; // For insolvency center

  // Calculate pentagon points
  const getPoint = (angle: number, r: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  // Pentagon vertices
  const pentagonPoints = riskTypes.map((risk) => getPoint(risk.angle, radius));
  const pentagonPath = pentagonPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Radar chart points for bank profile
  const getRadarPoints = (bankRisks: Record<string, number>) => {
    return riskTypes.map((risk) => {
      const value = bankRisks[risk.id] || 0;
      const r = (value / 100) * (radius - 20);
      return getPoint(risk.angle, r + 20);
    });
  };

  const radarPath = selectedBankData
    ? getRadarPoints(selectedBankData.risks).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
    : '';

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          The Five Bank Risks
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Every bank faces these risks - click to explore each one
        </p>
      </div>

      {/* Bank Profile Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setShowBankProfile(false)}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: !showBankProfile ? 'rgba(99, 102, 241, 0.15)' : 'var(--color-surface-1)',
            color: !showBankProfile ? 'rgb(99, 102, 241)' : 'var(--color-text-secondary)',
            fontWeight: !showBankProfile ? 600 : 400,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Risk Overview
        </button>
        <button
          onClick={() => setShowBankProfile(true)}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: showBankProfile ? 'rgba(99, 102, 241, 0.15)' : 'var(--color-surface-1)',
            color: showBankProfile ? 'rgb(99, 102, 241)' : 'var(--color-text-secondary)',
            fontWeight: showBankProfile ? 600 : 400,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Bank Comparison
        </button>
      </div>

      {/* Bank Selector (when in profile mode) */}
      {showBankProfile && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          {bankProfiles.map((bank) => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: selectedBank === bank.id ? '2px solid rgba(99, 102, 241, 0.5)' : '2px solid transparent',
                backgroundColor: selectedBank === bank.id ? 'rgba(99, 102, 241, 0.08)' : 'var(--color-surface-1)',
                color: selectedBank === bank.id ? 'rgb(99, 102, 241)' : 'var(--color-text-secondary)',
                fontWeight: selectedBank === bank.id ? 600 : 400,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              <div>{bank.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{bank.type}</div>
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Pentagon Visualization */}
        <div style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          padding: '24px',
          flexShrink: 0,
        }}>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            style={{ width: '340px', height: '340px', display: 'block' }}
          >
            <defs>
              <radialGradient id="insolvencyGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.3)" />
                <stop offset="100%" stopColor="rgba(127, 29, 29, 0.8)" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid circles */}
            {[0.25, 0.5, 0.75, 1].map((scale) => (
              <circle
                key={scale}
                cx={center}
                cy={center}
                r={radius * scale}
                fill="none"
                stroke="var(--color-surface-2)"
                strokeWidth="1"
                strokeDasharray={scale === 1 ? '0' : '4,4'}
              />
            ))}

            {/* Risk type lines from center */}
            {riskTypes.map((risk) => {
              const point = getPoint(risk.angle, radius);
              return (
                <line
                  key={risk.id}
                  x1={center}
                  y1={center}
                  x2={point.x}
                  y2={point.y}
                  stroke="var(--color-surface-2)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Radar chart fill for bank profile mode */}
            {showBankProfile && selectedBankData && (
              <motion.path
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                d={radarPath}
                fill="rgba(99, 102, 241, 0.2)"
                stroke="rgb(99, 102, 241)"
                strokeWidth="2"
              />
            )}

            {/* Pentagon outline */}
            <motion.path
              d={pentagonPath}
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="2"
              strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Center - Insolvency Risk */}
            <motion.circle
              cx={center}
              cy={center}
              r={innerRadius}
              fill="url(#insolvencyGradient)"
              animate={{
                r: [innerRadius, innerRadius + 3, innerRadius],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <text
              x={center}
              y={center - 6}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="600"
            >
              INSOLVENCY
            </text>
            <text
              x={center}
              y={center + 8}
              textAnchor="middle"
              fill="white"
              fontSize="8"
            >
              RISK
            </text>

            {/* Risk type points */}
            {riskTypes.map((risk, index) => {
              const point = getPoint(risk.angle, radius);
              const isSelected = selectedRisk === risk.id;
              const labelOffset = 30;
              const labelPoint = getPoint(risk.angle, radius + labelOffset);

              return (
                <g key={risk.id}>
                  {/* Connecting line when selected */}
                  {isSelected && (
                    <motion.line
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      x1={center}
                      y1={center}
                      x2={point.x}
                      y2={point.y}
                      stroke={`rgb(${risk.color})`}
                      strokeWidth="3"
                      strokeOpacity="0.5"
                    />
                  )}

                  {/* Point circle */}
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={isSelected ? 16 : 12}
                    fill={`rgb(${risk.color})`}
                    stroke="white"
                    strokeWidth="2"
                    style={{ cursor: 'pointer' }}
                    filter={isSelected ? 'url(#glow)' : undefined}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedRisk(isSelected ? null : risk.id)}
                  />

                  {/* Risk value for bank profile mode */}
                  {showBankProfile && selectedBankData && (
                    <text
                      x={point.x}
                      y={point.y + 4}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="700"
                    >
                      {selectedBankData.risks[risk.id]}
                    </text>
                  )}

                  {/* Label */}
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    fill={isSelected ? `rgb(${risk.color})` : 'var(--color-text-secondary)'}
                    fontSize="11"
                    fontWeight={isSelected ? 600 : 400}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedRisk(isSelected ? null : risk.id)}
                  >
                    {risk.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail Panel */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <AnimatePresence mode="wait">
            {selectedRiskData ? (
              <motion.div
                key={selectedRiskData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  padding: '24px',
                  backgroundColor: `rgba(${selectedRiskData.color}, 0.08)`,
                  borderRadius: '16px',
                  border: `2px solid rgba(${selectedRiskData.color}, 0.2)`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: `rgb(${selectedRiskData.color})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>
                      {selectedRiskData.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: `rgb(${selectedRiskData.color})`, margin: 0 }}>
                      {selectedRiskData.name}
                    </h4>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                    Definition
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.6' }}>
                    {selectedRiskData.definition}
                  </p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                    Key Metric
                  </div>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: `rgb(${selectedRiskData.color})`,
                  }}>
                    {selectedRiskData.keyMetric}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                    Risk Management Tools
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {selectedRiskData.tools.map((tool, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          fontSize: '13px',
                          color: 'var(--color-text-secondary)',
                          marginBottom: '6px',
                        }}
                      >
                        {tool}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--color-surface-1)',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>&#9888;</div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  All Risks Lead to Insolvency
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.6' }}>
                  Any single risk type, if large enough, can deplete a bank&apos;s equity buffer and lead to insolvency.
                  That&apos;s why banks must manage ALL five simultaneously.
                </p>
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'rgb(239, 68, 68)',
                }}>
                  Click any risk point to explore
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bank profile description */}
          {showBankProfile && selectedBankData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '16px',
                padding: '16px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '12px',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                {selectedBankData.name}: Risk Profile
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.6' }}>
                {selectedBankData.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Reference Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '8px',
        marginTop: '24px',
      }}>
        {riskTypes.map((risk) => (
          <motion.button
            key={risk.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedRisk(selectedRisk === risk.id ? null : risk.id)}
            style={{
              padding: '12px 8px',
              backgroundColor: selectedRisk === risk.id ? `rgba(${risk.color}, 0.15)` : 'var(--color-surface-1)',
              borderRadius: '10px',
              border: selectedRisk === risk.id ? `2px solid rgba(${risk.color}, 0.4)` : '2px solid transparent',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: `rgb(${risk.color})`,
              margin: '0 auto 8px',
            }} />
            <div style={{
              fontSize: '11px',
              fontWeight: 500,
              color: selectedRisk === risk.id ? `rgb(${risk.color})` : 'var(--color-text-secondary)',
            }}>
              {risk.name.replace(' Risk', '')}
            </div>
          </motion.button>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
        Click any risk type to see definition, key metric, and management tools
      </p>
    </div>
  );
}
