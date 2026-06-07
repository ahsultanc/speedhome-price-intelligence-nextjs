"use client";

import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import type { Listing, SummaryRow } from "@/lib/types";
import { calculateCompleteness } from "@/lib/listingCompleteness";

function fairDealStatus(price: number | null, fair: number | null): string {
  if (typeof price !== "number" || !fair) return "—";
  const dev = (price - fair) / fair;
  if (dev > 0.2) return "Di atas rata-rata";
  if (dev < -0.2) return "Di bawah rata-rata";
  return "Sesuai rata-rata";
}

export default function ExcelExport({
  area,
  summary,
  listings,
  fairByType,
  scrapedAt,
}: {
  area: string;
  summary: SummaryRow[];
  listings: Listing[];
  fairByType?: Record<string, number | null>;
  scrapedAt?: string | null;
}) {
  const fairOf = (unitType: string): number | null =>
    fairByType?.[unitType] ?? null;
  function download() {
    const wb = XLSX.utils.book_new();
    const stamp = `${scrapedAt ?? ""} MYT`.trim();
    const brand = `Dibuat dengan Sewajar by Jendela Group · speedhome-price-intelligence-nextjs.vercel.app · ${stamp}`;

    // Summary sheet — Fair Price overridden with the runtime TS value (Option B)
    // so the export matches what the app shows.
    const summaryRows: Record<string, unknown>[] = summary.length
      ? summary.map(
          (r) =>
            ({
              ...r,
              "Fair Price (RM)": fairOf(String(r["Unit Type"])),
            }) as Record<string, unknown>,
        )
      : [{ Info: "No data" }];
    summaryRows.push({});
    summaryRows.push({ "Unit Type": brand });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summaryRows), "Summary");

    // Listings sheet (with completeness + fair-deal)
    const listingRows: Record<string, unknown>[] = listings.map((l) => {
      const fair = fairOf(l.unit_type);
      const c = calculateCompleteness(l, fair);
      return {
        Title: l.title,
        "Property name": l.property_name,
        Address: l.address,
        "Room type": l.room_type,
        "Monthly price (RM)": l.monthly_price,
        "Annual price (RM)": l.annual_price,
        sqft: l.sqft,
        "Furnishing status": l.furnishing,
        "Listing Completeness": c.label,
        "Completeness Score": c.score,
        "Fair Deal Status": fairDealStatus(l.monthly_price, fair),
        Timestamp: stamp,
        Listing: l.link,
      };
    });
    if (!listingRows.length) listingRows.push({ Info: "No data" });
    listingRows.push({});
    listingRows.push({ Title: brand });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(listingRows), "Listings");

    const date = new Date()
      .toLocaleDateString("en-CA", { timeZone: "Asia/Kuala_Lumpur" })
      .replace(/-/g, "");
    const slug = area.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "") || "Area";
    XLSX.writeFile(wb, `SPEEDHOME_${slug}_${date}.xlsx`);
  }

  return (
    <button
      onClick={download}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
    >
      <Download className="h-4 w-4" /> Download Excel
    </button>
  );
}
