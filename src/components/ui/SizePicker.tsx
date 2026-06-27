"use client";

/** Seletor de tamanho (pílulas) — compartilhado por ProductDetail e QuickView. */
export function SizePicker({
  sizes,
  value,
  onChange,
  invalid = false,
  size = "md",
}: {
  sizes: string[];
  value: string | null;
  onChange: (size: string) => void;
  invalid?: boolean;
  size?: "sm" | "md";
}) {
  const pill = size === "sm" ? "min-w-11 px-3.5 py-2" : "min-w-12 px-4 py-2.5";

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const active = value === s;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            aria-pressed={active}
            className={`${pill} border text-sm transition-colors ${
              active
                ? "border-ink bg-ink text-paper"
                : invalid
                  ? "border-red-400 hover:border-ink"
                  : "border-line hover:border-ink"
            }`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
