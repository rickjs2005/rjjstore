"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

/** Headline tipográfico gigante que desliza conforme o scroll. */
export function MarqueeHeadline({
  text = "Luxury Streetwear",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ["6%", "-28%"]), {
    stiffness: 90,
    damping: 30,
  });

  const phrase = `${text} —`;
  const repeated = Array.from({ length: 6 }, () => phrase);

  return (
    <div
      ref={ref}
      className={`overflow-hidden border-y border-line py-8 md:py-12 ${className}`}
    >
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {repeated.map((p, i) => (
          <span
            key={i}
            className={`h-display px-4 text-[clamp(3rem,11vw,9rem)] leading-none ${
              i % 2 === 1 ? "italic text-stone/40" : "text-ink"
            }`}
          >
            {p}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
