import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import CTAButton from '@/components/ui/CTAButton';
import { getRobotByYear, getRobots } from '@/lib/content';

export async function generateStaticParams() {
  const robots = await getRobots();
  return robots.map((robot) => ({ year: robot.frontmatter.year.toString() }));
}

export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({ params }: { params: { year: string } }): Promise<Metadata> {
  const year = Number(params.year);
  const robot = await getRobotByYear(year);
  if (!robot) return { title: `Robot ${params.year}` };
  return {
    title: robot.frontmatter.name,
    description: robot.frontmatter.summary
  };
}

export default async function RobotDetail({ params }: { params: { year: string } }) {
  const year = Number(params.year);
  const robot = await getRobotByYear(year);
  if (!robot) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-12 lg:px-0">
      <PageHeader
        title={`${robot.frontmatter.year} – ${robot.frontmatter.name}`}
        description={robot.frontmatter.summary}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Robots', href: '/robots' },
          { label: robot.frontmatter.name }
        ]}
      />
      {robot.frontmatter.heroImage && (
        <Image
          src={robot.frontmatter.heroImage}
          alt={robot.frontmatter.name}
          width={1200}
          height={600}
          className="w-full rounded-3xl object-cover"
        />
      )}
      <div className="grid gap-6 rounded-3xl border border-white/10 bg-surface/70 p-6 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Highlights</p>
          <ul className="mt-3 space-y-1 text-sm text-white/80">
            {robot.frontmatter.highlights.map((highlight) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Specifications</p>
          <dl className="mt-3 space-y-2 text-sm text-white/80">
            {robot.frontmatter.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between border-b border-white/10 pb-1">
                <dt className="text-white/60">{spec.label}</dt>
                <dd className="text-right text-white">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <article className="space-y-4 text-sm text-white/80">{robot.content}</article>
      <div className="rounded-3xl border border-white/10 bg-card/70 p-6 text-center">
        <p className="text-sm text-white/70">Need more technical detail or want to collaborate? We love partner engineering reviews.</p>
        <CTAButton href="/contact" label="Request more info" className="mt-3" />
      </div>
    </div>
  );
}
