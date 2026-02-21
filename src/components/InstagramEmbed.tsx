'use client';

// Shared page section component.

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

type InstagramEmbedProps = {
  className?: string;
};

// Use Instagram's iframe endpoint to avoid third-party script errors in Safari.
const embedUrl = 'https://www.instagram.com/teamvoltage386/embed';

// Renders the instagram block and related setup.
export default function InstagramEmbed({ className }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [iframeHeight, setIframeHeight] = useState(560);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateHeight = () => {
      const width = container.clientWidth;
      // Tuned to show the 6-post profile embed without an internal scrollbar or excess blank space.
      const target = Math.round(210 + width * 0.58);
      const clamped = Math.max(500, Math.min(900, target));
      setIframeHeight(clamped);
    };

    updateHeight();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateHeight);
      observer.observe(container);
    }

    window.addEventListener('resize', updateHeight);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'overflow-hidden rounded-3xl border border-white/10 bg-white p-2 shadow-[0_18px_55px_rgba(5,12,32,0.25)]',
        className
      )}
    >
      <iframe
        src={embedUrl}
        title="Instagram feed for @teamvoltage386"
        loading="lazy"
        scrolling="no"
        style={{ height: `${iframeHeight}px`, overflow: 'hidden' }}
        className="w-full rounded-2xl border-0"
      />
      <p className="px-2 pb-2 pt-3 text-center text-xs text-[#1a2d83]">
        <a href="https://www.instagram.com/teamvoltage386/" target="_blank" rel="noopener noreferrer">
          Open Instagram in a new tab
        </a>
      </p>
    </div>
  );
}
