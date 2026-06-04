"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface Feedback {
  up: number;
  down: number;
  voted: "up" | "down" | null;
}
const KEY = "speedhome_feedback";

export default function FeedbackWidget() {
  const [fb, setFb] = useLocalStorage<Feedback>(KEY, { up: 0, down: 0, voted: null });

  function vote(v: "up" | "down") {
    if (fb.voted) return;
    setFb({
      up: fb.up + (v === "up" ? 1 : 0),
      down: fb.down + (v === "down" ? 1 : 0),
      voted: v,
    });
  }

  const total = fb.up + fb.down;
  const pct = total > 0 ? Math.round((fb.up / total) * 100) : null;

  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-border bg-card px-5 py-6 text-center">
      <p className="text-sm font-medium text-primary">Apakah data ini membantu?</p>
      {fb.voted ? (
        <p className="text-sm text-secondary">
          Terima kasih atas masukannya!
          {pct != null && ` · Berguna bagi ${pct}% pengguna.`}
        </p>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => vote("up")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-success hover:text-success"
          >
            <ThumbsUp className="h-4 w-4" /> Ya
          </button>
          <button
            onClick={() => vote("down")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-secondary"
          >
            <ThumbsDown className="h-4 w-4" /> Tidak
          </button>
        </div>
      )}
    </div>
  );
}
