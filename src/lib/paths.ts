// Shared helpers used across routes and components.

import { isHttpUrl, isSafeRelativePath } from './security';

// Base default site origin value reused across the app configuration.
const defaultSiteOrigin = 'http://localhost:3000';

// Normalizes base path so downstream code sees a consistent format.
function normalizeBasePath(value: string) {
  if (!value) return '';
  const normalized = value.startsWith('/') ? value : `/${value}`;
  return normalized.endsWith('/') && normalized !== '/' ? normalized.slice(0, -1) : normalized;
}

// Base path value reused across the app configuration.
export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? '');

// Prefix internal paths with NEXT_PUBLIC_BASE_PATH when needed.
export const withBasePath = (value: string) => {
  if (!value) return '';
  if (isHttpUrl(value)) return value;
  if (!isSafeRelativePath(value)) return '';
  return `${basePath}${value}`;
};

// Resolve the canonical site origin used in metadata and sitemap links.
export const getSiteOrigin = () => {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (basePath ? 'https://christoferpiedra.github.io/voltage-website' : defaultSiteOrigin);
  if (!isHttpUrl(configured)) return defaultSiteOrigin;
  return configured.endsWith('/') ? configured.slice(0, -1) : configured;
};
