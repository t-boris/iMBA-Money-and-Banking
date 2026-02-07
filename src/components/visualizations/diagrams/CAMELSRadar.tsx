'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface CAMELSRadarProps {
  className?: string;
}

interface CAMELSDimension {
  id: string;
  letter: string;
  name: string;
  fullName: string;
  description: string;
  color: string;
  colorRgb: string;
  angle: number; // Position on hexagon (0-360)
}

interface BankPreset {
  id: string;
  name: string;
  type: string;
  scores: Record<string, number>; // 1-5 scale (1=best, 5=worst)
  description: string;
}

const dimensions: CAMELSDimension[] = [
  {
    id: 'capital',
    letter: 'C',
    name: 'Capital',
    fullName: 'Capital Adequacy',
    description:
      'Measures the bank\'s ability to absorb losses and protect depositors. Well-capitalized banks can weather unexpected losses without failing. Key metrics include Tier 1 capital ratio and leverage ratio.',
    color: 'rgb(99, 102, 241)',
    colorRgb: '99, 102, 241',
    angle: 270,
  },
  {
    id: 'assets',
    letter: 'A',
    name: 'Assets',
    fullName: 'Asset Quality',
    description:
      'Evaluates the quality and collectability of the bank\'s loan portfolio and investments. High levels of non-performing loans, problem assets, or concentrated exposures indicate poor asset quality.',
    color: 'rgb(239, 68, 68)',
    colorRgb: '239, 68, 68',
    angle: 330,
  },
  {
    id: 'management',
    letter: 'M',
    name: 'Management',
    fullName: 'Management Quality',
    description:
      'Assesses the capability of the board and management to identify, measure, and control risks. Includes governance quality, compliance culture, strategic planning, and internal controls.',
    color: 'rgb(245, 158, 11)',
    colorRgb: '245, 158, 11',
    angle: 30,
  },
  {
    id: 'earnings',
    letter: 'E',
    name: 'Earnings',
    fullName: 'Earnings',
    description:
      'Evaluates the sustainability and quality of earnings. Banks need consistent earnings to build capital, absorb losses, and support growth. Over-reliance on one-time gains or volatile income sources is a red flag.',
    color: 'rgb(16, 185, 129)',
    colorRgb: '16, 185, 129',
    angle: 90,
  },
  {
    id: 'liquidity',
    letter: 'L',
    name: 'Liquidity',
    fullName: 'Liquidity',
    description:
      'Measures the bank\'s ability to meet withdrawal demands and fund loan commitments without significant losses. Depends on funding diversification, cash reserves, and access to wholesale funding markets.',
    color: 'rgb(59, 130, 246)',
    colorRgb: '59, 130, 246',
    angle: 150,
  },
  {
    id: 'sensitivity',
    letter: 'S',
    name: 'Sensitivity',
    fullName: 'Sensitivity to Market Risk',
    description:
      'Evaluates exposure to changes in interest rates, foreign exchange rates, commodity prices, and equity prices. Banks with large duration gaps or unhedged positions receive worse scores.',
    color: 'rgb(139, 92, 246)',
    colorRgb: '139, 92, 246',
    angle: 210,
  },
];

const bankPresets: BankPreset[] = [
  {
    id: 'healthy',
    name: 'Healthy Bank',
    type: 'Well-Managed Community Bank',
    scores: {
      capital: 1,
      assets: 2,
      management: 1,
      earnings: 2,
      liquidity: 1,
      sensitivity: 2,
    },
    description:
      'Strong across all dimensions. Well-capitalized with high-quality assets, experienced management, consistent earnings, ample liquidity, and limited market risk exposure.',
  },
  {
    id: 'struggling',
    name: 'Struggling Bank',
    type: 'Bank Under Pressure',
    scores: {
      capital: 3,
      assets: 4,
      management: 3,
      earnings: 4,
      liquidity: 2,
      sensitivity: 3,
    },
    description:
      'Weak asset quality and declining earnings create pressure. Capital adequacy is marginal. Management is attempting corrective action but has not fully addressed fundamental issues.',
  },
  {
    id: 'problem',
    name: 'Problem Bank',
    type: 'FDIC Problem Bank List',
    scores: {
      capital: 4,
      assets: 5,
      management: 4,
      earnings: 5,
      liquidity: 4,
      sensitivity: 4,
    },
    description:
      'Critically weak in multiple dimensions. High levels of non-performing loans, eroding capital, unsustainable losses, and questionable management decisions. Likely on FDIC Problem Bank List.',
  },
];

// SVG dimensions
const SVG_SIZE = 340;
const CENTER = SVG_SIZE / 2;
const MAX_RADIUS = 130;

// CAMELS scores are 1-5 (1=best, 5=worst), we invert for display (5=large/bad, 1=small/good)
function scoreToRadius(score: number): number {
  return (score / 5) * MAX_RADIUS;
}

function getPoint(angle: number, radius: number): { x: number; y: number } {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function getScoreLabel(score: number): string {
  switch (score) {
    case 1:
      return 'Strong';
    case 2:
      return 'Satisfactory';
    case 3:
      return 'Fair';
    case 4:
      return 'Marginal';
    case 5:
      return 'Unsatisfactory';
    default:
      return '';
  }
}

function getScoreColor(score: number): string {
  switch (score) {
    case 1:
      return 'rgb(16, 185, 129)';
    case 2:
      return 'rgb(52, 211, 153)';
    case 3:
      return 'rgb(245, 158, 11)';
    case 4:
      return 'rgb(249, 115, 22)';
    case 5:
      return 'rgb(239, 68, 68)';
    default:
      return 'var(--color-text-muted)';
  }
}

export function CAMELSRadar({ className }: CAMELSRadarProps) {
  const [selectedBank, setSelectedBank] = useState('healthy');
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  const activeBank = bankPresets.find((b) => b.id === selectedBank)!;
  const selectedDimensionData = selectedDimension
    ? dimensions.find((d) => d.id === selectedDimension)
    : null;

  // Calculate composite score (average)
  const compositeScore =
    Object.values(activeBank.scores).reduce((sum, s) => sum + s, 0) /
    Object.values(activeBank.scores).length;

  // Problem bank threshold: composite > 3
  const isProblemBank = compositeScore > 3;

  // Build hexagon outline
  const hexPoints = dimensions.map((d) => getPoint(d.angle, MAX_RADIUS));
  const hexPath =
    hexPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Build radar polygon for bank scores
  const radarPoints = dimensions.map((d) => {
    const score = activeBank.scores[d.id] || 1;
    return getPoint(d.angle, scoreToRadius(score));
  });
  const radarPath =
    radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Grid rings for score levels
  const gridLevels = [1, 2, 3, 4, 5];

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
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
          CAMELS Bank Rating System
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Bank examiners rate six dimensions from 1 (strong) to 5 (unsatisfactory). Scores are
          confidential.
        </p>
      </div>

      {/* Bank Presets */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {bankPresets.map((bank) => {
          const isActive = selectedBank === bank.id;
          const bankComposite =
            Object.values(bank.scores).reduce((sum, s) => sum + s, 0) /
            Object.values(bank.scores).length;
          const compositeColor = getScoreColor(Math.round(bankComposite));

          return (
            <motion.button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: isActive
                  ? `2px solid ${compositeColor}`
                  : '1px solid var(--color-surface-2)',
                backgroundColor: isActive
                  ? `rgba(${bank.id === 'healthy' ? '16, 185, 129' : bank.id === 'struggling' ? '245, 158, 11' : '239, 68, 68'}, 0.08)`
                  : 'var(--color-surface-1)',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isActive ? compositeColor : 'var(--color-text-primary)',
                }}
              >
                {bank.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {bank.type}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Hexagon Radar Chart */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            padding: '24px',
            flexShrink: 0,
          }}
        >
          <svg
            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
            style={{ width: '340px', height: '340px', display: 'block' }}
          >
            <defs>
              <radialGradient id="camelsRadarGradient" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor={
                    isProblemBank ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)'
                  }
                />
                <stop
                  offset="100%"
                  stopColor={
                    isProblemBank ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.2)'
                  }
                />
              </radialGradient>
            </defs>

            {/* Grid rings (hexagonal) */}
            {gridLevels.map((level) => {
              const r = scoreToRadius(level);
              const points = dimensions.map((d) => getPoint(d.angle, r));
              const path =
                points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
              return (
                <path
                  key={level}
                  d={path}
                  fill="none"
                  stroke="var(--color-surface-2)"
                  strokeWidth="1"
                  strokeDasharray={level === 5 ? '0' : '4,4'}
                />
              );
            })}

            {/* Grid level labels */}
            {gridLevels.map((level) => {
              const y = CENTER - scoreToRadius(level);
              return (
                <text
                  key={level}
                  x={CENTER + 8}
                  y={y + 3}
                  fill="var(--color-text-muted)"
                  fontSize="9"
                  opacity="0.6"
                >
                  {level}
                </text>
              );
            })}

            {/* Axis lines */}
            {dimensions.map((dim) => {
              const point = getPoint(dim.angle, MAX_RADIUS);
              return (
                <line
                  key={dim.id}
                  x1={CENTER}
                  y1={CENTER}
                  x2={point.x}
                  y2={point.y}
                  stroke="var(--color-surface-2)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Radar polygon */}
            <motion.path
              key={`${selectedBank}-radar`}
              d={radarPath}
              fill="url(#camelsRadarGradient)"
              stroke={isProblemBank ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)'}
              strokeWidth="2.5"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            />

            {/* Dimension labels and score points */}
            {dimensions.map((dim, index) => {
              const score = activeBank.scores[dim.id] || 1;
              const scorePoint = getPoint(dim.angle, scoreToRadius(score));
              const labelOffset = 26;
              const labelPoint = getPoint(dim.angle, MAX_RADIUS + labelOffset);
              const isSelected = selectedDimension === dim.id;

              return (
                <g key={dim.id}>
                  {/* Score dot */}
                  <motion.circle
                    cx={scorePoint.x}
                    cy={scorePoint.y}
                    r={isSelected ? 8 : 6}
                    fill={getScoreColor(score)}
                    stroke="white"
                    strokeWidth="2"
                    style={{ cursor: 'pointer' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.08, type: 'spring' }}
                    whileHover={{ scale: 1.3 }}
                    onClick={() =>
                      setSelectedDimension(isSelected ? null : dim.id)
                    }
                  />

                  {/* Score value on dot */}
                  <text
                    x={scorePoint.x}
                    y={scorePoint.y + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="700"
                    style={{ pointerEvents: 'none' }}
                  >
                    {score}
                  </text>

                  {/* Dimension letter label */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setSelectedDimension(isSelected ? null : dim.id)
                    }
                  >
                    <circle
                      cx={labelPoint.x}
                      cy={labelPoint.y}
                      r="14"
                      fill={isSelected ? dim.color : 'var(--color-surface-2)'}
                      stroke={isSelected ? dim.color : 'var(--color-surface-2)'}
                      strokeWidth="2"
                    />
                    <text
                      x={labelPoint.x}
                      y={labelPoint.y + 4}
                      textAnchor="middle"
                      fill={isSelected ? 'white' : 'var(--color-text-secondary)'}
                      fontSize="12"
                      fontWeight="700"
                    >
                      {dim.letter}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Center composite score */}
            <circle cx={CENTER} cy={CENTER} r="24" fill="var(--color-surface-2)" />
            <text
              x={CENTER}
              y={CENTER - 4}
              textAnchor="middle"
              fill={getScoreColor(Math.round(compositeScore))}
              fontSize="16"
              fontWeight="700"
            >
              {compositeScore.toFixed(1)}
            </text>
            <text
              x={CENTER}
              y={CENTER + 10}
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="8"
            >
              COMPOSITE
            </text>
          </svg>
        </div>

        {/* Detail Panel */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <AnimatePresence mode="wait">
            {selectedDimensionData ? (
              <motion.div
                key={selectedDimensionData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  padding: '24px',
                  backgroundColor: `rgba(${selectedDimensionData.colorRgb}, 0.08)`,
                  borderRadius: '16px',
                  border: `2px solid rgba(${selectedDimensionData.colorRgb}, 0.2)`,
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
                      backgroundColor: selectedDimensionData.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>
                      {selectedDimensionData.letter}
                    </span>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: selectedDimensionData.color,
                        margin: 0,
                      }}
                    >
                      {selectedDimensionData.fullName}
                    </h4>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.7',
                    margin: '0 0 16px 0',
                  }}
                >
                  {selectedDimensionData.description}
                </p>

                {/* Current score for this bank */}
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-surface-1)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {activeBank.name} Score
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          color: getScoreColor(activeBank.scores[selectedDimensionData.id]),
                        }}
                      >
                        {activeBank.scores[selectedDimensionData.id]}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          color: getScoreColor(activeBank.scores[selectedDimensionData.id]),
                          fontWeight: 500,
                        }}
                      >
                        {getScoreLabel(activeBank.scores[selectedDimensionData.id])}
                      </span>
                    </div>
                  </div>
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
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  <p style={{ margin: '0 0 12px 0' }}>
                    The CAMELS rating system is used by US banking regulators to assess a bank&apos;s
                    overall condition during examinations. Each dimension is scored 1-5, and a
                    composite rating determines supervisory actions.
                  </p>
                  <div
                    style={{
                      padding: '10px',
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: 'rgb(99, 102, 241)',
                    }}
                  >
                    Click any letter to explore that dimension
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bank Description */}
          <motion.div
            key={selectedBank}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: 'var(--color-surface-1)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}
            >
              {activeBank.name}: {activeBank.type}
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                lineHeight: '1.6',
              }}
            >
              {activeBank.description}
            </p>
          </motion.div>

          {/* Problem Bank Warning */}
          <AnimatePresence>
            {isProblemBank && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  marginTop: '16px',
                  padding: '16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '12px',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(239, 68, 68)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
                  </svg>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(239, 68, 68)' }}>
                    Problem Bank List
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  <p style={{ margin: '0 0 8px 0' }}>
                    Banks with composite CAMELS ratings of 4 or 5 are placed on the FDIC Problem Bank
                    List. Consequences include:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Increased examination frequency</li>
                    <li>Restrictions on growth and activities</li>
                    <li>Required corrective action plans</li>
                    <li>Higher FDIC insurance premiums</li>
                  </ul>
                  <p style={{ margin: '8px 0 0 0', fontStyle: 'italic' }}>
                    The list is confidential and not disclosed to the public.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Score Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '6px',
          marginTop: '24px',
        }}
      >
        {dimensions.map((dim) => {
          const score = activeBank.scores[dim.id];
          const isSelected = selectedDimension === dim.id;

          return (
            <motion.button
              key={dim.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                setSelectedDimension(isSelected ? null : dim.id)
              }
              style={{
                padding: '10px 6px',
                backgroundColor: isSelected
                  ? `rgba(${dim.colorRgb}, 0.15)`
                  : 'var(--color-surface-1)',
                borderRadius: '10px',
                border: isSelected
                  ? `2px solid rgba(${dim.colorRgb}, 0.4)`
                  : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: getScoreColor(score),
                  marginBottom: '2px',
                }}
              >
                {score}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  color: isSelected ? dim.color : 'var(--color-text-secondary)',
                }}
              >
                {dim.name}
              </div>
              <div
                style={{
                  fontSize: '9px',
                  color: getScoreColor(score),
                  marginTop: '2px',
                }}
              >
                {getScoreLabel(score)}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Rating Scale Reference */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '16px',
          flexWrap: 'wrap',
        }}
      >
        {[1, 2, 3, 4, 5].map((score) => (
          <div key={score} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: getScoreColor(score),
              }}
            />
            <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
              {score} = {getScoreLabel(score)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
