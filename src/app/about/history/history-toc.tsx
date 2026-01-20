'use client';

type TocItem = {
  id: string;
  label: string;
};

type Props = {
  items: TocItem[];
};

function openSection(id: string) {
  if (!id) return;
  const section = document.getElementById(id);
  if (!section) return;
  const details = section.querySelector('details') as HTMLDetailsElement | null;
  if (details && !details.open) {
    details.open = true;
  }
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (window.location.hash !== `#${id}`) {
    history.replaceState(null, '', `#${id}`);
  }
}

export default function HistoryToc({ items }: Props) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-surface/60 p-4 lg:hidden">
        <label htmlFor="history-mobile-select" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          Jump to year
        </label>
        <select
          id="history-mobile-select"
          className="mt-2 w-full rounded-2xl border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(event) => {
            const value = event.target.value;
            if (value) {
              openSection(value);
            }
          }}
        >
          <option value="">Select a year</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden rounded-3xl border border-white/10 bg-surface/60 p-4 lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Timeline</p>
        <div className="mt-3 flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="rounded-2xl border border-white/10 px-3 py-2 text-left text-sm font-semibold text-white/70 transition hover:border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => openSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
