import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, gap = 'md', responsive = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          // Gap
          gap === 'sm' && 'gap-4',
          gap === 'md' && 'gap-6',
          gap === 'lg' && 'gap-8',
          gap === 'xl' && 'gap-10',
          // Columns - responsive by default
          responsive && [
            'grid-cols-1',
            cols >= 2 && 'sm:grid-cols-2',
            cols >= 3 && 'md:grid-cols-3',
            cols >= 4 && 'lg:grid-cols-4',
            cols === 6 && 'xl:grid-cols-6',
            cols === 12 && 'xl:grid-cols-12',
          ],
          // Non-responsive
          !responsive && [
            cols === 1 && 'grid-cols-1',
            cols === 2 && 'grid-cols-2',
            cols === 3 && 'grid-cols-3',
            cols === 4 && 'grid-cols-4',
            cols === 6 && 'grid-cols-6',
            cols === 12 && 'grid-cols-12',
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// GridItem for spanning columns
interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 6 | 12 | 'full';
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          span === 1 && 'col-span-1',
          span === 2 && 'col-span-2',
          span === 3 && 'col-span-3',
          span === 4 && 'col-span-4',
          span === 6 && 'col-span-6',
          span === 12 && 'col-span-12',
          span === 'full' && 'col-span-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';
