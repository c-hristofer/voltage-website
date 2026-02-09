// Shared helpers used across routes and components.

import path from 'node:path';
import matter from 'gray-matter';
import { cache, createElement } from 'react';
import type { ReactNode } from 'react';
import {
  awardsSchema,
  historyFrontmatterSchema,
  historyYearFrontmatterSchema,
  linksSchema,
  metricsSchema,
  newsFrontmatterSchema,
  outreachFrontmatterSchema,
  pressKitSchema,
  resourceFrontmatterSchema,
  robotFrontmatterSchema,
  socialsSchema,
  sponsorsSchema,
  teamSchema
} from './schemas';
import type {
  HistoryFrontmatter,
  NewsFrontmatter,
  OutreachFrontmatter,
  ResourceFrontmatter,
  RobotFrontmatter,
  SocialsData
} from './schemas';
import { loadMDXComponent, readFrontmatter, resolveContentPath } from './mdx';
import { readDirectorySafe, readFileUtf8Safe } from './fs-safe';
import { slugify } from './utils';

const contentRoot = path.join(process.cwd(), 'content');
const CONTENT_DATA_DIR = 'data';

type Parser<T> = { parse: (input: unknown) => T };

// Read and validate one JSON file from content/data.
async function readJson<T>(file: string, schema: Parser<T>) {
  const fullPath = path.join(contentRoot, CONTENT_DATA_DIR, file);
  const raw = await readFileUtf8Safe(fullPath);
  return schema.parse(JSON.parse(raw));
}

// Read every MDX filename in a content folder.
async function listMdxFiles(directory: string) {
  const files = await readDirectorySafe(directory);
  return files.filter((file) => file.endsWith('.mdx'));
}

// Read an MDX file and split it into validated frontmatter plus body markdown.
async function readMdxWithMatter<T>(filePath: string, schema: Parser<T>) {
  const source = await readFileUtf8Safe(filePath);
  const parsed = matter(source);
  return {
    frontmatter: schema.parse(parsed.data),
    body: parsed.content.trim()
  };
}

// Turn an MDX filename into a route slug.
function getSlug(fileName: string) {
  return slugify(fileName.replace(/\.mdx$/, ''));
}

// Find the MDX file whose slug matches the route.
async function findMdxBySlug(directory: string, slug: string) {
  const files = await listMdxFiles(directory);
  return files.find((file) => getSlug(file) === slug) ?? null;
}

export const getTeamData = cache(async () => readJson('team.json', teamSchema));
export const getMetrics = cache(async () => readJson('metrics.json', metricsSchema));
export const getSponsors = cache(async () => readJson('sponsors.json', sponsorsSchema));
// Cache global link data so repeated reads stay fast.
export const getLinks = cache(async () => readJson('links.json', linksSchema));
export const getAwards = cache(async () => readJson('awards.json', awardsSchema));
export const getPressKit = cache(async () => readJson('presskit.json', pressKitSchema));
export const getSocials = cache(async (): Promise<SocialsData> =>
  readJson('socials.json', socialsSchema)
);

export type NewsSummary = NewsFrontmatter & { slug: string };

// Route slug list used for statically generating news pages.
export const getNewsSlugs = cache(async (): Promise<string[]> => {
  const dir = resolveContentPath('news');
  const files = await listMdxFiles(dir);
  return files.map((file) => getSlug(file));
});

export const getNewsList = cache(async (): Promise<NewsSummary[]> => {
  const dir = resolveContentPath('news');
  const files = await listMdxFiles(dir);
  const items = await Promise.all(
    files.map(async (file) => {
      const frontmatter = await readFrontmatter(
        path.join(dir, file),
        newsFrontmatterSchema
      );
      return {
        ...frontmatter,
        slug: getSlug(file)
      } satisfies NewsSummary;
    })
  );
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

// Get parsed news frontmatter for one slug.
export async function getNewsFrontmatterBySlug(slug: string) {
  const dir = resolveContentPath('news');
  const match = await findMdxBySlug(dir, slug);
  if (!match) return null;

  const frontmatter = await readFrontmatter(
    path.join(dir, match),
    newsFrontmatterSchema
  );
  return {
    ...frontmatter,
    slug
  } satisfies NewsSummary;
}

// Get rendered news content and frontmatter for one slug.
export async function getNewsBySlug(slug: string) {
  const dir = resolveContentPath('news');
  const match = await findMdxBySlug(dir, slug);
  if (!match) {
    return null;
  }
  const { content, frontmatter } = await loadMDXComponent(
    path.join(dir, match),
    newsFrontmatterSchema
  );
  return { content, frontmatter: frontmatter as NewsFrontmatter, slug };
}

export type RobotSummary = {
  slug: string;
  frontmatter: RobotFrontmatter;
  content: ReactNode;
};

export const getRobotYears = cache(async (): Promise<number[]> => {
  const dir = resolveContentPath('robots');
  const files = await listMdxFiles(dir);
  const years = await Promise.all(
    files.map(async (file) => {
      const frontmatter = await readFrontmatter(
        path.join(dir, file),
        robotFrontmatterSchema
      );
      return frontmatter.year;
    })
  );
  return years;
});

export const getRobots = cache(async () => {
  const dir = resolveContentPath('robots');
  const files = await listMdxFiles(dir);
  const robots = await Promise.all(
    files.map(async (file) => {
      const { content, frontmatter } = await loadMDXComponent(
        path.join(dir, file),
        robotFrontmatterSchema
      );
      return {
        slug: getSlug(file),
        content,
        frontmatter
      };
    })
  );
  return robots.sort((a, b) => b.frontmatter.year - a.frontmatter.year);
});

// Get robot frontmatter for a specific season year.
export async function getRobotFrontmatterByYear(year: number) {
  const dir = resolveContentPath('robots');
  const files = await listMdxFiles(dir);

  for (const file of files) {
    const frontmatter = await readFrontmatter(
      path.join(dir, file),
      robotFrontmatterSchema
    );
    if (frontmatter.year === year) {
      return {
        slug: getSlug(file),
        frontmatter
      };
    }
  }

  return null;
}

// Get rendered robot content for a specific season year.
export async function getRobotByYear(year: number) {
  const dir = resolveContentPath('robots');
  const files = await listMdxFiles(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const frontmatter = await readFrontmatter(filePath, robotFrontmatterSchema);
    if (frontmatter.year !== year) {
      continue;
    }

    const { content, frontmatter: fullFrontmatter } = await loadMDXComponent(
      filePath,
      robotFrontmatterSchema
    );
    return {
      slug: getSlug(file),
      frontmatter: fullFrontmatter as RobotFrontmatter,
      content
    };
  }

  return null;
}

export type OutreachSummary = OutreachFrontmatter & { slug: string; body: string };

export const getOutreachEntries = cache(async (): Promise<OutreachSummary[]> => {
  const dir = resolveContentPath('outreach');
  const files = await listMdxFiles(dir);
  const entries = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(dir, file);
      const { frontmatter, body } = await readMdxWithMatter(
        fullPath,
        outreachFrontmatterSchema
      );
      return {
        ...frontmatter,
        slug: getSlug(file),
        body
      } satisfies OutreachSummary;
    })
  );
  return entries;
});

export type ResourceSummary = ResourceFrontmatter & { slug: string; body: string };

// Route slug list used for statically generating resource pages.
export const getResourceSlugs = cache(async (): Promise<string[]> => {
  const dir = resolveContentPath('resources');
  const files = await listMdxFiles(dir);
  // Pull slugs from frontmatter when present so route names stay editor-friendly.
  const slugs = await Promise.all(
    files.map(async (file) => {
      const frontmatter = await readFrontmatter(
        path.join(dir, file),
        resourceFrontmatterSchema
      );
      return frontmatter.slug || getSlug(file);
    })
  );
  return slugs;
});

export const getResources = cache(async (): Promise<ResourceSummary[]> => {
  const dir = resolveContentPath('resources');
  const files = await listMdxFiles(dir);
  const items = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(dir, file);
      const { frontmatter, body } = await readMdxWithMatter(
        fullPath,
        resourceFrontmatterSchema
      );
      return {
        ...frontmatter,
        slug: frontmatter.slug || getSlug(file),
        body
      } as ResourceSummary;
    })
  );
  return items;
});

// Get one resource entry by slug.
export async function getResourceBySlug(slug: string) {
  const resources = await getResources();
  return resources.find((item) => item.slug === slug) ?? null;
}

type HistoryIndexPayload = {
  years: { year: number; title: string; slug: string; missing?: boolean }[];
  missing?: string[];
};

export type HistoryYearEntry = {
  year: number;
  title: string;
  slug: string;
  missing?: boolean;
  content: ReactNode;
};

export type HistoryTimeline = {
  intro: {
    frontmatter: HistoryFrontmatter;
    content: ReactNode;
  };
  years: HistoryYearEntry[];
  missingSources: string[];
};

// Build the full history timeline payload for the history route.
export async function getHistoryTimeline(): Promise<HistoryTimeline> {
  // If history content is not generated yet, keep the page renderable with a safe fallback.
  const introPath = resolveContentPath('about/history/index.mdx');
  let introComponent: ReactNode = createElement(
    'div',
    { className: 'space-y-3 text-white/80' },
    createElement(
      'h3',
      { className: 'text-xl font-semibold text-white' },
      'In the Beginning...'
    ),
    createElement(
      'p',
      { className: 'text-sm leading-relaxed' },
      "Back in 1999, Melbourne High School faced a unique challenge in South Brevard County. Local corporate sponsors were hesitant to support a single school robotics team, citing concerns that it wouldn't adequately benefit the community. To address this, students from various schools across Brevard County, including Melbourne HS, Palm Bay HS, Satellite HS, Eau Gallie HS, and Melbourne Central Catholic HS, banded together to form Team Voltage. Despite the initial hurdles, the team managed to establish itself in time for the 2000 Season and has been actively participating in FIRST ever since."
    )
  );
  let introFrontmatter: HistoryFrontmatter = {
    title: 'Team Voltage History',
    description: 'Explore Team Voltage milestones from founding through modern seasons.',
    sections: []
  };

  try {
    const { content, frontmatter } = await loadMDXComponent(
      introPath,
      historyFrontmatterSchema
    );
    introComponent = content;
    introFrontmatter = frontmatter as HistoryFrontmatter;
  } catch {
    // fall back to defaults
  }

  const indexPath = resolveContentPath('about/history/years/index.json');
  let indexData: HistoryIndexPayload = { years: [], missing: [] };
  try {
    const raw = await readFileUtf8Safe(indexPath);
    indexData = JSON.parse(raw) as HistoryIndexPayload;
  } catch {
    indexData.missing = [...(indexData.missing ?? []), path.relative(process.cwd(), indexPath)];
  }

  const years: HistoryYearEntry[] = [];
  // Extract a sortable year from metadata when content has mixed naming patterns.
  const resolveChronoYear = (meta: { year: number; title: string; slug: string }) => {
    // Prefer the year in the slug because generated filenames are usually year-based.
    const slugMatch = meta.slug.match(/\d{4}/);
    if (slugMatch) return Number(slugMatch[0]);
    // Fall back to the title if the slug does not include a year.
    const titleMatch = meta.title.match(/\d{4}/);
    if (titleMatch) return Number(titleMatch[0]);
    return meta.year ?? 0;
  };
  // Sort newest to oldest for the timeline page.
  const sortedYearMeta = [...indexData.years].sort((a, b) => {
    const yearA = resolveChronoYear(a);
    const yearB = resolveChronoYear(b);
    if (yearA !== yearB) {
      return yearB - yearA;
    }
    return a.title.localeCompare(b.title);
  });

  for (const meta of sortedYearMeta) {
    try {
      const filePath = resolveContentPath(`about/history/years/${meta.slug}.mdx`);
      const { content } = await loadMDXComponent(filePath, historyYearFrontmatterSchema);
      years.push({
        ...meta,
        content
      });
    } catch {
      years.push({
        ...meta,
        missing: true,
        content: createElement(
          'p',
          { className: 'text-sm text-white/60' },
          'History entry could not be loaded because the generated MDX file is missing.'
        )
      });
    }
  }

  return {
    intro: { frontmatter: introFrontmatter, content: introComponent },
    years,
    missingSources: indexData.missing ?? []
  };
}
