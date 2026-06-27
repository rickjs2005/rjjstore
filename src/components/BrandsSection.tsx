"use client";

import { motion } from "framer-motion";
import { BRANDS } from "@/lib/products";
import { SectionHeading } from "./ui/SectionHeading";

export function BrandsSection() {
  return (
    <section id="marcas" className="px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="Curadoria"
          title="As marcas que importam"
          align="center"
        />
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-4">
          {BRANDS.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex h-28 items-center justify-center bg-paper md:h-36"
            >
              <span className="h-display text-2xl text-stone grayscale transition-all duration-500 group-hover:text-ink md:text-3xl">
                {b}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
