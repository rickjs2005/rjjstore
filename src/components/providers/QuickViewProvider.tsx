"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Product } from "@/lib/products";

type QuickViewCtx = {
  product: Product | null;
  open: (p: Product) => void;
  close: () => void;
};

const Ctx = createContext<QuickViewCtx | null>(null);

export function useQuickView() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useQuickView must be used inside QuickViewProvider");
  return v;
}

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const open = useCallback((p: Product) => setProduct(p), []);
  const close = useCallback(() => setProduct(null), []);
  return (
    <Ctx.Provider value={{ product, open, close }}>{children}</Ctx.Provider>
  );
}
