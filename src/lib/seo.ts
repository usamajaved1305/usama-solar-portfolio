import type { Metadata } from "next";
import { certifications, education, profile } from "./data";
import type { Role } from "./roles";
import { SITE_URL } from "./site";

export const TITLE = `${profile.name} | ${profile.headline}`;

export const DESCRIPTION =
  "Usama Javed: Solar PV Project Engineer in Dublin, Ireland. Over 100 PV installations (5 to 115 kWp) and 790 kWp in one year. Primavera P6, MS Project, AutoCAD, HelioScope, Power BI.";

export const SHORT_DESCRIPTION =
  "Solar PV Project Engineer in Dublin, Ireland. Over 100 solar PV installations delivered. Planning (Primavera P6, MS Project), PV design (AutoCAD, HelioScope) and site supervision.";

export const KEYWORDS = [
  "Usama Javed",
  "Solar PV Project Engineer",
  "Project Planning Engineer",
  "Project Planner",
  "Project Scheduler",
  "Solar Site Supervisor",
  "Solar Technical Engineer",
  "PV Design Engineer",
  "Energy Analyst",
  "Solar PV Dublin",
  "Solar Engineer Ireland",
  "Primavera P6",
  "MS Project",
  "AutoCAD Solar",
  "HelioScope",
  "OpenSolar",
  "SketchUp Solar",
  "Power BI",
  "SQL",
  "Python",
  "Battery Energy Storage System",
  "BESS",
  "Mechatronics Engineer",
  "Dublin Business School",
];

export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Usama Javed, Solar PV Project Engineer, Planning and Site Delivery, Dublin, Ireland. 100+ PV installations, 790 kWp delivered in one year, up to 40 crew supervised.",
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
    name: e.school,
    url: e.href,
  })),
  hasCredential: certifications
    .filter((c) => c.name !== "ASME Student Member")
    .map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.issuer },
      ...(c.verify ? { url: c.verify } : {}),
    })),
  ...(profile.linkedin ? { sameAs: [profile.linkedin] } : {}),
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: TITLE,
      url: SITE_URL,
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
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    personEntity,
  ],
};

export function rolePageJsonLd(role: Role) {
  const pageUrl = `${SITE_URL}/roles/${role.slug}`;
  const pageTitle = `${role.title} (${role.family}) | ${profile.name}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profilepage`,
        name: pageTitle,
        description: `${role.pitch} ${role.record}`,
        url: pageUrl,
        inLanguage: "en-IE",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
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
