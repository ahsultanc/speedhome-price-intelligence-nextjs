import { SOURCE_REPO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="font-display text-lg text-primary">
          SPEEDHOME Price Intelligence
        </p>
        <p className="mt-2 max-w-lg text-sm text-secondary">
          Data dari SPEEDHOME.com · Dibuat karena kami juga pernah bingung dengan
          harga sewa. · Tidak berafiliasi dengan SPEEDHOME.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary">
          <span>Built by Ahmad Sultan Chaeruddin · Juni 2026</span>
          <a
            href={SOURCE_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-accent"
          >
            GitHub source code
          </a>
        </div>
      </div>
    </footer>
  );
}
