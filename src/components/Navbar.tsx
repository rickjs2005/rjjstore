"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./providers/CartProvider";
import { MobileMenu } from "./MobileMenu";
import { Magnetic } from "./ui/Magnetic";
import { ThemeToggle } from "./ui/ThemeToggle";
import { BagIcon } from "./ui/BagIcon";

const LINKS = [
  { label: "Coleção", href: "/loja" },
  { label: "Novidades", href: "/loja?sort=novidades" },
  { label: "Editorial", href: "/#editorial" },
  { label: "Marcas", href: "/#marcas" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();
  const pathname = usePathname();

  // Só a home tem Hero escuro de fundo. Nas demais páginas a navbar
  // precisa ser sólida (texto escuro) desde o topo, senão fica invisível.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll quando o menu mobile abre
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // fundo sólido quando rolou OU quando não há Hero atrás
  const solid = scrolled || !overHero;
  // texto escuro sempre que o fundo é claro/sólido (ou menu aberto)
  const darkText = solid || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-500 ${
          solid
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-5 md:h-[76px] md:px-10 ${
            darkText ? "text-ink" : "text-white"
          }`}
        >
          {/* Esquerda — links desktop */}
          <div className="hidden flex-1 items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="link-underline text-[13px] font-medium tracking-wide"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Botão menu mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 lg:hidden"
            aria-label="Abrir menu"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-6 bg-current" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em]">Menu</span>
          </button>

          {/* Logo central */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-center"
            aria-label="RJjstore — início"
          >
            <span className="h-display text-2xl leading-none md:text-[28px]">
              RJ<span className="italic">j</span>store
            </span>
          </Link>

          {/* Direita — ações (com respiro e divisores entre os controles) */}
          <div className="flex flex-1 items-center justify-end gap-4 md:gap-5">
            <Link
              href="/loja"
              className="hidden text-[13px] font-medium tracking-wide link-underline md:block"
            >
              Buscar
            </Link>
            <span className="hidden h-4 w-px bg-current/20 md:block" aria-hidden />
            <ThemeToggle className="hidden md:flex" />
            <span className="hidden h-4 w-px bg-current/20 md:block" aria-hidden />
            <Magnetic strength={0.18}>
              <button
                onClick={open}
                data-cursor="Abrir"
                className="group relative flex items-center gap-2 pl-1"
                aria-label="Abrir sacola"
              >
                <BagIcon size={16} className="opacity-80" />
                <span className="text-[13px] font-medium tracking-wide">Sacola</span>
                <span className="relative flex h-6 min-w-6 items-center justify-center rounded-full border border-current px-1.5 text-[11px]">
                  {count}
                </span>
              </button>
            </Magnetic>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu links={LINKS} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
