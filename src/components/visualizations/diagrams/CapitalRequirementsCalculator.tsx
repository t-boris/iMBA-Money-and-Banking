'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Slider } from '../Slider';
import { AnimatedValue } from '../AnimatedValue';
import { cn } from '@/lib/utils';

interface CapitalRequirementsCalculatorProps {
  className?: string;
}

interface AssetCategory {
  id: string;
  name: string;
  riskWeight: number;
  color: string;
  colorRgb: string;
  defaultValue: number;
}

interface BaselVersion {
  id: string;
  name: string;
  year: string;
  description: string;
  minCapitalRatio: number;
  highlights: string[];
}

const assetCategories: AssetCategory[] = [
  {
    id: 'government',
    name: 'Government Bonds',
    riskWeight: 0,
    color: 'rgb(16, 185, 129)',
    colorRgb: '16, 185, 129',
    defaultValue: 100,
  },
  {
    id: 'mortgages',
    name: 'Residential Mortgages',
    riskWeight: 0.5,
    color: 'rgb(245, 158, 11)',
    colorRgb: '245, 158, 11',
    defaultValue: 200,
  },
  {
    id: 'corporate',
    name: 'Corporate Loans',
    riskWeight: 1.0,
    color: 'rgb(239, 68, 68)',
    colorRgb: '239, 68, 68',
    defaultValue: 300,
  },
];

const baselVersions: BaselVersion[] = [
  {
    id: 'basel1',
    name: 'Basel I',
    year: '1988',
    description:
      'First international banking regulation standard. Introduced risk-weighted assets and minimum capital requirements.',
    minCapitalRatio: 8,
    highlights: [
      'Minimum 8% capital ratio',
      'Simple risk weight categories (0%, 20%, 50%, 100%)',
      'Focused on credit risk only',
      'Same rules for all banks',
    ],
  },
  {
    id: 'basel2',
    name: 'Basel II',
    year: '2004',
    description:
      'Three-pillar approach: minimum capital, supervisory review, and market discipline. Allowed banks to use internal models.',
    minCapitalRatio: 8,
    highlights: [
      'Three pillars: capital, supervision, disclosure',
      'Internal ratings-based approach (IRB)',
      'Added operational risk requirement',
      'More granular risk weights',
    ],
  },
  {
    id: 'basel3',
    name: 'Basel III',
    year: '2010+',
    description:
      'Post-crisis reforms requiring more and better-quality capital, leverage limits, and liquidity requirements.',
    minCapitalRatio: 10.5,
    highlights: [
      'Higher Tier 1 capital requirement (6%)',
      'Capital conservation buffer (+2.5%)',
      'Countercyclical buffer (0-2.5%)',
      'Leverage ratio and liquidity ratios (LCR, NSFR)',
    ],
  },
];

export function CapitalRequirementsCalculator({
  className,
}: CapitalRequirementsCalculatorProps) {
  const [assets, setAssets] = useState<Record<string, number>>({
    government: 100,
    mortgages: 200,
    corporate: 300,
  });
  const [equity, setEquity] = useState(40);
  const [selectedBasel, setSelectedBasel] = useState('basel1');

  const activeBasel = baselVersions.find((b) => b.id === selectedBasel)!;

  // Calculations
  const totalAssets = Object.values(assets).reduce((sum, v) => sum + v, 0);
  const rwa = assetCategories.reduce((sum, cat) => {
    return sum + (assets[cat.id] || 0) * cat.riskWeight;
  }, 0);
  const requiredCapital = rwa * (activeBasel.minCapitalRatio / 100);
  const capitalRatio = rwa > 0 ? (equity / rwa) * 100 : 0;
  const passes = capitalRatio >= activeBasel.minCapitalRatio;

  // ROE-related: if equity increases, ROE decreases (tradeoff)
  const assumedNetIncome = totalAssets * 0.012; // Assume 1.2% ROA
  const roe = equity > 0 ? (assumedNetIncome / equity) * 100 : 0;
  const failureRisk = rwa > 0 ? Math.max(0, 100 - capitalRatio * 5) : 0;

  const updateAsset = (id: string, value: number) => {
    setAssets((prev) => ({ ...prev, [id]: value }));
  };

  const formatBillions = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}T`;
    return `$${value}B`;
  };

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '920px', margin: '0 auto' }}>
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
          Basel Capital Requirements Calculator
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          Adjust asset allocations and equity to see how risk-weighted capital requirements work
        </p>
      </div>

      {/* Basel Version Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {baselVersions.map((version) => (
          <motion.button
            key={version.id}
            onClick={() => setSelectedBasel(version.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border:
                selectedBasel === version.id
                  ? '2px solid rgba(99, 102, 241, 0.5)'
                  : '1px solid var(--color-surface-2)',
              backgroundColor:
                selectedBasel === version.id
                  ? 'rgba(99, 102, 241, 0.1)'
                  : 'var(--color-surface-1)',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color:
                  selectedBasel === version.id
                    ? 'rgb(99, 102, 241)'
                    : 'var(--color-text-primary)',
              }}
            >
              {version.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {version.year}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Basel Version Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBasel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            padding: '16px',
            backgroundColor: 'rgba(99, 102, 241, 0.06)',
            borderRadius: '12px',
            border: '1px solid rgba(99, 102, 241, 0.15)',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              margin: '0 0 12px 0',
              lineHeight: '1.6',
            }}
          >
            {activeBasel.description}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '8px',
            }}
          >
            {activeBasel.highlights.map((highlight, i) => (
              <div
                key={i}
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px',
                }}
              >
                <span style={{ color: 'rgb(99, 102, 241)', fontWeight: 600, flexShrink: 0 }}>
                  &bull;
                </span>
                {highlight}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        {/* Left: Asset Portfolio */}
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
            Asset Portfolio
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {assetCategories.map((cat) => (
              <div key={cat.id}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: cat.color, fontWeight: 600 }}>
                    Risk Weight: {(cat.riskWeight * 100).toFixed(0)}%
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    RWA: {formatBillions(assets[cat.id] * cat.riskWeight)}
                  </span>
                </div>
                <Slider
                  label={cat.name}
                  value={assets[cat.id]}
                  onChange={(value) => updateAsset(cat.id, value)}
                  min={0}
                  max={500}
                  step={10}
                  formatValue={formatBillions}
                />
              </div>
            ))}

            {/* Equity Slider */}
            <div
              style={{
                borderTop: '1px solid var(--color-surface-2)',
                paddingTop: '16px',
              }}
            >
              <Slider
                label="Bank Equity (Capital)"
                value={equity}
                onChange={setEquity}
                min={5}
                max={200}
                step={1}
                formatValue={formatBillions}
              />
            </div>
          </div>
        </motion.div>

        {/* Right: Calculation Display */}
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
            Capital Calculation
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Total Assets */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-surface-2)',
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                Total Assets
              </span>
              <AnimatedValue
                value={totalAssets}
                prefix="$"
                suffix="B"
                decimals={0}
                size="md"
                className="text-text-primary"
              />
            </div>

            {/* Risk-Weighted Assets */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
              }}
            >
              <div>
                <span style={{ fontSize: '13px', color: 'rgb(245, 158, 11)', fontWeight: 600 }}>
                  Risk-Weighted Assets
                </span>
                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Sum(Asset x Weight)
                </div>
              </div>
              <AnimatedValue
                value={rwa}
                prefix="$"
                suffix="B"
                decimals={0}
                size="lg"
                className="text-amber-500"
              />
            </div>

            {/* Required Capital */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
              }}
            >
              <div>
                <span style={{ fontSize: '13px', color: 'rgb(99, 102, 241)', fontWeight: 600 }}>
                  Required Capital
                </span>
                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  RWA x {activeBasel.minCapitalRatio}%
                </div>
              </div>
              <AnimatedValue
                value={requiredCapital}
                prefix="$"
                suffix="B"
                decimals={1}
                size="lg"
                className="text-indigo-500"
              />
            </div>

            {/* Capital Ratio - Hero */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: passes
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
                border: passes
                  ? '2px solid rgba(16, 185, 129, 0.4)'
                  : '2px solid rgba(239, 68, 68, 0.4)',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: passes ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)',
                  }}
                >
                  Capital Ratio
                </span>
                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Equity / RWA (min {activeBasel.minCapitalRatio}%)
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AnimatedValue
                  value={capitalRatio}
                  suffix="%"
                  decimals={1}
                  size="xl"
                  className={passes ? 'text-emerald-500' : 'text-red-500'}
                />
                <motion.div
                  key={passes ? 'pass' : 'fail'}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: passes
                      ? 'rgb(16, 185, 129)'
                      : 'rgb(239, 68, 68)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {passes ? (
                      <path d="M5 13l4 4L19 7" />
                    ) : (
                      <>
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                      </>
                    )}
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RWA Visual Bar Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '16px',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '12px',
          }}
        >
          Risk-Weighted Assets Breakdown
        </h4>

        {/* Total assets bar */}
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              marginBottom: '4px',
            }}
          >
            Total Assets: {formatBillions(totalAssets)}
          </div>
          <div
            style={{
              display: 'flex',
              height: '28px',
              borderRadius: '6px',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface-2)',
            }}
          >
            {assetCategories.map((cat) => {
              const width = totalAssets > 0 ? (assets[cat.id] / totalAssets) * 100 : 0;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    height: '100%',
                    backgroundColor: cat.color,
                    opacity: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {width > 15 && (
                    <span style={{ fontSize: '10px', color: 'white', fontWeight: 600 }}>
                      {formatBillions(assets[cat.id])}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RWA bar */}
        <div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              marginBottom: '4px',
            }}
          >
            Risk-Weighted Assets: {formatBillions(rwa)}
          </div>
          <div
            style={{
              display: 'flex',
              height: '28px',
              borderRadius: '6px',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface-2)',
            }}
          >
            {assetCategories.map((cat) => {
              const rwaValue = assets[cat.id] * cat.riskWeight;
              const width = rwa > 0 ? (rwaValue / rwa) * 100 : 0;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    height: '100%',
                    backgroundColor: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {width > 15 && (
                    <span style={{ fontSize: '10px', color: 'white', fontWeight: 600 }}>
                      {formatBillions(rwaValue)}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}
        >
          {assetCategories.map((cat) => (
            <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '3px',
                  backgroundColor: cat.color,
                }}
              />
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                {cat.name} ({(cat.riskWeight * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Regulatory Tradeoff Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: '16px',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.15)',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '12px',
          }}
        >
          The Regulatory Tradeoff
        </h4>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '12px',
          }}
        >
          {/* More Capital */}
          <div
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Equity</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'rgb(99, 102, 241)' }}>
              {formatBillions(equity)}
            </div>
          </div>

          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>

          {/* Lower Failure Risk */}
          <div
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor:
                failureRisk < 30
                  ? 'rgba(16, 185, 129, 0.1)'
                  : failureRisk < 60
                    ? 'rgba(245, 158, 11, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Failure Risk</div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color:
                  failureRisk < 30
                    ? 'rgb(16, 185, 129)'
                    : failureRisk < 60
                      ? 'rgb(245, 158, 11)'
                      : 'rgb(239, 68, 68)',
              }}
            >
              {failureRisk.toFixed(0)}%
            </div>
          </div>

          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>

          {/* Lower ROE */}
          <div
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor:
                roe > 15
                  ? 'rgba(16, 185, 129, 0.1)'
                  : roe > 8
                    ? 'rgba(245, 158, 11, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ROE</div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color:
                  roe > 15
                    ? 'rgb(16, 185, 129)'
                    : roe > 8
                      ? 'rgb(245, 158, 11)'
                      : 'rgb(239, 68, 68)',
              }}
            >
              {roe.toFixed(1)}%
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            margin: 0,
            lineHeight: '1.6',
          }}
        >
          More capital reduces failure risk but lowers return on equity. Regulators must balance safety
          against bank profitability. Try increasing equity to see the tradeoff.
        </p>
      </motion.div>
    </div>
  );
}
