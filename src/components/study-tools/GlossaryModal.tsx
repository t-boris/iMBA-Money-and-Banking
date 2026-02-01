'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { GlossaryTerm } from '@/types';
import { modules } from '@/data/modules';

interface GlossaryModalProps {
  term: GlossaryTerm | null;
  onClose: () => void;
  allTerms: GlossaryTerm[];
}

const typeColors: Record<GlossaryTerm['type'], string> = {
  term: 'var(--color-primary)',
  concept: 'var(--color-emerald)',
  formula: 'var(--color-amber)',
  regulation: 'var(--color-rose)',
};

export function GlossaryModal({ term, onClose, allTerms }: GlossaryModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (term) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [term]);

  if (!term) return null;

  const module = modules.find(m => m.id === term.moduleId);
  const relatedTerms = term.relatedTerms
    ?.map(id => allTerms.find(t => t.id === id))
    .filter(Boolean) as GlossaryTerm[];

  return (
    <AnimatePresence>
      {term && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 100,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '500px',
              maxHeight: '80vh',
              backgroundColor: 'var(--color-bg-primary)',
              border: '1px solid var(--color-glass-border)',
              borderRadius: '1rem',
              padding: '2rem',
              zIndex: 101,
              overflow: 'auto',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--color-text-tertiary)',
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Type badge */}
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: typeColors[term.type],
                backgroundColor: `color-mix(in srgb, ${typeColors[term.type]} 15%, transparent)`,
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem',
                marginBottom: '1rem',
              }}
            >
              {term.type}
            </span>

            {/* Term title */}
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '1rem',
              }}
            >
              {term.term}
            </h2>

            {/* Definition */}
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {term.definition}
            </p>

            {/* Source link */}
            {module && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Source
                </div>
                <Link
                  href={`/modules/${module.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                  }}
                  onClick={onClose}
                >
                  <span>{module.icon}</span>
                  <span>
                    Module {module.id}: {module.title}
                  </span>
                  <span style={{ fontSize: '0.8rem' }}>→</span>
                </Link>
              </div>
            )}

            {/* Related terms */}
            {relatedTerms && relatedTerms.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Related Terms
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {relatedTerms.map(related => (
                    <span
                      key={related.id}
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-text-secondary)',
                        backgroundColor: 'var(--color-glass-light)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.25rem',
                        border: '1px solid var(--color-glass-border)',
                      }}
                    >
                      {related.term}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
