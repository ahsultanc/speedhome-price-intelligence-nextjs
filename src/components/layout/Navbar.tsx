"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Cari Area" },
  { href: "/compare", label: "Bandingkan Area" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="leading-none"
          onClick={() => setOpen(false)}
        >
          <span className="block font-display text-2xl font-semibold tracking-tight text-navy">
            Sewajar
          </span>
          <span className="mt-0.5 block text-[11px] font-medium text-[#9B9589]">
            by Jendela Group
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === t.href
                  ? "bg-primary text-background"
                  : "text-secondary hover:text-primary",
              )}
            >
              {t.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-6 py-3 text-sm font-medium",
                pathname === t.href ? "bg-primary/5 text-primary" : "text-secondary",
              )}
            >
              {t.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
