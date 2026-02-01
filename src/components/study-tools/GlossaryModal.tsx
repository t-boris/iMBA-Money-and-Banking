'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { GlossaryTerm, Lesson } from '@/types';
import { modules } from '@/data/modules';
import { module1Lessons } from '@/data/module1';
import { module2Lessons } from '@/data/module2';
import { module3Lessons } from '@/data/module3';

// Combine all lessons for lookup
const allLessons: Record<number, Lesson[]> = {
  1: module1Lessons,
  2: module2Lessons,
  3: module3Lessons,
};

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

  const termModule = modules.find((m) => m.id === term.moduleId);
  const moduleLessons = allLessons[term.moduleId] || [];
  // Handle sub-lesson IDs like "1-1.1" by matching the main lesson "1-1"
  const mainLessonId = term.lessonId.includes('.')
    ? term.lessonId.split('.')[0]
    : term.lessonId;
  const termLesson = moduleLessons.find((l) => l.id === mainLessonId);
  const relatedTerms = term.relatedTerms
    ?.map((id) => allTerms.find((t) => t.id === id))
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
              maxWidth: '560px',
              maxHeight: '85vh',
              backgroundColor: 'var(--color-surface-1)',
              border: '1px solid var(--color-surface-2)',
              borderRadius: '1rem',
              padding: '2rem',
              zIndex: 101,
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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

            {/* Example */}
            {term.example && (
              <div
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: 'var(--color-surface-2)',
                  borderRadius: '0.5rem',
                  borderLeft: '3px solid var(--color-primary)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Example
                </div>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {term.example}
                </p>
              </div>
            )}

            {/* Source link */}
            {termModule && (
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
                  href={`/modules/${termModule.slug}#lesson-${mainLessonId}`}
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
                  <span>{termModule.icon}</span>
                  <span>
                    Module {termModule.id}: {termModule.title}
                    {termLesson && ` → ${termLesson.title}`}
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
                  {relatedTerms.map((related) => (
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
