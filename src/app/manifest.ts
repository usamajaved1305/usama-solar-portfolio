import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Usama Javed, Solar PV Project Engineer",
    short_name: "Usama Javed",
    start_url: "/",
    display: "browser",
    background_color: "#0a0f12",
    theme_color: "#0a0f12",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
