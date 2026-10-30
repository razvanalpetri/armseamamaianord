import { Check, TrendingDown, TrendingUp } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Outcomes({ t }: { t: Dictionary["outcomes"] }) {
  const columns = [
    { ...t.costs, Icon: TrendingDown, lead: false },
    { ...t.sales, Icon: TrendingUp, lead: true },
  ];

  return (
    <section id="outcomes" aria-labelledby="outcomes-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="outcomes-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {columns.map(({ title, items, Icon, lead }, index) => (
            <Reveal key={title} delay={index * 0.1} className="h-full">
              <article className={`glass h-full p-7 sm:p-9 ${lead ? "glass-tint" : ""}`}>
                <div className="flex items-center gap-4">
                  <span className="lg-icon grid size-14 place-items-center rounded-[1.25rem]">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-semibold text-text sm:text-3xl">{title}</h3>
                </div>
                <ul className="mt-7 space-y-4 border-t border-white/10 pt-7">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-text">
                      <Check className="mt-1 size-4 shrink-0 text-accent-soft" aria-hidden="true" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
