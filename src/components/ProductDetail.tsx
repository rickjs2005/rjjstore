"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { installments, discountPct } from "@/lib/format";
import { useCart } from "./providers/CartProvider";
import { waLink, buyMessage } from "@/lib/whatsapp";
import { WA_GREEN, SOLID_DEPTH } from "@/lib/theme";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";
import { ColorPicker } from "./ui/ColorPicker";
import { SizePicker } from "./ui/SizePicker";

const SIZE_GUIDE: Record<string, string> = {
  PP: "Busto 88 · Cintura 72",
  P: "Busto 92 · Cintura 76",
  M: "Busto 100 · Cintura 84",
  G: "Busto 108 · Cintura 92",
  GG: "Busto 116 · Cintura 100",
};

export function ProductDetail({
  product,
  color,
  onColor,
}: {
  product: Product;
  color: string;
  onColor: (name: string) => void;
}) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [warn, setWarn] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [waHover, setWaHover] = useState(false);

  const off = discountPct(product.price, product.oldPrice);
  const hasGuide = product.sizes.some((s) => SIZE_GUIDE[s]);

  function ensureSize() {
    if (!size) {
      setWarn(true);
      return null;
    }
    return size;
  }

  function onAdd() {
    const s = ensureSize();
    if (!s) return;
    add(product.id, s);
  }

  const waHref = size
    ? waLink(buyMessage(product.name, product.brand, size, product.price))
    : waLink(buyMessage(product.name, product.brand, "a combinar", product.price));

  return (
    <div className="flex flex-col">
      <p className="eyebrow text-stone">{product.brand}</p>
      <h1 className="h-display mt-2 text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.02]">
        {product.name}
      </h1>

      <div className="mt-5 flex items-end gap-3">
        <span className="text-2xl font-medium">{product.price}</span>
        {product.oldPrice && (
          <span className="text-base text-stone line-through">{product.oldPrice}</span>
        )}
        {off && (
          <span className="mb-1 bg-ink px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-paper">
            -{off}%
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-stone">{installments(product.price)}</p>

      <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-graphite">
        {product.description}
      </p>

      {/* cores */}
      <div className="mt-8">
        <p className="eyebrow mb-3 text-stone">Cor — {color}</p>
        <ColorPicker colors={product.colors} value={color} onChange={onColor} size="md" />
      </div>

      {/* tamanhos */}
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="eyebrow text-stone">Tamanho</p>
          {hasGuide && (
            <button
              onClick={() => setGuideOpen((v) => !v)}
              className="text-xs text-stone underline-offset-4 hover:text-ink hover:underline"
            >
              Tabela de medidas
            </button>
          )}
        </div>
        <SizePicker
          sizes={product.sizes}
          value={size}
          onChange={(s) => {
            setSize(s);
            setWarn(false);
          }}
          invalid={warn}
          size="md"
        />
        {warn && (
          <p className="mt-2 text-xs text-red-600">Selecione um tamanho.</p>
        )}

        <AnimatePresence>
          {guideOpen && hasGuide && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <table className="mt-4 w-full border border-line text-left text-xs">
                <thead className="bg-ash">
                  <tr>
                    <th className="px-3 py-2 font-medium">Tam.</th>
                    <th className="px-3 py-2 font-medium">Medidas (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {product.sizes
                    .filter((s) => SIZE_GUIDE[s])
                    .map((s) => (
                      <tr key={s} className="border-t border-line">
                        <td className="px-3 py-2">{s}</td>
                        <td className="px-3 py-2 text-stone">{SIZE_GUIDE[s]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ações */}
      <div className="mt-9 flex flex-col gap-3">
        <button
          onClick={onAdd}
          data-cursor="Adicionar"
          className={`w-full bg-ink py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-paper hover:opacity-95 ${SOLID_DEPTH}`}
        >
          Adicionar à sacola
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="WhatsApp"
          onMouseEnter={() => setWaHover(true)}
          onMouseLeave={() => setWaHover(false)}
          className="flex w-full items-center justify-center gap-3 border py-4 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors"
          style={{
            borderColor: WA_GREEN,
            background: waHover ? WA_GREEN : "transparent",
            color: waHover ? "#fff" : WA_GREEN,
          }}
        >
          <WhatsAppIcon size={17} />
          Comprar pelo WhatsApp
        </a>
      </div>

      {/* detalhes */}
      <ul className="mt-10 space-y-2 border-t border-line pt-7">
        {product.details.map((d) => (
          <li key={d} className="flex items-start gap-3 text-sm text-graphite">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink" />
            {d}
          </li>
        ))}
      </ul>

      <div className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-7 text-center">
        {[
          ["Entrega", "Todo o Brasil"],
          ["Original", "100% autêntico"],
          ["Troca", "Atendimento 1:1"],
        ].map(([t, s]) => (
          <div key={t}>
            <p className="text-xs font-medium">{t}</p>
            <p className="mt-1 text-[11px] text-stone">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
