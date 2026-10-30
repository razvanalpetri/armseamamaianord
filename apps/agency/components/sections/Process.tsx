import { FileText, Rocket, Search, Wrench } from "lucide-react";
import { contact } from "@/content/contact";
import type { Dictionary } from "@/content/en";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fill } from "@/lib/text";

const icons = [Search, FileText, Wrench, Rocket];

export function Process({ t }: { t: Dictionary["process"] }) {
  return (
    <section id="process" aria-labelledby="process-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="relative mt-16">
          {/* Glowing connector between the steps (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent shadow-[0_0_12px_rgb(168_85_247/0.8)] lg:block"
          />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {t.steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <li key={step.title} className="relative">
                  <Reveal delay={index * 0.1} className="h-full">
                    <div className="flex h-full flex-col items-center text-center">
                      <div className="lg-icon relative grid size-16 place-items-center rounded-[1.4rem]">
                        <Icon className="size-6" aria-hidden="true" />
                        <span className="lg-badge absolute -right-2 -top-2 grid size-7 place-items-center rounded-full font-display text-xs font-bold">
                          <span className="sr-only">{t.stepLabel} </span>
                          {index + 1}
                        </span>
                      </div>
                      <div className="glass mt-6 flex w-full flex-1 flex-col p-6">
                        <h3 className="text-xl font-semibold text-text">{step.title}</h3>
                        <p className="mt-3 leading-relaxed text-muted">{fill(step.body, { minutes: contact.auditMinutes })}</p>
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
