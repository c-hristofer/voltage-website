import { z } from 'zod';

const linkField = z
  .string()
  .refine((value) => /^https?:\/\//.test(value) || value.startsWith('/'), {
    message: 'Invalid URL'
  });

export const leadershipSchema = z.object({
  role: z.string(),
  name: z.string(),
  focus: z.string(),
  bio: z.string(),
  photo: z.string().optional()
});

export const mentorSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  photo: z.string().optional()
});

export const historyItemSchema = z.object({
  year: z.number(),
  title: z.string(),
  description: z.string()
});

export const faqSchema = z.object({
  question: z.string(),
  answer: z.string()
});

export const teamSchema = z.object({
  name: z.string(),
  number: z.number(),
  shortName: z.string(),
  siteUrl: z.string().url(),
  missionStatement: z.string(),
  meeting: z.object({
    schedule: z.string(),
    location: z.string(),
    parkingNote: z.string(),
    mapUrl: z.string().url().optional()
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

export const metricsSchema = z.object({
  yearsActive: z.number(),
  awards: z.number(),
  students: z.number(),
  mentors: z.number(),
  outreachHours: z.number()
});

export const sponsorTierSchema = z.object({
  name: z.string(),
  amountRange: z.string(),
  minAmount: z.number(),
  benefits: z.array(z.string()),
  sponsors: z.array(
    z.object({
      name: z.string(),
      logo: z.string(),
      url: z.string().url().optional()
    })
  )
});

export const sponsorsSchema = z.object({
  payment: z.object({
    payableTo: z.string(),
    memo: z.string(),
    mailingAddress: z.string().optional()
  }),
  deadlineNote: z.string().optional(),
  tiers: z.array(sponsorTierSchema)
});

export const linkItemSchema = z.object({
  title: z.string(),
  type: z.enum(['form', 'pdf']).default('form'),
  description: z.string(),
  url: linkField,
  category: z.string()
});

export const linksSchema = z.object({
  joinForm: z.string().url(),
  calendarEmbed: z.string().url(),
  gamePage: z.string().url(),
  brandGuidelines: linkField,
  sponsorPacket: linkField,
  materialsDrive: z.string().url(),
  documents: z.array(linkItemSchema)
});

export const awardsSchema = z.array(
  z.object({
    year: z.number(),
    game: z.string(),
    honors: z.array(z.string())
  })
);

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

export const historyYearFrontmatterSchema = z.object({
  title: z.string().optional()
});

export const newsFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string(),
  author: z.string().optional(),
  heroImage: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional()
});

export const robotFrontmatterSchema = z.object({
  year: z.number(),
  name: z.string(),
  game: z.string(),
  status: z.string(),
  heroImage: z.string().optional(),
  summary: z.string(),
  highlights: z.array(z.string()),
  specs: z.array(z.object({ label: z.string(), value: z.string() }))
});

export const outreachFrontmatterSchema = z.object({
  title: z.string(),
  type: z.enum(['program', 'event']),
  summary: z.string(),
  featuredImage: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional()
});

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
export type AwardsData = z.infer<typeof awardsSchema>;
export type HistoryFrontmatter = z.infer<typeof historyFrontmatterSchema>;
export type PressKitData = z.infer<typeof pressKitSchema>;
export type NewsFrontmatter = z.infer<typeof newsFrontmatterSchema>;
export type RobotFrontmatter = z.infer<typeof robotFrontmatterSchema>;
export type OutreachFrontmatter = z.infer<typeof outreachFrontmatterSchema>;
export type ResourceFrontmatter = z.infer<typeof resourceFrontmatterSchema>;
