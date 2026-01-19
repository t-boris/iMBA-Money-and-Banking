'use client';

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
        <a
          href="/"
          style={{
            fontWeight: 600,
            fontSize: '18px',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
          }}
        >
          iMBA Money & Banking
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
