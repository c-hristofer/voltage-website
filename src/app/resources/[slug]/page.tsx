import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import ResourceDownload from '@/components/ui/ResourceDownload';
import { getResourceBySlug, getResources } from '@/lib/content';

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map((resource) => ({ slug: resource.slug }));
}

export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resource = await getResourceBySlug(params.slug);
  if (!resource) return { title: 'Resources' };
  return {
    title: resource.title,
    description: resource.summary
  };
}

export default async function ResourceDetail({ params }: { params: { slug: string } }) {
  const resource = await getResourceBySlug(params.slug);
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
