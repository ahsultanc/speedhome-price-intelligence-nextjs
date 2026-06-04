"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Collapsible({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-card border border-border bg-card shadow-subtle">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-medium text-primary"
      >
        <span>{label}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-secondary transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <div className="border-t border-border p-5">{children}</div>}
    </div>
  );
}
