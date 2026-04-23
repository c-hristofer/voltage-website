// Shared helpers used across routes and components.

import { z } from 'zod';
import { isHttpUrl, isSafeHref, isSafeLinkField } from './security';

// Base http url field value reused across the app configuration.
const httpUrlField = z
  .string()
  .refine((value) => isHttpUrl(value), {
    message: 'Expected an absolute http(s) URL'
  });

// Keep link field in one place so links stay consistent.
const linkField = z
  .string()
  .refine((value) => isSafeLinkField(value), {
    message: 'Expected a root-relative path or absolute http(s) URL'
  });

// Keep cta link field in one place so links stay consistent.
const ctaLinkField = z
  .string()
  .refine((value) => isSafeHref(value), {
    message: 'Expected a safe URL/path for a call-to-action link'
  });

// Validation schema for leadership.
export const leadershipSchema = z.object({
  role: z.string(),
  name: z.string(),
  focus: z.string(),
  bio: z.string(),
  photo: z.string().optional()
});

// Validation schema for mentor.
export const mentorSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  photo: z.string().optional()
});

// Validation schema for history item.
export const historyItemSchema = z.object({
  year: z.number(),
  title: z.string(),
  description: z.string()
});

// Validation schema for faq.
export const faqSchema = z.object({
  question: z.string(),
  answer: z.string()
});

// Validation schema for team.
export const teamSchema = z.object({
  name: z.string(),
  number: z.number(),
  shortName: z.string(),
  siteUrl: httpUrlField,
  missionStatement: z.string(),
  meeting: z.object({
    schedule: z.string(),
    location: z.string(),
    parkingNote: z.string(),
    mapUrl: httpUrlField.optional()
  }),
  contact: z.object({
    email: z.string().email(),
    mailingAddress: z.string().optional()
  }),
  values: z.array(z.object({
    title: z.string(),
    description: z.string()
  })),
  season: z.object({
    year: z.number(),
    game: z.string(),
    presentedBy: z.string().optional(),
    summary: z.string(),
    goals: z.array(z.string()),
    events: z.array(z.string())
  }),
  history: z.array(historyItemSchema),
  leadership: z.array(leadershipSchema),
  mentors: z.array(mentorSchema),
  faqs: z.array(faqSchema)
});

// Validation schema for metrics.
export const metricsSchema = z.object({
  yearsActive: z.union([z.number(), z.string()]),
  awards: z.union([z.number(), z.string()]),
  students: z.union([z.number(), z.string()]),
  mentors: z.number(),
  outreachHours: z.union([z.number(), z.string()])
});

// Validation schema for sponsor tier.
export const sponsorTierSchema = z.object({
  name: z.string(),
  amountRange: z.string(),
  minAmount: z.number(),
  benefits: z.array(z.string()),
  sponsors: z.array(
    z.object({
      name: z.string(),
      logo: z.string().optional(),
      url: httpUrlField.optional()
    })
  )
});

// Validation schema for sponsors.
export const sponsorsSchema = z.object({
  payment: z.object({
    payableTo: z.string(),
    memo: z.string(),
    mailingAddress: z.string().optional()
  }),
  deadlineNote: z.string().optional(),
  tiers: z.array(sponsorTierSchema)
});

// Keep link item schema in one place so links stay consistent.
export const linkItemSchema = z.object({
  title: z.string(),
  type: z.enum(['form', 'pdf']).default('form'),
  description: z.string(),
  url: linkField,
  category: z.string()
});

// Keep links schema in one place so links stay consistent.
export const linksSchema = z.object({
  joinForm: httpUrlField,
  calendarEmbed: httpUrlField,
  gamePage: httpUrlField,
  brandGuidelines: linkField,
  sponsorPacket: linkField,
  materialsDrive: httpUrlField,
  documents: z.array(linkItemSchema)
});

// Validation schema for socials.
export const socialsSchema = z.object({
  instagram: httpUrlField.optional(),
  youtube: httpUrlField.optional()
});

// Validation schema for awards.
export const awardsSchema = z.array(
  z.object({
    year: z.number(),
    game: z.string(),
    honors: z.array(z.string())
  })
);

// Validation schema for press kit.
export const pressKitSchema = z.object({
  boilerplate: z.string(),
  colors: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
      usage: z.string()
    })
  ),
  fonts: z.object({
    headline: z.string(),
    body: z.string()
  }),
  logos: z.array(
    z.object({
      name: z.string(),
      file: z.string(),
      usage: z.string(),
      background: z.string().optional()
    })
  ),
  downloads: z.array(
    z.object({
      label: z.string(),
      url: linkField
    })
  ),
  usageNotes: z.string()
});

// Validation schema for history frontmatter.
export const historyFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  sections: z
    .array(
      z.object({
        id: z.string(),
        label: z.string()
      })
    )
    .optional()
    .default([]),
  buttons: z
    .array(
      z.object({
        label: z.string(),
        href: linkField
      })
    )
    .optional()
});

// Validation schema for history year frontmatter.
export const historyYearFrontmatterSchema = z.object({
  title: z.string().optional()
});

// Validation schema for news frontmatter.
export const newsFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string(),
  author: z.string().optional(),
  heroImage: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaUrl: ctaLinkField.optional()
});

// Validation schema for outreach frontmatter.
export const outreachFrontmatterSchema = z.object({
  title: z.string(),
  type: z.enum(['program', 'event']),
  summary: z.string(),
  featuredImage: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaUrl: ctaLinkField.optional()
});

// Validation schema for resource frontmatter.
export const resourceFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  summary: z.string(),
  downloadUrl: linkField,
  viewUrl: linkField.optional()
});

export type TeamData = z.infer<typeof teamSchema>;
export type MetricsData = z.infer<typeof metricsSchema>;
export type SponsorsData = z.infer<typeof sponsorsSchema>;
export type LinksData = z.infer<typeof linksSchema>;
export type SocialsData = z.infer<typeof socialsSchema>;
export type AwardsData = z.infer<typeof awardsSchema>;
export type HistoryFrontmatter = z.infer<typeof historyFrontmatterSchema>;
export type PressKitData = z.infer<typeof pressKitSchema>;
export type NewsFrontmatter = z.infer<typeof newsFrontmatterSchema>;
export type OutreachFrontmatter = z.infer<typeof outreachFrontmatterSchema>;
export type ResourceFrontmatter = z.infer<typeof resourceFrontmatterSchema>;
