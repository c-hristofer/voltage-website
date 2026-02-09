// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import NewsList from '@/components/ui/NewsList';
import { getNewsList } from '@/lib/content';

export const metadata: Metadata = {
  title: 'News'
};

// Renders the news page.
export default async function NewsPage() {
  const news = await getNewsList();
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 lg:px-0">
      <PageHeader
        title="Voltage News"
        description="Stories, recaps, and behind-the-scenes context from the Voltage notebook."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News' }
        ]}
      />
      <NewsList posts={news} variant="list" />
    </div>
  );
}
