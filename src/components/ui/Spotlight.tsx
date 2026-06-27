"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Luz dinâmica que segue o cursor dentro do elemento-pai (que deve ser
 * `relative overflow-hidden`). Em soft-light, "ilumina o tecido" das imagens
 * editoriais escuras. Desliga em reduced-motion e em telas touch.
 */
export function Spotlight({
  size = 620,
  intensity = 0.22,
  blend = "soft-light",
}: {
  size?: number;
  intensity?: number;
  blend?: "soft-light" | "overlay" | "screen";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 140, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 140, damping: 26, mass: 0.5 });

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
      setActive(true);
    };
    const onLeave = () => setActive(false);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, x, y]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      <motion.div
        style={{
          x: sx,
          y: sy,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          background: `radial-gradient(circle, rgba(255,255,255,${intensity}) 0%, rgba(255,255,255,${intensity * 0.4}) 28%, transparent 64%)`,
          mixBlendMode: blend,
        }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute left-0 top-0 rounded-full"
      />
    </div>
  );
}
