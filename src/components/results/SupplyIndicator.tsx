export default function SupplyIndicator({ count }: { count: number }) {
  let emoji = "🟢";
  let label = "HIGH SUPPLY";
  let note = "Banyak pilihan tersedia.";
  if (count < 50) {
    emoji = "🔴";
    label = "LOW SUPPLY";
    note = "Pilihan terbatas — pertimbangkan area sekitarnya.";
  } else if (count <= 100) {
    emoji = "🟡";
    label = "MEDIUM SUPPLY";
    note = "Pilihan cukup tersedia.";
  }
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-subtle">
      <span>{emoji}</span>
      <span className="font-semibold text-primary">{label}</span>
      <span className="text-secondary">· {note}</span>
    </div>
  );
}
