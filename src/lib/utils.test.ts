// Unit tests for shared utility helpers.

import { describe, expect, it } from 'vitest';
import { formatDate, slugify } from './utils';

describe('slugify', () => {
  it('creates URL-friendly slugs', () => {
    expect(slugify('2025 Reefscape Recap!')).toBe('2025-reefscape-recap');
    expect(slugify('  Multiple   Spaces ')).toBe('multiple-spaces');
  });
});

describe('formatDate', () => {
  it('formats ISO dates nicely', () => {
    expect(formatDate('2025-03-18')).toContain('2025');
  });
});
