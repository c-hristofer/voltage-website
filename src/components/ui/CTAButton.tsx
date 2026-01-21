import Link from 'next/link';
import { basePath } from '@/lib/paths';
import { cn } from '@/lib/utils';

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
};

const normalizeHref = (href: string) => {
  if (!href) return '#';

  const lower = href.toLowerCase();
  const isExternal =
    lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('mailto:') || lower.startsWith('tel:');
  if (isExternal || href.startsWith('#')) return href;

  if (basePath && href.startsWith(`${basePath}/`)) {
    const trimmed = href.slice(basePath.length);
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }

  return href;
};

export default function CTAButton({ href, label, variant = 'solid', className }: CTAButtonProps) {
  const base =
    'cta-button inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] transition focus-visible:outline-none shadow-[0_8px_24px_rgba(0,0,0,0.45)] will-change-transform';
  const variants = {
    solid:
      'cta-button-solid bg-[#0429d2] text-[#ffe800] transition-transform hover:-translate-y-[1px] dark:bg-[#ffe800] dark:text-[#0429d2]',
    outline:
      'cta-button-outline border border-white/50 text-[#0429d2] hover:border-accent hover:text-accent bg-white/5 backdrop-blur dark:border-white/60 dark:bg-white/10 dark:text-white dark:hover:text-accent',
    ghost: 'cta-button-ghost text-white hover:text-accent'
  } as const;

  return (
    <Link href={normalizeHref(href)} className={cn(base, variants[variant], className)}>
      {label}
    </Link>
  );
}
