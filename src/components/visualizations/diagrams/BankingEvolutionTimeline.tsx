'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface BankingEvolutionTimelineProps {
  className?: string;
}

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  impact: string;
  era: 'pre-regulation' | 'regulation' | 'deregulation';
}

const events: TimelineEvent[] = [
  {
    year: 1870,
    title: 'Unit Banking Era Begins',
    description:
      'States like Illinois restrict banks to single locations, prohibiting branch banking.',
    impact:
      'Fragmented system with thousands of small, vulnerable banks unable to diversify risk across regions.',
    era: 'pre-regulation',
  },
  {
    year: 1930,
    title: 'Great Depression Bank Failures',
    description:
      'Over 9,000 banks fail between 1930-1933, wiping out depositors savings.',
    impact:
      'Complete collapse of public trust in banking system, demand for federal intervention and deposit insurance.',
    era: 'pre-regulation',
  },
  {
    year: 1933,
    title: 'Glass-Steagall Act & FDIC',
    description:
      'Separates commercial and investment banking. Creates FDIC to insure deposits up to $2,500.',
    impact:
      'Restored public confidence, prevented bank runs, and created stable banking environment for decades.',
    era: 'regulation',
  },
  {
    year: 1935,
    title: 'Golden Age of Banking (3-6-3 Rule)',
    description:
      'Banks pay 3% on deposits, charge 6% on loans, and bankers are on the golf course by 3 PM.',
    impact:
      'Decades of stability and profitability with minimal innovation but also minimal risk.',
    era: 'regulation',
  },
  {
    year: 1956,
    title: 'Bank Holding Company Act',
    description:
      'Regulates companies that own banks, limiting their activities to banking-related business.',
    impact:
      'Prevented non-financial conglomerates from owning banks, maintained separation of banking and commerce.',
    era: 'regulation',
  },
  {
    year: 1980,
    title: 'Consolidation Begins',
    description:
      'Depository Institutions Deregulation Act phases out interest rate ceilings (Regulation Q).',
    impact:
      'Banks compete more aggressively for deposits, profit margins shrink, pressure for consolidation grows.',
    era: 'deregulation',
  },
  {
    year: 1994,
    title: 'Riegle-Neal Act',
    description:
      'Permits interstate banking and branching, ending geographic restrictions.',
    impact:
      'Enabled creation of truly national banks, accelerated consolidation from 14,000+ to fewer banks.',
    era: 'deregulation',
  },
  {
    year: 1999,
    title: 'Gramm-Leach-Bliley Act',
    description:
      'Repeals Glass-Steagall separation, allows banks to engage in securities and insurance.',
    impact:
      'Created financial supermarkets (Citigroup), increased interconnectedness and systemic risk.',
    era: 'deregulation',
  },
  {
    year: 2008,
    title: 'Financial Crisis',
    description:
      'Collapse of Lehman Brothers triggers global financial meltdown. Major banks require bailouts.',
    impact:
      'Largest financial crisis since Great Depression, led to Dodd-Frank reforms and new regulations.',
    era: 'deregulation',
  },
];

const eraColors = {
  'pre-regulation': {
    bg: 'bg-amber-500/20',
    bgLight: 'bg-amber-500/10',
    border: 'border-amber-500',
    borderLight: 'border-amber-500/30',
    text: 'text-amber-500',
    fill: 'bg-amber-500',
    gradient: 'from-amber-500/20 to-amber-600/10',
    label: 'Pre-Regulation Era',
  },
  regulation: {
    bg: 'bg-emerald-500/20',
    bgLight: 'bg-emerald-500/10',
    border: 'border-emerald-500',
    borderLight: 'border-emerald-500/30',
    text: 'text-emerald-500',
    fill: 'bg-emerald-500',
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    label: 'Regulation Era (Stability)',
  },
  deregulation: {
    bg: 'bg-primary-500/20',
    bgLight: 'bg-primary-500/10',
    border: 'border-primary-500',
    borderLight: 'border-primary-500/30',
    text: 'text-primary-500',
    fill: 'bg-primary-500',
    gradient: 'from-primary-500/20 to-primary-600/10',
    label: 'Deregulation Era',
  },
};

export function BankingEvolutionTimeline({
  className,
}: BankingEvolutionTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleEventClick = (event: TimelineEvent, index: number) => {
    if (selectedIndex === index) {
      setSelectedEvent(null);
      setSelectedIndex(null);
    } else {
      setSelectedEvent(event);
      setSelectedIndex(index);
    }
  };

  // Calculate position on timeline (1870-2008)
  const getPosition = (year: number) => {
    const minYear = 1870;
    const maxYear = 2008;
    return ((year - minYear) / (maxYear - minYear)) * 100;
  };

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      {/* Era Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.entries(eraColors).map(([era, colors]) => (
          <div key={era} className="flex items-center gap-2">
            <div className={cn('w-3 h-3 rounded-full', colors.fill)} />
            <span className="text-xs text-text-secondary">{colors.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline Container */}
      <div className="relative pb-4 overflow-x-auto">
        <div className="min-w-[700px] px-8">
          {/* Timeline Track */}
          <div className="relative h-32">
            {/* Background track */}
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-glass-border rounded-full" />

            {/* Era colored segments */}
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 flex">
              {/* Pre-regulation: 1870-1933 */}
              <div
                className="h-full bg-amber-500/50 rounded-l-full"
                style={{ width: `${getPosition(1933)}%` }}
              />
              {/* Regulation: 1933-1980 */}
              <div
                className="h-full bg-emerald-500/50"
                style={{ width: `${getPosition(1980) - getPosition(1933)}%` }}
              />
              {/* Deregulation: 1980-2008 */}
              <div
                className="h-full bg-primary-500/50 rounded-r-full"
                style={{ width: `${100 - getPosition(1980)}%` }}
              />
            </div>

            {/* Event markers */}
            {events.map((event, index) => {
              const isSelected = selectedIndex === index;
              const colors = eraColors[event.era];

              return (
                <motion.button
                  key={event.year}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none z-10"
                  style={{ left: `${getPosition(event.year)}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08, type: 'spring' }}
                  onClick={() => handleEventClick(event, index)}
                >
                  {/* Event dot */}
                  <motion.div
                    className={cn(
                      'relative w-10 h-10 rounded-full flex items-center justify-center',
                      'border-2 transition-all duration-300 cursor-pointer',
                      'bg-glass-light backdrop-blur-md',
                      isSelected ? colors.border : colors.borderLight,
                      isSelected && 'shadow-lg'
                    )}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      isSelected
                        ? {
                            boxShadow: [
                              '0 0 0 0 rgba(99, 102, 241, 0)',
                              '0 0 0 8px rgba(99, 102, 241, 0.1)',
                              '0 0 0 0 rgba(99, 102, 241, 0)',
                            ],
                          }
                        : {}
                    }
                    transition={
                      isSelected
                        ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                        : {}
                    }
                  >
                    {/* Inner dot */}
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full transition-all duration-300',
                        isSelected ? colors.fill : colors.bgLight
                      )}
                    />
                  </motion.div>

                  {/* Year label */}
                  <motion.div
                    className={cn(
                      'absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap',
                      'text-sm font-semibold transition-colors',
                      isSelected ? colors.text : 'text-text-secondary'
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                  >
                    {event.year}
                  </motion.div>

                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <motion.div
            key={selectedEvent.year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'mt-8 rounded-xl overflow-hidden',
              'bg-glass-light backdrop-blur-md',
              'border border-glass-border shadow-glass'
            )}
          >
            {/* Header gradient */}
            <div
              className={cn(
                'p-5 bg-gradient-to-r',
                eraColors[selectedEvent.era].gradient
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'text-2xl font-bold',
                        eraColors[selectedEvent.era].text
                      )}
                    >
                      {selectedEvent.year}
                    </span>
                    <h3 className="text-xl font-bold text-text-primary">
                      {selectedEvent.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">
                    {eraColors[selectedEvent.era].label}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    setSelectedIndex(null);
                  }}
                  className="p-2 rounded-lg hover:bg-glass-border transition-colors"
                  aria-label="Close details"
                >
                  <svg
                    className="w-5 h-5 text-text-tertiary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-2">
                  What Happened
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Impact */}
              <motion.div
                className={cn(
                  'p-4 rounded-lg',
                  'bg-surface-secondary/50 border border-glass-border'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      eraColors[selectedEvent.era].bgLight
                    )}
                  >
                    <svg
                      className={cn(
                        'w-5 h-5',
                        eraColors[selectedEvent.era].text
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary mb-1">
                      Long-term Impact
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {selectedEvent.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation hint */}
      {!selectedEvent && (
        <p className="text-center text-sm text-text-tertiary mt-6">
          Click on any event to explore its details and impact
        </p>
      )}
    </div>
  );
}
