"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { editorial } from "@/lib/products";
import { BLUR } from "@/lib/ui";
import { Spotlight } from "./ui/Spotlight";

const SLIDES = [
  { img: editorial.lookbook[3], idx: "01", title: "Off Duty", tag: "Streetwear" },
  { img: editorial.lookbook[0], idx: "02", title: "Monochrome", tag: "Essentials" },
  { img: editorial.campaignTall, idx: "03", title: "After Hours", tag: "Outerwear" },
  { img: editorial.lookbook[2], idx: "04", title: "Concrete", tag: "Footwear" },
  { img: editorial.lookbook[1], idx: "05", title: "Layers", tag: "Tailoring" },
];

export function LookbookScroll() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // desloca a faixa horizontalmente conforme a seção é rolada
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  // profundidade: a imagem contra-desliza dentro da moldura (parallax multicamada)
  const imgX = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const captionX = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink text-paper">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <Spotlight intensity={0.14} size={820} />
        {/* cabeçalho */}
        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between px-5 pb-8 md:px-10">
          <div>
            <p className="eyebrow text-white/50">Lookbook — SS / 26</p>
            <h2 className="h-display mt-2 text-[clamp(2.4rem,6vw,5rem)]">
              The <span className="italic">Edit</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm font-light text-white/55 md:block">
            Cinco atitudes, uma estação. Role para percorrer a campanha.
          </p>
        </div>

        {/* trilho horizontal */}
        <motion.div
          style={{ x }}
          data-cursor="Arraste"
          className="flex gap-5 px-5 md:gap-8 md:px-10"
        >
          {SLIDES.map((s) => (
            <article
              key={s.idx}
              className="group relative aspect-[3/4] w-[78vw] shrink-0 overflow-hidden bg-graphite sm:w-[52vw] md:w-[34vw] lg:w-[26vw]"
            >
              {/* camada de profundidade: imagem maior contra-deslizando */}
              <motion.div style={{ x: imgX }} className="absolute inset-0 scale-125">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR}
                  sizes="(max-width:768px) 78vw, 26vw"
                  className="object-cover transition-transform duration-[1.3s] ease-luxe group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.25em] text-white/60">
                {s.idx} / 05
              </span>
              {/* legenda em camada de frente (move em sentido oposto) */}
              <motion.div
                style={{ x: captionX }}
                className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5"
              >
                <div>
                  <p className="eyebrow text-white/60">{s.tag}</p>
                  <h3 className="h-display text-3xl">{s.title}</h3>
                </div>
              </motion.div>
            </article>
          ))}
        </motion.div>

        {/* barra de progresso da seção */}
        <div className="mx-auto mt-8 w-full max-w-[1600px] px-5 md:px-10">
          <div className="h-px w-full bg-white/15">
            <motion.div style={{ width: progress }} className="h-px bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
