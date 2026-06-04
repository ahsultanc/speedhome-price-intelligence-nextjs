"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { RentalType } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function RentalTypeTabs({
  value,
  onChange,
  hasYearly,
}: {
  value: RentalType;
  onChange: (v: RentalType) => void;
  hasYearly: boolean;
}) {
  const items: { v: RentalType; label: string }[] = [
    { v: "monthly", label: "Monthly" },
    ...(hasYearly ? [{ v: "yearly" as RentalType, label: "Yearly" }] : []),
  ];

  return (
    <Tabs.Root value={value} onValueChange={(v) => onChange(v as RentalType)}>
      <Tabs.List className="inline-flex gap-1 rounded-full border border-border bg-card p-1">
        {items.map((it) => (
          <Tabs.Trigger
            key={it.v}
            value={it.v}
            className={cn(
              "rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
              value === it.v
                ? "bg-primary text-background"
                : "text-secondary hover:text-primary",
            )}
          >
            {it.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
