"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const STATS = [
  { value: 8, suffix: "", label: "Grifes selecionadas" },
  { value: 200, suffix: "+", label: "Peças em curadoria" },
  { value: 27, suffix: "", label: "Estados atendidos" },
  { value: 100, suffix: "%", label: "Originais" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const start = performance.now();
    const DUR = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DUR);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  return (
    <section className="border-y border-line bg-ash">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => {
          // Borda vertical apenas ENTRE colunas (não na borda direita do container).
          // Mobile (2 col): divisor só na coluna esquerda (índices pares).
          // Desktop (4 col): divisor em todos menos o último.
          const borders = [
            i < 2 ? "border-b border-line md:border-b-0" : "",
            i % 2 === 0 ? "border-r border-line" : "",
            i % 2 === 1 && i !== STATS.length - 1
              ? "md:border-r md:border-line"
              : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <div
              key={s.label}
              className={`flex flex-col items-center justify-center px-4 py-14 text-center md:py-20 ${borders}`}
            >
              <span className="h-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="eyebrow mt-4 text-stone">{s.label}</span>
            </div>
          );
        })}
      </div>
      <p className="px-4 pb-8 text-center text-[11px] text-stone md:pb-10">
        Números ilustrativos desta vitrine de demonstração.
      </p>
    </section>
  );
}
