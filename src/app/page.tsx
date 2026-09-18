import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";
import { Contact, SiteFooter } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
