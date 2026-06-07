"use client";

import { SearchX } from "lucide-react";
import { DEMO_AREAS } from "@/lib/constants";

export default function EmptyState({
  area,
  onDisableStrict,
  onPickArea,
}: {
  area?: string | null;
  onDisableStrict?: () => void;
  onPickArea?: (area: string) => void;
}) {
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-border/60 text-secondary">
        <SearchX className="h-6 w-6" />
      </div>
      <h3 className="font-display text-2xl text-primary">
        Belum ada data untuk area ini{area ? ` (${area})` : ""}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-secondary">
        Saat ini kami punya data lengkap untuk {DEMO_AREAS.length} area. Coba salah
        satu di bawah, atau pilih area lain lewat pencarian.
      </p>

      {onPickArea && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {DEMO_AREAS.map((a) => (
            <button
              key={a}
              onClick={() => onPickArea(a)}
              className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-primary transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              {a}
            </button>
          ))}
        </div>
      )}

      {onDisableStrict && (
        <button
          onClick={onDisableStrict}
          className="mt-6 block w-full text-sm font-medium text-secondary transition-colors hover:text-accent"
        >
          atau tampilkan listing di area sekitar
        </button>
      )}
    </div>
  );
}
