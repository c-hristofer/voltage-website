// Shared UI component.

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

// Standard heading block used at the top of each section.
export default function SectionHeader({ eyebrow, title, description, align = 'left', className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'space-y-4',
        align === 'center' && 'text-center items-center',
        'relative',
        className
      )}
    >
      <span className="pointer-events-none absolute inset-x-0 top-1 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-light">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl text-foreground drop-shadow-[0_3px_12px_rgba(0,0,0,0.25)] md:text-4xl">
        {title}
      </h2>
      {description && <p className="text-base text-muted">{description}</p>}
    </div>
  );
}
