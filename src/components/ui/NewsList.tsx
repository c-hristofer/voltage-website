// Shared UI component.

import Link from 'next/link';
import Image from 'next/image';
import { NewsSummary } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { withBasePath } from '@/lib/paths';

type NewsListProps = {
  posts: NewsSummary[];
  variant?: 'grid' | 'list';
};

// Card layout for a single news summary.
function NewsCard({ post }: { post: NewsSummary }) {
  const heroImageSrc = post.heroImage ? withBasePath(post.heroImage) : '';

  return (
    <article className="glass-card overflow-hidden rounded-3xl border border-white/10 bg-card/80">
      {heroImageSrc && (
        <Image
          src={heroImageSrc}
          alt={post.title}
          width={800}
          height={400}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="space-y-3 p-6">
        <p className="text-xs uppercase tracking-wide text-white/60">
          {formatDate(post.date)}
        </p>
        <h3 className="text-xl font-semibold text-white">{post.title}</h3>
        <p className="text-sm text-white/70">{post.summary}</p>
        <Link href={`/news/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-primary-light">
          Read story →
        </Link>
      </div>
    </article>
  );
}

// Renders the news view.
export default function NewsList({ posts, variant = 'grid' }: NewsListProps) {
  // Keep this as a simple switch so content editors can adjust layout behavior quickly.
  const layoutClass = variant === 'grid' ? 'grid gap-6 md:grid-cols-2' : 'space-y-4';

  return (
    <div className={layoutClass}>
      {posts.map((post) => (
        <NewsCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
