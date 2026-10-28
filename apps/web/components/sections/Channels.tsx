import { ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { channelIcons } from "@/components/ui/channelIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Channels({ t }: { t: Dictionary["channels"] }) {
  return (
    <section id="channels" aria-labelledby="channels-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="channels-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {t.items.map((item, index) => {
            const Icon = channelIcons[index];
            return (
              <li key={item.name}>
                <Reveal delay={index * 0.08} className="h-full">
                  <article className="glass glass-hover group relative h-full overflow-hidden p-6 sm:p-7">
                    <div
                      aria-hidden="true"
                      className="absolute -right-20 -top-20 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.22),transparent)] transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
                    />
                    <div className="relative">
                      <span className="grid size-14 place-items-center rounded-2xl border border-line bg-surface text-accent-soft shadow-[0_0_28px_-8px_rgb(168_85_247/0.9)]">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-2xl font-semibold text-text">{item.name}</h3>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft">
                        <ShieldCheck className="size-3.5" aria-hidden="true" />
                        {t.officialApi}: {item.api}
                      </p>
                      <p className="mt-4 leading-relaxed text-muted">{item.body}</p>
                    </div>
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
