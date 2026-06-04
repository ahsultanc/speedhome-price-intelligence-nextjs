import { Info } from "lucide-react";

export default function GlobalDisclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-card border border-border bg-card px-5 py-4 text-sm text-secondary">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
      <p>
        Data diambil langsung dari SPEEDHOME.com.{" "}
        <strong className="text-primary">Listing Completeness</strong> mengukur
        kelengkapan info listing — bukan kondisi fisik unit. Status ketersediaan
        perlu dikonfirmasi langsung ke landlord sebelum survei.
      </p>
    </div>
  );
}
