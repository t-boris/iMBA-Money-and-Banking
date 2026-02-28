'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/visualizations';

const COLORS = {
  base: '#6366f1',
  inflation: '#f59e0b',
  output: '#10b981',
  negative: '#ef4444',
  kRule: '#8b5cf6',
} as const;

export default function TaylorRuleCalculator() {
  // Slider state
  const [currentInflation, setCurrentInflation] = useState(3);
  const [targetInflation, setTargetInflation] = useState(2);
  const [realGDP, setRealGDP] = useState(2.5);
  const [potentialGDP, setPotentialGDP] = useState(2);
  const [equilibriumRate, setEquilibriumRate] = useState(2);

  // Computed values
  const calculations = useMemo(() => {
    const inflationGap = currentInflation - targetInflation;
    const outputGap = realGDP - potentialGDP;

    const base = equilibriumRate + currentInflation;
    const inflationAdjustment = 0.5 * inflationGap;
    const outputAdjustment = 0.5 * outputGap;
    const taylorRate = base + inflationAdjustment + outputAdjustment;

    // K-rule reference: money growth = real GDP growth + target inflation
    // Implied rate approximation using quantity theory
    const kRuleRate = potentialGDP + targetInflation;

    return {
      inflationGap,
      outputGap,
      base,
      inflationAdjustment,
      outputAdjustment,
      taylorRate,
      kRuleRate,
    };
  }, [currentInflation, targetInflation, realGDP, potentialGDP, equilibriumRate]);

  // Stacked bar segments
  const segments = useMemo(() => {
    const result: Array<{
      label: string;
      value: number;
      color: string;
      description: string;
    }> = [];

    result.push({
      label: 'Base (r* + π)',
      value: calculations.base,
      color: COLORS.base,
      description: `r* (${equilibriumRate}%) + π (${currentInflation}%)`,
    });

    result.push({
      label: 'Inflation adj.',
      value: calculations.inflationAdjustment,
      color: calculations.inflationAdjustment >= 0 ? COLORS.inflation : COLORS.negative,
      description: `0.5 x (${currentInflation}% - ${targetInflation}%)`,
    });

    result.push({
      label: 'Output adj.',
      value: calculations.outputAdjustment,
      color: calculations.outputAdjustment >= 0 ? COLORS.output : COLORS.negative,
      description: `0.5 x (${realGDP}% - ${potentialGDP}%)`,
    });

    return result;
  }, [calculations, equilibriumRate, currentInflation, targetInflation, realGDP, potentialGDP]);

  // For the stacked bar, we need to handle positive/negative segments
  const barData = useMemo(() => {
    // Sum of positive segments determines the bar width scaling
    const positiveSum = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
    const negativeSum = segments.reduce((sum, s) => sum + Math.min(0, s.value), 0);
    const maxExtent = Math.max(positiveSum, Math.abs(negativeSum), 1);
    // Scale factor: the bar area represents 0 to max range
    const totalRange = Math.max(Math.abs(calculations.taylorRate), calculations.kRuleRate, 12);

    return { positiveSum, negativeSum, maxExtent, totalRange };
  }, [segments, calculations]);

  // Interpretation text
  const interpretation = useMemo(() => {
    const inflationDiff = Math.abs(calculations.inflationGap);
    const inflationDirection = calculations.inflationGap > 0 ? 'above' : calculations.inflationGap < 0 ? 'below' : 'at';
    const outputDiff = Math.abs(calculations.outputGap);
    const outputDirection = calculations.outputGap > 0 ? 'positive' : calculations.outputGap < 0 ? 'negative' : 'zero';

    let message = `The Taylor Rule suggests a federal funds rate of ${calculations.taylorRate.toFixed(2)}%.`;

    if (calculations.inflationGap !== 0) {
      message += ` Current inflation is ${inflationDiff.toFixed(2)}pp ${inflationDirection} the target.`;
    } else {
      message += ' Current inflation is exactly at the target.';
    }

    if (calculations.outputGap !== 0) {
      message += ` The output gap is ${outputDirection} at ${outputDiff.toFixed(2)}pp.`;
    } else {
      message += ' The output gap is zero.';
    }

    if (calculations.taylorRate > calculations.kRuleRate + 0.5) {
      message += ' The Taylor Rule recommends a rate above the K-rule baseline, suggesting tighter monetary policy is needed.';
    } else if (calculations.taylorRate < calculations.kRuleRate - 0.5) {
      message += ' The Taylor Rule recommends a rate below the K-rule baseline, suggesting more accommodative policy.';
    }

    return message;
  }, [calculations]);

  return (
    <div
      className={cn('w-full')}
      style={{ maxWidth: '920px', margin: '0 auto' }}
    >
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
          Taylor Rule Calculator
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          Explore how the Taylor Rule prescribes interest rates based on inflation and the output gap
        </p>
      </div>

      {/* Formula Display */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            fontWeight: 500,
          }}
        >
          Taylor Rule Formula
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'baseline',
            gap: '6px',
            fontSize: '20px',
            lineHeight: '2',
          }}
        >
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontStyle: 'italic' }}>i</span>
          <span style={{ color: 'var(--color-text-muted)' }}>=</span>
          <span
            style={{
              color: COLORS.base,
              fontWeight: 600,
              fontStyle: 'italic',
              backgroundColor: `${COLORS.base}15`,
              padding: '2px 10px',
              borderRadius: '6px',
            }}
          >
            r*
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>+</span>
          <span
            style={{
              color: COLORS.base,
              fontWeight: 600,
              fontStyle: 'italic',
              backgroundColor: `${COLORS.base}15`,
              padding: '2px 10px',
              borderRadius: '6px',
            }}
          >
            π
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>+</span>
          <span
            style={{
              color: COLORS.inflation,
              fontWeight: 600,
              backgroundColor: `${COLORS.inflation}15`,
              padding: '2px 10px',
              borderRadius: '6px',
            }}
          >
            0.5(<span style={{ fontStyle: 'italic' }}>π</span> − <span style={{ fontStyle: 'italic' }}>π*</span>)
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>+</span>
          <span
            style={{
              color: COLORS.output,
              fontWeight: 600,
              backgroundColor: `${COLORS.output}15`,
              padding: '2px 10px',
              borderRadius: '6px',
            }}
          >
            0.5(<span style={{ fontStyle: 'italic' }}>y</span> − <span style={{ fontStyle: 'italic' }}>y*</span>)
          </span>
        </div>
      </motion.div>

      {/* Main Content: Sliders and Results */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        {/* Left: Sliders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-surface-1)',
            border: '1px solid var(--color-surface-2)',
          }}
        >
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '20px',
            }}
          >
            Input Parameters
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Slider
              label="Current Inflation (π)"
              value={currentInflation}
              onChange={setCurrentInflation}
              min={0}
              max={10}
              step={0.25}
              unit="%"
            />
            <Slider
              label="Target Inflation (π*)"
              value={targetInflation}
              onChange={setTargetInflation}
              min={0}
              max={4}
              step={0.25}
              unit="%"
            />
            <Slider
              label="Real GDP Growth (y)"
              value={realGDP}
              onChange={setRealGDP}
              min={-4}
              max={8}
              step={0.25}
              unit="%"
            />
            <Slider
              label="Potential GDP Growth (y*)"
              value={potentialGDP}
              onChange={setPotentialGDP}
              min={0}
              max={5}
              step={0.25}
              unit="%"
            />
            <Slider
              label="Equilibrium Real Rate (r*)"
              value={equilibriumRate}
              onChange={setEquilibriumRate}
              min={0}
              max={5}
              step={0.25}
              unit="%"
            />
          </div>
        </motion.div>

        {/* Right: Component Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-surface-1)',
            border: '1px solid var(--color-surface-2)',
          }}
        >
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '20px',
            }}
          >
            Rate Decomposition
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Base component */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                backgroundColor: `${COLORS.base}12`,
                borderRadius: '10px',
                border: `1px solid ${COLORS.base}30`,
              }}
            >
              <div>
                <span style={{ fontSize: '14px', color: COLORS.base, fontWeight: 600 }}>
                  Base
                </span>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    marginTop: '2px',
                  }}
                >
                  r* ({equilibriumRate}%) + π ({currentInflation}%)
                </div>
              </div>
              <motion.span
                key={calculations.base}
                initial={{ scale: 1.1, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: COLORS.base,
                  fontFamily: 'monospace',
                }}
              >
                {calculations.base.toFixed(2)}%
              </motion.span>
            </div>

            {/* Inflation adjustment */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                backgroundColor:
                  calculations.inflationAdjustment >= 0
                    ? `${COLORS.inflation}12`
                    : `${COLORS.negative}12`,
                borderRadius: '10px',
                border: `1px solid ${
                  calculations.inflationAdjustment >= 0
                    ? `${COLORS.inflation}30`
                    : `${COLORS.negative}30`
                }`,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '14px',
                    color:
                      calculations.inflationAdjustment >= 0 ? COLORS.inflation : COLORS.negative,
                    fontWeight: 600,
                  }}
                >
                  Inflation Adj.
                </span>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    marginTop: '2px',
                  }}
                >
                  0.5 x ({currentInflation}% - {targetInflation}%)
                </div>
              </div>
              <motion.span
                key={calculations.inflationAdjustment}
                initial={{ scale: 1.1, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color:
                    calculations.inflationAdjustment >= 0 ? COLORS.inflation : COLORS.negative,
                  fontFamily: 'monospace',
                }}
              >
                {calculations.inflationAdjustment >= 0 ? '+' : ''}
                {calculations.inflationAdjustment.toFixed(2)}%
              </motion.span>
            </div>

            {/* Output gap adjustment */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                backgroundColor:
                  calculations.outputAdjustment >= 0
                    ? `${COLORS.output}12`
                    : `${COLORS.negative}12`,
                borderRadius: '10px',
                border: `1px solid ${
                  calculations.outputAdjustment >= 0
                    ? `${COLORS.output}30`
                    : `${COLORS.negative}30`
                }`,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '14px',
                    color: calculations.outputAdjustment >= 0 ? COLORS.output : COLORS.negative,
                    fontWeight: 600,
                  }}
                >
                  Output Gap Adj.
                </span>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    marginTop: '2px',
                  }}
                >
                  0.5 x ({realGDP}% - {potentialGDP}%)
                </div>
              </div>
              <motion.span
                key={calculations.outputAdjustment}
                initial={{ scale: 1.1, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: calculations.outputAdjustment >= 0 ? COLORS.output : COLORS.negative,
                  fontFamily: 'monospace',
                }}
              >
                {calculations.outputAdjustment >= 0 ? '+' : ''}
                {calculations.outputAdjustment.toFixed(2)}%
              </motion.span>
            </div>

            {/* Divider */}
            <div
              style={{
                height: '2px',
                backgroundColor: 'var(--color-surface-2)',
                margin: '4px 0',
              }}
            />

            {/* Result */}
            <motion.div
              key={calculations.taylorRate}
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: 'var(--color-primary-500)',
                borderRadius: '10px',
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                Taylor Rule Rate
              </span>
              <motion.span
                key={calculations.taylorRate}
                initial={{ scale: 1.15, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'white',
                  fontFamily: 'monospace',
                }}
              >
                {calculations.taylorRate.toFixed(2)}%
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stacked Bar Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '24px',
        }}
      >
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Rate Composition
        </h4>

        {/* Horizontal stacked bar */}
        <div style={{ marginBottom: '16px' }}>
          {/* Scale label */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
            }}
          >
            <span>0%</span>
            <span>{barData.totalRange.toFixed(0)}%</span>
          </div>

          {/* Bar container */}
          <div
            style={{
              position: 'relative',
              height: '48px',
              backgroundColor: 'var(--color-surface-2)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {/* Positive segments stacked horizontally */}
            {(() => {
              let cumulativeWidth = 0;
              return segments.map((segment, index) => {
                const segmentWidth =
                  barData.totalRange > 0
                    ? (Math.abs(segment.value) / barData.totalRange) * 100
                    : 0;
                const left = cumulativeWidth;
                // Only advance the cursor for positive contributions
                if (segment.value >= 0) {
                  cumulativeWidth += segmentWidth;
                } else {
                  // For negative, pull back from total
                  cumulativeWidth -= segmentWidth;
                }
                const isNegative = segment.value < 0;
                return (
                  <motion.div
                    key={segment.label}
                    initial={{ width: 0, left: `${left}%` }}
                    animate={{
                      width: `${segmentWidth}%`,
                      left: isNegative
                        ? `${Math.max(0, left - segmentWidth)}%`
                        : `${left}%`,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 25,
                      delay: index * 0.05,
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      height: '100%',
                      backgroundColor: segment.color,
                      opacity: isNegative ? 0.6 : 0.85,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderRight:
                        index < segments.length - 1 && !isNegative
                          ? '2px solid rgba(255,255,255,0.3)'
                          : 'none',
                      ...(isNegative
                        ? {
                            backgroundImage:
                              'repeating-linear-gradient(135deg, transparent, transparent 4px, rgba(255,255,255,0.15) 4px, rgba(255,255,255,0.15) 8px)',
                          }
                        : {}),
                    }}
                  >
                    {segmentWidth > 8 && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'white',
                          whiteSpace: 'nowrap',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        }}
                      >
                        {segment.value >= 0 ? '+' : ''}
                        {segment.value.toFixed(1)}%
                      </span>
                    )}
                  </motion.div>
                );
              });
            })()}

            {/* K-rule reference line */}
            {calculations.kRuleRate > 0 && barData.totalRange > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${(calculations.kRuleRate / barData.totalRange) * 100}%`,
                  width: '2px',
                  backgroundColor: COLORS.kRule,
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: COLORS.kRule,
                    whiteSpace: 'nowrap',
                    backgroundColor: 'var(--color-surface-1)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: `1px solid ${COLORS.kRule}40`,
                  }}
                >
                  K-rule: {calculations.kRuleRate.toFixed(1)}%
                </div>
              </motion.div>
            )}

            {/* Taylor rate marker */}
            {barData.totalRange > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${Math.max(0, Math.min(100, (calculations.taylorRate / barData.totalRange) * 100))}%`,
                  width: '3px',
                  backgroundColor: 'var(--color-text-primary)',
                  zIndex: 11,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    whiteSpace: 'nowrap',
                    backgroundColor: 'var(--color-surface-1)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid var(--color-surface-2)',
                  }}
                >
                  Taylor: {calculations.taylorRate.toFixed(1)}%
                </div>
              </motion.div>
            )}
          </div>

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '28px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: COLORS.base,
                  borderRadius: '3px',
                  opacity: 0.85,
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Base (r* + π)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: COLORS.inflation,
                  borderRadius: '3px',
                  opacity: 0.85,
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Inflation adj.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: COLORS.output,
                  borderRadius: '3px',
                  opacity: 0.85,
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Output gap adj.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '2px',
                  height: '14px',
                  backgroundColor: COLORS.kRule,
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                K-rule reference
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '3px',
                  opacity: 0.6,
                  backgroundImage:
                    'repeating-linear-gradient(135deg, #ef4444, #ef4444 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 8px)',
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Negative contribution
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* K-Rule Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          padding: '16px 20px',
          backgroundColor: `${COLORS.kRule}0a`,
          borderRadius: '12px',
          border: `1px solid ${COLORS.kRule}25`,
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: COLORS.kRule,
                marginBottom: '4px',
              }}
            >
              K-Rule Comparison
            </h4>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                lineHeight: '1.5',
              }}
            >
              Friedman&apos;s K-rule implies a fixed money growth rate of y* + π* ={' '}
              <strong>
                {potentialGDP}% + {targetInflation}% = {calculations.kRuleRate.toFixed(1)}%
              </strong>
              , regardless of current conditions. The Taylor Rule adapts to the current state of the
              economy.
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>K-rule</div>
              <motion.div
                key={calculations.kRuleRate}
                initial={{ scale: 1.1, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: COLORS.kRule,
                }}
              >
                {calculations.kRuleRate.toFixed(1)}%
              </motion.div>
            </div>
            <div
              style={{
                fontSize: '16px',
                color: 'var(--color-text-muted)',
              }}
            >
              vs
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Taylor</div>
              <motion.div
                key={calculations.taylorRate}
                initial={{ scale: 1.1, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: 'var(--color-primary-500)',
                }}
              >
                {calculations.taylorRate.toFixed(1)}%
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interpretation */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(99, 102, 241, 0.06)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.15)',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          Interpretation
        </h4>
        <AnimatePresence mode="wait">
          <motion.p
            key={interpretation}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              margin: 0,
              lineHeight: '1.7',
            }}
          >
            {interpretation}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
