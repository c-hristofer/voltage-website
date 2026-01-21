import type { MetadataRoute } from 'next';
import { getNewsList, getRobots } from '@/lib/content';

const baseUrl = 'https://www.teamvoltage.org';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [robots, news] = await Promise.all([getRobots(), getNewsList()]);
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
    '/news'
  ];

  const robotRoutes = robots.map((robot) => `/robots/${robot.frontmatter.year}`);
  const newsRoutes = news.map((post) => `/news/${post.slug}`);

  return [...staticRoutes, ...robotRoutes, ...newsRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
