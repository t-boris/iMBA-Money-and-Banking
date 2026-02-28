'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { module7Lessons } from '@/data/module7';
import { LessonNav } from './LessonNav';
import {
  OkunsLawChart,
  PhillipsCurveDashboard,
  TaylorRuleCalculator,
  TransmissionMechanismFlow,
  BankTransmissionChannels,
  BusinessHouseholdTransmission,
  PolicyLimitsDashboard,
} from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface Module7ContentProps {
  className?: string;
}

interface LessonContentConfig {
  id: string;
  title: string;
  description: string;
  visualizations: React.ReactNode[];
}

export function Module7Content({ className }: Module7ContentProps) {
  const [activeLesson, setActiveLesson] = useState('7-0');
  const [direction, setDirection] = useState(0);

  const handleLessonChange = useCallback(
    (newLessonId: string) => {
      const currentIndex = module7Lessons.findIndex((lesson) => lesson.id === activeLesson);
      const newIndex = module7Lessons.findIndex((lesson) => lesson.id === newLessonId);
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
        const lessonExists = module7Lessons.some((lesson) => lesson.id === lessonId);
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
    '7-0': {
      id: '7-0',
      title: 'Overview: Economic Impacts of Monetary Policy',
      description:
        'How monetary policy decisions flow through the economy to affect GDP, unemployment, and inflation — and where those effects break down.',
      visualizations: [
        <SectionOverview
          key="section-7-0"
          title="Three Clusters of This Module"
          summary="Monetary policy impacts divide into macroeconomic linkages, transmission channels, and practical limits."
          points={[
            {
              id: '7-1',
              icon: '📉',
              title: 'Inflation & Unemployment',
              desc: "Okun's Law, the Phillips Curve, and policy rules like the Taylor Rule.",
            },
            {
              id: '7-2',
              icon: '🔗',
              title: 'Transmission Channels',
              desc: 'How rate changes flow through markets, banks, businesses, and households.',
            },
            {
              id: '7-3',
              icon: '🚧',
              title: 'Policy Limits',
              desc: 'Supply shocks, stagflation, jobless recoveries, and risk-taking.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '7-1': {
      id: '7-1',
      title: 'The Link Between Inflation and Unemployment',
      description:
        "Economic growth, Okun's Law, the Phillips Curve, inflation expectations, and the policy rules that tie them together.",
      visualizations: [
        <SectionOverview
          key="section-7-1"
          title="How This Section Fits Together"
          summary="GDP growth drives unemployment (Okun), unemployment drives inflation (Phillips), and policy rules respond to both gaps."
          points={[
            {
              id: '7-1.1',
              icon: '📊',
              title: 'Growth & Unemployment',
              desc: "GDP, Okun's Law, and the natural rate of unemployment.",
            },
            {
              id: '7-1.2',
              icon: '📈',
              title: 'Unemployment & Inflation',
              desc: 'The Phillips Curve and how expectations shift it.',
            },
            {
              id: '7-1.3',
              icon: '🎯',
              title: 'Policy Rules',
              desc: 'Output gap, Taylor Rule, and the K-rule alternative.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '7-1.1': {
      id: '7-1.1',
      title: 'Economic Growth and Unemployment',
      description:
        "GDP measurement, the relationship between real GDP growth and unemployment changes (Okun's Law), and the concept of the natural rate of unemployment.",
      visualizations: [<OkunsLawChart key="okun" />],
    },
    '7-1.2': {
      id: '7-1.2',
      title: 'Unemployment and Inflation',
      description:
        'The Phillips Curve tradeoff between unemployment and inflation, how inflation expectations shift the curve, and why anchored expectations matter.',
      visualizations: [<PhillipsCurveDashboard key="phillips" />],
    },
    '7-1.3': {
      id: '7-1.3',
      title: 'Monetary Policy Rules',
      description:
        'The output gap, the inflation gap, the Taylor Rule for setting interest rates, and the alternative K-rule for constant money growth.',
      visualizations: [<TaylorRuleCalculator key="taylor" />],
    },
    '7-2': {
      id: '7-2',
      title: 'Transmission of Monetary Policy',
      description:
        'How Fed rate changes propagate through market rates, banks, businesses, and households to affect real economic activity.',
      visualizations: [
        <SectionOverview
          key="section-7-2"
          title="The Transmission Pipeline"
          summary="A rate change flows through three layers: financial markets, banks, and the real economy of businesses and households."
          points={[
            {
              id: '7-2.1',
              icon: '💹',
              title: 'Markets & Lags',
              desc: 'Short-term → long-term rates, spending channels, 6-18 month lags.',
            },
            {
              id: '7-2.2',
              icon: '🏦',
              title: 'Through Banks',
              desc: 'NIM compression, reserve reduction, deposit outflows.',
            },
            {
              id: '7-2.3',
              icon: '🏠',
              title: 'Businesses & Households',
              desc: 'Borrowing costs, asset values, investment, housing, durables.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '7-2.1': {
      id: '7-2.1',
      title: 'Market Rates, Spending, and Lags',
      description:
        'From fed funds rate to long-term rates, spending channels (investment, housing, durables, exchange rate, equities), and the 6-18 month transmission lag.',
      visualizations: [<TransmissionMechanismFlow key="transmission" />],
    },
    '7-2.2': {
      id: '7-2.2',
      title: 'Transmission Through Banks',
      description:
        'Net interest margin compression, reserve reduction, deposit outflows — the three channels through which rate hikes squeeze bank lending.',
      visualizations: [<BankTransmissionChannels key="bank-channels" />],
    },
    '7-2.3': {
      id: '7-2.3',
      title: 'Transmission Through Businesses and Households',
      description:
        'How higher rates raise borrowing costs for firms and consumers, reduce asset values, and slow spending on investment, housing, and durable goods.',
      visualizations: [<BusinessHouseholdTransmission key="biz-household-transmission" />],
    },
    '7-3': {
      id: '7-3',
      title: 'Limits of Monetary Policy',
      description:
        'Where monetary policy fails: supply shocks and stagflation, jobless recoveries, and risk-taking channels that amplify instability.',
      visualizations: [
        <SectionOverview
          key="section-7-3"
          title="Where Policy Breaks Down"
          summary="Monetary policy cannot solve every economic problem — supply shocks, jobless recoveries, and risk-taking expose its limits."
          points={[
            {
              id: '7-3.1',
              icon: '🛢️',
              title: 'Supply Shocks',
              desc: 'Oil crises, stagflation, and the Volcker disinflation.',
            },
            {
              id: '7-3.2',
              icon: '⚠️',
              title: 'Jobless Recoveries & Risk',
              desc: 'GDP rebounds without jobs; low rates fuel bubbles.',
            },
          ]}
          onLessonChange={handleLessonChange}
        />,
      ],
    },
    '7-3.1': {
      id: '7-3.1',
      title: 'Supply Shocks and Stagflation',
      description:
        'Oil price shocks (1973, 1979), the stagflation dilemma of rising inflation with rising unemployment, and the Volcker disinflation.',
      visualizations: [<PolicyLimitsDashboard key="policy-limits" />],
    },
    '7-3.2': {
      id: '7-3.2',
      title: 'Jobless Recoveries and Risk-Taking',
      description:
        'Why GDP can recover while unemployment stays high, how low rates encourage excessive risk-taking (HELOCs, housing bubble), and the limits of rate policy.',
      visualizations: [<PolicyLimitsDashboard key="policy-limits-risk" />],
    },
  };

  const currentContent = lessonContent[activeLesson] || lessonContent['7-0'];

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
    <div className={cn('module-7-content', className)} style={{ width: '100%' }}>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block" style={{ width: '288px', flexShrink: 0 }}>
          <LessonNav
            lessons={module7Lessons}
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
  const currentIndex = module7Lessons.findIndex((lesson) => lesson.id === currentId);
  if (currentIndex <= 0) return null;

  for (let i = currentIndex - 1; i >= 0; i--) {
    const lesson = module7Lessons[i];
    const hasChildren = module7Lessons.some((candidate) => candidate.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}

function getNextLesson(currentId: string): string | null {
  const currentIndex = module7Lessons.findIndex((lesson) => lesson.id === currentId);
  if (currentIndex < 0 || currentIndex >= module7Lessons.length - 1) return null;

  for (let i = currentIndex + 1; i < module7Lessons.length; i++) {
    const lesson = module7Lessons[i];
    const hasChildren = module7Lessons.some((candidate) => candidate.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}
