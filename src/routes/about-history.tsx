// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { getHistoryTimeline } from '@/lib/content';
import HistoryHashController from './about-history-hash-controller';

export const metadata: Metadata = {
  title: 'Team Voltage 386 | History',
  description: 'Explore Team Voltage 386 history from the first season through today with year-by-year FIRST Robotics Competition stories.'
};

// Renders the history page.
export default async function HistoryPage() {
  const { intro, years, missingSources } = await getHistoryTimeline();
  const introContent = intro.content;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 lg:px-0">
      <PageHeader
        title={intro.frontmatter.title}
        description={intro.frontmatter.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'History' }
        ]}
      />

      <div className="rounded-3xl border border-white/10 bg-surface/60 p-6 text-sm leading-relaxed text-white/80">
        {introContent}
      </div>

      {missingSources.length > 0 && (
        <div className="rounded-3xl border border-amber-300/30 bg-amber-500/10 p-4 text-sm text-amber-100">
          <p className="font-semibold uppercase tracking-wide text-amber-200">Missing source files</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            {missingSources.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-amber-200/80">Add the reference HTML files locally and re-run <code className="font-mono text-amber-100">npm run import:history</code>.</p>
        </div>
      )}

      {years.length === 0 ? (
        <p className="rounded-3xl border border-white/10 bg-surface/60 p-6 text-center text-sm text-white/70">
          No history entries were imported. Provide local source files under <code className="font-mono text-white">reference/voltage-history</code> and run the import script.
        </p>
      ) : (
        <div className="space-y-6">
          {years.map((year) => (
            <section
              key={year.slug}
              id={`year-${year.year}`}
              className="rounded-3xl border border-white/10 bg-surface/50 p-1"
            >
              <details className="group rounded-3xl border border-white/5 bg-black/10 p-4 transition hover:border-white/20">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-white">
                  <span>{year.title || `Season ${year.year}`}</span>
                  <span className="text-sm text-white/50 transition group-open:rotate-90">⟶</span>
                </summary>
                <div className="prose prose-invert mt-4 max-w-none text-white/80">
                  {year.content}
                </div>
              </details>
            </section>
          ))}
        </div>
      )}
      <HistoryHashController />
    </div>
  );
}
