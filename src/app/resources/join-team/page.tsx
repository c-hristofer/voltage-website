import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import { getLinks } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Join Team'
};

export default async function JoinTeamPage() {
  const links = await getLinks();

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 lg:px-0">
      <PageHeader
        title="Join Team Voltage"
        description="Tell us about your interests and availability so we can welcome you to the shop and match you with a subsystem mentor."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Join Team' }
        ]}
      />
      <section className="rounded-3xl border border-white/10 bg-primary/10 p-6">
        <SectionHeader
          title="How to join"
          description="Just submit the join form and we will email you our meeting calendar, onboarding nights, and ways guardians can stay in the loop."
        />
        <CTAButton href={links.joinForm} label="Complete join form" className="mt-4" />
      </section>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-surface/70 p-6">
        <SectionHeader
          title="What happens next?"
          description="Once the form is submitted, the leadership team will:"
        />
        <ul className="space-y-3 text-sm text-white/80">
          <li>• Email you the Monday build schedule and campus directions.</li>
          <li>• Invite guardians to our REMIND channel and newsletter.</li>
          <li>• Schedule your safety orientation and subsystem tours.</li>
        </ul>
        <p className="text-sm text-white/70">
          Have questions before joining? Reach out at{' '}
          <a href="mailto:teamvoltage386@gmail.com" className="text-primary-light underline">
            teamvoltage386@gmail.com
          </a>{' '}
          and we will connect you with the captains.
        </p>
      </section>
    </div>
  );
}
