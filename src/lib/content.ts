import fs from 'node:fs/promises';
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
  sponsorsSchema,
  teamSchema
} from './schemas';
import type {
  NewsFrontmatter,
  OutreachFrontmatter,
  ResourceFrontmatter,
  RobotFrontmatter,
  HistoryFrontmatter
} from './schemas';
import { loadMDXComponent, readFrontmatter, resolveContentPath } from './mdx';
import { slugify } from './utils';

const contentRoot = path.join(process.cwd(), 'content');

async function readJson<T>(file: string, schema: { parse: (input: unknown) => T }) {
  const fullPath = path.join(contentRoot, file);
  const raw = await fs.readFile(fullPath, 'utf8');
  return schema.parse(JSON.parse(raw));
}

export const getTeamData = cache(async () => readJson('data/team.json', teamSchema));
export const getMetrics = cache(async () => readJson('data/metrics.json', metricsSchema));
export const getSponsors = cache(async () => readJson('data/sponsors.json', sponsorsSchema));
export const getLinks = cache(async () => readJson('data/links.json', linksSchema));
export const getAwards = cache(async () => readJson('data/awards.json', awardsSchema));
export const getPressKit = cache(async () => readJson('data/presskit.json', pressKitSchema));

export async function getSocials() {
  const fullPath = path.join(contentRoot, 'data/socials.json');
  const raw = await fs.readFile(fullPath, 'utf8');
  return JSON.parse(raw) as { instagram?: string; youtube?: string };
}

function getSlug(fileName: string) {
  return slugify(fileName.replace(/\.mdx$/, ''));
}

export type NewsSummary = NewsFrontmatter & { slug: string };

export const getNewsList = cache(async (): Promise<NewsSummary[]> => {
  const dir = resolveContentPath('news');
  const files = await fs.readdir(dir);
  const items = await Promise.all(
    files.filter((file) => file.endsWith('.mdx')).map(async (file) => {
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

export async function getNewsBySlug(slug: string) {
  const dir = resolveContentPath('news');
  const files = await fs.readdir(dir);
  const match = files.find((file) => getSlug(file) === slug);
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

export const getRobots = cache(async () => {
  const dir = resolveContentPath('robots');
  const files = await fs.readdir(dir);
  const robots = await Promise.all(
    files.filter((file) => file.endsWith('.mdx')).map(async (file) => {
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

export async function getRobotByYear(year: number) {
  const robots = await getRobots();
  return robots.find((robot) => robot.frontmatter.year === year) ?? null;
}

export type OutreachSummary = OutreachFrontmatter & { slug: string; body: string };

export const getOutreachEntries = cache(async (): Promise<OutreachSummary[]> => {
  const dir = resolveContentPath('outreach');
  const files = await fs.readdir(dir);
  const entries = await Promise.all(
    files.filter((file) => file.endsWith('.mdx')).map(async (file) => {
      const fullPath = path.join(dir, file);
      const source = await fs.readFile(fullPath, 'utf8');
      const parsed = matter(source);
      const data = outreachFrontmatterSchema.parse(parsed.data);
      return {
        ...data,
        slug: getSlug(file),
        body: parsed.content.trim()
      } satisfies OutreachSummary;
    })
  );
  return entries;
});

export async function getOutreachEntry(slug: string) {
  const dir = resolveContentPath('outreach');
  const files = await fs.readdir(dir);
  const match = files.find((file) => getSlug(file) === slug);
  if (!match) return null;
  return loadMDXComponent(path.join(dir, match), outreachFrontmatterSchema);
}

export type ResourceSummary = ResourceFrontmatter & { slug: string; body: string };

export const getResources = cache(async (): Promise<ResourceSummary[]> => {
  const dir = resolveContentPath('resources');
  const files = await fs.readdir(dir);
  const items = await Promise.all(
    files.filter((file) => file.endsWith('.mdx')).map(async (file) => {
      const fullPath = path.join(dir, file);
      const source = await fs.readFile(fullPath, 'utf8');
      const parsed = matter(source);
      const data = resourceFrontmatterSchema.parse(parsed.data);
      return {
        ...data,
        slug: data.slug || getSlug(file),
        body: parsed.content.trim()
      } as ResourceSummary;
    })
  );
  return items;
});

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

export async function getHistoryTimeline(): Promise<HistoryTimeline> {
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
    const raw = await fs.readFile(indexPath, 'utf8');
    indexData = JSON.parse(raw) as HistoryIndexPayload;
  } catch {
    indexData.missing = [...(indexData.missing ?? []), path.relative(process.cwd(), indexPath)];
  }

  const years: HistoryYearEntry[] = [];
  const resolveChronoYear = (meta: { year: number; title: string; slug: string }) => {
    const slugMatch = meta.slug.match(/\d{4}/);
    if (slugMatch) return Number(slugMatch[0]);
    const titleMatch = meta.title.match(/\d{4}/);
    if (titleMatch) return Number(titleMatch[0]);
    return meta.year ?? 0;
  };
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
