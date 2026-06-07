"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="font-display text-2xl text-primary">Ada kendala</h3>
      <p className="mx-auto mt-2 max-w-sm text-secondary">
        {message ||
          "Tidak bisa mengambil data saat ini. Coba lagi sebentar, biasanya cuma sementara."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
        >
          <RefreshCw className="h-4 w-4" /> Coba lagi
        </button>
      )}
    </div>
  );
}
