'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { AnimatedValue } from '@/components/visualizations/AnimatedValue';
import { Slider } from '@/components/visualizations/Slider';

interface AbundantReservesFloorProps {
  className?: string;
}

type Regime = 'pre-2008' | 'post-2008';

const SPRING = { type: 'spring' as const, stiffness: 120, damping: 20 };

const glassPanel =
  'bg-glass-light backdrop-blur-md border border-glass-border shadow-glass rounded-2xl p-6';

const insightBox: React.CSSProperties = {
  padding: '14px 18px',
  borderRadius: '12px',
  backgroundColor: 'color-mix(in srgb, var(--color-primary) 6%, var(--color-surface-1))',
  border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
  fontSize: '13px',
  color: 'var(--color-text-secondary)',
  lineHeight: '1.6',
  textAlign: 'center',
};

const sectionH4: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  marginBottom: '14px',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const liStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--color-text-secondary)',
  lineHeight: '1.55',
};

const TONES = {
  blue: 'rgb(59, 130, 246)',
  green: 'rgb(16, 185, 129)',
  amber: 'rgb(245, 158, 11)',
  red: 'rgb(239, 68, 68)',
  purple: 'rgb(139, 92, 246)',
};

const arbitrageLogic = [
  {
    title: 'IORB Floor',
    rateLabel: 'IORB',
    rateColor: TONES.blue,
    explanation:
      'If the federal funds rate falls below IORB, banks would deposit reserves with the Fed instead of lending them in the interbank market. No rational bank will lend at a lower rate than what the Fed pays risk-free. This makes IORB an effective floor for banks.',
  },
  {
    title: 'Why ON RRP Exists',
    rateLabel: 'ON RRP',
    rateColor: TONES.purple,
    explanation:
      'Non-bank institutions (money market funds, GSEs) cannot earn IORB because they do not hold reserve accounts at the Fed. Without ON RRP, these institutions might lend below IORB, dragging the effective federal funds rate below the target range. ON RRP gives non-banks a Fed-backed alternative.',
  },
  {
    title: 'ON RRP Sub-Floor',
    rateLabel: 'ON RRP',
    rateColor: TONES.purple,
    explanation:
      'Non-banks will not lend overnight for less than the ON RRP rate, because they can always park their cash with the Fed via reverse repo at that rate. This creates an absolute floor for the money market — even below the IORB floor that applies to banks.',
  },
];

export default function AbundantReservesFloor({ className }: AbundantReservesFloorProps) {
  const [regime, setRegime] = useState<Regime>('post-2008');
  const [targetLower, setTargetLower] = useState(5.25);
  const [showArbitrage, setShowArbitrage] = useState(false);

  const targetUpper = targetLower + 0.25;
  const discountRate = targetUpper + 0.25;
  const iorbRate = targetUpper;
  const onRrpRate = targetLower;
  const effectiveFFR = targetLower + 0.08;

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      {/* Header */}
      <div className={cn(glassPanel, 'mb-6')}>
        <h3
          style={{
            fontSize: '19px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '6px',
          }}
        >
          Modern Monetary Policy Rate Corridor
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          Explore how the Fed controls interest rates using administered rates (IORB and ON RRP)
          instead of adjusting the supply of reserves.
        </p>
      </div>

      {/* Regime Toggle */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '18px',
          justifyContent: 'center',
        }}
      >
        {(
          [
            { id: 'pre-2008' as const, label: 'Pre-2008: Scarce Reserves' },
            { id: 'post-2008' as const, label: 'Post-2008: Abundant Reserves' },
          ] as const
        ).map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => setRegime(opt.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              borderRadius: '999px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              border:
                regime === opt.id
                  ? '2px solid color-mix(in srgb, var(--color-primary) 70%, transparent)'
                  : '1px solid var(--color-surface-2)',
              color:
                regime === opt.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              background:
                regime === opt.id
                  ? 'color-mix(in srgb, var(--color-primary) 14%, transparent)'
                  : 'var(--color-surface-1)',
            }}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {regime === 'pre-2008' ? (
          <motion.div
            key="pre"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <PreCrisisView />
          </motion.div>
        ) : (
          <motion.div
            key="post"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {/* FOMC Rate Controls */}
            <div className={cn(glassPanel, 'mb-6')}>
              <h4 style={{ ...sectionH4, marginBottom: '16px' }}>FOMC Rate Controls</h4>
              <Slider
                label="FOMC Target Range (lower bound)"
                value={targetLower}
                onChange={setTargetLower}
                min={0}
                max={5.5}
                step={0.25}
                unit="%"
                formatValue={(v) => `${v.toFixed(2)}%`}
              />
            </div>

            {/* Rate Corridor — Clear Vertical Ladder */}
            <div className={cn(glassPanel, 'mb-6')}>
              <h4 style={{ ...sectionH4, marginBottom: '20px' }}>
                Rate Corridor — Who Sets Each Rate and Why
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {/* Discount Rate — Ceiling */}
                <CorridorRow
                  rate={discountRate}
                  label="Discount Rate"
                  role="CEILING"
                  roleDescription="Banks won't borrow interbank above this — they'd use the discount window instead"
                  color={TONES.red}
                  dashed
                  showConnector={false}
                />

                {/* Zone: "Penalty zone" between discount rate and IORB */}
                <ZoneBracket
                  label="Penalty zone — no bank borrows here"
                  color={TONES.red}
                  height={32}
                />

                {/* IORB — Floor for banks */}
                <CorridorRow
                  rate={iorbRate}
                  label="IORB"
                  role="BANK FLOOR"
                  roleDescription="Fed pays this to banks on reserves — banks won't lend for less"
                  color={TONES.blue}
                  dashed={false}
                  showConnector
                />

                {/* Zone: Target Range — where EFFR lives */}
                <ZoneBracket
                  label="Fed Funds Target Range"
                  color={TONES.blue}
                  height={56}
                  highlighted
                >
                  {/* EFFR dot inside the target range */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={SPRING}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '6px 14px',
                      borderRadius: '999px',
                      backgroundColor: `color-mix(in srgb, ${TONES.green} 15%, transparent)`,
                      border: `2px solid ${TONES.green}`,
                      width: 'fit-content',
                      margin: '0 auto',
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: TONES.green,
                      }}
                    />
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: TONES.green,
                      }}
                    >
                      EFFR{' '}
                      <AnimatedValue
                        value={effectiveFFR}
                        suffix="%"
                        decimals={2}
                        size="sm"
                        className="text-emerald-500"
                      />{' '}
                      — actual market rate
                    </span>
                  </motion.div>
                </ZoneBracket>

                {/* ON RRP — Sub-floor for non-banks */}
                <CorridorRow
                  rate={onRrpRate}
                  label="ON RRP"
                  role="NON-BANK FLOOR"
                  roleDescription="Money market funds park cash here — ensures rates don't fall below target"
                  color={TONES.purple}
                  dashed
                  showConnector
                />

                {/* Zone below: "Below floor" */}
                <ZoneBracket
                  label="Below target — no one lends here"
                  color="var(--color-text-muted)"
                  height={24}
                  muted
                />
              </div>

              {/* Rate Summary Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '10px',
                  marginTop: '20px',
                }}
              >
                <RateCard label="Discount Rate" color={TONES.red}>
                  <AnimatedValue
                    value={discountRate}
                    suffix="%"
                    decimals={2}
                    size="sm"
                    className="text-red-500"
                  />
                </RateCard>
                <RateCard label="IORB" color={TONES.blue}>
                  <AnimatedValue
                    value={iorbRate}
                    suffix="%"
                    decimals={2}
                    size="sm"
                    className="text-blue-500"
                  />
                </RateCard>
                <RateCard label="Target Range" color={TONES.blue}>
                  <AnimatedValue
                    value={targetLower}
                    suffix="%"
                    decimals={2}
                    size="sm"
                    className="text-blue-500"
                  />
                  <span style={{ color: 'var(--color-text-muted)', margin: '0 2px' }}>–</span>
                  <AnimatedValue
                    value={targetUpper}
                    suffix="%"
                    decimals={2}
                    size="sm"
                    className="text-blue-500"
                  />
                </RateCard>
                <RateCard label="EFFR" color={TONES.green}>
                  <AnimatedValue
                    value={effectiveFFR}
                    suffix="%"
                    decimals={2}
                    size="sm"
                    className="text-emerald-500"
                  />
                </RateCard>
                <RateCard label="ON RRP" color={TONES.purple}>
                  <AnimatedValue
                    value={onRrpRate}
                    suffix="%"
                    decimals={2}
                    size="sm"
                    className="text-violet-500"
                  />
                </RateCard>
              </div>
            </div>

            {/* Arbitrage Logic Panel */}
            <div className={cn(glassPanel, 'mb-6')}>
              <motion.button
                onClick={() => setShowArbitrage(!showArbitrage)}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                }}
              >
                <h4 style={{ ...sectionH4, marginBottom: 0 }}>
                  Why Does This Work? — Arbitrage Logic
                </h4>
                <motion.span
                  animate={{ rotate: showArbitrage ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {showArbitrage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginTop: '16px',
                      }}
                    >
                      {arbitrageLogic.map((item, idx) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          style={{
                            padding: '14px 16px',
                            borderRadius: '10px',
                            border: `1px solid color-mix(in srgb, ${item.rateColor} 25%, transparent)`,
                            backgroundColor: `color-mix(in srgb, ${item.rateColor} 5%, var(--color-surface-1))`,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '6px',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                color: item.rateColor,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                backgroundColor: `color-mix(in srgb, ${item.rateColor} 15%, transparent)`,
                              }}
                            >
                              {item.rateLabel}
                            </span>
                            <span
                              style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                              }}
                            >
                              {item.title}
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: '13px',
                              color: 'var(--color-text-secondary)',
                              lineHeight: '1.6',
                              margin: 0,
                            }}
                          >
                            {item.explanation}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reserve Balances */}
            <div className={cn(glassPanel, 'mb-6')}>
              <h4 style={sectionH4}>Reserve Balances</h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                  marginBottom: '14px',
                }}
              >
                <ReserveBar label="Pre-2008 (Scarce)" value="$14B" pct={2} color={TONES.amber} />
                <ReserveBar
                  label="Post-2008 (Abundant)"
                  value="$3.2T+"
                  pct={95}
                  color={TONES.blue}
                />
              </div>
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor:
                    'color-mix(in srgb, var(--color-primary) 6%, var(--color-surface-1))',
                  border:
                    '1px solid color-mix(in srgb, var(--color-primary) 18%, transparent)',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  textAlign: 'center',
                }}
              >
                <strong style={{ color: 'var(--color-text-primary)' }}>IORB + ON RRP:</strong>{' '}
                raise rates without changing reserve supply. The Fed now controls rates through
                administered prices, not quantities.
              </div>
            </div>

            {/* Bottom insight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={insightBox}
            >
              <strong style={{ color: 'var(--color-text-primary)' }}>Key insight:</strong> The
              floor system allows the Fed to control rates even with abundant reserves, using
              administered rates (IORB and ON RRP) instead of supply adjustments. This decouples
              interest rate policy from balance sheet size.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Corridor Row (a single rate line in the ladder) ----------

function CorridorRow({
  rate,
  label,
  role,
  roleDescription,
  color,
  dashed,
  showConnector,
}: {
  rate: number;
  label: string;
  role: string;
  roleDescription: string;
  color: string;
  dashed: boolean;
  showConnector: boolean;
}) {
  return (
    <div style={{ position: 'relative' }}>
      {showConnector && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '-8px',
            width: '2px',
            height: '8px',
            backgroundColor: 'var(--color-surface-2)',
          }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={SPRING}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          borderRadius: '12px',
          border: `2px ${dashed ? 'dashed' : 'solid'} ${color}`,
          backgroundColor: `color-mix(in srgb, ${color} 8%, var(--color-surface-1))`,
        }}
      >
        {/* Rate value */}
        <div
          style={{
            minWidth: '72px',
            textAlign: 'center',
            padding: '6px 10px',
            borderRadius: '8px',
            backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`,
          }}
        >
          <AnimatedValue
            value={rate}
            suffix="%"
            decimals={2}
            size="md"
            className="font-bold"
          />
        </div>

        {/* Label and description */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color }}>
              {label}
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color,
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
              }}
            >
              {role}
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.5',
            }}
          >
            {roleDescription}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ---------- Zone Bracket (the space between rate lines) ----------

function ZoneBracket({
  label,
  color,
  height,
  highlighted,
  muted,
  children,
}: {
  label: string;
  color: string;
  height: number;
  highlighted?: boolean;
  muted?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '4px',
        minHeight: `${height}px`,
        padding: '8px 16px',
        margin: '0 24px',
        borderLeft: `2px ${muted ? 'dotted' : 'solid'} ${highlighted ? color : 'var(--color-surface-2)'}`,
        borderRight: `2px ${muted ? 'dotted' : 'solid'} ${highlighted ? color : 'var(--color-surface-2)'}`,
        backgroundColor: highlighted
          ? `color-mix(in srgb, ${color} 6%, transparent)`
          : 'transparent',
      }}
    >
      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: muted ? 'var(--color-text-muted)' : color,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

// ---------- Pre-2008 View ----------

function PreCrisisView() {
  const discRate = 6.25;
  const targetRate = 5.25;
  const effRate = 5.24;

  return (
    <div>
      {/* Rate Corridor Ladder */}
      <div className={cn(glassPanel, 'mb-6')}>
        <h4 style={sectionH4}>Scarce Reserves Corridor (Pre-2008)</h4>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6',
            marginBottom: '20px',
          }}
        >
          Before 2008, the Fed controlled rates by adjusting a <strong>tiny</strong> supply of
          reserves (~$14B). Small open market operations shifted supply enough to move the rate.
          Only two boundaries existed: the discount rate ceiling and zero.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {/* Discount Rate — Ceiling */}
          <CorridorRow
            rate={discRate}
            label="Discount Rate"
            role="CEILING"
            roleDescription="Penalty rate — banks avoid borrowing here due to stigma (signals weakness to the market)"
            color={TONES.red}
            dashed
            showConnector={false}
          />

          {/* Zone: Stigma zone */}
          <ZoneBracket
            label="Stigma zone — banks avoid this range"
            color={TONES.red}
            height={32}
          />

          {/* Target Rate */}
          <CorridorRow
            rate={targetRate}
            label="Fed Funds Target"
            role="FOMC TARGET"
            roleDescription="The single target rate (not a range). NY Fed uses daily OMOs to push the market rate toward this exact value."
            color={TONES.blue}
            dashed={false}
            showConnector
          />

          {/* Zone: Where EFFR trades */}
          <ZoneBracket
            label="Market trading zone"
            color={TONES.green}
            height={56}
            highlighted
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={SPRING}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 14px',
                borderRadius: '999px',
                backgroundColor: `color-mix(in srgb, ${TONES.green} 15%, transparent)`,
                border: `2px solid ${TONES.green}`,
                width: 'fit-content',
                margin: '0 auto',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: TONES.green,
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: 700, color: TONES.green }}>
                EFFR ~{effRate}% — actual market rate (very close to target)
              </span>
            </motion.div>
          </ZoneBracket>

          {/* Zero bound */}
          <CorridorRow
            rate={0}
            label="Zero Bound"
            role="FLOOR"
            roleDescription="Banks won't lend at negative rates. No administered floor existed — the rate stayed above zero only because reserves were scarce."
            color={TONES.amber}
            dashed
            showConnector
          />
        </div>
      </div>

      {/* How it worked */}
      <div className={cn(glassPanel, 'mb-6')}>
        <h4 style={sectionH4}>How the Fed Moved Rates</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {[
            {
              icon: '📉',
              title: 'To lower the rate',
              desc: 'NY Fed buys Treasuries → injects reserves → supply shifts right → EFFR falls toward target',
              color: TONES.green,
            },
            {
              icon: '📈',
              title: 'To raise the rate',
              desc: 'NY Fed sells Treasuries → drains reserves → supply shifts left → EFFR rises toward target',
              color: TONES.red,
            },
            {
              icon: '⚖️',
              title: 'Why it worked',
              desc: 'With only ~$14B in total reserves, even small OMOs ($2-5B) caused meaningful shifts in the supply-demand equilibrium',
              color: TONES.blue,
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08, ...SPRING }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '10px',
                border: `1px solid color-mix(in srgb, ${item.color} 25%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${item.color} 5%, var(--color-surface-1))`,
              }}
            >
              <span style={{ fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {item.title}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.55',
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key metrics */}
      <div className={cn(glassPanel, 'mb-6')}>
        <h4 style={sectionH4}>Key Numbers</h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
          }}
        >
          <MetricCard label="Total Reserves (2007)" value="~$14B" tone="amber" />
          <MetricCard label="Primary Tool" value="Daily OMOs" tone="blue" />
          <MetricCard label="Backup Tool" value="Discount Window" tone="red" />
        </div>
      </div>

      {/* Bottom insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={insightBox}
      >
        <strong style={{ color: 'var(--color-text-primary)' }}>Why did this change?</strong> After
        the 2008 crisis, QE flooded the banking system with trillions in reserves ($14B → $3.2T+).
        Small OMOs could no longer move the rate. The Fed needed a new framework — administered
        rates (IORB, ON RRP) instead of reserve quantities. Switch to the Post-2008 view to see
        how.
      </motion.div>
    </div>
  );
}

// ---------- Helpers ----------

function RateCard({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: '10px',
        border: `1px solid color-mix(in srgb, ${color} 28%, transparent)`,
        backgroundColor: 'var(--color-surface-1)',
        padding: '10px 12px',
      }}
    >
      <div
        style={{
          fontSize: '10px',
          color: 'var(--color-text-muted)',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px',
          fontSize: '18px',
          fontWeight: 700,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'blue' | 'green' | 'amber' | 'red';
}) {
  const c = TONES[tone];
  return (
    <div
      style={{
        borderRadius: '12px',
        border: `1px solid color-mix(in srgb, ${c} 28%, transparent)`,
        backgroundColor: 'var(--color-surface-1)',
        padding: '12px',
      }}
    >
      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
        {label}
      </div>
      <div style={{ fontSize: '21px', fontWeight: 700, color: c }}>{value}</div>
    </div>
  );
}

function ReserveBar({
  label,
  value,
  pct,
  color,
}: {
  label: string;
  value: string;
  pct: number;
  color: string;
}) {
  return (
    <div
      style={{
        padding: '12px 14px',
        borderRadius: '10px',
        border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${color} 5%, var(--color-surface-1))`,
      }}
    >
      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '20px', fontWeight: 700, color, marginBottom: '8px' }}>{value}</div>
      <div
        style={{
          height: '8px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-surface-2)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 80, damping: 18 }}
          style={{ height: '100%', backgroundColor: color, borderRadius: '4px' }}
        />
      </div>
    </div>
  );
}

export { AbundantReservesFloor };
