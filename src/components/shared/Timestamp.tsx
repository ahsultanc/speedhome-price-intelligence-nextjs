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
  const n = count ?? 0;

  let scarcity = "";
  if (n > 0) {
    if (n < 50) scarcity = "Pilihan terbatas hari ini.";
    else if (n <= 100) scarcity = "Pilihan cukup tersedia.";
    else scarcity = "Banyak pilihan tersedia.";
  }

  return (
    <div className="text-center">
      <p className="flex items-center justify-center gap-1.5 text-sm text-secondary">
        <Clock className="h-4 w-4 text-accent" />
        <strong className="text-primary">{n.toLocaleString("en-MY")}</strong> listing
        aktif · {hhmm} MYT hari ini
      </p>
      {scarcity && <p className="mt-0.5 text-xs text-secondary">{scarcity}</p>}
    </div>
  );
}
