'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface CentralBankTimelineProps {
  className?: string;
}

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  significance: string;
  icon: string;
  color: {
    bg: string;
    bgLight: string;
    border: string;
    borderLight: string;
    text: string;
    fill: string;
    gradient: string;
  };
}

const events: TimelineEvent[] = [
  {
    id: 'riksbank',
    year: 1668,
    title: 'Sveriges Riksbank Founded',
    description:
      'The Swedish Riksdag establishes the world\'s first central bank after Stockholms Banco collapsed from over-issuing paper notes (the first European banknotes). The lesson: a private bank with the power to create money will be tempted to create too much.',
    significance:
      'Established the precedent that money issuance requires public oversight. The Riksbank model showed that a government-backed institution could maintain monetary stability where private banks had failed.',
    icon: '\u{1F3DB}',
    color: {
      bg: 'bg-amber-500/20',
      bgLight: 'bg-amber-500/10',
      border: 'border-amber-500',
      borderLight: 'border-amber-500/30',
      text: 'text-amber-500',
      fill: 'bg-amber-500',
      gradient: 'from-amber-500/20 to-amber-600/10',
    },
  },
  {
    id: 'boe',
    year: 1694,
    title: 'Bank of England Established',
    description:
      'Created to fund King William III\'s war against France. Private investors lent the government \u00A31.2 million in exchange for the right to issue banknotes. It became the model for modern central banking.',
    significance:
      'Demonstrated the deep link between government finance and central banking. The Bank of England pioneered the role of lender of last resort and became the template other nations followed.',
    icon: '\u{1F3F0}',
    color: {
      bg: 'bg-emerald-500/20',
      bgLight: 'bg-emerald-500/10',
      border: 'border-emerald-500',
      borderLight: 'border-emerald-500/30',
      text: 'text-emerald-500',
      fill: 'bg-emerald-500',
      gradient: 'from-emerald-500/20 to-emerald-600/10',
    },
  },
  {
    id: 'first-bus',
    year: 1791,
    title: 'First Bank of the United States',
    description:
      'Alexander Hamilton championed a national bank to stabilize the new nation\'s finances, manage war debts, and establish a uniform currency. Opposed by Jefferson, its charter expired in 1811 and was not renewed.',
    significance:
      'The first American experiment in central banking. Its expiration showed the political difficulty of maintaining a central monetary authority in a nation suspicious of concentrated power.',
    icon: '\u{1F4DC}',
    color: {
      bg: 'bg-primary-500/20',
      bgLight: 'bg-primary-500/10',
      border: 'border-primary-500',
      borderLight: 'border-primary-500/30',
      text: 'text-primary-500',
      fill: 'bg-primary-500',
      gradient: 'from-primary-500/20 to-primary-600/10',
    },
  },
  {
    id: 'second-bus',
    year: 1816,
    title: 'Second Bank of the United States',
    description:
      'Chartered after financial chaos following the War of 1812. Operated successfully under Nicholas Biddle but was destroyed by President Andrew Jackson in the "Bank War." Its charter expired in 1836.',
    significance:
      'Jackson\'s veto of the recharter became a defining moment in American politics. Without a central bank, the U.S. experienced repeated financial panics for the next 77 years.',
    icon: '\u{2694}',
    color: {
      bg: 'bg-red-500/20',
      bgLight: 'bg-red-500/10',
      border: 'border-red-500',
      borderLight: 'border-red-500/30',
      text: 'text-red-500',
      fill: 'bg-red-500',
      gradient: 'from-red-500/20 to-red-600/10',
    },
  },
  {
    id: 'panic-1907',
    year: 1907,
    title: 'Panic of 1907',
    description:
      'A failed attempt to corner the copper market triggered a cascade of bank runs. J.P. Morgan personally organized a private bailout, locking bankers in his library until they agreed to provide liquidity.',
    significance:
      'Exposed the absurdity of relying on one private individual to save the financial system. Directly led to the creation of the National Monetary Commission and, ultimately, the Federal Reserve.',
    icon: '\u{1F4C9}',
    color: {
      bg: 'bg-orange-500/20',
      bgLight: 'bg-orange-500/10',
      border: 'border-orange-500',
      borderLight: 'border-orange-500/30',
      text: 'text-orange-500',
      fill: 'bg-orange-500',
      gradient: 'from-orange-500/20 to-orange-600/10',
    },
  },
  {
    id: 'fed-act',
    year: 1913,
    title: 'Federal Reserve Act Signed',
    description:
      'On December 23, 1913, President Woodrow Wilson signed the Federal Reserve Act, creating a system of 12 regional reserve banks overseen by a Board of Governors. It was a compromise between private banking interests and public accountability.',
    significance:
      'The Fed\'s decentralized structure (12 banks, not one) was a uniquely American solution balancing regional interests with national coordination. It remains the world\'s most influential central bank.',
    icon: '\u{1F3E6}',
    color: {
      bg: 'bg-emerald-500/20',
      bgLight: 'bg-emerald-500/10',
      border: 'border-emerald-500',
      borderLight: 'border-emerald-500/30',
      text: 'text-emerald-500',
      fill: 'bg-emerald-500',
      gradient: 'from-emerald-500/20 to-emerald-600/10',
    },
  },
  {
    id: 'gfc-2008',
    year: 2008,
    title: 'Global Financial Crisis',
    description:
      'The collapse of Lehman Brothers in September 2008 triggered the worst financial crisis since the Great Depression. The Fed expanded its balance sheet from ~$800 billion to over $4 trillion using unconventional tools: quantitative easing, emergency lending facilities, and forward guidance.',
    significance:
      'Demonstrated that central banks had become the ultimate backstop for the entire financial system. The crisis expanded the Fed\'s toolkit far beyond traditional interest rate policy and raised new questions about central bank independence and moral hazard.',
    icon: '\u{1F30D}',
    color: {
      bg: 'bg-primary-500/20',
      bgLight: 'bg-primary-500/10',
      border: 'border-primary-500',
      borderLight: 'border-primary-500/30',
      text: 'text-primary-500',
      fill: 'bg-primary-500',
      gradient: 'from-primary-500/20 to-primary-600/10',
    },
  },
];

export default function CentralBankTimeline({ className }: CentralBankTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
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

  // Calculate horizontal position as percentage (1668-2008)
  const getPosition = (year: number) => {
    const minYear = 1668;
    const maxYear = 2008;
    return ((year - minYear) / (maxYear - minYear)) * 100;
  };

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      {/* Header */}
      <div
        className={cn(
          'rounded-2xl border border-glass-border p-5 mb-6',
          'bg-gradient-to-br from-primary-500/10 to-surface-1'
        )}
      >
        <h3 className="text-lg font-bold text-text-primary">
          Evolution of Central Banking
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          From the first central bank to the modern Federal Reserve — 340 years of monetary history
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative pb-4 overflow-x-auto">
        <div className="min-w-[700px] px-8">
          {/* Timeline Track */}
          <div className="relative h-36">
            {/* Background track line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-glass-border rounded-full" />

            {/* Gradient overlay on track */}
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-amber-500/40 via-emerald-500/40 to-primary-500/40" />
            </div>

            {/* Event markers */}
            {events.map((event, index) => {
              const isSelected = selectedIndex === index;

              return (
                <motion.button
                  key={event.id}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none z-10"
                  style={{ left: `${getPosition(event.year)}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  onClick={() => handleEventClick(event, index)}
                >
                  {/* Event dot */}
                  <motion.div
                    className={cn(
                      'relative w-12 h-12 rounded-full flex items-center justify-center',
                      'border-2 transition-all duration-300 cursor-pointer',
                      'bg-glass-light backdrop-blur-md',
                      isSelected ? event.color.border : event.color.borderLight,
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
                    <span className="text-lg">{event.icon}</span>
                  </motion.div>

                  {/* Year label below */}
                  <motion.div
                    className={cn(
                      'absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap',
                      'text-xs font-bold transition-colors',
                      isSelected ? event.color.text : 'text-text-secondary'
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
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
            key={selectedEvent.id}
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
                selectedEvent.color.gradient
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedEvent.icon}</span>
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'text-2xl font-bold',
                          selectedEvent.color.text
                        )}
                      >
                        {selectedEvent.year}
                      </span>
                      <h3 className="text-lg font-bold text-text-primary">
                        {selectedEvent.title}
                      </h3>
                    </div>
                  </div>
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

              {/* Significance */}
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
                      'p-2 rounded-lg flex-shrink-0',
                      selectedEvent.color.bgLight
                    )}
                  >
                    <svg
                      className={cn('w-5 h-5', selectedEvent.color.text)}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary mb-1">
                      Why It Matters
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {selectedEvent.significance}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation hint when nothing selected */}
      {!selectedEvent && (
        <p className="text-center text-sm text-text-tertiary mt-6">
          Click on any event to explore its details and significance
        </p>
      )}

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={cn(
          'mt-8 p-5 rounded-xl',
          'bg-glass-light backdrop-blur-md',
          'border border-glass-border shadow-glass'
        )}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary-500/10 flex-shrink-0">
            <svg
              className="w-5 h-5 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary-500 mb-1">
              Key Insight
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Central banks arose because private control of money supply repeatedly led to
              instability. From Stockholms Banco over-issuing notes in the 1660s to J.P. Morgan
              single-handedly bailing out the banking system in 1907, history showed that monetary
              systems require a public institution with the authority and credibility to act as
              lender of last resort.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
