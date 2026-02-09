import type { NextConfig } from 'next';

const defaultBasePath = process.env.NODE_ENV === 'production' ? '/voltage-website' : '';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? defaultBasePath;
const assetPrefix = basePath ? `${basePath}/` : undefined;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (basePath
    ? 'https://christoferpiedra.github.io/voltage-website'
    : 'http://localhost:3000');

const nextConfig: NextConfig = {
  output: 'export',
  poweredByHeader: false,
  reactStrictMode: true,
  ...(basePath ? { basePath } : {}),
  ...(assetPrefix ? { assetPrefix } : {}),
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? '',
    NEXT_PUBLIC_SITE_URL: siteUrl
  }
};

export default nextConfig;
