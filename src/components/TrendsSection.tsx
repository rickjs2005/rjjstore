"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { editorial } from "@/lib/products";
import { BLUR } from "@/lib/ui";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

function Frame({
  src,
  className,
  label,
  delay = 0,
}: {
  src: string;
  className: string;
  label?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease, delay }}
      className={`group relative overflow-hidden bg-ash ${className}`}
    >
      <Image
        src={src}
        alt={label || "Lookbook RJjstore"}
        fill
        placeholder="blur"
        blurDataURL={BLUR}
        sizes="(max-width:768px) 100vw, 33vw"
        className="object-cover transition-transform duration-[1.3s] ease-luxe group-hover:scale-105"
      />
      {label && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute bottom-4 left-4 translate-y-2 text-sm text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {label}
          </span>
        </>
      )}
    </motion.div>
  );
}

export function TrendsSection() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading eyebrow="Lookbook" title="Tendências" href="/loja" />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-12 md:grid-rows-[260px_260px] md:gap-6">
          {/* Tile com "vídeo" simulado */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="relative col-span-2 row-span-2 flex aspect-square flex-col justify-between overflow-hidden bg-ink p-6 text-paper md:col-span-5 md:aspect-auto md:p-9"
          >
            <div className="absolute inset-0 opacity-50">
              <Image
                src={editorial.campaignTall}
                alt=""
                fill
                aria-hidden
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="relative flex items-center gap-2">
              <span className="flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              <span className="eyebrow text-white/80">Film — SS26</span>
            </div>
            <div className="relative">
              <h3 className="h-display text-4xl md:text-5xl">In Motion</h3>
              <p className="mt-2 max-w-xs text-sm font-light text-white/70">
                A coleção em movimento. Texturas, cortes e a atitude de quem
                veste primeiro.
              </p>
            </div>
          </motion.div>

          <Frame
            src={editorial.lookbook[0]}
            className="col-span-1 aspect-[3/4] md:col-span-4 md:row-span-2 md:aspect-auto"
            label="Look 01 — Monochrome"
            delay={0.05}
          />
          <Frame
            src={editorial.lookbook[1]}
            className="col-span-1 aspect-[3/4] md:col-span-3 md:aspect-auto"
            label="Look 02 — Layers"
            delay={0.1}
          />
          <Frame
            src={editorial.lookbook[2]}
            className="col-span-2 aspect-[16/9] md:col-span-3 md:aspect-auto"
            label="Look 03 — Street"
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
