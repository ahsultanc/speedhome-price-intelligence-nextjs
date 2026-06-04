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

  // Above average (> +20%) — neutral, no extra line.
  if (dev > 0.2) {
    return (
      <span
        title={`Rata-rata area ini ${formatPrice(fairPrice)}/bulan. Untuk penyewa: ada potensi negosiasi. Untuk landlord: unit di segmen premium.`}
        className="cursor-help whitespace-nowrap text-xs text-secondary"
      >
        📊 Di atas rata-rata
      </span>
    );
  }

  // Below average (< −20%) — show the real RM gap + sample size.
  if (dev < -0.2) {
    const diff = Math.round(fairPrice - p);
    return (
      <span className="block text-xs">
        <span
          title={`Rata-rata area ini ${formatPrice(fairPrice)}/bulan.`}
          className="cursor-help text-secondary"
        >
          📊 Di bawah rata-rata pasar
        </span>
        {count && area && diff > 0 && (
          <span className="mt-0.5 block whitespace-nowrap text-[11px] text-success">
            {formatPrice(diff)} di bawah rata-rata {count} listing di {area}
          </span>
        )}
      </span>
    );
  }

  // Within ±20% — neutral, no extra line.
  return (
    <span
      title={`Rata-rata area ini ${formatPrice(fairPrice)}/bulan.`}
      className="cursor-help whitespace-nowrap text-xs text-secondary"
    >
      📊 Sesuai rata-rata
    </span>
  );
}
