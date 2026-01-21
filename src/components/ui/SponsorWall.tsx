import Image from 'next/image';
import { SponsorsData } from '@/lib/schemas';
import { withBasePath } from '@/lib/paths';

export default function SponsorWall({ data }: { data: SponsorsData }) {
  return (
    <div className="space-y-8">
      {data.tiers.map((tier) => (
        <div
          key={tier.name}
          className="glass-panel rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-6"
        >
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                {tier.amountRange}
              </p>
              <h3 className="font-display text-3xl text-white">{tier.name}</h3>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/60">Benefits</p>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary-light" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-1 flex-col gap-4 rounded-[28px] border border-white/10 bg-card/50 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Current sponsors</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tier.sponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-tr from-white/15 to-white/5 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                  >
                    {sponsor.logo ? (
                      <Image
                        src={withBasePath(sponsor.logo)}
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
                {tier.sponsors.length === 0 && (
                  <p className="col-span-full text-xs uppercase tracking-[0.3em] text-white/40">
                    Available
                  </p>
                )}
              </div>
            </div>
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
