import { historyItemSchema } from '@/lib/schemas';
import type { z } from 'zod';

const HistoryItem = historyItemSchema;

type HistoryItem = z.infer<typeof HistoryItem>;

export default function Timeline({ items }: { items: HistoryItem[] }) {
  return (
    <ol className="relative space-y-6 border-l border-white/20 pl-6">
      {items.map((item) => (
        <li key={item.year} className="space-y-1">
          <span className="absolute -left-2 mt-2 h-3 w-3 rounded-full bg-accent"></span>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.year}</p>
          <h3 className="text-xl font-display text-white">{item.title}</h3>
          <p className="text-sm text-white/70">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
