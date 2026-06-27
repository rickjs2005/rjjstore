"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/products";
import { discountPct } from "@/lib/format";
import { BLUR } from "@/lib/ui";
import { swatchStyle } from "@/lib/theme";
import { useCart } from "./providers/CartProvider";
import { useQuickView } from "./providers/QuickViewProvider";

// Em telas com hover (desktop) os controles somem e aparecem no hover (com leve slide).
// Em telas sem hover (toque/mobile) ficam sempre visíveis.
const REVEAL_DOWN =
  "opacity-100 translate-y-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:-translate-y-1 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0";
const REVEAL_UP =
  "opacity-100 translate-y-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0";

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  const { add } = useCart();
  const { open: openQuickView } = useQuickView();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  // tilt 3D leve
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 6);
    rx.set(-py * 6);
  }
  function onLeave() {
    setHover(false);
    rx.set(0);
    ry.set(0);
  }

  const off = discountPct(product.price, product.oldPrice);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add(product.id, product.sizes[Math.min(1, product.sizes.length - 1)]);
  }

  function quickView(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  }

  return (
    <motion.div
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.07 }}
    >
      {/* container do card — NÃO é mais uma âncora. Os botões são irmãos do link. */}
      <div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative block"
      >
        {/* moldura da imagem */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-ash">
          {/* camada com tilt 3D (apenas visual: imagens, badges e gradiente) */}
          <motion.div
            style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
            className="absolute inset-0"
          >
            {/* badges — acabamento de etiqueta costurada (costura tracejada + sombra) */}
            <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
              {product.badge && (
                <span className="border border-dashed border-white/35 bg-ink px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-paper shadow-[0_2px_6px_-2px_rgba(0,0,0,0.5)]">
                  {product.badge}
                </span>
              )}
              {off && (
                <span className="border border-dashed border-ink/20 bg-paper px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink shadow-[0_2px_6px_-2px_rgba(0,0,0,0.25)]">
                  -{off}%
                </span>
              )}
            </div>

            {/* imagem base */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              placeholder="blur"
              blurDataURL={BLUR}
              sizes="(max-width:768px) 50vw, 25vw"
              priority={priority}
              className="object-cover transition-transform duration-[1.1s] ease-luxe group-hover:scale-[1.04]"
            />
            {/* imagem hover */}
            <Image
              src={product.hover}
              alt=""
              fill
              aria-hidden
              sizes="(max-width:768px) 50vw, 25vw"
              className={`object-cover transition-opacity duration-700 ease-luxe ${
                hover ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* iluminação editorial no hover */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent transition-opacity duration-700 ${
                hover ? "opacity-100" : "opacity-0"
              }`}
            />
          </motion.div>

          {/* vista rápida — irmão do link, acima dele (z-20) */}
          <button
            onClick={quickView}
            data-cursor="Vista rápida"
            aria-label={`Vista rápida — ${product.name}`}
            className={`absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-paper/95 text-ink backdrop-blur transition-all duration-500 ease-luxe hover:bg-ink hover:text-paper ${REVEAL_DOWN}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
            </svg>
          </button>

          {/* quick add — irmão do link, acima dele (z-20) */}
          <div className={`absolute inset-x-3 bottom-3 z-20 transition-all duration-500 ease-luxe ${REVEAL_UP}`}>
            <button
              onClick={quickAdd}
              data-cursor="Adicionar"
              className="w-full bg-paper/95 py-3 text-[11px] uppercase tracking-[0.2em] text-ink shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] backdrop-blur transition-colors hover:bg-ink hover:text-paper"
            >
              Adicionar à sacola
            </button>
          </div>
        </div>

        {/* stretched link — cobre toda a área navegável do card (imagem + info),
            mas como irmão dos botões (que ficam em z-20, acima dele em z-10) */}
        <Link
          href={`/produtos/${product.slug}`}
          data-cursor="Ver peça"
          aria-label={product.name}
          className="absolute inset-0 z-10"
        />

        {/* info (clicável via stretched link, mas sem envolver os botões) */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow text-stone">{product.brand}</p>
            <h3 className="mt-1 truncate text-[15px] font-medium">{product.name}</h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[15px] font-medium">{product.price}</p>
            {product.oldPrice && (
              <p className="text-xs text-stone line-through">{product.oldPrice}</p>
            )}
          </div>
        </div>

        {/* swatches de cor */}
        <div className="mt-2.5 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3 w-3 rounded-full"
              style={swatchStyle(c.hex)}
            />
          ))}
          <span className="ml-1 text-[11px] text-stone">
            {product.colors.length > 1
              ? `${product.colors.length} cores`
              : "1 cor"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
