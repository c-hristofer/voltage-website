import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import RobotGallery from '@/components/ui/RobotGallery';
import CTAButton from '@/components/ui/CTAButton';
import { getRobots } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Robots'
};

export default async function RobotsPage() {
  const robots = await getRobots();
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 lg:px-6">
      <PageHeader
        title="Voltage robots by season"
        description="Explore the mechanical systems, controls packages, and awards associated with each build."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Robots' }
        ]}
      />
      <RobotGallery robots={robots} />
      <div className="rounded-3xl border border-white/10 bg-surface/70 p-6 text-center">
        <p className="text-sm text-white/70">
          Looking for legacy write-ups or CAD archives? Head to the resources section for downloads, or email us to schedule a technical deep dive.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <CTAButton href="/contact" label="Contact" />
          <CTAButton href="/resources" label="Resources" variant="outline" />
        </div>
      </div>
    </div>
  );
}
