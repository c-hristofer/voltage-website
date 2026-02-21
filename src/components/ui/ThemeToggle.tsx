'use client';

// Shared UI component.

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'theme';

// Read the saved theme, defaulting to dark when no preference exists.
function readThemePreference(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

// Apply theme values to the root element so CSS variables and dark: classes stay in sync.
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
}

// Button that switches between dark and light mode.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initialTheme = readThemePreference();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Some Safari privacy settings block storage access; theme still updates for this session.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center rounded-full border border-[#b9c7eb] bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a2d83] transition hover:bg-white/90 dark:border-white/35 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 lg:text-[0.65rem]"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}
