import { Lightbulb } from "lucide-react";
import type { Listing, SummaryRow } from "@/lib/types";
import { formatPrice, mean, trimmedMean } from "@/lib/utils";

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

  const allPrices = listings
    .map((l) => l.monthly_price)
    .filter((v): v is number => typeof v === "number" && v > 0);
  const avg = mean(allPrices);
  const fair = trimmedMean(allPrices);
  const overpayment = avg != null && fair != null ? avg - fair : 0;

  const unitPrices = listings
    .filter((l) => l.unit_type === unit && typeof l.monthly_price === "number")
    .map((l) => l.monthly_price as number)
    .sort((a, b) => a - b);
  const p25 = percentile(unitPrices, 0.25);
  const p75 = percentile(unitPrices, 0.75);

  return (
    <div className="flex items-start gap-3 rounded-card border border-accent/30 bg-background px-5 py-4">
      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
      <p className="text-sm leading-relaxed text-primary">
        {overpayment > 0 ? (
          <>
            Di <strong>{area}</strong>, penyewa yang tidak riset rata-rata membayar{" "}
            <strong>{formatPrice(overpayment)}</strong> lebih per bulan dari harga
            wajar. Setahun, itu <strong>{formatPrice(overpayment * 12)}</strong>.
          </>
        ) : p25 != null && p75 != null ? (
          <>
            Di <strong>{area}</strong>, kebanyakan orang membayar{" "}
            <strong>{formatPrice(p25)}</strong>–<strong>{formatPrice(p75)}</strong>/bulan
            untuk <strong>{unit}</strong>. Kalau kamu ditawari lebih dari itu, ada
            ruang untuk negosiasi.
          </>
        ) : null}
      </p>
    </div>
  );
}
