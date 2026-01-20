import Link from 'next/link';
import Image from 'next/image';
import { NewsSummary } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export default function NewsList({ posts, variant = 'grid' }: { posts: NewsSummary[]; variant?: 'grid' | 'list'; }) {
  const layoutClass = variant === 'grid' ? 'grid gap-6 md:grid-cols-2' : 'space-y-4';
  return (
    <div className={layoutClass}>
      {posts.map((post) => (
        <article
          key={post.slug}
          className="glass-card overflow-hidden rounded-3xl border border-white/10 bg-card/80"
        >
          {post.heroImage && (
            <Image
              src={post.heroImage}
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
      ))}
    </div>
  );
}
