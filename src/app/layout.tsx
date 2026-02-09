// App-level Next.js configuration.

import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getSocials, getTeamData } from '@/lib/content';
import { warmMdxCompiler } from '@/lib/mdx';
import { getSiteOrigin, withBasePath } from '@/lib/paths';
import { serializeJsonLd } from '@/lib/security';

// Shared class names grouped here to keep JSX cleaner.
const antonClass = 'font-[var(--font-anton)]';
// Shared class names grouped here to keep JSX cleaner.
const robotoClass = 'font-[var(--font-roboto)]';

// Default description used when a page does not provide custom text.
const defaultDescription =
  'Team Voltage 386 is an FRC robotics team building competitive robots, developing student leaders, and delivering measurable community impact.';

// Warm the MDX compiler early so detail pages do not pay first-use import latency.
warmMdxCompiler();

// Base site origin value reused across the app configuration.
const siteOrigin = getSiteOrigin();

// Set theme before React hydration so pages load in dark mode without flashing.
const initializeThemeScript = `
(() => {
  try {
    const saved = localStorage.getItem('theme');
    const theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`;

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

// Wraps every page with shared shell elements like the header and footer.
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [socials, team] = await Promise.all([getSocials(), getTeamData()]);
  // Only include social URLs that actually exist.
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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${antonClass} ${robotoClass} bg-background text-white`}>
        <script dangerouslySetInnerHTML={{ __html: initializeThemeScript }} />
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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
