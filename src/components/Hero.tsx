"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { editorial } from "@/lib/products";
import { BLUR } from "@/lib/ui";
import { Magnetic } from "./ui/Magnetic";
import { Spotlight } from "./ui/Spotlight";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Pausa a "câmera" infinita quando o Hero sai da viewport (poupa bateria).
  const inView = useInView(ref);
  const cameraActive = inView && !reduce;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* Imagem editorial com parallax + câmera cinematográfica lenta (24s) */}
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-0">
        <motion.div
          className="absolute inset-0"
          animate={
            cameraActive
              ? {
                  scale: [1.06, 1.14, 1.06],
                  x: ["0%", "-1.6%", "0%"],
                  y: ["0%", "-1.4%", "0%"],
                }
              : { scale: 1.06, x: "0%", y: "0%" }
          }
          transition={
            cameraActive
              ? { duration: 24, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.6, ease: "easeOut" }
          }
        >
          <Image
            src={editorial.heroPrimary}
            alt="Campanha New Collection — RJjstore"
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent" />
      </motion.div>

      {/* Luz que acompanha o cursor — "ilumina o tecido" */}
      <Spotlight intensity={0.18} size={680} />

      {/* Meta topo — abaixo da navbar */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 top-[68px] z-10 hidden md:top-[76px] md:block"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-10 pt-6 text-white/70">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-[11px] uppercase tracking-[0.25em]"
          >
            Est. 2026 — Brasil
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-[11px] uppercase tracking-[0.25em]"
          >
            Lookbook SS / 26
          </motion.span>
        </div>
      </motion.div>

      {/* Selo lateral rotacionado */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
      >
        <span className="block rotate-90 whitespace-nowrap text-[11px] uppercase tracking-[0.4em] text-white/60">
          Premium Fashion Experience
        </span>
      </motion.div>

      {/* Conteúdo */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-14 text-white md:px-10 md:pb-16"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease }}
            className="eyebrow mb-5 flex items-center gap-3 text-white/80"
          >
            <span className="inline-block h-px w-10 bg-white/50" />
            New Collection
          </motion.p>

          <h1 className="h-display text-[clamp(3.4rem,12vw,11rem)]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.45, duration: 1, ease }}
              >
                Luxury
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block italic text-white/90"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.58, duration: 1, ease }}
              >
                Streetwear
              </motion.span>
            </span>
          </h1>

          {/* régua que se desenha */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 1.1, ease }}
            className="mt-8 h-px w-full origin-left bg-white/20"
          />

          <div className="mt-7 flex flex-col items-start gap-7 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="max-w-sm text-sm font-light leading-relaxed text-white/75"
            >
              Uma curadoria das maiores grifes do mundo. Peças que falam por você —
              experiência premium, do primeiro clique ao WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease }}
            >
              <Magnetic strength={0.5}>
                <Link
                  href="/loja"
                  data-cursor="Ver"
                  className="group inline-flex items-center gap-4 rounded-full bg-white px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-ink transition-colors hover:bg-white/90"
                >
                  Explorar coleção
                  <span className="transition-transform duration-500 ease-luxe group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px origin-top bg-gradient-to-b from-white/80 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
