// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import ExternalLink from '@/components/ui/ExternalLink';
import { cn } from '@/lib/utils';
import { getMetrics, getOutreachEntries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Outreach & Impact'
};

// Renders the outreach page.
export default async function OutreachPage() {
  const [entries, metrics] = await Promise.all([getOutreachEntries(), getMetrics()]);
  const events = entries.filter((entry) => entry.type === 'event');

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 lg:px-6">
      <PageHeader
        title="Outreach & Impact"
        description="Voltage shares STEM with Brevard County through camps, FLL, demos, and advocacy."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Outreach' }
        ]}
      />

      <section id="events" className="space-y-6">
        <SectionHeader
          title="Events"
          description="Seasonal activations plus Sparky’s STEAM Camp."
          className="md:max-w-2xl"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-surface/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Weekly Service</p>
            <h3 className="text-2xl font-display text-white">Melbourne Beach Cleanup</h3>
            <p className="mt-2 text-sm text-white/70">
              Every Sunday morning, Voltage students and mentors log shoreline litter, remove debris before it reaches the Indian River Lagoon, and invite young alumni to model environmental stewardship for incoming members.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-foreground/70 dark:text-white/50">
              15 miles of coast • 2,400+ pounds removed
            </p>
          </article>
          {events.map((event) => {
            const isCamp = event.slug === 'sparkys-steam-camp';
            // Card links are defined here so edits only happen once.
            const cardLink = isCamp ? '/outreach/summer-camp' : undefined;
            return (
              <article key={event.slug} className="relative rounded-3xl border border-white/10 bg-surface/70 p-5">
                {cardLink && (
                  <Link
                    href={cardLink}
                    className="absolute inset-0 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    aria-label={`Read more about ${event.title}`}
                  />
                )}
                <div className={cn('relative space-y-3', cardLink && 'pointer-events-none z-20')}>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Event</p>
                  <h3 className="text-2xl font-display text-white">{event.title}</h3>
                  <p className="text-sm text-white/70">{event.summary}</p>
                </div>
                {event.ctaLabel && event.ctaUrl && (
                  <div className="relative z-30 mt-4">
                    {isCamp ? (
                      <ExternalLink
                        href={event.ctaUrl}
                        className="inline-flex items-center rounded-full border border-primary/40 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#0429d2] shadow-[0_10px_25px_rgba(5,12,32,0.25)] transition hover:-translate-y-px hover:bg-white/95 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                      >
                        {event.ctaLabel}
                      </ExternalLink>
                    ) : (
                      <CTAButton href={event.ctaUrl} label={event.ctaLabel} />
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="impact" className="space-y-6">
        <SectionHeader title="Impact metrics" description="How we measure success beyond banners." />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-card/70 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Students reached</p>
            <p className="font-display text-4xl text-accent">{metrics.students + 200}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card/70 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Outreach hours</p>
            <p className="font-display text-4xl text-accent">{metrics.outreachHours}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card/70 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Camps hosted</p>
            <p className="font-display text-4xl text-accent">12</p>
          </div>
        </div>
      </section>
    </div>
  );
}
