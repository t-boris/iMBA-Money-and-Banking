'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { module2Lessons } from '@/data/module2';
import { LessonNav } from './LessonNav';
import {
  BankingEvolutionTimeline,
  BankOrganizationComparison,
  InterestSpreadCalculator,
  RegulationImpactFlow,
  BankConsolidationChart,
  RevenueMixComparison,
} from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface Module2ContentProps {
  className?: string;
}

// Lesson content configuration
interface LessonContentConfig {
  id: string;
  title: string;
  description: string;
  visualizations: React.ReactNode[];
}

export function Module2Content({ className }: Module2ContentProps) {
  const [activeLesson, setActiveLesson] = useState('2-0');
  const [direction, setDirection] = useState(0);

  // Get lesson order for animation direction
  const getLessonIndex = (lessonId: string) => {
    return module2Lessons.findIndex((l) => l.id === lessonId);
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

  // Lesson content mapping
  const lessonContent: Record<string, LessonContentConfig> = {
    '2-0': {
      id: '2-0',
      title: 'Overview',
      description:
        'This module covers the history and evolution of modern banking in the United States. Learn how banks evolved from single-location unit banks to massive financial holding companies, and understand the regulatory changes that shaped the industry.',
      visualizations: [], // No visualization - just intro text
    },
    '2-1': {
      id: '2-1',
      title: 'Early Banking in the US',
      description:
        'From unit banks to branch networks — explore how banking structure evolved in the pre-regulation and early regulation eras, including the impact of Glass-Steagall.',
      visualizations: [
        <BankingEvolutionTimeline key="bet" />,
        <BankOrganizationComparison key="boc1" />,
      ],
    },
    '2-2': {
      id: '2-2',
      title: 'Bank Holding Companies',
      description:
        'How regulatory arbitrage led to bank holding companies and the "golden age" of simple, profitable banking under the 3-6-3 rule.',
      visualizations: [
        <InterestSpreadCalculator key="isc" />,
      ],
    },
    '2-3': {
      id: '2-3',
      title: 'Deregulation and Modern Banking',
      description:
        'The dramatic transformation from Riegle-Neal to Gramm-Leach-Bliley: how deregulation created financial supermarkets and financial holding companies.',
      visualizations: [
        <RegulationImpactFlow key="rif" />,
      ],
    },
    '2-4': {
      id: '2-4',
      title: 'Bank Consolidation',
      description:
        'Why the number of US banks dropped from over 14,000 to under 5,000 — the forces driving consolidation and the rise of "too big to fail."',
      visualizations: [<BankConsolidationChart key="bcc" />],
    },
    '2-5': {
      id: '2-5',
      title: 'Modern Bank Revenue',
      description:
        'From traditional interest spread to diversified fee income — how modern banks generate profits in a competitive environment.',
      visualizations: [<RevenueMixComparison key="rmc" />],
    },
  };

  const currentContent = lessonContent[activeLesson] || lessonContent['2-0'];

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
    <div className={cn('module-2-content', className)} style={{ width: '100%' }}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lesson Navigation - hidden on mobile */}
        <aside className="hidden lg:block" style={{ width: '288px', flexShrink: 0 }}>
          <LessonNav
            lessons={module2Lessons}
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
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {currentContent.title}
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: '12px', maxWidth: '700px', lineHeight: '1.6' }}>
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
              ) : activeLesson === '2-0' ? (
                <ModuleOverview onLessonChange={handleLessonChange} />
              ) : null}

              {/* Lesson Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-surface-2">
                {getPreviousLesson(activeLesson) ? (
                  <button
                    onClick={() =>
                      handleLessonChange(getPreviousLesson(activeLesson)!)
                    }
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
                    onClick={() =>
                      handleLessonChange(getNextLesson(activeLesson)!)
                    }
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

// Module Overview component for lesson 2-0
function ModuleOverview({ onLessonChange }: { onLessonChange: (id: string) => void }) {
  const topics = [
    { id: '2-1', icon: '🏛️', title: 'Early Banking in the US', desc: 'Unit banks, branches, and Glass-Steagall' },
    { id: '2-2', icon: '🏢', title: 'Bank Holding Companies', desc: 'The 3-6-3 rule and regulatory arbitrage' },
    { id: '2-3', icon: '⚖️', title: 'Deregulation', desc: 'Riegle-Neal and Gramm-Leach-Bliley' },
    { id: '2-4', icon: '📉', title: 'Bank Consolidation', desc: 'From 14,000 to under 5,000 banks' },
    { id: '2-5', icon: '💰', title: 'Modern Bank Revenue', desc: 'Interest spread and fee income' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
        In This Module
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
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
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
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
  const currentIndex = module2Lessons.findIndex((l) => l.id === currentId);
  if (currentIndex <= 0) return null;

  // Skip parent lessons that have children (go to their first child instead)
  for (let i = currentIndex - 1; i >= 0; i--) {
    const lesson = module2Lessons[i];
    const hasChildren = module2Lessons.some((l) => l.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}

function getNextLesson(currentId: string): string | null {
  const currentIndex = module2Lessons.findIndex((l) => l.id === currentId);
  if (currentIndex < 0 || currentIndex >= module2Lessons.length - 1) return null;

  // Skip parent lessons that have children (go to their first child instead)
  for (let i = currentIndex + 1; i < module2Lessons.length; i++) {
    const lesson = module2Lessons[i];
    const hasChildren = module2Lessons.some((l) => l.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}
