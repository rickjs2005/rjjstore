"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BLUR } from "@/lib/ui";
import { categoryCovers } from "@/lib/products";

type Tile = { cat: string; label: string; sub: string; img: string };

const TILES: Tile[] = [
  {
    cat: "Tênis",
    label: "Footwear",
    sub: "Ícones que definem a silhueta",
    img: categoryCovers["Tênis"]!,
  },
  {
    cat: "Jaquetas",
    label: "Outerwear",
    sub: "Camadas com atitude",
    img: categoryCovers["Jaquetas"]!,
  },
  {
    cat: "Moletom",
    label: "Fleece",
    sub: "Conforto de coleção",
    img: categoryCovers["Moletom"]!,
  },
];

function Tile({ tile, large }: { tile: Tile; large?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Link
      ref={ref}
      href={`/loja?cat=${encodeURIComponent(tile.cat)}`}
      data-cursor="Explorar"
      className={`group relative block overflow-hidden bg-ash ${
        large ? "h-[70vh] min-h-[420px]" : "h-[34vh] min-h-[200px]"
      }`}
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src={tile.img}
          alt={tile.cat}
          fill
          placeholder="blur"
          blurDataURL={BLUR}
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-700 group-hover:from-black/70" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white md:p-8">
        <div>
          <p className="eyebrow text-white/70">{tile.label}</p>
          <h3 className="h-display mt-1 text-3xl md:text-5xl">{tile.cat}</h3>
          <p className="mt-1 text-sm font-light text-white/75">{tile.sub}</p>
        </div>
        <span className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 transition-all duration-500 group-hover:bg-white group-hover:text-ink">
          →
        </span>
      </div>
    </Link>
  );
}

export function CategoryShowcase() {
  return (
    <section className="px-5 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto grid max-w-[1600px] gap-5 md:grid-cols-2 md:gap-6">
        <Tile tile={TILES[0]} large />
        <div className="grid gap-5 md:gap-6">
          <Tile tile={TILES[1]} />
          <Tile tile={TILES[2]} />
        </div>
      </div>
    </section>
  );
}
