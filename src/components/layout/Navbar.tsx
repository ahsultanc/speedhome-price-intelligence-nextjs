"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Building2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOURCE_REPO } from "@/lib/constants";

const tabs = [
  { href: "/", label: "Single Search" },
  { href: "/compare", label: "Compare Areas" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-background">
            <Building2 className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-semibold tracking-tight text-primary">
              Price Intelligence
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
              Malaysia
            </span>
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
          <a
            href={SOURCE_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
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
