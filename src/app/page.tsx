import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { WorkShowcase } from "@/components/WorkShowcase";
import { SiteGallery } from "@/components/SiteGallery";
import { DemoBadge } from "@/components/DemoBadge";
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
      <Nav hasPhotos />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Stats />
        <WorkShowcase toolShots={toolShots} />
        <Experience />
        <SiteGallery />
        <Projects />
        <Skills toolShots={toolShots} />
        <Credentials certificates={certificates} />
        <Contact />
      </main>
      <SiteFooter />
      <DemoBadge />
    </>
  );
}
