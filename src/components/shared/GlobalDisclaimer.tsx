import { Info } from "lucide-react";
import demoResponses from "@/data/demoResponses.json";

// Real aggregate from the bundled dataset (not hardcoded): total listings
// scanned across all available areas.
const ENTRIES = Object.values(
  demoResponses as unknown as Record<string, { meta?: { radius_count?: number } }>,
);
const TOTAL_LISTINGS = ENTRIES.reduce((s, e) => s + (e.meta?.radius_count ?? 0), 0);
const TOTAL_AREAS = ENTRIES.length;

export default function GlobalDisclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-card border border-border bg-card px-5 py-4 text-sm text-secondary">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
      <div>
        <p>
          Data diambil langsung dari SPEEDHOME.com.{" "}
          <strong className="text-primary">Listing Completeness</strong> mengukur
          kelengkapan info listing — bukan kondisi fisik unit. Status ketersediaan
          perlu dikonfirmasi langsung ke landlord sebelum survei.
        </p>
        {TOTAL_LISTINGS > 0 && (
          <p className="mt-2 text-xs text-secondary">
            Berdasarkan{" "}
            <strong className="text-primary">
              {TOTAL_LISTINGS.toLocaleString("en-MY")}
            </strong>{" "}
            listing aktif dari {TOTAL_AREAS} area Malaysia hari ini
          </p>
        )}
      </div>
    </div>
  );
}
