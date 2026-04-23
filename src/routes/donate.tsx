// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import CTAButton from '@/components/ui/CTAButton';
import { getSponsors, getLinks } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Donate'
};

// Renders the donate page.
export default async function DonatePage() {
  const [sponsors, links] = await Promise.all([getSponsors(), getLinks()]);
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 lg:px-0">
      <PageHeader
        title="Support Voltage 386"
        description="Fuel student-led engineering with tax-deductible donations."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Donate' }
        ]}
      />
      <div className="rounded-3xl border border-white/10 bg-surface/70 p-6 space-y-4">
        <p className="text-sm text-white/80">
          Make checks payable to <strong>{sponsors.payment.payableTo}</strong> and include “{sponsors.payment.memo}” on the memo line to ensure funds reach Voltage 386. Mail to: {sponsors.payment.mailingAddress ?? 'Melbourne High Robotics, c/o Bert Johnson, 74 Bulldog Ave, Melbourne, FL 32901'}.
        </p>
        <p className="text-sm text-white/80">For ACH, in-kind donations, or employer matches, email teamvoltage386@gmail.com so we can coordinate receipts and recognition.</p>
        <div className="flex flex-wrap gap-3">
          <CTAButton href={links.sponsorPacket} label="Sponsorship packet" />
          <CTAButton href="mailto:teamvoltage386@gmail.com" label="Contact Voltage" variant="outline" />
        </div>
      </div>
    </div>
  );
}
