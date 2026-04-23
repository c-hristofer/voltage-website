// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import SponsorWall from '@/components/ui/SponsorWall';
import CTAButton from '@/components/ui/CTAButton';
import { getLinks, getSponsors } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Sponsors'
};

// Renders the sponsors page.
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
          title="Support that reaches students"
          description="Team Voltage 386 is a non-profit FIRST Robotics team. Donations are tax deductible, and tools, materials, food, services, and other in-kind contributions are recognized at their value."
        />
        <div className="mt-6 rounded-3xl border border-white/10 bg-card/70 p-6">
          <p className="text-sm text-white/70">
            Checks payable to <strong>{sponsors.payment.payableTo}</strong> with “{sponsors.payment.memo}” in the memo line.
            Mail checks to {sponsors.payment.mailingAddress}. Email teamvoltage386@gmail.com for ACH details, in-kind donations,
            or invoice requests.
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
      <section className="rounded-3xl border border-white/10 bg-card/70 p-6">
        <SectionHeader eyebrow="Team history" title="Remembering Mark Senti" />
        <p className="text-sm leading-relaxed text-white/75">
          Mark Senti was Team Voltage’s first major sponsor and a vital supporter in our early years. He provided workspace at
          GSMA, scrap materials, and access to hardware supplies before the team moved to Melbourne High School. His support
          gave Voltage a strong foundation, and early mentors remember how often he stepped in with parts when the team needed
          them most.
        </p>
      </section>
      <section id="cta" className="rounded-3xl border border-white/10 bg-primary/10 p-6 text-center">
        <p className="text-lg font-semibold text-white">Ready to energize Voltage?</p>
        <p className="mt-2 text-sm text-white/70">Sponsor commitments received before January 15 secure logo placement on shirts, robots, and banners.</p>
        <CTAButton href={links.sponsorPacket} label="Start sponsorship" className="mt-4" />
      </section>
    </div>
  );
}
