"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { editorial } from "@/lib/products";
import { BLUR } from "@/lib/ui";
import { RevealText, Reveal } from "./ui/Reveal";
import { Spotlight } from "./ui/Spotlight";

export function EditorialSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="editorial"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-paper"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-125">
        <Image
          src={editorial.campaignWide}
          alt="Campanha editorial RJjstore"
          fill
          placeholder="blur"
          blurDataURL={BLUR}
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-ink/30" />

      {/* luz dinâmica */}
      <Spotlight intensity={0.16} size={760} />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-28 md:px-10">
        <Reveal>
          <p className="eyebrow text-white/60">Editorial — Capítulo 01</p>
        </Reveal>
        <h2 className="h-display mt-6 max-w-4xl text-[clamp(2.6rem,8vw,7rem)]">
          <RevealText text="Vista o que" />
          <br />
          <span className="italic">
            <RevealText text="ninguém esquece" delay={0.15} />
          </span>
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-white/70">
            Cada peça é escolhida como uma obra: pela história da marca, pelo
            corte, pela presença. Não vendemos roupas — entregamos a forma como
            você quer ser lembrado.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link
            href="/loja"
            data-cursor="Descobrir"
            className="mt-10 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-[12px] uppercase tracking-[0.22em] transition-colors hover:border-white"
          >
            Descobrir a coleção →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
