"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink, STORE_NAME } from "@/lib/whatsapp";
import { WA_GREEN } from "@/lib/theme";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink(`Olá! Vim pelo site da ${STORE_NAME} e gostaria de atendimento.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          data-cursor="WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-24 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_30px_-6px_rgba(31,174,84,0.6)] md:bottom-28 md:right-8"
          style={{ background: WA_GREEN }}
        >
          <WhatsAppIcon size={26} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
