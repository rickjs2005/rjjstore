"use client";

import { useEffect, useState } from "react";

export function GrainOverlay() {
  // pausa a animação do grão quando a aba está oculta (economia de CPU/bateria)
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      className="grain"
      aria-hidden
      style={paused ? { animationPlayState: "paused" } : undefined}
    />
  );
}
