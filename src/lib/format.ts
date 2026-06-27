// E-commerce helpers: preço, parcelamento, desconto

export function parseBRL(v: string): number {
  // "R$ 229,90" -> 229.90
  const n = v.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(n) || 0;
}

export function formatBRL(n: number): string {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** "10x de R$ 49,90 sem juros" */
export function installments(price: string, n = 10): string {
  const total = parseBRL(price);
  const per = total / n;
  return `${n}x de ${formatBRL(per)} sem juros`;
}

export function discountPct(price: string, oldPrice?: string): number | null {
  if (!oldPrice) return null;
  const p = parseBRL(price);
  const o = parseBRL(oldPrice);
  if (!o || o <= p) return null;
  return Math.round((1 - p / o) * 100);
}
