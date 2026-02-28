'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/visualizations';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SPRING = { type: 'spring' as const, stiffness: 120, damping: 20 };

const TAB_COLORS = {
  businesses: '#6366f1', // indigo
  households: '#10b981', // emerald
} as const;

type Tab = 'businesses' | 'households';

/* ------------------------------------------------------------------ */
/*  Mortgage Payment Helper (30-year fixed)                            */
/* ------------------------------------------------------------------ */

function monthlyMortgage(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

/* ------------------------------------------------------------------ */
/*  Auto Loan Payment Helper (5-year)                                  */
/* ------------------------------------------------------------------ */

function monthlyAutoLoan(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

/* ------------------------------------------------------------------ */
/*  Animated Number Display                                            */
/* ------------------------------------------------------------------ */

function AnimatedValue({
  value,
  prefix = '',
  suffix = '',
  color,
  fontSize = '22px',
  decimals = 2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  color: string;
  fontSize?: string;
  decimals?: number;
}) {
  return (
    <motion.span
      key={value.toFixed(decimals)}
      initial={{ scale: 1.15, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        fontSize,
        fontWeight: 700,
        color,
        fontFamily: 'monospace',
      }}
    >
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Bar                                                       */
/* ------------------------------------------------------------------ */

function AnimatedBar({
  percent,
  color,
  height = 24,
  label,
}: {
  percent: number;
  color: string;
  height?: number;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      style={{
        height: `${height}px`,
        borderRadius: '6px',
        backgroundColor: 'var(--color-surface-2)',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      <motion.div
        initial={false}
        animate={{ width: `${clamped}%` }}
        transition={SPRING}
        style={{
          height: '100%',
          backgroundColor: color,
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minWidth: label ? '24px' : undefined,
        }}
      >
        {label && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: 'white',
              whiteSpace: 'nowrap',
              padding: '0 6px',
            }}
          >
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Impact Card Wrapper                                                */
/* ------------------------------------------------------------------ */

function ImpactCard({
  title,
  icon,
  color,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '14px',
        backgroundColor: 'var(--color-surface-0)',
        border: `1px solid ${color}25`,
        borderLeft: `3px solid ${color}`,
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            backgroundColor: `${color}15`,
            border: `1.5px solid ${color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color,
            margin: 0,
          }}
        >
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Businesses Tab                                                     */
/* ------------------------------------------------------------------ */

function BusinessesContent({ rateIncrease }: { rateIncrease: number }) {
  const color = TAB_COLORS.businesses;
  const baseRate = 5; // base borrowing rate
  const newRate = baseRate + rateIncrease;

  // Cost of Capital — viable projects model
  // At +0% increase, 8 of 10 projects viable. Linear decline to 3 at +3%.
  const viableProjects = Math.round(8 - (rateIncrease / 3) * 5);
  const viableProjectsClamped = Math.max(1, Math.min(10, viableProjects));
  const projectBarPercent = (viableProjectsClamped / 10) * 100;

  // Stock Valuation — Value = Earnings / (r + risk_premium)
  const earnings = 10; // $10 EPS
  const riskPremium = 5; // 5% equity risk premium
  const baseDiscount = (baseRate + riskPremium) / 100;
  const newDiscount = (newRate + riskPremium) / 100;
  const baseValuation = earnings / baseDiscount;
  const newValuation = earnings / newDiscount;
  const valuationPct = (newValuation / baseValuation) * 100;
  const valuationDrop = ((baseValuation - newValuation) / baseValuation) * 100;

  // Working Capital — cash flow meter model
  // Base cost of revolving credit: 6%. Each 1% rate hike adds 1%.
  const baseCreditCost = 6;
  const newCreditCost = baseCreditCost + rateIncrease;
  // Cash flow impact: 100% at base, drops ~8% per 1% rate increase
  const cashFlowPct = Math.max(40, 100 - rateIncrease * 8);

  return (
    <motion.div
      key="businesses"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
      }}
    >
      {/* Card 1: Cost of Capital */}
      <ImpactCard
        title="Cost of Capital"
        color={color}
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        }
      >
        {/* Rate calculation */}
        <div
          style={{
            padding: '12px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-surface-1)',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Base {baseRate}%
            </span>
            <span
              style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
              }}
            >
              +
            </span>
            <AnimatedValue
              value={rateIncrease}
              suffix="%"
              color={color}
              fontSize="16px"
            />
            <span
              style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
              }}
            >
              =
            </span>
            <AnimatedValue
              value={newRate}
              suffix="%"
              color={rateIncrease > 0 ? '#ef4444' : color}
              fontSize="18px"
            />
          </div>
        </div>

        {/* NPV bar */}
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}
            >
              Viable investment projects
            </span>
            <AnimatedValue
              value={viableProjectsClamped}
              suffix=" of 10"
              color={viableProjectsClamped <= 4 ? '#ef4444' : color}
              fontSize="14px"
              decimals={0}
            />
          </div>
          <AnimatedBar
            percent={projectBarPercent}
            color={viableProjectsClamped <= 4 ? '#ef4444' : color}
            height={20}
          />
          {/* Project dots */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              marginTop: '8px',
              justifyContent: 'center',
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  backgroundColor:
                    i < viableProjectsClamped ? color : 'var(--color-surface-2)',
                  scale: i < viableProjectsClamped ? 1 : 0.85,
                }}
                transition={SPRING}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: i < viableProjectsClamped ? 'white' : 'var(--color-text-muted)',
                }}
              >
                {i + 1}
              </motion.div>
            ))}
          </div>
        </div>

        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            lineHeight: '1.5',
            margin: '10px 0 0',
          }}
        >
          Higher discount rates make fewer investment projects worthwhile
        </p>
      </ImpactCard>

      {/* Card 2: Stock Valuations */}
      <ImpactCard
        title="Stock Valuations"
        color={color}
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        }
      >
        {/* Formula */}
        <div
          style={{
            padding: '12px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-surface-1)',
            marginBottom: '14px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              marginBottom: '6px',
            }}
          >
            Value = Earnings / (r + risk premium)
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              $10 / ({newRate.toFixed(1)}% + 5%)
            </span>
            <span
              style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
              }}
            >
              =
            </span>
            <AnimatedValue
              value={newValuation}
              prefix="$"
              color={valuationDrop > 10 ? '#ef4444' : color}
              fontSize="18px"
            />
          </div>
        </div>

        {/* Valuation bars: base vs new */}
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
              }}
            >
              Base valuation: ${baseValuation.toFixed(0)}
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
              }}
            >
              100%
            </span>
          </div>
          <AnimatedBar
            percent={100}
            color={`${color}50`}
            height={14}
          />
          <div style={{ height: '6px' }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
              }}
            >
              New valuation: ${newValuation.toFixed(0)}
            </span>
            <AnimatedValue
              value={valuationPct}
              suffix="%"
              color={valuationDrop > 10 ? '#ef4444' : color}
              fontSize="11px"
              decimals={1}
            />
          </div>
          <AnimatedBar
            percent={valuationPct}
            color={valuationDrop > 10 ? '#ef4444' : color}
            height={14}
          />
        </div>

        {/* Drop highlight */}
        {rateIncrease > 0 && (
          <div
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#ef444415',
              border: '1px solid #ef444430',
              textAlign: 'center',
              marginBottom: '8px',
            }}
          >
            <AnimatedValue
              value={valuationDrop}
              prefix="-"
              suffix="% drop"
              color="#ef4444"
              fontSize="14px"
              decimals={1}
            />
          </div>
        )}

        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            lineHeight: '1.5',
            margin: '4px 0 0',
          }}
        >
          Higher rates reduce present value of future earnings &rarr; lower stock
          prices &rarr; negative wealth effect
        </p>
      </ImpactCard>

      {/* Card 3: Working Capital */}
      <ImpactCard
        title="Working Capital"
        color={color}
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <path d="M12 12h.01" />
            <path d="M17 12h.01" />
            <path d="M7 12h.01" />
          </svg>
        }
      >
        {/* Credit line cost */}
        <div
          style={{
            padding: '12px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-surface-1)',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Revolving credit cost
            </span>
            <AnimatedValue
              value={newCreditCost}
              suffix="%"
              color={newCreditCost > 7.5 ? '#ef4444' : color}
              fontSize="16px"
            />
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
            }}
          >
            Base: {baseCreditCost}% + {rateIncrease.toFixed(2)}% increase
          </div>
        </div>

        {/* Cash flow meter */}
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}
            >
              Operating cash flow capacity
            </span>
            <AnimatedValue
              value={cashFlowPct}
              suffix="%"
              color={cashFlowPct < 80 ? '#ef4444' : color}
              fontSize="14px"
              decimals={0}
            />
          </div>
          <AnimatedBar
            percent={cashFlowPct}
            color={cashFlowPct < 80 ? '#ef4444' : color}
            height={22}
            label={cashFlowPct > 20 ? `${Math.round(cashFlowPct)}%` : undefined}
          />
          {/* Gauge-style segments */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4px',
            }}
          >
            <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: 600 }}>
              Low
            </span>
            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 600 }}>
              Moderate
            </span>
            <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 600 }}>
              Healthy
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            lineHeight: '1.5',
            margin: '6px 0 0',
          }}
        >
          Firms face higher costs on revolving credit, reducing cash flow for
          operations and hiring
        </p>
      </ImpactCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Households Tab                                                     */
/* ------------------------------------------------------------------ */

function HouseholdsContent({ rateIncrease }: { rateIncrease: number }) {
  const color = TAB_COLORS.households;
  const baseRate = 5;

  // Mortgage
  const mortgagePrincipal = 400_000;
  const mortgageYears = 30;
  const baseMortgageRate = 6.5; // typical base 30yr fixed
  const newMortgageRate = baseMortgageRate + rateIncrease;
  const baseMortgagePayment = monthlyMortgage(mortgagePrincipal, baseMortgageRate, mortgageYears);
  const newMortgagePayment = monthlyMortgage(mortgagePrincipal, newMortgageRate, mortgageYears);
  const mortgageIncrease = newMortgagePayment - baseMortgagePayment;

  // Auto loan
  const autoPrincipal = 35_000;
  const autoYears = 5;
  const baseAutoRate = 7;
  const newAutoRate = baseAutoRate + rateIncrease;
  const baseAutoPayment = monthlyAutoLoan(autoPrincipal, baseAutoRate, autoYears);
  const newAutoPayment = monthlyAutoLoan(autoPrincipal, newAutoRate, autoYears);
  const autoIncrease = newAutoPayment - baseAutoPayment;

  // Wealth effect
  // ~5% home value decline per 1% rate increase
  const baseHomeValue = 400_000;
  const homeDeclinePct = rateIncrease * 5;
  const newHomeValue = baseHomeValue * (1 - homeDeclinePct / 100);

  // Portfolio: ~8% decline per 1% rate increase (stocks are more rate-sensitive)
  const basePortfolio = 250_000;
  const portfolioDeclinePct = rateIncrease * 8;
  const newPortfolio = basePortfolio * (1 - portfolioDeclinePct / 100);

  return (
    <motion.div
      key="households"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
      }}
    >
      {/* Card 1: Mortgage Payments */}
      <ImpactCard
        title="Mortgage Payments"
        color={color}
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        }
      >
        <div
          style={{
            padding: '12px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-surface-1)',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              marginBottom: '6px',
              textAlign: 'center',
            }}
          >
            $400,000 mortgage &middot; 30-year fixed
          </div>

          {/* Before / After */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '2px',
                }}
              >
                Before ({baseMortgageRate}%)
              </div>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: 'var(--color-text-primary)',
                }}
              >
                ${baseMortgagePayment.toFixed(0)}
              </span>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '2px',
                }}
              >
                After ({newMortgageRate.toFixed(1)}%)
              </div>
              <AnimatedValue
                value={newMortgagePayment}
                prefix="$"
                color={mortgageIncrease > 100 ? '#ef4444' : color}
                fontSize="16px"
                decimals={0}
              />
            </div>
          </div>
        </div>

        {/* Dollar increase highlight */}
        {rateIncrease > 0 && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              backgroundColor: '#ef444412',
              border: '1px solid #ef444430',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                color: '#ef4444',
                marginBottom: '2px',
                fontWeight: 500,
              }}
            >
              Monthly increase
            </div>
            <AnimatedValue
              value={mortgageIncrease}
              prefix="+$"
              suffix="/mo"
              color="#ef4444"
              fontSize="20px"
              decimals={0}
            />
          </div>
        )}

        {/* Payment bars comparison */}
        <div style={{ marginBottom: '8px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Base payment
            </span>
          </div>
          <AnimatedBar percent={75} color={`${color}50`} height={14} />
          <div style={{ height: '6px' }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              New payment
            </span>
          </div>
          <AnimatedBar
            percent={75 * (newMortgagePayment / baseMortgagePayment)}
            color={mortgageIncrease > 100 ? '#ef4444' : color}
            height={14}
          />
        </div>

        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            lineHeight: '1.5',
            margin: '6px 0 0',
          }}
        >
          Higher mortgage rates reduce housing affordability and slow home sales
        </p>
      </ImpactCard>

      {/* Card 2: Auto & Consumer Loans */}
      <ImpactCard
        title="Auto & Consumer Loans"
        color={color}
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 16H9m10.28-3.09l-1.65-5.78A2 2 0 0 0 15.7 6H8.3a2 2 0 0 0-1.93 1.13l-1.65 5.78" />
            <circle cx="7.5" cy="17.5" r="2.5" />
            <circle cx="16.5" cy="17.5" r="2.5" />
            <path d="M3 13h18v4H3z" />
          </svg>
        }
      >
        <div
          style={{
            padding: '12px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-surface-1)',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              marginBottom: '6px',
              textAlign: 'center',
            }}
          >
            $35,000 auto loan &middot; 5-year term
          </div>

          {/* Before / After */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '2px',
                }}
              >
                Before ({baseAutoRate}%)
              </div>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: 'var(--color-text-primary)',
                }}
              >
                ${baseAutoPayment.toFixed(0)}
              </span>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '2px',
                }}
              >
                After ({newAutoRate.toFixed(1)}%)
              </div>
              <AnimatedValue
                value={newAutoPayment}
                prefix="$"
                color={autoIncrease > 20 ? '#ef4444' : color}
                fontSize="16px"
                decimals={0}
              />
            </div>
          </div>
        </div>

        {/* Dollar increase highlight */}
        {rateIncrease > 0 && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              backgroundColor: '#ef444412',
              border: '1px solid #ef444430',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                color: '#ef4444',
                marginBottom: '2px',
                fontWeight: 500,
              }}
            >
              Monthly increase
            </div>
            <AnimatedValue
              value={autoIncrease}
              prefix="+$"
              suffix="/mo"
              color="#ef4444"
              fontSize="20px"
              decimals={0}
            />
          </div>
        )}

        {/* Payment bars comparison */}
        <div style={{ marginBottom: '8px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Base payment
            </span>
          </div>
          <AnimatedBar percent={70} color={`${color}50`} height={14} />
          <div style={{ height: '6px' }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              New payment
            </span>
          </div>
          <AnimatedBar
            percent={70 * (newAutoPayment / baseAutoPayment)}
            color={autoIncrease > 20 ? '#ef4444' : color}
            height={14}
          />
        </div>

        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            lineHeight: '1.5',
            margin: '6px 0 0',
          }}
        >
          Higher rates on auto loans and credit cards reduce spending on durable
          goods
        </p>
      </ImpactCard>

      {/* Card 3: Asset Values (Wealth Effect) */}
      <ImpactCard
        title="Asset Values (Wealth Effect)"
        color={color}
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        }
      >
        {/* Home value */}
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}
            >
              Home value ($400k base)
            </span>
            <AnimatedValue
              value={newHomeValue / 1000}
              prefix="$"
              suffix="k"
              color={homeDeclinePct > 5 ? '#ef4444' : color}
              fontSize="14px"
              decimals={0}
            />
          </div>
          <AnimatedBar
            percent={(newHomeValue / baseHomeValue) * 100}
            color={homeDeclinePct > 5 ? '#ef4444' : color}
            height={18}
          />
          {rateIncrease > 0 && (
            <div
              style={{
                fontSize: '11px',
                color: '#ef4444',
                fontWeight: 600,
                marginTop: '4px',
                textAlign: 'right',
              }}
            >
              <AnimatedValue
                value={homeDeclinePct}
                prefix="-"
                suffix="%"
                color="#ef4444"
                fontSize="11px"
                decimals={1}
              />
              <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>
                {' '}
                (~5% per 1% rate hike)
              </span>
            </div>
          )}
        </div>

        {/* Portfolio / 401(k) */}
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}
            >
              401(k) / portfolio ($250k base)
            </span>
            <AnimatedValue
              value={newPortfolio / 1000}
              prefix="$"
              suffix="k"
              color={portfolioDeclinePct > 8 ? '#ef4444' : color}
              fontSize="14px"
              decimals={0}
            />
          </div>
          <AnimatedBar
            percent={(newPortfolio / basePortfolio) * 100}
            color={portfolioDeclinePct > 8 ? '#ef4444' : color}
            height={18}
          />
          {rateIncrease > 0 && (
            <div
              style={{
                fontSize: '11px',
                color: '#ef4444',
                fontWeight: 600,
                marginTop: '4px',
                textAlign: 'right',
              }}
            >
              <AnimatedValue
                value={portfolioDeclinePct}
                prefix="-"
                suffix="%"
                color="#ef4444"
                fontSize="11px"
                decimals={1}
              />
              <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>
                {' '}
                (~8% per 1% rate hike)
              </span>
            </div>
          )}
        </div>

        {/* Total wealth loss */}
        {rateIncrease > 0 && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              backgroundColor: '#ef444412',
              border: '1px solid #ef444430',
              textAlign: 'center',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                color: '#ef4444',
                marginBottom: '2px',
                fontWeight: 500,
              }}
            >
              Total estimated wealth loss
            </div>
            <AnimatedValue
              value={(baseHomeValue - newHomeValue + (basePortfolio - newPortfolio)) / 1000}
              prefix="-$"
              suffix="k"
              color="#ef4444"
              fontSize="20px"
              decimals={0}
            />
          </div>
        )}

        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            lineHeight: '1.5',
            margin: '4px 0 0',
          }}
        >
          Falling home and stock values make consumers feel poorer &rarr; reduce
          spending even without income change
        </p>
      </ImpactCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function BusinessHouseholdTransmission() {
  const [activeTab, setActiveTab] = useState<Tab>('businesses');
  const [rateIncrease, setRateIncrease] = useState(1.5);

  const tabColor = TAB_COLORS[activeTab];

  return (
    <div className="w-full" style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
            How Rate Hikes Hit the Real Economy
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Explore how individual businesses and households respond to higher
            borrowing costs at the microeconomic level
          </p>
        </div>

        {/* Tab bar + Slider */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--color-surface-2)',
          }}
        >
          {/* Tab buttons */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '18px',
            }}
          >
            {(
              [
                { id: 'businesses' as const, label: 'Businesses', icon: 'B' },
                { id: 'households' as const, label: 'Households', icon: 'H' },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              const tColor = TAB_COLORS[tab.id];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    borderRadius: '999px',
                    border: isActive
                      ? `1.5px solid ${tColor}`
                      : '1.5px solid var(--color-surface-2)',
                    padding: '8px 18px',
                    cursor: 'pointer',
                    background: isActive ? `${tColor}14` : 'var(--color-surface-0)',
                    color: isActive ? tColor : 'var(--color-text-secondary)',
                    fontSize: '14px',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? tColor : 'var(--color-surface-2)',
                      color: isActive ? 'white' : 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tab.id === 'businesses' ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
                      </svg>
                    ) : (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    )}
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Rate increase slider */}
          <div style={{ maxWidth: '400px' }}>
            <Slider
              label="Rate Increase"
              value={rateIncrease}
              onChange={setRateIncrease}
              min={0}
              max={3}
              step={0.25}
              unit="%"
              formatValue={(v) => `+${v.toFixed(2)}%`}
            />
          </div>
        </div>

        {/* Tab content */}
        <div style={{ padding: '20px 28px 28px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'businesses' ? (
              <BusinessesContent rateIncrease={rateIncrease} />
            ) : (
              <HouseholdsContent rateIncrease={rateIncrease} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
