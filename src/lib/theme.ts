// RJjstore — tokens de tema compartilhados.
import type { CSSProperties } from "react";

// Cor canônica do WhatsApp (unifica os antigos #1fae54 / #25D366 / #178f44).
export const WA_GREEN = "#1fae54";

// ── Neo-skeuomorfismo discreto (materiais físicos só em detalhes-chave) ──

/** Relevo sutil de material para swatches de cor (brilho no topo + sombra).
 *  Calibrado bem discreto — só um leve volume, sem parecer botão de gel. */
export function swatchStyle(hex: string): CSSProperties {
  return {
    backgroundColor: hex,
    backgroundImage:
      "radial-gradient(circle at 34% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0) 52%)",
    boxShadow:
      "inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -1px 1.5px rgba(0,0,0,0.16), 0 1px 1.5px rgba(0,0,0,0.1)",
  };
}

/** Profundidade física para o botão sólido escuro (Adicionar à sacola). */
export const SOLID_DEPTH =
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-3px_6px_rgba(0,0,0,0.35),0_8px_20px_-10px_rgba(0,0,0,0.5)] active:translate-y-px active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.4)] transition-[transform,box-shadow,opacity]";

