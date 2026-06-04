export default function LoadingSpinner({
  label = "Mengambil data dari pasar…",
}: {
  label?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center justify-center gap-3 text-secondary">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-accent" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-card border border-border bg-card"
          />
        ))}
      </div>
      <div className="mt-4 h-72 animate-pulse rounded-card border border-border bg-card" />
    </div>
  );
}
