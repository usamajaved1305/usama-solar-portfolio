import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleView } from "@/components/RoleView";
import { SiteFooter } from "@/components/SiteFooter";
import { TOOL_SHOT_FOLDERS } from "@/components/ToolArtifacts";
import { profile } from "@/lib/data";
import { readMedia } from "@/lib/media";
import { OG_IMAGE, TWITTER_IMAGE, openGraphBase, rolePageJsonLd } from "@/lib/seo";
import { roles, roleBySlug } from "@/lib/roles";

export const dynamicParams = false;

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const role = roleBySlug((await params).slug);
  if (!role) return {};
  const title = `${role.title} (${role.family})`;
  const fullTitle = `${title} | ${profile.name}`;
  const toolsText = role.tools.map((t) => (t === "Helioscope" ? "HelioScope" : t)).join(", ");
  const description = `${role.pitch} Tools: ${toolsText}. Dublin, Ireland.`;
  const roleOgImage = {
    url: `/og/${role.slug}.jpg`,
    width: 1200,
    height: 630,
    alt: `${role.title} - ${profile.name}`,
    type: "image/jpeg",
  };
  return {
    title,
    description,
    alternates: { canonical: `/roles/${role.slug}` },
    openGraph: {
      ...openGraphBase,
      title: fullTitle,
      description,
      url: `/roles/${role.slug}`,
      images: [roleOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [roleOgImage.url],
    },
  };
}

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const role = roleBySlug((await params).slug);
  if (!role) notFound();
  const toolShots = Object.fromEntries(role.proof.map((tool) => [tool, readMedia(TOOL_SHOT_FOLDERS[tool] ?? "")]));
  const jsonLd = rolePageJsonLd(role);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RoleView role={role} toolShots={toolShots} />
      <SiteFooter />
    </>
  );
}
