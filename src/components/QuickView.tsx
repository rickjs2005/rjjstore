"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuickView } from "./providers/QuickViewProvider";
import { useCart } from "./providers/CartProvider";
import { installments, discountPct } from "@/lib/format";
import { waLink, buyMessage } from "@/lib/whatsapp";
import { BLUR } from "@/lib/ui";
import { WA_GREEN, SOLID_DEPTH } from "@/lib/theme";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";
import { ColorPicker } from "./ui/ColorPicker";
import { SizePicker } from "./ui/SizePicker";

const ease = [0.22, 1, 0.36, 1] as const;

export function QuickView() {
  const { product, close } = useQuickView();
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string>("");
  const [img, setImg] = useState(0);
  const [warn, setWarn] = useState(false);
  const [sweep, setSweep] = useState(0); // morph de luz na troca de cor
  const [waHover, setWaHover] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const activeHex =
    product?.colors.find((c) => c.name === color)?.hex ?? "#000000";

  function pickColor(name: string) {
    setColor(name);
    setSweep((s) => s + 1);
  }

  // sincroniza estado quando troca de produto
  useEffect(() => {
    if (product) {
      setSize(product.sizes.length === 1 ? product.sizes[0] : null);
      setColor(product.colors[0]?.name ?? "");
      setImg(0);
      setWarn(false);
    }
  }, [product]);

  // trava scroll + ESC + focus trap + devolução de foco
  useEffect(() => {
    if (!product) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      dialogRef.current
        ? Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null)
        : [];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab") {
        const f = getFocusable();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    // move o foco para dentro do dialog ao abrir
    const t = window.setTimeout(() => getFocusable()[0]?.focus(), 0);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      prevFocus.current?.focus?.();
    };
  }, [product, close]);

  const off = product ? discountPct(product.price, product.oldPrice) : null;

  function onAdd() {
    if (!product) return;
    if (!size) {
      setWarn(true);
      return;
    }
    add(product.id, size); // abre o carrinho
    close();
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-sm"
            aria-hidden
          />
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.5, ease }}
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Vista rápida — ${product.name}`}
              className="grid max-h-[88vh] w-full max-w-4xl grid-cols-1 overflow-hidden bg-paper md:grid-cols-2"
            >
              {/* imagem */}
              <div className="relative hidden bg-ash md:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={img}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.gallery[img] ?? product.image}
                      alt={product.name}
                      fill
                      placeholder="blur"
                      blurDataURL={BLUR}
                      sizes="50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                {/* tonalização suave do tecido conforme a cor escolhida */}
                <motion.div
                  className="pointer-events-none absolute inset-0 z-[5]"
                  animate={{ backgroundColor: activeHex }}
                  transition={{ duration: 0.6, ease }}
                  style={{ mixBlendMode: "soft-light", opacity: 0.4 }}
                />
                {/* varredura de luz a cada troca de cor */}
                {sweep > 0 && (
                  <motion.div
                    key={sweep}
                    initial={{ x: "-130%" }}
                    animate={{ x: "130%" }}
                    transition={{ duration: 0.85, ease }}
                    className="pointer-events-none absolute inset-y-0 z-[6] w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                )}
                {product.gallery.length > 1 && (
                  <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                    {product.gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImg(i)}
                        aria-label={`Imagem ${i + 1}`}
                        className={`h-1.5 w-6 transition-colors ${
                          img === i ? "bg-white" : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* detalhe */}
              <div className="flex max-h-[88vh] flex-col overflow-y-auto p-7 md:p-9" data-lenis-prevent>
                <div className="flex items-start justify-between">
                  <p className="eyebrow text-stone">{product.brand}</p>
                  <button
                    onClick={close}
                    aria-label="Fechar"
                    className="text-[11px] uppercase tracking-[0.2em] text-stone hover:text-ink"
                  >
                    Fechar ✕
                  </button>
                </div>

                {/* imagem mobile */}
                <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden bg-ash md:hidden">
                  <Image
                    src={product.gallery[img] ?? product.image}
                    alt={product.name}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <h2 className="h-display mt-4 text-3xl md:text-4xl">{product.name}</h2>

                <div className="mt-3 flex items-end gap-3">
                  <span className="text-xl font-medium">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-stone line-through">{product.oldPrice}</span>
                  )}
                  {off && (
                    <span className="mb-0.5 bg-ink px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-paper">
                      -{off}%
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-stone">{installments(product.price)}</p>

                <p className="mt-5 text-sm font-light leading-relaxed text-graphite">
                  {product.description}
                </p>

                {/* cor */}
                <div className="mt-6">
                  <p className="eyebrow mb-2.5 text-stone">Cor — {color}</p>
                  <ColorPicker
                    colors={product.colors}
                    value={color}
                    onChange={pickColor}
                    size="sm"
                  />
                </div>

                {/* tamanho */}
                <div className="mt-6">
                  <p className="eyebrow mb-2.5 text-stone">Tamanho</p>
                  <SizePicker
                    sizes={product.sizes}
                    value={size}
                    onChange={(s) => {
                      setSize(s);
                      setWarn(false);
                    }}
                    invalid={warn}
                    size="sm"
                  />
                  {warn && <p className="mt-2 text-xs text-red-600">Selecione um tamanho.</p>}
                </div>

                {/* ações */}
                <div className="mt-7 flex flex-col gap-3">
                  <button
                    onClick={onAdd}
                    className={`w-full bg-ink py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-paper hover:opacity-95 ${SOLID_DEPTH}`}
                  >
                    Adicionar à sacola
                  </button>
                  <div className="flex gap-3">
                    <a
                      href={waLink(
                        buyMessage(product.name, product.brand, size ?? "a combinar", product.price)
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setWaHover(true)}
                      onMouseLeave={() => setWaHover(false)}
                      className="flex flex-1 items-center justify-center gap-2 border py-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors"
                      style={{
                        borderColor: WA_GREEN,
                        background: waHover ? WA_GREEN : "transparent",
                        color: waHover ? "#fff" : WA_GREEN,
                      }}
                    >
                      <WhatsAppIcon size={14} />
                      WhatsApp
                    </a>
                    <Link
                      href={`/produtos/${product.slug}`}
                      onClick={close}
                      className="flex flex-1 items-center justify-center border border-line py-3 text-[11px] font-medium uppercase tracking-[0.18em] hover:border-ink"
                    >
                      Ver página
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
