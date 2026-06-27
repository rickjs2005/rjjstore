import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, related } from "@/lib/products";
import { parseBRL } from "@/lib/format";
import { ProductView } from "@/components/ProductView";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: "Peça não encontrada" };
  return {
    title: `${p.name} — ${p.brand}`,
    description: p.description,
    alternates: { canonical: `/produtos/${p.slug}` },
    openGraph: {
      title: `${p.name} — ${p.brand}`,
      description: p.description,
      images: [{ url: p.image }],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const rel = related(product.slug, 3);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: parseBRL(product.price).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <article className="px-5 pb-28 pt-28 md:px-10 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      <div className="mx-auto max-w-[1600px]">
        {/* breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-stone">
          <Link href="/" className="hover:text-ink">Início</Link>
          <span>/</span>
          <Link href={`/loja?cat=${encodeURIComponent(product.category)}`} className="hover:text-ink">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <ProductView product={product} />

        {/* relacionados */}
        <section className="mt-28">
          <div className="border-b border-line pb-6">
            <p className="eyebrow text-stone">Combine com</p>
            <h2 className="h-display mt-2 text-4xl">Você também vai querer</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-6">
            {rel.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
