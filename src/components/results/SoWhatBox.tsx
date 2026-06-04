import { Lightbulb } from "lucide-react";
import type { Listing, SummaryRow } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { getAreaIntel } from "@/lib/areaIntel";

function percentile(sorted: number[], p: number): number | null {
  if (!sorted.length) return null;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

export default function SoWhatBox({
  listings,
  summary,
  area,
}: {
  listings: Listing[];
  summary: SummaryRow[];
  area: string;
}) {
  if (!summary.length) return null;
  const top = [...summary].sort((a, b) => b.Count - a.Count)[0];
  const unit = top["Unit Type"];
  const prices = listings
    .filter((l) => l.unit_type === unit && typeof l.monthly_price === "number")
    .map((l) => l.monthly_price as number)
    .sort((a, b) => a - b);
  const p25 = percentile(prices, 0.25);
  const p75 = percentile(prices, 0.75);
  const intel = getAreaIntel(area);

  return (
    <div className="flex items-start gap-3 rounded-card border border-success/20 bg-sage px-5 py-4">
      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-success" />
      <p className="text-sm leading-relaxed text-primary">
        {intel?.lifestyleDesc ? <>{intel.lifestyleDesc} </> : null}
        {p25 != null && p75 != null ? (
          <>
            Berdasarkan data hari ini, kebanyakan orang membayar antara{" "}
            <strong>{formatPrice(p25)}</strong>–<strong>{formatPrice(p75)}</strong>/bulan
            untuk <strong>{unit}</strong> di area ini.
          </>
        ) : null}
      </p>
    </div>
  );
}
