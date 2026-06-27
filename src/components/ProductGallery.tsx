"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLUR } from "@/lib/ui";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductGallery({
  images,
  alt,
  washHex,
  sweep = 0,
}: {
  images: string[];
  alt: string;
  washHex?: string;
  sweep?: number;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* thumbnails */}
      <div className="flex gap-3 md:flex-col">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            aria-label={`Ver imagem ${i + 1}`}
            className={`relative h-20 w-16 shrink-0 overflow-hidden bg-ash transition-opacity md:h-24 md:w-20 ${
              active === i ? "ring-1 ring-ink" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* imagem principal */}
      <div
        ref={ref}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        data-cursor="Zoom"
        className="relative aspect-[3/4] flex-1 overflow-hidden bg-ash"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={alt}
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR}
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 ease-out"
              style={{
                transform: zoom ? "scale(1.8)" : "scale(1)",
                transformOrigin: origin,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* tonalização do tecido conforme a cor selecionada */}
        {washHex && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[5]"
            animate={{ backgroundColor: washHex }}
            transition={{ duration: 0.6, ease }}
            style={{ mixBlendMode: "soft-light", opacity: 0.35 }}
          />
        )}
        {/* varredura de luz a cada troca de cor */}
        {sweep > 0 && (
          <motion.div
            key={sweep}
            initial={{ x: "-130%" }}
            animate={{ x: "130%" }}
            transition={{ duration: 0.85, ease }}
            className="pointer-events-none absolute inset-y-0 z-[6] w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          />
        )}
      </div>
    </div>
  );
}
