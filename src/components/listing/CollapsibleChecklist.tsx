"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/useLocalStorage";

export default function CollapsibleChecklist({
  title,
  items,
  storageKey,
}: {
  title: string;
  items: string[];
  storageKey: string;
}) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [dismissed, setDismissed] = useLocalStorage<boolean>(storageKey, false);

  if (dismissed) return null;

  function dismiss() {
    setDismissed(true);
  }

  return (
    <div className="rounded-card border border-border bg-card shadow-subtle">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-medium text-primary"
      >
        <span className="flex items-center gap-2">
          <ChevronDown className={cn("h-4 w-4 text-secondary transition-transform", open && "rotate-180")} />
          {title}
        </span>
      </button>
      {open && (
        <div className="border-t border-border p-5">
          <ul className="space-y-2">
            {items.map((it, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-2 text-sm text-secondary">
                  <input
                    type="checkbox"
                    checked={!!checked[i]}
                    onChange={(e) => setChecked((c) => ({ ...c, [i]: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-success"
                  />
                  <span className={cn(checked[i] && "text-primary line-through")}>{it}</span>
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={dismiss}
            className="mt-4 inline-flex items-center gap-1 text-xs text-secondary transition-colors hover:text-primary"
          >
            <X className="h-3 w-3" /> Jangan tampilkan lagi
          </button>
        </div>
      )}
    </div>
  );
}
