"use client";

import { useEffect, useState } from "react";

function wording(n: number): string {
  if (n <= 0) return "Tandai minat kamu di harga ini";
  if (n <= 5) return `${n} orang tertarik`;
  if (n <= 20) return "Lebih dari 5 orang tertarik";
  return "Lebih dari 20 orang tertarik";
}

const fmt = (n: number) => `RM ${Math.round(n).toLocaleString("en-MY")}`;

export default function DemandSignal({
  listingId,
  areaSlug,
  fairPrice,
}: {
  listingId: string;
  areaSlug: string;
  fairPrice: number;
}) {
  const [state, setState] = useState<"idle" | "loading" | "marked">("idle");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    try {
      if (localStorage.getItem(`demand_${listingId}`) === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only localStorage hydration after mount
        setState("marked");
      }
    } catch {
      /* ignore */
    }
    fetch(
      `/api/demand?listingId=${encodeURIComponent(listingId)}&areaSlug=${encodeURIComponent(areaSlug)}`,
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {
        /* Redis error → stay at idle with no count */
      });
    return () => {
      cancelled = true;
    };
  }, [listingId, areaSlug]);

  async function mark() {
    if (state === "marked") return;
    setState("loading");
    try {
      const r = await fetch("/api/demand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, areaSlug, fairPrice }),
      });
      if (r.ok) {
        const d = await r.json();
        if (typeof d.count === "number") setCount(d.count);
      }
    } catch {
      /* graceful — fall through to localStorage */
    }
    try {
      localStorage.setItem(`demand_${listingId}`, "true");
    } catch {
      /* ignore */
    }
    setState("marked");
  }

  if (state === "marked") {
    return (
      <div className="mt-2 rounded-lg border border-accent bg-background px-3 py-2 text-xs text-primary">
        Minat kamu tercatat. Kamu dan {Math.max(count - 1, 0)} orang lainnya tertarik
        di harga {fmt(fairPrice)}/bulan.
        <span className="mt-0.5 block italic text-secondary">
          Data ini membantu pasar menemukan harga yang fair.
        </span>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-lg border border-border bg-transparent px-3 py-2 text-xs text-primary">
      {state === "loading" ? (
        <span>Mencatat minat kamu...</span>
      ) : (
        <>
          <p>
            {wording(count)} dengan listing ini jika harga mendekati {fmt(fairPrice)}
            /bulan
          </p>
          <button
            onClick={mark}
            className="mt-1.5 rounded-md border border-primary/30 px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary hover:text-background"
          >
            Saya juga tertarik di harga itu
          </button>
        </>
      )}
    </div>
  );
}
