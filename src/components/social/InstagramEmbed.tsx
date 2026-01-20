'use client';

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

const embedHtml = `
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/teamvoltage386/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:calc(100% - 2px);">
  <a href="https://www.instagram.com/teamvoltage386/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" rel="noreferrer"></a>
</blockquote>`;


export default function InstagramEmbed({ className }: InstagramEmbedProps) {

  useEffect(() => {
    window.instgrm?.Embeds?.process();
  }, []);

  return (
    <div className={cn('rounded-3xl border border-white/10 bg-white p-4 shadow-[0_18px_55px_rgba(5,12,32,0.25)]', className)}>
      <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" onLoad={() => window.instgrm?.Embeds?.process()} />
    </div>
  );
}
