// Shared page section component.

import Link from 'next/link';
import { getLinks } from '@/lib/content';
import ExternalLink from '@/components/ui/ExternalLink';

// Keep quick links in one place so links stay consistent.
const quickLinks = [
  { label: 'Join', href: '/resources/join-team' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Resources', href: '/resources' },
  { label: 'Media Kit', href: '/outreach/media#press-kit' }
];

// Keep contact links in one place so links stay consistent.
const contactLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Donate', href: '/donate' },
  { label: 'Calendar', href: '/calendar' }
];

// Main site footer with quick links and social/contact actions.
export default async function SiteFooter({
  email,
  socials
}: {
  email: string;
  socials: { instagram?: string; youtube?: string };
}) {
// Pull shared outbound links from content so editors can update them without code changes.
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
              <ExternalLink href={links.sponsorPacket} openInNewTab={false} className="hover:text-white">
                Sponsor Packet
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={links.brandGuidelines} openInNewTab={false} className="hover:text-white">
                Brand Guidelines
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={links.materialsDrive} openInNewTab={false} className="hover:text-white">
                Camp Materials Drive
              </ExternalLink>
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
                <ExternalLink href={socials.instagram} openInNewTab={false} className="hover:text-white">
                  Instagram
                </ExternalLink>
              </li>
            )}
            {socials.youtube && (
              <li>
                <ExternalLink href={socials.youtube} openInNewTab={false} className="hover:text-white">
                  YouTube
                </ExternalLink>
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
