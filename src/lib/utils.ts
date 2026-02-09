// Shared helpers used across routes and components.

import { ClassValue, clsx } from 'clsx';

// Combines class names while safely skipping falsey values.
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Formats date for display.
export function formatDate(value: string | Date) {
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return value.toString();
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

// Convert text into a URL-friendly slug.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}
