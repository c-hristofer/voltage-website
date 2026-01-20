import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { getLinks } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Calendar'
};

export default async function CalendarPage() {
  const links = await getLinks();
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 lg:px-0">
      <PageHeader
        title="Team calendar"
        description="Below is our meeting calendar. Click on a specific meeting for additional details."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calendar' }
        ]}
      />
      <div className="overflow-hidden rounded-3xl border border-white/10">
        <iframe
          src={links.calendarEmbed}
          title="Team Voltage Calendar"
          className="h-[600px] w-full"
        />
      </div>
    </div>
  );
}
