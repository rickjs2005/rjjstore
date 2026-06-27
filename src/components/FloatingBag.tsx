"use client";

import { motion } from "framer-motion";
import { useCart } from "./providers/CartProvider";
import { BagIcon } from "./ui/BagIcon";

/** Acesso rápido à sacola — sempre visível (o selo de quantidade só aparece com itens). */
export function FloatingBag() {
  const { count, open } = useCart();

  return (
    <motion.button
      onClick={open}
      aria-label={count > 0 ? `Abrir sacola (${count})` : "Abrir sacola"}
      data-cursor="Sacola"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.4 }}
      className="fixed bottom-6 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_30px_-10px_rgba(0,0,0,0.55)] transition-transform hover:scale-[1.04] md:bottom-8 md:right-8"
    >
      <BagIcon size={22} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-paper px-1 text-[10px] font-semibold text-ink ring-2 ring-ink">
          {count}
        </span>
      )}
    </motion.button>
  );
}
