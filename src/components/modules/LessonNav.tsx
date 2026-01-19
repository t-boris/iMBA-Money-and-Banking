'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Lesson } from '@/types';
import { cn } from '@/lib/utils';

interface LessonNavProps {
  lessons: Lesson[];
  activeLesson: string;
  onLessonChange: (lessonId: string) => void;
  className?: string;
}

export function LessonNav({
  lessons,
  activeLesson,
  onLessonChange,
  className,
}: LessonNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLessonClick = (lessonId: string) => {
    onLessonChange(lessonId);
    setMobileOpen(false);
  };

  const currentLesson = lessons.find((l) => l.id === activeLesson);

  return (
    <nav className={cn('lesson-nav', className)}>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {lessons.map((lesson) => {
              const isActive = activeLesson === lesson.id;
              return (
                <li key={lesson.id}>
                  <button
                    onClick={() => handleLessonClick(lesson.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                      color: isActive ? 'var(--color-primary-500)' : 'var(--color-text-secondary)',
                      fontWeight: isActive ? 500 : 400,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span>{lesson.title}</span>
                    {isActive && (
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary-500)',
                      }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '8px',
            border: '1px solid var(--color-surface-2)',
            color: 'var(--color-text-primary)',
            fontWeight: 500,
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <span>{currentLesson?.title || 'Select Lesson'}</span>
          <motion.span
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <ul style={{
                listStyle: 'none',
                margin: '8px 0 0 0',
                padding: '8px 0',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '8px',
                border: '1px solid var(--color-surface-2)',
                maxHeight: '60vh',
                overflowY: 'auto',
              }}>
                {lessons.map((lesson) => {
                  const isActive = activeLesson === lesson.id;
                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => handleLessonClick(lesson.id)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px 16px',
                          border: 'none',
                          background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                          color: isActive ? 'var(--color-primary-500)' : 'var(--color-text-secondary)',
                          fontWeight: isActive ? 500 : 400,
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        {lesson.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
