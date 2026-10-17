import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { roles } from "@/lib/roles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...roles.map((r) => ({
      url: `${SITE_URL}/roles/${r.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
