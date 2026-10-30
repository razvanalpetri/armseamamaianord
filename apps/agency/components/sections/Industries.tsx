import type { Dictionary } from "@/content/en";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Industries({ t }: { t: Dictionary["industries"] }) {
  return (
    <section id="industries" aria-labelledby="industries-title" className="defer-render relative py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="industries-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <Reveal>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {t.items.map((item) => (
              <li key={item} className="glass-pill rounded-full px-4 py-2 text-sm font-medium text-text sm:text-base">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
