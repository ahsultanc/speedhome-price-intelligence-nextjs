import { BarChart2 } from "lucide-react";
import type { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const Icon = () => <BarChart2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy" />;

/** DATA, not VERDICT — neutral framing, never red. */
export default function FairDealContext({
  listing,
  fairPrice,
  count,
  area,
}: {
  listing: Listing;
  fairPrice: number | null;
  count?: number;
  area?: string;
}) {
  const p = listing.monthly_price;
  if (typeof p !== "number" || !fairPrice) {
    return <span className="text-xs text-secondary">—</span>;
  }
  const dev = (p - fairPrice) / fairPrice;

  // Above market (> +20%) — loss framing (neutral colour, never red).
  if (dev > 0.2) {
    const diff = Math.round(p - fairPrice);
    return (
      <span
        title="Untuk penyewa: ada potensi negosiasi. Untuk landlord: unit di segmen premium."
        className="flex cursor-help items-start gap-1.5 text-xs text-secondary"
      >
        <Icon /> {formatPrice(diff)}/bulan di atas pasar — {formatPrice(diff * 12)} per tahun.
      </span>
    );
  }

  // Below market (< −20%) — efficiency framing + sample size.
  if (dev < -0.2) {
    const diff = Math.round(fairPrice - p);
    return (
      <span className="flex items-start gap-1.5 text-xs text-success">
        <BarChart2 className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {formatPrice(diff)} lebih murah
        dari rata-rata
        {count && area ? ` ${count} listing di ${area}` : ""}
      </span>
    );
  }

  // Within ±20% — neutral.
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-secondary">
      <Icon /> Sesuai rata-rata pasar
    </span>
  );
}
