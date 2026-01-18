'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Entity, FlowArrow } from '@/components/visualizations';
import { cn } from '@/lib/utils';

interface FinancialSystemFlowProps {
  className?: string;
}

type EntityType = 'savers' | 'financial-system' | 'borrowers' | null;

interface DetailContent {
  title: string;
  items: string[];
  description: string;
}

const detailContent: Record<Exclude<EntityType, null>, DetailContent> = {
  savers: {
    title: 'Who are savers?',
    items: ['Households', 'Pension savers', 'Insurance policyholders'],
    description: 'They have more income than they spend today',
  },
  'financial-system': {
    title: 'What does it do?',
    items: ['Markets (direct finance)', 'Institutions (indirect finance)'],
    description: 'Channels funds from savers to borrowers',
  },
  borrowers: {
    title: 'Who are borrowers?',
    items: [
      'Homebuyers (mortgages)',
      'Businesses (investment)',
      'Government (infrastructure)',
    ],
    description: 'They need funds today for future projects',
  },
};

// Money particle component for animated flow
function MoneyParticle({ delay, duration }: { delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute text-sm"
      initial={{ opacity: 0, x: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: ['0%', '100%'],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.1, 0.9, 1],
      }}
    >
      $
    </motion.div>
  );
}

// Animated flow connection with money particles
function AnimatedFlow({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn('relative flex flex-col items-center gap-1', className)}>
      {/* Label above */}
      <span className="text-xs font-medium text-text-secondary mb-1">
        {label}
      </span>

      {/* Flow arrow with particles */}
      <div className="relative">
        <FlowArrow direction="right" animated label="" className="w-20 sm:w-24" />

        {/* Additional money particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none text-primary-500">
          <MoneyParticle delay={0} duration={2} />
          <MoneyParticle delay={0.7} duration={2} />
          <MoneyParticle delay={1.4} duration={2} />
        </div>
      </div>
    </div>
  );
}

// Vertical animated flow for mobile
function AnimatedFlowVertical({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn('relative flex flex-col items-center gap-1', className)}>
      {/* Label */}
      <span className="text-xs font-medium text-text-secondary">
        {label}
      </span>

      {/* Flow arrow with particles */}
      <div className="relative">
        <FlowArrow direction="down" animated label="" className="h-16" />
      </div>
    </div>
  );
}

// Detail panel component
function DetailPanel({
  entityType,
  onClose,
}: {
  entityType: Exclude<EntityType, null>;
  onClose: () => void;
}) {
  const content = detailContent[entityType];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'mt-4 p-4 rounded-xl',
        'bg-glass-light backdrop-blur-md',
        'border border-primary-500/30',
        'shadow-lg shadow-primary-500/5'
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-sm font-semibold text-primary-500">{content.title}</h4>
        <button
          onClick={onClose}
          className="text-text-tertiary hover:text-text-primary transition-colors text-lg leading-none"
          aria-label="Close detail panel"
        >
          x
        </button>
      </div>

      <ul className="space-y-1.5 mb-3">
        {content.items.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-sm text-text-secondary flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            {item}
          </motion.li>
        ))}
      </ul>

      <p className="text-xs text-text-tertiary italic">{content.description}</p>
    </motion.div>
  );
}

export function FinancialSystemFlow({ className }: FinancialSystemFlowProps) {
  const [selectedEntity, setSelectedEntity] = useState<EntityType>(null);

  const handleEntityClick = (entity: EntityType) => {
    setSelectedEntity(selectedEntity === entity ? null : entity);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop: Horizontal layout */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {/* Savers */}
          <div className="flex flex-col items-center">
            <Entity
              icon="💰"
              label="Savers"
              subtext="Households with excess income"
              highlighted={selectedEntity === 'savers'}
              onClick={() => handleEntityClick('savers')}
              className="w-36 md:w-44"
            />
            <AnimatePresence mode="wait">
              {selectedEntity === 'savers' && (
                <DetailPanel
                  entityType="savers"
                  onClose={() => setSelectedEntity(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Arrow: Savers -> Financial System */}
          <AnimatedFlow label="Funds" />

          {/* Financial System */}
          <div className="flex flex-col items-center">
            <Entity
              icon="🏛️"
              label="Financial System"
              subtext="Markets & Institutions"
              highlighted={selectedEntity === 'financial-system'}
              onClick={() => handleEntityClick('financial-system')}
              className="w-36 md:w-44"
            />
            <AnimatePresence mode="wait">
              {selectedEntity === 'financial-system' && (
                <DetailPanel
                  entityType="financial-system"
                  onClose={() => setSelectedEntity(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Arrow: Financial System -> Borrowers */}
          <AnimatedFlow label="Loans/Investment" />

          {/* Borrowers */}
          <div className="flex flex-col items-center">
            <Entity
              icon="🏠"
              label="Borrowers"
              subtext="Households, Businesses, Government"
              highlighted={selectedEntity === 'borrowers'}
              onClick={() => handleEntityClick('borrowers')}
              className="w-36 md:w-44"
            />
            <AnimatePresence mode="wait">
              {selectedEntity === 'borrowers' && (
                <DetailPanel
                  entityType="borrowers"
                  onClose={() => setSelectedEntity(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical layout */}
      <div className="sm:hidden">
        <div className="flex flex-col items-center gap-2">
          {/* Savers */}
          <div className="w-full max-w-xs">
            <Entity
              icon="💰"
              label="Savers"
              subtext="Households with excess income"
              highlighted={selectedEntity === 'savers'}
              onClick={() => handleEntityClick('savers')}
              className="w-full"
            />
            <AnimatePresence mode="wait">
              {selectedEntity === 'savers' && (
                <DetailPanel
                  entityType="savers"
                  onClose={() => setSelectedEntity(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Arrow: Savers -> Financial System */}
          <AnimatedFlowVertical label="Funds" />

          {/* Financial System */}
          <div className="w-full max-w-xs">
            <Entity
              icon="🏛️"
              label="Financial System"
              subtext="Markets & Institutions"
              highlighted={selectedEntity === 'financial-system'}
              onClick={() => handleEntityClick('financial-system')}
              className="w-full"
            />
            <AnimatePresence mode="wait">
              {selectedEntity === 'financial-system' && (
                <DetailPanel
                  entityType="financial-system"
                  onClose={() => setSelectedEntity(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Arrow: Financial System -> Borrowers */}
          <AnimatedFlowVertical label="Loans/Investment" />

          {/* Borrowers */}
          <div className="w-full max-w-xs">
            <Entity
              icon="🏠"
              label="Borrowers"
              subtext="Households, Businesses, Government"
              highlighted={selectedEntity === 'borrowers'}
              onClick={() => handleEntityClick('borrowers')}
              className="w-full"
            />
            <AnimatePresence mode="wait">
              {selectedEntity === 'borrowers' && (
                <DetailPanel
                  entityType="borrowers"
                  onClose={() => setSelectedEntity(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Instruction hint */}
      <motion.p
        className="text-center text-xs text-text-tertiary mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click on any entity to learn more
      </motion.p>
    </div>
  );
}
