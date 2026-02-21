'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface FedFunctionsPentagonProps {
  className?: string;
}

interface FedFunction {
  id: string;
  name: string;
  icon: string;
  shortLabel: string;
  description: string;
  color: string;
  colorRgb: string;
}

const fedFunctions: FedFunction[] = [
  {
    id: 'monetary-policy',
    name: 'Monetary Policy',
    icon: '\u{1F3DB}\uFE0F',
    shortLabel: 'Monetary\nPolicy',
    description:
      'Conduct monetary policy to promote maximum employment, stable prices, and moderate long-term interest rates',
    color: 'rgb(99, 102, 241)',
    colorRgb: '99, 102, 241',
  },
  {
    id: 'financial-stability',
    name: 'Financial Stability',
    icon: '\u{1F6E1}\uFE0F',
    shortLabel: 'Financial\nStability',
    description: 'Monitor and address systemic risks to financial system stability',
    color: 'rgb(16, 185, 129)',
    colorRgb: '16, 185, 129',
  },
  {
    id: 'supervision-regulation',
    name: 'Supervision & Regulation',
    icon: '\u{1F4CB}',
    shortLabel: 'Supervision\n& Regulation',
    description:
      'Supervise and regulate banks for safety, soundness, and consumer compliance (Truth in Lending, CRA)',
    color: 'rgb(245, 158, 11)',
    colorRgb: '245, 158, 11',
  },
  {
    id: 'payment-systems',
    name: 'Payment Systems',
    icon: '\u{1F4B3}',
    shortLabel: 'Payment\nSystems',
    description: 'Operate payment and settlement systems (ACH, Fedwire, FedNow)',
    color: 'rgb(139, 92, 246)',
    colorRgb: '139, 92, 246',
  },
  {
    id: 'consumer-protection',
    name: 'Consumer Protection',
    icon: '\u{1F512}',
    shortLabel: 'Consumer\nProtection',
    description: 'Protect consumers through disclosure requirements and fair lending laws',
    color: 'rgb(239, 68, 68)',
    colorRgb: '239, 68, 68',
  },
];

const vertexAngles = [270, 342, 54, 126, 198];

export default function FedFunctionsPentagon({ className }: FedFunctionsPentagonProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeData = fedFunctions.find((f) => f.id === activeId);

  const size = 360;
  const center = size / 2;
  const radius = 130;

  const getPoint = (angleDeg: number, r: number) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: center + r * Math.cos(rad), y: center + r * Math.sin(rad) };
  };

  const vertices = vertexAngles.map((angle) => getPoint(angle, radius));
  const pentagonPath =
    vertices.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  const connections: Array<{ from: number; to: number }> = [];
  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      connections.push({ from: i, to: j });
    }
  }

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          The Five Functions of the Federal Reserve
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Click any vertex to explore each function
        </p>
      </div>

      {/* Pentagon SVG */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
        <div style={{ backgroundColor: 'var(--color-surface-1)', borderRadius: '16px', padding: '16px' }}>
          <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '360px', height: '360px', display: 'block' }}>
            <defs>
              <filter id="fedGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Internal connecting lines */}
            {connections.map(({ from, to }) => {
              const p1 = vertices[from];
              const p2 = vertices[to];
              const isHighlighted = activeId === fedFunctions[from].id || activeId === fedFunctions[to].id;
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={isHighlighted ? (activeData ? activeData.color : 'var(--color-text-muted)') : 'var(--color-surface-2)'}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeOpacity={isHighlighted ? 0.5 : 0.4}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              );
            })}

            {/* Pentagon outline */}
            <motion.path
              d={pentagonPath} fill="none" stroke="var(--color-text-muted)"
              strokeWidth="2" strokeOpacity="0.3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
            />

            {/* Center label */}
            <motion.circle
              cx={center} cy={center} r={36}
              fill="rgba(99, 102, 241, 0.1)" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
            />
            <motion.text
              x={center} y={center - 4} textAnchor="middle"
              fill="rgb(99, 102, 241)" fontSize="14" fontWeight="700"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            >
              THE
            </motion.text>
            <motion.text
              x={center} y={center + 12} textAnchor="middle"
              fill="rgb(99, 102, 241)" fontSize="14" fontWeight="700"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            >
              FED
            </motion.text>

            {/* Vertex circles with icons and labels */}
            {fedFunctions.map((func, index) => {
              const point = vertices[index];
              const isActive = activeId === func.id;
              const labelPoint = getPoint(vertexAngles[index], radius + 38);
              return (
                <g key={func.id}>
                  {isActive && (
                    <motion.line
                      initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
                      x1={center} y1={center} x2={point.x} y2={point.y}
                      stroke={func.color} strokeWidth="3"
                    />
                  )}
                  {isActive && (
                    <motion.circle
                      cx={point.x} cy={point.y} r={22} fill="none"
                      stroke={func.color} strokeWidth="2"
                      initial={{ r: 18, opacity: 0.8 }}
                      animate={{ r: 30, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                  <motion.circle
                    cx={point.x} cy={point.y} r={isActive ? 22 : 18}
                    fill={isActive ? func.color : `rgba(${func.colorRgb}, 0.15)`}
                    stroke={func.color} strokeWidth={isActive ? 3 : 2}
                    style={{ cursor: 'pointer' }}
                    filter={isActive ? 'url(#fedGlow)' : undefined}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: index * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
                    whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handleToggle(func.id)}
                  />
                  <motion.text
                    x={point.x} y={point.y + 5} textAnchor="middle" fontSize="16"
                    style={{ cursor: 'pointer', pointerEvents: 'none' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.12 + 0.15 }}
                  >
                    {func.icon}
                  </motion.text>
                  {func.shortLabel.split('\n').map((line, lineIndex) => (
                    <text
                      key={lineIndex} x={labelPoint.x} y={labelPoint.y + lineIndex * 13}
                      textAnchor="middle" fontSize="11"
                      fill={isActive ? func.color : 'var(--color-text-secondary)'}
                      fontWeight={isActive ? 600 : 400}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleToggle(func.id)}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Quick select buttons */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
        {fedFunctions.map((func) => (
          <motion.button
            key={func.id}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => handleToggle(func.id)}
            style={{
              padding: '8px 14px', borderRadius: '10px', cursor: 'pointer',
              border: activeId === func.id ? `2px solid rgba(${func.colorRgb}, 0.5)` : '2px solid transparent',
              backgroundColor: activeId === func.id ? `rgba(${func.colorRgb}, 0.12)` : 'var(--color-surface-1)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <span style={{ fontSize: '14px' }}>{func.icon}</span>
            <span style={{
              fontSize: '12px',
              fontWeight: activeId === func.id ? 600 : 400,
              color: activeId === func.id ? func.color : 'var(--color-text-secondary)',
            }}>
              {func.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        {activeData ? (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div style={{
              padding: '24px', borderRadius: '16px',
              backgroundColor: `rgba(${activeData.colorRgb}, 0.08)`,
              border: `2px solid rgba(${activeData.colorRgb}, 0.2)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  backgroundColor: activeData.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                }}>
                  {activeData.icon}
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 600, color: activeData.color, margin: 0 }}>
                  {activeData.name}
                </h4>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.7' }}>
                {activeData.description}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}
          >
            Click any vertex or button above to learn more about each function
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
