// Shared UI component.

import type { ComponentProps } from 'react';
import { sanitizeHref } from '@/lib/security';

type ExternalLinkProps = Omit<ComponentProps<'a'>, 'href' | 'target'> & {
  href: string;
  openInNewTab?: boolean;
};

// Ensure rel always includes security attributes for external links.
function mergeRel(rel?: string) {
  const tokens = new Set(['noopener', 'noreferrer']);
  if (rel) {
    rel
      .split(' ')
      .map((value) => value.trim())
      .filter(Boolean)
      .forEach((value) => tokens.add(value));
  }
  return Array.from(tokens).join(' ');
}

// Safe anchor wrapper that sanitizes href and defaults to a new tab.
export default function ExternalLink({
  href,
  openInNewTab = true,
  rel,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      {...props}
      href={sanitizeHref(href)}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? mergeRel(rel) : rel}
    />
  );
}
