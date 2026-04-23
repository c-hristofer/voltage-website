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
  const programs = entries.filter((entry) => entry.type === 'program');

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
          title="Community outreach"
          description="Since 2018, Team Voltage has expanded outreach that promotes STEAM and encourages the next generation of leaders."
          className="md:max-w-2xl"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-surface/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Community Service</p>
            <h3 className="text-2xl font-display text-white">Beach Cleanups</h3>
            <p className="mt-2 text-sm text-white/70">
              Living on Brevard’s Space Coast gives Voltage close access to Florida’s beaches. Starting in 2025, the team
              collaborated with Keep Brevard Beautiful to clean up local beaches and build responsibility through monthly
              outreach.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-surface/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Outreach Event</p>
            <h3 className="text-2xl font-display text-white">STEAM Demos</h3>
            <p className="mt-2 text-sm text-white/70">
              At Maker Faires and elementary school STEAM nights, Voltage demos the competition robot and teaches robotics
              concepts through paper circuits with LEDs, copper tape, button batteries, and binary bracelets.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-surface/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Service Project</p>
            <h3 className="text-2xl font-display text-white">Toys for Tots</h3>
            <p className="mt-2 text-sm text-white/70">
              Voltage began working with the local Toys for Tots distribution center in 2022, collecting 102 toys that year.
              In 2023, the team partnered with Melbourne High School’s National Honor Society and collected 666 toys.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-surface/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Partnership</p>
            <h3 className="text-2xl font-display text-white">NASA House Team</h3>
            <p className="mt-2 text-sm text-white/70">
              Voltage became a NASA House Team during the 2023-2024 season, gaining access to NASA build space, kickoff at
              Kennedy Space Center, and outreach collaboration with The Pink Team 233.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-surface/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Community Event</p>
            <h3 className="text-2xl font-display text-white">Women in STEM Movie Night</h3>
            <p className="mt-2 text-sm text-white/70">
              Since 2023, Voltage has hosted a Women in STEM movie night to inspire young girls to pursue STEM careers and
              hear from women working in STEM fields.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-surface/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Team Project</p>
            <h3 className="text-2xl font-display text-white">Voltage Around the World</h3>
            <p className="mt-2 text-sm text-white/70">
              Voltage Around the World spreads the word of FIRST Robotics and Team Voltage’s Gracious Professionalism as
              team members visit landmarks and share their FIRST cheer around the globe.
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
          {programs.map((program) => (
            <article key={program.slug} className="rounded-3xl border border-white/10 bg-surface/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Program</p>
              <h3 className="text-2xl font-display text-white">{program.title}</h3>
              <p className="mt-2 text-sm text-white/70">{program.summary}</p>
              {program.ctaLabel && program.ctaUrl && (
                <div className="mt-4">
                  <CTAButton href={program.ctaUrl} label={program.ctaLabel} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="impact" className="space-y-6">
        <SectionHeader title="Impact metrics" description="How we measure success beyond banners." />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-card/70 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Students reached</p>
            <p className="font-display text-4xl text-accent">HUNDREDS</p>
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
