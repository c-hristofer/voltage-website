// Unit tests for URL safety and JSON-LD escaping helpers.

import { describe, expect, it } from 'vitest';
import {
  isHttpUrl,
  isSafeHref,
  isSafeLinkField,
  sanitizeHref,
  serializeJsonLd
} from './security';

describe('url safety helpers', () => {
  it('accepts only http(s) absolute URLs when required', () => {
    expect(isHttpUrl('https://example.com')).toBe(true);
    expect(isHttpUrl('http://example.com')).toBe(true);
    expect(isHttpUrl('javascript:alert(1)')).toBe(false);
  });

  it('allows root-relative paths for content-managed links', () => {
    expect(isSafeLinkField('/documents/handbook.pdf')).toBe(true);
    expect(isSafeLinkField('//evil.example.com')).toBe(false);
  });

  it('sanitizes unknown href values to a safe fallback', () => {
    expect(isSafeHref('/resources')).toBe(true);
    expect(isSafeHref('mailto:teamvoltage386@gmail.com')).toBe(true);
    expect(sanitizeHref('javascript:alert(1)')).toBe('#');
  });
});

describe('serializeJsonLd', () => {
  it('escapes characters that can break out of script tags', () => {
    const serialized = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    expect(serialized).toContain('\\u003c/script\\u003e');
    expect(serialized).not.toContain('</script>');
  });
});
