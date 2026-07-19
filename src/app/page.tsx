// App-level Next.js configuration.

import Image from 'next/image';
import Link from 'next/link';
import CTAButton from '@/components/ui/CTAButton';
import SectionHeader from '@/components/ui/SectionHeader';
import StatsRow from '@/components/ui/StatsRow';
import InstagramEmbed from '@/components/InstagramEmbed';
import ExternalLink from '@/components/ui/ExternalLink';
import { getLinks, getMetrics, getSponsors, getTeamData } from '@/lib/content';
import { withBasePath } from '@/lib/paths';

// Renders the homepage sections using team and sponsor content.
export default async function HomePage() {
  const [team, metrics, sponsors, links] = await Promise.all([
    getTeamData(),
    getMetrics(),
    getSponsors(),
    getLinks()
  ]);

  const sponsorLogos = sponsors.tiers
    .flatMap((tier) =>
      tier.sponsors.map((sponsor) => ({
        ...sponsor,
        logo: sponsor.logo ? withBasePath(sponsor.logo) : undefined
      }))
    )
    .slice(0, 8);
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 lg:space-y-24 lg:px-6">
      <section className="glass-panel grid gap-8 rounded-3xl p-5 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Voltage 386
          </p>
          <h2 className="font-display text-4xl text-foreground drop-shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
            Team Voltage 386 builds precise robots and future-ready student leaders.
          </h2>
          <p className="text-lg text-muted">
            Precision engineering, high-energy competition, and measurable community impact power every season.
            Join us to design, code, and drive world-class robots from Melbourne, Florida.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href="/resources/join-team" label="Join the Team" />
            <CTAButton href="/sponsors" label="Sponsor Voltage" variant="outline" />
          </div>
        </div>
        <Image
          src={withBasePath('/images/media/impact-award-team-2026.jpeg')}
          alt="Team Voltage students holding the 2026 FIRST Impact Award banner at Tallahassee Regional"
          width={1465}
          height={1099}
          className="h-auto w-full self-start rounded-2xl object-contain"
          priority
        />
        <div className="lg:col-span-2">
          <StatsRow metrics={metrics} />
        </div>
      </section>

      <section className="glass-panel rounded-3xl border border-white/10 bg-gradient-to-r from-primary/30 via-primary/10 to-surface/70 p-8 text-white">
        <div className="space-y-6 text-white/90">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">↓ Upcoming Voltage Nights ↓</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#ffe800]/40 bg-[#ffe800]/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ffe800]">New student kickoff</p>
              <h2 className="mt-2 font-display text-2xl text-white">Late August or early September</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                New student kickoff will be at Melbourne High School. Details will be updated here and on Instagram{' '}
                <a
                  href="https://www.instagram.com/teamvoltage386/"
                  className="font-semibold text-[#ffe800] underline decoration-[#ffe800]/50 underline-offset-4 hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  (@teamvoltage386)
                </a>{' '}
                as soon as they are available.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Mark your calendars</p>
              <h2 className="mt-2 font-display text-2xl text-white">Space Coast ShowDown</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                Team Voltage&apos;s offseason competition is scheduled for <span className="font-semibold text-[#ffe800]">September 26</span>.
              </p>
            </div>
          </div>
          <div className="space-y-3 text-white dark:text-white">
            <h1 className="font-display text-4xl text-white">Team Voltage meets every Monday</h1>
            <p className="text-base leading-relaxed text-foreground dark:text-white/90">
              Meetings are <span className="font-semibold">{team.meeting.schedule}</span> at Melbourne High School.
              Check the calendar page and follow us on Instagram for current meeting dates and event updates.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Before you visit</p>
              <p className="mt-2 text-sm text-foreground dark:text-white/85">
                Park near the Melbourne High auditorium off Bulldog Blvd (across from Chicken Salad Chick) and follow the
                signage to the shop entrance.
              </p>
              {team.meeting.mapUrl && (
                <ExternalLink href={team.meeting.mapUrl} className="mt-3 inline-block text-sm font-semibold">
                  Open campus map →
                </ExternalLink>
              )}
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Bring your forms</p>
              <p className="mt-2 text-sm text-foreground dark:text-white/85">
                Safety, travel, and handbook paperwork must be signed before we add you to the roster.
              </p>
              <div className="mt-3">
                <CTAButton href="/resources#forms" label="View forms" variant="outline" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Stay in the loop</p>
              <p className="mt-2 text-sm text-foreground dark:text-white/85">
                Submit the interest form and see upcoming onboarding nights, outreach events, and competitions.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <CTAButton href={links.joinForm} label="Interest form" />
                <CTAButton href="/calendar" label="See calendar" variant="outline" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link href={`mailto:${team.contact.email}`} className="text-white hover:text-accent">
              Questions? Email us
            </Link>
            <Link href="/resources/join-team" className="text-white hover:text-accent">
              Learn how joining works →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="glass-panel rounded-3xl border border-white/10 bg-card/70 p-8">
          <div className="space-y-4 text-center text-white/80">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Follow Voltage</p>
            <h2 className="font-display text-3xl text-white">Live from @teamvoltage386</h2>
            <p className="text-sm">
              Highlights from Monday build nights, Sparky’s STEAM Camp, and competition pits update in real time.
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <InstagramEmbed className="w-full max-w-xl" />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Sponsors"
          title="Partners powering Voltage"
          description={sponsors.deadlineNote}
        />
        <div className="glass-panel mt-6 grid gap-4 rounded-3xl border border-white/10 bg-card/70 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {sponsorLogos.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_15px_35px_rgba(0,0,0,0.25)]"
            >
              {sponsor.logo ? (
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={200}
                  height={120}
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{sponsor.name}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          <CTAButton href="/sponsors" label="View sponsor tiers" />
          <CTAButton href="/donate" label="Donate" variant="outline" />
        </div>
      </section>

      <section className="space-y-8">
        <div className="glass-panel rounded-3xl border border-white/10 bg-card/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Mission Statement</p>
          <h3 className="mt-2 text-2xl font-display text-white">Why Voltage builds</h3>
          <p className="mt-3 text-sm text-white/80">{team.missionStatement}</p>
        </div>
        <div className="glass-panel grid gap-8 rounded-3xl border border-white/10 bg-surface/70 p-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 text-foreground dark:text-white/85">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">What is FIRST Robotics Competition?</p>
            <p className="text-sm">
              The FIRST Robotics Competition pairs high school students with adult mentors—including engineers, teachers,
              and industry professionals—to design, build, and program industrial-sized robots. Each season introduces a
              brand-new game that demands rapid prototyping, collaboration, and strategic thinking under tight deadlines.
            </p>
            <p className="text-sm">
              Students sharpen project management, public speaking, and outreach skills alongside their technical
              training. The program mirrors real-world engineering environments and lives by Gracious Professionalism™, so
              even in high-stakes matches teams treat one another with respect and empathy.
            </p>
            <p className="text-sm">
              It’s not just about building robots—it’s about cultivating future-ready leaders, creative problem-solvers,
              and STEM changemakers.
            </p>
            <CTAButton href="https://www.firstinspires.org/robotics/frc" label="Learn more about FIRST" variant="outline" />
          </div>
          <div className="glass-card overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            <Image
              src={withBasePath('/images/media/event-1.jpg')}
              alt="Voltage students demoing robots at a FIRST event"
              width={900}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
