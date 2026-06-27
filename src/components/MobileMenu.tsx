"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { editorial } from "@/lib/products";
import { WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";
import { ThemeToggle } from "./ui/ThemeToggle";

type LinkItem = { label: string; href: string };

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({
  links,
  onClose,
}: {
  links: LinkItem[];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col bg-paper text-ink lg:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="flex h-[68px] items-center justify-between px-5">
        <span className="h-display text-2xl">
          RJ<span className="italic">j</span>store
        </span>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="text-[11px] uppercase tracking-[0.2em]"
          >
            Fechar ✕
          </button>
        </div>
      </div>

      <div className="grid flex-1 grid-rows-[1fr_auto] overflow-hidden">
        <nav className="flex flex-col justify-center gap-1 px-5">
          {links.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease }}
            >
              <Link
                href={l.href}
                onClick={onClose}
                className="h-display block border-b border-line py-3 text-5xl"
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative m-5 mt-0 h-44 overflow-hidden"
        >
          <Image
            src={editorial.heroSecondary}
            alt="Campanha RJjstore"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="eyebrow opacity-80">SS / 26</p>
            <p className="h-display text-2xl">New Collection</p>
          </div>
        </motion.div>
      </div>

      <a
        href={waLink("Olá! Vim pelo site da RJjstore e gostaria de atendimento.")}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-ink py-4 text-center text-[12px] uppercase tracking-[0.25em] text-paper"
      >
        WhatsApp · {WHATSAPP_DISPLAY}
      </a>
    </motion.div>
  );
}
