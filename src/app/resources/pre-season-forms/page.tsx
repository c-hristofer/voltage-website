import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ResourceDownload from '@/components/ui/ResourceDownload';
import { getLinks } from '@/lib/content';

const PRE_SEASON_TITLES = ['Safety Quiz', 'Student Contract', 'Student Information Form'];

export const metadata: Metadata = {
  title: 'Pre-Season Forms'
};

export default async function PreSeasonFormsPage() {
  const links = await getLinks();
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
