import { MapPin } from "lucide-react";
import { getAreaIntel } from "@/lib/areaIntel";

export default function AreaIntelCard({ area }: { area?: string | null }) {
  const intel = getAreaIntel(area);
  if (!intel) return null;

  return (
    <div className="rounded-card border border-border bg-card p-6 shadow-subtle">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
        <MapPin className="h-4 w-4" /> {intel.karakter}
      </div>
      <h3 className="mt-2 font-display text-2xl font-semibold text-primary">{area}</h3>
      <p className="mt-2 leading-relaxed text-secondary">{intel.lifestyleDesc}</p>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-secondary">Paling cocok buat:</p>
          <p className="text-primary">{intel.cocok}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-secondary">Yang perlu kamu tahu:</p>
          <p className="text-primary">{intel.highlight}</p>
        </div>
      </div>

      {intel.confidence !== "HIGH" && (
        <p className="mt-4 rounded-lg bg-[#FEF3C7] px-3 py-2 text-xs text-primary">
          📍 Info berdasarkan data umum — lakukan riset mandiri. Data per:{" "}
          {intel.lastUpdated}
        </p>
      )}
    </div>
  );
}
