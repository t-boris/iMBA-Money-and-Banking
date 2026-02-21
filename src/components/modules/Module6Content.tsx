'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { module6Lessons } from '@/data/module6';
import { LessonNav } from './LessonNav';
import {
  CentralBankTimeline,
  FedStructureOrgChart,
  FedFunctionsPentagon,
  MoneySupplyCalculator,
  FedBalanceSheetExplorer,
  OpenMarketOperationsFlow,
  DiscountWindowCalculator,
  ForwardGuidanceDashboard,
  QEProgramsTimeline,
  AbundantReservesFloor,
} from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface Module6ContentProps {
  className?: string;
}

interface LessonContentConfig {
  id: string;
  title: string;
  description: string;
  visualizations: React.ReactNode[];
}

export function Module6Content({ className }: Module6ContentProps) {
  const [activeLesson, setActiveLesson] = useState('6-0');
  const [direction, setDirection] = useState(0);

  const handleLessonChange = useCallback(
    (newLessonId: string) => {
      const currentIndex = module6Lessons.findIndex((lesson) => lesson.id === activeLesson);
      const newIndex = module6Lessons.findIndex((lesson) => lesson.id === newLessonId);
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
        const lessonExists = module6Lessons.some((lesson) => lesson.id === lessonId);
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
    '6-0': {
      id: '6-0',
      title: 'Overview: Central Banks and Monetary Policy',
      description:
        'The Fed pursues a Dual Mandate — maximum employment and stable prices (~2% inflation). It wields traditional tools (open market operations, discount window) and unconventional tools (forward guidance, QE, administered rates) to steer the economy.',
      visualizations: [
        <SectionOverview
          key="section-6-0"
          title="Three Clusters of This Module"
          summary="Central banking divides into structure/mandate, traditional rate control, and crisis-era innovations."
          points={[
            {
              id: '6-1',
              icon: '🏛️',
              title: 'Structure & Mandate',
              desc: 'Why central banks exist, how the Fed is organized, and its five key functions.',
            },
            {
              id: '6-2',
              icon: '🔧',
              title: 'Traditional Toolkit',
              desc: 'Money supply, balance sheet mechanics, open market operations, and the discount window.',
            },
            {
              id: '6-3',
              icon: '🚀',
              title: 'Crisis Toolkit',
              desc: 'Forward guidance, quantitative easing, and the abundant reserves framework.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '6-1': {
      id: '6-1',
      title: 'The Federal Reserve',
      description:
        'Structure & Mandate — Why central banks exist, how the Fed is organized, and its five key functions.',
      visualizations: [
        <SectionOverview
          key="section-6-1"
          title="How This Section Fits Together"
          summary="Central banking emerged from repeated failures of private money control. The Fed's unique structure balances public and private interests."
          points={[
            {
              id: '6-1.1',
              icon: '📜',
              title: 'History & Structure',
              desc: 'From Riksbank (1668) to the Fed (1913): Board, 12 Banks, FOMC.',
            },
            {
              id: '6-1.2',
              icon: '⚙️',
              title: 'Purpose & Functions',
              desc: 'Five functions: monetary policy, stability, supervision, payments, consumer protection.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '6-1.1': {
      id: '6-1.1',
      title: 'History and Structure',
      description:
        'From the Riksbank (1668) to the Panic of 1907 and the Federal Reserve Act of 1913. Board of Governors, 12 Reserve Banks, and the FOMC.',
      visualizations: [<CentralBankTimeline key="timeline" />],
    },
    '6-1.2': {
      id: '6-1.2',
      title: 'Purpose and Functions',
      description:
        'The five functions of the Fed: monetary policy, financial stability, micro/macro-prudential supervision, payment system operation, and consumer protection.',
      visualizations: [
        <FedStructureOrgChart key="orgchart" />,
        <FedFunctionsPentagon key="pentagon" />,
      ],
    },
    '6-2': {
      id: '6-2',
      title: 'Traditional Monetary Policy',
      description:
        'Traditional Toolkit — How the Fed controls rates: money supply, balance sheet mechanics, open market operations, and the discount window.',
      visualizations: [
        <SectionOverview
          key="section-6-2"
          title="The Traditional Rate Control Pipeline"
          summary="The Fed adjusts the monetary base through open market operations, which changes bank reserves and moves the federal funds rate toward target."
          points={[
            {
              id: '6-2.1',
              icon: '💰',
              title: 'Money Supply',
              desc: 'M0 through M3 and the money multiplier process.',
            },
            {
              id: '6-2.2',
              icon: '📊',
              title: 'Balance Sheet',
              desc: 'Fed assets and liabilities — $630B (2007) vs $7.3T (2021).',
            },
            {
              id: '6-2.3',
              icon: '🔄',
              title: 'Open Market Operations',
              desc: 'Buying and selling Treasuries to move the fed funds rate.',
            },
            {
              id: '6-2.4',
              icon: '🪟',
              title: 'Discount Window',
              desc: 'Emergency lending and the rate corridor ceiling.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '6-2.1': {
      id: '6-2.1',
      title: 'Money Supply and Monetary Policy',
      description:
        'Monetary base, M1/M2/M3, the money multiplier, reserve requirements, and the Quantity Theory of Money.',
      visualizations: [<MoneySupplyCalculator key="money" />],
    },
    '6-2.2': {
      id: '6-2.2',
      title: "The Federal Reserve's Balance Sheet",
      description:
        'Assets (government securities, crisis facilities) and liabilities (currency, reserves). Pre-2008 $630B vs 2021 $7.3T expansion.',
      visualizations: [<FedBalanceSheetExplorer key="balance" />],
    },
    '6-2.3': {
      id: '6-2.3',
      title: 'Open Market Operations',
      description:
        'FOMC directives, the SOMA portfolio, primary dealers, and how buying/selling Treasuries shifts the federal funds rate.',
      visualizations: [<OpenMarketOperationsFlow key="omo" />],
    },
    '6-2.4': {
      id: '6-2.4',
      title: 'The Discount Window',
      description:
        'Discount loans, primary credit (max 90 days), collateral haircuts, and the discount rate as the rate corridor upper bound.',
      visualizations: [<DiscountWindowCalculator key="discount" />],
    },
    '6-3': {
      id: '6-3',
      title: 'Non-traditional Monetary Policy',
      description:
        "Crisis Toolkit — When traditional tools aren't enough: forward guidance, quantitative easing, and the abundant reserves framework.",
      visualizations: [
        <SectionOverview
          key="section-6-3"
          title="When Zero Bound Demands New Tools"
          summary="With short-term rates near zero after 2008, the Fed developed communication, large-scale purchases, and administered rates to control monetary conditions."
          points={[
            {
              id: '6-3.1',
              icon: '🗣️',
              title: 'Forward Guidance',
              desc: 'SEP, Dot Plot, and how communication shapes expectations.',
            },
            {
              id: '6-3.2',
              icon: '📈',
              title: 'QE Programs',
              desc: 'QE1-3, Operation Twist, and yield impact evidence.',
            },
            {
              id: '6-3.3',
              icon: '🏗️',
              title: 'Abundant Reserves',
              desc: 'IORB, ON RRP, and the modern rate corridor.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '6-3.1': {
      id: '6-3.1',
      title: 'Forward Guidance',
      description:
        'Summary of Economic Projections (SEP), the Dot Plot, expectations channel, and how communication shapes market behavior.',
      visualizations: [<ForwardGuidanceDashboard key="guidance" />],
    },
    '6-3.2': {
      id: '6-3.2',
      title: 'Large-Scale Asset Purchases',
      description:
        'QE1 ($1.25T MBS), QE2, Operation Twist, QE3, and COVID-era purchases. Yield impact evidence and the demand-shock mechanism.',
      visualizations: [<QEProgramsTimeline key="qe" />],
    },
    '6-3.3': {
      id: '6-3.3',
      title: 'Monetary Policy with Abundant Reserves',
      description:
        'The floor system: IORB as the bank floor, ON RRP as the non-bank sub-floor, and how administered rates replace open market operations.',
      visualizations: [<AbundantReservesFloor key="floor" />],
    },
  };

  const currentContent = lessonContent[activeLesson] || lessonContent['6-0'];

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
    <div className={cn('module-6-content', className)} style={{ width: '100%' }}>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block" style={{ width: '288px', flexShrink: 0 }}>
          <LessonNav
            lessons={module6Lessons}
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
  const currentIndex = module6Lessons.findIndex((lesson) => lesson.id === currentId);
  if (currentIndex <= 0) return null;

  for (let i = currentIndex - 1; i >= 0; i--) {
    const lesson = module6Lessons[i];
    const hasChildren = module6Lessons.some((candidate) => candidate.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}

function getNextLesson(currentId: string): string | null {
  const currentIndex = module6Lessons.findIndex((lesson) => lesson.id === currentId);
  if (currentIndex < 0 || currentIndex >= module6Lessons.length - 1) return null;

  for (let i = currentIndex + 1; i < module6Lessons.length; i++) {
    const lesson = module6Lessons[i];
    const hasChildren = module6Lessons.some((candidate) => candidate.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}
