// App-level Next.js configuration.

import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

// Serve robots.txt metadata.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://www.teamvoltage.org/sitemap.xml'
  };
}
