// Shared page section component.

import Link from 'next/link';
import type { TeamData, LinksData } from '@/lib/schemas';

// Highlight the current season's game, goals, and events.
export default function SeasonSpotlight({ season, links }: { season: TeamData['season']; links: LinksData }) {
  return (
    <div className="glass-panel grid gap-6 rounded-3xl border border-white/10 bg-surface/80 p-6 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          Season Spotlight
        </p>
        <h3 className="font-display text-3xl text-white">
          {season.year} {season.game}{' '}
          {season.presentedBy && <span className="text-sm text-white/60">(presented by {season.presentedBy})</span>}
        </h3>
        <p className="mt-3 text-sm text-white/70">{season.summary}</p>
        <Link href={links.gamePage} className="mt-4 inline-flex text-sm font-semibold text-primary-light">
          View official game page →
        </Link>
      </div>
      <div className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Goals</p>
          <ul className="mt-2 space-y-1">
            {season.goals.map((goal) => (
              <li key={goal}>• {goal}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Events</p>
          <ul className="mt-2 space-y-1">
            {season.events.map((event) => (
              <li key={event}>• {event}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
