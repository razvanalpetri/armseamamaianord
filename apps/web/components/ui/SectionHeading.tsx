import { Reveal } from "@/components/ui/Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeading({ id, eyebrow, title, subtitle, align = "center" }: Props) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-3xl font-semibold text-text sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}
