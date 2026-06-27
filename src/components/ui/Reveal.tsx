"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/** Fade + subida elegante quando entra na viewport */
export function Reveal({ children, className, delay = 0, y = 28, once = true }: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/** Texto revelado linha a linha (clip-up) */
export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {/* Wrapper de clip por palavra (inline-block → flui na linha) */}
          <span className="reveal-line" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: reduce ? 0 : "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.06,
            }}
          >
            {w}
          </motion.span>
          </span>
          {/* Espaco FORA do clip -> permite quebra natural entre palavras */}
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
