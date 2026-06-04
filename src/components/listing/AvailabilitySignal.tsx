import type { Listing } from "@/lib/types";

/**
 * Decision (b): NO fake "Baru tayang" — the scraper has no per-listing posting
 * date. Only show a verify-availability nudge for listings priced far below the
 * area fair price (< Fair Price − 40%), which are the ones most likely already
 * taken or mis-listed.
 */
export default function AvailabilitySignal({
  listing,
  fairPrice,
}: {
  listing: Listing;
  fairPrice: number | null;
}) {
  const p = listing.monthly_price;
  if (typeof p !== "number" || !fairPrice) return null;
  if (p >= fairPrice * 0.6) return null;

  return (
    <span
      className="whitespace-nowrap text-[11px] text-accent"
      title="Listing dengan harga jauh di bawah rata-rata sering sudah tidak tersedia."
    >
      💡 Harga sangat murah — verifikasi ketersediaan dulu
    </span>
  );
}
