"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";

const ITEMS = [
  {
    name: "Marina Costa",
    role: "Creative Director",
    quote:
      "A curadoria é absurda. Recebi a jaqueta embalada como uma peça de coleção — e o atendimento pelo WhatsApp foi impecável.",
    img: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rafael Lima",
    role: "Empresário",
    quote:
      "Comprei três peças e parecia que tinha entrado numa boutique de Milão. Cada detalhe transmite cuidado.",
    img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Júlia Andrade",
    role: "Stylist",
    quote:
      "Virou minha referência de streetwear premium. As fotos não fazem jus — ao vivo é ainda melhor.",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
  },
];

export function Testimonials() {
  return (
    <section className="bg-ash px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading eyebrow="Quem veste" title="Vozes da casa" align="center" />
        <p className="mt-3 text-center text-xs text-stone">
          Depoimentos ilustrativos para demonstração da vitrine.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ITEMS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between bg-paper p-8"
            >
              <blockquote className="h-display text-2xl leading-snug">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span className="relative h-12 w-12 overflow-hidden rounded-full bg-ash">
                  <Image src={t.img} alt={t.name} fill sizes="48px" className="object-cover" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="block text-xs text-stone">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
