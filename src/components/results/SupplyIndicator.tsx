import StatusDot from "@/components/shared/StatusDot";

export default function SupplyIndicator({ count }: { count: number }) {
  let tone: "good" | "medium" | "low" = "good";
  let label = "Banyak pilihan tersedia — kamu punya bargaining power.";
  if (count < 50) {
    tone = "low";
    label = "Pilihan terbatas — pertimbangkan area sekitarnya.";
  } else if (count <= 100) {
    tone = "medium";
    label = "Pilihan cukup tersedia.";
  }
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-subtle">
      <StatusDot tone={tone} />
      <span className="text-primary">{label}</span>
    </div>
  );
}
