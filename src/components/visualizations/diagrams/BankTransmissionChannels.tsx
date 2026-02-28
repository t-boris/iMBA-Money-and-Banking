'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/visualizations';

const CHANNEL_COLORS = {
  nim: '#f59e0b',
  reserves: '#ef4444',
  deposits: '#3b82f6',
} as const;

const SPRING = { type: 'spring' as const, stiffness: 120, damping: 20 };

export default function BankTransmissionChannels() {
  // Channel 1: NIM Compression
  const [loanYield, setLoanYield] = useState(5);
  const [depositRate, setDepositRate] = useState(1.5);

  // Channel 2: Reserve Reduction
  const [fedFundsChange, setFedFundsChange] = useState(0);

  // Channel 3: Deposit Outflow
  const [rateGap, setRateGap] = useState(0);

  const nim = useMemo(() => loanYield - depositRate, [loanYield, depositRate]);

  // Reserves shrink as rate rises (QT drains reserves)
  const baseReserves = 3200; // $3.2T baseline
  const reserveReduction = useMemo(() => {
    // Each 1% hike roughly drains ~$400B in this simplified model
    return fedFundsChange * 400;
  }, [fedFundsChange]);
  const currentReserves = useMemo(
    () => Math.max(baseReserves - reserveReduction, 200),
    [reserveReduction]
  );
  const reservePct = useMemo(
    () => (currentReserves / baseReserves) * 100,
    [currentReserves]
  );

  // Deposit outflow intensity (0-100%)
  const outflowIntensity = useMemo(() => Math.min(rateGap * 25, 100), [rateGap]);

  return (
    <div
      className="w-full"
      style={{ maxWidth: '1100px', margin: '0 auto' }}
    >
      {/* Container with border */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '1px solid var(--color-surface-2)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid var(--color-surface-2)',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: '6px',
            }}
          >
            How Rate Hikes Squeeze Banks
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Three parallel channels through which rising interest rates compress bank profitability
          </p>
        </div>

        {/* Three channel cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '0',
          }}
        >
          {/* ===== Channel 1: NIM Compression ===== */}
          <div
            style={{
              padding: '24px',
              borderRight: '1px solid var(--color-surface-2)',
              borderBottom: '1px solid var(--color-surface-2)',
            }}
          >
            {/* Channel header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: `${CHANNEL_COLORS.nim}15`,
                  border: `2px solid ${CHANNEL_COLORS.nim}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={CHANNEL_COLORS.nim}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: CHANNEL_COLORS.nim,
                    margin: 0,
                  }}
                >
                  NIM Compression
                </h4>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                  }}
                >
                  Channel 1
                </span>
              </div>
            </div>

            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px' }}>
              <Slider
                label="Loan Yield"
                value={loanYield}
                onChange={setLoanYield}
                min={2}
                max={8}
                step={0.25}
                unit="%"
              />
              <Slider
                label="Deposit Rate"
                value={depositRate}
                onChange={setDepositRate}
                min={0}
                max={6}
                step={0.25}
                unit="%"
              />
            </div>

            {/* NIM Result */}
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--color-surface-2)',
                marginBottom: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                  }}
                >
                  NIM = Loan Yield - Deposit Rate
                </span>
                <motion.span
                  key={nim.toFixed(2)}
                  initial={{ scale: 1.15, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: nim > 0 ? CHANNEL_COLORS.nim : CHANNEL_COLORS.reserves,
                    fontFamily: 'monospace',
                  }}
                >
                  {nim.toFixed(2)}%
                </motion.span>
              </div>

              {/* Visual bar */}
              <div style={{ position: 'relative' }}>
                {/* Full bar (Loan yield) */}
                <div
                  style={{
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--color-surface-2)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* Loan yield portion */}
                  <motion.div
                    initial={false}
                    animate={{ width: `${(loanYield / 8) * 100}%` }}
                    transition={SPRING}
                    style={{
                      height: '100%',
                      backgroundColor: `${CHANNEL_COLORS.nim}30`,
                      borderRadius: '6px',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                    }}
                  />
                  {/* Deposit rate portion (subtracted) */}
                  <motion.div
                    initial={false}
                    animate={{ width: `${(depositRate / 8) * 100}%` }}
                    transition={SPRING}
                    style={{
                      height: '100%',
                      backgroundColor: 'var(--color-surface-2)',
                      borderRadius: '6px 0 0 6px',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                    }}
                  />
                  {/* NIM label in the margin area */}
                  {nim > 0 && (
                    <motion.div
                      initial={false}
                      animate={{
                        left: `${(depositRate / 8) * 100}%`,
                        width: `${(nim / 8) * 100}%`,
                      }}
                      transition={SPRING}
                      style={{
                        height: '100%',
                        backgroundColor: CHANNEL_COLORS.nim,
                        position: 'absolute',
                        top: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0 6px 6px 0',
                        overflow: 'hidden',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: 'white',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        NIM
                      </span>
                    </motion.div>
                  )}
                </div>
                {/* Legend */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '6px',
                  }}
                >
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                    Deposit cost
                  </span>
                  <span style={{ fontSize: '10px', color: CHANNEL_COLORS.nim, fontWeight: 600 }}>
                    Margin
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: `${CHANNEL_COLORS.nim}08`,
                border: `1px solid ${CHANNEL_COLORS.nim}25`,
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              When rates rise, deposit rates increase faster than fixed-rate loan yields can adjust,
              compressing the margin. Banks with large fixed-rate loan portfolios are especially
              vulnerable.
            </div>
          </div>

          {/* ===== Channel 2: Reserve Reduction ===== */}
          <div
            style={{
              padding: '24px',
              borderRight: '1px solid var(--color-surface-2)',
              borderBottom: '1px solid var(--color-surface-2)',
            }}
          >
            {/* Channel header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: `${CHANNEL_COLORS.reserves}15`,
                  border: `2px solid ${CHANNEL_COLORS.reserves}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={CHANNEL_COLORS.reserves}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: CHANNEL_COLORS.reserves,
                    margin: 0,
                  }}
                >
                  Reserve Reduction
                </h4>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                  }}
                >
                  Channel 2
                </span>
              </div>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: '18px' }}>
              <Slider
                label="Fed Funds Rate Change"
                value={fedFundsChange}
                onChange={setFedFundsChange}
                min={0}
                max={3}
                step={0.25}
                unit="%"
                formatValue={(v) => `+${v.toFixed(2)}%`}
              />
            </div>

            {/* Reserve level visual */}
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--color-surface-2)',
                marginBottom: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                  }}
                >
                  Banking System Reserves
                </span>
                <motion.span
                  key={currentReserves}
                  initial={{ scale: 1.15, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: CHANNEL_COLORS.reserves,
                    fontFamily: 'monospace',
                  }}
                >
                  ${currentReserves.toLocaleString()}B
                </motion.span>
              </div>

              {/* Animated reserve bar */}
              <div
                style={{
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-surface-2)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ width: `${reservePct}%` }}
                  transition={SPRING}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${CHANNEL_COLORS.reserves}, ${CHANNEL_COLORS.reserves}bb)`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {reservePct > 20 && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'white',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {reservePct.toFixed(0)}% of baseline
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Reduction indicator */}
              <AnimatePresence>
                {reserveReduction > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      marginTop: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={CHANNEL_COLORS.reserves}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: CHANNEL_COLORS.reserves,
                      }}
                    >
                      Drained ${reserveReduction.toLocaleString()}B via QT
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Causal chain */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                marginBottom: '14px',
              }}
            >
              {[
                { label: 'Fed raises rates', active: fedFundsChange > 0 },
                { label: 'Fed sells securities (QT)', active: fedFundsChange > 0 },
                { label: 'Reserves drain from banking system', active: fedFundsChange > 0.5 },
                { label: 'Tighter interbank market', active: fedFundsChange > 1 },
                { label: 'Banks lend less', active: fedFundsChange > 1.5 },
              ].map((step, idx) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{
                    opacity: step.active ? 1 : 0.4,
                    x: 0,
                  }}
                  transition={{ delay: idx * 0.05, ...SPRING }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: step.active
                      ? `${CHANNEL_COLORS.reserves}10`
                      : 'transparent',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: step.active
                        ? CHANNEL_COLORS.reserves
                        : 'var(--color-surface-2)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      color: step.active
                        ? 'var(--color-text-primary)'
                        : 'var(--color-text-muted)',
                      fontWeight: step.active ? 500 : 400,
                    }}
                  >
                    {step.label}
                  </span>
                  {idx < 4 && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={
                        step.active
                          ? CHANNEL_COLORS.reserves
                          : 'var(--color-surface-2)'
                      }
                      strokeWidth="2"
                      style={{ marginLeft: 'auto', flexShrink: 0 }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Explanation */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: `${CHANNEL_COLORS.reserves}08`,
                border: `1px solid ${CHANNEL_COLORS.reserves}25`,
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              Fewer reserves tighten the interbank market. Banks become more cautious about lending
              when their liquidity cushion shrinks, reducing credit creation across the economy.
            </div>
          </div>

          {/* ===== Channel 3: Deposit Outflow ===== */}
          <div
            style={{
              padding: '24px',
              borderBottom: '1px solid var(--color-surface-2)',
            }}
          >
            {/* Channel header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: `${CHANNEL_COLORS.deposits}15`,
                  border: `2px solid ${CHANNEL_COLORS.deposits}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={CHANNEL_COLORS.deposits}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 1l4 4-4 4" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <path d="M7 23l-4-4 4-4" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: CHANNEL_COLORS.deposits,
                    margin: 0,
                  }}
                >
                  Deposit Outflow
                </h4>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                  }}
                >
                  Channel 3
                </span>
              </div>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: '18px' }}>
              <Slider
                label="Rate Gap (Market vs Deposit)"
                value={rateGap}
                onChange={setRateGap}
                min={0}
                max={4}
                step={0.25}
                unit="%"
              />
            </div>

            {/* Flow visualization */}
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--color-surface-2)',
                marginBottom: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                {/* Bank Deposits box */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: rateGap > 0 ? 1 - rateGap * 0.04 : 1,
                  }}
                  transition={SPRING}
                  style={{
                    flex: '1',
                    padding: '14px 10px',
                    borderRadius: '10px',
                    backgroundColor: `${CHANNEL_COLORS.deposits}15`,
                    border: `2px solid ${CHANNEL_COLORS.deposits}50`,
                    textAlign: 'center',
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: CHANNEL_COLORS.deposits,
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      marginBottom: '4px',
                    }}
                  >
                    Bank Deposits
                  </div>
                  <motion.div
                    key={`dep-${rateGap}`}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {(100 - outflowIntensity).toFixed(0)}%
                  </motion.div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'var(--color-text-muted)',
                      marginTop: '2px',
                    }}
                  >
                    retained
                  </div>
                </motion.div>

                {/* Animated flow arrow */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0,
                    width: '72px',
                  }}
                >
                  <AnimatePresence>
                    {rateGap > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={SPRING}
                        style={{
                          position: 'relative',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {/* Arrow shaft */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: Math.max(4, outflowIntensity * 0.2),
                          }}
                          transition={SPRING}
                          style={{
                            width: '100%',
                            backgroundColor: CHANNEL_COLORS.deposits,
                            borderRadius: '2px',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {/* Moving particles */}
                          <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{
                              duration: Math.max(0.4, 2 - rateGap * 0.4),
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '50%',
                              height: '100%',
                              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)`,
                            }}
                          />
                        </motion.div>
                        {/* Arrowhead */}
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: '8px solid transparent',
                            borderBottom: '8px solid transparent',
                            borderLeft: `10px solid ${CHANNEL_COLORS.deposits}`,
                            flexShrink: 0,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {rateGap > 0 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        fontSize: '10px',
                        color: CHANNEL_COLORS.deposits,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {outflowIntensity.toFixed(0)}% outflow
                    </motion.span>
                  )}
                  {rateGap === 0 && (
                    <span
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      No flow
                    </span>
                  )}
                </div>

                {/* T-Bills / MMFs box */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: rateGap > 0 ? 1 + rateGap * 0.04 : 1,
                  }}
                  transition={SPRING}
                  style={{
                    flex: '1',
                    padding: '14px 10px',
                    borderRadius: '10px',
                    backgroundColor:
                      rateGap > 0
                        ? `${CHANNEL_COLORS.deposits}10`
                        : 'var(--color-surface-2)',
                    border: `2px solid ${
                      rateGap > 0
                        ? CHANNEL_COLORS.deposits
                        : 'var(--color-surface-2)'
                    }`,
                    textAlign: 'center',
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color:
                        rateGap > 0
                          ? CHANNEL_COLORS.deposits
                          : 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      marginBottom: '4px',
                    }}
                  >
                    T-Bills / MMFs
                  </div>
                  <motion.div
                    key={`tbill-${rateGap}`}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color:
                        rateGap > 0
                          ? CHANNEL_COLORS.deposits
                          : 'var(--color-text-primary)',
                    }}
                  >
                    {outflowIntensity.toFixed(0)}%
                  </motion.div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'var(--color-text-muted)',
                      marginTop: '2px',
                    }}
                  >
                    attracted
                  </div>
                </motion.div>
              </div>

              {/* Rate comparison */}
              <div
                style={{
                  marginTop: '14px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-surface-2)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'var(--color-text-muted)',
                      marginBottom: '2px',
                    }}
                  >
                    Deposit Rate
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {(3 - rateGap * 0.5).toFixed(1)}%
                  </div>
                </div>
                <div
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: rateGap > 0 ? `${CHANNEL_COLORS.deposits}10` : 'var(--color-surface-2)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'var(--color-text-muted)',
                      marginBottom: '2px',
                    }}
                  >
                    Market Rate (T-Bills)
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: rateGap > 0 ? CHANNEL_COLORS.deposits : 'var(--color-text-secondary)',
                    }}
                  >
                    {(3 - rateGap * 0.5 + rateGap).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Causal chain */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                marginBottom: '14px',
              }}
            >
              {[
                { label: 'Market rates exceed deposit rates', active: rateGap > 0 },
                { label: 'Depositors chase higher yields', active: rateGap > 0.5 },
                { label: 'Deposit flight to T-Bills / MMFs', active: rateGap > 1 },
                { label: 'Banks lose cheap funding', active: rateGap > 2 },
                { label: 'Must shrink lending or raise rates', active: rateGap > 3 },
              ].map((step, idx) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{
                    opacity: step.active ? 1 : 0.4,
                    x: 0,
                  }}
                  transition={{ delay: idx * 0.05, ...SPRING }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: step.active
                      ? `${CHANNEL_COLORS.deposits}10`
                      : 'transparent',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: step.active
                        ? CHANNEL_COLORS.deposits
                        : 'var(--color-surface-2)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      color: step.active
                        ? 'var(--color-text-primary)'
                        : 'var(--color-text-muted)',
                      fontWeight: step.active ? 500 : 400,
                    }}
                  >
                    {step.label}
                  </span>
                  {idx < 4 && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={
                        step.active
                          ? CHANNEL_COLORS.deposits
                          : 'var(--color-surface-2)'
                      }
                      strokeWidth="2"
                      style={{ marginLeft: 'auto', flexShrink: 0 }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Explanation */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: `${CHANNEL_COLORS.deposits}08`,
                border: `1px solid ${CHANNEL_COLORS.deposits}25`,
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              Deposit flight forces banks to replace cheap deposit funding with expensive wholesale
              borrowing, or shrink their balance sheet by reducing lending. This was a key dynamic in
              the 2023 bank stress.
            </div>
          </div>
        </div>

        {/* Bottom insight */}
        <div
          style={{
            padding: '18px 28px',
            backgroundColor: 'var(--color-surface-0)',
            borderTop: '1px solid var(--color-surface-2)',
          }}
        >
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              backgroundColor: 'color-mix(in srgb, var(--color-primary-500) 6%, var(--color-surface-1))',
              border: '1px solid color-mix(in srgb, var(--color-primary-500) 20%, transparent)',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              textAlign: 'center',
            }}
          >
            <strong style={{ color: 'var(--color-text-primary)' }}>Key insight:</strong> These three
            channels reinforce each other. Rate hikes simultaneously compress margins (NIM), drain
            liquidity (reserves), and trigger funding flight (deposits) -- creating a triple squeeze
            that can rapidly erode bank profitability and stability.
          </div>
        </div>
      </div>
    </div>
  );
}

export { BankTransmissionChannels };
