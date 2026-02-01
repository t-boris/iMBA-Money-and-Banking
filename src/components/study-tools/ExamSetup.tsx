'use client';

import { motion } from 'motion/react';

interface ExamSetupProps {
  onStart: (count: 5 | 10 | 15 | 20) => void;
  totalQuestions: number;
}

const questionCounts: (5 | 10 | 15 | 20)[] = [5, 10, 15, 20];

export function ExamSetup({ onStart, totalQuestions }: ExamSetupProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.5rem',
          }}
        >
          Exam Practice
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
          Test your knowledge with practice questions
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
          {totalQuestions} questions available • 40% hard, 40% medium, 20% easy
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <p
          style={{
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '0.5rem',
          }}
        >
          How many questions?
        </p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {questionCounts.map((count, index) => (
            <motion.button
              key={count}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStart(count)}
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1.25rem',
                fontWeight: 600,
                borderRadius: '0.75rem',
                border: '2px solid var(--color-glass-border)',
                backgroundColor: 'var(--color-glass-light)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.backgroundColor =
                  'color-mix(in srgb, var(--color-primary) 10%, transparent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-glass-border)';
                e.currentTarget.style.backgroundColor = 'var(--color-glass-light)';
              }}
            >
              {count}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: '1rem',
          padding: '1rem 1.5rem',
          backgroundColor: 'var(--color-glass-light)',
          borderRadius: '0.5rem',
          border: '1px solid var(--color-glass-border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span>🎯 +10 pts per correct answer</span>
          <span>🔥 Streak bonuses</span>
          <span>🏆 Earn badges</span>
        </div>
      </motion.div>
    </div>
  );
}
