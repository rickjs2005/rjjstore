"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  products,
  CATEGORIES,
  BRANDS,
  type Category,
  type Brand,
} from "@/lib/products";
import { parseBRL } from "@/lib/format";
import { ProductCard } from "./ProductCard";

type Sort = "destaque" | "novidades" | "menor" | "maior";

const PRICE_BANDS = [
  { label: "Até R$ 250", min: 0, max: 250 },
  { label: "R$ 250 – R$ 500", min: 250, max: 500 },
  { label: "R$ 500 – R$ 900", min: 500, max: 900 },
  { label: "Acima de R$ 900", min: 900, max: Infinity },
];

const ALL_SIZES = ["PP", "P", "M", "G", "GG", "38", "39", "40", "41", "42", "43", "44", "46", "Único"];

const ALL_COLORS = Array.from(
  new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values()
);

export function Shop({
  initialCategory,
  initialSort,
}: {
  initialCategory?: string;
  initialSort?: string;
}) {
  const [search, setSearch] = useState("");
  const [cats, setCats] = useState<Category[]>(
    initialCategory && CATEGORIES.includes(initialCategory as Category)
      ? [initialCategory as Category]
      : []
  );
  const [brands, setBrands] = useState<Brand[]>([]);
  const [bands, setBands] = useState<number[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>(
    initialSort === "novidades" ? "novidades" : "destaque"
  );
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Fecha o drawer de filtros mobile com ESC.
  useEffect(() => {
    if (!filtersOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFiltersOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtersOpen]);

  function toggle<T>(arr: T[], v: T, set: (x: T[]) => void) {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  }

  const filtered = useMemo(() => {
    let out = products.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (bands.length) {
        const price = parseBRL(p.price);
        const ok = bands.some((i) => price >= PRICE_BANDS[i].min && price < PRICE_BANDS[i].max);
        if (!ok) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    out = [...out].sort((a, b) => {
      if (sort === "menor") return parseBRL(a.price) - parseBRL(b.price);
      if (sort === "maior") return parseBRL(b.price) - parseBRL(a.price);
      if (sort === "novidades") return Number(!!b.badge) - Number(!!a.badge);
      return Number(!!b.featured) - Number(!!a.featured);
    });
    return out;
  }, [cats, brands, sizes, colors, bands, search, sort]);

  const activeCount =
    cats.length + brands.length + bands.length + sizes.length + colors.length;

  function clearAll() {
    setCats([]);
    setBrands([]);
    setBands([]);
    setSizes([]);
    setColors([]);
    setSearch("");
  }

  const FilterPanel = (
    <div className="flex flex-col gap-8">
      <FilterGroup title="Categoria">
        {CATEGORIES.map((c) => (
          <Chip key={c} active={cats.includes(c)} onClick={() => toggle(cats, c, setCats)}>
            {c}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Marca">
        {BRANDS.map((b) => (
          <Chip key={b} active={brands.includes(b)} onClick={() => toggle(brands, b, setBrands)}>
            {b}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Preço">
        {PRICE_BANDS.map((p, i) => (
          <Chip key={p.label} active={bands.includes(i)} onClick={() => toggle(bands, i, setBands)}>
            {p.label}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Tamanho">
        {ALL_SIZES.map((s) => (
          <Chip key={s} active={sizes.includes(s)} onClick={() => toggle(sizes, s, setSizes)} compact>
            {s}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Cor">
        {ALL_COLORS.map((c) => (
          <button
            key={c.name}
            onClick={() => toggle(colors, c.name, setColors)}
            aria-pressed={colors.includes(c.name)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
              colors.includes(c.name) ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
            }`}
          >
            <span
              className="h-3 w-3 rounded-full border border-black/10"
              style={{ background: c.hex }}
            />
            {c.name}
          </button>
        ))}
      </FilterGroup>

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="self-start text-xs uppercase tracking-[0.18em] text-stone underline-offset-4 hover:text-ink hover:underline"
        >
          Limpar filtros ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="px-5 pb-28 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        {/* cabeçalho */}
        <div className="border-b border-line pb-8">
          <p className="eyebrow text-stone">Coleção completa</p>
          <h1 className="h-display mt-3 text-[clamp(2.6rem,7vw,5.5rem)]">A loja</h1>
        </div>

        {/* barra de controle */}
        <div className="sticky top-[68px] z-30 -mx-5 mb-10 flex items-center gap-3 border-b border-line bg-paper/90 px-5 py-4 backdrop-blur-md md:top-[76px] md:mx-0 md:px-0">
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar peça, marca ou categoria…"
              aria-label="Buscar"
              className="w-full border-b border-line bg-transparent py-2 pr-8 text-sm focus:border-ink focus:outline-none"
            />
            <span className="pointer-events-none absolute right-1 top-1.5 text-stone">⌕</span>
          </div>

          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 border border-line px-4 py-2 text-xs uppercase tracking-[0.16em] hover:border-ink lg:hidden"
          >
            Filtros {activeCount > 0 && `(${activeCount})`}
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Ordenar"
            className="border border-line bg-paper px-3 py-2 text-xs uppercase tracking-[0.12em] focus:border-ink focus:outline-none"
          >
            <option value="destaque">Destaque</option>
            <option value="novidades">Novidades</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>

        <div className="grid gap-12 lg:grid-cols-[230px_1fr]">
          {/* filtros desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">{FilterPanel}</div>
          </aside>

          {/* grid de produtos */}
          <div>
            <p className="mb-6 text-xs text-stone">
              {filtered.length} {filtered.length === 1 ? "peça" : "peças"}
            </p>
            {filtered.length === 0 ? (
              <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
                <p className="h-display text-3xl">Nada por aqui</p>
                <p className="text-sm text-stone">Ajuste os filtros para ver mais peças.</p>
                <button onClick={clearAll} className="bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-paper">
                  Limpar filtros
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProductCard product={p} index={i} priority={i < 3} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* drawer de filtros mobile */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-[80] bg-black/40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
              className="fixed inset-x-0 bottom-0 z-[81] max-h-[85vh] overflow-y-auto rounded-t-2xl bg-paper p-6 lg:hidden"
              data-lenis-prevent
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="h-display text-2xl">Filtros</h3>
                <button onClick={() => setFiltersOpen(false)} className="text-xs uppercase tracking-[0.2em]">
                  Aplicar ✕
                </button>
              </div>
              {FilterPanel}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3 text-stone">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  compact,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border text-xs transition-colors ${
        compact ? "px-3 py-1.5" : "px-3.5 py-1.5"
      } ${active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
    >
      {children}
    </button>
  );
}
