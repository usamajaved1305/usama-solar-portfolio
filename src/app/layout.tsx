import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { Providers } from "@/components/Providers";

const manrope = Manrope({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });

const TITLE = `${profile.name} | ${profile.headline}`;
const DESCRIPTION =
  "Usama Javed, solar PV engineer in Dublin, Ireland. Over 100 residential and commercial solar PV installations delivered, from 5 kWp domestic systems to a 150 kWp factory rooftop, and 790 kWp across 36 projects in a single year.";
const SHORT_DESCRIPTION =
  "Over 100 residential and commercial solar PV installations delivered. Site supervision, project engineering and planning. Dublin, Ireland.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${profile.name}`,
  },
  description: DESCRIPTION,
  authors: [{ name: profile.name }],
  creator: profile.name,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: TITLE,
    description: SHORT_DESCRIPTION,
    locale: "en_IE",
  },
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

const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

// Framer Motion server-renders hidden elements with opacity:0; without JS they would never appear.
const NOSCRIPT_REVEAL = `[style*="opacity:0"]{opacity:1!important;transform:none!important}`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  telephone: profile.phone.replace(/\s/g, ""),
  address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
  knowsAbout: [
    "Solar photovoltaic system design",
    "Solar PV installation supervision",
    "Project planning",
    "Primavera P6",
    "MS Project",
    "Power BI",
    "Commissioning",
    "On-grid PV",
    "Hybrid PV",
    "Off-grid PV",
    "Single line diagrams",
    "Shading analysis",
    "Bill of materials",
  ],
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "Air University, Islamabad" }],
  ...(profile.linkedin ? { sameAs: [profile.linkedin] } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_REVEAL }} />
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
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
