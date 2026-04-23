// Page module loaded by the catch-all router.

import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import CampGallery from '@/components/CampGallery';
import CTAButton from '@/components/ui/CTAButton';
import MediaGallery from '@/components/ui/MediaGallery';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import { getLinks, getPressKit } from '@/lib/content';
import { withBasePath } from '@/lib/paths';

// Supported outreach detail pages.
const OUTREACH_SLUGS = ['media', 'summer-camp'] as const;
type OutreachSlug = (typeof OUTREACH_SLUGS)[number];

// Keep camp slide sources in one place so updates stay synchronized.
const campSlideSources = [
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

const campSlides = campSlideSources.map((slide) => ({
  ...slide,
  src: withBasePath(slide.src)
}));

// True when the slug is a supported outreach detail page.
function isOutreachSlug(value: string): value is OutreachSlug {
  return OUTREACH_SLUGS.includes(value as OutreachSlug);
}

// Precomputes dynamic path values so Next.js can statically generate each route.
export function generateStaticParams() {
  return OUTREACH_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;
export const revalidate = false;

// Builds page metadata for this route using the current URL parameters.
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'media') {
    return { title: 'Media' };
  }
  if (slug === 'summer-camp') {
    return { title: 'Sparky’s STEAM Camp' };
  }
  return { title: 'Outreach' };
}

// Renders the outreach detail page.
export default async function OutreachDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isOutreachSlug(slug)) {
    notFound();
  }

  if (slug === 'media') {
    return renderMediaPage();
  }

  return renderSummerCampPage();
}

// Keep media page markup in a helper so this file stays easy to scan.
async function renderMediaPage() {
  const [pressKit, links] = await Promise.all([getPressKit(), getLinks()]);
  // Photo assets used by the media gallery.
  const photos = [
    { src: withBasePath('/images/media/event-1.jpg'), alt: 'Students presenting robot' },
    { src: withBasePath('/images/media/event-2.jpg'), alt: 'Voltage pit crew high five' },
    { src: withBasePath('/images/brand/team-voltage-logo.png'), alt: 'Team Voltage logo' }
  ];
  // Embedded videos shown on the media page.
  const videos = [
    {
      title: 'Team Voltage 386 Playlist',
      embedUrl: 'https://www.youtube.com/embed/videoseries?list=UUWYPeRD6nzJ6wr-bpSkh-Yg'
    }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 lg:px-6">
      <PageHeader
        title="Branding Guidelines"
        description="Approved photography, logo files, color values, and boilerplate copy."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Media' }
        ]}
      />

      <section>
        <MediaGallery photos={photos} videos={videos} />
      </section>

      <section id="press-kit" className="space-y-6">
        <SectionHeader title="Press kit" description={pressKit.boilerplate} />
        <div className="grid gap-6 md:grid-cols-2">
          {pressKit.logos.map((logo) => (
            <div key={logo.name} className="rounded-3xl border border-white/10 bg-card/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{logo.name}</p>
              <p className="text-sm text-white/60">{logo.usage}</p>
              <Image
                src={withBasePath(logo.file)}
                alt={logo.name}
                width={320}
                height={160}
                className="mt-4 w-full rounded-2xl bg-white/5 object-contain p-4"
              />
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {pressKit.colors.map((color) => (
            <div key={color.name} className="rounded-3xl border border-white/10 bg-card/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{color.name}</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="h-10 w-10 rounded-full" style={{ backgroundColor: color.value }} />
                <div>
                  <p className="text-sm font-semibold text-white">{color.value}</p>
                  <p className="text-xs text-white/60">{color.usage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-white/10 bg-surface/70 p-6">
          <p className="text-sm text-white/70">
            Fonts: Headline – {pressKit.fonts.headline}; Body – {pressKit.fonts.body}
          </p>
          <p className="mt-2 text-sm text-white/70">Usage notes: {pressKit.usageNotes}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <CTAButton href={links.brandGuidelines} label="Brand guidelines" />
            <CTAButton href={links.sponsorPacket} label="Sponsor packet" variant="outline" />
          </div>
        </div>
      </section>
    </div>
  );
}

// Keep summer camp page markup in a helper so this file stays easy to scan.
async function renderSummerCampPage() {
  // Pull shared links from content so camp CTAs can be edited without code changes.
  const links = await getLinks();

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
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[32px] border border-white/10 bg-surface/80 p-3 shadow-[0_25px_70px_rgba(4,12,28,0.35)] lg:mx-0">
            <Image
              src={withBasePath('/images/outreach/steam-camp-flyer.png')}
              alt="Team Voltage STEAM summer camp flyer"
              width={480}
              height={624}
              className="h-auto w-full rounded-[26px]"
              priority
            />
          </div>
          <div className="flex-1 rounded-3xl border border-white/10 bg-card/70 p-6 text-sm text-white/80">
            <p className="text-base text-white">
              Using tools like Snap Circuits and creative design challenges, campers learn fundamental STEM concepts in a
              fun, approachable way.
            </p>
            <p className="mt-4 text-sm text-white/80">Some favorite activities from past camps include:</p>
            <ul className="mt-3 space-y-2 text-base text-white">
              <li>🦾 Robotic Arm</li>
              <li>📿 Binary Bracelet</li>
              <li>🪄 Harry Potter wand</li>
              <li>🤖 Driving our competition robot</li>
              <li>...and so much more!</li>
            </ul>
            <p className="mt-5 text-sm text-white/80">
              Scroll down to see highlights and photos from the past two years of unforgettable camp experiences!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTAButton href={withBasePath('/images/outreach/steam-camp-flyer.png')} label="Download flyer" />
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
              Younger age range? Our fellow FRC team Wingspan hosts a STEAM Summer Camp for incoming 3rd-6th grade.
            </p>
          </div>
          <div className="pt-6">
            <CTAButton
              href="https://www.wingspancamp.com"
              label="Explore Wingspan STEAM"
              className="w-full justify-center"
            />
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
