// Vercel exposes the real production domain at build time, so canonical/OG/sitemap URLs stay correct even if the preferred name is taken.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://usamajaved.vercel.app";
