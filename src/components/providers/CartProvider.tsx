"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CartLine = { id: string; size: string; qty: number };

type CartCtx = {
  items: CartLine[];
  count: number;
  isOpen: boolean;
  add: (id: string, size: string) => void;
  inc: (id: string, size: string) => void;
  dec: (id: string, size: string) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "rjjstore-cart";

const same = (l: CartLine, id: string, size: string) =>
  l.id === id && l.size === size;

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const hydrated = useRef(false);

  // hidrata uma vez do localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    hydrated.current = true;
  }, []);

  // persiste só após hidratar (não sobrescreve no 1º render)
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = useCallback((id: string, size: string) => {
    setItems((prev) => {
      const found = prev.find((l) => same(l, id, size));
      if (found)
        return prev.map((l) =>
          same(l, id, size) ? { ...l, qty: l.qty + 1 } : l
        );
      return [...prev, { id, size, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const inc = useCallback((id: string, size: string) => {
    setItems((prev) =>
      prev.map((l) => (same(l, id, size) ? { ...l, qty: l.qty + 1 } : l))
    );
  }, []);

  const dec = useCallback((id: string, size: string) => {
    setItems((prev) =>
      prev
        .map((l) => (same(l, id, size) ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0)
    );
  }, []);

  const remove = useCallback((id: string, size: string) => {
    setItems((prev) => prev.filter((l) => !same(l, id, size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((s, l) => s + l.qty, 0), [items]);

  return (
    <Ctx.Provider
      value={{ items, count, isOpen, add, inc, dec, remove, clear, open, close }}
    >
      {children}
    </Ctx.Provider>
  );
}
