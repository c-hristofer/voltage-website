import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { getAwards } from '@/lib/content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About | Awards & Honors'
};

const cardAccents = [
  'from-[#08244c]/85 via-[#0b335a]/60 to-[#040b1a]/90 border-cyan-200/30',
  'from-[#2b0b3f]/85 via-[#44174f]/55 to-[#080512]/90 border-fuchsia-200/30',
  'from-[#012d2d]/85 via-[#0a3c2f]/55 to-[#030a12]/90 border-emerald-200/30'
];

export default async function AboutAwardsPage() {
  const awards = await getAwards();

  return (
    <div className="relative mx-auto max-w-5xl space-y-12 px-4 py-12 lg:px-0">
      <PageHeader
        title="Awards & Honors"
        description="A quarter-century of banners, judged accolades, and inspiration awards earned through gracious professionalism."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Awards' }
        ]}
      />

      <section className="relative">
        <div
          className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[#64ffe0]/60 via-[#78a4ff]/40 to-transparent lg:block"
          aria-hidden="true"
        />
        <div className="space-y-10">
          {awards.map((entry, index) => {
            const accent = cardAccents[index % cardAccents.length];
            return (
              <div key={`${entry.year}-${entry.game}`} className="relative lg:pl-12">
                <div
                  className="pointer-events-none absolute left-3 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white/60 bg-[#73ffd9]/70 shadow-[0_0_30px_rgba(115,255,217,0.6)] lg:block"
                  aria-hidden="true"
                />
                <article
                  className={cn(
                    'relative overflow-hidden rounded-[32px] border bg-gradient-to-br p-6 shadow-[0_35px_90px_rgba(5,12,32,0.55)] backdrop-blur',
                    accent
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)] opacity-80"
                    aria-hidden="true"
                  />
                  <div className="relative space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Season</p>
                        <p className="text-4xl font-display text-white">{entry.year}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#78ffe0] to-[#66b9ff]" />
                        {entry.game}
                      </span>
                    </div>
                    <ul className="space-y-3 text-sm text-white/90">
                      {entry.honors.map((honor) => (
                        <li key={honor} className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#78ffe0] to-[#66b9ff] shadow-[0_0_10px_rgba(102,185,255,0.7)]" />
                          <span className="leading-relaxed">{honor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
