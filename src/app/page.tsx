import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}): Promise<Metadata> {
  const { area } = await searchParams;
  if (!area) return {};

  const areaName = area
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `Harga Sewa ${areaName} 2026 — SPEEDHOME Price Intelligence`,
    description: `Cari tahu harga sewa wajar di ${areaName}. Data real-time dari SPEEDHOME. Gratis, tanpa daftar.`,
    openGraph: {
      title: `Harga Sewa ${areaName} 2026`,
      description: `Fair Price, listing terbaik, dan perbandingan area di ${areaName} Malaysia.`,
    },
  };
}

export default function Page() {
  return <HomeClient />;
}
