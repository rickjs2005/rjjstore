"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductGallery } from "./ProductGallery";
import { ProductDetail } from "./ProductDetail";

export function ProductView({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [sweep, setSweep] = useState(0);

  const activeHex =
    product.colors.find((c) => c.name === color)?.hex ?? "#000000";

  function onColor(name: string) {
    setColor(name);
    setSweep((s) => s + 1);
  }

  return (
    // layout editorial: galeria domina, detalhe respira à direita
    <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16 lg:gap-24">
      <ProductGallery
        images={product.gallery}
        alt={product.name}
        washHex={activeHex}
        sweep={sweep}
      />
      <div className="md:sticky md:top-32 md:self-start">
        <ProductDetail product={product} color={color} onColor={onColor} />
      </div>
    </div>
  );
}
