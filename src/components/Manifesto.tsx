"use client";

import { motion } from "framer-motion";
import { Reveal, RevealText } from "./ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const PRINCIPLES = [
  {
    n: "01",
    title: "Curadoria, não catálogo",
    body: "Cada peça entra na vitrine por mérito — corte, história e presença. Editamos para que você não precise filtrar.",
  },
  {
    n: "02",
    title: "Originalidade garantida",
    body: "Trabalhamos apenas com peças autênticas das grifes que importam. Procedência é inegociável.",
  },
  {
    n: "03",
    title: "Atendimento de boutique",
    body: "Um a um, pelo WhatsApp. Da dúvida de tamanho ao pós-venda, você fala com gente — não com formulário.",
  },
];

export function Manifesto() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        {/* coluna fixa */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow text-stone">A casa</p>
          </Reveal>
          <h2 className="h-display mt-5 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.98]">
            <RevealText text="Vestir bem é" />
            <br />
            <span className="italic">
              <RevealText text="dizer quem" delay={0.1} />
            </span>
            <br />
            <RevealText text="você é." delay={0.2} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-sm text-sm font-light leading-relaxed text-graphite">
              A RJjstore nasceu de uma obsessão: traduzir o streetwear de luxo numa
              experiência que respeita o seu tempo e o seu olhar. Sem ruído, sem
              excesso — só o que merece estar no seu corpo.
            </p>
          </Reveal>
        </div>

        {/* princípios */}
        <ul className="flex flex-col">
          {PRINCIPLES.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease }}
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-line py-9 first:border-t-0 first:pt-0 md:gap-10"
            >
              <span className="h-display text-4xl text-stone md:text-5xl">{p.n}</span>
              <div>
                <h3 className="h-display text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-graphite">
                  {p.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
