import Link from 'next/link';
import { getLinks } from '@/lib/content';

const quickLinks = [
  { label: 'Join', href: '/resources/join-team' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Resources', href: '/resources' },
  { label: 'Media Kit', href: '/outreach/media#press-kit' }
];

const contactLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Donate', href: '/donate' },
  { label: 'Calendar', href: '/calendar' }
];

export default async function SiteFooter({
  email,
  socials
}: {
  email: string;
  socials: { instagram?: string; youtube?: string };
}) {
  const links = await getLinks();
  return (
    <footer className="border-t border-white/10 bg-surface pt-6">
      <div className="glass-panel mx-auto grid max-w-6xl gap-10 rounded-3xl px-4 py-12 lg:grid-cols-4 lg:px-6">
        <div>
          <p className="font-display text-xl text-white">Team Voltage 386</p>
          <p className="mt-2 text-sm text-white/70">
            Building precision robots, disciplined leaders, and measurable community impact for over two decades.
          </p>
          <a className="mt-4 block text-sm text-white/80" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
            Resources
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a href={links.sponsorPacket} className="hover:text-white">
                Sponsor Packet
              </a>
            </li>
            <li>
              <a href={links.brandGuidelines} className="hover:text-white">
                Brand Guidelines
              </a>
            </li>
            <li>
              <a href={links.materialsDrive} className="hover:text-white">
                Camp Materials Drive
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
            Stay Connected
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            {socials.instagram && (
              <li>
                <a href={socials.instagram} className="hover:text-white">
                  Instagram
                </a>
              </li>
            )}
            {socials.youtube && (
              <li>
                <a href={socials.youtube} className="hover:text-white">
                  YouTube
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} Team Voltage 386. All rights reserved.
      </div>
    </footer>
  );
}
