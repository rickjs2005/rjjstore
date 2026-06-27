"use client";

import { swatchStyle } from "@/lib/theme";

type Color = { name: string; hex: string };

/** Seletor de cor (bolinhas) — compartilhado por ProductDetail e QuickView. */
export function ColorPicker({
  colors,
  value,
  onChange,
  size = "md",
}: {
  colors: Color[];
  value: string;
  onChange: (name: string) => void;
  size?: "sm" | "md";
}) {
  const swatch = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const gap = size === "sm" ? "gap-2" : "gap-2.5";

  return (
    <div className={`flex ${gap}`}>
      {colors.map((c) => {
        const active = value === c.name;
        return (
          <button
            key={c.name}
            type="button"
            onClick={() => onChange(c.name)}
            aria-label={c.name}
            aria-pressed={active}
            className={`${swatch} rounded-full border transition-transform ${
              active ? "border-ink scale-110" : "border-line"
            }`}
            style={swatchStyle(c.hex)}
          />
        );
      })}
    </div>
  );
}
