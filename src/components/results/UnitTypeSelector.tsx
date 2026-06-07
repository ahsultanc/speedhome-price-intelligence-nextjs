"use client";

import type { SummaryRow } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Single source of truth for the unit-type scope of the whole results view.
 * Single-select on purpose: a Fair Price that mixes 1BR–4BR into one number
 * would mislead, so there is no "all types" option here.
 */
export default function UnitTypeSelector({
  summary,
  value,
  onChange,
}: {
  summary: SummaryRow[];
  value: string | null;
  onChange: (unitType: string) => void;
}) {
  if (summary.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-secondary">Lihat tipe unit:</span>
      <div className="flex flex-wrap items-center gap-1.5">
        {summary.map((row) => {
          const type = row["Unit Type"];
          const active = type === value;
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-navy bg-navy text-white"
                  : "border-border text-secondary hover:border-accent hover:text-primary",
              )}
            >
              {type}
              <span
                className={cn(
                  "ml-1.5 tabular-nums",
                  active ? "text-white/70" : "text-secondary/70",
                )}
              >
                {row.Count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
