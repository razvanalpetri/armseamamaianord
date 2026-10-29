import {
  BarChart3,
  GitBranch,
  Hand,
  Inbox,
  Languages,
  MessagesSquare,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Dictionary } from "@/content/en";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = { t: Dictionary["features"] };

const icons: Record<string, LucideIcon> = {
  humanReplies: MessagesSquare,
  qualification: GitBranch,
  takeover: Hand,
  multiLanguage: Languages,
  inbox: Inbox,
  analytics: BarChart3,
  security: ShieldCheck,
};

// Bento layout: 3 columns on desktop, 2 on tablet.
const spans: Record<string, string> = {
  humanReplies: "md:col-span-2",
  analytics: "md:col-span-2",
  security: "md:col-span-2 lg:col-span-1",
};

// Wide cards whose visual sits beside the text on desktop.
const sideVisual = new Set(["humanReplies"]);

/** Two chat bubbles and a typing indicator (decorative). */
function TypingVisual() {
  return (
    <div aria-hidden="true" className="lg-inset mt-6 space-y-2 rounded-[1.4rem] p-4">
      <div className="ml-auto h-8 w-1/2 rounded-2xl rounded-br-md bg-gradient-to-br from-primary-strong/85 to-[#6d28d9]/85 shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]" />
      <div className="h-8 w-3/5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]" />
      <div className="h-8 w-2/5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]" />
      <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-3.5 py-3 text-accent-soft shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

/** Pipeline stages, last one highlighted. */
function StagesVisual({ stages }: { stages: string[] }) {
  return (
    <ol className="mt-6 space-y-2">
      {stages.map((stage, index) => {
        const last = index === stages.length - 1;
        return (
          <li
            key={stage}
            className={`flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm ${
              last ? "glass-chip glass-chip-on text-text" : "glass-chip text-muted"
            }`}
          >
            <span className={`size-2 rounded-full ${last ? "bg-accent-soft" : "bg-white/25"}`} aria-hidden="true" />
            {stage}
          </li>
        );
      })}
    </ol>
  );
}

/** Abstract bar chart (decorative, no data). */
function BarsVisual() {
  const bars = [38, 52, 46, 64, 58, 76, 70, 88];
  return (
    <div aria-hidden="true" className="mt-6 flex h-24 items-end gap-2">
      {bars.map((height, index) => (
        <div
          key={index}
          style={{ height: `${height}%` }}
          className="flex-1 rounded-t-lg border border-b-0 border-white/15 bg-gradient-to-t from-primary/15 to-accent-soft/60 shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]"
        />
      ))}
    </div>
  );
}

export function Features({ t }: Props) {
  const visuals: Record<string, ReactNode> = {
    humanReplies: <TypingVisual />,
    qualification: <StagesVisual stages={t.stages} />,
    analytics: <BarsVisual />,
  };

  return (
    <section id="features" aria-labelledby="features-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="features-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, index) => {
            const Icon = icons[item.key] ?? MessagesSquare;
            return (
              <li key={item.key} className={spans[item.key] ?? ""}>
                <Reveal delay={(index % 3) * 0.08} className="h-full">
                  <article
                    className={`glass glass-hover flex h-full flex-col p-6 sm:p-7 ${
                      sideVisual.has(item.key) ? "lg:grid lg:grid-cols-2 lg:items-center lg:gap-10" : ""
                    }`}
                  >
                    <div>
                      <span className="icon-tile">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-xl font-semibold text-text">{item.title}</h3>
                      <p className="mt-3 max-w-prose leading-relaxed text-muted">{item.body}</p>
                    </div>
                    {visuals[item.key] ? <div className="mt-auto lg:mt-0">{visuals[item.key]}</div> : null}
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
