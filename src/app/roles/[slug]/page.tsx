import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleView } from "@/components/RoleView";
import { SiteFooter } from "@/components/SiteFooter";
import { TOOL_SHOT_FOLDERS } from "@/components/ToolArtifacts";
import { readMedia } from "@/lib/media";
import { openGraphBase } from "@/lib/seo";
import { roles, roleBySlug } from "@/lib/roles";

export const dynamicParams = false;

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const role = roleBySlug((await params).slug);
  if (!role) return {};
  const title = `${role.family} roles`;
  return {
    title,
    description: role.pitch,
    alternates: { canonical: `/roles/${role.slug}` },
    openGraph: { ...openGraphBase, title, description: role.pitch, url: `/roles/${role.slug}` },
  };
}

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const role = roleBySlug((await params).slug);
  if (!role) notFound();
  const toolShots = Object.fromEntries(role.proof.map((tool) => [tool, readMedia(TOOL_SHOT_FOLDERS[tool] ?? "")]));

  return (
    <>
      <RoleView role={role} toolShots={toolShots} />
      <SiteFooter />
    </>
  );
}
