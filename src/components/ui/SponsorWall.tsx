import Image from 'next/image';
import { SponsorsData } from '@/lib/schemas';

export default function SponsorWall({ data }: { data: SponsorsData }) {
  return (
    <div className="space-y-8">
      {data.tiers.map((tier) => (
        <div
          key={tier.name}
          className="glass-panel rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                Tier
              </p>
              <h3 className="font-display text-3xl text-white">{tier.name}</h3>
              <p className="text-sm text-white/60">{tier.amountRange}</p>
            </div>
            <ul className="grid flex-1 gap-2 text-sm text-white/70 md:grid-cols-2">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="rounded-full border border-white/10 px-3 py-1">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tier.sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-tr from-white/15 to-white/5 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
              >
                {sponsor.logo ? (
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={220}
                    height={120}
                    className="h-20 w-auto object-contain"
                  />
                ) : (
                  <span className="text-sm font-semibold text-white">{sponsor.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {data.deadlineNote && (
        <p className="glass-panel rounded-2xl border border-white/10 bg-primary/10 p-4 text-sm text-white">
          {data.deadlineNote}
        </p>
      )}
    </div>
  );
}
