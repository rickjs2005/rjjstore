"use client";

import { useEffect, useState } from "react";

type Tone = "areia" | "pure";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [tone, setTone] = useState<Tone>("areia");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    setTone(t === "pure" ? "pure" : "areia");
  }, []);

  function apply(next: Tone) {
    setTone(next);
    if (next === "pure") {
      document.documentElement.setAttribute("data-theme", "pure");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("rjj-theme", next);
    } catch {}
  }

  return (
    <button
      onClick={() => apply(tone === "areia" ? "pure" : "areia")}
      aria-label={`Tom atual: ${tone === "areia" ? "areia" : "branco"}. Alternar.`}
      title="Alternar tom — Areia / Branco"
      className={`flex items-center gap-1.5 ${className}`}
    >
      <span
        className={`h-3.5 w-3.5 rounded-full border transition-all ${
          tone === "areia"
            ? "border-current scale-110 ring-1 ring-current ring-offset-2 ring-offset-transparent"
            : "border-current/40"
        }`}
        style={{ background: "#e3d8c4" }}
      />
      <span
        className={`h-3.5 w-3.5 rounded-full border transition-all ${
          tone === "pure"
            ? "border-current scale-110 ring-1 ring-current ring-offset-2 ring-offset-transparent"
            : "border-current/40"
        }`}
        style={{ background: "#ffffff" }}
      />
    </button>
  );
}
