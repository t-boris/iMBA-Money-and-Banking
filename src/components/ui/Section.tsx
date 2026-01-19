import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'section' | 'div' | 'article';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'lg', as: Component = 'section', children, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          spacing === 'sm' && 'py-8',
          spacing === 'md' && 'py-12',
          spacing === 'lg' && 'py-16 md:py-20',
          spacing === 'xl' && 'py-20 md:py-28',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';
