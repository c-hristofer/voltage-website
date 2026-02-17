'use client';

// Shared page section component.

import Script from 'next/script';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

type InstagramEmbedProps = {
  className?: string;
};

// Base embed url value reused across the app configuration.
const embedUrl = 'https://www.instagram.com/teamvoltage386/?utm_source=ig_embed&utm_campaign=loading';
const embedStyle = {
  background: '#FFF',
  border: 0,
  borderRadius: '3px',
  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
  margin: '0',
  maxWidth: '100%',
  minWidth: '0',
  padding: 0,
  width: '100%'
} as const;

// Renders the instagram block and related setup.
export default function InstagramEmbed({ className }: InstagramEmbedProps) {
  useEffect(() => {
    window.instgrm?.Embeds?.process();
  }, []);

  return (
    <div className={cn('overflow-hidden rounded-3xl border border-white/10 bg-white p-4 shadow-[0_18px_55px_rgba(5,12,32,0.25)]', className)}>
      <blockquote
        className="instagram-media w-full"
        data-instgrm-permalink={embedUrl}
        data-instgrm-version="14"
        style={embedStyle}
      >
        <a href={embedUrl} target="_blank" rel="noopener noreferrer">
          View Team Voltage on Instagram
        </a>
      </blockquote>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds?.process()}
      />
    </div>
  );
}
