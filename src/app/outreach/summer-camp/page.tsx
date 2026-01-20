import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import CampGallery from '@/components/outreach/CampGallery';
import { getLinks, getTeamData } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Sparky’s STEAM Camp'
};

const campSlides = [
  { src: '/images/outreach/camp-gallery/camp-image-0.jpg', alt: 'Campers making binary bracelets' },
  { src: '/images/outreach/camp-gallery/camp-image-1.jpg', alt: 'Students working on robotics challenge' },
  { src: '/images/outreach/camp-gallery/camp-image-2.jpg', alt: 'Mentor helping camper with circuits' },
  { src: '/images/outreach/camp-gallery/camp-image-3.jpg', alt: 'Campers testing a Harry Potter wand project' },
  { src: '/images/outreach/camp-gallery/camp-image-4.jpg', alt: 'Driving the competition robot' },
  { src: '/images/outreach/camp-gallery/camp-image-5.jpg', alt: 'Hands-on build session' },
  { src: '/images/outreach/camp-gallery/camp-image-6.jpg', alt: 'Students show off their creations' },
  { src: '/images/outreach/camp-gallery/camp-image-7.jpg', alt: 'Group photo from Sparky’s camp' },
  { src: '/images/outreach/camp-gallery/camp-image-8.jpg', alt: 'Camper learning soldering basics' },
  { src: '/images/outreach/camp-gallery/camp-image-9.jpg', alt: 'Arduino coding activity' },
  { src: '/images/outreach/camp-gallery/camp-image-10.png', alt: 'Camp flyer snapshot' },
  { src: '/images/outreach/camp-gallery/camp-image-11.jpg', alt: 'Outdoor rocket launch' },
  { src: '/images/outreach/camp-gallery/camp-image-12.jpg', alt: 'Campers collaborating on a design' },
  { src: '/images/outreach/camp-gallery/camp-image-13.jpg', alt: 'Mentor guiding electronics activity' },
  { src: '/images/outreach/camp-gallery/camp-image-14.jpg', alt: 'Student prototyping a project' },
  { src: '/images/outreach/camp-gallery/camp-image-15.jpg', alt: 'Showcase table of camp builds' },
  { src: '/images/outreach/camp-gallery/camp-image-16.jpg', alt: 'Campers presenting their project' },
  { src: '/images/outreach/camp-gallery/camp-image-17.jpg', alt: 'Team Voltage mentors with campers' }
];

export default async function SummerCampPage() {
  const [team, links] = await Promise.all([getTeamData(), getLinks()]);

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-12 lg:px-0">
      <PageHeader
        title="Sparky’s STEAM Camp"
        description="Students get a hands-on introduction to the exciting world of robotics through interactive activities and real engineering challenges."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Outreach', href: '/outreach' },
          { label: 'Summer Camp' }
        ]}
      />
      <section id="flyer" className="space-y-6">
        <SectionHeader title="Summer camp flyer" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[32px] border border-white/10 bg-surface/80 p-3 shadow-[0_25px_70px_rgba(4,12,28,0.35)] lg:mx-0">
            <Image
              src="/images/outreach/steam-camp-flyer.png"
              alt="Team Voltage STEAM summer camp flyer"
              width={480}
              height={624}
              className="h-auto w-full"
              priority
            />
          </div>
          <div className="flex-1 rounded-3xl border border-white/10 bg-card/70 p-6 text-sm text-white/80">
            <p className="text-base text-white">
              Using tools like Snap Circuits and creative design challenges, campers learn fundamental STEM concepts in a fun, approachable way.
            </p>
            <p className="mt-4 text-sm text-white/80">Some favorite activities from past camps include:</p>
            <ul className="mt-3 space-y-2 text-base text-white">
              <li>🦾 Robotic Arm</li>
              <li>📿 Binary Bracelet</li>
              <li>🪄 Harry Potter wand</li>
              <li>🤖 Driving our competition robot</li>
              <li>…and so much more!</li>
            </ul>
            <p className="mt-5 text-sm text-white/80">
              Scroll down to see highlights and photos from the past two years of unforgettable camp experiences!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTAButton href="/images/outreach/steam-camp-flyer.png" label="Download flyer" />
              <CTAButton href="#what-to-expect" label="Scroll to highlights" variant="outline" />
            </div>
          </div>
        </div>
      </section>
      <section id="what-to-expect" className="space-y-4">
        <SectionHeader title="Highlights & photos" />
        <CampGallery slides={campSlides} />
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <section className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-surface/70 p-6 text-center">
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-white/70">Questions about Sparky’s STEAM Camp?</p>
          </div>
          <div className="pt-6">
            <CTAButton href="mailto:teamvoltage386@gmail.com" label="Email Us" className="w-full justify-center" />
          </div>
        </section>
        <section className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-surface/70 p-6 text-center">
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-white/70">
              Younger age range? Our fellow FRC team Wingspan hosts a STEAM Summer Camp for incoming 3rd–6th grade.
            </p>
          </div>
          <div className="pt-6">
            <CTAButton href="https://www.wingspancamp.com" label="Explore Wingspan STEAM" className="w-full justify-center" />
          </div>
        </section>
        <section className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-surface/70 p-6 text-center">
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-white/70">Click below to see our summer camp materials and projects!</p>
          </div>
          <div className="pt-6">
            <CTAButton href={links.materialsDrive} label="Summer Camp Materials" className="w-full justify-center" />
          </div>
        </section>
      </div>
    </div>
  );
}
