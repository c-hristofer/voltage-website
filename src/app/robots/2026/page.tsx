import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import CTAButton from '@/components/ui/CTAButton';
import { getRobotByYear } from '@/lib/content';

export const metadata: Metadata = {
  title: '2026 Robot'
};

export default async function Robot2026Placeholder() {
  const robot = await getRobotByYear(2026);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 lg:px-0">
      <PageHeader
        title={robot?.frontmatter.name ?? '2026 Robot Preview'}
        description={
          robot?.frontmatter.summary ??
          'Our REBUILT machine is still under wraps. Check back soon for subsystem reveals, CAD, media, and match footage.'
        }
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Robots', href: '/robots' },
          { label: '2026 Robot' }
        ]}
      />
      {robot?.frontmatter.heroImage && (
        <div className="rounded-3xl border border-white/10 bg-card/70 p-4">
          <Image
            src={robot.frontmatter.heroImage}
            alt={robot.frontmatter.name}
            width={1200}
            height={600}
            className="w-full rounded-2xl object-cover"
          />
        </div>
      )}
      <div className="rounded-3xl border border-dashed border-white/20 bg-surface/70 p-6 text-sm text-white/70">
        <p>
          We are documenting prototypes, drive testing, and fabrication milestones. As soon as we lock in the final design this page will include a full technical breakdown and media gallery.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <CTAButton href="/contact" label="Contact Voltage" />
          <CTAButton href="/outreach#programs" label="Request a demo" variant="outline" />
        </div>
      </div>
    </div>
  );
}
