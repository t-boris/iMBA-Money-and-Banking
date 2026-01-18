'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Entity, FlowArrow } from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface DirectIndirectFinanceProps {
  className?: string;
  initialView?: 'direct' | 'indirect' | 'both';
}

type ViewType = 'direct' | 'indirect' | 'both';
type SelectedElement = 'broker' | 'bank' | null;

interface ProblemSolved {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const problemsSolved: ProblemSolved[] = [
  {
    id: 'maturity',
    title: 'Maturity Mismatch',
    description: 'Short deposits transformed into long loans',
    icon: '⏱️',
  },
  {
    id: 'price-risk',
    title: 'Price Risk',
    description: 'Deposits are stable; markets fluctuate',
    icon: '📉',
  },
  {
    id: 'information',
    title: 'Information Asymmetry',
    description: 'Banks specialize in evaluating borrowers',
    icon: '🔍',
  },
];

// View toggle button component
function ViewToggle({
  activeView,
  onViewChange,
}: {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}) {
  const views: { id: ViewType; label: string }[] = [
    { id: 'direct', label: 'Direct' },
    { id: 'both', label: 'Both' },
    { id: 'indirect', label: 'Indirect' },
  ];

  return (
    <div
      className={cn(
        'inline-flex rounded-lg p-1',
        'bg-glass-light backdrop-blur-md',
        'border border-glass-border'
      )}
    >
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => onViewChange(view.id)}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
            activeView === view.id
              ? 'bg-primary-500 text-white shadow-md'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
          )}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}

// Direct Finance path component
function DirectFinancePath({
  selectedElement,
  onElementClick,
}: {
  selectedElement: SelectedElement;
  onElementClick: (element: SelectedElement) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        'flex flex-col items-center p-6 rounded-xl',
        'bg-glass-light backdrop-blur-md',
        'border border-glass-border shadow-glass'
      )}
    >
      <h3 className="text-lg font-semibold text-emerald-500 mb-2">
        Direct Finance
      </h3>
      <p className="text-xs text-text-tertiary mb-6">Through Markets</p>

      {/* Flow: Investor -> Broker/Dealer -> Another Investor */}
      <div className="flex flex-col items-center gap-4">
        <Entity
          icon="💼"
          label="Investor"
          subtext="Buys securities"
          className="w-40"
        />

        <FlowArrow direction="down" animated label="Securities" />

        <motion.div
          className={cn(
            'relative p-4 rounded-xl cursor-pointer',
            'bg-glass-light backdrop-blur-md',
            'border-2 transition-all duration-200',
            selectedElement === 'broker'
              ? 'border-emerald-500 shadow-lg shadow-emerald-500/20'
              : 'border-glass-border hover:border-emerald-500/50'
          )}
          onClick={() =>
            onElementClick(selectedElement === 'broker' ? null : 'broker')
          }
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">🤝</span>
            <span className="text-sm font-medium text-text-primary">
              Broker/Dealer
            </span>
            <span className="text-xs text-text-tertiary">
              Matches buyers & sellers
            </span>
          </div>

          {/* Insight popup */}
          <AnimatePresence>
            {selectedElement === 'broker' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={cn(
                  'absolute top-full left-1/2 -translate-x-1/2 mt-2 z-10',
                  'p-3 rounded-lg w-48',
                  'bg-emerald-500/10 border border-emerald-500/30',
                  'text-center'
                )}
              >
                <p className="text-xs text-emerald-500 font-medium">
                  Takes no ownership risk
                </p>
                <p className="text-xs text-text-tertiary mt-1">
                  Just connects parties
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <FlowArrow direction="down" animated label="Funds" />

        <Entity
          icon="📈"
          label="Another Investor"
          subtext="Sells securities"
          className="w-40"
        />
      </div>

      {/* Characteristics */}
      <div
        className={cn(
          'mt-6 p-3 rounded-lg w-full',
          'bg-emerald-500/5 border border-emerald-500/20'
        )}
      >
        <p className="text-xs text-text-secondary text-center">
          <span className="text-emerald-500 font-medium">
            No balance sheet
          </span>{' '}
          - just connecting parties
        </p>
        <p className="text-xs text-text-tertiary text-center mt-1">
          Price discovery, liquidity, transparency
        </p>
      </div>
    </motion.div>
  );
}

// Indirect Finance path component
function IndirectFinancePath({
  selectedElement,
  onElementClick,
}: {
  selectedElement: SelectedElement;
  onElementClick: (element: SelectedElement) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        'flex flex-col items-center p-6 rounded-xl',
        'bg-glass-light backdrop-blur-md',
        'border border-glass-border shadow-glass'
      )}
    >
      <h3 className="text-lg font-semibold text-primary-500 mb-2">
        Indirect Finance
      </h3>
      <p className="text-xs text-text-tertiary mb-6">Through Institutions</p>

      {/* Flow: Saver -> Bank -> Borrower */}
      <div className="flex flex-col items-center gap-4">
        <Entity
          icon="💰"
          label="Saver"
          subtext="Deposits funds"
          className="w-40"
        />

        <FlowArrow direction="down" animated label="Deposits" />

        <motion.div
          className={cn(
            'relative p-4 rounded-xl cursor-pointer',
            'bg-glass-light backdrop-blur-md',
            'border-2 transition-all duration-200',
            selectedElement === 'bank'
              ? 'border-primary-500 shadow-lg shadow-primary-500/20'
              : 'border-glass-border hover:border-primary-500/50'
          )}
          onClick={() =>
            onElementClick(selectedElement === 'bank' ? null : 'bank')
          }
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">🏦</span>
            <span className="text-sm font-medium text-text-primary">Bank</span>
            <span className="text-xs text-text-tertiary">
              Holds assets on balance sheet
            </span>
          </div>

          {/* Mini balance sheet indicator */}
          <div
            className={cn(
              'absolute -right-2 -top-2 w-6 h-6 rounded-full',
              'bg-primary-500/20 border border-primary-500/50',
              'flex items-center justify-center'
            )}
          >
            <span className="text-xs">T</span>
          </div>

          {/* Insight popup */}
          <AnimatePresence>
            {selectedElement === 'bank' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={cn(
                  'absolute top-full left-1/2 -translate-x-1/2 mt-2 z-10',
                  'p-3 rounded-lg w-48',
                  'bg-primary-500/10 border border-primary-500/30',
                  'text-center'
                )}
              >
                <p className="text-xs text-primary-500 font-medium">
                  Holds assets on balance sheet
                </p>
                <p className="text-xs text-text-tertiary mt-1">
                  Takes ownership & credit risk
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <FlowArrow direction="down" animated label="Loans" />

        <Entity
          icon="🏠"
          label="Borrower"
          subtext="Receives loan"
          className="w-40"
        />
      </div>

      {/* Characteristics */}
      <div
        className={cn(
          'mt-6 p-3 rounded-lg w-full',
          'bg-primary-500/5 border border-primary-500/20'
        )}
      >
        <p className="text-xs text-text-secondary text-center">
          <span className="text-primary-500 font-medium">
            Institution holds assets
          </span>
        </p>
        <p className="text-xs text-text-tertiary text-center mt-1">
          Risk transformation, maturity transformation
        </p>
      </div>
    </motion.div>
  );
}

// Problems solved cards component
function ProblemsSolvedCards({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: 20, height: 0 }}
          className="mt-8 overflow-hidden"
        >
          <h4 className="text-center text-sm font-semibold text-text-primary mb-4">
            Three Problems Solved by Indirect Finance
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {problemsSolved.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'p-4 rounded-xl',
                  'bg-glass-light backdrop-blur-md',
                  'border border-primary-500/20',
                  'hover:border-primary-500/40 transition-colors'
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{problem.icon}</span>
                  <h5 className="text-sm font-semibold text-primary-500">
                    {problem.title}
                  </h5>
                </div>
                <p className="text-xs text-text-secondary">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DirectIndirectFinance({
  className,
  initialView = 'both',
}: DirectIndirectFinanceProps) {
  const [activeView, setActiveView] = useState<ViewType>(initialView);
  const [selectedElement, setSelectedElement] = useState<SelectedElement>(null);

  const showDirect = activeView === 'direct' || activeView === 'both';
  const showIndirect = activeView === 'indirect' || activeView === 'both';

  return (
    <div className={cn('w-full', className)}>
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-2">
          How do funds flow from savers to borrowers?
        </h2>
        <p className="text-sm text-text-tertiary">
          Compare direct finance through markets vs indirect finance through
          institutions
        </p>
      </div>

      {/* View toggle */}
      <div className="flex justify-center mb-8">
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />
      </div>

      {/* Main content - side by side comparison */}
      <div
        className={cn(
          'grid gap-6',
          activeView === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
        )}
      >
        <AnimatePresence mode="wait">
          {showDirect && (
            <div
              key="direct"
              className={cn(
                activeView !== 'both' && 'max-w-md mx-auto'
              )}
            >
              <DirectFinancePath
                selectedElement={selectedElement}
                onElementClick={setSelectedElement}
              />
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showIndirect && (
            <div
              key="indirect"
              className={cn(
                activeView !== 'both' && 'max-w-md mx-auto'
              )}
            >
              <IndirectFinancePath
                selectedElement={selectedElement}
                onElementClick={setSelectedElement}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Problems solved by indirect finance */}
      <ProblemsSolvedCards show={showIndirect} />

      {/* Instruction hint */}
      <motion.p
        className="text-center text-xs text-text-tertiary mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click on the Broker/Dealer or Bank to see key differences
      </motion.p>
    </div>
  );
}
