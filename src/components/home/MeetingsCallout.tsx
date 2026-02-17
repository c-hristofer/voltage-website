import Link from 'next/link';
import type { TeamData } from '@/lib/schemas';
import ExternalLink from '@/components/ui/ExternalLink';

export default function MeetingsCallout({ meeting, contact }: TeamData) {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 bg-gradient-to-r from-primary/40 via-transparent to-primary-light/25 p-6 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.3em]">Weekly Meetings</p>
      <h3 className="mt-2 text-2xl font-display">{meeting.schedule}</h3>
      <p className="mt-2 text-sm">{meeting.location}</p>
      <p className="mt-2 text-sm text-white/80">{meeting.parkingNote}</p>
      {meeting.mapUrl && (
        <ExternalLink href={meeting.mapUrl} className="mt-4 inline-flex text-sm font-semibold text-black">
          Open map →
        </ExternalLink>
      )}
      <Link href={`mailto:${contact.email}`} className="mt-2 block text-sm font-semibold text-black">
        Questions? Email us
      </Link>
    </div>
  );
}
