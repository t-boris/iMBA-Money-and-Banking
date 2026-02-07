'use client';

import Link from 'next/link';
import { version } from '../../package.json';
import { ThemeToggle } from './ThemeProvider';

export function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--color-glass-light)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-glass-border)',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 600,
            fontSize: '18px',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          iMBA Money & Banking
          <span
            style={{
              fontSize: '10px',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-surface-2)',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            v{version}
          </span>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            href="/study-tools/glossary"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
          >
            Glossary
          </Link>
          <Link
            href="/study-tools/exam"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
          >
            Test
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
