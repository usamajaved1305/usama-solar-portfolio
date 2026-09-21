import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { SiteFooter } from "@/components/SiteFooter";
import { openGraphBase, personJsonLd } from "@/lib/seo";
import { readMedia } from "@/lib/media";
import { TOOL_SHOT_FOLDERS } from "@/components/ToolArtifacts";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...openGraphBase, url: "/" },
};

export default function Home() {
  const photos = readMedia("photos");
  const certificates = readMedia("certificates");
  const toolShots = Object.fromEntries(
    Object.entries(TOOL_SHOT_FOLDERS).map(([tool, folder]) => [tool, readMedia(folder)])
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Nav hasPhotos={photos.length > 0} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <Gallery photos={photos} />
        <Skills toolShots={toolShots} />
        <Credentials certificates={certificates} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
