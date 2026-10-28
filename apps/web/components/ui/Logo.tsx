import { BRAND } from "@/lib/brand";

/** Glowing violet ring that stands in for the "o" in the wordmark. */
export function LogoRing({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`logo-ring ${className}`} />;
}

/** "Closr" wordmark, with the "o" drawn as a glowing ring. */
export function Logo({ className = "" }: { className?: string }) {
  const [before, after] = BRAND.split("o");

  return (
    <span className={`inline-flex items-baseline font-display font-semibold tracking-tight ${className}`}>
      <span className="sr-only">{BRAND}</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {before}
        <LogoRing className="mx-[0.04em] h-[0.6em] w-[0.6em]" />
        {after}
      </span>
    </span>
  );
}
