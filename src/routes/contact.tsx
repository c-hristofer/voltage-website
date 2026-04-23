// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import { getSocials, getTeamData } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact'
};

// Renders the contact page.
export default async function ContactPage() {
  const [team, socials] = await Promise.all([getTeamData(), getSocials()]);
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
        <div className="flex h-full flex-col">
          <SectionHeader title="Email" description={team.contact.email} />
          <div className="mt-3 md:mt-auto">
            <CTAButton href={`mailto:${team.contact.email}`} label="Email Voltage" />
          </div>
        </div>
        <div className="flex h-full flex-col">
          <SectionHeader title="Meeting location" description={team.meeting.location} />
          <p className="text-sm text-white/70">{team.meeting.parkingNote}</p>
          {team.meeting.mapUrl && (
            <div className="mt-3 md:mt-auto">
              <CTAButton href={team.meeting.mapUrl} label="Open map" />
            </div>
          )}
        </div>
        {socials.instagram && (
          <div className="border-t border-white/10 pt-5 md:col-span-2">
            <SectionHeader title="Instagram" description="@teamvoltage386" />
            <p className="text-sm text-white/70">
              Follow Team Voltage for build season updates, outreach highlights, competition photos, and announcements.
            </p>
            <div className="mt-3">
              <CTAButton href={socials.instagram} label="Open Instagram" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
