import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ResourceDownload from '@/components/ui/ResourceDownload';
import { getLinks } from '@/lib/content';

const FORM_TITLES = ['Meeting Permission Form', 'Medical Release Form', 'Student Handbook'];

export const metadata: Metadata = {
  title: 'Forms'
};

export default async function FormsPage() {
  const links = await getLinks();
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
