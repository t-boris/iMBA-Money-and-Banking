'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { GlossaryTerm } from '@/types';
import { glossaryTerms, glossaryLetters, glossaryTypes } from '@/data/glossary';
import { GlossaryCard } from '@/components/study-tools/GlossaryCard';
import { GlossaryModal } from '@/components/study-tools/GlossaryModal';

type FilterType = GlossaryTerm['type'] | 'all';

export default function GlossaryPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      // Letter filter
      if (selectedLetter && !term.term.toUpperCase().startsWith(selectedLetter)) {
        return false;
      }
      // Type filter
      if (selectedType !== 'all' && term.type !== selectedType) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          term.term.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedLetter, selectedType, searchQuery]);

  return (
    <main style={{ minHeight: 'calc(100vh - 64px)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Back link */}
        <Link
          href="/study-tools"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
          }}
        >
          ← Back to Study Tools
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2rem' }}
        >
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: 'var(--color-text-primary)',
            }}
          >
            Glossary
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {glossaryTerms.length} terms from all modules
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1.25rem',
            backgroundColor: 'var(--color-glass-light)',
            borderRadius: '0.75rem',
            border: '1px solid var(--color-glass-border)',
          }}
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--color-glass-border)',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)',
              outline: 'none',
            }}
          />

          {/* Type filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              onClick={() => setSelectedType('all')}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedType === 'all' ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                color: selectedType === 'all' ? 'white' : 'var(--color-text-secondary)',
              }}
            >
              All
            </button>
            {glossaryTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type as FilterType)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  backgroundColor: selectedType === type ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                  color: selectedType === type ? 'white' : 'var(--color-text-secondary)',
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* A-Z filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            <button
              onClick={() => setSelectedLetter(null)}
              style={{
                padding: '0.35rem 0.6rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                borderRadius: '0.25rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedLetter === null ? 'var(--color-primary)' : 'transparent',
                color: selectedLetter === null ? 'white' : 'var(--color-text-secondary)',
              }}
            >
              All
            </button>
            {glossaryLetters.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                style={{
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedLetter === letter ? 'var(--color-primary)' : 'transparent',
                  color: selectedLetter === letter ? 'white' : 'var(--color-text-secondary)',
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div
          style={{
            marginBottom: '1rem',
            fontSize: '0.9rem',
            color: 'var(--color-text-tertiary)',
          }}
        >
          Showing {filteredTerms.length} of {glossaryTerms.length} terms
        </div>

        {/* Card grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {filteredTerms.map((term, index) => (
            <GlossaryCard
              key={term.id}
              term={term}
              onClick={() => setSelectedTerm(term)}
              index={index}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredTerms.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            No terms found matching your filters.
          </div>
        )}

        {/* Modal */}
        <GlossaryModal
          term={selectedTerm}
          onClose={() => setSelectedTerm(null)}
          allTerms={glossaryTerms}
        />
      </div>
    </main>
  );
}
