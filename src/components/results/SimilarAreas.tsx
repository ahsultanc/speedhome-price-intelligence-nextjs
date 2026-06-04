"use client";

import { ArrowRight } from "lucide-react";
import { similarAreas, getAreaIntel } from "@/lib/areaIntel";
import type { RentalType } from "@/lib/types";

export default function SimilarAreas({
  area,
  onSelect,
}: {
  area?: string | null;
  onSelect?: (area: string, rental: RentalType) => void;
}) {
  const areas = similarAreas(area);
  if (areas.length === 0) return null;

  return (
    <div className="rounded-card border border-border bg-card p-5 shadow-subtle">
      <p className="text-sm font-medium text-primary">Area lain yang mungkin relevan:</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {areas.map((a) => {
          const intel = getAreaIntel(a);
          return (
            <button
              key={a}
              onClick={() => onSelect?.(a, "monthly")}
              className="group flex items-start justify-between gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:border-accent"
            >
              <span>
                <span className="block font-medium text-primary">{a}</span>
                <span className="block text-xs text-secondary">{intel?.karakter}</span>
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary transition-colors group-hover:text-accent" />
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-secondary">
        Berdasarkan kesamaan karakteristik umum. Riset mandiri tetap diperlukan.
      </p>
    </div>
  );
}
