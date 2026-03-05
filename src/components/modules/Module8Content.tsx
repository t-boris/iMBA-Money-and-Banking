'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { module8Lessons } from '@/data/module8';
import { LessonNav } from './LessonNav';
import {
  BankRunSimulator,
  Panic1907Timeline,
  GreatDepressionDashboard,
  CrisisPatternMatrix,
  AutoLoanCrisisFlow,
  LenderLastResortExplorer,
  FiscalResponseDashboard,
} from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface Module8ContentProps {
  className?: string;
}

interface LessonContentConfig {
  id: string;
  title: string;
  description: string;
  visualizations: React.ReactNode[];
}

export function Module8Content({ className }: Module8ContentProps) {
  const [activeLesson, setActiveLesson] = useState('8-0');
  const [direction, setDirection] = useState(0);

  const handleLessonChange = useCallback(
    (newLessonId: string) => {
      const currentIndex = module8Lessons.findIndex((lesson) => lesson.id === activeLesson);
      const newIndex = module8Lessons.findIndex((lesson) => lesson.id === newLessonId);
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
        const lessonExists = module8Lessons.some((lesson) => lesson.id === lessonId);
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
    '8-0': {
      id: '8-0',
      title: 'Overview: Financial Crises',
      description:
        'Why financial crises happen, how they spread, and what governments do to stop them — from the Panic of 1907 to the 2008 meltdown and COVID-19 response.',
      visualizations: [
        <SectionOverview
          key="section-8-0"
          title="Two Parts of This Module"
          summary="Financial crises follow predictable patterns. Understanding the mechanics of runs and contagion reveals why policy responses work (or fail)."
          points={[
            {
              id: '8-1',
              icon: '🔥',
              title: 'Understanding Crises',
              desc: 'Bank runs, the Great Depression, crisis patterns, and the 2008 auto loan crisis.',
            },
            {
              id: '8-2',
              icon: '🛡️',
              title: 'Policy Responses',
              desc: "Lender of last resort, fiscal stimulus, spending multipliers, and Bagehot's Dictum.",
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '8-1': {
      id: '8-1',
      title: 'Understanding Financial Crises',
      description:
        'Bank runs, the Great Depression, common crisis patterns, and how the 2008 auto loan crisis illustrates modern financial fragility.',
      visualizations: [
        <SectionOverview
          key="section-8-1"
          title="How This Section Fits Together"
          summary="Start with the mechanics of a bank run, see them play out in 1907 and the 1930s, then identify the universal pattern across 140 years of crises."
          points={[
            {
              id: '8-1.1',
              icon: '🏃',
              title: 'Bank Runs & 1907',
              desc: 'Maturity mismatch, illiquidity vs insolvency, and the panic that created the Fed.',
            },
            {
              id: '8-1.2',
              icon: '📉',
              title: 'Great Depression',
              desc: '9,000 bank failures, deflation spirals, and the birth of deposit insurance.',
            },
            {
              id: '8-1.3',
              icon: '🔄',
              title: 'Common Patterns',
              desc: 'Five crises, same DNA: credit boom, bad investment, run, contagion.',
            },
            {
              id: '8-1.4',
              icon: '🚗',
              title: 'Auto Loans (2008)',
              desc: 'ABCP, ABS, and how the shadow banking run crushed auto financing.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '8-1.1': {
      id: '8-1.1',
      title: 'Bank Runs and the Panic of 1907',
      description:
        'How maturity mismatch makes banks vulnerable to runs, the difference between illiquidity and insolvency, and how J.P. Morgan organized a private rescue before the Fed existed.',
      visualizations: [
        <BankRunSimulator key="bank-run-sim" />,
        <Panic1907Timeline key="panic-1907" />,
      ],
    },
    '8-1.2': {
      id: '8-1.2',
      title: 'The Great Depression',
      description:
        'The stock market crash, 9,000 bank failures, deflation spirals, and the policy responses — bank holidays, the Emergency Banking Act, Glass-Steagall, FDIC, and the New Deal.',
      visualizations: [<GreatDepressionDashboard key="depression" />],
    },
    '8-1.3': {
      id: '8-1.3',
      title: 'Common Features of Financial Crises',
      description:
        'Five crises across 140 years share the same DNA: excessive debt, short-term funding runs, bad long-term investments, and international contagion.',
      visualizations: [<CrisisPatternMatrix key="crisis-pattern" />],
    },
    '8-1.4': {
      id: '8-1.4',
      title: 'Auto Loans During the 2008 Crisis',
      description:
        'How captive finance companies funded auto loans through ABCP and ABS, why investors ran, and how the credit crunch crushed auto sales.',
      visualizations: [<AutoLoanCrisisFlow key="auto-loan" />],
    },
    '8-2': {
      id: '8-2',
      title: 'Policy Responses',
      description:
        'How the Fed acts as lender of last resort and how fiscal policy — stimulus checks, unemployment benefits, government spending — fights financial crises.',
      visualizations: [
        <SectionOverview
          key="section-8-2"
          title="Two Arms of Crisis Response"
          summary="Monetary policy (the Fed) stops the financial panic. Fiscal policy (Congress) fights the economic contraction."
          points={[
            {
              id: '8-2.1',
              icon: '🏛️',
              title: 'Lender of Last Resort',
              desc: "Bagehot's Dictum, 2008 vs 2020 facilities, and the expanding safety net.",
            },
            {
              id: '8-2.2',
              icon: '💵',
              title: 'Fiscal Responses',
              desc: 'GDP identity, spending multipliers, stimulus checks, and monetary-fiscal interaction.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '8-2.1': {
      id: '8-2.1',
      title: 'The Fed as Lender of Last Resort',
      description:
        "Bagehot's Dictum (lend freely, against good collateral, at a penalty rate), how the Fed expanded its safety net in 2008 and 2020, and the evolving scope of emergency lending.",
      visualizations: [<LenderLastResortExplorer key="lolr" />],
    },
    '8-2.2': {
      id: '8-2.2',
      title: 'Fiscal Responses to Financial Crises',
      description:
        'The GDP identity (Y = C + I + G + NX), government spending multipliers, stimulus checks and their spending patterns, unemployment benefits, and how fiscal and monetary policy interact.',
      visualizations: [<FiscalResponseDashboard key="fiscal" />],
    },
  };

  const currentContent = lessonContent[activeLesson] || lessonContent['8-0'];

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
    <div className={cn('module-8-content', className)} style={{ width: '100%' }}>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block" style={{ width: '288px', flexShrink: 0 }}>
          <LessonNav
            lessons={module8Lessons}
            activeLesson={activeLesson}
            onLessonChange={handleLessonChange}
          />
        </aside>

        <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeLesson}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
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

              <div className="flex justify-between items-center mt-12 pt-8 border-t border-surface-2">
                {getPreviousLesson(activeLesson) ? (
                  <button
                    onClick={() => handleLessonChange(getPreviousLesson(activeLesson)!)}
                    className="flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors"
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
                    className="flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors"
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
  const currentIndex = module8Lessons.findIndex((lesson) => lesson.id === currentId);
  if (currentIndex <= 0) return null;

  for (let i = currentIndex - 1; i >= 0; i--) {
    const lesson = module8Lessons[i];
    const hasChildren = module8Lessons.some((candidate) => candidate.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}

function getNextLesson(currentId: string): string | null {
  const currentIndex = module8Lessons.findIndex((lesson) => lesson.id === currentId);
  if (currentIndex < 0 || currentIndex >= module8Lessons.length - 1) return null;

  for (let i = currentIndex + 1; i < module8Lessons.length; i++) {
    const lesson = module8Lessons[i];
    const hasChildren = module8Lessons.some((candidate) => candidate.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}
