import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import { getSocials, getTeamData } from '@/lib/content';
import { withBasePath } from '@/lib/paths';

const antonClass = 'font-[var(--font-anton)]';
const robotoClass = 'font-[var(--font-roboto)]';

const defaultDescription =
  'Team Voltage 386 is an FRC robotics team building competitive robots, developing student leaders, and delivering measurable community impact.';

const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NEXT_PUBLIC_BASE_PATH ? 'https://christoferpiedra.github.io/voltage-website' : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: 'Team Voltage 386 | Engineering Future Leaders',
    template: 'Team Voltage 386 | %s'
  },
  description: defaultDescription,
  openGraph: {
    title: 'Team Voltage 386',
    description: defaultDescription,
    url: siteOrigin,
    siteName: 'Team Voltage 386',
    images: [`${siteOrigin}${withBasePath('/images/robots/robot-2025.png')}`],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team Voltage 386',
    description: defaultDescription,
    images: [`${siteOrigin}${withBasePath('/images/robots/robot-2025.png')}`]
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [socials, team] = await Promise.all([getSocials(), getTeamData()]);
  const sameAs = [socials.instagram, socials.youtube].filter(Boolean);
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Team Voltage 386',
    alternateName: 'Voltage 386',
    url: team.siteUrl,
    sameAs
  };

  return (
    <html lang="en">
      <body className={`${antonClass} ${robotoClass} bg-background text-white`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="min-h-screen bg-background pb-16">
          {children}
        </main>
        <SiteFooter email={team.contact.email} socials={socials} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
