import type { Dictionary } from "@/content/en";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} align="left" />
        </div>
        <Reveal>
          <FaqAccordion items={t.items} />
        </Reveal>
      </div>
    </section>
  );
}
