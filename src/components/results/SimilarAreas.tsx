"use client";

import { similarAreas, getAreaIntel } from "@/lib/areaIntel";
import { buildSpeedhomeURL } from "@/lib/utm";
import { slugifyArea, formatPrice, mean } from "@/lib/utils";
import demoResponses from "@/data/demoResponses.json";
import type { Listing } from "@/lib/types";

const DEMO = demoResponses as unknown as Record<
  string,
  { meta?: { in_area_count?: number }; listings?: Listing[] }
>;
const keyOf = (a: string) => a.toLowerCase().replace(/[^a-z0-9]/g, "");

export default function SimilarAreas({ area }: { area?: string | null }) {
  const areas = similarAreas(area);
  if (areas.length === 0) return null;

  return (
    <div className="rounded-card border border-border bg-card p-5 shadow-subtle">
      <p className="text-sm text-primary">
        Atau kalau budget lebih fleksibel, area ini worth dipertimbangkan:
      </p>
      <div className="mt-3 space-y-2">
        {areas.map((a) => {
          const slug = slugifyArea(a);
          const d = DEMO[keyOf(a)];
          const prices = (d?.listings ?? [])
            .map((l) => l.monthly_price)
            .filter((v): v is number => typeof v === "number" && v > 0);
          const avg = mean(prices);
          const n = d?.meta?.in_area_count;
          const intel = getAreaIntel(a);
          return (
            <a
              key={a}
              href={buildSpeedhomeURL(slug, "similar-area")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm transition-colors hover:border-accent"
            >
              <span className="text-primary">
                <strong>{a}</strong>
                {avg != null && n ? (
                  <span className="text-secondary">
                    {" "}
                    · Rata-rata {formatPrice(avg)} · {n} listing
                  </span>
                ) : (
                  <span className="text-secondary"> · {intel?.karakter}</span>
                )}
              </span>
              <span className="text-accent">→</span>
            </a>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-secondary">
        Berdasarkan kesamaan karakteristik umum. Riset mandiri tetap diperlukan.
      </p>
    </div>
  );
}
