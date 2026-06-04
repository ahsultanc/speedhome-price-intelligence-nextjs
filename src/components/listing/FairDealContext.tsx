import type { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

/** DATA, not VERDICT — neutral framing, never red. */
export default function FairDealContext({
  listing,
  fairPrice,
}: {
  listing: Listing;
  fairPrice: number | null;
}) {
  const p = listing.monthly_price;
  if (typeof p !== "number" || !fairPrice) {
    return <span className="text-xs text-secondary">—</span>;
  }
  const dev = (p - fairPrice) / fairPrice;

  let text: string;
  let title: string;
  if (dev > 0.2) {
    text = "Di atas rata-rata";
    title = `Rata-rata area ini ${formatPrice(fairPrice)}/bulan. Untuk penyewa: ada potensi negosiasi. Untuk landlord: unit di segmen premium.`;
  } else if (dev < -0.2) {
    text = "Di bawah rata-rata";
    title = `Rata-rata area ini ${formatPrice(fairPrice)}/bulan.`;
  } else {
    text = "Sesuai rata-rata";
    title = `Rata-rata area ini ${formatPrice(fairPrice)}/bulan.`;
  }

  return (
    <span title={title} className="cursor-help whitespace-nowrap text-xs text-secondary">
      📊 {text}
    </span>
  );
}
