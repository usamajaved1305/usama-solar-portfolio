import type { Metadata } from "next";
import { profile } from "./data";
import { SITE_URL } from "./site";

export const TITLE = `${profile.name} | ${profile.headline}`;

export const DESCRIPTION =
  "Solar PV engineer in Dublin. Over 100 residential and commercial PV installations from 5 to 150 kWp, and 790 kWp across 36 projects in one year.";

export const SHORT_DESCRIPTION =
  "Over 100 residential and commercial solar PV installations delivered. Site supervision, project engineering and planning. Dublin, Ireland.";

export const openGraphBase: NonNullable<Metadata["openGraph"]> = {
  type: "profile",
  siteName: profile.name,
  title: TITLE,
  description: SHORT_DESCRIPTION,
  locale: "en_IE",
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  description: `${profile.headline}, ${profile.city}`,
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
