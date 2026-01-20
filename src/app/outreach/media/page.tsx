import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import MediaGallery from '@/components/ui/MediaGallery';
import { getLinks, getPressKit } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Media'
};

export default async function MediaPage() {
  const [pressKit, links] = await Promise.all([getPressKit(), getLinks()]);
  const photos = [
    { src: '/images/media/event-1.jpg', alt: 'Students presenting robot' },
    { src: '/images/media/event-2.jpg', alt: 'Voltage pit crew high five' },
    { src: '/images/robots/robot-2024.jpg', alt: 'Pulse robot climbing' }
  ];
  const videos = [
    { title: 'Team Voltage 386 Playlist', embedUrl: 'https://www.youtube.com/embed/videoseries?list=UUWYPeRD6nzJ6wr-bpSkh-Yg' }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 lg:px-6">
      <PageHeader
        title="Media & press kit"
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
                src={logo.file}
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
          <p className="text-sm text-white/70">Fonts: Headline – {pressKit.fonts.headline}; Body – {pressKit.fonts.body}</p>
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
