// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import ResourceDownload from '@/components/ui/ResourceDownload';
import CTAButton from '@/components/ui/CTAButton';
import { getLinks } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Resources'
};

// Labels for pre season titles so copy stays consistent.
const PRE_SEASON_TITLES = ['New / Interested Student Signup', 'Safety Quiz', 'Student Contract', 'Student Information Form'];
// Labels for form titles so copy stays consistent.
const FORM_TITLES = ['Meeting Permission Form', 'Medical Release Form', 'Student Handbook', 'Photograph Release Form'];

// Renders the resources page.
export default async function ResourcesPage() {
  // Pull shared links from content so resources stay editable by content owners.
  const links = await getLinks();
  const preSeasonForms = links.documents.filter((doc) => PRE_SEASON_TITLES.includes(doc.title));
  const forms = links.documents.filter((doc) => FORM_TITLES.includes(doc.title));
  const otherResources = links.documents.filter(
    (doc) => !PRE_SEASON_TITLES.includes(doc.title) && !FORM_TITLES.includes(doc.title)
  );

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
          description="Students in grades 9-12 who are interested in joining Team Voltage should submit the New / Interested Student Signup form, and we will be in contact soon."
        />
        <CTAButton href={links.joinForm} label="Complete join form" className="mt-4" />
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Pre-season forms"
          description="All new and returning students complete the signup, safety quiz, student contract, and student information form every year."
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
          description="Print, sign, and turn in the meeting permission form, medical release, and student handbook within the first two weeks of joining. The medical release must be notarized."
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

      <section className="space-y-4">
        <SectionHeader
          title="Team branding, FLL, and newsletter archive"
          description="Reference documents from the legacy Team Voltage library, including the branding guide, FLL Voltage Challenge resources, and archived Varmint Newsletters."
        />
        <div className="grid gap-4">
          {otherResources.map((doc) => (
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
