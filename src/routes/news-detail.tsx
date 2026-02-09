// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import { getNewsBySlug, getNewsFrontmatterBySlug, getNewsList } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { withBasePath } from '@/lib/paths';

// Precomputes dynamic path values so Next.js can statically generate each route.
export async function generateStaticParams() {
  const news = await getNewsList();
  return news.map((item) => ({ slug: item.slug }));
}

// Builds page metadata for this route using the current URL parameters.
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsFrontmatterBySlug(slug);
  if (!post) {
    return { title: 'News' };
  }
  return {
    title: post.title,
    description: post.summary
  };
}

// Render a single news story page.
export default async function NewsDetail({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 lg:px-0">
      <PageHeader
        title={post.frontmatter.title}
        description={`${formatDate(post.frontmatter.date)}${post.frontmatter.author ? ` • ${post.frontmatter.author}` : ''}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
          { label: post.frontmatter.title }
        ]}
      />
      {post.frontmatter.heroImage && (
        <Image
          src={withBasePath(post.frontmatter.heroImage)}
          alt={post.frontmatter.title}
          width={1200}
          height={600}
          className="w-full rounded-3xl object-cover"
        />
      )}
      <article className="space-y-4 text-sm text-white/80">{post.content}</article>
      {post.frontmatter.ctaLabel && post.frontmatter.ctaUrl && (
        <a
          href={post.frontmatter.ctaUrl}
          className="inline-flex rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary-light"
        >
          {post.frontmatter.ctaLabel}
        </a>
      )}
    </div>
  );
}
