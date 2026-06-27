"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealText } from "./ui/Reveal";

export function Newsletter() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // sem backend — apenas feedback visual
    setSent(true);
  }

  return (
    <section className="bg-ink px-5 py-24 text-paper md:px-10 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-white/50">Acesso antecipado</p>
        <h2 className="h-display mt-5 text-[clamp(2.2rem,6vw,4.5rem)]">
          <RevealText text="Entre na lista" />
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm font-light text-white/65">
          Drops, peças limitadas e convites privados. Sem ruído — só o que vale a
          pena vestir.
        </p>

        {sent ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-sm text-white/80"
          >
            ✦ Você está na lista. Em breve, o próximo drop chega até você.
          </motion.p>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-10 flex max-w-md items-center gap-0 border-b border-white/30 focus-within:border-white"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              aria-label="Seu e-mail"
              className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              data-cursor="Assinar"
              className="shrink-0 py-3 pl-4 text-[12px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-60"
            >
              Assinar →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
