"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./providers/CartProvider";
import { products } from "@/lib/products";
import { parseBRL, formatBRL } from "@/lib/format";
import { waLink, orderMessage } from "@/lib/whatsapp";
import { WA_GREEN } from "@/lib/theme";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";
import { BagIcon } from "./ui/BagIcon";

const ease = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const { items, isOpen, close, inc, dec, remove, clear } = useCart();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  // trava scroll do body + ESC + foco no botão fechar + devolução de foco
  useEffect(() => {
    if (!isOpen) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      prevFocus.current?.focus?.();
    };
  }, [isOpen, close]);

  const lines = items
    .map((l) => {
      const p = products.find((x) => x.id === l.id);
      return p ? { p, size: l.size, qty: l.qty } : null;
    })
    .filter(Boolean) as {
    p: (typeof products)[number];
    size: string;
    qty: number;
  }[];

  const subtotal = lines.reduce((s, l) => s + parseBRL(l.p.price) * l.qty, 0);
  const subtotalStr = formatBRL(subtotal);
  const totalStr = subtotalStr; // sem frete calculado (combinado no WhatsApp)
  const totalQty = lines.reduce((s, l) => s + l.qty, 0);

  const href = waLink(
    orderMessage(
      lines.map((l) => ({
        name: l.p.name,
        brand: l.p.brand,
        size: l.size,
        qty: l.qty,
        price: l.p.price,
      })),
      subtotalStr,
      totalStr
    )
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 38 }}
            className="fixed right-0 top-0 z-[81] flex h-full w-full max-w-md flex-col border-l border-line bg-paper text-ink shadow-[-26px_0_70px_-24px_rgba(0,0,0,0.55)]"
            role="dialog"
            aria-modal="true"
            aria-label="Sacola de compras"
          >
            <header className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="h-display flex items-center gap-2.5 text-2xl">
                <BagIcon size={20} className="opacity-80" />
                Sacola
                <span className="align-middle text-sm text-stone">({totalQty})</span>
              </h2>
              <button
                ref={closeBtnRef}
                onClick={close}
                aria-label="Fechar sacola"
                className="text-[11px] uppercase tracking-[0.2em] hover:opacity-60"
              >
                Fechar ✕
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5" data-lenis-prevent>
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                  <p className="h-display text-3xl">Sua sacola está vazia</p>
                  <p className="max-w-[15rem] text-sm text-stone">
                    Adicione peças que combinam com a sua história.
                  </p>
                  <Link
                    href="/loja"
                    onClick={close}
                    className="mt-2 bg-ink px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-paper"
                  >
                    Ver coleção
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-line">
                  {lines.map((l) => (
                    <li key={`${l.p.id}-${l.size}`} className="flex gap-4 py-5 first:pt-0">
                      <Link
                        href={`/produtos/${l.p.slug}`}
                        onClick={close}
                        className="relative h-28 w-20 shrink-0 overflow-hidden bg-ash"
                      >
                        <Image
                          src={l.p.image}
                          alt={l.p.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="eyebrow text-stone">{l.p.brand}</p>
                            <p className="truncate text-sm font-medium">{l.p.name}</p>
                            <p className="mt-0.5 text-xs text-stone">Tamanho: {l.size}</p>
                          </div>
                          <button
                            onClick={() => remove(l.p.id, l.size)}
                            aria-label="Remover item"
                            className="shrink-0 text-xs text-stone hover:text-ink"
                          >
                            remover
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-line">
                            <button
                              onClick={() => dec(l.p.id, l.size)}
                              className="flex h-8 w-8 items-center justify-center hover:bg-ash"
                              aria-label="Diminuir"
                            >
                              −
                            </button>
                            <span className="w-7 text-center text-sm">{l.qty}</span>
                            <button
                              onClick={() => inc(l.p.id, l.size)}
                              className="flex h-8 w-8 items-center justify-center hover:bg-ash"
                              aria-label="Aumentar"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-medium">
                            {formatBRL(parseBRL(l.p.price) * l.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-line px-6 py-6">
                <div className="mb-1 flex items-center justify-between text-sm text-stone">
                  <span>Subtotal</span>
                  <span>{subtotalStr}</span>
                </div>
                <div className="mb-1 flex items-center justify-between text-sm text-stone">
                  <span>Frete</span>
                  <span>combinado no WhatsApp</span>
                </div>
                <div className="mb-5 flex items-center justify-between border-t border-line pt-3 text-base font-medium">
                  <span>Total</span>
                  <span>{totalStr}</span>
                </div>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="WhatsApp"
                  className="flex w-full items-center justify-center gap-3 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.01]"
                  style={{ background: WA_GREEN }}
                >
                  <WhatsAppIcon size={18} />
                  Finalizar no WhatsApp
                </a>
                <button
                  onClick={clear}
                  className="mt-3 w-full text-center text-xs text-stone hover:text-ink"
                >
                  Esvaziar sacola
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
