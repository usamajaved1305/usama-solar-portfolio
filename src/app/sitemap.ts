import type { MetadataRoute } from "next";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";
import { roles } from "@/lib/roles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: CONTENT_UPDATED },
    ...roles.map((r) => ({
      url: `${SITE_URL}/roles/${r.slug}`,
      lastModified: CONTENT_UPDATED,
    })),
  ];
}
