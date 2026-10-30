import { Check, Clock, MessageCircle, PhoneCall, Target } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Same order as `services.core` in the content files.
const icons = [Target, Clock, PhoneCall, MessageCircle];

export function Services({ t }: { t: Dictionary["services"] }) {
  return (
    <section id="services" aria-labelledby="services-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="services-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {t.core.map((service, index) => {
            const Icon = icons[index];
            return (
              <li key={service.title}>
                <Reveal delay={(index % 2) * 0.08} className="h-full">
                  <article className="glass glass-hover flex h-full flex-col p-6 sm:p-8">
                    <span className="lg-icon grid size-14 place-items-center rounded-[1.25rem]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-2xl font-semibold text-text">{service.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{service.body}</p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                      {service.tags.map((tag) => (
                        <li key={tag} className="glass-pill rounded-full px-3 py-1 text-xs font-medium text-accent-soft">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-5">
          <div className="glass p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-text">{t.extraTitle}</h3>
            <ul className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {t.extra.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text sm:text-base">
                  <Check className="mt-1 size-4 shrink-0 text-accent-soft" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
