'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ExamQuestion, StudyProgress, ExamResult } from '@/types';
import { examQuestions, generateExam } from '@/data/examQuestions';
import { ExamSetup } from '@/components/study-tools/ExamSetup';
import { QuizQuestion } from '@/components/study-tools/QuizQuestion';

type ExamState = 'setup' | 'quiz' | 'results';

const STORAGE_KEY = 'study-progress';
const TIME_PER_QUESTION = 30; // seconds

function getInitialProgress(): StudyProgress {
  if (typeof window === 'undefined') {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      currentStreak: 0,
      bestStreak: 0,
      points: 0,
      badges: [],
      examHistory: [],
    };
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    totalQuestions: 0,
    correctAnswers: 0,
    currentStreak: 0,
    bestStreak: 0,
    points: 0,
    badges: [],
    examHistory: [],
  };
}

export default function ExamPage() {
  const [state, setState] = useState<ExamState>('setup');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [progress, setProgress] = useState<StudyProgress>(getInitialProgress);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    setProgress(getInitialProgress());
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: StudyProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  }, []);

  const handleStart = (count: 5 | 10 | 15 | 20, moduleIds: number[]) => {
    const exam = generateExam(count, moduleIds);
    setQuestions(exam);
    setCurrentIndex(0);
    setCorrectCount(0);
    setSessionStreak(0);
    setPointsEarned(0);
    setState('quiz');
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectCount(c => c + 1);
      setSessionStreak(s => s + 1);
      setPointsEarned(p => p + 10);
    } else {
      setSessionStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      // Exam complete - update progress
      const result: ExamResult = {
        date: new Date().toISOString(),
        questionCount: questions.length,
        correctCount: correctCount,
        pointsEarned: pointsEarned,
      };

      const newBadges = [...progress.badges];
      // Check for new badges
      if (!newBadges.includes('first-exam') && progress.examHistory.length === 0) {
        newBadges.push('first-exam');
      }
      if (!newBadges.includes('perfect-score') && correctCount === questions.length) {
        newBadges.push('perfect-score');
      }
      if (!newBadges.includes('streak-5') && sessionStreak >= 5) {
        newBadges.push('streak-5');
      }
      if (!newBadges.includes('streak-10') && sessionStreak >= 10) {
        newBadges.push('streak-10');
      }

      const newProgress: StudyProgress = {
        totalQuestions: progress.totalQuestions + questions.length,
        correctAnswers: progress.correctAnswers + correctCount,
        currentStreak: sessionStreak > 0 ? progress.currentStreak + sessionStreak : 0,
        bestStreak: Math.max(progress.bestStreak, sessionStreak),
        points: progress.points + pointsEarned,
        badges: newBadges,
        lastExamDate: new Date().toISOString(),
        examHistory: [...progress.examHistory, result].slice(-10), // Keep last 10
      };

      saveProgress(newProgress);
      setState('results');
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  const handleRetry = () => {
    setState('setup');
    setQuestions([]);
    setCurrentIndex(0);
    setCorrectCount(0);
    setSessionStreak(0);
    setPointsEarned(0);
  };

  return (
    <main style={{ minHeight: 'calc(100vh - 64px)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Back link (only in setup) */}
        {state === 'setup' && (
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
        )}

        {/* Setup screen */}
        {state === 'setup' && (
          <ExamSetup onStart={handleStart} totalQuestions={examQuestions.length} />
        )}

        {/* Quiz screen */}
        {state === 'quiz' && questions[currentIndex] && (
          <>
            {/* Stats bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                marginBottom: '1rem',
                backgroundColor: 'var(--color-glass-light)',
                borderRadius: '0.5rem',
                border: '1px solid var(--color-glass-border)',
                fontSize: '0.9rem',
              }}
            >
              <span>
                🎯 {correctCount}/{currentIndex + (questions[currentIndex] ? 0 : 1)} correct
              </span>
              <span>🔥 Streak: {sessionStreak}</span>
              <span>⭐ +{pointsEarned} pts</span>
            </div>
            <QuizQuestion
              question={questions[currentIndex]}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
              timePerQuestion={TIME_PER_QUESTION}
            />
          </>
        )}

        {/* Results screen */}
        {state === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '3rem 0',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {correctCount === questions.length
                ? '🏆'
                : correctCount >= questions.length * 0.7
                ? '🎉'
                : correctCount >= questions.length * 0.5
                ? '👍'
                : '📚'}
            </div>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '0.5rem',
              }}
            >
              {correctCount === questions.length
                ? 'Perfect Score!'
                : correctCount >= questions.length * 0.7
                ? 'Great Job!'
                : correctCount >= questions.length * 0.5
                ? 'Good Effort!'
                : 'Keep Practicing!'}
            </h2>
            <p
              style={{
                fontSize: '1.25rem',
                color: 'var(--color-text-secondary)',
                marginBottom: '2rem',
              }}
            >
              You got {correctCount} out of {questions.length} correct
            </p>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                marginBottom: '2rem',
                width: '100%',
                maxWidth: '500px',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--color-glass-light)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--color-glass-border)',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  +{pointsEarned}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
                  Points Earned
                </div>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--color-glass-light)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--color-glass-border)',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-emerald)' }}>
                  {progress.bestStreak}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
                  Best Streak
                </div>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--color-glass-light)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--color-glass-border)',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-amber)' }}>
                  {progress.points}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
                  Total Points
                </div>
              </div>
            </div>

            {/* Badges */}
            {progress.badges.length > 0 && (
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-text-tertiary)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Badges Earned
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  {progress.badges.includes('first-exam') && <span title="First Exam">🎓</span>}
                  {progress.badges.includes('perfect-score') && <span title="Perfect Score">💯</span>}
                  {progress.badges.includes('streak-5') && <span title="5 Streak">🔥</span>}
                  {progress.badges.includes('streak-10') && <span title="10 Streak">⚡</span>}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRetry}
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
                Try Again
              </motion.button>
              <Link
                href="/study-tools"
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '0.5rem',
                  border: '2px solid var(--color-glass-border)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Back to Study Tools
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
