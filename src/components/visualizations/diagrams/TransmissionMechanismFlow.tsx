'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface SpendingChannel {
  id: string;
  label: string;
  icon: string;
  color: string;
  summary: string;
  detail: string;
}

const spendingChannels: SpendingChannel[] = [
  {
    id: 'business',
    label: 'Business Investment',
    icon: '\u{1F3ED}', // factory
    color: 'rgb(99, 102, 241)',
    summary: 'Cost of capital rises',
    detail:
      'When the Fed raises rates, the cost of borrowing for firms increases. ' +
      'Corporate bond yields rise, bank loan rates climb, and the hurdle rate for new projects goes up. ' +
      'Firms postpone or cancel capital expenditures -- new factories, equipment, R&D -- ' +
      'because fewer projects can generate returns above the higher cost of capital. ' +
      'This is often the largest single channel of monetary transmission.',
  },
  {
    id: 'housing',
    label: 'Residential Housing',
    icon: '\u{1F3E0}', // house
    color: 'rgb(245, 158, 11)',
    summary: 'Mortgage rates climb',
    detail:
      'Mortgage rates track long-term Treasury yields closely. A 1 percentage-point increase in the ' +
      'federal funds rate typically raises 30-year fixed mortgage rates by 0.5--1.0 pp over time. ' +
      'Higher monthly payments reduce the pool of qualified buyers and the price they can afford. ' +
      'Housing starts, home sales, and residential construction all decline, ' +
      'with knock-on effects for furniture, appliances, and related services.',
  },
  {
    id: 'durables',
    label: 'Consumer Durables',
    icon: '\u{1F697}', // car
    color: 'rgb(16, 185, 129)',
    summary: 'Loan rates increase',
    detail:
      'Auto loans, credit-card APRs, and personal loans are directly tied to short-term rates. ' +
      'Higher financing costs make big-ticket purchases -- cars, appliances, electronics -- ' +
      'more expensive on a monthly-payment basis. Consumers defer purchases or downgrade choices. ' +
      'Because durable goods spending is highly interest-sensitive, it responds faster than services.',
  },
  {
    id: 'exchange',
    label: 'Exchange Rate',
    icon: '\u{1F4B1}', // currency exchange
    color: 'rgb(139, 92, 246)',
    summary: 'Dollar strengthens',
    detail:
      'Higher US interest rates attract foreign capital seeking better returns, increasing demand for ' +
      'dollars and driving the exchange rate up. A stronger dollar makes US exports more expensive abroad ' +
      'and foreign imports cheaper at home. Net exports (exports minus imports) decline, ' +
      'subtracting from GDP. This channel operates with a longer lag because trade contracts are ' +
      'often set months in advance.',
  },
  {
    id: 'stocks',
    label: 'Stock Prices',
    icon: '\u{1F4C9}', // chart decreasing
    color: 'rgb(239, 68, 68)',
    summary: 'Equity valuations fall',
    detail:
      'Higher rates raise the discount rate used to value future cash flows, mechanically lowering ' +
      'present values of stocks. They also make bonds more attractive relative to equities. ' +
      'Falling stock prices create a negative wealth effect: households that feel poorer cut back on ' +
      'consumption. For firms, lower equity prices raise the cost of issuing new shares (Tobin\'s Q falls), ' +
      'further discouraging investment.',
  },
];

interface TimelineLag {
  label: string;
  range: string;
  color: string;
  widthPercent: number;
}

const timelineLags: TimelineLag[] = [
  { label: 'Market rates', range: 'Immediate', color: 'rgb(99, 102, 241)', widthPercent: 12 },
  { label: 'Long-term rates & asset prices', range: '3-6 months', color: 'rgb(139, 92, 246)', widthPercent: 22 },
  { label: 'Spending & GDP', range: '6-12 months', color: 'rgb(245, 158, 11)', widthPercent: 30 },
  { label: 'Inflation', range: '12-18 months', color: 'rgb(239, 68, 68)', widthPercent: 36 },
];

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  items?: string[];
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'Fed Rate Change',
    subtitle: 'FOMC raises or lowers the federal funds rate target',
    color: 'rgb(99, 102, 241)',
    bgColor: 'rgba(99, 102, 241, 0.12)',
  },
  {
    id: 2,
    title: 'Market Rates',
    subtitle: 'Short-term rates adjust quickly',
    color: 'rgb(79, 70, 229)',
    bgColor: 'rgba(79, 70, 229, 0.12)',
    items: ['Treasury bills', 'Commercial paper', 'Fed funds'],
  },
  {
    id: 3,
    title: 'Long-term Rates & Asset Prices',
    subtitle: 'Broader financial conditions shift',
    color: 'rgb(139, 92, 246)',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    items: ['Bond yields', 'Mortgage rates', 'Stock prices', 'Exchange rate'],
  },
  {
    id: 4,
    title: 'Spending Channels',
    subtitle: 'Click a channel below for details',
    color: 'rgb(245, 158, 11)',
    bgColor: 'rgba(245, 158, 11, 0.12)',
  },
  {
    id: 5,
    title: 'Real Economy',
    subtitle: 'Macroeconomic outcomes',
    color: 'rgb(239, 68, 68)',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    items: ['GDP', 'Employment', 'Inflation'],
  },
];

/* ------------------------------------------------------------------ */
/*  Arrow helper                                                       */
/* ------------------------------------------------------------------ */

function FlowArrowSvg({ color }: { color: string }) {
  return (
    <svg
      width="32"
      height="20"
      viewBox="0 0 32 20"
      fill="none"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <defs>
        <marker
          id={`ah-${color.replace(/[^a-zA-Z0-9]/g, '')}`}
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill={color} />
        </marker>
      </defs>
      <line
        x1="2"
        y1="10"
        x2="24"
        y2="10"
        stroke={color}
        strokeWidth="2"
        markerEnd={`url(#ah-${color.replace(/[^a-zA-Z0-9]/g, '')})`}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Down-arrow for narrow screens                                      */
/* ------------------------------------------------------------------ */

function DownArrowSvg({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="28"
      viewBox="0 0 20 28"
      fill="none"
      style={{ flexShrink: 0, display: 'block', margin: '0 auto' }}
    >
      <defs>
        <marker
          id={`ahd-${color.replace(/[^a-zA-Z0-9]/g, '')}`}
          markerWidth="8"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" fill={color} />
        </marker>
      </defs>
      <line
        x1="10"
        y1="2"
        x2="10"
        y2="22"
        stroke={color}
        strokeWidth="2"
        markerEnd={`url(#ahd-${color.replace(/[^a-zA-Z0-9]/g, '')})`}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage Card                                                         */
/* ------------------------------------------------------------------ */

function StageCard({ stage }: { stage: Stage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: stage.id * 0.08 }}
      style={{
        flex: '1 1 0%',
        minWidth: '140px',
        maxWidth: '220px',
        padding: '16px 12px',
        borderRadius: '12px',
        backgroundColor: stage.bgColor,
        border: `2px solid ${stage.color}`,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {/* Stage number badge */}
      <span
        style={{
          display: 'inline-flex',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          backgroundColor: stage.color,
          color: '#fff',
          fontSize: '13px',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {stage.id}
      </span>

      <div
        style={{
          fontSize: '14px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: '1.3',
        }}
      >
        {stage.title}
      </div>

      <div
        style={{
          fontSize: '11px',
          color: 'var(--color-text-secondary)',
          lineHeight: '1.4',
        }}
      >
        {stage.subtitle}
      </div>

      {stage.items && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
          {stage.items.map((item) => (
            <span
              key={item}
              style={{
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-surface-0)',
                fontSize: '11px',
                color: stage.color,
                fontWeight: 500,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Arrow between stages (responsive)                                  */
/* ------------------------------------------------------------------ */

function StageArrow({ fromColor, toColor }: { fromColor: string; toColor: string }) {
  const blended = fromColor; // use the source stage color for clarity
  return (
    <>
      {/* Horizontal arrow for wide screens */}
      <div className="hidden lg:flex" style={{ alignItems: 'center', flexShrink: 0 }}>
        <FlowArrowSvg color={blended} />
      </div>
      {/* Vertical arrow for narrow screens */}
      <div className="flex lg:hidden" style={{ justifyContent: 'center', flexShrink: 0 }}>
        <DownArrowSvg color={blended} />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Spending Channel Card                                              */
/* ------------------------------------------------------------------ */

function ChannelCard({
  channel,
  isExpanded,
  onToggle,
}: {
  channel: SpendingChannel;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '12px 14px',
        borderRadius: '10px',
        backgroundColor: isExpanded ? `${channel.color}15` : 'var(--color-surface-2)',
        border: isExpanded
          ? `2px solid ${channel.color}`
          : '2px solid transparent',
        cursor: 'pointer',
        transition: 'border-color 0.2s, background-color 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px', flexShrink: 0 }}>{channel.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: isExpanded ? channel.color : 'var(--color-text-primary)',
              marginBottom: '2px',
            }}
          >
            {channel.label}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            {channel.summary}
          </div>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          {'\u25BC'}
        </motion.span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                marginTop: '10px',
                paddingTop: '10px',
                borderTop: `1px solid ${channel.color}40`,
                fontSize: '12px',
                lineHeight: '1.7',
                color: 'var(--color-text-secondary)',
              }}
            >
              {channel.detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline Bar                                                       */
/* ------------------------------------------------------------------ */

function TimelineBar() {
  return (
    <div
      style={{
        padding: '20px 16px 12px',
        borderRadius: '12px',
        backgroundColor: 'var(--color-surface-2)',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '14px',
          textAlign: 'center',
        }}
      >
        Transmission Lags
      </div>

      {/* Bar track */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '28px',
          borderRadius: '6px',
          backgroundColor: 'var(--color-surface-1)',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {timelineLags.map((lag, i) => (
          <motion.div
            key={lag.label}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
            style={{
              width: `${lag.widthPercent}%`,
              height: '100%',
              backgroundColor: lag.color,
              opacity: 0.85,
              transformOrigin: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: i < timelineLags.length - 1 ? '2px solid var(--color-surface-1)' : 'none',
            }}
          >
            <span
              style={{
                fontSize: '9px',
                fontWeight: 600,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: '0 4px',
              }}
            >
              {lag.range}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Labels below bar */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          marginTop: '6px',
        }}
      >
        {timelineLags.map((lag) => (
          <div
            key={lag.label}
            style={{
              width: `${lag.widthPercent}%`,
              textAlign: 'center',
              padding: '0 2px',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: lag.color,
                fontWeight: 500,
                lineHeight: '1.3',
                display: 'block',
              }}
            >
              {lag.label}
            </span>
          </div>
        ))}
      </div>

      {/* 0 and 18 month endpoints */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '6px',
        }}
      >
        <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>0 months</span>
        <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>18+ months</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TransmissionMechanismFlow() {
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);

  const handleToggleChannel = (id: string) => {
    setExpandedChannel((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('w-full')} style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
          Monetary Policy Transmission Mechanism
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          How a Fed rate change propagates through the financial system to the real economy
        </p>
      </div>

      {/* Outer container */}
      <div
        style={{
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: 'var(--color-surface-1)',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '20px',
        }}
      >
        {/* ---- Stage Flow ---- */}
        <div
          className="flex flex-col lg:flex-row"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginBottom: '24px',
          }}
        >
          {stages.map((stage, i) => (
            <div
              key={stage.id}
              className={cn(
                'flex items-center',
                'flex-col lg:flex-row',
              )}
              style={{ gap: '6px' }}
            >
              <StageCard stage={stage} />
              {i < stages.length - 1 && (
                <StageArrow
                  fromColor={stages[i].color}
                  toColor={stages[i + 1].color}
                />
              )}
            </div>
          ))}
        </div>

        {/* ---- Spending Channels Detail Section ---- */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
            Stage 4: Spending Channels (click to expand)
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '10px',
            }}
          >
            {spendingChannels.map((ch) => (
              <ChannelCard
                key={ch.id}
                channel={ch}
                isExpanded={expandedChannel === ch.id}
                onToggle={() => handleToggleChannel(ch.id)}
              />
            ))}
          </div>
        </div>

        {/* ---- Timeline ---- */}
        <TimelineBar />
      </div>

      {/* Bottom insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          padding: '16px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>
            {'\u{1F4A1}'}
          </span>
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(99, 102, 241)',
                marginBottom: '4px',
              }}
            >
              Key Insight
            </h4>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              Monetary policy works with long and variable lags. Market interest rates respond within
              days, but the full effect on inflation can take 12-18 months or longer. This is why the
              Fed must be forward-looking: by the time inflation data confirms a problem, the window
              for a timely response has already passed. The multiple channels also mean that rate
              changes affect different sectors of the economy at different speeds.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
