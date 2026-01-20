import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import FAQAccordion from '@/components/ui/FAQAccordion';
import CTAButton from '@/components/ui/CTAButton';
import { getTeamData } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About'
};

export default async function AboutPage() {
  const team = await getTeamData();

  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 py-12 lg:px-0">
      <PageHeader
        title="About Voltage 386"
        description="An inclusive, county-wide FRC program guided by mentors and rooted in Gracious Professionalism."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' }
        ]}
      />

      <section id="mission" className="space-y-4">
        <SectionHeader title="Mission & Values" description={team.missionStatement} />
        <p className="text-sm text-muted">
          FIRST Robotics Competition (FRC) is the ultimate varsity sport for the mind. Teams have just weeks to design, build, and program a 120-pound robot that cooperates and competes on a global stage. Voltage 386 embraces Gracious Professionalism—competing fiercely while helping rivals, elevating our community, and modeling integrity.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {team.values.map((value) => (
            <div key={value.title} className="rounded-3xl border border-white/10 bg-card/70 p-4">
              <h3 className="text-lg font-semibold text-white">{value.title}</h3>
              <p className="text-sm text-white/70">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mentors" className="space-y-6">
        <SectionHeader title="Mentors" description="Professional engineers, educators, and alumni guide subteams, safety processes, and competition strategy." />
        <div className="grid gap-4 md:grid-cols-2">
          {team.mentors.map((mentor) => (
            <div key={mentor.name} className="space-y-3 rounded-3xl border border-white/10 bg-card/80 p-4">
              <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={mentor.photo ?? '/images/mentors/placeholder.png'}
                  alt={`${mentor.name} headshot`}
                  width={320}
                  height={160}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-white">{mentor.name}</h3>
              <p className="text-sm text-white/60">{mentor.title}</p>
              <p className="text-sm text-white/70">{mentor.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="space-y-6">
        <SectionHeader title="FAQ" description="Need more details before visiting? Start here." />
        <FAQAccordion faqs={team.faqs} />
      </section>

      <section id="contact" className="rounded-3xl border border-white/10 bg-primary/10 p-6 text-center">
        <p className="text-lg font-semibold text-white">Ready to experience Voltage?</p>
        <p className="mt-2 text-sm text-muted">Join us on a Monday meeting or drop a note for a sponsor tour.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <CTAButton href="/resources/join-team" label="Join a meeting" />
          <CTAButton href="/contact" label="Contact the team" variant="outline" />
        </div>
      </section>
    </div>
  );
}
