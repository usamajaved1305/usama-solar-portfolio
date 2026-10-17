import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Experience } from "@/components/Experience";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { HeroBold } from "@/components/HeroBold";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { SkillsBold } from "@/components/SkillsBold";
import { DemoBadge } from "@/components/DemoBadge";
import { Roles } from "@/components/Roles";
import { SiteFooter } from "@/components/SiteFooter";
import { openGraphBase, personJsonLd } from "@/lib/seo";
import { readMedia } from "@/lib/media";
import { TOOL_SHOT_FOLDERS } from "@/components/ToolArtifacts";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...openGraphBase, url: "/" },
};

export default function Home() {
  const certificates = readMedia("certificates");
  const toolShots = Object.fromEntries(
    Object.entries(TOOL_SHOT_FOLDERS).map(([tool, folder]) => [tool, readMedia(folder)])
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroBold />
        <Roles toolShots={toolShots} />
        <FeaturedProjects toolShots={toolShots} />
        <Experience />
        <SkillsBold toolShots={toolShots} />
        <Credentials certificates={certificates} />
        <Contact />
      </main>
      <SiteFooter />
      <DemoBadge />
    </>
  );
}
