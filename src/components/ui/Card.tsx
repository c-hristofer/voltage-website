// Shared UI component.

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

// Generic card shell used by content sections.
export default function Card({ title, description, children, className }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-3xl border border-white/10 p-6 shadow-[var(--drop-shadow-card)]',
        className
      )}
    >
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
      {description && <p className="mt-2 text-sm text-white/70">{description}</p>}
      {children && <div className="mt-4 space-y-3 text-sm text-white/80">{children}</div>}
    </div>
  );
}
