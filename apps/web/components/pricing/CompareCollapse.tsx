"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

type Props = {
  showLabel: string;
  hideLabel: string;
  children: ReactNode;
};

/** Collapsed behind a button on mobile; always open from the lg breakpoint up. */
export function CompareCollapse({ showLabel, hideLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="btn btn-secondary w-full lg:hidden"
      >
        {open ? hideLabel : showLabel}
        <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <div id={id} className={`${open ? "mt-4 block" : "hidden"} lg:mt-0 lg:block`}>
        {children}
      </div>
    </>
  );
}
