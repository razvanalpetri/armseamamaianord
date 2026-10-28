"use client";

import type { ReactNode } from "react";
import { REPLAY_DEMO_EVENT } from "@/lib/events";

/** Scrolls to the phone mockup (via its #demo anchor) and replays the chat. */
export function DemoButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a href="#demo" className={className} onClick={() => window.dispatchEvent(new Event(REPLAY_DEMO_EVENT))}>
      {children}
    </a>
  );
}
