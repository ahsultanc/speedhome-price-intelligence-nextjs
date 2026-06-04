import { calculateCompleteness } from "@/lib/listingCompleteness";
import type { Listing } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ListingCompletenessBadge({
  listing,
  fairPrice,
}: {
  listing: Listing;
  fairPrice: number | null;
}) {
  const c = calculateCompleteness(listing, fairPrice);
  const tone =
    c.tone === "good"
      ? "text-success"
      : c.tone === "medium"
        ? "text-accent"
        : "text-secondary";

  return (
    <span
      title={`Listing Completeness — mengukur kelengkapan informasi dari landlord (bukan jaminan kondisi fisik unit). Skor ${c.score}/100.`}
      className={cn(
        "inline-flex cursor-help items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-semibold",
        tone,
      )}
    >
      {c.emoji} {c.label}
    </span>
  );
}
