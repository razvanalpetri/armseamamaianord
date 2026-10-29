import { Link2, Sparkles, CalendarCheck } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Link2, Sparkles, CalendarCheck];

export function HowItWorks({ t }: { t: Dictionary["howItWorks"] }) {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="how-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="relative mt-16">
          {/* Glowing connector between the steps (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent shadow-[0_0_12px_rgb(168_85_247/0.8)] lg:block"
          />
          <ol className="relative grid gap-6 lg:grid-cols-3 lg:gap-8">
          {t.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <li key={step.title} className="relative">
                <Reveal delay={index * 0.12} className="h-full">
                  <div className="flex h-full flex-col items-center text-center">
                    <div className="lg-icon relative grid size-16 place-items-center rounded-[1.4rem]">
                      <Icon className="size-6" aria-hidden="true" />
                      <span className="lg-badge absolute -right-2 -top-2 grid size-7 place-items-center rounded-full font-display text-xs font-bold">
                        <span className="sr-only">{t.stepLabel} </span>
                        {index + 1}
                      </span>
                    </div>
                    <div className="glass mt-6 flex w-full flex-1 flex-col p-6 sm:p-7">
                      <h3 className="text-xl font-semibold text-text">{step.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                      <ul className="mt-5 flex flex-wrap justify-center gap-2">
                        {step.tags.map((tag) => (
                          <li
                            key={tag}
                            className="glass-pill rounded-full px-3 py-1 text-xs font-medium text-accent-soft"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
