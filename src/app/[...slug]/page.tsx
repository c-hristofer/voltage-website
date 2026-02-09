// This catch-all route maps URL segments to the flat route modules in src/routes.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNewsSlugs, getResourceSlugs, getRobotYears } from '@/lib/content';
import AboutPage, { metadata as aboutMetadata } from '@/routes/about';
import AboutAwardsPage, { metadata as aboutAwardsMetadata } from '@/routes/about-awards';
import AboutHistoryPage, { metadata as aboutHistoryMetadata } from '@/routes/about-history';
import CalendarPage, { metadata as calendarMetadata } from '@/routes/calendar';
import ContactPage, { metadata as contactMetadata } from '@/routes/contact';
import DonatePage, { metadata as donateMetadata } from '@/routes/donate';
import NewsPage, { metadata as newsIndexMetadata } from '@/routes/news-index';
import NewsDetailPage, {
  generateMetadata as generateNewsDetailMetadata
} from '@/routes/news-detail';
import OutreachPage, { metadata as outreachIndexMetadata } from '@/routes/outreach-index';
import OutreachDetailPage, {
  generateMetadata as generateOutreachDetailMetadata
} from '@/routes/outreach-detail';
import ResourcesPage, { metadata as resourcesIndexMetadata } from '@/routes/resources-index';
import ResourcesDetailPage, {
  generateMetadata as generateResourcesDetailMetadata
} from '@/routes/resources-detail';
import RobotsPage, { metadata as robotsIndexMetadata } from '@/routes/robots-index';
import RobotsDetailPage, {
  generateMetadata as generateRobotsDetailMetadata
} from '@/routes/robots-detail';
import SponsorsPage, { metadata as sponsorsMetadata } from '@/routes/sponsors';

type ParsedRoute =
  | { kind: 'about' }
  | { kind: 'about-awards' }
  | { kind: 'about-history' }
  | { kind: 'calendar' }
  | { kind: 'contact' }
  | { kind: 'donate' }
  | { kind: 'join-alias' }
  | { kind: 'news-index' }
  | { kind: 'news-detail'; slug: string }
  | { kind: 'outreach-index' }
  | { kind: 'outreach-detail'; slug: string }
  | { kind: 'resources-index' }
  | { kind: 'resources-detail'; slug: string }
  | { kind: 'robots-index' }
  | { kind: 'robots-detail'; year: string }
  | { kind: 'sponsors' };

// Parses route into a predictable shape.
function parseRoute(segments: string[]): ParsedRoute | null {
  if (segments.length === 1) {
    const [first] = segments;
    if (first === 'about') return { kind: 'about' };
    if (first === 'calendar') return { kind: 'calendar' };
    if (first === 'contact') return { kind: 'contact' };
    if (first === 'donate') return { kind: 'donate' };
    if (first === 'join') return { kind: 'join-alias' };
    if (first === 'news') return { kind: 'news-index' };
    if (first === 'outreach') return { kind: 'outreach-index' };
    if (first === 'resources') return { kind: 'resources-index' };
    if (first === 'robots') return { kind: 'robots-index' };
    if (first === 'sponsors') return { kind: 'sponsors' };
    return null;
  }

  if (segments.length === 2) {
    const [first, second] = segments;
    if (first === 'about' && second === 'awards') return { kind: 'about-awards' };
    if (first === 'about' && second === 'history') return { kind: 'about-history' };
    if (first === 'news') return { kind: 'news-detail', slug: second };
    if (first === 'outreach') return { kind: 'outreach-detail', slug: second };
    if (first === 'resources') return { kind: 'resources-detail', slug: second };
    if (first === 'robots') return { kind: 'robots-detail', year: second };
  }

  return null;
}

export const dynamicParams = false;
export const revalidate = false;

// Precomputes dynamic path values so Next.js can statically generate each route.
export async function generateStaticParams() {
  const [newsSlugs, resourceSlugsFromContent, robotYearsFromContent] = await Promise.all([
    getNewsSlugs(),
    getResourceSlugs(),
    getRobotYears()
  ]);

  // Outreach detail pages generated from static slug constants.
  const outreachDetailSlugs = ['media', 'summer-camp'];
  // Resource detail pages generated from static slug constants.
  const resourceDetailSlugs = [
    'join-team',
    'pre-season-forms',
    'forms',
    ...resourceSlugsFromContent
  ];
  // Keep year slugs in one list so static generation stays predictable.
  const robotYears = ['2026', ...robotYearsFromContent.map((year) => year.toString())];

  const staticSegments: string[][] = [
    ['about'],
    ['about', 'awards'],
    ['about', 'history'],
    ['calendar'],
    ['contact'],
    ['donate'],
    ['join'],
    ['news'],
    ['outreach'],
    ['resources'],
    ['robots'],
    ['sponsors']
  ];

  // Build the full route list in one place before deduping.
  const allSegments = [
    ...staticSegments,
    ...newsSlugs.map((slug) => ['news', slug]),
    ...outreachDetailSlugs.map((slug) => ['outreach', slug]),
    ...resourceDetailSlugs.map((slug) => ['resources', slug]),
    ...robotYears.map((year) => ['robots', year])
  ];

  const unique = new Set(allSegments.map((segments) => segments.join('/')));
  return Array.from(unique).map((value) => ({ slug: value.split('/') }));
}

// Builds page metadata for this route using the current URL parameters.
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Parse once so metadata and page rendering follow the exact same route rules.
  const route = parseRoute(slug);

  if (!route) {
    return { title: 'Not Found' };
  }

  switch (route.kind) {
    case 'about':
      return aboutMetadata;
    case 'about-awards':
      return aboutAwardsMetadata;
    case 'about-history':
      return aboutHistoryMetadata;
    case 'calendar':
      return calendarMetadata;
    case 'contact':
      return contactMetadata;
    case 'donate':
      return donateMetadata;
    case 'join-alias':
      return generateResourcesDetailMetadata({ params: Promise.resolve({ slug: 'join-team' }) });
    case 'news-index':
      return newsIndexMetadata;
    case 'news-detail':
      return generateNewsDetailMetadata({ params: Promise.resolve({ slug: route.slug }) });
    case 'outreach-index':
      return outreachIndexMetadata;
    case 'outreach-detail':
      return generateOutreachDetailMetadata({ params: Promise.resolve({ slug: route.slug }) });
    case 'resources-index':
      return resourcesIndexMetadata;
    case 'resources-detail':
      return generateResourcesDetailMetadata({ params: Promise.resolve({ slug: route.slug }) });
    case 'robots-index':
      return robotsIndexMetadata;
    case 'robots-detail':
      return generateRobotsDetailMetadata({ params: Promise.resolve({ year: route.year }) });
    case 'sponsors':
      return sponsorsMetadata;
    default:
      return { title: 'Not Found' };
  }
}

// Renders the flat route page.
export default async function FlatRoutePage({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  // Parse once so metadata and page rendering follow the exact same route rules.
  const route = parseRoute(slug);

  if (!route) {
    notFound();
  }

  switch (route.kind) {
    case 'about':
      return <AboutPage />;
    case 'about-awards':
      return <AboutAwardsPage />;
    case 'about-history':
      return <AboutHistoryPage />;
    case 'calendar':
      return <CalendarPage />;
    case 'contact':
      return <ContactPage />;
    case 'donate':
      return <DonatePage />;
    case 'join-alias':
      return <ResourcesDetailPage params={Promise.resolve({ slug: 'join-team' })} />;
    case 'news-index':
      return <NewsPage />;
    case 'news-detail':
      return <NewsDetailPage params={Promise.resolve({ slug: route.slug })} />;
    case 'outreach-index':
      return <OutreachPage />;
    case 'outreach-detail':
      return <OutreachDetailPage params={Promise.resolve({ slug: route.slug })} />;
    case 'resources-index':
      return <ResourcesPage />;
    case 'resources-detail':
      return <ResourcesDetailPage params={Promise.resolve({ slug: route.slug })} />;
    case 'robots-index':
      return <RobotsPage />;
    case 'robots-detail':
      return <RobotsDetailPage params={Promise.resolve({ year: route.year })} />;
    case 'sponsors':
      return <SponsorsPage />;
    default:
      notFound();
  }
}
