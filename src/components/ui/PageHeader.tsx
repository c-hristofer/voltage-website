// Shared UI component.

import Link from 'next/link';
import { cn } from '@/lib/utils';

type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  align?: 'left' | 'center';
};

// Page title block with optional breadcrumbs and description text.
export default function PageHeader({ title, description, breadcrumbs = [], align = 'left' }: PageHeaderProps) {
  return (
    <div className={cn('space-y-3', align === 'center' && 'text-center')}>
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.3em] text-white/50">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label}>
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span className="mx-2 text-white/30">/</span>}
            </span>
          ))}
        </nav>
      )}
      <h1 className="font-display text-4xl text-foreground">{title}</h1>
      {description && <p className="text-base text-muted">{description}</p>}
    </div>
  );
}
