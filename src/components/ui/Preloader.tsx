"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

export function Preloader() {
  const reduce = useReducedMotion();
  // Cortina cobre desde o 1º paint (SSR) → sem flash do conteúdo real.
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  // Quando true, a cortina sai instantaneamente (já vista / reduced-motion).
  const [instant, setInstant] = useState(false);

  // Só anima a intro na primeira visita da sessão (evita repetir a cada reload)
  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("rjj-intro") === "1";

    // Já viu nesta sessão, ou prefere menos movimento → remove a cortina
    // imediatamente. Como ela já cobria no 1º paint, não há flash de conteúdo.
    if (seen || reduce) {
      sessionStorage.setItem("rjj-intro", "1");
      setInstant(true);
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const start = performance.now();
    const DUR = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DUR);
      // easing out
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t = setTimeout(() => {
      sessionStorage.setItem("rjj-intro", "1");
      setDone(true);
      document.body.style.overflow = "";
    }, DUR + 650);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink text-paper"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={instant ? { duration: 0 } : { duration: 0.9, ease }}
        >
          <motion.span
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="h-display text-[clamp(3rem,12vw,8rem)] leading-none"
          >
            RJ<span className="italic">j</span>store
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="eyebrow mt-6 text-white/50"
          >
            Luxury Streetwear
          </motion.span>

          {/* contador + linha */}
          <div className="absolute bottom-10 left-0 right-0 px-6 md:px-10">
            <div className="mx-auto flex max-w-[1600px] items-end justify-between">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                transition={{ ease: "linear" }}
                className="hidden h-px w-1/2 origin-left bg-white/30 md:block"
              />
              <span className="h-display text-5xl tabular-nums md:text-7xl">
                {count}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
