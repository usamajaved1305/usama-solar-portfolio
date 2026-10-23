import type { Metadata } from "next";
import { certifications, education, profile } from "./data";
import { roles, type Role } from "./roles";
import { CONTENT_UPDATED, SITE_URL } from "./site";

export const TITLE = `${profile.name} | ${profile.headline}`;

export const DESCRIPTION =
  "Usama Javed, solar PV project engineer in Dublin. Over 100 installations from 5 to 115 kWp, 790 kWp across 36 projects and crews of up to 40 supervised.";

export const SHORT_DESCRIPTION =
  "Solar PV project engineer in Dublin. Over 100 installations delivered, with planning in Primavera P6 and MS Project, PV design and site supervision.";

export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Usama Javed, Solar PV Project Engineer, Planning and Site Delivery, Dublin, Ireland. 100+ PV installations, 790 kWp delivered across 36 projects, up to 40 crew supervised.",
  type: "image/png",
};

export const TWITTER_IMAGE = {
  url: "/twitter-image.png",
  width: 1200,
  height: 630,
  alt: OG_IMAGE.alt,
  type: "image/png",
};

export const openGraphBase: NonNullable<Metadata["openGraph"]> = {
  type: "profile",
  siteName: profile.name,
  title: TITLE,
  description: SHORT_DESCRIPTION,
  locale: "en_IE",
  images: [OG_IMAGE],
  firstName: "Usama",
  lastName: "Javed",
};

const personEntity = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: profile.name,
  jobTitle: "Solar PV Project Engineer",
  description: `${profile.headline} based in ${profile.city}. ${profile.lede}`,
  url: SITE_URL,
  image: `${SITE_URL}/me/usama-avatar.webp`,
  email: `mailto:${profile.email}`,
  telephone: profile.phone.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dublin",
    addressRegion: "County Dublin",
    addressCountry: "IE",
  },
  knowsLanguage: ["English", "Urdu", "Punjabi"],
  knowsAbout: [
    "Solar photovoltaic system design",
    "Solar PV installation supervision",
    "Project planning and scheduling",
    "Primavera P6",
    "Microsoft Project",
    "AutoCAD electrical and mechanical solar drawings",
    "HelioScope solar simulation",
    "OpenSolar rooftop design",
    "SketchUp 3D solar shading analysis",
    "Battery Energy Storage Systems (BESS)",
    "Power BI project reporting",
    "Advanced Excel BOM and cost tracking",
    "SQL procurement databases",
    "Python energy yield modelling",
    "Commissioning and fault finding",
    "On-grid, hybrid and off-grid solar PV",
    "Single line diagrams",
    "Bill of materials and procurement control",
  ],
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.org,
    url: e.orgUrl,
  })),
  hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: c.org },
      ...(c.verify ? { url: c.verify } : {}),
    })),
  sameAs: [profile.linkedin, profile.github].filter(Boolean),
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: profile.name,
      alternateName: ["usamajaved.ie", "Usama Javed Solar Portfolio"],
      url: `${SITE_URL}/`,
      inLanguage: "en-IE",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      name: TITLE,
      description: DESCRIPTION,
      url: SITE_URL,
      inLanguage: "en-IE",
      dateModified: CONTENT_UPDATED,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#roles`,
      name: "Solar PV Engineering Roles",
      itemListElement: roles.map((r, idx) => ({
        "@type": "SiteNavigationElement",
        position: idx + 1,
        name: r.title,
        description: r.fit,
        url: `${SITE_URL}/roles/${r.slug}`,
      })),
    },
    personEntity,
  ],
};

export function rolePageJsonLd(role: Role) {
  const pageUrl = `${SITE_URL}/roles/${role.slug}`;
  const pageTitle = `${role.seoTitle} | ${profile.name}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: profile.name,
        url: `${SITE_URL}/`,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: pageTitle,
        description: role.metaDescription,
        url: pageUrl,
        inLanguage: "en-IE",
        dateModified: CONTENT_UPDATED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: profile.name,
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: role.title,
            item: pageUrl,
          },
        ],
      },
      personEntity,
    ],
  };
}
