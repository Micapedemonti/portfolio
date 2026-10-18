import { Hero } from '@/components/sections/hero/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Projects } from '@/components/sections/projects/Projects';
import { About } from '@/components/sections/about/About';
import { Contact } from '@/components/sections/contact/Contact';

export function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
