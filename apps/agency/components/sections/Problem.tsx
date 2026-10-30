import { Hourglass, Repeat, Unplug } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Repeat, Hourglass, Unplug];

export function Problem({ t }: { t: Dictionary["problem"] }) {
  return (
    <section aria-labelledby="problem-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="problem-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {t.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <li key={item.title}>
                <Reveal delay={index * 0.08} className="h-full">
                  <article className="glass glass-hover h-full p-6 sm:p-7">
                    <span className="icon-tile">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold text-text">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
