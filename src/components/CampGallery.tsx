'use client';

// Shared page section component.

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Slide = {
  src: string;
  alt: string;
};

type CampGalleryProps = {
  slides: Slide[];
  intervalMs?: number;
};

// Auto-advancing photo carousel for the summer camp section.
export default function CampGallery({ slides, intervalMs = 5000 }: CampGalleryProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div className="space-y-4">
      <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-[0_18px_55px_rgba(3,9,25,0.55)]">
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out',
              slideIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            )}
            priority={slideIndex === 0}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            className={cn(
              'h-3 w-3 rounded-full border border-white/40 transition',
              slideIndex === index ? 'bg-white' : 'bg-white/20 hover:bg-white/40'
            )}
            onClick={() => setIndex(slideIndex)}
            aria-label={`Show gallery image ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
