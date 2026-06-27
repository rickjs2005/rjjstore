import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./ui/SectionHeading";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="destaques" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="Seleção da casa"
          title="Peças em destaque"
          href="/loja"
        />
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
