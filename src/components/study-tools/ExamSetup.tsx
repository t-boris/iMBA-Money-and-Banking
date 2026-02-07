'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { modules } from '@/data/modules';
import { getModulesWithQuestions, getQuestionCountForModules } from '@/data/examQuestions';

interface ExamSetupProps {
  onStart: (count: 5 | 10 | 15 | 20, moduleIds: number[]) => void;
  totalQuestions: number;
}

const questionCounts: (5 | 10 | 15 | 20)[] = [5, 10, 15, 20];

export function ExamSetup({ onStart, totalQuestions: _totalQuestions }: ExamSetupProps) {
  const modulesWithQuestions = getModulesWithQuestions();
  const [selectedModules, setSelectedModules] = useState<number[]>(modulesWithQuestions);

  const availableCount = getQuestionCountForModules(selectedModules);

  const toggleModule = (moduleId: number) => {
    setSelectedModules((prev) => {
      if (prev.includes(moduleId)) {
        // Prevent deselecting last module
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== moduleId);
      }
      return [...prev, moduleId].sort((a, b) => a - b);
    });
  };

  const selectAll = () => {
    setSelectedModules(modulesWithQuestions);
  };

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
          {availableCount} questions available • 40% hard, 40% medium, 20% easy
        </p>
      </motion.div>

      {/* Module selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <p
          style={{
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '0.25rem',
          }}
        >
          Select Modules
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          {modulesWithQuestions.map((moduleId, index) => {
            const mod = modules.find((m) => m.id === moduleId);
            const isActive = selectedModules.includes(moduleId);
            return (
              <motion.button
                key={moduleId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 + index * 0.04 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleModule(moduleId)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  borderRadius: '0.75rem',
                  border: `2px solid ${isActive ? 'var(--color-primary)' : 'var(--color-glass-border)'}`,
                  backgroundColor: isActive
                    ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)'
                    : 'var(--color-glass-light)',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background-color 0.2s, color 0.2s',
                }}
              >
                {mod?.icon} Module {moduleId}
              </motion.button>
            );
          })}
        </div>
        {/* Preset buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '0.8rem',
          }}
        >
          <button
            onClick={selectAll}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '0.8rem',
              padding: '0.25rem',
            }}
          >
            All
          </button>
          <button
            onClick={() => setSelectedModules([1, 2, 3, 4].filter((id) => modulesWithQuestions.includes(id)))}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '0.8rem',
              padding: '0.25rem',
            }}
          >
            Modules 1-4
          </button>
        </div>
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
          {questionCounts.map((count, index) => {
            const isDisabled = count > availableCount;
            return (
              <motion.button
                key={count}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                whileHover={isDisabled ? undefined : { scale: 1.05 }}
                whileTap={isDisabled ? undefined : { scale: 0.95 }}
                onClick={() => !isDisabled && onStart(count, selectedModules)}
                disabled={isDisabled}
                style={{
                  padding: '1rem 1.5rem',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  border: '2px solid var(--color-glass-border)',
                  backgroundColor: 'var(--color-glass-light)',
                  color: isDisabled ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.5 : 1,
                  transition: 'border-color 0.2s, background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled) {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.backgroundColor =
                      'color-mix(in srgb, var(--color-primary) 10%, transparent)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-glass-border)';
                  e.currentTarget.style.backgroundColor = 'var(--color-glass-light)';
                }}
              >
                {count}
              </motion.button>
            );
          })}
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
