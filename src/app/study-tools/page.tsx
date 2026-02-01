'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const tools = [
  {
    id: 'glossary',
    title: 'Glossary',
    description: 'Browse all definitions from every lecture, filterable by type and first letter.',
    icon: '📖',
    href: '/study-tools/glossary',
    color: 'var(--color-primary)',
  },
  {
    id: 'exam',
    title: 'Exam Practice',
    description:
      'Test your knowledge with practice questions. Track your progress and earn badges.',
    icon: '📝',
    href: '/study-tools/exam',
    color: 'var(--color-emerald)',
  },
];

export default function StudyToolsPage() {
  return (
    <main style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              color: 'var(--color-text-primary)',
            }}
          >
            Study Tools
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Reinforce your learning with our interactive glossary and practice exams.
          </p>
        </motion.div>

        {/* Tool Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={tool.href} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: 'var(--color-glass-light)',
                    border: '1px solid var(--color-glass-border)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  <div
                    style={{
                      fontSize: '3rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {tool.icon}
                  </div>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {tool.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {tool.description}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
