'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { module3Lessons } from '@/data/module3';
import { LessonNav } from './LessonNav';
import {
  RiskReturnTradeoff,
  BankCapitalStructure,
  ROECalculator,
  LeverageDecomposition,
  CreditRiskFlow,
  FICOScoreScale,
  MaturityMismatchDiagram,
  InterestRateSensitivity,
  LiquidityCrisisFlow,
  VaRDistribution,
  RiskTypesPentagon,
} from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface Module3ContentProps {
  className?: string;
}

// Lesson content configuration
interface LessonContentConfig {
  id: string;
  title: string;
  description: string;
  visualizations: React.ReactNode[];
}

export function Module3Content({ className }: Module3ContentProps) {
  const [activeLesson, setActiveLesson] = useState('3-0');
  const [direction, setDirection] = useState(0);

  // Get lesson order for animation direction
  const getLessonIndex = (lessonId: string) => {
    return module3Lessons.findIndex((l) => l.id === lessonId);
  };

  const handleLessonChange = (newLessonId: string) => {
    const currentIndex = getLessonIndex(activeLesson);
    const newIndex = getLessonIndex(newLessonId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveLesson(newLessonId);
  };

  // Handle URL hash navigation (e.g., #lesson-3-1)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#lesson-')) {
        const lessonId = hash.replace('#lesson-', '');
        const lessonExists = module3Lessons.some((l) => l.id === lessonId);
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
    '3-0': {
      id: '3-0',
      title: 'Overview',
      description:
        'This module explores the risk-return tradeoff in banking: how banks earn profit, measure performance, and manage the five major types of risk they face. Understanding these concepts is essential for evaluating bank health and regulatory requirements.',
      visualizations: [<RiskTypesPentagon key="rtp" />],
    },
    '3-1': {
      id: '3-1',
      title: 'Bank Capital and Profitability',
      description:
        'Banks balance the need for capital (a safety cushion against losses) with shareholder desire for high returns. This section covers how equity capital protects depositors and how to measure bank performance.',
      visualizations: [], // Parent section - just intro
    },
    '3-1.1': {
      id: '3-1.1',
      title: 'Bank Equity Capital',
      description:
        'Equity capital is the ownership stake in a bank — the residual claim after all liabilities are paid. It serves as a loss absorber, protecting depositors and creditors when loans go bad.',
      visualizations: [<BankCapitalStructure key="bcs" />],
    },
    '3-1.2': {
      id: '3-1.2',
      title: 'Measuring Bank Performance',
      description:
        'ROA measures how efficiently a bank uses its assets. ROE shows returns to shareholders. Leverage amplifies both gains and losses. Understanding these metrics is key to evaluating bank health.',
      visualizations: [<ROECalculator key="roe" />, <LeverageDecomposition key="ld" />],
    },
    '3-2': {
      id: '3-2',
      title: 'Overview of Bank Risks',
      description:
        'Banks face five major categories of risk: credit, interest rate, liquidity, market, and operational. Each requires different measurement tools and management strategies.',
      visualizations: [<RiskReturnTradeoff key="rrt" />],
    },
    '3-2.1': {
      id: '3-2.1',
      title: 'Overview of Risk',
      description:
        'Risk is the possibility that actual outcomes differ from expected outcomes. Banks must measure, monitor, and manage risks to survive bad times while earning adequate returns in good times.',
      visualizations: [<RiskTypesPentagon key="rtp2" />],
    },
    '3-2.2': {
      id: '3-2.2',
      title: 'Credit Risk',
      description:
        'Credit risk is the possibility that a borrower will default on their obligation. Banks use credit ratings, FICO scores, collateral requirements, and loan covenants to assess and manage this risk.',
      visualizations: [<CreditRiskFlow key="crf" />, <FICOScoreScale key="fss" />],
    },
    '3-2.3': {
      id: '3-2.3',
      title: 'Interest Rate Risk',
      description:
        'Banks borrow short and lend long, creating a maturity mismatch. When interest rates change, the value of assets and liabilities change differently, affecting both cash flows and equity value.',
      visualizations: [
        <MaturityMismatchDiagram key="mmd" />,
        <InterestRateSensitivity key="irs" />,
      ],
    },
    '3-2.4': {
      id: '3-2.4',
      title: 'Liquidity Risk',
      description:
        'Liquidity risk is the danger that a bank cannot meet its cash obligations. A bank run occurs when too many depositors withdraw at once, potentially forcing fire sales of assets at steep discounts.',
      visualizations: [<LiquidityCrisisFlow key="lcf" />],
    },
    '3-2.5': {
      id: '3-2.5',
      title: 'Market Risk',
      description:
        'Market risk affects the trading book — securities held for short-term profit. Value at Risk (VaR) measures the maximum expected loss at a given confidence level, though fat tails can make losses worse than expected.',
      visualizations: [<VaRDistribution key="vard" />],
    },
    '3-2.6': {
      id: '3-2.6',
      title: 'Operational Risk',
      description:
        'Operational risk includes system failures, fraud, compliance violations, and cyber attacks. With fintech and digital banking, these risks are increasingly important and difficult to quantify.',
      visualizations: [], // Text-focused lesson
    },
  };

  const currentContent = lessonContent[activeLesson] || lessonContent['3-0'];

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
    <div className={cn('module-3-content', className)} style={{ width: '100%' }}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lesson Navigation - hidden on mobile */}
        <aside className="hidden lg:block" style={{ width: '288px', flexShrink: 0 }}>
          <LessonNav
            lessons={module3Lessons}
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
              ) : activeLesson === '3-0' ? (
                <ModuleOverview onLessonChange={handleLessonChange} />
              ) : activeLesson === '3-2.6' ? (
                <OperationalRiskContent />
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

// Module Overview component for lesson 3-0
function ModuleOverview({ onLessonChange }: { onLessonChange: (id: string) => void }) {
  const topics = [
    // Lesson 3.1: Bank Capital and Profitability
    {
      id: '3-1.1',
      icon: '🏦',
      title: 'Bank Equity Capital',
      desc: 'The loss absorber protecting depositors',
    },
    { id: '3-1.2', icon: '📊', title: 'Measuring Performance', desc: 'ROA, ROE, and leverage' },
    // Lesson 3.2: Overview of Bank Risks
    { id: '3-2.1', icon: '⚠️', title: 'Overview of Risk', desc: 'Risk types and management' },
    { id: '3-2.2', icon: '💳', title: 'Credit Risk', desc: 'Default, ratings, and FICO scores' },
    {
      id: '3-2.3',
      icon: '📈',
      title: 'Interest Rate Risk',
      desc: 'Maturity mismatch and duration',
    },
    { id: '3-2.4', icon: '💧', title: 'Liquidity Risk', desc: 'Bank runs and fire sales' },
    { id: '3-2.5', icon: '📉', title: 'Market Risk', desc: 'Trading book and VaR' },
    {
      id: '3-2.6',
      icon: '⚙️',
      title: 'Operational Risk',
      desc: 'System failures and cyber threats',
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

// Operational Risk content for lesson 3-2.6
function OperationalRiskContent() {
  const riskCategories = [
    {
      title: 'Internal Processes',
      icon: '🔧',
      items: ['Transaction processing errors', 'Model errors', 'Inadequate controls'],
    },
    {
      title: 'People',
      icon: '👥',
      items: ['Employee fraud', 'Unauthorized trading', 'Human error', 'Insider threats'],
    },
    {
      title: 'Systems',
      icon: '💻',
      items: ['IT failures', 'Cyber attacks', 'Data breaches', 'System outages'],
    },
    {
      title: 'External Events',
      icon: '🌍',
      items: ['Natural disasters', 'Terrorism', 'Vendor failures', 'Regulatory changes'],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div
        style={{
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: 'var(--color-surface-1)',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '12px',
          }}
        >
          Categories of Operational Risk
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {riskCategories.map((category) => (
            <div
              key={category.title}
              style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--color-surface-2)',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}
              >
                <span style={{ fontSize: '20px' }}>{category.icon}</span>
                <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  {category.title}
                </span>
              </div>
              <ul
                style={{
                  paddingLeft: '20px',
                  margin: 0,
                  color: 'var(--color-text-secondary)',
                  fontSize: '14px',
                }}
              >
                {category.items.map((item) => (
                  <li key={item} style={{ marginBottom: '4px' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          Why Operational Risk is Hard to Quantify
        </h4>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6',
            margin: 0,
          }}
        >
          Unlike credit or market risk, operational risk events are often rare but severe.
          Historical data is limited, and many risks (like novel cyber attacks) have no precedent.
          Banks typically use scenario analysis and key risk indicators (KRIs) rather than
          statistical models to manage these risks.
        </p>
      </div>
    </div>
  );
}

// Helper functions for navigation
function getPreviousLesson(currentId: string): string | null {
  const currentIndex = module3Lessons.findIndex((l) => l.id === currentId);
  if (currentIndex <= 0) return null;

  // Skip parent lessons that have children (go to their first child instead)
  for (let i = currentIndex - 1; i >= 0; i--) {
    const lesson = module3Lessons[i];
    const hasChildren = module3Lessons.some((l) => l.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}

function getNextLesson(currentId: string): string | null {
  const currentIndex = module3Lessons.findIndex((l) => l.id === currentId);
  if (currentIndex < 0 || currentIndex >= module3Lessons.length - 1) return null;

  // Skip parent lessons that have children (go to their first child instead)
  for (let i = currentIndex + 1; i < module3Lessons.length; i++) {
    const lesson = module3Lessons[i];
    const hasChildren = module3Lessons.some((l) => l.parentId === lesson.id);
    if (!hasChildren) {
      return lesson.id;
    }
  }
  return null;
}
