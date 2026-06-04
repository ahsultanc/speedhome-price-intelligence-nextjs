"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AREAS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  onSearch: (query: string) => void;
  loading?: boolean;
  strict: boolean;
  onStrictChange: (v: boolean) => void;
}

export default function SearchBar({
  onSearch,
  loading,
  strict,
  onStrictChange,
}: Props) {
  const [mode, setMode] = useState<"area" | "url">("area");
  const [area, setArea] = useState(AREAS[0]);
  const [url, setUrl] = useState("");

  function submit() {
    const q = mode === "area" ? area : url.trim();
    if (q) onSearch(q);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-3 flex items-center justify-center gap-1 text-sm">
        {(["area", "url"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-full px-3 py-1 font-medium transition-colors",
              mode === m
                ? "bg-primary text-background"
                : "text-secondary hover:text-primary",
            )}
          >
            {m === "area" ? "Area name" : "Direct URL"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-card border border-border bg-card p-2 shadow-subtle sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 pl-2">
          <Search className="h-5 w-5 shrink-0 text-secondary" />
          {mode === "area" ? (
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-transparent py-3 text-primary focus:outline-none"
            >
              {AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="https://speedhome.com/rent/mont-kiara"
              className="w-full bg-transparent py-3 text-primary placeholder:text-secondary focus:outline-none"
            />
          )}
        </div>
        <button
          onClick={submit}
          disabled={loading}
          className="rounded-lg bg-navy px-7 py-3 font-medium text-background transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Mencari…" : "Search"}
        </button>
      </div>

      <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 text-sm text-secondary">
        <input
          type="checkbox"
          checked={strict}
          onChange={(e) => onStrictChange(e.target.checked)}
          className="h-4 w-4 rounded border-border accent-accent"
        />
        Only show listings in this area
      </label>
    </div>
  );
}
