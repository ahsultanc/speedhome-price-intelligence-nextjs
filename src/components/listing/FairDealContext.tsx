import type { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

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
        className="block cursor-help text-xs text-secondary"
      >
        📊 {formatPrice(diff)}/bulan di atas pasar — {formatPrice(diff * 12)} per tahun.
      </span>
    );
  }

  // Below market (< −20%) — efficiency framing + sample size.
  if (dev < -0.2) {
    const diff = Math.round(fairPrice - p);
    return (
      <span className="block text-xs text-success">
        📊 {formatPrice(diff)} lebih efisien dari rata-rata
        {count && area ? ` ${count} listing di ${area}` : ""}
      </span>
    );
  }

  // Within ±20% — neutral.
  return (
    <span className="block whitespace-nowrap text-xs text-secondary">
      📊 Sesuai rata-rata pasar
    </span>
  );
}
