// Vercel exposes the real production domain at build time. The fallback must match the project name in "Deploy Portfolio.cmd";
// usamajaved.vercel.app belongs to a different person.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://usamajaved-solar.vercel.app";
