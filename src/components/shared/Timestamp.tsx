import { Clock } from "lucide-react";

export default function Timestamp({
  time,
  count,
}: {
  time?: string | null;
  count?: number;
}) {
  if (!time) return null;
  const hhmm = time.length >= 5 ? time.slice(0, 5) : time;
  return (
    <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-sm text-secondary">
      <Clock className="h-4 w-4 text-accent" />
      Berdasarkan{" "}
      <strong className="text-primary">{(count ?? 0).toLocaleString("en-MY")}</strong>{" "}
      listing aktif — diambil langsung dari SPEEDHOME hari ini pukul{" "}
      <strong className="text-primary">{hhmm} MYT</strong>
    </p>
  );
}
