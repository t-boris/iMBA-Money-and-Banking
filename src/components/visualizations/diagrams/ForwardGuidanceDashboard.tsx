'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ForwardGuidanceDashboardProps {
  className?: string;
}

type TabId = 'sep' | 'dot-plot';
type YearKey = '2021' | '2022' | '2023' | 'longer-run';

interface SEPData { min: number; max: number; median: number }
interface SEPVariable {
  name: string; unit: string; color: string;
  data: Record<YearKey, SEPData>;
}

const sepVariables: SEPVariable[] = [
  { name: 'Real GDP Growth', unit: '%', color: 'rgb(59, 130, 246)', data: {
    '2021': { min: 5.0, max: 7.3, median: 6.5 }, '2022': { min: 3.0, max: 3.8, median: 3.3 },
    '2023': { min: 2.0, max: 2.5, median: 2.2 }, 'longer-run': { min: 1.7, max: 2.0, median: 1.8 },
  }},
  { name: 'Unemployment', unit: '%', color: 'rgb(245, 158, 11)', data: {
    '2021': { min: 4.0, max: 4.7, median: 4.5 }, '2022': { min: 3.5, max: 4.2, median: 3.9 },
    '2023': { min: 3.3, max: 4.0, median: 3.5 }, 'longer-run': { min: 3.5, max: 4.3, median: 4.0 },
  }},
  { name: 'Inflation (PCE)', unit: '%', color: 'rgb(239, 68, 68)', data: {
    '2021': { min: 2.0, max: 2.4, median: 2.2 }, '2022': { min: 1.9, max: 2.3, median: 2.0 },
    '2023': { min: 2.0, max: 2.2, median: 2.1 }, 'longer-run': { min: 2.0, max: 2.0, median: 2.0 },
  }},
  { name: 'Fed Funds Rate', unit: '%', color: 'rgb(16, 185, 129)', data: {
    '2021': { min: 0.125, max: 0.125, median: 0.125 }, '2022': { min: 0.125, max: 0.375, median: 0.125 },
    '2023': { min: 0.125, max: 1.625, median: 0.125 }, 'longer-run': { min: 2.0, max: 3.0, median: 2.5 },
  }},
];

interface DotCluster { rate: number; count: number }
const dotPlotData: Array<{ year: string; dots: DotCluster[] }> = [
  { year: '2021', dots: [{ rate: 0.125, count: 18 }] },
  { year: '2022', dots: [{ rate: 0.125, count: 14 }, { rate: 0.375, count: 4 }] },
  { year: '2023', dots: [
    { rate: 0.125, count: 7 }, { rate: 0.375, count: 4 }, { rate: 0.625, count: 3 },
    { rate: 0.875, count: 2 }, { rate: 1.125, count: 1 }, { rate: 1.625, count: 1 },
  ]},
  { year: 'Longer run', dots: [
    { rate: 2.0, count: 1 }, { rate: 2.5, count: 7 }, { rate: 2.75, count: 5 },
    { rate: 3.0, count: 2 }, { rate: 3.25, count: 1 }, { rate: 3.5, count: 2 },
  ]},
];

const yearLabels: { id: YearKey; label: string }[] = [
  { id: '2021', label: '2021' }, { id: '2022', label: '2022' },
  { id: '2023', label: '2023' }, { id: 'longer-run', label: 'Longer Run' },
];

const tabs: { id: TabId; label: string }[] = [
  { id: 'sep', label: 'Economic Projections (SEP)' },
  { id: 'dot-plot', label: 'Dot Plot' },
];

function computeMedian(dots: DotCluster[]): number {
  const all: number[] = [];
  for (const c of dots) for (let i = 0; i < c.count; i++) all.push(c.rate);
  all.sort((a, b) => a - b);
  const mid = Math.floor(all.length / 2);
  return all.length % 2 === 0 ? (all[mid - 1] + all[mid]) / 2 : all[mid];
}

const spring = { type: 'spring' as const, stiffness: 250, damping: 28 };

const panelStyle = {
  padding: '20px', borderRadius: '12px',
  backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-surface-2)',
};

function PillButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      borderRadius: '999px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
      border: active ? '1px solid color-mix(in srgb, var(--color-primary) 60%, transparent)' : '1px solid var(--color-surface-2)',
      color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
      background: active ? 'color-mix(in srgb, var(--color-primary) 14%, transparent)' : 'var(--color-surface-1)',
    }}>{children}</button>
  );
}

function InsightBox({ icon, title, text, color }: { icon: string; title: string; text: string; color: string }) {
  return (
    <div style={{ padding: '14px 18px', backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`, borderRadius: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <span style={{ fontSize: '18px', lineHeight: '1' }}>{icon}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{title}</div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function ForwardGuidanceDashboard({ className }: ForwardGuidanceDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('sep');
  const [selectedYear, setSelectedYear] = useState<YearKey>('2021');
  const [hoveredCluster, setHoveredCluster] = useState<{ year: string; rate: number } | null>(null);

  // Dot plot SVG constants
  const svgW = 640, svgH = 380;
  const cL = 60, cR = svgW - 30, cT = 20, cB = svgH - 50;
  const rateMax = 3.75;

  const rateToY = (r: number) => cB - (r / rateMax) * (cB - cT);

  const yearPositions = useMemo(() => {
    const colW = (cR - cL) / dotPlotData.length;
    return dotPlotData.map((_, i) => cL + colW * i + colW / 2);
  }, []);

  const medians = useMemo(() =>
    dotPlotData.map((yd, i) => ({ x: yearPositions[i], y: rateToY(computeMedian(yd.dots)), median: computeMedian(yd.dots) })),
  [yearPositions]);

  const getSEPScale = (v: SEPVariable) => Math.max(...Object.values(v.data).flatMap((d) => [d.min, d.max])) * 1.2;

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Header */}
      <div style={{
        padding: '18px', borderRadius: '14px', border: '1px solid var(--color-surface-2)',
        background: 'linear-gradient(140deg, color-mix(in srgb, var(--color-primary) 10%, transparent), var(--color-surface-1))',
        marginBottom: '20px',
      }}>
        <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Forward Guidance Dashboard</h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
          FOMC Summary of Economic Projections (March 2021) -- how the Fed communicates its outlook to shape market expectations.
        </p>
      </div>

      {/* Tab selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {tabs.map((tab) => <PillButton key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>{tab.label}</PillButton>)}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'sep' && (
          <motion.div key="sep" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={spring}>
            {/* Year selector */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '18px', flexWrap: 'wrap' }}>
              {yearLabels.map((yr) => (
                <button key={yr.id} onClick={() => setSelectedYear(yr.id)} style={{
                  borderRadius: '8px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  border: selectedYear === yr.id ? '2px solid var(--color-primary)' : '1px solid var(--color-surface-2)',
                  color: selectedYear === yr.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  background: selectedYear === yr.id ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)' : 'var(--color-surface-1)',
                }}>{yr.label}</button>
              ))}
            </div>

            {/* SEP Variables */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {sepVariables.map((variable, vi) => {
                const d = variable.data[selectedYear];
                const scale = getSEPScale(variable);
                const barL = (d.min / scale) * 100, barR = (d.max / scale) * 100, medPos = (d.median / scale) * 100;
                const isPoint = d.min === d.max;

                return (
                  <motion.div key={variable.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: vi * 0.06, ...spring }} style={{ padding: '16px 20px', borderRadius: '12px', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-surface-2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: variable.color }}>{variable.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                        {isPoint ? `${d.median.toFixed(3)}${variable.unit}` : `${d.min.toFixed(1)} - ${d.max.toFixed(1)}${variable.unit}`}
                      </span>
                    </div>
                    {/* Range bar */}
                    <div style={{ position: 'relative', height: '28px', marginBottom: '4px' }}>
                      <div style={{ position: 'absolute', top: '11px', left: 0, right: 0, height: '6px', backgroundColor: 'var(--color-surface-2)', borderRadius: '3px' }} />
                      <motion.div initial={false} animate={{ left: `${barL}%`, width: `${Math.max(barR - barL, 0.5)}%` }}
                        transition={spring} style={{ position: 'absolute', top: '6px', height: '16px', backgroundColor: `color-mix(in srgb, ${variable.color} 25%, transparent)`, border: `1px solid color-mix(in srgb, ${variable.color} 50%, transparent)`, borderRadius: '4px' }} />
                      <motion.div initial={false} animate={{ left: `${medPos}%` }} transition={spring}
                        style={{ position: 'absolute', top: '4px', width: '20px', height: '20px', marginLeft: '-10px', borderRadius: '50%', backgroundColor: variable.color, border: '2px solid white', boxShadow: `0 0 0 1px ${variable.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '8px', fontWeight: 700, color: 'white' }}>M</span>
                      </motion.div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>0{variable.unit}</span>
                      <span style={{ fontSize: '10px', color: variable.color, fontWeight: 600 }}>
                        Median: {d.median.toFixed(variable.name === 'Fed Funds Rate' ? 3 : 1)}{variable.unit}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{scale.toFixed(1)}{variable.unit}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div style={{ marginTop: '16px' }}>
              <InsightBox icon="&#128270;" title="Key Insight" color="rgb(99, 102, 241)"
                text="Short-run dispersion, long-run convergence -- FOMC participants disagree more about the near-term outlook but converge toward similar long-run equilibrium values. This reflects greater uncertainty about the path than the destination." />
            </div>
          </motion.div>
        )}

        {activeTab === 'dot-plot' && (
          <motion.div key="dot-plot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={spring}>
            <div style={{ ...panelStyle, marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                FOMC Participants&apos; Assessments of Appropriate Monetary Policy
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Federal funds rate at year-end (March 2021 projections) -- each dot represents one participant
              </div>

              <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: '340px' }}>
                {/* Grid lines at 0.5% intervals */}
                {Array.from({ length: Math.floor(rateMax / 0.5) + 1 }, (_, i) => i * 0.5).map((rate) => {
                  const y = rateToY(rate);
                  return (
                    <g key={`hg-${rate}`}>
                      <line x1={cL} y1={y} x2={cR} y2={y} stroke="var(--color-surface-2)" strokeWidth="1" />
                      <text x={cL - 8} y={y + 4} fontSize="10" fill="var(--color-text-muted)" textAnchor="end" fontFamily="monospace">{rate.toFixed(1)}%</text>
                    </g>
                  );
                })}

                {/* Tick marks at 0.125% */}
                {Array.from({ length: Math.round(rateMax / 0.125) + 1 }, (_, i) => i * 0.125).map((rate) => (
                  <line key={`tk-${rate}`} x1={cL - 3} y1={rateToY(rate)} x2={cL} y2={rateToY(rate)} stroke="var(--color-text-muted)" strokeWidth="0.5" />
                ))}

                {/* Axes */}
                <line x1={cL} y1={cB} x2={cR} y2={cB} stroke="var(--color-text-muted)" strokeWidth="1.2" />
                <line x1={cL} y1={cT} x2={cL} y2={cB} stroke="var(--color-text-muted)" strokeWidth="1.2" />

                {/* Vertical separators */}
                {dotPlotData.map((_, i) => {
                  if (i >= dotPlotData.length - 1) return null;
                  const colW = (cR - cL) / dotPlotData.length;
                  const x = cL + colW * (i + 1);
                  return <line key={`vs-${i}`} x1={x} y1={cT} x2={x} y2={cB} stroke="var(--color-surface-2)" strokeWidth="1" strokeDasharray="4 4" />;
                })}

                {/* X-axis labels */}
                {dotPlotData.map((yd, i) => (
                  <text key={`xl-${yd.year}`} x={yearPositions[i]} y={cB + 20} fontSize="12" fill="var(--color-text-primary)" textAnchor="middle" fontWeight="600">{yd.year}</text>
                ))}

                {/* Median line */}
                <polyline fill="none" stroke="rgb(239, 68, 68)" strokeWidth="2" strokeDasharray="6 4"
                  points={medians.map((m) => `${m.x},${m.y}`).join(' ')} />
                {medians.map((m, i) => <circle key={`md-${i}`} cx={m.x} cy={m.y} r="3" fill="rgb(239, 68, 68)" />)}
                <text x={cR - 4} y={medians[medians.length - 1].y - 10} fontSize="10" fill="rgb(239, 68, 68)" textAnchor="end" fontWeight="600">Median</text>

                {/* Dots */}
                {dotPlotData.map((yearData, yi) => {
                  const cx = yearPositions[yi];
                  return yearData.dots.map((cluster) => {
                    const y = rateToY(cluster.rate);
                    const isHov = hoveredCluster?.year === yearData.year && hoveredCluster?.rate === cluster.rate;
                    const totalW = (cluster.count - 1) * 12;
                    const startX = cx - totalW / 2;
                    return Array.from({ length: cluster.count }, (_, di) => (
                      <motion.circle key={`d-${yearData.year}-${cluster.rate}-${di}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, r: isHov ? 6.5 : 5 }}
                        transition={{ delay: yi * 0.1 + di * 0.02, type: 'spring', stiffness: 300, damping: 20 }}
                        cx={startX + di * 12} cy={y}
                        fill={isHov ? 'rgb(99, 102, 241)' : 'rgb(59, 130, 246)'}
                        stroke="white" strokeWidth="1.5" style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredCluster({ year: yearData.year, rate: cluster.rate })}
                        onMouseLeave={() => setHoveredCluster(null)}
                        onClick={() => setHoveredCluster(isHov ? null : { year: yearData.year, rate: cluster.rate })}
                      />
                    ));
                  });
                })}

                {/* Tooltip */}
                {hoveredCluster && (() => {
                  const yi = dotPlotData.findIndex((yd) => yd.year === hoveredCluster.year);
                  const cluster = dotPlotData[yi]?.dots.find((d) => d.rate === hoveredCluster.rate);
                  if (!cluster || yi < 0) return null;
                  const tx = yearPositions[yi], ty = rateToY(hoveredCluster.rate) - 20;
                  const label = `${cluster.count} participant${cluster.count > 1 ? 's' : ''} at ${hoveredCluster.rate.toFixed(3)}%`;
                  const tw = label.length * 5.8 + 16;
                  return (
                    <g>
                      <rect x={tx - tw / 2} y={ty - 12} width={tw} height="22" rx="6" fill="var(--color-surface-2)" stroke="var(--color-surface-2)" />
                      <text x={tx} y={ty + 3} fontSize="10" fill="var(--color-text-primary)" textAnchor="middle" fontWeight="600">{label}</text>
                    </g>
                  );
                })()}

                {/* Y-axis label */}
                <text x="14" y={(cT + cB) / 2} fontSize="11" fill="var(--color-text-muted)" textAnchor="middle"
                  transform={`rotate(-90, 14, ${(cT + cB) / 2})`}>Federal Funds Rate</text>
              </svg>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgb(59, 130, 246)', border: '1.5px solid white', boxShadow: '0 0 0 1px rgb(59, 130, 246)' }} />
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Individual participant</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '20px', height: '2px', borderBottom: '2px dashed rgb(239, 68, 68)' }} />
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Median projection</span>
                </div>
              </div>
            </div>

            <InsightBox icon="&#128200;" title="Reading the Dot Plot" color="rgb(59, 130, 246)"
              text="In March 2021, nearly all participants expected rates to stay near zero through 2021-2022. The dispersion in 2023 shows growing disagreement about when liftoff should begin. The longer-run dots cluster around 2.5%, representing the perceived neutral rate -- where policy is neither stimulative nor restrictive." />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom takeaway */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 25 }}
        style={{ marginTop: '20px', padding: '14px 18px', backgroundColor: 'var(--color-surface-2)', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.65', margin: 0, fontStyle: 'italic' }}>
          Forward guidance shapes expectations about future rates, which in turn influence long-term rates and financial conditions today. By publishing projections and dot plots, the Fed effectively extends its policy lever beyond the overnight rate and into the yield curve.
        </p>
      </motion.div>
    </div>
  );
}
