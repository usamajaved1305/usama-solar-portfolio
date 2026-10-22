import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { DESCRIPTION, SHORT_DESCRIPTION, TITLE, openGraphBase } from "@/lib/seo";
import { Providers } from "@/components/Providers";

const manrope = Manrope({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });

// Canonical, og:url and the Person JSON-LD live on the home page only, so the 404 page doesn't claim to be the home page.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${profile.name}`,
  },
  description: DESCRIPTION,
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: openGraphBase,
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHORT_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f12" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
  ],
};

// Runs before first paint. Falls back to the OS preference when storage is blocked.
// First-time visitors get the light theme; the toggle choice is remembered after that.
const THEME_INIT = `document.documentElement.setAttribute('data-theme','dark');`

// Framer Motion server-renders hidden elements with opacity:0; without JS they would never appear.
const NOSCRIPT_REVEAL = `[style*="opacity:0"]{opacity:1!important;transform:none!important}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_REVEAL }} />
        </noscript>
      </head>
      <body className={`${manrope.variable} ${inter.variable}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
