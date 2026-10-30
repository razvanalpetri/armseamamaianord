import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Fades and lifts its content in the first time it scrolls into view.
 * Pure CSS (see [data-reveal] in globals.css) toggled by <RevealObserver>,
 * so dozens of these cost nothing to hydrate.
 */
export function Reveal({ children, className, delay = 0 }: Props) {
  return (
    <div data-reveal="" className={className} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
