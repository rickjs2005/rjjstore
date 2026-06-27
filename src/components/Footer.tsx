import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, editorial } from "@/lib/products";
import { WHATSAPP_DISPLAY, waLink, STORE_NAME } from "@/lib/whatsapp";
import { BLUR } from "@/lib/ui";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="border-y border-white/10 py-6">
        <Marquee
          items={[
            "ENTREGA PARA TODO O BRASIL",
            "ATENDIMENTO EXCLUSIVO",
            "PEÇAS ORIGINAIS",
            "CURADORIA PREMIUM",
            "PAGAMENTO FACILITADO",
          ]}
        />
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <Link href="/" className="h-display text-4xl">
              RJ<span className="italic">j</span>store
            </Link>
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-white/60">
              Moda premium de marca com curadoria editorial. Vestir bem é dizer
              quem você é antes de falar.
            </p>
            <a
              href={waLink(`Olá! Vim pelo site da ${STORE_NAME}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/80 link-underline"
            >
              WhatsApp · {WHATSAPP_DISPLAY}
            </a>
          </div>

          {/* Categorias */}
          <nav>
            <p className="eyebrow text-white/40">Coleção</p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <Link
                    href={`/loja?cat=${encodeURIComponent(c)}`}
                    className="link-underline"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Institucional */}
          <nav>
            <p className="eyebrow text-white/40">A casa</p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><Link href="/loja" className="link-underline">Loja completa</Link></li>
              <li><Link href="/#editorial" className="link-underline">Editorial</Link></li>
              <li><Link href="/#marcas" className="link-underline">Marcas</Link></li>
              <li><Link href="/#destaques" className="link-underline">Destaques</Link></li>
            </ul>
          </nav>

          {/* Social */}
          <nav>
            <p className="eyebrow text-white/40">Conecte-se</p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="link-underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href={waLink(`Olá! Vim pelo site da ${STORE_NAME}.`)} target="_blank" rel="noopener noreferrer" className="link-underline">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="link-underline">
                  Onde estamos
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {STORE_NAME}. Todos os direitos reservados.</p>
          <p className="max-w-md md:text-right">
            Imagens de demonstração (Unsplash). Vitrine para fins ilustrativos —
            sem processamento de pagamento online.
          </p>
        </div>
      </div>

      {/* Encerramento cinematográfico — imagem gigante, wordmark e fade para o preto */}
      <div className="relative flex h-[62vh] min-h-[420px] items-center justify-center overflow-hidden">
        <Image
          src={editorial.campaignTall}
          alt=""
          aria-hidden
          fill
          placeholder="blur"
          blurDataURL={BLUR}
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/30 to-black" />
        <Reveal y={70}>
          <span className="h-display relative block px-4 text-center text-[clamp(4rem,21vw,19rem)] leading-[0.8] text-paper">
            RJ<span className="italic">j</span>store
          </span>
        </Reveal>
        <span className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.35em] text-white/40">
          Luxury Streetwear — Brasil
        </span>
      </div>
    </footer>
  );
}
