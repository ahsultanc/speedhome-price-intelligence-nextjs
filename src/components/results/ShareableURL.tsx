"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import type { RentalType } from "@/lib/types";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface Saved {
  area: string;
  type: RentalType;
}
const KEY = "speedhome_saved_searches";

export default function ShareableURL({
  area,
  rental,
  onSelect,
}: {
  area: string;
  rental: RentalType;
  onSelect?: (area: string, rental: RentalType) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useLocalStorage<Saved[]>(KEY, []);

  function save() {
    const url = `${window.location.origin}/?area=${encodeURIComponent(area)}&type=${rental}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    const next = [
      { area, type: rental },
      ...saved.filter((s) => !(s.area === area && s.type === rental)),
    ].slice(0, 5);
    setSaved(next);
  }

  return (
    <div className="rounded-card border border-border bg-card p-4 shadow-subtle">
      <button
        onClick={save}
        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? <Check className="h-4 w-4 text-success" /> : <Link2 className="h-4 w-4" />}
        {copied
          ? "Link disalin! Bagikan ke siapapun yang butuh data ini."
          : "Simpan atau bagikan hasil pencarian ini"}
      </button>

      {saved.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-secondary">Pencarian tersimpan (di browser ini):</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {saved.map((s) => (
              <button
                key={`${s.area}-${s.type}`}
                onClick={() => onSelect?.(s.area, s.type)}
                className="rounded-full border border-border px-3 py-1 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
              >
                {s.area} · {s.type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
