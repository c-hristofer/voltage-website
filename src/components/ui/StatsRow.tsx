// Shared UI component.

import { MetricsData } from '@/lib/schemas';

// Render headline team metrics in a compact grid.
export default function StatsRow({ metrics }: { metrics: MetricsData }) {
  // Order and labels for the stat cards.
  const items = [
    { label: 'Years Competing', value: metrics.yearsActive },
    { label: 'Awards Earned', value: metrics.awards },
    { label: 'Active Students', value: metrics.students },
    { label: 'Mentors', value: metrics.mentors },
    { label: 'Outreach Hours', value: metrics.outreachHours }
  ];

  return (
    <dl className="glass-card relative grid gap-4 rounded-3xl border border-white/15 bg-gradient-to-br from-white/40 via-white/20 to-white/10 p-6 text-center sm:grid-cols-2 lg:grid-cols-5">
      <span className="pointer-events-none absolute inset-x-8 top-2 h-px bg-white/30" />
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center rounded-3xl border border-white/40 bg-white/90 px-5 py-4 text-foreground shadow-[0_15px_35px_rgba(25,34,68,0.25)] dark:border-white/15 dark:bg-white/10 dark:text-white"
        >
          <dt className="flex min-h-[3rem] flex-col items-center justify-center text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)] leading-tight text-center dark:text-white/70">
            {item.label.split(' ').map((word) => (
              <span key={word}>{word}</span>
            ))}
          </dt>
          <dd className="font-display text-4xl text-accent leading-tight drop-shadow-[0_5px_20px_rgba(255,232,0,0.35)]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
