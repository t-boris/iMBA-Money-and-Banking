'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { module1Lessons } from '@/data/module1';
import { LessonNav } from './LessonNav';
import {
  FinancialSystemFlow,
  MoneyFunctionsTriangle,
  MoneyEvolutionTimeline,
  PaymentMethodsFlow,
  DirectIndirectFinance,
  BankBalanceSheet,
  MonetaryAggregatesCalculator,
  NonBanksOverview,
  FinancialDevelopment,
} from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface Module1ContentProps {
  className?: string;
}

// Lesson content configuration
interface LessonContentConfig {
  id: string;
  title: string;
  description: string;
  visualizations: React.ReactNode[];
}

export function Module1Content({ className }: Module1ContentProps) {
  const [activeLesson, setActiveLesson] = useState('1-0');
  const [direction, setDirection] = useState(0);

  // Get lesson order for animation direction
  const getLessonIndex = (lessonId: string) => {
    return module1Lessons.findIndex((l) => l.id === lessonId);
  };

  const handleLessonChange = (newLessonId: string) => {
    const currentIndex = getLessonIndex(activeLesson);
    const newIndex = getLessonIndex(newLessonId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveLesson(newLessonId);
  };

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeLesson]);

  // Lesson content mapping - simplified linear structure
  const lessonContent: Record<string, LessonContentConfig> = {
    '1-0': {
      id: '1-0',
      title: 'Overview',
      description:
        'This module covers money, payments, and the financial system. Learn what money is, how it moves through the economy, and how financial institutions connect savers with borrowers.',
      visualizations: [], // No visualization - just intro text
    },
    '1-1': {
      id: '1-1',
      title: 'Money and Its Functions',
      description:
        'What makes something "money"? Explore the three key functions: means of payment, unit of account, and store of value.',
      visualizations: [<MoneyFunctionsTriangle key="mft" />, <MoneyEvolutionTimeline key="met" />],
    },
    '1-2': {
      id: '1-2',
      title: 'The Payments System',
      description:
        'How money actually moves: from cash to digital wallets, exploring the evolution of payment methods.',
      visualizations: [<PaymentMethodsFlow key="pmf" />],
    },
    '1-3': {
      id: '1-3',
      title: 'Money and Inflation',
      description:
        'Measuring money through M1 and M2 aggregates, and understanding how money supply relates to inflation.',
      visualizations: [<MonetaryAggregatesCalculator key="mac" />],
    },
    '1-4': {
      id: '1-4',
      title: 'What Does the Financial System Do?',
      description:
        'The core function: connecting those with excess funds (savers) to those who need funds (borrowers).',
      visualizations: [<FinancialSystemFlow key="fsf" />],
    },
    '1-5': {
      id: '1-5',
      title: 'Financial Markets vs Financial Institutions',
      description:
        'Two paths for funds: direct finance through markets or indirect finance through intermediaries.',
      visualizations: [<DirectIndirectFinance key="dif" />],
    },
    '1-6': {
      id: '1-6',
      title: 'Banks vs Non-Banks',
      description:
        'Understanding the unique role of banks in the financial system through their balance sheets.',
      visualizations: [<BankBalanceSheet key="bbs" />],
    },
    '1-7': {
      id: '1-7',
      title: 'Overview of Non-Banks',
      description:
        'Insurance companies, pension funds, investment banks, and other financial institutions.',
      visualizations: [<NonBanksOverview key="nbo" />],
    },
    '1-8': {
      id: '1-8',
      title: 'Financial Development and Economic Activity',
      description: 'The relationship between financial markets and real economic outcomes.',
      visualizations: [<FinancialDevelopment key="fd" />],
    },
  };

  const currentContent = lessonContent[activeLesson] || lessonContent['1-0'];

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
    <div className={cn('module-1-content', className)} style={{ width: '100%' }}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lesson Navigation - hidden on mobile */}
        <aside className="hidden lg:block" style={{ width: '288px', flexShrink: 0 }}>
          <LessonNav
            lessons={module1Lessons}
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
              ) : activeLesson === '1-0' ? (
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

// Module Overview component for lesson 1-0
function ModuleOverview({ onLessonChange }: { onLessonChange: (id: string) => void }) {
  const topics = [
    {
      id: '1-1',
      icon: '💵',
      title: 'Money and Its Functions',
      desc: 'What makes something "money"',
    },
    {
      id: '1-2',
      icon: '💳',
      title: 'The Payments System',
      desc: 'How money moves through the economy',
    },
    { id: '1-3', icon: '📊', title: 'Money and Inflation', desc: 'M1, M2, and price stability' },
    {
      id: '1-4',
      icon: '🔄',
      title: 'What Does the Financial System Do?',
      desc: 'Connecting savers and borrowers',
    },
    {
      id: '1-5',
      icon: '🏛️',
      title: 'Financial Markets vs Institutions',
      desc: 'Direct vs indirect finance',
    },
    { id: '1-6', icon: '🏦', title: 'Banks vs Non-Banks', desc: 'The unique role of banks' },
    {
      id: '1-7',
      icon: '🏢',
      title: 'Overview of Non-Banks',
      desc: 'Insurance, pensions, and more',
    },
    { id: '1-8', icon: '📈', title: 'Financial Development', desc: 'Finance and economic growth' },
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
  const currentIndex = module1Lessons.findIndex((l) => l.id === currentId);
  if (currentIndex <= 0) return null;

  // Skip parent lessons that have children (go to their first child instead)
  for (let i = currentIndex - 1; i >= 0; i--) {
    const lesson = module1Lessons[i];
    const hasChildren = module1Lessons.some((l) => l.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}

function getNextLesson(currentId: string): string | null {
  const currentIndex = module1Lessons.findIndex((l) => l.id === currentId);
  if (currentIndex < 0 || currentIndex >= module1Lessons.length - 1) return null;

  // Skip parent lessons that have children (go to their first child instead)
  for (let i = currentIndex + 1; i < module1Lessons.length; i++) {
    const lesson = module1Lessons[i];
    const hasChildren = module1Lessons.some((l) => l.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}
