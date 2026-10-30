"use client";

import { Bell, CalendarCheck, Check, Database, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/en";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type Props = { t: Dictionary["flow"] };

// Same order as `flow.steps` in the content files.
const ICONS = [MessageCircle, Sparkles, CalendarCheck, Database, Bell];
const STEP_MS = 1500;
const HOLD_MS = 6000;

/**
 * An automation run that completes one step at a time. Every row is always
 * rendered and the panel has a fixed height (34rem, reserved by
 * .defer-render-flow), so progress changes styles only, never layout.
 */
export function FlowMockup({ t }: Props) {
  const reduced = usePrefersReducedMotion();
  const total = t.steps.length;
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Only run while the panel is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const timer = window.setTimeout(
      () => setProgress((value) => (value < total ? value + 1 : 0)),
      progress < total ? STEP_MS : HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, [visible, reduced, progress, total]);

  // With reduced motion, show the finished run.
  const shown = reduced ? total : progress;
  const done = shown >= total;
  const fill = Math.min(shown, total - 1) / (total - 1);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={t.label}
      className="glass relative mx-auto flex h-[34rem] w-full max-w-[27rem] flex-col p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-semibold text-text">{t.title}</p>
          <p className="mt-0.5 text-xs text-muted">{t.example}</p>
        </div>
        <span className="glass-pill inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-text">
          {done ? (
            <Check className="size-3.5 text-emerald-400" aria-hidden="true" />
          ) : (
            <span className="pulse-dot" aria-hidden="true" />
          )}
          {done ? t.completed : t.running}
        </span>
      </div>

      <ol className="relative mt-5 flex flex-1 flex-col justify-between">
        {/* Connector: a track from the first icon to the last, filling as steps complete. */}
        <div aria-hidden="true" className="absolute bottom-8 left-[1.375rem] top-8 w-px bg-white/10">
          <div
            className="h-full w-full origin-top bg-gradient-to-b from-accent-soft to-primary shadow-[0_0_10px_rgb(168_85_247/0.8)] transition-transform duration-700 ease-out"
            style={{ transform: `scaleY(${fill})` }}
          />
        </div>

        {t.steps.map((step, index) => {
          const Icon = ICONS[index] ?? Sparkles;
          const state = index < shown ? "done" : index === shown ? "active" : "pending";
          return (
            <li
              key={step.title}
              className={`relative flex items-center gap-4 py-2.5 transition-opacity duration-500 ${
                state === "pending" ? "opacity-40" : "opacity-100"
              }`}
            >
              <span
                // Opaque base under the glass so the connector line doesn't show through.
                className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-2xl bg-[#120e1c] transition-shadow duration-500 ${
                  state === "pending" ? "glass-pill text-muted" : "lg-icon"
                } ${state === "active" ? "ring-2 ring-accent-soft/60" : ""}`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug text-text">{step.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted">{step.detail}</p>
              </div>
              <span className="flex w-8 shrink-0 justify-end">
                {state === "done" ? (
                  <span className="chat-in grid size-6 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                ) : state === "active" ? (
                  <span className="inline-flex items-center gap-1 text-accent-soft">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ol>

      <p
        className={`glass-pill mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-center text-xs font-semibold text-text transition-opacity duration-500 ${
          done ? "opacity-100" : "opacity-0"
        }`}
      >
        <Check className="size-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
        {t.result}
      </p>
    </div>
  );
}
