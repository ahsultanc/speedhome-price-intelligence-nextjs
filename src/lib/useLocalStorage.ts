"use client";

import { useEffect, useState } from "react";

/**
 * Client-only localStorage-backed state. Renders `initial` on the server and
 * during first hydration (SSR-safe), then loads the persisted value after mount.
 */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return;
      const parsed = JSON.parse(raw) as T;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only localStorage hydration after mount (SSR-safe)
      setValue(parsed);
    } catch {
      /* ignore malformed/unavailable storage */
    }
  }, [key]);

  function set(v: T) {
    setValue(v);
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {
      /* ignore */
    }
  }

  return [value, set];
}
