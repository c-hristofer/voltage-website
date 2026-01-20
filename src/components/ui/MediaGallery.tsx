'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Photo = { src: string; alt: string };
type Video = { title: string; embedUrl: string };

export default function MediaGallery({ photos, videos }: { photos: Photo[]; videos: Video[] }) {
  const [active, setActive] = useState<Photo | null>(null);

  return (
    <div className="space-y-8">
      <div id="photos" className="grid gap-4 md:grid-cols-3">
        {photos.map((photo) => (
          <button
            type="button"
            key={photo.src}
            onClick={() => setActive(photo)}
            className="group overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={400}
              height={260}
              className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <div id="videos" className="grid gap-6 md:grid-cols-2">
        {videos.map((video) => (
          <div key={video.embedUrl} className="rounded-2xl border border-white/10 bg-surface/70 p-4">
            <p className="text-sm font-semibold text-white">{video.title}</p>
            <div className="mt-4 aspect-video">
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="h-full w-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
      <div id="press-kit">
        <p className="text-sm text-white/70">
          Need official marks or boilerplate copy? Visit the press kit section below for downloads.
        </p>
      </div>
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 transition',
          active ? 'visible opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden={!active}
      >
        {active && (
          <div className="max-w-3xl">
            <button
              type="button"
              className="mb-4 text-sm font-semibold text-white"
              onClick={() => setActive(null)}
            >
              Close ×
            </button>
            <Image
              src={active.src}
              alt={active.alt}
              width={1200}
              height={800}
              className="w-full rounded-3xl"
            />
          </div>
        )}
      </div>
    </div>
  );
}
