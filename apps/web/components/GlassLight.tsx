"use client";

import { useEffect } from "react";

const SURFACES = ".glass";

/**
 * Moves the specular highlight of the glass surface under the pointer
 * (--lg-x / --lg-y, read by .glass in globals.css). Mouse and pen only;
 * on touch the highlight stays at its resting top-left position.
 */
export function GlassLight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let target: HTMLElement | null = null;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--lg-x", `${x - rect.left}px`);
      target.style.setProperty("--lg-y", `${y - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      const surface = (event.target as Element | null)?.closest?.<HTMLElement>(SURFACES) ?? null;
      if (surface !== target && target) {
        target.style.removeProperty("--lg-x");
        target.style.removeProperty("--lg-y");
      }
      target = surface;
      x = event.clientX;
      y = event.clientY;
      if (target && !frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
