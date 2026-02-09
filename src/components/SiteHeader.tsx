'use client';

// Shared page section component.

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { withBasePath } from '@/lib/paths';
import ThemeToggle from '@/components/ui/ThemeToggle';

// Keep nav links in one place so links stay consistent.
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'History', href: '/about/history' },
      { label: 'Awards', href: '/about/awards' },
      { label: 'Mission & Values', href: '/about#mission' },
      { label: 'Mentors', href: '/about#mentors' },
      { label: 'FAQ', href: '/about#faq' }
    ]
  },
  {
    label: 'Robots',
    href: '/robots',
    children: [
      { label: '2026 Spotlight', href: '/robots/2026' },
      { label: 'Past Robots', href: '/robots' }
    ]
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Join Team', href: '/resources/join-team' },
      { label: 'Pre-Season Forms', href: '/resources/pre-season-forms' },
      { label: 'Forms', href: '/resources/forms' }
    ]
  },
  { label: 'Calendar', href: '/calendar' },
  {
    label: 'Outreach',
    href: '/outreach',
    children: [
      { label: 'Events', href: '/outreach#events' },
      { label: 'Summer Camp', href: '/outreach/summer-camp' },
      { label: 'Media', href: '/outreach/media' }
    ]
  },
  {
    label: 'Sponsors',
    href: '/sponsors',
    children: [
      { label: 'Sponsors', href: '/sponsors' },
      { label: 'Donate', href: '/donate' },
      { label: 'Contact', href: '/contact' }
    ]
  }
];

// Main site header with responsive navigation and dropdowns.
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Keep desktop/mobile behavior in sync with viewport width.
    const handler = () => setIsDesktop(window.innerWidth >= 1280);
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Mark a nav item active when the current path matches it.
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-[9999] overflow-visible border-b border-gray-200 bg-gradient-to-r from-white via-[#f3f7ff] to-white shadow-xl backdrop-blur-2xl dark:bg-gradient-to-r dark:from-[rgba(2,6,21,0.8)] dark:via-[rgba(5,12,32,0.7)] dark:to-[rgba(2,6,21,0.8)] dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2 lg:py-4 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-4" aria-label="Team Voltage 386 home">
          <Image
            src={withBasePath('/images/brand/team-voltage-logo.png')}
            alt="Team Voltage 386 logo"
            width={72}
            height={72}
            className="h-16 w-auto"
            priority
          />
          <div className="hidden min-w-[9rem] flex-col text-sm font-medium uppercase tracking-wide sm:flex">
            <span className="text-white">Team Voltage</span>
            <span className="text-white/60">FRC 386</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
        <nav
          className={cn(
            'absolute left-0 right-0 top-full z-[10000] overflow-visible px-4 pb-6 pt-4 text-foreground transition-all duration-200 lg:static lg:z-auto lg:ml-auto lg:flex lg:items-center lg:gap-5 lg:px-0 lg:pb-0 lg:pt-0',
            !isDesktop &&
              'rounded-3xl border border-white/40 bg-gradient-to-b from-white/95 to-white/85 shadow-[0_30px_70px_rgba(5,12,32,0.35)] backdrop-blur-[28px] dark:border-white/15 dark:bg-gradient-to-b dark:from-[rgba(8,16,38,0.92)] dark:via-[rgba(5,10,26,0.9)] dark:to-[rgba(3,7,18,0.9)]',
            isDesktop &&
              'lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-0',
            open ? 'visible translate-y-1 opacity-100' : 'invisible -translate-y-6 opacity-0 lg:visible lg:translate-y-0 lg:opacity-100'
          )}
        >
          <div className="hidden lg:flex lg:shrink-0">
            <ThemeToggle />
          </div>
          <ul className="grid max-h-[70vh] gap-4 overflow-y-auto text-xs font-semibold uppercase tracking-wide lg:max-h-none lg:flex lg:w-auto lg:flex-nowrap lg:items-center lg:justify-end lg:gap-1 lg:overflow-visible lg:rounded-full lg:border lg:border-white/50 lg:bg-white/85 lg:px-3 lg:py-1 lg:text-[clamp(0.42rem,0.34rem+0.22vw,0.64rem)] lg:tracking-[0.18em] lg:text-[#021642] lg:shadow-[0_10px_30px_rgba(2,6,21,0.25)] dark:text-[#eaf0ff] dark:lg:border-white/30 dark:lg:bg-[rgba(12,18,44,0.78)] dark:lg:text-[clamp(0.46rem,0.42rem+0.16vw,0.64rem)] dark:lg:shadow-[0_20px_50px_rgba(0,0,0,0.45)] lg:whitespace-nowrap">
            {NAV_LINKS.map((item) => {
              const isOpen = openDropdown === item.label;
              const isMobileDropdownOpen = !isDesktop && isOpen;
              const isDesktopDropdownOpen = isDesktop && isOpen;
              // Open desktop dropdowns on pointer hover.
              const handleEnter = () => {
                if (isDesktop) {
                  setOpenDropdown(item.label);
                }
              };
              // Close desktop dropdowns when the pointer leaves.
              const handleLeave = () => {
                if (isDesktop) {
                  setOpenDropdown(null);
                }
              };
              // Open desktop dropdowns when keyboard focus enters.
              const handleFocus = () => {
                if (isDesktop) {
                  setOpenDropdown(item.label);
                }
              };
              // Close desktop dropdowns when keyboard focus leaves.
              const handleBlur = () => {
                if (isDesktop) {
                  setOpenDropdown(null);
                }
              };
              return (
                <li
                  key={item.label}
                  className="group relative rounded-2xl bg-white/5 px-3 py-1 text-white dark:bg-transparent lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0"
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2 py-2 text-[#071a4f] transition hover:text-[#021039] dark:text-[#f7fbff] dark:hover:text-white lg:px-3',
                    isActive(item.href) &&
                      'bg-white/80 text-[#021039] shadow-[0_8px_20px_rgba(0,0,0,0.15)] dark:bg-white/25 dark:text-[#050c2a] dark:shadow-[0_8px_20px_rgba(0,0,0,0.4)]'
                  )}
                  onClick={(event) => {
                    if (item.children && item.children.length > 0 && !isDesktop) {
                      event.preventDefault();
                      setOpenDropdown((prev) => (prev === item.label ? null : item.label));
                      return;
                    }
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <>
                    <span
                      className={cn(
                        'hidden lg:block lg:absolute lg:left-1/2 lg:top-full lg:w-72 lg:-translate-x-1/2',
                        isDesktopDropdownOpen
                          ? 'lg:h-8 lg:pointer-events-auto'
                          : 'lg:h-0 lg:pointer-events-none'
                      )}
                    />
                    <div
                      className={cn(
                        'z-[10001] space-y-1 text-[0.75rem] text-white/85 transition-all duration-200',
                        !isDesktop &&
                          (isMobileDropdownOpen
                            ? 'max-h-96 border-l border-white/10 pl-4 pt-2'
                            : 'max-h-0 overflow-hidden border-transparent pl-0 pt-0'),
                        'lg:absolute lg:left-1/2 lg:top-full lg:mt-4 lg:w-72 lg:-translate-x-1/2 lg:rounded-3xl lg:border lg:border-white/40 lg:bg-white/85 lg:px-5 lg:pb-5 lg:pt-6 lg:shadow-[0_35px_80px_rgba(2,6,21,0.35)] lg:backdrop-blur-[32px] dark:lg:border-white/25 dark:lg:bg-[rgba(18,26,60,0.92)]',
                        isDesktopDropdownOpen
                          ? 'lg:pointer-events-auto lg:translate-y-0 lg:opacity-100'
                          : 'lg:pointer-events-none lg:-translate-y-2 lg:opacity-0'
                      )}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-2xl border border-white/40 bg-gradient-to-r from-white to-white/80 px-3 py-2 text-foreground shadow-[0_10px_25px_rgba(2,6,21,0.2)] backdrop-blur-[20px] transition hover:border-primary/50 hover:text-primary dark:border-white/35 dark:bg-gradient-to-r dark:from-[rgba(54,70,128,0.55)] dark:to-[rgba(26,38,86,0.4)] dark:text-[#f6f8ff] dark:hover:border-white/70 dark:hover:text-white"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
