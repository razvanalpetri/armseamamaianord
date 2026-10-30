import { ArrowRight, MessageCircle } from "lucide-react";
import { Fragment } from "react";
import { contact } from "@/content/contact";
import type { Dictionary } from "@/content/en";
import { FlowMockup } from "@/components/sections/FlowMockup";
import { fill } from "@/lib/text";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28 lg:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]"
      >
        <div className="hero-aurora" />
        <div className="bg-grid absolute inset-0" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <p className="eyebrow">
            <span className="pulse-dot" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>

          <h1 id="hero-title" className="mt-6 text-[2.5rem] font-semibold leading-[1.05] text-text sm:text-6xl lg:text-[4.1rem]">
            {t.hero.title.map((part, index) => (
              <Fragment key={index}>{part.glow ? <span className="glow-text">{part.text}</span> : part.text}</Fragment>
            ))}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">{t.hero.subtitle}</p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <a
              href={contact.instagramDm}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !px-6 !py-3.5 text-base"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {fill(t.hero.primaryCta, { minutes: contact.auditMinutes })}
              <span className="sr-only"> {t.common.opensInNewTab}</span>
            </a>
            <a href="#services" className="btn btn-secondary !px-6 !py-3.5 text-base">
              {t.hero.secondaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">{t.hero.ctaNote}</p>
        </div>

        <div className="defer-render-flow relative">
          <div
            aria-hidden="true"
            className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.32),transparent)]"
          />
          <FlowMockup t={t.flow} />
        </div>
      </div>
    </section>
  );
}
