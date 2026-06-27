import Link from "next/link";
import { Reveal, RevealText } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  href,
  hrefLabel = "Ver tudo",
  align = "between",
}: {
  eyebrow: string;
  title: string;
  href?: string;
  hrefLabel?: string;
  align?: "between" | "center";
}) {
  if (align === "center") {
    return (
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow text-stone">{eyebrow}</p>
        </Reveal>
        <h2 className="h-display mt-4 text-[clamp(2.4rem,6vw,5rem)]">
          <RevealText text={title} />
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-7">
      <div>
        <Reveal>
          <p className="eyebrow text-stone">{eyebrow}</p>
        </Reveal>
        <h2 className="h-display mt-3 text-[clamp(2.2rem,5.5vw,4.5rem)]">
          <RevealText text={title} />
        </h2>
      </div>
      {href && (
        <Reveal delay={0.1}>
          <Link
            href={href}
            data-cursor="Ver"
            className="link-underline pb-1 text-[12px] uppercase tracking-[0.2em]"
          >
            {hrefLabel}
          </Link>
        </Reveal>
      )}
    </div>
  );
}
