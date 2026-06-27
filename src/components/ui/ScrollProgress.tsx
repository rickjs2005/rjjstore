"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        // metal escovado: brilho no topo, núcleo escuro, sombra na base
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.55), rgb(var(--ink)) 45%, rgba(0,0,0,0.35))",
        boxShadow: "0 1px 4px rgba(0,0,0,0.28)",
      }}
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left"
    />
  );
}
