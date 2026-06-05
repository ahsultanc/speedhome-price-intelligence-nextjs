import type { MetadataRoute } from "next";
import { AREA_INTEL } from "@/lib/areaIntel";
import { slugifyArea } from "@/lib/utils";

const baseUrl = "https://speedhome-price-intelligence-nextjs.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Only the areas that actually have researched intel in the app.
  const areaPages = Object.keys(AREA_INTEL).map((name) => ({
    url: `${baseUrl}/?area=${slugifyArea(name)}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...areaPages,
  ];
}
