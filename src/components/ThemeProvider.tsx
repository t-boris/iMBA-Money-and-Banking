'use client';

import { createContext, useContext, useEffect, useState, startTransition } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use startTransition for non-urgent state updates to avoid React Compiler warnings
    startTransition(() => {
      setMounted(true);
      // Check localStorage or system preference
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored) {
        setTheme(stored);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const context = useContext(ThemeContext);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  // Don't render during SSR or before mount
  if (!mounted || !context) {
    return <div style={{ width: '85px', height: '36px' }} />;
  }

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 12px',
        borderRadius: '8px',
        backgroundColor: 'var(--color-surface-2)',
        border: '1px solid var(--color-glass-border)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: 'var(--color-text-secondary)',
        transition: 'all 0.2s',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span style={{ fontSize: '16px' }}>{theme === 'light' ? '🌙' : '☀️'}</span>
      <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
