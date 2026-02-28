'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/visualizations';

// ----- Types -----

type View = 'basic' | 'expectations';

interface CurvePoint {
  unemployment: number;
  inflation: number;
}

interface HoverInfo {
  x: number;
  y: number;
  unemployment: number;
  inflation: number;
}

// ----- Constants -----

const TABS: Array<{ id: View; label: string }> = [
  { id: 'basic', label: 'Basic Phillips Curve' },
  { id: 'expectations', label: 'Shifting Curves & Expectations' },
];

const COLORS = {
  primary: 'var(--color-primary-500)',
  amber: '#f59e0b',
  emerald: '#10b981',
  naturalRate: 'var(--color-text-muted)',
};

// SVG layout
const MARGIN = { top: 30, right: 30, bottom: 50, left: 55 };
const SVG_WIDTH = 700;
const SVG_HEIGHT = 380;
const PLOT_WIDTH = SVG_WIDTH - MARGIN.left - MARGIN.right;
const PLOT_HEIGHT = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;

// Axis ranges
const U_MIN = 2;
const U_MAX = 12;
const INF_MIN = 0;
const INF_MAX = 12;
const NATURAL_RATE = 5;

// ----- Helpers -----

function uToX(u: number): number {
  return MARGIN.left + ((u - U_MIN) / (U_MAX - U_MIN)) * PLOT_WIDTH;
}

function infToY(inf: number): number {
  return MARGIN.top + PLOT_HEIGHT - ((inf - INF_MIN) / (INF_MAX - INF_MIN)) * PLOT_HEIGHT;
}

function xToU(x: number): number {
  return U_MIN + ((x - MARGIN.left) / PLOT_WIDTH) * (U_MAX - U_MIN);
}

/**
 * Phillips Curve formula:
 *   inflation = expectations + alpha / (unemployment - beta)
 *
 * This gives a downward-sloping hyperbolic curve that rises sharply
 * as unemployment approaches beta from above.
 */
function phillipsCurve(
  unemployment: number,
  expectations: number,
  alpha: number = 8,
  beta: number = 1.5,
): number {
  if (unemployment <= beta) return INF_MAX + 1;
  return expectations + alpha / (unemployment - beta);
}

function generateCurvePoints(
  expectations: number,
  alpha: number = 8,
  beta: number = 1.5,
  steps: number = 100,
): CurvePoint[] {
  const points: CurvePoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const u = U_MIN + (i / steps) * (U_MAX - U_MIN);
    const inf = phillipsCurve(u, expectations, alpha, beta);
    if (inf >= INF_MIN && inf <= INF_MAX) {
      points.push({ unemployment: u, inflation: inf });
    }
  }
  return points;
}

function pointsToPath(points: CurvePoint[]): string {
  if (points.length === 0) return '';
  return points
    .map((p, i) => {
      const x = uToX(p.unemployment);
      const y = infToY(p.inflation);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

// ----- Explanations -----

const EXPLANATIONS: Record<View, { title: string; text: string }> = {
  basic: {
    title: 'The Original Phillips Curve',
    text: 'The Phillips Curve shows the inverse relationship between unemployment and inflation. When the economy is running hot (unemployment below the natural rate of ~5%), demand for workers pushes wages up, which feeds into higher prices. When unemployment rises above the natural rate, slack in the labor market reduces wage pressure and inflation falls. This tradeoff was first documented by A.W. Phillips in 1958 using UK data and became a cornerstone of macroeconomic policy.',
  },
  expectations: {
    title: 'Expectations Shift the Curve',
    text: 'The key insight of Friedman and Phelps (1968) was that the Phillips Curve is not stable. When people expect higher inflation, they demand higher wages and set higher prices even before any change in unemployment. This shifts the entire curve upward. In the 1970s, oil shocks raised inflation expectations from ~2% to ~6%, and the old tradeoff broke down -- the US experienced both high unemployment and high inflation (stagflation). By the 2000s, the Fed had anchored expectations near 2%, producing a flatter, lower curve. Use the slider to see how changing expectations shifts the curve.',
  },
};

// ----- Component -----

export default function PhillipsCurveDashboard() {
  const [activeView, setActiveView] = useState<View>('basic');
  const [inflationExpectations, setInflationExpectations] = useState(4);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  // Basic curve (expectations ~2%)
  const basicCurve = useMemo(() => generateCurvePoints(0), []);

  // Historical era curves
  const curve1960s = useMemo(() => generateCurvePoints(0, 8, 1.5), []);
  const curve1970s = useMemo(() => generateCurvePoints(4, 8, 1.5), []);
  const curve2000s = useMemo(() => generateCurvePoints(0, 4, 1.0), []);

  // User-controlled curve
  const userCurve = useMemo(
    () => generateCurvePoints(inflationExpectations - 2, 8, 1.5),
    [inflationExpectations],
  );

  // Handle mouse move on SVG for hover tooltip
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const scaleX = SVG_WIDTH / rect.width;
      const clientX = (e.clientX - rect.left) * scaleX;
      const clientY = (e.clientY - rect.top) * (SVG_HEIGHT / rect.height);

      if (
        clientX < MARGIN.left ||
        clientX > SVG_WIDTH - MARGIN.right ||
        clientY < MARGIN.top ||
        clientY > SVG_HEIGHT - MARGIN.bottom
      ) {
        setHoverInfo(null);
        return;
      }

      const u = xToU(clientX);
      let inf: number;

      if (activeView === 'basic') {
        inf = phillipsCurve(u, 0);
      } else {
        inf = phillipsCurve(u, inflationExpectations - 2);
      }

      if (inf < INF_MIN || inf > INF_MAX) {
        setHoverInfo(null);
        return;
      }

      setHoverInfo({
        x: uToX(u),
        y: infToY(inf),
        unemployment: u,
        inflation: inf,
      });
    },
    [activeView, inflationExpectations],
  );

  const handleMouseLeave = useCallback(() => {
    setHoverInfo(null);
  }, []);

  const explanation = EXPLANATIONS[activeView];

  return (
    <div className={cn('w-full max-w-5xl mx-auto')}>
      {/* Container */}
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid var(--color-surface-2)',
          backgroundColor: 'var(--color-surface-1)',
          padding: '24px',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: '19px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: '6px',
            }}
          >
            Phillips Curve Dashboard
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}
          >
            Explore the relationship between unemployment and inflation, and how
            expectations shift the tradeoff.
          </p>
        </div>

        {/* Tab buttons */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
          {TABS.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveView(tab.id);
                setHoverInfo(null);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                borderRadius: '999px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                border:
                  activeView === tab.id
                    ? '2px solid color-mix(in srgb, var(--color-primary) 70%, transparent)'
                    : '1px solid var(--color-surface-2)',
                color:
                  activeView === tab.id
                    ? 'var(--color-primary)'
                    : 'var(--color-text-secondary)',
                background:
                  activeView === tab.id
                    ? 'color-mix(in srgb, var(--color-primary) 14%, transparent)'
                    : 'var(--color-surface-0)',
              }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {activeView === 'basic' ? (
            <motion.div
              key="basic"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* SVG Chart */}
              <div
                style={{
                  borderRadius: '12px',
                  border: '1px solid var(--color-surface-2)',
                  backgroundColor: 'var(--color-surface-0)',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <svg
                  viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                  style={{ width: '100%', height: 'auto' }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Grid lines */}
                  <GridLines />

                  {/* Natural rate vertical dashed line */}
                  <NaturalRateLine />

                  {/* Basic Phillips Curve */}
                  <path
                    d={pointsToPath(basicCurve)}
                    fill="none"
                    stroke="var(--color-primary-500)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Annotation labels on the curve */}
                  <CurveAnnotation
                    points={basicCurve}
                    uTarget={3.5}
                    label="High inflation"
                    sublabel="(overheating)"
                    offsetY={-18}
                    color="var(--color-primary-500)"
                  />
                  <CurveAnnotation
                    points={basicCurve}
                    uTarget={8}
                    label="Low inflation"
                    sublabel="(slack economy)"
                    offsetY={18}
                    color="var(--color-primary-500)"
                  />

                  {/* Axis labels */}
                  <AxisLabels />

                  {/* Hover tooltip */}
                  {hoverInfo && <HoverTooltip info={hoverInfo} />}
                </svg>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expectations"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Slider for inflation expectations */}
              <div
                style={{
                  borderRadius: '12px',
                  border: '1px solid var(--color-surface-2)',
                  backgroundColor: 'var(--color-surface-0)',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <Slider
                  label="Inflation Expectations"
                  value={inflationExpectations}
                  onChange={setInflationExpectations}
                  min={0}
                  max={10}
                  step={0.5}
                  unit="%"
                />
              </div>

              {/* SVG Chart with multiple curves */}
              <div
                style={{
                  borderRadius: '12px',
                  border: '1px solid var(--color-surface-2)',
                  backgroundColor: 'var(--color-surface-0)',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <svg
                  viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                  style={{ width: '100%', height: 'auto' }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Grid lines */}
                  <GridLines />

                  {/* Natural rate vertical dashed line */}
                  <NaturalRateLine />

                  {/* 1960s curve -- primary/blue */}
                  <path
                    d={pointsToPath(curve1960s)}
                    fill="none"
                    stroke="var(--color-primary-500)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.7}
                  />

                  {/* 1970s curve -- amber/orange */}
                  <path
                    d={pointsToPath(curve1970s)}
                    fill="none"
                    stroke={COLORS.amber}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.7}
                  />

                  {/* 2000s curve -- green/emerald */}
                  <path
                    d={pointsToPath(curve2000s)}
                    fill="none"
                    stroke={COLORS.emerald}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.7}
                  />

                  {/* User-controlled curve -- bold dashed */}
                  <path
                    d={pointsToPath(userCurve)}
                    fill="none"
                    stroke="var(--color-text-primary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 4"
                  />

                  {/* Era labels along curves */}
                  <EraLabel
                    points={curve1960s}
                    uTarget={9}
                    label="1960s"
                    sublabel="(expectations ~2%)"
                    color="var(--color-primary-500)"
                  />
                  <EraLabel
                    points={curve1970s}
                    uTarget={9}
                    label="1970s"
                    sublabel="(expectations ~6%)"
                    color={COLORS.amber}
                  />
                  <EraLabel
                    points={curve2000s}
                    uTarget={9}
                    label="2000s"
                    sublabel="(anchored ~2%, flatter)"
                    color={COLORS.emerald}
                  />
                  <EraLabel
                    points={userCurve}
                    uTarget={6}
                    label={`Your curve (${inflationExpectations.toFixed(1)}%)`}
                    sublabel=""
                    color="var(--color-text-primary)"
                  />

                  {/* Axis labels */}
                  <AxisLabels />

                  {/* Hover tooltip */}
                  {hoverInfo && <HoverTooltip info={hoverInfo} />}
                </svg>

                {/* Legend */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginTop: '12px',
                    justifyContent: 'center',
                  }}
                >
                  <LegendItem
                    color="var(--color-primary-500)"
                    label="1960s (expectations ~2%)"
                  />
                  <LegendItem
                    color={COLORS.amber}
                    label="1970s (expectations ~6%)"
                  />
                  <LegendItem
                    color={COLORS.emerald}
                    label="2000s (anchored ~2%, flatter)"
                  />
                  <LegendItem
                    color="var(--color-text-primary)"
                    label="Your curve"
                    dashed
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explanation text */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{
            borderRadius: '12px',
            border: '1px solid color-mix(in srgb, var(--color-primary) 18%, transparent)',
            backgroundColor:
              'color-mix(in srgb, var(--color-primary) 5%, var(--color-surface-1))',
            padding: '16px 18px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--color-primary)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {explanation.title}
          </div>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            {explanation.text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ----- Sub-components -----

function GridLines() {
  const xTicks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const yTicks = [0, 2, 4, 6, 8, 10, 12];

  return (
    <g>
      {/* Horizontal grid lines */}
      {yTicks.map((tick) => {
        const y = infToY(tick);
        return (
          <g key={`y-${tick}`}>
            <line
              x1={MARGIN.left}
              y1={y}
              x2={SVG_WIDTH - MARGIN.right}
              y2={y}
              stroke="var(--color-surface-2)"
              strokeWidth="1"
            />
            <text
              x={MARGIN.left - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--color-text-muted)"
            >
              {tick}%
            </text>
          </g>
        );
      })}

      {/* Vertical grid lines */}
      {xTicks.map((tick) => {
        const x = uToX(tick);
        return (
          <g key={`x-${tick}`}>
            <line
              x1={x}
              y1={MARGIN.top}
              x2={x}
              y2={SVG_HEIGHT - MARGIN.bottom}
              stroke="var(--color-surface-2)"
              strokeWidth="1"
            />
            <text
              x={x}
              y={SVG_HEIGHT - MARGIN.bottom + 20}
              textAnchor="middle"
              fontSize="11"
              fill="var(--color-text-muted)"
            >
              {tick}%
            </text>
          </g>
        );
      })}

      {/* Axes */}
      <line
        x1={MARGIN.left}
        y1={SVG_HEIGHT - MARGIN.bottom}
        x2={SVG_WIDTH - MARGIN.right}
        y2={SVG_HEIGHT - MARGIN.bottom}
        stroke="var(--color-text-muted)"
        strokeWidth="1.5"
      />
      <line
        x1={MARGIN.left}
        y1={MARGIN.top}
        x2={MARGIN.left}
        y2={SVG_HEIGHT - MARGIN.bottom}
        stroke="var(--color-text-muted)"
        strokeWidth="1.5"
      />
    </g>
  );
}

function NaturalRateLine() {
  const x = uToX(NATURAL_RATE);

  return (
    <g>
      <line
        x1={x}
        y1={MARGIN.top}
        x2={x}
        y2={SVG_HEIGHT - MARGIN.bottom}
        stroke="var(--color-text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      <text
        x={x}
        y={MARGIN.top - 8}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="var(--color-text-muted)"
      >
        Natural Rate (~5%)
      </text>
    </g>
  );
}

function AxisLabels() {
  return (
    <g>
      {/* X-axis label */}
      <text
        x={MARGIN.left + PLOT_WIDTH / 2}
        y={SVG_HEIGHT - 6}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="var(--color-text-secondary)"
      >
        Unemployment Rate
      </text>
      {/* Y-axis label */}
      <text
        x={14}
        y={MARGIN.top + PLOT_HEIGHT / 2}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="var(--color-text-secondary)"
        transform={`rotate(-90, 14, ${MARGIN.top + PLOT_HEIGHT / 2})`}
      >
        Inflation Rate
      </text>
    </g>
  );
}

function CurveAnnotation({
  points,
  uTarget,
  label,
  sublabel,
  offsetY,
  color,
}: {
  points: CurvePoint[];
  uTarget: number;
  label: string;
  sublabel: string;
  offsetY: number;
  color: string;
}) {
  // Find the closest point to uTarget
  let closest = points[0];
  let minDist = Math.abs(points[0].unemployment - uTarget);
  for (const p of points) {
    const dist = Math.abs(p.unemployment - uTarget);
    if (dist < minDist) {
      minDist = dist;
      closest = p;
    }
  }

  const x = uToX(closest.unemployment);
  const y = infToY(closest.inflation);

  return (
    <g>
      <circle cx={x} cy={y} r="4" fill={color} />
      <text
        x={x}
        y={y + offsetY}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill={color}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x}
          y={y + offsetY + 14}
          textAnchor="middle"
          fontSize="10"
          fill="var(--color-text-muted)"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

function EraLabel({
  points,
  uTarget,
  label,
  sublabel,
  color,
}: {
  points: CurvePoint[];
  uTarget: number;
  label: string;
  sublabel: string;
  color: string;
}) {
  let closest = points[0];
  let minDist = Infinity;
  for (const p of points) {
    const dist = Math.abs(p.unemployment - uTarget);
    if (dist < minDist) {
      minDist = dist;
      closest = p;
    }
  }

  if (!closest) return null;

  const x = uToX(closest.unemployment);
  const y = infToY(closest.inflation);

  return (
    <g>
      <circle cx={x} cy={y} r="3.5" fill={color} />
      <text
        x={x + 8}
        y={y - 6}
        fontSize="11"
        fontWeight="600"
        fill={color}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + 8}
          y={y + 8}
          fontSize="9.5"
          fill="var(--color-text-muted)"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

function HoverTooltip({ info }: { info: HoverInfo }) {
  const tooltipWidth = 150;
  const tooltipHeight = 48;

  // Position tooltip so it does not overflow the SVG
  let tx = info.x + 12;
  let ty = info.y - tooltipHeight - 10;
  if (tx + tooltipWidth > SVG_WIDTH - MARGIN.right) {
    tx = info.x - tooltipWidth - 12;
  }
  if (ty < MARGIN.top) {
    ty = info.y + 16;
  }

  return (
    <g>
      {/* Crosshair lines */}
      <line
        x1={info.x}
        y1={MARGIN.top}
        x2={info.x}
        y2={SVG_HEIGHT - MARGIN.bottom}
        stroke="var(--color-text-muted)"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity={0.5}
      />
      <line
        x1={MARGIN.left}
        y1={info.y}
        x2={SVG_WIDTH - MARGIN.right}
        y2={info.y}
        stroke="var(--color-text-muted)"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity={0.5}
      />

      {/* Dot on curve */}
      <circle
        cx={info.x}
        cy={info.y}
        r="5"
        fill="var(--color-primary-500)"
        stroke="var(--color-surface-0)"
        strokeWidth="2"
      />

      {/* Tooltip background */}
      <rect
        x={tx}
        y={ty}
        width={tooltipWidth}
        height={tooltipHeight}
        rx="8"
        fill="var(--color-surface-1)"
        stroke="var(--color-surface-2)"
        strokeWidth="1"
      />

      {/* Tooltip text */}
      <text
        x={tx + 10}
        y={ty + 18}
        fontSize="11"
        fontWeight="600"
        fill="var(--color-text-primary)"
      >
        Unemployment: {info.unemployment.toFixed(1)}%
      </text>
      <text
        x={tx + 10}
        y={ty + 36}
        fontSize="11"
        fontWeight="600"
        fill="var(--color-text-primary)"
      >
        Inflation: {info.inflation.toFixed(1)}%
      </text>
    </g>
  );
}

function LegendItem({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <svg width="24" height="4" style={{ flexShrink: 0 }}>
        <line
          x1="0"
          y1="2"
          x2="24"
          y2="2"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={dashed ? '6 3' : 'none'}
        />
      </svg>
      <span
        style={{
          fontSize: '12px',
          color: 'var(--color-text-secondary)',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export { PhillipsCurveDashboard };
