'use client';

import { useEffect } from 'react';

function expandFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;
  const section = document.getElementById(hash);
  if (!section) return;
  const details = section.querySelector('details') as HTMLDetailsElement | null;
  if (details && !details.open) {
    details.open = true;
  }
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function HistoryHashController() {
  useEffect(() => {
    expandFromHash();
    window.addEventListener('hashchange', expandFromHash);
    return () => {
      window.removeEventListener('hashchange', expandFromHash);
    };
  }, []);

  return null;
}
