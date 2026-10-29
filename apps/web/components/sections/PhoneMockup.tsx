"use client";

import { CalendarDays, Check, ChevronLeft, Send, Video } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/en";
import { LogoRing } from "@/components/ui/Logo";
import { REPLAY_DEMO_EVENT } from "@/lib/events";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type Props = { t: Dictionary["demo"] };

/** Human-like typing time: longer messages take longer, within limits. */
const typingTime = (text: string) => Math.min(2600, 900 + text.length * 16);
const readingTime = (text: string) => Math.min(2200, 1000 + text.length * 12);

// The chat animates with CSS keyframes (.chat-in) and one Web Animations API
// slide, not Framer Motion: measuring "height: auto" during hydration forced
// a full-page layout and cost ~300ms of blocking time on mobile.
export function PhoneMockup({ t }: Props) {
  const reduced = usePrefersReducedMotion();
  const total = t.messages.length;

  const [count, setCount] = useState(1);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const heightBefore = useRef<number | null>(null);

  // Only run the conversation while the phone is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // "See demo" restarts the conversation from the top.
  useEffect(() => {
    const replay = () => {
      heightBefore.current = null;
      setCycle((value) => value + 1);
      setCount(0);
      setTyping(false);
      setDone(false);
      setFading(false);
    };
    window.addEventListener(REPLAY_DEMO_EVENT, replay);
    return () => window.removeEventListener(REPLAY_DEMO_EVENT, replay);
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;

    // Remember the list height before a bubble is added, so the layout effect
    // below can slide the older bubbles up smoothly.
    const grow = (update: () => void) => () => {
      heightBefore.current = listRef.current?.offsetHeight ?? null;
      update();
    };

    let delay: number;
    let advance: () => void;

    if (fading) {
      delay = 450;
      advance = () => {
        setCycle((value) => value + 1);
        setCount(0);
        setDone(false);
        setFading(false);
      };
    } else if (count < total) {
      const next = t.messages[count];
      if (next.from === "ai" && !typing) {
        delay = 650;
        advance = grow(() => setTyping(true));
      } else if (next.from === "ai") {
        delay = typingTime(next.text);
        advance = grow(() => {
          setTyping(false);
          setCount((value) => value + 1);
        });
      } else {
        delay = count === 0 ? 700 : readingTime(next.text);
        advance = grow(() => setCount((value) => value + 1));
      }
    } else if (!done) {
      delay = 900;
      advance = () => setDone(true);
    } else {
      delay = 7000;
      advance = () => setFading(true);
    }

    const timer = window.setTimeout(advance, delay);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, count, typing, done, fading, total, t.messages]);

  // Slide the conversation up by however much it grew (transform only).
  useLayoutEffect(() => {
    const list = listRef.current;
    const before = heightBefore.current;
    heightBefore.current = null;
    if (!list || before === null) return;
    const delta = list.offsetHeight - before;
    if (delta <= 0) return;
    list.animate([{ transform: `translateY(${delta}px)` }, { transform: "translateY(0)" }], {
      duration: 380,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  }, [count, typing]);

  // With reduced motion, show the finished conversation without animating.
  const shownCount = reduced ? total : count;
  const showTyping = !reduced && typing;
  const showPipeline = reduced || done;

  return (
    <div ref={rootRef} role="img" aria-label={t.label} className="relative mx-auto w-[290px] sm:w-[316px]">
      {/* Glow behind the phone */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -inset-y-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.35),transparent)]"
      />

      {/* Phone frame */}
      <div className="lg-bezel rounded-[2.75rem] p-2.5">
        <div className="relative flex h-[560px] flex-col overflow-hidden rounded-[2.2rem] bg-[#09090e] bg-[radial-gradient(120%_70%_at_50%_0%,#1d1338,#09090e_62%)] sm:h-[610px]">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* Chat header: glass bar floating over the conversation */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2.5 border-b border-white/[0.08] bg-[#0e0e15]/55 px-3 pb-3 pt-11 backdrop-blur-xl backdrop-saturate-150">
            <ChevronLeft className="size-5 text-muted" aria-hidden="true" />
            <div className="glass-pill grid size-9 place-items-center rounded-full text-[22px]">
              <LogoRing className="size-[0.62em]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-text">{t.businessName}</p>
              <p className={`truncate text-[11px] ${showTyping ? "text-accent-soft" : "text-emerald-400"}`}>
                {showTyping ? t.typing : t.online}
              </p>
            </div>
            <Video className="size-5 text-muted" aria-hidden="true" />
          </div>

          {/* Messages */}
          <div className="relative flex flex-1 flex-col justify-end overflow-hidden px-3 pb-[4.6rem] [mask-image:linear-gradient(to_bottom,transparent,#000_12%)]">
            <div
              key={cycle}
              ref={listRef}
              className={`transition-opacity duration-[400ms] ${fading ? "opacity-0" : "opacity-100"}`}
            >
              {t.messages.slice(0, shownCount).map((message, index) => {
                const fromLead = message.from === "lead";
                return (
                  <div key={index} className={`chat-in flex pt-2 ${fromLead ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-snug ${
                        fromLead
                          ? "rounded-2xl rounded-br-md bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_6px_20px_-8px_rgb(139_92_246/0.8)]"
                          : "rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.08] text-text shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]"
                      }`}
                    >
                      {message.text}
                      {message.booking ? (
                        <div className="mt-2.5 rounded-xl border border-white/10 bg-white/[0.05] p-2.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.1)]">
                          <div className="flex items-center gap-2.5">
                            <span className="grid size-8 place-items-center rounded-lg bg-primary/20 text-accent-soft">
                              <CalendarDays className="size-4" aria-hidden="true" />
                            </span>
                            <div>
                              <p className="text-[13px] font-semibold text-text">{t.booking.title}</p>
                              <p className="text-[11px] text-muted">{t.booking.meta}</p>
                            </div>
                          </div>
                          <span className="lg-badge mt-2.5 flex h-8 items-center justify-center rounded-lg text-[12px] font-semibold">
                            {t.booking.cta}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}

              {showTyping ? (
                <div className="chat-in flex pt-2">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.08] px-3.5 py-3 text-accent-soft shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Composer: glass bar floating over the conversation */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 border-t border-white/[0.08] bg-[#0e0e15]/55 px-3 pb-5 pt-3 backdrop-blur-xl backdrop-saturate-150">
            <div className="glass-pill flex h-9 flex-1 items-center rounded-full px-3.5 text-[13px] text-muted">
              {t.inputPlaceholder}
            </div>
            <span className="lg-badge grid size-9 place-items-center rounded-full">
              <Send className="size-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      {/* Pipeline status chip */}
      {showPipeline ? (
        <div
          key={`pipeline-${cycle}`}
          className={`chat-in glass absolute -left-3 bottom-6 flex items-center gap-2 !rounded-full py-2 pl-2 pr-4 text-xs font-semibold text-text transition-opacity duration-[400ms] sm:-left-20 ${
            fading ? "opacity-0" : ""
          }`}
        >
          <span className="grid size-6 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
            <Check className="size-3.5" aria-hidden="true" />
          </span>
          {t.pipeline}
        </div>
      ) : null}
    </div>
  );
}
