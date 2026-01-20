import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import ResourceDownload from '@/components/ui/ResourceDownload';
import CTAButton from '@/components/ui/CTAButton';
import { getLinks } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Resources'
};

const PRE_SEASON_TITLES = ['Safety Quiz', 'Student Contract', 'Student Information Form'];
const FORM_TITLES = ['Meeting Permission Form', 'Medical Release Form', 'Student Handbook'];

export default async function ResourcesPage() {
  const links = await getLinks();
  const preSeasonForms = links.documents.filter((doc) => PRE_SEASON_TITLES.includes(doc.title));
  const forms = links.documents.filter((doc) => FORM_TITLES.includes(doc.title));

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 lg:px-0">
      <PageHeader
        title="Resources"
        description="Join the team, submit preseason paperwork, and download the forms and scouting resources you need to stay competition-ready."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources' }
        ]}
      />

      <section className="rounded-3xl border border-white/10 bg-primary/10 p-6 dark:border-white/15 dark:bg-white/5">
        <SectionHeader
          title="How to join"
          description="Just submit the join form and we will email you our meeting calendar, onboarding nights, and ways guardians can stay in the loop."
        />
        <CTAButton href={links.joinForm} label="Complete join form" className="mt-4" />
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Pre-season forms"
          description="Complete these digital forms before your first full build meeting so we can configure safety credentials and communication tools."
        />
        <div className="grid gap-4">
          {preSeasonForms.map((form) => (
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
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Forms"
          description="Download the latest PDFs for meetings, medical releases, and the team handbook. Signed copies are required before competitions."
        />
        <div className="grid gap-4">
          {forms.map((doc) => (
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
      </section>

    </div>
  );
}
