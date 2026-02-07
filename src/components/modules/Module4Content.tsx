'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { module4Lessons } from '@/data/module4';
import { LessonNav } from './LessonNav';
import {
  RegulationOverviewFlow,
  ExternalityDiagram,
  SafetyNetFlow,
  ContagionNetwork,
  TEDSpreadTimeline,
  CapitalRequirementsCalculator,
  SupervisoryProcessFlow,
  CAMELSRadar,
  StressTestSimulator,
  TBTFConcentration,
  ShadowBankingComparison,
  MoneyMarketRunChart,
} from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface Module4ContentProps {
  className?: string;
}

// Lesson content configuration
interface LessonContentConfig {
  id: string;
  title: string;
  description: string;
  visualizations: React.ReactNode[];
}

export function Module4Content({ className }: Module4ContentProps) {
  const [activeLesson, setActiveLesson] = useState('4-0');
  const [direction, setDirection] = useState(0);

  // Get lesson order for animation direction
  const getLessonIndex = (lessonId: string) => {
    return module4Lessons.findIndex((l) => l.id === lessonId);
  };

  const handleLessonChange = (newLessonId: string) => {
    const currentIndex = getLessonIndex(activeLesson);
    const newIndex = getLessonIndex(newLessonId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveLesson(newLessonId);
  };

  // Handle URL hash navigation (e.g., #lesson-4-1.1)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#lesson-')) {
        const lessonId = hash.replace('#lesson-', '');
        const lessonExists = module4Lessons.some((l) => l.id === lessonId);
        if (lessonExists && lessonId !== activeLesson) {
          handleLessonChange(lessonId);
        }
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeLesson]);

  // Lesson content mapping
  const lessonContent: Record<string, LessonContentConfig> = {
    '4-0': {
      id: '4-0',
      title: 'Overview',
      description:
        'This module explores why banks are among the most regulated institutions, how the regulatory framework works, and the modern challenges regulators face \u2014 from too-big-to-fail to shadow banking.',
      visualizations: [<RegulationOverviewFlow key="rof" />],
    },
    '4-1': {
      id: '4-1',
      title: 'Understanding Bank Regulation',
      description:
        'Regulation exists because bank failures create negative externalities \u2014 spillover costs that individual banks don\u2019t internalize. The challenge is balancing stability with efficiency.',
      visualizations: [], // Parent section intro
    },
    '4-1.1': {
      id: '4-1.1',
      title: 'Goals of Financial Regulation',
      description:
        'Banks create value through credit and payments, but their failure imposes costs on society. Regulation addresses market failures through microprudential (individual bank) and macroprudential (system-wide) approaches.',
      visualizations: [<ExternalityDiagram key="ed" />],
    },
    '4-1.2': {
      id: '4-1.2',
      title: 'Government Safety Net',
      description:
        'Banks are inherently fragile due to liquidity mismatch. The government safety net \u2014 deposit insurance and lender of last resort \u2014 prevents and stops bank runs, but creates moral hazard.',
      visualizations: [<SafetyNetFlow key="snf" />, <ContagionNetwork key="cn" />],
    },
    '4-1.3': {
      id: '4-1.3',
      title: 'Crisis Interventions 2007-2009',
      description:
        'The 2007-2009 crisis saw dramatic expansion of the safety net: increased deposit insurance limits, emergency lending facilities, and the TARP bailout program.',
      visualizations: [<TEDSpreadTimeline key="tst" />],
    },
    '4-2': {
      id: '4-2',
      title: 'Regulation and Supervision in Practice',
      description:
        'Bank regulation means formal rules. Bank supervision means ongoing enforcement. Together they ensure safety and soundness of the banking system.',
      visualizations: [], // Parent section intro
    },
    '4-2.1': {
      id: '4-2.1',
      title: 'Bank Regulation Rules',
      description:
        'Regulators control bank entry, activities, funding, and require disclosure. The Basel Accord sets global minimum capital standards using risk-weighted assets to prevent a regulatory race to the bottom.',
      visualizations: [<CapitalRequirementsCalculator key="crc" />],
    },
    '4-2.2': {
      id: '4-2.2',
      title: 'Supervisory Process',
      description:
        'Supervisors monitor banks through offsite reports and onsite examinations, rate them using CAMELS, and enforce corrections through penalties and restrictions.',
      visualizations: [<SupervisoryProcessFlow key="spf" />, <CAMELSRadar key="cr" />],
    },
    '4-2.3': {
      id: '4-2.3',
      title: 'Stress Testing',
      description:
        'Stress tests force banks to plan for severe economic scenarios. The Fed\u2019s annual CCAR tests determine whether large banks have enough capital to survive a crisis.',
      visualizations: [<StressTestSimulator key="sts" />],
    },
    '4-3': {
      id: '4-3',
      title: '21st Century Challenges',
      description:
        'Modern regulators face new challenges: banks too big to fail, shadow banking outside traditional regulation, and repeated crises despite reforms.',
      visualizations: [], // Parent section intro
    },
    '4-3.1': {
      id: '4-3.1',
      title: 'Too Big to Fail',
      description:
        'A small number of megabanks hold most banking assets. Their failure would threaten the entire system, creating an implicit government guarantee that encourages risk-taking.',
      visualizations: [<TBTFConcentration key="tbtf" />],
    },
    '4-3.2': {
      id: '4-3.2',
      title: 'Shadow Banking',
      description:
        'Shadow banks perform bank-like functions \u2014 illiquid assets funded by demand-like liabilities \u2014 but operate outside traditional bank regulation, creating hidden systemic risk.',
      visualizations: [<ShadowBankingComparison key="sbc" />],
    },
    '4-3.3': {
      id: '4-3.3',
      title: 'Money Market Funds Case Study',
      description:
        'Money market funds experienced bank-like runs in 2008 and 2020, received government bailouts despite not being banks, and post-crisis reforms paradoxically may accelerate future runs.',
      visualizations: [<MoneyMarketRunChart key="mmrc" />],
    },
  };

  const currentContent = lessonContent[activeLesson] || lessonContent['4-0'];

  // Animation variants
  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className={cn('module-4-content', className)} style={{ width: '100%' }}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lesson Navigation - hidden on mobile */}
        <aside className="hidden lg:block" style={{ width: '288px', flexShrink: 0 }}>
          <LessonNav
            lessons={module4Lessons}
            activeLesson={activeLesson}
            onLessonChange={handleLessonChange}
          />
        </aside>

        {/* Main Content Area */}
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
              {/* Lesson Header */}
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

              {/* Visualizations */}
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
              ) : activeLesson === '4-0' ? (
                <ModuleOverview onLessonChange={handleLessonChange} />
              ) : null}

              {/* Lesson Navigation Buttons */}
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

// Module Overview component for lesson 4-0
function ModuleOverview({ onLessonChange }: { onLessonChange: (id: string) => void }) {
  const topics = [
    // Lesson 4.1: Understanding Bank Regulation
    {
      id: '4-1.1',
      icon: '\u2696\uFE0F',
      title: 'Goals of Regulation',
      desc: 'Market failures and externalities',
    },
    {
      id: '4-1.2',
      icon: '\uD83D\uDEE1\uFE0F',
      title: 'Government Safety Net',
      desc: 'Deposit insurance and LOLR',
    },
    {
      id: '4-1.3',
      icon: '\uD83D\uDCC9',
      title: 'Crisis Interventions',
      desc: '2007-2009 safety net expansion',
    },
    // Lesson 4.2: Regulation and Supervision
    {
      id: '4-2.1',
      icon: '\uD83D\uDCDC',
      title: 'Regulation Rules',
      desc: 'Basel Accord and capital standards',
    },
    {
      id: '4-2.2',
      icon: '\uD83D\uDD0D',
      title: 'Supervisory Process',
      desc: 'CAMELS ratings and examinations',
    },
    {
      id: '4-2.3',
      icon: '\uD83E\uDDEA',
      title: 'Stress Testing',
      desc: 'CCAR and crisis scenarios',
    },
    // Lesson 4.3: 21st Century Challenges
    {
      id: '4-3.1',
      icon: '\uD83C\uDFE6',
      title: 'Too Big to Fail',
      desc: 'Megabanks and systemic risk',
    },
    {
      id: '4-3.2',
      icon: '\uD83D\uDC7B',
      title: 'Shadow Banking',
      desc: 'Unregulated bank-like activities',
    },
    {
      id: '4-3.3',
      icon: '\uD83D\uDCB5',
      title: 'Money Market Funds',
      desc: 'Runs, reforms, and paradoxes',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '8px',
        }}
      >
        In This Module
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
        }}
      >
        {topics.map((topic, index) => (
          <motion.button
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onLessonChange(topic.id)}
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface-1)',
              border: '2px solid var(--color-surface-2)',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              transition: 'border-color 0.2s',
            }}
          >
            <span style={{ fontSize: '24px' }}>{topic.icon}</span>
            <div>
              <div
                style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}
              >
                {topic.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {topic.desc}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Helper functions for navigation
function getPreviousLesson(currentId: string): string | null {
  const currentIndex = module4Lessons.findIndex((l) => l.id === currentId);
  if (currentIndex <= 0) return null;

  // Skip parent lessons that have children (go to their first child instead)
  for (let i = currentIndex - 1; i >= 0; i--) {
    const lesson = module4Lessons[i];
    const hasChildren = module4Lessons.some((l) => l.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}

function getNextLesson(currentId: string): string | null {
  const currentIndex = module4Lessons.findIndex((l) => l.id === currentId);
  if (currentIndex < 0 || currentIndex >= module4Lessons.length - 1) return null;

  // Skip parent lessons that have children (go to their first child instead)
  for (let i = currentIndex + 1; i < module4Lessons.length; i++) {
    const lesson = module4Lessons[i];
    const hasChildren = module4Lessons.some((l) => l.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}
