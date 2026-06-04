"use client";

import { SearchX } from "lucide-react";

export default function EmptyState({
  area,
  onDisableStrict,
}: {
  area?: string | null;
  onDisableStrict?: () => void;
}) {
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-border/60 text-secondary">
        <SearchX className="h-6 w-6" />
      </div>
      <h3 className="font-display text-2xl text-primary">
        Tidak ada listing ditemukan{area ? ` di ${area}` : ""}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-secondary">
        Coba: (1) matikan filter <em>“Only show listings in this area”</em>, atau
        (2) pilih area lain.
      </p>
      {onDisableStrict && (
        <button
          onClick={onDisableStrict}
          className="mt-6 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
        >
          Tampilkan area sekitar
        </button>
      )}
    </div>
  );
}
