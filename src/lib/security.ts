// Shared helpers used across routes and components.

const HTTP_PROTOCOLS = new Set(['http:', 'https:']);
const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const ROOT_RELATIVE_PATH = /^\/(?!\/)/;

// Parse a string as a URL, returning null when parsing fails.
function toUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

// True for absolute http/https URLs.
export function isHttpUrl(value: string) {
  const parsed = toUrl(value);
  return parsed ? HTTP_PROTOCOLS.has(parsed.protocol) : false;
}

// True for single-slash relative paths like /about.
export function isSafeRelativePath(value: string) {
  return ROOT_RELATIVE_PATH.test(value);
}

// True for links that can safely be stored in content fields.
export function isSafeLinkField(value: string) {
  return isHttpUrl(value) || isSafeRelativePath(value);
}

// True for href values we allow in rendered markup.
export function isSafeHref(value: string) {
  if (value.startsWith('#')) return true;

  const parsed = toUrl(value);
  if (parsed) return SAFE_PROTOCOLS.has(parsed.protocol);

  return isSafeRelativePath(value);
}

// Sanitizes href before it is rendered or stored.
export function sanitizeHref(value: string, fallback = '#') {
  return isSafeHref(value) ? value : fallback;
}

// Escaping these characters prevents script-breakout in JSON-LD script tags.
export function serializeJsonLd(payload: unknown) {
  return JSON.stringify(payload)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
