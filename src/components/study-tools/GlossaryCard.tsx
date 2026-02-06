'use client';

import { motion } from 'motion/react';
import { GlossaryTerm } from '@/types';

interface GlossaryCardProps {
  term: GlossaryTerm;
  onClick: () => void;
  index: number;
}

const typeColors: Record<GlossaryTerm['type'], string> = {
  term: 'var(--color-primary)',
  concept: 'var(--color-emerald)',
  formula: 'var(--color-amber)',
  regulation: 'var(--color-rose)',
};

const categoryLabels: Record<GlossaryTerm['category'], string> = {
  money: 'Money',
  payment: 'Payment',
  'financial-system': 'Finance',
  institutions: 'Institutions',
  economy: 'Economy',
  risk: 'Risk',
  capital: 'Capital',
  regulation: 'Regulation',
};

export function GlossaryCard({ term, onClick, index }: GlossaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        backgroundColor: 'var(--color-glass-light)',
        border: '1px solid var(--color-glass-border)',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {/* Type badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.25rem',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: typeColors[term.type],
            backgroundColor: `color-mix(in srgb, ${typeColors[term.type]} 15%, transparent)`,
            padding: '0.2rem 0.5rem',
            borderRadius: '0.25rem',
          }}
        >
          {term.type}
        </span>
        <span
          style={{
            fontSize: '0.7rem',
            color: 'var(--color-text-tertiary)',
          }}
        >
          {categoryLabels[term.category]}
        </span>
      </div>

      {/* Term title */}
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          margin: 0,
        }}
      >
        {term.term}
      </h3>

      {/* Definition preview */}
      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {term.definition}
      </p>

      {/* Module indicator */}
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-tertiary)',
          marginTop: 'auto',
        }}
      >
        Module {term.moduleId}
      </div>
    </motion.div>
  );
}
