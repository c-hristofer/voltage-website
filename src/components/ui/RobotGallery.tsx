import Link from 'next/link';
import Image from 'next/image';
import { RobotSummary } from '@/lib/content';

export default function RobotGallery({ robots }: { robots: RobotSummary[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {robots.map((robot) => (
        <article
          key={robot.slug}
          className="glass-card rounded-3xl border border-white/10 bg-card/80 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
        >
          {robot.frontmatter.heroImage && (
            <Image
              src={robot.frontmatter.heroImage}
              alt={robot.frontmatter.name}
              width={640}
              height={360}
              className="h-48 w-full rounded-2xl object-cover shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
            />
          )}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/60">
              <span>{robot.frontmatter.game}</span>
              <span>{robot.frontmatter.year}</span>
            </div>
            <h3 className="text-2xl font-display text-white">{robot.frontmatter.name}</h3>
            <p className="text-sm text-white/70">{robot.frontmatter.summary}</p>
            <ul className="text-sm text-white/60">
              {robot.frontmatter.highlights.slice(0, 3).map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
            <Link href={`/robots/${robot.frontmatter.year}`} className="inline-flex text-sm font-semibold text-primary-light">
              View robot →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
