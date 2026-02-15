'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { module5Lessons } from '@/data/module5';
import { LessonNav } from './LessonNav';
import {
  ShortTermFundingDashboard,
  InterestRateLab,
  MoneyMarketRunChart,
  SecuritizationPipeline,
  TEDSpreadTimeline,
} from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface Module5ContentProps {
  className?: string;
}

interface LessonContentConfig {
  id: string;
  title: string;
  description: string;
  visualizations: React.ReactNode[];
}

export function Module5Content({ className }: Module5ContentProps) {
  const [activeLesson, setActiveLesson] = useState('5-1');
  const [direction, setDirection] = useState(0);

  const handleLessonChange = useCallback(
    (newLessonId: string) => {
      const currentIndex = module5Lessons.findIndex((lesson) => lesson.id === activeLesson);
      const newIndex = module5Lessons.findIndex((lesson) => lesson.id === newLessonId);
      setDirection(newIndex > currentIndex ? 1 : -1);
      setActiveLesson(newLessonId);
    },
    [activeLesson],
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#lesson-')) {
        const lessonId = hash.replace('#lesson-', '');
        const lessonExists = module5Lessons.some((lesson) => lesson.id === lessonId);
        if (lessonExists && lessonId !== activeLesson) {
          handleLessonChange(lessonId);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeLesson, handleLessonChange]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeLesson]);

  const lessonContent: Record<string, LessonContentConfig> = {
    '5-1': {
      id: '5-1',
      title: 'Short-term Funding Markets',
      description:
        'This section explains how reserve markets and collateralized funding markets anchor policy-sensitive overnight rates.',
      visualizations: [
        <SectionOverview
          key='section-5-1'
          title='How This Section Fits Together'
          summary='Policy implementation starts in overnight markets and then propagates through benchmark rates into broader credit pricing.'
          points={[
            {
              id: '5-1.1',
              icon: '🏦',
              title: 'Federal Funds',
              desc: 'Reserve redistribution and the operating policy target.',
            },
            {
              id: '5-1.2',
              icon: '🔁',
              title: 'Repo Market',
              desc: 'Collateralized overnight liquidity and haircut mechanics.',
            },
            {
              id: '5-1.3',
              icon: '📏',
              title: 'Reference Rates',
              desc: 'LIBOR vs SOFR and secured-unsecured spread behavior.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '5-1.1': {
      id: '5-1.1',
      title: 'The Market for Federal Funds',
      description:
        'Reserves are redistributed overnight between banks. The federal funds rate is the key operational target influenced by reserve supply and demand.',
      visualizations: [<ShortTermFundingDashboard key='ff' initialView='federal-funds' singleView />],
    },
    '5-1.2': {
      id: '5-1.2',
      title: 'The Repo Market',
      description:
        'Repo funding is collateralized and large in scale. Haircuts are central to lender protection under collateral price uncertainty.',
      visualizations: [<ShortTermFundingDashboard key='repo' initialView='repo' singleView />],
    },
    '5-1.3': {
      id: '5-1.3',
      title: 'Short-term Interest Rates',
      description:
        'LIBOR and SOFR represent unsecured vs secured funding benchmarks. Their spread behavior reflects stress and benchmark design differences.',
      visualizations: [
        <ShortTermFundingDashboard key='rates' initialView='reference-rates' singleView />,
        <TEDSpreadTimeline key='ted' />,
      ],
    },
    '5-2': {
      id: '5-2',
      title: 'Treasury Rates and Yield Decomposition',
      description:
        'This section moves from short-term rates to nominal-real decomposition and the informational content of the Treasury curve.',
      visualizations: [
        <SectionOverview
          key='section-5-2'
          title='How to Read Rates Across Horizons'
          summary='We separate nominal yields into real-rate, inflation, and maturity components, then interpret curve shape as a macro signal.'
          points={[
            {
              id: '5-2.1',
              icon: '🧮',
              title: 'Nominal vs Real',
              desc: 'Fisher equation, TIPS, and breakeven inflation.',
            },
            {
              id: '5-2.2',
              icon: '🇺🇸',
              title: 'Treasuries',
              desc: 'Risk-free benchmark role and yield decomposition.',
            },
            {
              id: '5-2.3',
              icon: '📉',
              title: 'Term Structure',
              desc: '10Y-2Y slope and cycle/recession interpretation.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '5-2.1': {
      id: '5-2.1',
      title: 'Nominal and Real Interest Rates',
      description:
        'Use Fisher decomposition and TIPS logic to separate purchasing-power return from inflation compensation.',
      visualizations: [<InterestRateLab key='fisher' initialView='fisher' />],
    },
    '5-2.2': {
      id: '5-2.2',
      title: 'Treasury Securities and the Risk-Free Rate',
      description:
        'Treasuries are used as risk-free benchmarks because of low default risk and deep liquidity, but still carry inflation and duration-related price risk.',
      visualizations: [<InterestRateLab key='treasury' initialView='treasury' />],
    },
    '5-2.3': {
      id: '5-2.3',
      title: 'Term Structure of Interest Rates',
      description:
        'Yield-curve shape reflects expectations and term premia. Inversions (negative 10Y-2Y spread) often precede recessions.',
      visualizations: [<InterestRateLab key='curve' initialView='yield-curve' />],
    },
    '5-3': {
      id: '5-3',
      title: 'Nonbank Funding and Securitization',
      description:
        'Money market funds and securitization expand credit capacity but also create systemic sensitivity to short-term funding disruptions.',
      visualizations: [
        <SectionOverview
          key='section-5-3'
          title='Credit Supply Beyond Traditional Deposits'
          summary='Nonbank short-term funding and securitization pipelines can amplify credit expansion in booms and tighten sharply in stress periods.'
          points={[
            {
              id: '5-3.1',
              icon: '💵',
              title: 'Money Market Funds',
              desc: 'On-demand redemption and run-sensitive funding channels.',
            },
            {
              id: '5-3.2',
              icon: '🏗️',
              title: 'Securitization',
              desc: 'Pool-diversification, tranches, and warehouse funding dependence.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '5-3.1': {
      id: '5-3.1',
      title: 'Money Market Mutual Funds',
      description:
        'MMFs provide key short-term funding to financial institutions and corporates. Run dynamics can transmit stress rapidly through funding markets.',
      visualizations: [<MoneyMarketRunChart key='mmf' />],
    },
    '5-3.2': {
      id: '5-3.2',
      title: 'Securitization',
      description:
        'Loan pools are transformed into tranche structures that reallocate risk. Senior protection depends on credit performance and ongoing funding conditions.',
      visualizations: [<SecuritizationPipeline key='sec' />],
    },
  };

  const currentContent = lessonContent[activeLesson] || lessonContent['5-1'];

  const contentVariants = {
    enter: (slideDirection: number) => ({
      x: slideDirection > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (slideDirection: number) => ({
      x: slideDirection > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className={cn('module-5-content', className)} style={{ width: '100%' }}>
      <div className='flex flex-col lg:flex-row gap-8'>
        <aside className='hidden lg:block' style={{ width: '288px', flexShrink: 0 }}>
          <LessonNav
            lessons={module5Lessons}
            activeLesson={activeLesson}
            onLessonChange={handleLessonChange}
          />
        </aside>

        <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
          <AnimatePresence mode='wait' custom={direction}>
            <motion.div
              key={activeLesson}
              custom={direction}
              variants={contentVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              style={{ width: '100%' }}
            >
              <header style={{ marginBottom: '32px' }}>
                <h2
                  style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)' }}
                >
                  {currentContent.title}
                </h2>
                <p
                  style={{
                    color: 'var(--color-text-secondary)',
                    marginTop: '12px',
                    maxWidth: '700px',
                    lineHeight: '1.6',
                  }}
                >
                  {currentContent.description}
                </p>
              </header>

              {currentContent.visualizations.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {currentContent.visualizations.map((viz, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {viz}
                    </motion.div>
                  ))}
                </div>
              ) : null}

              <div className='flex justify-between items-center mt-12 pt-8 border-t border-surface-2'>
                {getPreviousLesson(activeLesson) ? (
                  <button
                    onClick={() => handleLessonChange(getPreviousLesson(activeLesson)!)}
                    className='flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors'
                  >
                    <span>&larr;</span>
                    <span>Previous Lesson</span>
                  </button>
                ) : (
                  <div />
                )}

                {getNextLesson(activeLesson) ? (
                  <button
                    onClick={() => handleLessonChange(getNextLesson(activeLesson)!)}
                    className='flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors'
                  >
                    <span>Next Lesson</span>
                    <span>&rarr;</span>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SectionOverview({
  title,
  summary,
  points,
  onLessonChange,
}: {
  title: string;
  summary: string;
  points: Array<{ id: string; icon: string; title: string; desc: string }>;
  onLessonChange: (id: string) => void;
}) {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-surface-2)',
        backgroundColor: 'var(--color-surface-1)',
        padding: '16px',
      }}
    >
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '8px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          lineHeight: '1.6',
          marginBottom: '14px',
        }}
      >
        {summary}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '10px',
        }}
      >
        {points.map((point) => (
          <button
            key={point.id}
            onClick={() => onLessonChange(point.id)}
            style={{
              borderRadius: '10px',
              border: '1px solid var(--color-surface-2)',
              backgroundColor: 'var(--color-surface-0)',
              padding: '12px',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '20px', lineHeight: 1 }}>{point.icon}</span>
            <span>
              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                {point.title}
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  marginTop: '4px',
                }}
              >
                {point.desc}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function getPreviousLesson(currentId: string): string | null {
  const currentIndex = module5Lessons.findIndex((lesson) => lesson.id === currentId);
  if (currentIndex <= 0) return null;

  for (let i = currentIndex - 1; i >= 0; i--) {
    const lesson = module5Lessons[i];
    const hasChildren = module5Lessons.some((candidate) => candidate.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}

function getNextLesson(currentId: string): string | null {
  const currentIndex = module5Lessons.findIndex((lesson) => lesson.id === currentId);
  if (currentIndex < 0 || currentIndex >= module5Lessons.length - 1) return null;

  for (let i = currentIndex + 1; i < module5Lessons.length; i++) {
    const lesson = module5Lessons[i];
    const hasChildren = module5Lessons.some((candidate) => candidate.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}
