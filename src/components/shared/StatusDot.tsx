import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "good" | "medium" | "low";

// Palette only (off-white/navy/gold/muted) — no raw green/red.
const COLOR: Record<Tone, string> = {
  good: "fill-navy text-navy",
  medium: "fill-accent text-accent",
  low: "fill-[#9B9589] text-[#9B9589]",
};

/** Replaces the 🟢/🟡/🔴 status emoji with a unified Lucide dot. */
export default function StatusDot({
  tone,
  className,
}: {
  tone: Tone;
  className?: string;
}) {
  return <Circle className={cn("h-3 w-3 shrink-0", COLOR[tone], className)} aria-hidden />;
}
