import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import SponsorWall from '@/components/ui/SponsorWall';
import CTAButton from '@/components/ui/CTAButton';
import { getLinks, getSponsors } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Sponsors'
};

export default async function SponsorsPage() {
  const [sponsors, links] = await Promise.all([getSponsors(), getLinks()]);
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 lg:px-6">
      <PageHeader
        title="Partner with Voltage"
        description="Sponsorship dollars translate directly to robot parts, travel, STEAM camps, and scholarships."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sponsors' }
        ]}
      />
      <section>
        <SectionHeader
          eyebrow="Why sponsor"
          title="Precision, energy, and measurable ROI"
          description="Voltage 386 delivers mentor-led engineering stories, demo opportunities, and community goodwill for partners."
        />
        <div className="mt-6 rounded-3xl border border-white/10 bg-card/70 p-6">
          <p className="text-sm text-white/70">
            Checks payable to <strong>{sponsors.payment.payableTo}</strong> with “{sponsors.payment.memo}” in the memo line. Email teamvoltage386@gmail.com for ACH details or invoice requests.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <CTAButton href={links.sponsorPacket} label="Download sponsor packet" />
            <CTAButton href="mailto:teamvoltage386@gmail.com" label="Contact us" variant="outline" />
          </div>
        </div>
      </section>
      <section>
        <SectionHeader eyebrow="Tiers" title="Benefits & deliverables" description={sponsors.deadlineNote} />
        <SponsorWall data={sponsors} />
      </section>
      <section id="cta" className="rounded-3xl border border-white/10 bg-primary/10 p-6 text-center">
        <p className="text-lg font-semibold text-white">Ready to energize Voltage?</p>
        <p className="mt-2 text-sm text-white/70">Sponsor commitments received before January 15 secure logo placement on shirts, robots, and banners.</p>
        <CTAButton href={links.sponsorPacket} label="Start sponsorship" className="mt-4" />
      </section>
    </div>
  );
}
