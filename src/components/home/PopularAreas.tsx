"use client";

import { DEMO_AREAS } from "@/lib/constants";
import demoResponses from "@/data/demoResponses.json";
import type { RentalType } from "@/lib/types";

const DEMO = demoResponses as unknown as Record<
  string,
  { meta?: { radius_count?: number } }
>;
const keyOf = (area: string) => area.toLowerCase().replace(/[^a-z0-9]/g, "");

// Only the areas that actually have data — matches the hero's "4 area, data
// lengkap" claim, so a suggested chip never leads to an empty result.
const POPULAR = DEMO_AREAS.map((area) => ({
  area,
  count: DEMO[keyOf(area)]?.meta?.radius_count ?? 0,
})).sort((a, b) => b.count - a.count);

export default function PopularAreas({
  onSelect,
}: {
  onSelect: (area: string, rental: RentalType) => void;
}) {
  return (
    <div className="mx-auto mt-8 max-w-2xl text-center">
      <p className="mb-2 text-sm text-secondary">Coba cari:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {POPULAR.map(({ area, count }) => (
          <button
            key={area}
            onClick={() => onSelect(area, "monthly")}
            className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-primary transition-colors hover:border-navy hover:bg-navy hover:text-white active:bg-accent active:text-primary"
          >
            {count > 0 ? `${area} · ${count} listing` : area}
          </button>
        ))}
      </div>
    </div>
  );
}
