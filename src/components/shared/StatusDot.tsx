import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "good" | "medium" | "low";

const COLOR: Record<Tone, string> = {
  good: "fill-green-500 text-green-500",
  medium: "fill-yellow-500 text-yellow-500",
  low: "fill-red-500 text-red-500",
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
