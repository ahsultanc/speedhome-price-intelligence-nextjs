import { MapPin, TrendingUp, Gift } from "lucide-react";

const signals = [
  { icon: MapPin, label: "4 area · data lengkap" },
  { icon: TrendingUp, label: "Terus bertambah" },
  { icon: Gift, label: "Gratis, tanpa daftar" },
];

export default function TrustSignals() {
  return (
    <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-secondary">
      {signals.map(({ icon: Icon, label }) => (
        <span key={label} className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-accent" />
          {label}
        </span>
      ))}
    </div>
  );
}
