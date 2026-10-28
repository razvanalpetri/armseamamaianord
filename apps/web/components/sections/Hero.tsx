import { ArrowRight, Play } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { DemoButton } from "@/components/sections/DemoButton";
import { PhoneMockup } from "@/components/sections/PhoneMockup";
import { channelIcons } from "@/components/ui/channelIcons";

type Props = { t: Dictionary };

export function Hero({ t }: Props) {
  const channels = t.channels.items.map((item, index) => ({ name: item.name, Icon: channelIcons[index] }));

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28 lg:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-aurora" />
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div className="hero-copy text-center lg:text-left">
          <p className="eyebrow">
            <span className="pulse-dot" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.5rem] font-semibold leading-[1.05] text-text sm:text-6xl lg:text-[4.1rem]"
          >
            {t.hero.titleStart} <span className="glow-text">{t.hero.titleHighlight}</span> {t.hero.titleEnd}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            {t.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <a href="#waitlist" className="btn btn-primary !px-6 !py-3.5 text-base">
              {t.hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <DemoButton className="btn btn-secondary !px-6 !py-3.5 text-base">
              <Play className="size-4 fill-current" aria-hidden="true" />
              {t.hero.secondaryCta}
            </DemoButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 lg:justify-start">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{t.hero.channelsLabel}</span>
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {channels.map(({ name, Icon }) => (
                <li
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-sm text-text"
                >
                  <Icon className="size-3.5 text-accent-soft" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="demo" className="defer-render-phone relative -my-10 scroll-mt-14 py-10">
          <PhoneMockup t={t.demo} />
        </div>
      </div>
    </section>
  );
}
