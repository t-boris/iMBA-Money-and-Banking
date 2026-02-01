'use client';

import Link from 'next/link';
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
          }}
        >
          iMBA Money & Banking
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            href="/study-tools"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
          >
            Study Tools
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
