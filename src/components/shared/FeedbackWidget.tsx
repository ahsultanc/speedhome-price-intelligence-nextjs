"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface Feedback {
  up: number;
  down: number;
  voted: "up" | "down" | null;
  note?: string;
}
const KEY = "speedhome_feedback";

export default function FeedbackWidget() {
  const [fb, setFb] = useLocalStorage<Feedback>(KEY, { up: 0, down: 0, voted: null });
  const [note, setNote] = useState("");

  function vote(v: "up" | "down") {
    if (fb.voted) return;
    setFb({
      up: fb.up + (v === "up" ? 1 : 0),
      down: fb.down + (v === "down" ? 1 : 0),
      voted: v,
    });
  }
  function saveNote() {
    setFb({ ...fb, note });
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-border bg-card px-5 py-6 text-center">
      <p className="text-sm text-secondary">
        Semoga data ini membantu kamu menemukan rumah yang tepat. 🏠
      </p>
      <p className="text-sm font-medium text-primary">
        Insight ini berguna buat keputusan kamu?
      </p>

      {!fb.voted && (
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

      {fb.voted === "up" && (
        <p className="text-sm text-secondary">
          Senang bisa bantu! Semoga kamu dapat unit yang tepat. 🏠
        </p>
      )}

      {fb.voted === "down" && (
        <div className="w-full max-w-sm">
          <p className="text-sm text-primary">Apa yang bisa kami perbaiki?</p>
          {fb.note ? (
            <p className="mt-2 text-sm text-secondary">Terima kasih atas masukannya!</p>
          ) : (
            <>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="ceritakan kenapa..."
                rows={3}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-background p-2 text-sm text-primary placeholder:text-secondary focus:outline-none"
              />
              <button
                onClick={saveNote}
                disabled={!note.trim()}
                className="mt-2 rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-50"
              >
                Kirim
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
