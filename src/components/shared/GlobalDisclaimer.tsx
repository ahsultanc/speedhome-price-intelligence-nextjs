import { Info } from "lucide-react";
import demoResponses from "@/data/demoResponses.json";

const ENTRIES = Object.values(
  demoResponses as unknown as Record<string, { meta?: { radius_count?: number } }>,
);
const TOTAL_LISTINGS = ENTRIES.reduce((s, e) => s + (e.meta?.radius_count ?? 0), 0);
const TOTAL_AREAS = ENTRIES.length;

export default function GlobalDisclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-card border border-border bg-card px-5 py-4 text-sm text-secondary">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
      <div className="space-y-2">
        <p className="text-primary">
          Kami tidak dibayar landlord. Kami tidak dibayar SPEEDHOME. Data ini untuk
          kamu — pencari sewa.
        </p>
        <p>
          <strong className="text-primary">Listing Completeness</strong> mengukur info
          yang dicantumkan landlord, bukan kondisi unit sesungguhnya. Selalu survei
          langsung sebelum tanda tangan.
        </p>
        {TOTAL_LISTINGS > 0 && (
          <p className="text-xs">
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
