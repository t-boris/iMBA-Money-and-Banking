'use client';

import { useState, useMemo } from 'react';
import { motion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ScoreRange {
  min: number;
  max: number;
  label: string;
  color: string;
  bgColor: string;
}

const scoreRanges: ScoreRange[] = [
  {
    min: 300,
    max: 579,
    label: 'Poor',
    color: 'rgb(239, 68, 68)',
    bgColor: 'rgba(239, 68, 68, 0.15)',
  },
  {
    min: 580,
    max: 669,
    label: 'Fair',
    color: 'rgb(245, 158, 11)',
    bgColor: 'rgba(245, 158, 11, 0.15)',
  },
  {
    min: 670,
    max: 739,
    label: 'Good',
    color: 'rgb(234, 179, 8)',
    bgColor: 'rgba(234, 179, 8, 0.15)',
  },
  {
    min: 740,
    max: 799,
    label: 'Very Good',
    color: 'rgb(34, 197, 94)',
    bgColor: 'rgba(34, 197, 94, 0.15)',
  },
  {
    min: 800,
    max: 850,
    label: 'Exceptional',
    color: 'rgb(16, 185, 129)',
    bgColor: 'rgba(16, 185, 129, 0.15)',
  },
];

// PD values at specific score points for interpolation
const pdDataPoints: { score: number; pd: number }[] = [
  { score: 300, pd: 50 },
  { score: 550, pd: 35 },
  { score: 600, pd: 20 },
  { score: 650, pd: 10 },
  { score: 700, pd: 5 },
  { score: 750, pd: 2 },
  { score: 800, pd: 1 },
  { score: 850, pd: 0.5 },
];

interface FICOFactor {
  id: string;
  name: string;
  weight: string;
  icon: string;
  description: string;
}

const ficoFactors: FICOFactor[] = [
  {
    id: 'payment',
    name: 'Payment History',
    weight: '35%',
    icon: '💳',
    description: 'On-time payments vs late payments, collections, bankruptcies',
  },
  {
    id: 'utilization',
    name: 'Credit Utilization',
    weight: '30%',
    icon: '📊',
    description: 'Amount owed relative to credit limits (keep under 30%)',
  },
  {
    id: 'length',
    name: 'Length of History',
    weight: '15%',
    icon: '📅',
    description: 'Average age of accounts and oldest account age',
  },
  {
    id: 'newcredit',
    name: 'New Credit',
    weight: '10%',
    icon: '🆕',
    description: 'Recent credit inquiries and newly opened accounts',
  },
  {
    id: 'mix',
    name: 'Credit Mix',
    weight: '10%',
    icon: '🔀',
    description: 'Variety of credit types (cards, loans, mortgage)',
  },
];

interface FICOScoreScaleProps {
  className?: string;
}

export function FICOScoreScale({ className }: FICOScoreScaleProps) {
  const [score, setScore] = useState(700);
  const [showFactors, setShowFactors] = useState(false);

  // Get current range based on score
  const currentRange = useMemo(() => {
    return scoreRanges.find((r) => score >= r.min && score <= r.max) || scoreRanges[0];
  }, [score]);

  // Calculate PD using linear interpolation
  const probabilityOfDefault = useMemo(() => {
    // Find the two data points we're between
    let lower = pdDataPoints[0];
    let upper = pdDataPoints[pdDataPoints.length - 1];

    for (let i = 0; i < pdDataPoints.length - 1; i++) {
      if (score >= pdDataPoints[i].score && score <= pdDataPoints[i + 1].score) {
        lower = pdDataPoints[i];
        upper = pdDataPoints[i + 1];
        break;
      }
    }

    // Linear interpolation
    const ratio = (score - lower.score) / (upper.score - lower.score || 1);
    const pd = lower.pd + ratio * (upper.pd - lower.pd);
    return Math.max(0.5, Math.min(50, pd));
  }, [score]);

  // Interest rate impact (simplified model)
  const rateImpact = useMemo(() => {
    if (score >= 800) return 'Best rates available';
    if (score >= 740) return 'Excellent rates';
    if (score >= 670) return '+0.5-1.0% above best';
    if (score >= 580) return '+1.5-3.0% above best';
    return '+4.0%+ or may not qualify';
  }, [score]);

  // Approval likelihood
  const approvalLikelihood = useMemo(() => {
    if (score >= 800) return { text: 'Very High', color: 'rgb(16, 185, 129)' };
    if (score >= 740) return { text: 'High', color: 'rgb(34, 197, 94)' };
    if (score >= 670) return { text: 'Moderate', color: 'rgb(234, 179, 8)' };
    if (score >= 580) return { text: 'Limited', color: 'rgb(245, 158, 11)' };
    return { text: 'Low', color: 'rgb(239, 68, 68)' };
  }, [score]);

  // Calculate position percentage for slider
  const sliderPosition = ((score - 300) / (850 - 300)) * 100;

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
          FICO Score Scale & Default Probability
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          How credit scores translate to lending risk and interest rates
        </p>
      </div>

      {/* Main Score Display */}
      <motion.div
        style={{
          padding: '24px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: `2px solid ${currentRange.color}`,
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        {/* Score Value */}
        <motion.div
          key={score}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: currentRange.color,
            marginBottom: '8px',
            lineHeight: 1,
          }}
        >
          {score}
        </motion.div>

        {/* Rating Category */}
        <motion.div
          key={currentRange.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-block',
            padding: '8px 20px',
            backgroundColor: currentRange.bgColor,
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: 600,
            color: currentRange.color,
            marginBottom: '16px',
          }}
        >
          {currentRange.label}
        </motion.div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          {/* PD */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-surface-2)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}
            >
              Probability of Default
            </div>
            <motion.div
              key={probabilityOfDefault}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: '24px', fontWeight: 700, color: currentRange.color }}
            >
              ~{probabilityOfDefault.toFixed(1)}%
            </motion.div>
          </div>

          {/* Rate Impact */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-surface-2)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}
            >
              Interest Rate Impact
            </div>
            <motion.div
              key={rateImpact}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}
            >
              {rateImpact}
            </motion.div>
          </div>

          {/* Approval */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-surface-2)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}
            >
              Approval Likelihood
            </div>
            <motion.div
              key={approvalLikelihood.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: '20px', fontWeight: 700, color: approvalLikelihood.color }}
            >
              {approvalLikelihood.text}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Score Scale with Slider */}
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '20px',
        }}
      >
        {/* Range Labels */}
        <div
          style={{
            display: 'flex',
            marginBottom: '8px',
          }}
        >
          {scoreRanges.map((range) => {
            const width = ((range.max - range.min + 1) / (850 - 300 + 1)) * 100;
            return (
              <div
                key={range.label}
                style={{
                  width: `${width}%`,
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: range.color,
                  }}
                >
                  {range.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Gradient Scale Bar */}
        <div
          style={{
            position: 'relative',
            height: '24px',
            borderRadius: '12px',
            background:
              'linear-gradient(to right, rgb(239, 68, 68), rgb(245, 158, 11), rgb(234, 179, 8), rgb(34, 197, 94), rgb(16, 185, 129))',
            marginBottom: '8px',
          }}
        >
          {/* Current Score Indicator */}
          <motion.div
            animate={{ left: `${sliderPosition}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'absolute',
              top: '-8px',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '40px',
                backgroundColor: 'var(--color-text-primary)',
                borderRadius: '2px',
              }}
            />
            {/* Pulsing indicator */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              style={{
                position: 'absolute',
                top: '8px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: currentRange.color,
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            />
          </motion.div>
        </div>

        {/* Score Range Labels */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            marginBottom: '16px',
          }}
        >
          <span>300</span>
          <span>580</span>
          <span>670</span>
          <span>740</span>
          <span>800</span>
          <span>850</span>
        </div>

        {/* Slider Input */}
        <div style={{ padding: '0 8px' }}>
          <input
            type="range"
            min={300}
            max={850}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: 'var(--color-surface-2)',
              cursor: 'pointer',
              accentColor: currentRange.color,
            }}
          />
        </div>

        {/* PD Curve Overlay Info */}
        <div
          style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: '12px',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '12px',
            }}
          >
            Default Probability by Score
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              fontSize: '12px',
            }}
          >
            {[
              { score: 800, pd: '~1%', color: 'rgb(16, 185, 129)' },
              { score: 750, pd: '~2%', color: 'rgb(34, 197, 94)' },
              { score: 700, pd: '~5%', color: 'rgb(234, 179, 8)' },
              { score: 650, pd: '~10%', color: 'rgb(245, 158, 11)' },
              { score: 600, pd: '~20%', color: 'rgb(245, 158, 11)' },
              { score: 550, pd: '~35%', color: 'rgb(239, 68, 68)' },
              { score: 500, pd: '~45%', color: 'rgb(239, 68, 68)' },
              { score: '<500', pd: '>50%', color: 'rgb(239, 68, 68)' },
            ].map((item) => (
              <div
                key={String(item.score)}
                style={{
                  padding: '8px',
                  backgroundColor: 'var(--color-surface-1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: 'var(--color-text-muted)', marginBottom: '2px' }}>
                  {item.score}+
                </div>
                <div style={{ fontWeight: 600, color: item.color }}>{item.pd}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FICO Factors Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowFactors(!showFactors)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: showFactors
              ? '2px solid rgb(99, 102, 241)'
              : '1px solid var(--color-surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>📝</span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: showFactors ? 'rgb(99, 102, 241)' : 'var(--color-text-primary)',
              }}
            >
              What Affects Your FICO Score?
            </span>
          </div>
          <motion.span
            animate={{ rotate: showFactors ? 180 : 0 }}
            style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
            }}
          >
            V
          </motion.span>
        </button>

        {showFactors && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                marginTop: '12px',
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: '8px',
              }}
            >
              {ficoFactors.map((factor, i) => (
                <motion.div
                  key={factor.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--color-surface-1)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-surface-2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0,
                    }}
                  >
                    {factor.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {factor.name}
                      </span>
                      <span
                        style={{
                          padding: '2px 8px',
                          backgroundColor: 'rgba(99, 102, 241, 0.15)',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'rgb(99, 102, 241)',
                        }}
                      >
                        {factor.weight}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        margin: 0,
                        lineHeight: '1.4',
                      }}
                    >
                      {factor.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* No FICO Warning */}
      <div
        style={{
          padding: '16px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '24px' }}>*</span>
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgb(239, 68, 68)',
              marginBottom: '4px',
            }}
          >
            No FICO Score = Major Warning Sign
          </div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              margin: 0,
              lineHeight: '1.5',
            }}
          >
            A borrower with no credit score may have a thin credit file (new to credit) or may be
            avoiding the credit system entirely. Lenders view this as high risk because there is no
            payment history to evaluate.
          </p>
        </div>
      </div>

      {/* Corporate Comparison */}
      <div
        style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '12px',
          }}
        >
          Corporate Rating Comparison
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px',
            fontSize: '11px',
          }}
        >
          {[
            { rating: 'AAA', pd: '0.01%', color: 'rgb(16, 185, 129)' },
            { rating: 'AA', pd: '0.02%', color: 'rgb(34, 197, 94)' },
            { rating: 'A', pd: '0.05%', color: 'rgb(234, 179, 8)' },
            { rating: 'BBB', pd: '0.20%', color: 'rgb(245, 158, 11)' },
            { rating: 'BB', pd: '1.00%', color: 'rgb(239, 68, 68)' },
          ].map((item) => (
            <div
              key={item.rating}
              style={{
                padding: '10px 8px',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontWeight: 700, color: item.color, fontSize: '14px' }}>
                {item.rating}
              </div>
              <div style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                PD: {item.pd}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            marginTop: '12px',
            textAlign: 'center',
          }}
        >
          Note: Corporate ratings have much lower default rates than consumer FICO scores
        </p>
      </div>

      {/* Footer */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Drag the slider to explore different credit scores and their implications
      </p>
    </div>
  );
}
