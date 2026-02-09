// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CTAButton from '@/components/ui/CTAButton';
import PageHeader from '@/components/ui/PageHeader';
import ResourceDownload from '@/components/ui/ResourceDownload';
import SectionHeader from '@/components/ui/SectionHeader';
import { getLinks, getResourceBySlug, getResources } from '@/lib/content';

// Built-in pages that do not come from resource MDX files.
const STATIC_RESOURCE_SLUGS = ['join-team', 'pre-season-forms', 'forms'] as const;
type StaticResourceSlug = (typeof STATIC_RESOURCE_SLUGS)[number];

// Labels for pre season titles so copy stays consistent.
const PRE_SEASON_TITLES = ['Safety Quiz', 'Student Contract', 'Student Information Form'];
// Labels for form titles so copy stays consistent.
const FORM_TITLES = ['Meeting Permission Form', 'Medical Release Form', 'Student Handbook'];

// True when the slug is one of the built-in resource pages.
function isStaticResourceSlug(slug: string): slug is StaticResourceSlug {
  return STATIC_RESOURCE_SLUGS.includes(slug as StaticResourceSlug);
}

// Precomputes dynamic path values so Next.js can statically generate each route.
export async function generateStaticParams() {
  const resources = await getResources();
  // Slugs loaded from resource content files.
  const resourceSlugs = resources.map((resource) => resource.slug);
  // Merge static and content slugs so static generation includes both.
  const slugs = new Set<string>([...resourceSlugs, ...STATIC_RESOURCE_SLUGS]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export const dynamicParams = false;
export const revalidate = false;

// Builds page metadata for this route using the current URL parameters.
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'join-team') {
    return { title: 'Join Team' };
  }
  if (slug === 'pre-season-forms') {
    return { title: 'Pre-Season Forms' };
  }
  if (slug === 'forms') {
    return { title: 'Forms' };
  }

  const resource = await getResourceBySlug(slug);
  if (!resource) return { title: 'Resources' };
  return {
    title: resource.title,
    description: resource.summary
  };
}

// Render either a static resource page or an MDX-backed resource page.
export default async function ResourceDetail({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (isStaticResourceSlug(slug)) {
    return renderStaticResourcesPage(slug);
  }

  const resource = await getResourceBySlug(slug);
  if (!resource) {
    notFound();
  }
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 lg:px-0">
      <PageHeader
        title={resource.title}
        description={resource.summary}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: resource.title }
        ]}
      />
      <ResourceDownload
        title={resource.title}
        description={resource.summary}
        downloadUrl={resource.downloadUrl}
        viewUrl={resource.viewUrl}
        category={resource.category}
      />
      {resource.body && <div className="space-y-4 text-sm text-white/80">{resource.body}</div>}
    </div>
  );
}

// Keep static resources page markup in a helper so this file stays easy to scan.
async function renderStaticResourcesPage(slug: StaticResourceSlug) {
  // Pull shared links from content so editors can update destinations without code changes.
  const links = await getLinks();

  if (slug === 'join-team') {
    return (
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 lg:px-0">
        <PageHeader
          title="Join Team Voltage"
          description="Tell us about your interests and availability so we can welcome you to the shop and match you with a subsystem mentor."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Resources', href: '/resources' },
            { label: 'Join Team' }
          ]}
        />
        <section className="rounded-3xl border border-white/10 bg-primary/10 p-6">
          <SectionHeader
            title="How to join"
            description="Just submit the join form and we will email you our meeting calendar, onboarding nights, and ways guardians can stay in the loop."
          />
          <CTAButton href={links.joinForm} label="Complete join form" className="mt-4" />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-surface/70 p-6">
          <SectionHeader
            title="What happens next?"
            description="Once the form is submitted, the leadership team will:"
          />
          <ul className="space-y-3 text-sm text-white/80">
            <li>- Email you the Monday build schedule and campus directions.</li>
            <li>- Invite guardians to our REMIND channel and newsletter.</li>
            <li>- Schedule your safety orientation and subsystem tours.</li>
          </ul>
          <p className="text-sm text-white/70">
            Have questions before joining? Reach out at{' '}
            <a href="mailto:teamvoltage386@gmail.com" className="text-primary-light underline">
              teamvoltage386@gmail.com
            </a>{' '}
            and we will connect you with the captains.
          </p>
        </section>
      </div>
    );
  }

  if (slug === 'pre-season-forms') {
    const forms = links.documents.filter((doc) => PRE_SEASON_TITLES.includes(doc.title));
    return (
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 lg:px-0">
        <PageHeader
          title="Pre-season forms"
          description="Complete these digital forms before your first full build meeting so we can set up safety credentials and communication tools."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Resources', href: '/resources' },
            { label: 'Pre-season forms' }
          ]}
        />
        <div className="grid gap-4">
          {forms.map((form) => (
            <ResourceDownload
              key={form.title}
              title={form.title}
              description={form.description}
              downloadUrl={form.url}
              viewUrl={form.url}
              category={form.category}
              showDownload={false}
            />
          ))}
        </div>
      </div>
    );
  }

  const docs = links.documents.filter((doc) => FORM_TITLES.includes(doc.title));
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 lg:px-0">
      <PageHeader
        title="Forms"
        description="Download the latest PDFs for meetings, medical releases, and the team handbook. Signed copies are required before competitions."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Forms' }
        ]}
      />
      <div className="grid gap-4">
        {docs.map((doc) => (
          <ResourceDownload
            key={doc.title}
            title={doc.title}
            description={doc.description}
            downloadUrl={doc.url}
            viewUrl={doc.url}
            category={doc.category}
          />
        ))}
      </div>
    </div>
  );
}
