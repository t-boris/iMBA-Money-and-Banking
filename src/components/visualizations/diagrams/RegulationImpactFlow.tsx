'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

type RegulationType = 'glass-steagall' | 'riegle-neal' | 'gramm-leach-bliley';

interface Regulation {
  id: RegulationType;
  name: string;
  year: number;
  before: {
    title: string;
    description: string;
  };
  after: {
    title: string;
    description: string;
  };
  impact: {
    positive: string[];
    negative: string[];
  };
}

const regulations: Regulation[] = [
  {
    id: 'glass-steagall',
    name: 'Glass-Steagall Act',
    year: 1933,
    before: {
      title: 'Banking Chaos',
      description: 'Banks combined commercial and investment activities. Risky speculation led to failures.',
    },
    after: {
      title: 'Strict Separation',
      description: 'Commercial banks and investment banks completely separated. FDIC created.',
    },
    impact: {
      positive: [
        'Restored public confidence',
        'FDIC protected depositors',
        'Reduced speculation with deposits',
        'Stable banking for 60+ years',
      ],
      negative: [
        'Reduced economies of scope',
        'US banks less competitive globally',
        'Fragmented financial services',
      ],
    },
  },
  {
    id: 'riegle-neal',
    name: 'Riegle-Neal Act',
    year: 1994,
    before: {
      title: 'State-Bound Banks',
      description: 'Banks could only operate within single states. Geographic fragmentation.',
    },
    after: {
      title: 'Nationwide Banking',
      description: 'Banks can branch and acquire across state lines. National bank networks emerge.',
    },
    impact: {
      positive: [
        'Economies of scale',
        'Diversified loan portfolios',
        'Better service for national businesses',
        'Increased competition',
      ],
      negative: [
        'Bank consolidation wave',
        'Fewer community banks',
        'Too-big-to-fail concerns emerge',
      ],
    },
  },
  {
    id: 'gramm-leach-bliley',
    name: 'Gramm-Leach-Bliley Act',
    year: 1999,
    before: {
      title: 'Separated Activities',
      description: 'Glass-Steagall barriers kept commercial banking, investment banking, and insurance separate.',
    },
    after: {
      title: 'Financial Supermarkets',
      description: 'Financial Holding Companies can offer banking, securities, and insurance under one roof.',
    },
    impact: {
      positive: [
        'One-stop financial shopping',
        'Economies of scope',
        'US banks competitive globally',
        'Product innovation',
      ],
      negative: [
        'Increased systemic risk',
        'Conflicts of interest',
        'Complex organizations hard to regulate',
        'Contributed to 2008 crisis',
      ],
    },
  },
];

interface RegulationImpactFlowProps {
  className?: string;
}

export function RegulationImpactFlow({ className }: RegulationImpactFlowProps) {
  const [activeReg, setActiveReg] = useState<RegulationType>('glass-steagall');
  const [showAfter, setShowAfter] = useState(true);

  const currentReg = regulations.find((r) => r.id === activeReg)!;

  const getRegColor = (id: RegulationType) => {
    switch (id) {
      case 'glass-steagall':
        return { primary: 'rgb(245, 158, 11)', bg: 'rgba(245, 158, 11, 0.15)' }; // amber
      case 'riegle-neal':
        return { primary: 'rgb(16, 185, 129)', bg: 'rgba(16, 185, 129, 0.15)' }; // emerald
      case 'gramm-leach-bliley':
        return { primary: 'rgb(99, 102, 241)', bg: 'rgba(99, 102, 241, 0.15)' }; // indigo
    }
  };

  const color = getRegColor(activeReg);

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
          How Regulation Shaped Modern Banking
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Three pivotal laws that transformed the US banking industry
        </p>
      </div>

      {/* Timeline */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '15%',
            right: '15%',
            height: '2px',
            backgroundColor: 'var(--color-surface-2)',
            transform: 'translateY(-50%)',
            zIndex: 0,
          }}
        />
        {regulations.map((reg) => {
          const regColor = getRegColor(reg.id);
          const isActive = reg.id === activeReg;
          return (
            <motion.button
              key={reg.id}
              onClick={() => setActiveReg(reg.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '12px 16px',
                backgroundColor: isActive ? regColor.bg : 'var(--color-surface-1)',
                border: isActive ? `2px solid ${regColor.primary}` : '2px solid var(--color-surface-2)',
                borderRadius: '12px',
                cursor: 'pointer',
                minWidth: '140px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isActive ? regColor.primary : 'var(--color-text-secondary)',
                }}
              >
                {reg.name.split(' ')[0]}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: isActive ? regColor.primary : 'var(--color-text-muted)',
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {reg.year}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Before/After Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '8px',
            padding: '4px',
            border: '1px solid var(--color-surface-2)',
          }}
        >
          <button
            onClick={() => setShowAfter(false)}
            style={{
              padding: '8px 20px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              backgroundColor: !showAfter ? color.bg : 'transparent',
              color: !showAfter ? color.primary : 'var(--color-text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Before
          </button>
          <button
            onClick={() => setShowAfter(true)}
            style={{
              padding: '8px 20px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              backgroundColor: showAfter ? color.bg : 'transparent',
              color: showAfter ? color.primary : 'var(--color-text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            After
          </button>
        </div>
      </div>

      {/* Visualization Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeReg}-${showAfter}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            border: `2px solid ${color.primary}`,
            marginBottom: '20px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: color.bg,
                color: color.primary,
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            >
              {showAfter ? currentReg.after.title : currentReg.before.title}
            </span>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
                maxWidth: '500px',
                margin: '8px auto 0',
              }}
            >
              {showAfter ? currentReg.after.description : currentReg.before.description}
            </p>
          </div>

          {/* Visual Diagram based on regulation */}
          {activeReg === 'glass-steagall' && (
            <GlassSteagallDiagram showAfter={showAfter} color={color} />
          )}
          {activeReg === 'riegle-neal' && (
            <RiegleNealDiagram showAfter={showAfter} color={color} />
          )}
          {activeReg === 'gramm-leach-bliley' && (
            <GrammLeachBlileyDiagram showAfter={showAfter} color={color} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Impact Panel */}
      <motion.div
        key={activeReg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        {/* Positive Impacts */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <span style={{ fontSize: '16px' }}>+</span>
            <span style={{ fontWeight: 600, color: 'rgb(16, 185, 129)', fontSize: '14px' }}>
              Benefits
            </span>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '16px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.8',
            }}
          >
            {currentReg.impact.positive.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Negative Impacts */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <span style={{ fontSize: '16px' }}>-</span>
            <span style={{ fontWeight: 600, color: 'rgb(239, 68, 68)', fontSize: '14px' }}>
              Drawbacks
            </span>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '16px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.8',
            }}
          >
            {currentReg.impact.negative.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Footer */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Select a regulation and toggle between before/after to see the impact
      </p>
    </div>
  );
}

// Sub-components for each regulation's visual diagram

interface DiagramProps {
  showAfter: boolean;
  color: { primary: string; bg: string };
}

function GlassSteagallDiagram({ showAfter, color }: DiagramProps) {
  if (!showAfter) {
    // Before: Single chaotic bank doing everything
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          style={{
            padding: '20px 32px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            borderRadius: '12px',
            border: '2px solid rgb(239, 68, 68)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏦</div>
          <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
            Universal Bank
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Does everything - risky!
          </div>
        </motion.div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Deposits', 'Loans', 'Securities', 'Speculation'].map((activity, i) => (
            <motion.div
              key={activity}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '8px 14px',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
              }}
            >
              {activity}
            </motion.div>
          ))}
        </div>

        <div
          style={{
            marginTop: '8px',
            padding: '10px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px dashed rgb(239, 68, 68)',
          }}
        >
          <span style={{ fontSize: '12px', color: 'rgb(239, 68, 68)' }}>
            Bank runs and failures during Great Depression
          </span>
        </div>
      </div>
    );
  }

  // After: Separated banks
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          padding: '20px',
          backgroundColor: color.bg,
          borderRadius: '12px',
          border: `2px solid ${color.primary}`,
          textAlign: 'center',
          minWidth: '160px',
        }}
      >
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏦</div>
        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          Commercial Bank
        </div>
        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
          FDIC Insured
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['Deposits', 'Loans'].map((item) => (
            <span
              key={item}
              style={{
                padding: '4px 8px',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '4px',
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      <div
        style={{
          width: '2px',
          height: '100px',
          backgroundColor: color.primary,
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--color-surface-1)',
            padding: '4px 8px',
            fontSize: '10px',
            fontWeight: 600,
            color: color.primary,
            whiteSpace: 'nowrap',
          }}
        >
          Wall
        </span>
      </div>

      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          padding: '20px',
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          borderRadius: '12px',
          border: '2px solid rgb(139, 92, 246)',
          textAlign: 'center',
          minWidth: '160px',
        }}
      >
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>📈</div>
        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          Investment Bank
        </div>
        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
          No deposit insurance
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['Securities', 'Underwriting'].map((item) => (
            <span
              key={item}
              style={{
                padding: '4px 8px',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '4px',
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function RiegleNealDiagram({ showAfter, color }: DiagramProps) {
  const states = ['CA', 'TX', 'NY', 'FL', 'IL'];

  if (!showAfter) {
    // Before: Banks stuck in single states
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {states.map((state, i) => (
            <motion.div
              key={state}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '8px',
                border: '2px dashed var(--color-text-muted)',
                textAlign: 'center',
                minWidth: '80px',
              }}
            >
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                {state}
              </div>
              <div style={{ fontSize: '20px' }}>🏦</div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Local Bank
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            marginTop: '8px',
            padding: '10px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px dashed rgb(239, 68, 68)',
          }}
        >
          <span style={{ fontSize: '12px', color: 'rgb(239, 68, 68)' }}>
            State borders prevent expansion
          </span>
        </div>
      </div>
    );
  }

  // After: Banks can span states
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        style={{
          padding: '20px 32px',
          backgroundColor: color.bg,
          borderRadius: '12px',
          border: `2px solid ${color.primary}`,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏛️</div>
        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          National Bank
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          Operates across all states
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {states.map((state, i) => (
          <motion.div
            key={state}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ width: '2px', height: '20px', backgroundColor: color.primary }} />
            <div
              style={{
                padding: '8px 12px',
                backgroundColor: color.bg,
                borderRadius: '6px',
                border: `1px solid ${color.primary}`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 500, color: color.primary }}>{state}</div>
              <div style={{ fontSize: '16px' }}>🏦</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        style={{
          marginTop: '4px',
          padding: '10px 16px',
          backgroundColor: color.bg,
          borderRadius: '8px',
        }}
      >
        <span style={{ fontSize: '12px', color: color.primary }}>
          Interstate branching and acquisitions allowed
        </span>
      </div>
    </div>
  );
}

function GrammLeachBlileyDiagram({ showAfter, color }: DiagramProps) {
  if (!showAfter) {
    // Before: Separated entities (same as Glass-Steagall after)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '24px' }}>
        {[
          { icon: '🏦', name: 'Commercial Bank', items: ['Deposits', 'Loans'] },
          { icon: '📈', name: 'Investment Bank', items: ['Securities', 'Trading'] },
          { icon: '🛡️', name: 'Insurance Co.', items: ['Life', 'Property'] },
        ].map((entity, i) => (
          <motion.div
            key={entity.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-surface-2)',
              borderRadius: '10px',
              border: '2px dashed var(--color-text-muted)',
              textAlign: 'center',
              minWidth: '120px',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>{entity.icon}</div>
            <div
              style={{
                fontWeight: 600,
                fontSize: '12px',
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}
            >
              {entity.name}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {entity.items.map((item) => (
                <span
                  key={item}
                  style={{
                    padding: '3px 6px',
                    backgroundColor: 'var(--color-surface-1)',
                    borderRadius: '4px',
                    fontSize: '10px',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // After: Financial Holding Company
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        style={{
          padding: '20px 32px',
          backgroundColor: color.bg,
          borderRadius: '12px',
          border: `2px solid ${color.primary}`,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏛️</div>
        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          Financial Holding Company
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          One-stop financial supermarket
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: '12px' }}>
        {[
          { icon: '🏦', name: 'Banking', color: 'rgb(245, 158, 11)' },
          { icon: '📈', name: 'Securities', color: 'rgb(139, 92, 246)' },
          { icon: '🛡️', name: 'Insurance', color: 'rgb(16, 185, 129)' },
        ].map((sub, i) => (
          <motion.div
            key={sub.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ width: '2px', height: '20px', backgroundColor: color.primary }} />
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: `${sub.color}15`,
                borderRadius: '8px',
                border: `1px solid ${sub.color}`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{sub.icon}</div>
              <div style={{ fontSize: '11px', fontWeight: 500, color: sub.color }}>{sub.name}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        style={{
          marginTop: '4px',
          padding: '10px 16px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '8px',
          border: '1px dashed rgb(239, 68, 68)',
        }}
      >
        <span style={{ fontSize: '12px', color: 'rgb(239, 68, 68)' }}>
          Increased systemic risk - entities interconnected
        </span>
      </div>
    </div>
  );
}
