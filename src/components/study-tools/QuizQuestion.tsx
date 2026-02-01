'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExamQuestion } from '@/types';

interface QuizQuestionProps {
  question: ExamQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  timePerQuestion: number; // seconds
}

const difficultyColors = {
  easy: 'var(--color-emerald)',
  medium: 'var(--color-amber)',
  hard: 'var(--color-rose)',
};

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  timePerQuestion,
}: QuizQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setHasAnswered(false);
    setTimeLeft(timePerQuestion);
  }, [question.id, timePerQuestion]);

  const handleSubmit = useCallback((index: number) => {
    if (hasAnswered) return;
    setSelectedIndex(index);
    setHasAnswered(true);
    const isCorrect = index === question.correctIndex;
    onAnswer(isCorrect);
  }, [hasAnswered, question.correctIndex, onAnswer]);

  // Timer
  useEffect(() => {
    if (hasAnswered || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          // Time's up - auto-submit as wrong
          handleSubmit(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasAnswered, timeLeft, handleSubmit]);

  const isCorrect = selectedIndex === question.correctIndex;
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '70vh',
        padding: '2rem 0',
      }}
    >
      {/* Header with progress and timer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
            }}
          >
            Question {questionNumber} of {totalQuestions}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              backgroundColor: `color-mix(in srgb, ${difficultyColors[question.difficulty]} 20%, transparent)`,
              color: difficultyColors[question.difficulty],
            }}
          >
            {question.difficulty}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: timeLeft <= 10 ? 'var(--color-rose)' : 'var(--color-text-primary)',
          }}
        >
          ⏱️ {timeLeft}s
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: '4px',
          backgroundColor: 'var(--color-glass-border)',
          borderRadius: '2px',
          marginBottom: '2rem',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{
            height: '100%',
            backgroundColor: 'var(--color-primary)',
          }}
        />
      </div>

      {/* Question */}
      <motion.h2
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '2rem',
          lineHeight: 1.5,
        }}
      >
        {question.question}
      </motion.h2>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectAnswer = index === question.correctIndex;
          const showCorrect = hasAnswered && isCorrectAnswer;
          const showWrong = hasAnswered && isSelected && !isCorrectAnswer;

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={!hasAnswered ? { scale: 1.01 } : {}}
              whileTap={!hasAnswered ? { scale: 0.99 } : {}}
              onClick={() => handleSubmit(index)}
              disabled={hasAnswered}
              style={{
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                textAlign: 'left',
                borderRadius: '0.75rem',
                border: `2px solid ${
                  showCorrect
                    ? 'var(--color-emerald)'
                    : showWrong
                    ? 'var(--color-rose)'
                    : isSelected
                    ? 'var(--color-primary)'
                    : 'var(--color-glass-border)'
                }`,
                backgroundColor: showCorrect
                  ? 'color-mix(in srgb, var(--color-emerald) 15%, transparent)'
                  : showWrong
                  ? 'color-mix(in srgb, var(--color-rose) 15%, transparent)'
                  : 'var(--color-glass-light)',
                color: 'var(--color-text-primary)',
                cursor: hasAnswered ? 'default' : 'pointer',
                transition: 'border-color 0.2s, background-color 0.2s',
              }}
            >
              <span style={{ fontWeight: 600, marginRight: '0.75rem' }}>
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
              {showCorrect && <span style={{ float: 'right' }}>✓</span>}
              {showWrong && <span style={{ float: 'right' }}>✗</span>}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              backgroundColor: isCorrect
                ? 'color-mix(in srgb, var(--color-emerald) 10%, transparent)'
                : 'color-mix(in srgb, var(--color-rose) 10%, transparent)',
              border: `1px solid ${isCorrect ? 'var(--color-emerald)' : 'var(--color-rose)'}`,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: '1.1rem',
                marginBottom: '0.75rem',
                color: isCorrect ? 'var(--color-emerald)' : 'var(--color-rose)',
              }}
            >
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              {isCorrect && ' +10 points'}
            </div>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              {question.explanation}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              {questionNumber === totalQuestions ? 'See Results' : 'Next Question →'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
