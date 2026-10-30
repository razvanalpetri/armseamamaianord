import { BRAND, BRAND_FULL, BRAND_SUFFIX } from "@/lib/brand";

/** Glowing violet ring that stands in for the "o" in the wordmark. */
export function LogoRing({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`logo-ring ${className}`} />;
}

/** "Closr" wordmark, with the "o" drawn as a glowing ring, plus an "Agency" tag. */
export function Logo({ className = "" }: { className?: string }) {
  const [before, after] = BRAND.split("o");

  return (
    <span className={`inline-flex items-center gap-2 font-display font-semibold tracking-tight ${className}`}>
      <span className="sr-only">{BRAND_FULL}</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {before}
        <LogoRing className="mx-[0.04em] h-[0.6em] w-[0.6em]" />
        {after}
      </span>
      <span
        aria-hidden="true"
        className="glass-pill rounded-full px-2 py-0.5 text-[0.42em] font-semibold uppercase tracking-[0.14em] text-accent-soft"
      >
        {BRAND_SUFFIX}
      </span>
    </span>
  );
}
