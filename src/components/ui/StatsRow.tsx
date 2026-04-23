// Shared UI component.

import { MetricsData } from '@/lib/schemas';
import { cn } from '@/lib/utils';

// Render headline team metrics in a compact grid.
export default function StatsRow({ metrics }: { metrics: MetricsData }) {
  // Order and labels for the stat cards.
  const items = [
    { label: 'Years Competing', value: metrics.yearsActive },
    { label: 'Awards Earned', value: metrics.awards },
    { label: 'Active Students', value: metrics.students },
    { label: 'Mentors', value: metrics.mentors }
  ];

  return (
    <dl className="grid w-full grid-cols-2 gap-2 text-center sm:gap-3 lg:grid-cols-[repeat(4,minmax(0,1fr))] lg:gap-4">
      {items.map((item) => {
        const valueText = String(item.value);
        const isLongValue = valueText.length > 4;

        return (
          <div
            key={item.label}
            className="flex min-h-[4.4rem] min-w-0 flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/90 px-2 py-2 text-foreground shadow-[0_15px_35px_rgba(25,34,68,0.25)] dark:border-white/15 dark:bg-white/10 dark:text-white sm:min-h-[5rem] sm:px-3 lg:min-h-[7.25rem] lg:w-full lg:px-2 lg:py-4"
          >
            <dt className="flex min-h-[2rem] flex-col items-center justify-center text-center text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.08em] text-[color:var(--muted)] dark:text-white/70 sm:min-h-[2.15rem] sm:text-[0.74rem] lg:min-h-[2.5rem] lg:text-[0.74rem]">
            {item.label.split(' ').map((word) => (
              <span key={word}>{word}</span>
            ))}
          </dt>
            <dd
              className={cn(
                'min-w-0 max-w-full whitespace-nowrap font-display leading-none text-accent drop-shadow-[0_5px_20px_rgba(255,232,0,0.35)]',
                isLongValue
                  ? 'text-[clamp(1.1rem,4.5vw,1.45rem)] tracking-[-0.02em] lg:text-[clamp(1.35rem,1.45vw,2rem)]'
                  : 'text-[clamp(1.55rem,6vw,2.05rem)] lg:text-[clamp(2.65rem,3.5vw,4rem)]'
              )}
            >
              {item.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
