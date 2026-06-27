"use client";

import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* cortina em máscara que sobe revelando a nova página */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[110] bg-ink"
        initial={{ clipPath: "inset(0 0 0 0)" }}
        animate={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 0.8, ease }}
      />
      {/* linha-fio que acompanha a borda da cortina */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[111] h-px bg-white/40"
        initial={{ scaleY: 1, y: 0, opacity: 1 }}
        animate={{ y: "100vh", opacity: 0 }}
        transition={{ duration: 0.8, ease }}
      />
      {/* conteúdo desmascarando de baixo para cima */}
      <motion.div
        initial={{ clipPath: "inset(10% 0 0 0)", y: 24, opacity: 0 }}
        animate={{ clipPath: "inset(0% 0 0 0)", y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      >
        {children}
      </motion.div>
    </>
  );
}
