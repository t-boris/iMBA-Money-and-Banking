// Design tokens for programmatic access
export const colors = {
  primary: {
    500: 'var(--color-primary-500)',
    600: 'var(--color-primary-600)',
  },
  glass: {
    light: 'var(--color-glass-light)',
    dark: 'var(--color-glass-dark)',
    border: 'var(--color-glass-border)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted: 'var(--color-text-muted)',
  },
  surface: {
    0: 'var(--color-surface-0)',
    1: 'var(--color-surface-1)',
    2: 'var(--color-surface-2)',
  },
} as const;

export const spacing = {
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
  '2xl': 'var(--spacing-2xl)',
} as const;

export const radius = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  full: 'var(--radius-full)',
} as const;

export const fontSize = {
  xs: 'var(--font-size-xs)',
  sm: 'var(--font-size-sm)',
  base: 'var(--font-size-base)',
  lg: 'var(--font-size-lg)',
  xl: 'var(--font-size-xl)',
  '2xl': 'var(--font-size-2xl)',
  '3xl': 'var(--font-size-3xl)',
  '4xl': 'var(--font-size-4xl)',
} as const;

export const lineHeight = {
  tight: 'var(--leading-tight)',
  normal: 'var(--leading-normal)',
  relaxed: 'var(--leading-relaxed)',
} as const;

export const shadow = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  glass: 'var(--shadow-glass)',
} as const;

export const blur = {
  glass: 'var(--blur-glass)',
} as const;
