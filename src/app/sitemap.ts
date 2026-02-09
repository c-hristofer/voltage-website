// App-level Next.js configuration.

import type { MetadataRoute } from 'next';
import { getNewsSlugs, getRobotYears } from '@/lib/content';

// Base url value reused across the app configuration.
const baseUrl = 'https://www.teamvoltage.org';

export const dynamic = 'force-static';
export const revalidate = false;

// Build sitemap entries from static and content-driven routes.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [robotYears, newsSlugs] = await Promise.all([getRobotYears(), getNewsSlugs()]);
  // Static pages that are always present.
  const staticRoutes = [
    '',
    '/about',
    '/robots',
    '/resources',
    '/outreach',
    '/outreach/media',
    '/outreach/summer-camp',
    '/sponsors',
    '/calendar',
    '/join',
    '/donate',
    '/contact',
    '/about/awards',
    '/about/history',
    '/news',
    '/resources/forms',
    '/resources/join-team',
    '/resources/pre-season-forms'
  ];

  // Dynamic robot detail routes.
  const robotRoutes = robotYears.map((year) => `/robots/${year}`);
  // Dynamic news detail routes.
  const newsRoutes = newsSlugs.map((slug) => `/news/${slug}`);

  return [...staticRoutes, ...robotRoutes, ...newsRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
