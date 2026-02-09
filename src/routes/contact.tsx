// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import { getTeamData } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact'
};

// Renders the contact page.
export default async function ContactPage() {
  const team = await getTeamData();
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 lg:px-0">
      <PageHeader
        title="Contact Voltage"
        description="Sponsors, media, and prospective students—send us a note and we will route it to the right lead."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' }
        ]}
      />
      <section className="grid gap-4 rounded-3xl border border-white/10 bg-card/70 p-6 md:grid-cols-2">
        <div>
          <SectionHeader title="Email" description={team.contact.email} />
          <CTAButton href={`mailto:${team.contact.email}`} label="Email Voltage" className="mt-3" />
        </div>
        <div>
          <SectionHeader title="Meeting location" description={team.meeting.location} />
          <p className="text-sm text-white/70">{team.meeting.parkingNote}</p>
          {team.meeting.mapUrl && (
            <CTAButton href={team.meeting.mapUrl} label="Open map" className="mt-3" />
          )}
        </div>
      </section>
    </div>
  );
}
